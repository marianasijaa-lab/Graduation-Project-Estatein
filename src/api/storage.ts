const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/** Thrown by uploadImage() for any validation or upload failure. */
export class ImageUploadError extends Error {}

/**
 * Uploads a single image file to Cloudinary using an *unsigned* upload preset
 * and returns the permanent secure URL — safe to store in Firestore.
 *
 * Required env vars:
 *   VITE_CLOUDINARY_CLOUD_NAME   — e.g. "my-cloud"
 *   VITE_CLOUDINARY_UPLOAD_PRESET — e.g. "ml_default"  (must be set to Unsigned)
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

  if (!cloudName || !uploadPreset) {
    throw new ImageUploadError(
      'Cloudinary is not configured — add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.'
    );
  }

  if (!file.type.startsWith('image/')) {
    throw new ImageUploadError('Please select an image file.');
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new ImageUploadError('Image must be 5 MB or smaller.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', `estatein/${folder}`);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  let response: Response;
  try {
    response = await fetch(url, { method: 'POST', body: formData });
  } catch {
    throw new ImageUploadError('Upload failed. Check your internet connection and try again.');
  }

  if (!response.ok) {
    let message = `Upload failed (HTTP ${response.status}).`;
    try {
      const json = await response.json();
      if (json?.error?.message) message = json.error.message;
    } catch {
      // ignore JSON parse errors
    }
    console.error('[uploadImage] Cloudinary error:', message);
    throw new ImageUploadError(message);
  }

  const data = await response.json();

  if (!data?.secure_url) {
    throw new ImageUploadError('Upload succeeded but no URL was returned. Please try again.');
  }

  return data.secure_url as string;
}
