import { useEffect, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { FirestoreValue } from "../../../store/types";
import { uploadImage, ImageUploadError } from "../../../api/storage";
import { validateRequired } from "../../../utils/validation";

interface ValueFormState {
  title: string;
  description: string;
  icon: string;
}

type F = keyof ValueFormState;
type Errors  = Partial<Record<F, string>>;
type Touched = Partial<Record<F, boolean>>;

const FIELDS: F[] = ["title", "description", "icon"];

function validateField(field: F, value: string): string {
  if (field === "title")       return validateRequired(value, "Title");
  if (field === "description") return validateRequired(value, "Description");
  if (field === "icon")        return validateRequired(value, "Icon");
  return "";
}

function validateAll(values: ValueFormState): Errors {
  const errors: Errors = {};
  for (const f of FIELDS) {
    const err = validateField(f, values[f]);
    if (err) errors[f] = err;
  }
  return errors;
}

function buildInitialState(initialData?: FirestoreValue): ValueFormState {
  if (!initialData) return { title: "", description: "", icon: "" };
  return { title: initialData.title, description: initialData.description, icon: initialData.icon };
}

interface ValueFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreValue;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreValue, "id">) => void;
}

export const ValueFormModal = ({ mode, initialData, onClose, onSubmit }: ValueFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values,      setValues]      = useState<ValueFormState>(() => buildInitialState(initialData));
  const [errors,      setErrors]      = useState<Errors>({});
  const [touched,     setTouched]     = useState<Touched>({});
  const [isUploading, setIsUploading] = useState(false);
  const formRef    = useRef<HTMLFormElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  const setField = (field: F, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleBlur = (field: F) => {
    if (touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setIsUploading(true);
    setErrors((prev) => ({ ...prev, icon: undefined }));
    try {
      const url = await uploadImage(file, "values");
      setField("icon", url);
      setTouched((prev) => ({ ...prev, icon: true }));
    } catch (err) {
      const message = err instanceof ImageUploadError ? err.message : "Upload failed. Please try again.";
      setTouched((prev) => ({ ...prev, icon: true }));
      setErrors((prev) => ({ ...prev, icon: message }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveIcon = () => {
    setField("icon", "");
    setTouched((prev) => ({ ...prev, icon: true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = FIELDS.reduce((a, f) => ({ ...a, [f]: true }), {} as Record<F, boolean>);
    setTouched(allTouched);
    const allErrors = validateAll(values);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;
    onSubmit({ title: values.title.trim(), description: values.description.trim(), icon: values.icon.trim() });
  };

  const inputBgClass = (field: F) => {
    const hasErr = touched[field] && errors[field];
    if (hasErr)
      return isDark
        ? "bg-bg-dark border-red-500 text-white placeholder-gray-500 focus:border-red-400"
        : "bg-gray-50 border-red-500 text-gray-900 placeholder-gray-400 focus:border-red-400";
    return isDark
      ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary";
  };

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`;
  const fieldClass = (f: F) => `w-full px-4 py-3 rounded-xl border outline-none transition-all ${inputBgClass(f)}`;
  const errorClass = "mt-1.5 flex items-center gap-1 text-xs text-red-400";

  const Err = ({ f }: { f: F }) =>
    touched[f] && errors[f] ? (
      <p role="alert" className={errorClass}><span aria-hidden="true">⚠</span>{errors[f]}</p>
    ) : null;

  return (
    <div
      className="modal-scroll fixed inset-0 z-70 flex items-start sm:items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
      role="dialog" aria-modal="true" aria-labelledby="value-form-title"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl rounded-2xl border shadow-xl ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>
        <div className={`flex items-center justify-between px-6 sm:px-8 py-5 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <h3 id="value-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Value" : "Edit Value"}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`}>
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate
          className="modal-scroll px-6 sm:px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">

          <div>
            <label className={labelClass} htmlFor="vf-title">Title</label>
            <input id="vf-title" type="text" placeholder="e.g. Trust"
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              onBlur={() => handleBlur("title")}
              aria-invalid={!!(touched.title && errors.title)}
              className={fieldClass("title")} />
            <Err f="title" />
          </div>

          <div>
            <label className={labelClass} htmlFor="vf-icon">Icon</label>
            {values.icon && (
              <div className={`relative mb-3 flex items-center justify-center w-24 h-24 rounded-xl overflow-hidden border ${isDark ? "border-bg-gray-1 bg-bg-dark" : "border-gray-200 bg-gray-50"}`}>
                <img src={values.icon} alt="Value icon preview" className="w-12 h-12 object-contain" />
                <button type="button" onClick={handleRemoveIcon} aria-label="Remove icon"
                  className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer">
                  <HiXMark className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button type="button" onClick={() => iconInputRef.current?.click()} disabled={isUploading}
              className={`flex flex-col items-center justify-center gap-2 w-full py-6 px-4 rounded-xl border border-dashed text-center transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                touched.icon && errors.icon
                  ? "border-red-500 text-red-400"
                  : isDark
                  ? "border-bg-gray-1 text-gray hover:border-primary hover:text-white"
                  : "border-gray-300 text-gray-500 hover:border-primary hover:text-gray-700"
              }`}>
              <FiUploadCloud className="w-5 h-5" />
              <span className="text-sm font-medium">
                {isUploading ? "Uploading…" : values.icon ? "Change Icon" : "Click to upload an icon"}
              </span>
            </button>
            <input ref={iconInputRef} id="vf-icon" type="file" accept="image/*"
              onChange={handleIconChange} className="sr-only" />
            {touched.icon && errors.icon ? (
              <p role="alert" className={errorClass}><span aria-hidden="true">⚠</span>{errors.icon}</p>
            ) : (
              <p className={`mt-1.5 text-xs ${isDark ? "text-gray" : "text-gray-500"}`}>PNG or JPG, up to 5MB.</p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="vf-description">Description</label>
            <textarea id="vf-description" rows={4} placeholder="Description"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              aria-invalid={!!(touched.description && errors.description)}
              className={`${fieldClass("description")} resize-none`} />
            <Err f="description" />
          </div>
        </form>

        <div className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 sm:px-8 py-5 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <button type="button" onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            Cancel
          </button>
          <Button text={isUploading ? "Uploading…" : mode === "add" ? "Add Value" : "Save Changes"}
            variant="primary" type="submit" onClick={() => formRef.current?.requestSubmit()} />
        </div>
      </div>
    </div>
  );
};
