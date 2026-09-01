import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { FirestoreCompany } from "../../../store/types";
import { validateRequired, validateUrl } from "../../../utils/validation";

interface ClientFormState {
  heading: string;
  date: string;
  domain: string;
  category: string;
  link: string;
  testimony: string;
}

type F = keyof ClientFormState;
type Errors  = Partial<Record<F, string>>;
type Touched = Partial<Record<F, boolean>>;

const FIELDS: F[] = ["heading", "date", "domain", "category", "link", "testimony"];

function validateField(field: F, value: string): string {
  switch (field) {
    case "heading":   return validateRequired(value, "Company name");
    case "date":      return validateRequired(value, "Client since");
    case "domain":    return validateRequired(value, "Domain");
    case "category":  return validateRequired(value, "Category");
    case "testimony": return validateRequired(value, "Testimony");
    case "link":      return validateUrl(value, "Website link", false); // optional but must be valid if filled
    default: return "";
  }
}

function validateAll(values: ClientFormState): Errors {
  const errors: Errors = {};
  for (const f of FIELDS) {
    const err = validateField(f, values[f]);
    if (err) errors[f] = err;
  }
  return errors;
}

function buildInitialState(initialData?: FirestoreCompany): ClientFormState {
  if (!initialData) return { heading: "", date: "", domain: "", category: "", link: "", testimony: "" };
  return {
    heading:   initialData.heading,
    date:      initialData.date,
    domain:    initialData.domain,
    category:  initialData.category,
    link:      initialData.link,
    testimony: initialData.testimony,
  };
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

  const [values,  setValues]  = useState<ClientFormState>(() => buildInitialState(initialData));
  const [errors,  setErrors]  = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = (field: F, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleBlur = (field: F) => {
    if (touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = FIELDS.reduce((a, f) => ({ ...a, [f]: true }), {} as Record<F, boolean>);
    setTouched(allTouched);
    const allErrors = validateAll(values);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;
    onSubmit({
      heading:   values.heading.trim(),
      date:      values.date.trim(),
      domain:    values.domain.trim(),
      category:  values.category.trim(),
      link:      values.link.trim(),
      testimony: values.testimony.trim(),
    });
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
      role="dialog" aria-modal="true" aria-labelledby="client-form-title"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl rounded-2xl border shadow-xl ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>
        <div className={`flex items-center justify-between px-6 sm:px-8 py-5 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <h3 id="client-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Client" : "Edit Client"}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`}>
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate
          className="modal-scroll px-6 sm:px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="cf-heading">Company Name</label>
              <input id="cf-heading" type="text" placeholder="Company Name"
                value={values.heading}
                onChange={(e) => setField("heading", e.target.value)}
                onBlur={() => handleBlur("heading")}
                aria-invalid={!!(touched.heading && errors.heading)}
                className={fieldClass("heading")} />
              <Err f="heading" />
            </div>
            <div>
              <label className={labelClass} htmlFor="cf-date">Client Since</label>
              <input id="cf-date" type="text" placeholder="e.g. Since 2019"
                value={values.date}
                onChange={(e) => setField("date", e.target.value)}
                onBlur={() => handleBlur("date")}
                aria-invalid={!!(touched.date && errors.date)}
                className={fieldClass("date")} />
              <Err f="date" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="cf-domain">Domain</label>
              <input id="cf-domain" type="text" placeholder="e.g. Commercial Real Estate"
                value={values.domain}
                onChange={(e) => setField("domain", e.target.value)}
                onBlur={() => handleBlur("domain")}
                aria-invalid={!!(touched.domain && errors.domain)}
                className={fieldClass("domain")} />
              <Err f="domain" />
            </div>
            <div>
              <label className={labelClass} htmlFor="cf-category">Category</label>
              <input id="cf-category" type="text" placeholder="e.g. Luxury Home Development"
                value={values.category}
                onChange={(e) => setField("category", e.target.value)}
                onBlur={() => handleBlur("category")}
                aria-invalid={!!(touched.category && errors.category)}
                className={fieldClass("category")} />
              <Err f="category" />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="cf-link">Website Link (optional)</label>
            <input id="cf-link" type="text" placeholder="https://example.com"
              value={values.link}
              onChange={(e) => setField("link", e.target.value)}
              onBlur={() => handleBlur("link")}
              aria-invalid={!!(touched.link && errors.link)}
              className={fieldClass("link")} />
            <Err f="link" />
          </div>

          <div>
            <label className={labelClass} htmlFor="cf-testimony">Testimony</label>
            <textarea id="cf-testimony" rows={4} placeholder="What they said about working with Estatein"
              value={values.testimony}
              onChange={(e) => setField("testimony", e.target.value)}
              onBlur={() => handleBlur("testimony")}
              aria-invalid={!!(touched.testimony && errors.testimony)}
              className={`${fieldClass("testimony")} resize-none`} />
            <Err f="testimony" />
          </div>
        </form>

        <div className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 sm:px-8 py-5 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <button type="button" onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            Cancel
          </button>
          <Button text={mode === "add" ? "Add Client" : "Save Changes"} variant="primary" type="submit"
            onClick={() => formRef.current?.requestSubmit()} />
        </div>
      </div>
    </div>
  );
};
