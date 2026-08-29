import { useRef, useState } from "react";
import { HiOutlinePhoto, HiXMark } from "react-icons/hi2";
import { useTheme } from "../../Context/ThemeContext";
import { uploadImage, ImageUploadError } from "../../api/storage";

interface ImageUploadFieldProps {
  /** Field label shown above the upload box. */
  label: string;
  /** Current image URL, or "" if none selected yet. */
  value: string;
  /** Called with the real Firebase Storage download URL once upload finishes. */
  onChange: (url: string) => void;
  /** Storage sub-folder this image belongs to, e.g. "properties" or "values". */
  folder: string;
  /** Validation error to show below the field, if any. */
  error?: string;
}

/**
 * Reusable image picker: shows a placeholder or preview, uploads the picked
 * file straight to Firebase Storage, and reports back the real download URL.
 * Used by every dashboard form that manages an image/icon field.
 */
export const ImageUploadField = ({ label, value, onChange, folder, error }: ImageUploadFieldProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Uploads the picked file and swaps the field's value for the real download URL.
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset so picking the same file again still fires onChange
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof ImageUploadError ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Clears the field back to "no image" without opening the file picker.
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setUploadError(null);
  };

  const openPicker = () => {
    if (!uploading) inputRef.current?.click();
  };

  const boxClass = `relative flex flex-col items-center justify-center gap-2 w-full h-32 rounded-xl border border-dashed transition-colors overflow-hidden ${
    uploading ? "cursor-wait opacity-70" : "cursor-pointer"
  } ${
    isDark
      ? "border-bg-gray-1 bg-bg-dark text-gray hover:border-primary"
      : "border-gray-300 bg-gray-50 text-gray-400 hover:border-primary"
  }`;

  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
        {label}
      </label>

      {/* Whole box is the click target for opening the file picker. */}
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        className={boxClass}
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <HiXMark className="w-4 h-4" />
            </button>
          </>
        ) : uploading ? (
          <span className="text-sm">Uploading…</span>
        ) : (
          <>
            <HiOutlinePhoto className="w-8 h-8" />
            <span className="text-sm">Click to upload an image</span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
      />

      {(error ?? uploadError) && <p className="mt-1.5 text-xs text-red-500">{error ?? uploadError}</p>}
    </div>
  );
};
