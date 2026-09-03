
import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  type DocumentData,
  type QuerySnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { firestoreDb } from '../firebase/config';

// ── Types ──

/** Called every time the collection changes. */
export type SnapshotCallback<T> = (docs: T[]) => void;

/** Called if the listener hits an error. */
export type ErrorCallback = (error: Error) => void;

// ─── Helper ───

/*
 * Recursively converts any Firestore Timestamp in a value to an ISO string,
 * so it's safe to store in Redux (Timestamps aren't serializable).
 */
function serializeTimestamps<T>(value: T): T {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString() as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => serializeTimestamps(item)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      result[key] = serializeTimestamps(val);
    }
    return result as T;
  }
  return value;
}

/** Turns a QuerySnapshot into a plain array of docs, each with its `id`. */
function snapshotToDocs<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
  return snapshot.docs.map((d) => {
    const data = d.data();
    const { id: _ignored, ...rest } = data;
    return serializeTimestamps({ id: d.id, ...rest }) as T;
  });
}

// ─── Real-time Subscriptions (onSnapshot) ───

/** No-op teardown — see the note above. */
const NOOP_UNSUBSCRIBE: Unsubscribe = () => {};

/** Paths with a live listener already running (collection name / `col/doc`). */
const liveCollectionListeners = new Set<string>();
const liveDocumentListeners = new Set<string>();

// ── Dashboard-only diagnostic ─────────────────────────────────────────────────
// Collections / documents that are currently serving FALLBACK_* demo data
// *because their Firestore listener failed* (permission-denied, unavailable, …)
// or because Firebase isn't configured. The PUBLIC site never reads this and its
// behaviour is unchanged — it keeps showing fallback data seamlessly. Only the
// dashboard's <DemoDataBanner> subscribes, so an admin is told the data on
// screen isn't live. Populated ONLY on a genuine listener error — never on the
// harmless initial fallback shown before the first snapshot, and never for a
// collection that successfully loaded and is simply empty.
const fallbackErrors = new Map<string, string>();
let fallbackErrorsSnapshot: ReadonlyArray<{ key: string; message: string }> = [];
const fallbackErrorListeners = new Set<() => void>();

function setFallbackError(key: string, message: string | null): void {
  if (message) {
    if (fallbackErrors.get(key) === message) return;
    fallbackErrors.set(key, message);
  } else {
    if (!fallbackErrors.has(key)) return;
    fallbackErrors.delete(key);
  }
  fallbackErrorsSnapshot = Array.from(fallbackErrors, ([k, m]) => ({ key: k, message: m }));
  fallbackErrorListeners.forEach((listener) => listener());
}

/**
 * Collections / documents currently showing demo (FALLBACK_*) data because their
 * Firestore listener failed. Empty array = every subscription is live.
 * Dashboard diagnostic only — the public site ignores this.
 */
export function getFallbackErrors(): ReadonlyArray<{ key: string; message: string }> {
  return fallbackErrorsSnapshot;
}

/** Subscribe to changes in getFallbackErrors(). Returns an unsubscribe fn. */
export function subscribeFallbackErrors(listener: () => void): () => void {
  fallbackErrorListeners.add(listener);
  return () => {
    fallbackErrorListeners.delete(listener);
  };
}

export function subscribeToCollection<T>(
  collectionName: string,
  onData: SnapshotCallback<T>,
  onError?: ErrorCallback,
  fallbackData?: T[],
): Unsubscribe {
  // Firebase isn't configured — hand over the fallback once and stop.
  if (!firestoreDb) {
    if (fallbackData) onData(fallbackData);
    setFallbackError(collectionName, 'Firebase is not configured');
    return NOOP_UNSUBSCRIBE;
  }

  if (liveCollectionListeners.has(collectionName)) {
    return NOOP_UNSUBSCRIBE;
  }
  liveCollectionListeners.add(collectionName);

  if (fallbackData) onData(fallbackData);

  const colRef = collection(firestoreDb, collectionName);

  // Safety timeout: if Firebase does not resolve quickly, display the fallback
  // instead of leaving the section in a permanent loading state.
  let receivedFirstSnapshot = false;
  const fallbackTimer = fallbackData
    ? setTimeout(() => {
        if (!receivedFirstSnapshot) {
          onData(fallbackData);
        }
      }, 2500)
    : null;

  onSnapshot(
    colRef,
    (snapshot) => {
      receivedFirstSnapshot = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      onData(snapshotToDocs<T>(snapshot));
      // A successful read (even of an empty collection) means the data is live.
      setFallbackError(collectionName, null);
    },
    (error) => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // On error, show the fallback instead of surfacing the error to the
      // public site — but flag it so the dashboard can warn the admin.
      if (fallbackData) {
        onData(fallbackData);
        setFallbackError(collectionName, error.message || 'Firestore listener error');
      } else if (onError) {
        onError(error);
      }
    },
  );

  return NOOP_UNSUBSCRIBE;
}

/**
 * Same contract as subscribeToCollection, but for a single well-known document
 * (e.g. `siteSettings/contact`). Emits the doc with its `id`, or the fallback /
 * `null` when the document doesn't exist. Idempotent per `collection/doc` path.
 */
export function subscribeToDocument<T>(
  collectionName: string,
  documentId: string,
  onData: (doc: T | null) => void,
  onError?: ErrorCallback,
  fallbackData?: T,
): Unsubscribe {
  if (!firestoreDb) {
    onData(fallbackData ?? null);
    setFallbackError(`${collectionName}/${documentId}`, 'Firebase is not configured');
    return NOOP_UNSUBSCRIBE;
  }

  const path = `${collectionName}/${documentId}`;
  if (liveDocumentListeners.has(path)) {
    return NOOP_UNSUBSCRIBE;
  }
  liveDocumentListeners.add(path);

  const docRef = doc(firestoreDb, collectionName, documentId);

  let receivedFirstSnapshot = false;
  const fallbackTimer =
    fallbackData !== undefined
      ? setTimeout(() => {
          if (!receivedFirstSnapshot) {
            onData(fallbackData);
          }
        }, 2500)
      : null;

  onSnapshot(
    docRef,
    (snapshot) => {
      receivedFirstSnapshot = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // A successful read (even if the doc doesn't exist yet) means data is live.
      setFallbackError(path, null);
      if (!snapshot.exists()) {
        onData(fallbackData ?? null);
        return;
      }
      const data = snapshot.data();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _ignored, ...rest } = data;
      onData(serializeTimestamps({ id: snapshot.id, ...rest }) as T);
    },
    (error) => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (fallbackData !== undefined) {
        onData(fallbackData);
        setFallbackError(path, error.message || 'Firestore listener error');
      } else if (onError) {
        onError(error);
      }
    },
  );

  return NOOP_UNSUBSCRIBE;
}

// ─── Helper ───

function stripUndefined<T extends object>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

// ─── Add ───

/** Adds a new document with an auto-generated ID and returns that ID. */
export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>,
): Promise<string> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _ignored, ...safeData } = data as Record<string, unknown>;

  const docRef = await addDoc(collection(firestoreDb, collectionName), {
    ...stripUndefined(safeData as Omit<T, 'id'>),
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// ─── Set (Upsert) ───

/** Writes a document at a specific ID (creates it, or replaces it). */
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Omit<T, 'id'>,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  await setDoc(doc(firestoreDb, collectionName, id), {
    ...stripUndefined(data),
    updatedAt: serverTimestamp(),
  });
}

// ─── Update ───

/** Updates specific fields on an existing document (partial merge). Creates it if it doesn't exist. */
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<Omit<T, 'id'>>,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  // Guard: never write an 'id' field into the document body.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _ignored, ...safeData } = data as Record<string, unknown>;

  await setDoc(doc(firestoreDb, collectionName, id), {
    ...stripUndefined(safeData as Partial<Omit<T, 'id'>>),
    updatedAt: serverTimestamp(),
  } as DocumentData, { merge: true });
}

// ─── Delete ───

/**
 * Deletes a document by ID.
 *
 * Firestore's deleteDoc() resolves successfully even when the target document
 * doesn't exist (it's an idempotent no-op). In the dashboard that produced a
 * misleading "deleted" toast when a row was actually seed/fallback data (whose
 * id never matches a real auto-generated Firestore id) or when reads had failed.
 * We now confirm the document exists first and throw a clear error otherwise, so
 * the caller surfaces an accurate failure instead of a false success.
 */
export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  const ref = doc(firestoreDb, collectionName, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    throw new Error(
      "This item isn't in the database — it may be demo data shown because Firestore is unreachable. Nothing was deleted.",
    );
  }

  await deleteDoc(ref);
}


