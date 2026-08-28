import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { FirestoreTestimonial } from "../../../store/types";

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

type TestimonialFormErrors = Partial<Record<keyof TestimonialFormState, string>>;

function buildInitialState(initialData?: FirestoreTestimonial): TestimonialFormState {
  if (!initialData) {
    return {
      clientName: "",
      clientImage: "",
      clientLocation: "",
      title: "",
      description: "",
      rating: "",
      position: "",
    };
  }
  return {
    clientName: initialData.clientName,
    clientImage: initialData.clientImage,
    clientLocation: initialData.clientLocation,
    title: initialData.title,
    description: initialData.description,
    rating: String(initialData.rating),
    position: initialData.position ?? "",
  };
}

function validate(values: TestimonialFormState): TestimonialFormErrors {
  const errors: TestimonialFormErrors = {};

  if (!values.clientName.trim()) errors.clientName = "Client name is required.";
  if (!values.clientImage.trim()) errors.clientImage = "Client image URL is required.";
  if (!values.clientLocation.trim()) errors.clientLocation = "Client location is required.";
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim()) errors.description = "Description is required.";

  const rating = Number(values.rating);
  if (
    !values.rating.trim() ||
    !Number.isInteger(rating) ||
    rating < MIN_RATING ||
    rating > MAX_RATING
  ) {
    errors.rating = `Rating must be a whole number from ${MIN_RATING} to ${MAX_RATING}.`;
  }

  return errors;
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

  const [values, setValues] = useState<TestimonialFormState>(() => buildInitialState(initialData));
  const [errors, setErrors] = useState<TestimonialFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof TestimonialFormState>(field: K, value: TestimonialFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: Omit<FirestoreTestimonial, "id"> = {
      clientName: values.clientName.trim(),
      clientImage: values.clientImage.trim(),
      clientLocation: values.clientLocation.trim(),
      title: values.title.trim(),
      description: values.description.trim(),
      rating: Number(values.rating),
      position: values.position.trim() || undefined,
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
      aria-labelledby="testimonial-form-title"
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
          <h3 id="testimonial-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Testimonial" : "Edit Testimonial"}
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
              <label className={labelClass} htmlFor="tf-client-name">Client Name</label>
              <input
                id="tf-client-name"
                type="text"
                placeholder="e.g. Wade Warren"
                value={values.clientName}
                onChange={(e) => setField("clientName", e.target.value)}
                className={fieldClass}
              />
              {errors.clientName && <p className={errorClass}>{errors.clientName}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="tf-client-location">Client Location</label>
              <input
                id="tf-client-location"
                type="text"
                placeholder="e.g. USA, California"
                value={values.clientLocation}
                onChange={(e) => setField("clientLocation", e.target.value)}
                className={fieldClass}
              />
              {errors.clientLocation && <p className={errorClass}>{errors.clientLocation}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="tf-client-image">Client Image URL</label>

            {values.clientImage.trim() && (
              <div
                className={`mb-3 flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border ${
                  isDark ? "border-bg-gray-1 bg-bg-dark" : "border-gray-200 bg-gray-50"
                }`}
              >
                <img src={values.clientImage} alt="Client preview" className="w-full h-full object-cover" />
              </div>
            )}

            <input
              id="tf-client-image"
              type="text"
              placeholder="https://example.com/client.jpg"
              value={values.clientImage}
              onChange={(e) => setField("clientImage", e.target.value)}
              className={fieldClass}
            />
            {errors.clientImage && <p className={errorClass}>{errors.clientImage}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="tf-title">Title</label>
              <input
                id="tf-title"
                type="text"
                placeholder="Testimonial headline"
                value={values.title}
                onChange={(e) => setField("title", e.target.value)}
                className={fieldClass}
              />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="tf-rating">Rating (1–5)</label>
              <input
                id="tf-rating"
                type="number"
                min={MIN_RATING}
                max={MAX_RATING}
                step="1"
                placeholder="e.g. 5"
                value={values.rating}
                onChange={(e) => setField("rating", e.target.value)}
                className={fieldClass}
              />
              {errors.rating && <p className={errorClass}>{errors.rating}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="tf-description">Description</label>
            <textarea
              id="tf-description"
              rows={4}
              placeholder="What the client said about working with Estatein"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${fieldClass} resize-none`}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="tf-position">Position (optional)</label>
            <input
              id="tf-position"
              type="text"
              placeholder="e.g. Marketing Director"
              value={values.position}
              onChange={(e) => setField("position", e.target.value)}
              className={fieldClass}
            />
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
            text={mode === "add" ? "Add Testimonial" : "Save Changes"}
            variant="primary"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
