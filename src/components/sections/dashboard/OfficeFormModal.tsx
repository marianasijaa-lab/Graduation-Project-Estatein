import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import { ImageUploadField } from "../../ui/ImageUploadField";
import type { FirestoreOffice } from "../../../store/types";

const OFFICE_TYPE_OPTIONS = ["Regional", "International", "Local"] as const;

interface OfficeFormState {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  type: FirestoreOffice["type"];
  latitude: string;
  longitude: string;
  image: string;
  description: string;
  directionsUrl: string;
  order: string;
}

type OfficeFormErrors = Partial<Record<keyof OfficeFormState, string>>;

// Builds the form's starting values — blank for "add", pre-filled for "edit".
function buildInitialState(initialData?: FirestoreOffice): OfficeFormState {
  if (!initialData) {
    return {
      name: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      type: OFFICE_TYPE_OPTIONS[0],
      latitude: "",
      longitude: "",
      image: "",
      description: "",
      directionsUrl: "",
      order: "",
    };
  }
  return {
    name: initialData.name,
    address: initialData.address,
    city: initialData.city,
    country: initialData.country,
    phone: initialData.phone,
    email: initialData.email,
    type: initialData.type,
    latitude: initialData.latitude !== undefined ? String(initialData.latitude) : "",
    longitude: initialData.longitude !== undefined ? String(initialData.longitude) : "",
    image: initialData.image ?? "",
    description: initialData.description ?? "",
    directionsUrl: initialData.directionsUrl ?? "",
    order: initialData.order !== undefined ? String(initialData.order) : "",
  };
}

// Checks every field and returns a map of field -> error message.
function validate(values: OfficeFormState): OfficeFormErrors {
  const errors: OfficeFormErrors = {};

  if (!values.name.trim()) errors.name = "Office name is required.";
  if (!values.address.trim()) errors.address = "Address is required.";
  if (!values.city.trim()) errors.city = "City is required.";
  if (!values.country.trim()) errors.country = "Country is required.";
  if (!values.phone.trim()) errors.phone = "Phone is required.";

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.latitude.trim()) {
    const latitude = Number(values.latitude);
    if (Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
      errors.latitude = "Latitude must be a number between -90 and 90.";
    }
  }

  if (values.longitude.trim()) {
    const longitude = Number(values.longitude);
    if (Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
      errors.longitude = "Longitude must be a number between -180 and 180.";
    }
  }

  if (values.order.trim()) {
    const order = Number(values.order);
    if (!Number.isInteger(order) || order < 0) {
      errors.order = "Order must be a whole number of 0 or more.";
    }
  }

  return errors;
}

interface OfficeFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreOffice;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreOffice, "id">) => void;
}

export const OfficeFormModal = ({ mode, initialData, onClose, onSubmit }: OfficeFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values, setValues] = useState<OfficeFormState>(() => buildInitialState(initialData));
  const [errors, setErrors] = useState<OfficeFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends keyof OfficeFormState>(field: K, value: OfficeFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // Validates the form and, if valid, hands the cleaned-up payload to onSubmit.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: Omit<FirestoreOffice, "id"> = {
      name: values.name.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
      country: values.country.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      type: values.type,
      latitude: values.latitude.trim() ? Number(values.latitude) : undefined,
      longitude: values.longitude.trim() ? Number(values.longitude) : undefined,
      image: values.image.trim() || undefined,
      description: values.description.trim() || undefined,
      directionsUrl: values.directionsUrl.trim() || undefined,
      order: values.order.trim() ? Number(values.order) : undefined,
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
      aria-labelledby="office-form-title"
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
          <h3 id="office-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Office" : "Edit Office"}
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
              <label className={labelClass} htmlFor="of-name">Office Name</label>
              <input
                id="of-name"
                type="text"
                placeholder="Estatein — London"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                className={fieldClass}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="of-type">Type</label>
              <select
                id="of-type"
                value={values.type}
                onChange={(e) => setField("type", e.target.value as FirestoreOffice["type"])}
                className={`${fieldClass} cursor-pointer`}
              >
                {OFFICE_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option} className={isDark ? "bg-bg-dark" : "bg-white"}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="of-address">Address</label>
            <input
              id="of-address"
              type="text"
              placeholder="1 Canada Square, Canary Wharf"
              value={values.address}
              onChange={(e) => setField("address", e.target.value)}
              className={fieldClass}
            />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="of-city">City</label>
              <input
                id="of-city"
                type="text"
                placeholder="London"
                value={values.city}
                onChange={(e) => setField("city", e.target.value)}
                className={fieldClass}
              />
              {errors.city && <p className={errorClass}>{errors.city}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="of-country">Country</label>
              <input
                id="of-country"
                type="text"
                placeholder="United Kingdom"
                value={values.country}
                onChange={(e) => setField("country", e.target.value)}
                className={fieldClass}
              />
              {errors.country && <p className={errorClass}>{errors.country}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="of-phone">Phone</label>
              <input
                id="of-phone"
                type="tel"
                placeholder="+44 20 5555 0300"
                value={values.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className={fieldClass}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="of-email">Email</label>
              <input
                id="of-email"
                type="email"
                placeholder="london@estatein.com"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                className={fieldClass}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>
          </div>

          <ImageUploadField
            label="Office Photo (optional)"
            value={values.image}
            onChange={(url) => setField("image", url)}
            folder="offices"
          />

          <div>
            <label className={labelClass} htmlFor="of-description">Description (optional)</label>
            <textarea
              id="of-description"
              rows={3}
              placeholder="Short blurb shown on the public office card"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="of-directions">Directions URL (optional)</label>
            <input
              id="of-directions"
              type="url"
              placeholder="https://maps.google.com/…"
              value={values.directionsUrl}
              onChange={(e) => setField("directionsUrl", e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelClass} htmlFor="of-latitude">Latitude (optional)</label>
              <input
                id="of-latitude"
                type="number"
                step="any"
                placeholder="51.5045"
                value={values.latitude}
                onChange={(e) => setField("latitude", e.target.value)}
                className={fieldClass}
              />
              {errors.latitude && <p className={errorClass}>{errors.latitude}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="of-longitude">Longitude (optional)</label>
              <input
                id="of-longitude"
                type="number"
                step="any"
                placeholder="-0.0199"
                value={values.longitude}
                onChange={(e) => setField("longitude", e.target.value)}
                className={fieldClass}
              />
              {errors.longitude && <p className={errorClass}>{errors.longitude}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="of-order">Order (optional)</label>
              <input
                id="of-order"
                type="number"
                min="0"
                step="1"
                placeholder="1"
                value={values.order}
                onChange={(e) => setField("order", e.target.value)}
                className={fieldClass}
              />
              {errors.order && <p className={errorClass}>{errors.order}</p>}
            </div>
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
            text={mode === "add" ? "Add Office" : "Save Changes"}
            variant="primary"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
