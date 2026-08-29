import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { FirestoreCompany } from "../../../store/types";

interface ClientFormState {
  heading: string;
  date: string;
  domain: string;
  category: string;
  link: string;
  testimony: string;
}

type ClientFormErrors = Partial<Record<keyof ClientFormState, string>>;

// Builds the form's starting values — blank for "add", pre-filled for "edit".
function buildInitialState(initialData?: FirestoreCompany): ClientFormState {
  if (!initialData) {
    return { heading: "", date: "", domain: "", category: "", link: "", testimony: "" };
  }
  return {
    heading: initialData.heading,
    date: initialData.date,
    domain: initialData.domain,
    category: initialData.category,
    link: initialData.link,
    testimony: initialData.testimony,
  };
}

// Checks every field and returns a map of field -> error message.
function validate(values: ClientFormState): ClientFormErrors {
  const errors: ClientFormErrors = {};

  if (!values.heading.trim()) errors.heading = "Company name is required.";
  if (!values.date.trim()) errors.date = "Client since is required.";
  if (!values.domain.trim()) errors.domain = "Domain is required.";
  if (!values.category.trim()) errors.category = "Category is required.";
  if (!values.testimony.trim()) errors.testimony = "Testimony is required.";

  return errors;
}

interface ClientFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreCompany;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreCompany, "id">) => void;
}

export const ClientFormModal = ({ mode, initialData, onClose, onSubmit }: ClientFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values, setValues] = useState<ClientFormState>(() => buildInitialState(initialData));
  const [errors, setErrors] = useState<ClientFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof ClientFormState>(field: K, value: ClientFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // Validates the form and, if valid, hands the cleaned-up payload to onSubmit.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: Omit<FirestoreCompany, "id"> = {
      heading: values.heading.trim(),
      date: values.date.trim(),
      domain: values.domain.trim(),
      category: values.category.trim(),
      link: values.link.trim(),
      testimony: values.testimony.trim(),
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
      aria-labelledby="client-form-title"
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
          <h3 id="client-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Client" : "Edit Client"}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="cf-heading">Company Name</label>
              <input
                id="cf-heading"
                type="text"
                placeholder="Company Name"
                value={values.heading}
                onChange={(e) => setField("heading", e.target.value)}
                className={fieldClass}
              />
              {errors.heading && <p className={errorClass}>{errors.heading}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="cf-date">Client Since</label>
              <input
                id="cf-date"
                type="text"
                placeholder="Add client since"
                value={values.date}
                onChange={(e) => setField("date", e.target.value)}
                className={fieldClass}
              />
              {errors.date && <p className={errorClass}>{errors.date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="cf-domain">Domain</label>
              <input
                id="cf-domain"
                type="text"
                placeholder="Add domain"
                value={values.domain}
                onChange={(e) => setField("domain", e.target.value)}
                className={fieldClass}
              />
              {errors.domain && <p className={errorClass}>{errors.domain}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="cf-category">Category</label>
              <input
                id="cf-category"
                type="text"
                placeholder="Add category"
                value={values.category}
                onChange={(e) => setField("category", e.target.value)}
                className={fieldClass}
              />
              {errors.category && <p className={errorClass}>{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="cf-link">Website Link (optional)</label>
            <input
              id="cf-link"
              type="text"
              placeholder="https://example.com"
              value={values.link}
              onChange={(e) => setField("link", e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="cf-testimony">Testimony</label>
            <textarea
              id="cf-testimony"
              rows={4}
              placeholder="What they said about working with Estatein"
              value={values.testimony}
              onChange={(e) => setField("testimony", e.target.value)}
              className={`${fieldClass} resize-none`}
            />
            {errors.testimony && <p className={errorClass}>{errors.testimony}</p>}
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
            text={mode === "add" ? "Add Client" : "Save Changes"}
            variant="primary"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
