import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import FormField from "./FormField";
import { motion } from "framer-motion";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
} from "../../../utils/validation";

interface PropertyFormProps {
  propertyLocation?: string;
  propertyId?: string;
  propertyName?: string;
}

type SubmitStatus = "idle" | "submitting" | "submitted" | "error";

type FormFields = "firstName" | "lastName" | "email" | "phone" | "message";

const FIELDS: FormFields[] = ["firstName", "lastName", "email", "phone", "message"];

const initialFormState: Record<FormFields, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

// ─── per-field validators ────────────────────────────────────────────────────

function validateField(name: FormFields, value: string): string {
  switch (name) {
    case "firstName": return validateName(value, "First name");
    case "lastName":  return validateName(value, "Last name");
    case "email":     return validateEmail(value);
    case "phone":     return validatePhone(value);
    case "message":   return validateMessage(value, 10);
  }
}

function validateAll(data: Record<FormFields, string>): Partial<Record<FormFields, string>> {
  const errors: Partial<Record<FormFields, string>> = {};
  for (const f of FIELDS) {
    const err = validateField(f, data[f]);
    if (err) errors[f] = err;
  }
  return errors;
}

// ─── Component ───────────────────────────────────────────────────────────────

const PropertyForm = ({
  propertyLocation = "Seaside Serenity Villa, Malibu, California",
}: PropertyFormProps) => {
  const [formData, setFormData]     = useState<Record<FormFields, string>>(initialFormState);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeError, setAgreeError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  // validation state
  const [errors, setErrors]   = useState<Partial<Record<FormFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormFields, boolean>>>({});

  // ── handlers ──────────────────────────────────────────────────────────────

  const handleChange = (name: FormFields, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (submitStatus !== "idle") setSubmitStatus("idle");

    // re-validate live only after first blur
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (name: FormFields) => {
    if (touched[name]) return;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // touch all fields
    const allTouched = FIELDS.reduce(
      (acc, f) => ({ ...acc, [f]: true }),
      {} as Record<FormFields, boolean>,
    );
    setTouched(allTouched);

    const allErrors = validateAll(formData);
    setErrors(allErrors);

    if (!agreeTerms) {
      setAgreeError("You must agree to the Terms of Use and Privacy Policy.");
    } else {
      setAgreeError("");
    }

    if (Object.keys(allErrors).length > 0 || !agreeTerms) return;

    // ── submit ──
    setSubmitStatus("submitting");
    // Firestore write can be wired here; simulating success for now
    setTimeout(() => {
      setFormData(initialFormState);
      setErrors({});
      setTouched({});
      setAgreeTerms(false);
      setAgreeError("");
      setSubmitStatus("submitted");
    }, 0);
  };

  // ── style helpers ─────────────────────────────────────────────────────────

  const messageHasErr = !!(touched.message && errors.message);
  const messageBorder = messageHasErr
    ? "border-red-500 focus:border-red-400"
    : "border-[#262626] focus:border-[#703BF7]";

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="
        autofill-none min-w-0 max-w-full w-full rounded-[10px] border border-bg-gray-1
        bg-bg-dark-1 p-[25px]
        sm:p-[35px]
        xl:p-[50px]
      "
    >
      {/* Status banners */}
      {submitStatus === "submitted" && (
        <div
          role="status"
          className="mb-[30px] rounded-[8px] border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-400"
        >
          Your inquiry has been sent successfully! Our team will get back to you soon.
        </div>
      )}
      {submitStatus === "error" && (
        <div
          role="alert"
          className="mb-[30px] rounded-[8px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-400"
        >
          Something went wrong. Please try again.
        </div>
      )}

      {/* Name row */}
      <div className="grid min-w-0 grid-cols-1 gap-[30px] sm:grid-cols-2">
        <div className="min-w-0">
          <FormField
            label="First Name"
            placeholder="Enter First Name"
            required
            value={formData.firstName}
            onChange={(v) => handleChange("firstName", v)}
            onBlur={() => handleBlur("firstName")}
            error={errors.firstName}
            touched={!!touched.firstName}
          />
        </div>
        <div className="min-w-0">
          <FormField
            label="Last Name"
            placeholder="Enter Last Name"
            required
            value={formData.lastName}
            onChange={(v) => handleChange("lastName", v)}
            onBlur={() => handleBlur("lastName")}
            error={errors.lastName}
            touched={!!touched.lastName}
          />
        </div>
        <div className="min-w-0">
          <FormField
            label="Email"
            placeholder="Enter your Email"
            type="email"
            required
            value={formData.email}
            onChange={(v) => handleChange("email", v)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            touched={!!touched.email}
          />
        </div>
        <div className="min-w-0">
          <FormField
            label="Phone"
            placeholder="Enter Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(v) => handleChange("phone", v)}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
            touched={!!touched.phone}
          />
        </div>
      </div>

      {/* Selected Property (read-only) */}
      <div className="mt-[30px]">
        <label className="mb-[12px] block font-['Urbanist'] text-base font-semibold text-white">
          Selected Property
        </label>
        <div className="relative">
          <input
            value={propertyLocation}
            readOnly
            className="
              h-[60px] w-full rounded-[8px]
              border border-[#262626]
              bg-[#1A1A1A] px-[20px] pr-[55px]
              font-['Urbanist'] text-[14px]
              font-medium text-white outline-none
              cursor-not-allowed opacity-80
            "
          />
          <FaLocationDot className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[18px] text-white" />
        </div>
      </div>

      {/* Message */}
      <div className="mt-[30px]">
        <label className="mb-[12px] block font-['Urbanist'] text-base font-semibold text-white">
          Message
        </label>
        <textarea
          placeholder="Enter your Message here"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={messageHasErr}
          className={`
            h-[140px] w-full resize-none
            rounded-[8px] border
            bg-[#1A1A1A] px-[20px] py-[20px]
            font-['Urbanist'] text-[14px]
            text-white outline-none
            placeholder:text-[#666666]
            transition-colors
            ${messageBorder}
          `}
        />
        {messageHasErr && (
          <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <span aria-hidden="true">⚠</span>
            {errors.message}
          </p>
        )}
      </div>

      {/* Bottom row */}
      <div className="mt-[30px] flex flex-col gap-[30px] sm:flex-row sm:items-start sm:justify-between sm:gap-[50px]">
        <div className="flex flex-col gap-1">
          <label className="flex min-h-[28px] max-w-[584px] items-center gap-[10px] cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (e.target.checked) setAgreeError("");
              }}
              className="
                h-[20px] w-[20px] shrink-0
                appearance-none rounded-[4px]
                border border-[#262626]
                bg-[#141414]
                checked:bg-[#703BF7]
                cursor-pointer
              "
            />
            <span className="font-['Urbanist'] text-sm text-[#999999]">
              I agree with Terms of Use and Privacy Policy
            </span>
          </label>
          {agreeError && (
            <p role="alert" className="ml-[30px] flex items-center gap-1 text-xs text-red-400">
              <span aria-hidden="true">⚠</span>
              {agreeError}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={submitStatus === "submitting"}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            h-[60px] w-full rounded-[8px]
            bg-[#703BF7]
            font-['Urbanist'] text-[14px]
            font-semibold text-white
            hover:bg-[#5f2fe0]
            disabled:cursor-not-allowed disabled:opacity-60
            sm:w-[250px] shrink-0
          "
        >
          {submitStatus === "submitting" ? "Sending…" : "Send Your Message"}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default PropertyForm;
