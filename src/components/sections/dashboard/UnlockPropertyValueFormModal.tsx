import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import { ImageUploadField } from "../../ui/ImageUploadField";
import type { FirestoreUnlockPropertyValueCard } from "../../../store/types";

interface UnlockPropertyValueCardFormState {
  title: string;
  description: string;
  icon: string;
}

type UnlockPropertyValueCardFormErrors = Partial<Record<keyof UnlockPropertyValueCardFormState, string>>;

// Builds the form's starting values — blank for "add", pre-filled for "edit".
function buildInitialState(initialData?: FirestoreUnlockPropertyValueCard): UnlockPropertyValueCardFormState {
  if (!initialData) {
    return { title: "", description: "", icon: "" };
  }
  return {
    title: initialData.title,
    description: initialData.description,
    icon: initialData.icon,
  };
}

// Checks every field and returns a map of field -> error message.
function validate(values: UnlockPropertyValueCardFormState): UnlockPropertyValueCardFormErrors {
  const errors: UnlockPropertyValueCardFormErrors = {};

  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.icon.trim()) errors.icon = "Icon is required.";

  return errors;
}

interface UnlockPropertyValueFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreUnlockPropertyValueCard;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreUnlockPropertyValueCard, "id">) => void;
}

export const UnlockPropertyValueFormModal = ({
  mode,
  initialData,
  onClose,
  onSubmit,
}: UnlockPropertyValueFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values, setValues] = useState<UnlockPropertyValueCardFormState>(() => buildInitialState(initialData));
  const [errors, setErrors] = useState<UnlockPropertyValueCardFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof UnlockPropertyValueCardFormState>(
    field: K,
    value: UnlockPropertyValueCardFormState[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // Validates the form and, if valid, hands the cleaned-up payload to onSubmit.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: Omit<FirestoreUnlockPropertyValueCard, "id"> = {
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
      className="modal-scroll fixed inset-0 z-70 flex items-start sm:items-center justify-center bg-black/60 px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upv-card-form-title"
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
          <h3 id="upv-card-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Card" : "Edit Card"}
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
          className="modal-scroll px-6 sm:px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className={labelClass} htmlFor="upv-card-title">Title</label>
            <input
              id="upv-card-title"
              type="text"
              placeholder="Add title"
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              className={fieldClass}
            />
            {errors.title && <p className={errorClass}>{errors.title}</p>}
          </div>

          <ImageUploadField
            label="Icon"
            value={values.icon}
            onChange={(url) => setField("icon", url)}
            folder="unlockPropertyValue"
            error={errors.icon}
          />

          <div>
            <label className={labelClass} htmlFor="upv-card-description">Description</label>
            <textarea
              id="upv-card-description"
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
            text={mode === "add" ? "Add Card" : "Save Changes"}
            variant="primary"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
