import { useEffect, useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";

interface RenameIdDialogProps {
  open: boolean;
  currentId: string;
  collectionName: string;
  onConfirm: (newId: string) => Promise<void>;
  onCancel: () => void;
}

/**
 * Dialog that lets the user rename a Firestore document ID.
 * It calls onConfirm with the new ID — the parent is responsible
 * for the actual copy+delete operation via renameDocumentId().
 */
export const RenameIdDialog = ({
  open,
  currentId,
  onConfirm,
  onCancel,
}: RenameIdDialogProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [newId, setNewId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset fields every time the dialog opens for a different item
  useEffect(() => {
    if (open) {
      setNewId("");
      setError("");
      setLoading(false);
    }
  }, [open, currentId]);

  if (!open) return null;

  const isValid = /^[a-zA-Z0-9_\-]+$/.test(newId.trim()) && newId.trim().length > 0;

  const handleConfirm = async () => {
    const trimmed = newId.trim();
    if (!isValid) {
      setError("ID can only contain letters, numbers, hyphens and underscores.");
      return;
    }
    if (trimmed === currentId) {
      setError("New ID must be different from the current one.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onConfirm(trimmed);
      // onConfirm closes the dialog — if we reach here it succeeded
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rename. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm font-mono ${
    isDark
      ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"
  }`;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rename-id-title"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl border p-6 shadow-xl ${
          isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"
        }`}
      >
        <h3
          id="rename-id-title"
          className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Rename Document ID
        </h3>

        <p className={`mt-1.5 text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          A new document will be created with the new ID and the old one will be deleted.
        </p>

        <div className="mt-4 space-y-2">
          <label className={`block text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray" : "text-gray-400"}`}>
            Current ID
          </label>
          <p className={`px-4 py-2.5 rounded-xl border text-sm font-mono truncate ${
            isDark ? "bg-bg-dark border-bg-gray-1 text-gray" : "bg-gray-100 border-gray-200 text-gray-500"
          }`}>
            {currentId}
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <label
            htmlFor="new-doc-id"
            className={`block text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray" : "text-gray-400"}`}
          >
            New ID
          </label>
          <input
            id="new-doc-id"
            type="text"
            value={newId}
            onChange={(e) => { setNewId(e.target.value); setError(""); }}
            onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); if (e.key === "Escape") onCancel(); }}
            placeholder="e.g. prop-1, contact-dubai"
            className={inputClass}
            autoFocus
            spellCheck={false}
          />
          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Letters, numbers, hyphens and underscores only.
          </p>
          {error && (
            <p className="text-xs text-rose-400">{error}</p>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
              isDark
                ? "border-bg-gray-1 text-white hover:bg-bg-gray-1"
                : "border-gray-200 text-gray-700 hover:bg-gray-100"
            } disabled:opacity-50`}
          >
            Cancel
          </button>
          <Button
            text={loading ? "Renaming…" : "Rename"}
            variant="primary"
            onClick={handleConfirm}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};
