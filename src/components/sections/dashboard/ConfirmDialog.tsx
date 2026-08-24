import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Generic "are you sure?" dialog, reused by every dashboard section.
export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl border p-6 shadow-xl ${
          isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"
        }`}
      >
        <h3
          id="confirm-dialog-title"
          className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-gray" : "text-gray-600"}`}>
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
              isDark
                ? "border-bg-gray-1 text-white hover:bg-bg-gray-1"
                : "border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cancelLabel}
          </button>
          <Button text={confirmLabel} variant="primary" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};
