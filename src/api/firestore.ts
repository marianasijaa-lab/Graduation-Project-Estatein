
import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
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

/** Deletes a document by ID. */
export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase is not configured');

  await deleteDoc(doc(firestoreDb, collectionName, id));
}

// ─── Rename (copy + delete) ───

/**
 * "Renames" a Firestore document by:
 *   1. Reading all existing fields
 *   2. Writing them to a new document with the desired ID
 *   3. Deleting the old document
 *
 * Throws if the new ID is already taken or Firebase isn't configured.
 */
export async function renameDocumentId(
  collectionName: string,
  oldId: string,
  newId: string,
): Promise<void> {
  if (!firestoreDb) throw new Error("Firebase is not configured");

  const { getDoc: getDocFn } = await import("firebase/firestore");

  // 1. Read the existing document
  const oldRef = doc(firestoreDb, collectionName, oldId);
  const oldSnap = await getDocFn(oldRef);
  if (!oldSnap.exists()) throw new Error(`Document "${oldId}" not found.`);

  // 2. Check target ID is free
  const newRef = doc(firestoreDb, collectionName, newId);
  const newSnap = await getDocFn(newRef);
  if (newSnap.exists()) throw new Error(`ID "${newId}" is already taken.`);

  // 3. Copy all fields to the new document (strip any stale body 'id' field)
  const raw = oldSnap.data() as Record<string, unknown>;
  delete raw["id"];
  await setDoc(newRef, raw);

  // 4. Delete the old document
  await deleteDoc(oldRef);
}
