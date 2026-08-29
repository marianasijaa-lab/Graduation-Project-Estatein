import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/** Thrown by uploadImage() for any validation/upload failure. */
export class ImageUploadError extends Error {}

/**
 * Uploads a single image file to Firebase Storage under `images/{folder}/`
 * and returns its permanent download URL — safe to store in Firestore and
 * safe across refreshes/other users (unlike a local blob: URL).
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!storage) {
    throw new ImageUploadError('Firebase Storage is not configured — please fill in the .env file.');
  }
  if (!file.type.startsWith('image/')) {
    throw new ImageUploadError('Please select an image file.');
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new ImageUploadError('Image must be 5MB or smaller.');
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop() : undefined;
  const fileName = `${crypto.randomUUID()}${extension ? `.${extension}` : ''}`;
  const storageRef = ref(storage, `images/${folder}/${fileName}`);

  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
