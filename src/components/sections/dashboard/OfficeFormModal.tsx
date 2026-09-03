import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import { ImageUploadField } from "../../ui/ImageUploadField";
import type { FirestoreOffice } from "../../../store/types";
import { validateRequired, validateEmail, validatePhone, validateUrl, validateNumber } from "../../../utils/validation";

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

type F = keyof OfficeFormState;
type Errors  = Partial<Record<F, string>>;
type Touched = Partial<Record<F, boolean>>;

// required fields only — optional ones are validated on blur but not on submit if empty
const REQUIRED_FIELDS: F[] = ["name", "address", "city", "country", "phone", "email"];
const ALL_FIELDS: F[] = ["name", "address", "city", "country", "phone", "email", "latitude", "longitude", "directionsUrl", "order"];

function validateField(field: F, value: string): string {
  switch (field) {
    case "name":          return validateRequired(value, "Office name");
    case "address":       return validateRequired(value, "Address");
    case "city":          return validateRequired(value, "City");
    case "country":       return validateRequired(value, "Country");
    case "phone":         return validatePhone(value);
    case "email":         return validateEmail(value);
    case "directionsUrl": return validateUrl(value, "Directions URL", false);
    case "latitude":
      return validateNumber(value, "Latitude", { min: -90, max: 90 });
    case "longitude":
      return validateNumber(value, "Longitude", { min: -180, max: 180 });
    case "order":
      return validateNumber(value, "Order", { min: 0, integer: true });
    default: return "";
  }
}

function validateAll(values: OfficeFormState): Errors {
  const errors: Errors = {};
  for (const f of ALL_FIELDS) {
    const err = validateField(f, values[f] as string);
    if (err) errors[f] = err;
  }
  return errors;
}

function buildInitialState(initialData?: FirestoreOffice): OfficeFormState {
  if (!initialData)
    return { name: "", address: "", city: "", country: "", phone: "", email: "", type: OFFICE_TYPE_OPTIONS[0], latitude: "", longitude: "", image: "", description: "", directionsUrl: "", order: "" };
  return {
    name: initialData.name,
    address: initialData.address,
    city: initialData.city,
    country: initialData.country,
    phone: initialData.phone,
    email: initialData.email,
    type: initialData.type,
    latitude:  initialData.latitude  !== undefined ? String(initialData.latitude)  : "",
    longitude: initialData.longitude !== undefined ? String(initialData.longitude) : "",
    image:        initialData.image        ?? "",
    description:  initialData.description  ?? "",
    directionsUrl: initialData.directionsUrl ?? "",
    order: initialData.order !== undefined ? String(initialData.order) : "",
  };
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

  const [values,  setValues]  = useState<OfficeFormState>(() => buildInitialState(initialData));
  const [errors,  setErrors]  = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const formRef = useRef<HTMLFormElement>(null);

  const setField = <K extends F>(field: K, value: OfficeFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field])
      setErrors((prev) => ({ ...prev, [field]: validateField(field, String(value)) }));
  };

  const handleBlur = (field: F) => {
    if (touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, String(values[field])) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = ALL_FIELDS.reduce((a, f) => ({ ...a, [f]: true }), {} as Record<F, boolean>);
    setTouched(allTouched);
    const allErrors = validateAll(values);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    onSubmit({
      name:         values.name.trim(),
      address:      values.address.trim(),
      city:         values.city.trim(),
      country:      values.country.trim(),
      phone:        values.phone.trim(),
      email:        values.email.trim(),
      type:         values.type,
      latitude:     values.latitude.trim()     ? Number(values.latitude)     : undefined,
      longitude:    values.longitude.trim()    ? Number(values.longitude)    : undefined,
      image:        values.image.trim()        || undefined,
      description:  values.description.trim()  || undefined,
      directionsUrl: values.directionsUrl.trim() || undefined,
      order:        values.order.trim()        ? Number(values.order)        : undefined,
    });
  };

  // ── style helpers ──
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
      role="dialog" aria-modal="true" aria-labelledby="office-form-title"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl rounded-2xl border shadow-xl ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>
        <div className={`flex items-center justify-between px-6 sm:px-8 py-5 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <h3 id="office-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Office" : "Edit Office"}
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
              <label className={labelClass} htmlFor="of-name">Office Name</label>
              <input id="of-name" type="text" placeholder="Estatein — London"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!(touched.name && errors.name)}
                className={fieldClass("name")} />
              <Err f="name" />
            </div>
            <div>
              <label className={labelClass} htmlFor="of-type">Type</label>
              <select id="of-type" value={values.type}
                onChange={(e) => setField("type", e.target.value as FirestoreOffice["type"])}
                className={`${fieldClass("type")} cursor-pointer`}>
                {OFFICE_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option} className={isDark ? "bg-bg-dark" : "bg-white"}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="of-address">Address</label>
            <input id="of-address" type="text" placeholder="1 Canada Square, Canary Wharf"
              value={values.address}
              onChange={(e) => setField("address", e.target.value)}
              onBlur={() => handleBlur("address")}
              aria-invalid={!!(touched.address && errors.address)}
              className={fieldClass("address")} />
            <Err f="address" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="of-city">City</label>
              <input id="of-city" type="text" placeholder="London"
                value={values.city}
                onChange={(e) => setField("city", e.target.value)}
                onBlur={() => handleBlur("city")}
                aria-invalid={!!(touched.city && errors.city)}
                className={fieldClass("city")} />
              <Err f="city" />
            </div>
            <div>
              <label className={labelClass} htmlFor="of-country">Country</label>
              <input id="of-country" type="text" placeholder="United Kingdom"
                value={values.country}
                onChange={(e) => setField("country", e.target.value)}
                onBlur={() => handleBlur("country")}
                aria-invalid={!!(touched.country && errors.country)}
                className={fieldClass("country")} />
              <Err f="country" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="of-phone">Phone</label>
              <input id="of-phone" type="tel" placeholder="+44 20 5555 0300"
                value={values.phone}
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={!!(touched.phone && errors.phone)}
                className={fieldClass("phone")} />
              <Err f="phone" />
            </div>
            <div>
              <label className={labelClass} htmlFor="of-email">Email</label>
              <input id="of-email" type="email" placeholder="london@estatein.com"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!(touched.email && errors.email)}
                className={fieldClass("email")} />
              <Err f="email" />
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
            <textarea id="of-description" rows={3} placeholder="Short blurb shown on the public office card"
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${fieldClass("description")} resize-none`} />
          </div>

          <div>
            <label className={labelClass} htmlFor="of-directions">Directions URL (optional)</label>
            <input id="of-directions" type="url" placeholder="https://maps.google.com/…"
              value={values.directionsUrl}
              onChange={(e) => setField("directionsUrl", e.target.value)}
              onBlur={() => handleBlur("directionsUrl")}
              aria-invalid={!!(touched.directionsUrl && errors.directionsUrl)}
              className={fieldClass("directionsUrl")} />
            <Err f="directionsUrl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelClass} htmlFor="of-latitude">Latitude (optional)</label>
              <input id="of-latitude" type="number" step="any" placeholder="51.5045"
                value={values.latitude}
                onChange={(e) => setField("latitude", e.target.value)}
                onBlur={() => handleBlur("latitude")}
                aria-invalid={!!(touched.latitude && errors.latitude)}
                className={fieldClass("latitude")} />
              <Err f="latitude" />
            </div>
            <div>
              <label className={labelClass} htmlFor="of-longitude">Longitude (optional)</label>
              <input id="of-longitude" type="number" step="any" placeholder="-0.0199"
                value={values.longitude}
                onChange={(e) => setField("longitude", e.target.value)}
                onBlur={() => handleBlur("longitude")}
                aria-invalid={!!(touched.longitude && errors.longitude)}
                className={fieldClass("longitude")} />
              <Err f="longitude" />
            </div>
            <div>
              <label className={labelClass} htmlFor="of-order">Order (optional)</label>
              <input id="of-order" type="number" min="0" step="1" placeholder="1"
                value={values.order}
                onChange={(e) => setField("order", e.target.value)}
                onBlur={() => handleBlur("order")}
                aria-invalid={!!(touched.order && errors.order)}
                className={fieldClass("order")} />
              <Err f="order" />
            </div>
          </div>
        </form>

        <div className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 sm:px-8 py-5 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <button type="button" onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            Cancel
          </button>
          <Button text={mode === "add" ? "Add Office" : "Save Changes"} variant="primary" type="submit"
            onClick={() => formRef.current?.requestSubmit()} />
        </div>
      </div>
    </div>
  );
};
