import { useEffect, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { Value } from "../../../Data/aboutData";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface ValueFormState {
  title: string;
  description: string;
  icon: string;
}

type ValueFormErrors = Partial<Record<keyof ValueFormState, string>>;

function buildInitialState(initialData?: Value): ValueFormState {
  if (!initialData) {
    return { title: "", description: "", icon: "" };
  }
  return {
    title: initialData.title,
    description: initialData.description,
    icon: initialData.icon,
  };
}

function validate(values: ValueFormState): ValueFormErrors {
  const errors: ValueFormErrors = {};

  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.icon.trim()) errors.icon = "Icon is required.";

  return errors;
}

interface ValueFormModalProps {
  mode: "add" | "edit";
  initialData?: Value;
  onClose: () => void;
  onSubmit: (values: Omit<Value, "id">) => void;
}

export const ValueFormModal = ({ mode, initialData, onClose, onSubmit }: ValueFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values, setValues] = useState<ValueFormState>(() => buildInitialState(initialData));
  const [errors, setErrors] = useState<ValueFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  // Tracks the object URL created for a locally-picked icon, so it can be revoked.
  const createdObjectUrlRef = useRef<string | null>(null);

  const setField = <K extends keyof ValueFormState>(field: K, value: ValueFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Revoke the object URL on unmount to avoid a memory leak.
    return () => {
      if (createdObjectUrlRef.current) {
        URL.revokeObjectURL(createdObjectUrlRef.current);
      }
    };
  }, []);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset the input so picking the same file again still fires onChange.
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, icon: "Please select an image file." }));
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setErrors((prev) => ({ ...prev, icon: "Icon must be 5MB or smaller." }));
      return;
    }

    if (createdObjectUrlRef.current) {
      URL.revokeObjectURL(createdObjectUrlRef.current);
    }

    // No backend yet, so the file is kept as a local object URL only.
    const objectUrl = URL.createObjectURL(file);
    createdObjectUrlRef.current = objectUrl;

    setField("icon", objectUrl);
    setErrors((prev) => ({ ...prev, icon: undefined }));
  };

  const handleRemoveIcon = () => {
    if (createdObjectUrlRef.current) {
      URL.revokeObjectURL(createdObjectUrlRef.current);
      createdObjectUrlRef.current = null;
    }
    setField("icon", "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: Omit<Value, "id"> = {
      title: values.title.trim(),
      description: values.description.trim(),
      icon: values.icon.trim(),
    };

    onSubmit(payload);
  };

  const inputBgClass = isDark
    ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary";

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`;
  const fieldClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all ${inputBgClass}`;
  const errorClass = "mt-1.5 text-xs text-red-500";

  return (
    <div
      className="fixed inset-0 z-70 flex items-start sm:items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="value-form-title"
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
          <h3 id="value-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Value" : "Edit Value"}
          </h3>
          <button
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

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="px-6 sm:px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className={labelClass} htmlFor="vf-title">Title</label>
            <input
              id="vf-title"
              type="text"
              placeholder="e.g. Trust"
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              className={fieldClass}
            />
            {errors.title && <p className={errorClass}>{errors.title}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="vf-icon">Icon</label>

            {values.icon && (
              <div
                className={`relative mb-3 flex items-center justify-center w-24 h-24 rounded-xl overflow-hidden border ${
                  isDark ? "border-bg-gray-1 bg-bg-dark" : "border-gray-200 bg-gray-50"
                }`}
              >
                <img src={values.icon} alt="Value icon preview" className="w-12 h-12 object-contain" />
                <button
                  type="button"
                  onClick={handleRemoveIcon}
                  aria-label="Remove icon"
                  className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <HiXMark className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => iconInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 w-full py-6 px-4 rounded-xl border border-dashed text-center transition-colors cursor-pointer ${
                isDark
                  ? "border-bg-gray-1 text-gray hover:border-primary hover:text-white"
                  : "border-gray-300 text-gray-500 hover:border-primary hover:text-gray-700"
              }`}
            >
              <FiUploadCloud className="w-5 h-5" />
              <span className="text-sm font-medium">
                {values.icon ? "Change Icon" : "Click to upload an icon"}
              </span>
            </button>
            <input
              ref={iconInputRef}
              id="vf-icon"
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="sr-only"
              aria-describedby={errors.icon ? "vf-icon-error" : "vf-icon-hint"}
            />

            {errors.icon ? (
              <p id="vf-icon-error" className={errorClass}>{errors.icon}</p>
            ) : (
              <p id="vf-icon-hint" className={`mt-1.5 text-xs ${isDark ? "text-gray" : "text-gray-500"}`}>
                PNG or JPG, up to 5MB.
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="vf-description">Description</label>
            <textarea
              id="vf-description"
              rows={4}
              placeholder="Description"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${fieldClass} resize-none`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>
        </form>

        <div
          className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 sm:px-8 py-5 border-t ${
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
            Cancel
          </button>
          <Button
            text={mode === "add" ? "Add Value" : "Save Changes"}
            variant="primary"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
