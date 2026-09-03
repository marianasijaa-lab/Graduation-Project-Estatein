import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import { ImageUploadField } from "../../ui/ImageUploadField";
import type { FirestoreTestimonial } from "../../../store/types";
import { validateRequired, validateNumber } from "../../../utils/validation";

const MIN_RATING = 1;
const MAX_RATING = 5;

interface TestimonialFormState {
  clientName: string;
  clientImage: string;
  clientLocation: string;
  title: string;
  description: string;
  rating: string;
  position: string;
}

type F = keyof TestimonialFormState;
type Errors  = Partial<Record<F, string>>;
type Touched = Partial<Record<F, boolean>>;

const FIELDS: F[] = ["clientName", "clientImage", "clientLocation", "title", "description", "rating"];

function validateField(field: F, value: string): string {
  switch (field) {
    case "clientName":     return validateRequired(value, "Client name");
    case "clientImage":    return validateRequired(value, "Client image");
    case "clientLocation": return validateRequired(value, "Client location");
    case "title":          return validateRequired(value, "Title");
    case "description":    return validateRequired(value, "Description");
    case "rating":
      return validateNumber(value, "Rating", { required: true, min: MIN_RATING, max: MAX_RATING, integer: true });
    default: return "";
  }
}

function validateAll(values: TestimonialFormState): Errors {
  const errors: Errors = {};
  for (const f of FIELDS) {
    const err = validateField(f, values[f]);
    if (err) errors[f] = err;
  }
  return errors;
}

function buildInitialState(initialData?: FirestoreTestimonial): TestimonialFormState {
  if (!initialData)
    return { clientName: "", clientImage: "", clientLocation: "", title: "", description: "", rating: "", position: "" };
  return {
    clientName:     initialData.clientName,
    clientImage:    initialData.clientImage,
    clientLocation: initialData.clientLocation,
    title:          initialData.title,
    description:    initialData.description,
    rating:         String(initialData.rating),
    position:       initialData.position ?? "",
  };
}

interface TestimonialFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreTestimonial;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreTestimonial, "id">) => void;
}

export const TestimonialFormModal = ({ mode, initialData, onClose, onSubmit }: TestimonialFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values,  setValues]  = useState<TestimonialFormState>(() => buildInitialState(initialData));
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
      clientName:     values.clientName.trim(),
      clientImage:    values.clientImage.trim(),
      clientLocation: values.clientLocation.trim(),
      title:          values.title.trim(),
      description:    values.description.trim(),
      rating:         Number(values.rating),
      position:       values.position.trim() || undefined,
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
      role="dialog" aria-modal="true" aria-labelledby="testimonial-form-title"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl rounded-2xl border shadow-xl ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>
        <div className={`flex items-center justify-between px-6 sm:px-8 py-5 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <h3 id="testimonial-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Testimonial" : "Edit Testimonial"}
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
              <label className={labelClass} htmlFor="tf-client-name">Client Name</label>
              <input id="tf-client-name" type="text" placeholder="Add client name"
                value={values.clientName}
                onChange={(e) => setField("clientName", e.target.value)}
                onBlur={() => handleBlur("clientName")}
                aria-invalid={!!(touched.clientName && errors.clientName)}
                className={fieldClass("clientName")} />
              <Err f="clientName" />
            </div>
            <div>
              <label className={labelClass} htmlFor="tf-client-location">Client Location</label>
              <input id="tf-client-location" type="text" placeholder="Add location"
                value={values.clientLocation}
                onChange={(e) => setField("clientLocation", e.target.value)}
                onBlur={() => handleBlur("clientLocation")}
                aria-invalid={!!(touched.clientLocation && errors.clientLocation)}
                className={fieldClass("clientLocation")} />
              <Err f="clientLocation" />
            </div>
          </div>

          <ImageUploadField
            label="Client Image"
            value={values.clientImage}
            onChange={(url) => {
              setField("clientImage", url);
              setTouched((prev) => ({ ...prev, clientImage: true }));
            }}
            folder="testimonials"
            error={touched.clientImage ? errors.clientImage : undefined}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="tf-title">Title</label>
              <input id="tf-title" type="text" placeholder="Testimonial headline"
                value={values.title}
                onChange={(e) => setField("title", e.target.value)}
                onBlur={() => handleBlur("title")}
                aria-invalid={!!(touched.title && errors.title)}
                className={fieldClass("title")} />
              <Err f="title" />
            </div>
            <div>
              <label className={labelClass} htmlFor="tf-rating">Rating (1–5)</label>
              <input id="tf-rating" type="number" min={MIN_RATING} max={MAX_RATING} step="1" placeholder="Add rating"
                value={values.rating}
                onChange={(e) => setField("rating", e.target.value)}
                onBlur={() => handleBlur("rating")}
                aria-invalid={!!(touched.rating && errors.rating)}
                className={fieldClass("rating")} />
              <Err f="rating" />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="tf-description">Description</label>
            <textarea id="tf-description" rows={4} placeholder="What the client said about working with Estatein"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              aria-invalid={!!(touched.description && errors.description)}
              className={`${fieldClass("description")} resize-none`} />
            <Err f="description" />
          </div>

          <div>
            <label className={labelClass} htmlFor="tf-position">Position (optional)</label>
            <input id="tf-position" type="text" placeholder="Add position"
              value={values.position}
              onChange={(e) => setField("position", e.target.value)}
              className={fieldClass("position")} />
          </div>
        </form>

        <div className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 sm:px-8 py-5 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <button type="button" onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            Cancel
          </button>
          <Button text={mode === "add" ? "Add Testimonial" : "Save Changes"} variant="primary" type="submit"
            onClick={() => formRef.current?.requestSubmit()} />
        </div>
      </div>
    </div>
  );
};
