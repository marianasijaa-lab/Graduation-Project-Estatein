import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { FirestoreFAQ } from "../../../store/types";

interface FAQFormState {
  question: string;
  description: string;
}

type FAQFormErrors = Partial<Record<keyof FAQFormState, string>>;

// Builds the form's starting values — blank for "add", pre-filled for "edit".
function buildInitialState(initialData?: FirestoreFAQ): FAQFormState {
  if (!initialData) {
    return { question: "", description: "" };
  }
  return {
    question: initialData.question,
    description: initialData.description,
  };
}

// Checks every field and returns a map of field -> error message.
function validate(values: FAQFormState): FAQFormErrors {
  const errors: FAQFormErrors = {};

  if (!values.question.trim()) errors.question = "Question is required.";
  if (!values.description.trim()) errors.description = "Description is required.";

  return errors;
}

interface FAQFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreFAQ;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreFAQ, "id">) => void;
}

export const FAQFormModal = ({ mode, initialData, onClose, onSubmit }: FAQFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values, setValues] = useState<FAQFormState>(() => buildInitialState(initialData));
  const [errors, setErrors] = useState<FAQFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof FAQFormState>(field: K, value: FAQFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // Validates the form and, if valid, hands the cleaned-up payload to onSubmit.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: Omit<FirestoreFAQ, "id"> = {
      question: values.question.trim(),
      description: values.description.trim(),
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
      aria-labelledby="faq-form-title"
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
          <h3 id="faq-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add FAQ" : "Edit FAQ"}
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
            <label className={labelClass} htmlFor="ff-question">Question</label>
            <input
              id="ff-question"
              type="text"
              placeholder="Add question"
              value={values.question}
              onChange={(e) => setField("question", e.target.value)}
              className={fieldClass}
            />
            {errors.question && <p className={errorClass}>{errors.question}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="ff-description">Description</label>
            <textarea
              id="ff-description"
              rows={4}
              placeholder="Answer to the question"
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
            text={mode === "add" ? "Add FAQ" : "Save Changes"}
            variant="primary"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
