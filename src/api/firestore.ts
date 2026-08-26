
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QuerySnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { firestoreDb } from '../firebase/config';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Callback يُستدعى عند كل تغيير في الـ collection */
export type SnapshotCallback<T> = (docs: T[]) => void;

/** Callback يُستدعى عند حدوث خطأ في الاستماع */
export type ErrorCallback = (error: Error) => void;

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * تحويل QuerySnapshot إلى مصفوفة من الكائنات مع إضافة id لكل document.
 */
function snapshotToDocs<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

// ─── Real-time Subscription (onSnapshot) ─────────────────────────────────────

/**
 * يستمع بشكل فوري (WebSocket) لأي تغيير في collection.
 * يُعيد دالة unsubscribe لإيقاف الاستماع عند unmount.
 *
 * @param collectionName  اسم الـ collection في Firestore
 * @param onData          callback يستقبل المصفوفة المحدّثة
 * @param onError         callback يستقبل الخطأ (اختياري)
 * @param fallbackData    بيانات احتياطية تُعاد عند غياب Firebase
 */
export function subscribeToCollection<T>(
  collectionName: string,
  onData: SnapshotCallback<T>,
  onError?: ErrorCallback,
  fallbackData?: T[],
): Unsubscribe {
  // Firebase غير مهيأ — نستخدم البيانات الاحتياطية ونُعيد دالة فارغة
  if (!firestoreDb) {
    if (fallbackData) onData(fallbackData);
    return () => {};
  }

  // اعرض البيانات الاحتياطية فورًا إلى أن تصل بيانات Firestore.
  if (fallbackData) onData(fallbackData);

  const colRef = collection(firestoreDb, collectionName);

  // timeout احتياطي: إذا لم تصل أي بيانات خلال 8 ثوانٍ نستخدم الـ fallback
  let receivedFirstSnapshot = false;
  const fallbackTimer = fallbackData
    ? setTimeout(() => {
        if (!receivedFirstSnapshot) {
          onData(fallbackData);
        }
      }, 8000)
    : null;

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      receivedFirstSnapshot = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // إذا كانت الـ collection فارغة في Firebase نستخدم الـ fallback
      if (snapshot.empty && fallbackData) {
        onData(fallbackData);
      } else {
        onData(snapshotToDocs<T>(snapshot));
      }
    },
    (error) => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      // عند الخطأ نعرض الـ fallback بدل إظهار رسالة الخطأ
      if (fallbackData) {
        onData(fallbackData);
      } else if (onError) {
        onError(error);
      }
    },
  );

  return () => {
    if (fallbackTimer) clearTimeout(fallbackTimer);
    unsubscribe();
  };
}

// ─── Add ──────────────────────────────────────────────────────────────────────

/**
 * يضيف document جديد بـ auto-generated ID.
 * يُعيد الـ ID المُنشأ.
 */
export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>,
): Promise<string> {
  if (!firestoreDb) throw new Error('Firebase غير مهيأ');

  const docRef = await addDoc(collection(firestoreDb, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// ─── Set (Upsert) ─────────────────────────────────────────────────────────────

/**
 * يكتب document بـ ID محدد (ينشئ أو يستبدل).
 */
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Omit<T, 'id'>,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase غير مهيأ');

  await setDoc(doc(firestoreDb, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

/**
 * يحدّث حقولاً محددة في document موجود (merge جزئي).
 */
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<Omit<T, 'id'>>,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase غير مهيأ');

  await updateDoc(doc(firestoreDb, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  } as DocumentData);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * يحذف document بـ ID محدد.
 */
export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  if (!firestoreDb) throw new Error('Firebase غير مهيأ');

  await deleteDoc(doc(firestoreDb, collectionName, id));
}
