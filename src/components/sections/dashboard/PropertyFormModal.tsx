import { useEffect, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import { useTheme } from "../../../Context/ThemeContext";
import { Button } from "../../ui/Button";
import type { FirestoreProperty } from "../../../store/types";
import { uploadImage, ImageUploadError } from "../../../api/storage";
import { validateRequired, validateNumber } from "../../../utils/validation";

const MIN_BUILD_YEAR = 1800;
const MAX_BUILD_YEAR = new Date().getFullYear();

const PROPERTY_TYPE_OPTIONS = ["Villa", "Apartment", "Townhouse", "Penthouse", "Cottage", "Land"] as const;
const CURRENCY_OPTIONS = ["USD", "EUR", "GBP"] as const;

interface PropertyFormState {
  name: string;
  propertyType: string;
  image: string;
  tag: string;
  descriptionShort: string;
  descriptionLong: string;
  bedrooms: string;
  bathrooms: string;
  priceHome: string;
  priceProperties: string;
  location: string;
  size: string;
  buildYear: string;
  amenities: string[];
  featured: boolean;
  currency: string;
  order: string;
}

type F = keyof PropertyFormState;
type Errors  = Partial<Record<F, string>>;
type Touched = Partial<Record<F, boolean>>;

const TEXT_FIELDS: (keyof PropertyFormState)[] = [
  "name", "image", "descriptionShort", "descriptionLong",
  "priceHome", "priceProperties", "bedrooms", "bathrooms",
  "size", "buildYear", "order",
];

function validateField(field: F, value: string): string {
  switch (field) {
    case "name":             return validateRequired(value, "Property name");
    case "image":            return validateRequired(value, "Property image");
    case "descriptionShort": return validateRequired(value, "Short description");
    case "descriptionLong":  return validateRequired(value, "Long description");
    case "priceHome":
      return validateNumber(value, "Home page price", { required: true, min: 1 });
    case "priceProperties":
      return validateNumber(value, "Properties page price", { required: true, min: 1 });
    case "bedrooms":
      return validateNumber(value, "Bedrooms",   { min: 0, integer: true });
    case "bathrooms":
      return validateNumber(value, "Bathrooms",  { min: 0, integer: true });
    case "size":
      return validateNumber(value, "Size",       { min: 1 });
    case "buildYear":
      return validateNumber(value, "Build year", { min: MIN_BUILD_YEAR, max: MAX_BUILD_YEAR, integer: true });
    case "order":
      return validateNumber(value, "Order",      { min: 1, integer: true });
    default: return "";
  }
}

function validateAll(values: PropertyFormState): Errors {
  const errors: Errors = {};
  for (const f of TEXT_FIELDS) {
    const err = validateField(f, values[f] as string);
    if (err) errors[f] = err;
  }
  return errors;
}

function buildInitialState(initialData?: FirestoreProperty): PropertyFormState {
  if (!initialData)
    return {
      name: "", propertyType: PROPERTY_TYPE_OPTIONS[0], image: "", tag: "",
      descriptionShort: "", descriptionLong: "",
      bedrooms: "", bathrooms: "", priceHome: "", priceProperties: "",
      location: "", size: "", buildYear: "",
      amenities: [], featured: false, currency: CURRENCY_OPTIONS[0], order: "",
    };
  return {
    name:             initialData.name,
    propertyType:     initialData.propertyType ?? PROPERTY_TYPE_OPTIONS[0],
    image:            initialData.image,
    tag:              initialData.tag ?? "",
    descriptionShort: initialData.descriptionShort,
    descriptionLong:  initialData.descriptionLong,
    bedrooms:         initialData.bedrooms  !== undefined ? String(initialData.bedrooms)  : "",
    bathrooms:        initialData.bathrooms !== undefined ? String(initialData.bathrooms) : "",
    priceHome:        String(initialData.priceHome),
    priceProperties:  String(initialData.priceProperties),
    location:         initialData.location ?? "",
    size:             initialData.size      !== undefined ? String(initialData.size)      : "",
    buildYear:        initialData.buildYear !== undefined ? String(initialData.buildYear) : "",
    amenities:        initialData.amenities ?? [],
    featured:         initialData.featured  ?? false,
    currency:         initialData.currency  ?? CURRENCY_OPTIONS[0],
    order:            initialData.order     !== undefined ? String(initialData.order)     : "",
  };
}

interface PropertyFormModalProps {
  mode: "add" | "edit";
  initialData?: FirestoreProperty;
  onClose: () => void;
  onSubmit: (values: Omit<FirestoreProperty, "id">) => void;
}

export const PropertyFormModal = ({ mode, initialData, onClose, onSubmit }: PropertyFormModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [values,       setValues]       = useState<PropertyFormState>(() => buildInitialState(initialData));
  const [errors,       setErrors]       = useState<Errors>({});
  const [touched,      setTouched]      = useState<Touched>({});
  const [isUploading,  setIsUploading]  = useState(false);
  const [amenityInput, setAmenityInput] = useState("");
  const formRef      = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  const setField = <K extends F>(field: K, value: PropertyFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field])
      setErrors((prev) => ({ ...prev, [field]: validateField(field, String(value)) }));
  };

  const handleBlur = (field: F) => {
    if (touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, String(values[field])) }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setIsUploading(true);
    setErrors((prev) => ({ ...prev, image: undefined }));
    try {
      const url = await uploadImage(file, "properties");
      setField("image", url);
      setTouched((prev) => ({ ...prev, image: true }));
    } catch (err) {
      const message = err instanceof ImageUploadError ? err.message : "Upload failed. Please try again.";
      setTouched((prev) => ({ ...prev, image: true }));
      setErrors((prev) => ({ ...prev, image: message }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setField("image", "");
    setTouched((prev) => ({ ...prev, image: true }));
  };

  const handleAddAmenity = () => {
    const trimmed = amenityInput.trim();
    if (!trimmed || values.amenities.includes(trimmed)) { setAmenityInput(""); return; }
    setField("amenities", [...values.amenities, trimmed]);
    setAmenityInput("");
  };

  const handleAmenityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); handleAddAmenity(); }
  };

  const handleRemoveAmenity = (a: string) => {
    setField("amenities", values.amenities.filter((x) => x !== a));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = TEXT_FIELDS.reduce((a, f) => ({ ...a, [f]: true }), {} as Record<F, boolean>);
    setTouched(allTouched);
    const allErrors = validateAll(values);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    onSubmit({
      bedroomIcon:     initialData?.bedroomIcon,
      bathroomIcon:    initialData?.bathroomIcon,
      propertyTypeIcon: initialData?.propertyTypeIcon,
      name:            values.name.trim(),
      propertyType:    values.propertyType,
      image:           values.image.trim(),
      tag:             values.tag.trim() || undefined,
      descriptionShort: values.descriptionShort.trim(),
      descriptionLong:  values.descriptionLong.trim(),
      bedrooms:        values.bedrooms.trim()  ? Number(values.bedrooms)  : undefined,
      bathrooms:       values.bathrooms.trim() ? Number(values.bathrooms) : undefined,
      priceHome:       Number(values.priceHome),
      priceProperties: Number(values.priceProperties),
      location:        values.location.trim() || undefined,
      size:            values.size.trim()     ? Number(values.size)      : undefined,
      buildYear:       values.buildYear.trim() ? Number(values.buildYear) : undefined,
      amenities:       values.amenities,
      featured:        values.featured,
      currency:        values.currency,
      order:           values.order.trim()    ? Number(values.order)     : undefined,
    });
  };

  // ── style helpers ──────────────────────────────────────────────────────────
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
      role="dialog" aria-modal="true" aria-labelledby="property-form-title"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl rounded-2xl border shadow-xl ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>
        <div className={`flex items-center justify-between px-6 sm:px-8 py-5 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <h3 id="property-form-title" className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {mode === "add" ? "Add Property" : "Edit Property"}
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
              <label className={labelClass} htmlFor="pf-name">Property Name</label>
              <input id="pf-name" type="text" placeholder="Property Name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!(touched.name && errors.name)}
                className={fieldClass("name")} />
              <Err f="name" />
            </div>
            <div>
              <label className={labelClass} htmlFor="pf-type">Property Type</label>
              <select id="pf-type" value={values.propertyType}
                onChange={(e) => setField("propertyType", e.target.value)}
                className={`${fieldClass("propertyType")} cursor-pointer`}>
                {PROPERTY_TYPE_OPTIONS.map((o) => (
                  <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className={labelClass} htmlFor="pf-image">Property Image</label>
            {values.image && (
              <div className={`relative mb-3 w-full h-48 rounded-xl overflow-hidden border ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <img src={values.image} alt="Property preview" className="w-full h-full object-cover" />
                <button type="button" onClick={handleRemoveImage} aria-label="Remove image"
                  className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer">
                  <HiXMark className="w-4 h-4" />
                </button>
              </div>
            )}
            <button type="button" onClick={() => imageInputRef.current?.click()} disabled={isUploading}
              className={`flex flex-col items-center justify-center gap-2 w-full py-6 px-4 rounded-xl border border-dashed text-center transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                touched.image && errors.image
                  ? "border-red-500 text-red-400"
                  : isDark
                  ? "border-bg-gray-1 text-gray hover:border-primary hover:text-white"
                  : "border-gray-300 text-gray-500 hover:border-primary hover:text-gray-700"
              }`}>
              <FiUploadCloud className="w-5 h-5" />
              <span className="text-sm font-medium">
                {isUploading ? "Uploading…" : values.image ? "Change Image" : "Click to upload an image"}
              </span>
            </button>
            <input ref={imageInputRef} id="pf-image" type="file" accept="image/*"
              onChange={handleImageChange} className="sr-only" />
            {touched.image && errors.image ? (
              <p role="alert" className={errorClass}><span aria-hidden="true">⚠</span>{errors.image}</p>
            ) : (
              <p className={`mt-1.5 text-xs ${isDark ? "text-gray" : "text-gray-500"}`}>PNG or JPG, up to 5MB.</p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="pf-tag">Marketing Tag (optional)</label>
            <input id="pf-tag" type="text" placeholder="Marketing Tag"
              value={values.tag}
              onChange={(e) => setField("tag", e.target.value)}
              className={fieldClass("tag")} />
          </div>

          <div>
            <label className={labelClass} htmlFor="pf-desc-short">Short Description</label>
            <textarea id="pf-desc-short" rows={2} placeholder="Short Description"
              value={values.descriptionShort}
              onChange={(e) => setField("descriptionShort", e.target.value)}
              onBlur={() => handleBlur("descriptionShort")}
              aria-invalid={!!(touched.descriptionShort && errors.descriptionShort)}
              className={`${fieldClass("descriptionShort")} resize-none`} />
            <Err f="descriptionShort" />
          </div>

          <div>
            <label className={labelClass} htmlFor="pf-desc-long">Long Description</label>
            <textarea id="pf-desc-long" rows={4} placeholder="Long Description"
              value={values.descriptionLong}
              onChange={(e) => setField("descriptionLong", e.target.value)}
              onBlur={() => handleBlur("descriptionLong")}
              aria-invalid={!!(touched.descriptionLong && errors.descriptionLong)}
              className={`${fieldClass("descriptionLong")} resize-none`} />
            <Err f="descriptionLong" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="pf-bedrooms">Bedrooms (optional)</label>
              <input id="pf-bedrooms" type="number" min="0" step="1" placeholder="Bedrooms"
                value={values.bedrooms}
                onChange={(e) => setField("bedrooms", e.target.value)}
                onBlur={() => handleBlur("bedrooms")}
                aria-invalid={!!(touched.bedrooms && errors.bedrooms)}
                className={fieldClass("bedrooms")} />
              <Err f="bedrooms" />
            </div>
            <div>
              <label className={labelClass} htmlFor="pf-bathrooms">Bathrooms (optional)</label>
              <input id="pf-bathrooms" type="number" min="0" step="1" placeholder="Bathrooms"
                value={values.bathrooms}
                onChange={(e) => setField("bathrooms", e.target.value)}
                onBlur={() => handleBlur("bathrooms")}
                aria-invalid={!!(touched.bathrooms && errors.bathrooms)}
                className={fieldClass("bathrooms")} />
              <Err f="bathrooms" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="pf-price-home">Price — Home Page ($)</label>
              <input id="pf-price-home" type="number" min="0" step="1" placeholder="Price"
                value={values.priceHome}
                onChange={(e) => setField("priceHome", e.target.value)}
                onBlur={() => handleBlur("priceHome")}
                aria-invalid={!!(touched.priceHome && errors.priceHome)}
                className={fieldClass("priceHome")} />
              <Err f="priceHome" />
            </div>
            <div>
              <label className={labelClass} htmlFor="pf-price-properties">Price — Properties Page ($)</label>
              <input id="pf-price-properties" type="number" min="0" step="1" placeholder="Price"
                value={values.priceProperties}
                onChange={(e) => setField("priceProperties", e.target.value)}
                onBlur={() => handleBlur("priceProperties")}
                aria-invalid={!!(touched.priceProperties && errors.priceProperties)}
                className={fieldClass("priceProperties")} />
              <Err f="priceProperties" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="pf-location">Location (optional)</label>
              <input id="pf-location" type="text" placeholder="e.g. Malibu, California"
                value={values.location}
                onChange={(e) => setField("location", e.target.value)}
                className={fieldClass("location")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="pf-currency">Currency</label>
              <select id="pf-currency" value={values.currency}
                onChange={(e) => setField("currency", e.target.value)}
                className={`${fieldClass("currency")} cursor-pointer`}>
                {CURRENCY_OPTIONS.map((o) => (
                  <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="pf-size">Size — sq ft (optional)</label>
              <input id="pf-size" type="number" min="0" step="1" placeholder="Size"
                value={values.size}
                onChange={(e) => setField("size", e.target.value)}
                onBlur={() => handleBlur("size")}
                aria-invalid={!!(touched.size && errors.size)}
                className={fieldClass("size")} />
              <Err f="size" />
            </div>
            <div>
              <label className={labelClass} htmlFor="pf-build-year">Build Year (optional)</label>
              <input id="pf-build-year" type="number" min={MIN_BUILD_YEAR} max={MAX_BUILD_YEAR} step="1" placeholder="e.g. 2020"
                value={values.buildYear}
                onChange={(e) => setField("buildYear", e.target.value)}
                onBlur={() => handleBlur("buildYear")}
                aria-invalid={!!(touched.buildYear && errors.buildYear)}
                className={fieldClass("buildYear")} />
              <Err f="buildYear" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="pf-order">Display Order (optional)</label>
              <input id="pf-order" type="number" min="1" step="1" placeholder="e.g. 1"
                value={values.order}
                onChange={(e) => setField("order", e.target.value)}
                onBlur={() => handleBlur("order")}
                aria-invalid={!!(touched.order && errors.order)}
                className={fieldClass("order")} />
              <Err f="order" />
              <p className={`mt-1.5 text-xs ${isDark ? "text-gray" : "text-gray-500"}`}>
                Lower numbers appear first.
              </p>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="pf-amenities">Amenities (optional)</label>
            <input id="pf-amenities" type="text" placeholder="Type an amenity and press Enter"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={handleAmenityKeyDown}
              className={fieldClass("amenities")} />
            {values.amenities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {values.amenities.map((amenity) => (
                  <span key={amenity} className={`inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-xs font-medium border ${isDark ? "bg-bg-dark border-bg-gray-1 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}>
                    {amenity}
                    <button type="button" onClick={() => handleRemoveAmenity(amenity)} aria-label={`Remove ${amenity}`}
                      className={`inline-flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-colors ${isDark ? "hover:bg-bg-gray-1 hover:text-white" : "hover:bg-gray-200"}`}>
                      <HiXMark className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <label htmlFor="pf-featured" className={`flex items-center gap-3 cursor-pointer select-none ${isDark ? "text-white" : "text-gray-900"}`}>
            <input id="pf-featured" type="checkbox" checked={values.featured}
              onChange={(e) => setField("featured", e.target.checked)}
              className="w-5 h-5 rounded cursor-pointer accent-primary" />
            <span className="text-sm font-medium">Featured Property</span>
          </label>
        </form>

        <div className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-6 sm:px-8 py-5 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <button type="button" onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
            Cancel
          </button>
          <Button text={isUploading ? "Uploading…" : mode === "add" ? "Add Property" : "Save Changes"}
            variant="primary" type="submit" onClick={() => formRef.current?.requestSubmit()} />
        </div>
      </div>
    </div>
  );
};
