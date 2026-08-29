
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  type DocumentData,
  type QuerySnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { firestoreDb } from '../firebase/config';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Called every time the collection changes. */
export type SnapshotCallback<T> = (docs: T[]) => void;

/** Called if the listener hits an error. */
export type ErrorCallback = (error: Error) => void;

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
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
  return snapshot.docs.map((d) => serializeTimestamps({ id: d.id, ...d.data() }) as T);
}

// ─── Real-time Subscriptions (onSnapshot) ────────────────────────────────────
//
// Firestore listeners are attached ONCE per collection / document path and then
// kept open for the lifetime of the tab. Redux is therefore kept continuously in
// sync, so a component that unmounts and remounts (SPA navigation) keeps seeing
// live data without re-subscribing — and there is never more than one listener
// per path no matter how many hooks call these helpers.
//
// The returned function is a no-op: callers may still use it as a `useEffect`
// cleanup, but tearing the listener down on unmount is exactly what left the
// store stale after navigation, so we intentionally don't. Re-subscribing on
// every mount would also re-read the whole collection and flash fallback data;
// keeping one listener open only pays for deltas.

/** No-op teardown — see the note above. */
const NOOP_UNSUBSCRIBE: Unsubscribe = () => {};

/** Paths with a live listener already running (collection name / `col/doc`). */
const liveCollectionListeners = new Set<string>();
const liveDocumentListeners = new Set<string>();

/**
 * Listens live for any change in a collection and pushes the updated array to
 * `onData`. Idempotent per collection — safe to call from multiple hooks / on
 * every mount; only the first call attaches a listener.
 *
 * @param collectionName  Firestore collection name
 * @param onData          callback that receives the updated array
 * @param onError         callback that receives errors (optional)
 * @param fallbackData    data to show while Firebase is unavailable / empty
 */
export function subscribeToCollection<T>(
  collectionName: string,
  onData: SnapshotCallback<T>,
  onError?: ErrorCallback,
  fallbackData?: T[],
): Unsubscribe {
  // Firebase isn't configured — hand over the fallback once and stop.
  if (!firestoreDb) {
    if (fallbackData) onData(fallbackData);
    return NOOP_UNSUBSCRIBE;
  }

  // A listener is already running for this collection and keeping Redux in sync.
  // Don't attach a second one, and don't push fallback over live data.
  if (liveCollectionListeners.has(collectionName)) {
    return NOOP_UNSUBSCRIBE;
  }
  liveCollectionListeners.add(collectionName);

  // Show the fallback data immediately until real Firestore data arrives.
  if (fallbackData) onData(fallbackData);

  const colRef = collection(firestoreDb, collectionName);

  // Safety timeout: fall back if nothing arrives within 8 seconds.
  let receivedFirstSnapshot = false;
  const fallbackTimer = fallbackData
    ? setTimeout(() => {
        if (!receivedFirstSnapshot) {
          onData(fallbackData);
        }
      }, 8000)
    : null;

  onSnapshot(
    colRef,
    (snapshot) => {
      receivedFirstSnapshot = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // Collection is empty in Firebase — use the fallback instead.
      if (snapshot.empty && fallbackData) {
        onData(fallbackData);
      } else {
        onData(snapshotToDocs<T>(snapshot));
      }
    },
    (error) => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // On error, show the fallback instead of surfacing the error.
      if (fallbackData) {
        onData(fallbackData);
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
    return NOOP_UNSUBSCRIBE;
  }

  const path = `${collectionName}/${documentId}`;
  if (liveDocumentListeners.has(path)) {
    return NOOP_UNSUBSCRIBE;
  }
  liveDocumentListeners.add(path);

  onData(fallbackData ?? null);

  const docRef = doc(firestoreDb, collectionName, documentId);

  let receivedFirstSnapshot = false;
  const fallbackTimer =
    fallbackData !== undefined
      ? setTimeout(() => {
          if (!receivedFirstSnapshot) {
            onData(fallbackData);
          }
        }, 8000)
      : null;

  onSnapshot(
    docRef,
    (snapshot) => {
      receivedFirstSnapshot = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (!snapshot.exists()) {
        onData(fallbackData ?? null);
        return;
      }
      onData(serializeTimestamps({ id: snapshot.id, ...snapshot.data() }) as T);
    },
    (error) => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (fallbackData !== undefined) {
        onData(fallbackData);
      } else if (onError) {
        onError(error);
      }
    },
  );

  return NOOP_UNSUBSCRIBE;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Firestore rejects any field whose value is `undefined` — addDoc/setDoc/updateDoc
 * throw "Unsupported field value: undefined" instead of just ignoring the key.
 * Dashboard forms routinely produce `undefined` for optional fields the user left
 * blank (e.g. bedroomIcon, tag, location…), so every write is passed through this
 * first to drop those keys before they ever reach Firestore.
 */
function stripUndefined<T extends object>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

// ─── Add ──────────────────────────────────────────────────────────────────────

/** Adds a new document with an auto-generated ID and returns that ID. */
export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>,
): Promise<string> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  const docRef = await addDoc(collection(firestoreDb, collectionName), {
    ...stripUndefined(data),
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// ─── Set (Upsert) ─────────────────────────────────────────────────────────────

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

// ─── Update ───────────────────────────────────────────────────────────────────

/** Updates specific fields on an existing document (partial merge). */
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<Omit<T, 'id'>>,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  await updateDoc(doc(firestoreDb, collectionName, id), {
    ...stripUndefined(data),
    updatedAt: serverTimestamp(),
  } as DocumentData);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/** Deletes a document by ID. */
export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  await deleteDoc(doc(firestoreDb, collectionName, id));
}
