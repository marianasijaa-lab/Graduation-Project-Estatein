import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";

export interface DetailField {
  label: string;
  value: ReactNode;
  /** Span both grid columns — for long text fields. */
  fullWidth?: boolean;
}

interface DetailModalProps {
  title: string;
  fields: DetailField[];
  onClose: () => void;
}

// Generic read-only "view details" dialog, reused by every dashboard section.
export const DetailModal = ({ title, fields, onClose }: DetailModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const labelClass = `text-xs font-medium uppercase tracking-wider mb-1.5 ${isDark ? "text-gray" : "text-gray-500"}`;
  const valueClass = `text-sm break-words ${isDark ? "text-white" : "text-gray-900"}`;

  return (
    <div
      className="modal-scroll fixed inset-0 z-70 flex items-start sm:items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-2xl border shadow-xl ${
          isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 sm:px-8 py-5 border-b ${
            isDark ? "border-bg-gray-1" : "border-gray-200"
          }`}
        >
          <h3 id="detail-modal-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors cursor-pointer ${
              isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-scroll px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
          {fields.map((field) => (
            <div key={field.label} className={field.fullWidth ? "sm:col-span-2" : undefined}>
              <p className={labelClass}>{field.label}</p>
              <div className={valueClass}>{field.value}</div>
            </div>
          ))}
        </div>

        <div
          className={`flex justify-end px-6 sm:px-8 py-5 border-t ${
            isDark ? "border-bg-gray-1" : "border-gray-200"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
              isDark
                ? "border-bg-gray-1 text-white hover:bg-bg-gray-1"
                : "border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
