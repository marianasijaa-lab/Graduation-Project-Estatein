import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import FormField from "./FormField";
import { addDocument } from "../../../api/firestore";
import type { FirestoreContact } from "../../../store/types";

interface PropertyFormProps {
  propertyLocation?: string;
  propertyId?: string;
  propertyName?: string;
}

type SubmitStatus = "idle" | "submitting" | "submitted" | "error";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const PropertyForm = ({
  propertyLocation = "Seaside Serenity Villa, Malibu, California",
  propertyId,
  propertyName,
}: PropertyFormProps) => {
  const [formData, setFormData] = useState(initialFormState);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (name: keyof typeof initialFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus === "submitted" || submitStatus === "error") setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    setSubmitError(null);
    try {
      await addDocument<FirestoreContact>("contacts", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        inquiryType: "Buying",
        propertyId: propertyId || undefined,
        propertyName: propertyName || undefined,
        status: "new",
      });
      setFormData(initialFormState);
      setAgreeTerms(false);
      setSubmitStatus("submitted");
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        autofill-none min-w-0 max-w-full w-full rounded-[10px] border border-bg-gray-1
        bg-bg-dark-1 p-[25px]
        sm:p-[35px]
        xl:p-[50px]
      "
    >
      {submitStatus === "submitted" && (
        <div className="mb-[30px] rounded-[8px] border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-400">
          Your inquiry has been sent successfully! Our team will get back to you soon.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-[30px] rounded-[8px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-400">
          {submitError ?? "Something went wrong. Please try again."}
        </div>
      )}

      {/* Inputs */}
      <div className="grid min-w-0 grid-cols-1 gap-[30px] sm:grid-cols-2">
        <div className="min-w-0">
          <FormField
            label="First Name"
            placeholder="Enter First Name"
            required
            value={formData.firstName}
            onChange={(value) => handleChange("firstName", value)}
          />
        </div>
        <div className="min-w-0">
          <FormField
            label="Last Name"
            placeholder="Enter Last Name"
            required
            value={formData.lastName}
            onChange={(value) => handleChange("lastName", value)}
          />
        </div>
        <div className="min-w-0">
          <FormField
            label="Email"
            placeholder="Enter your Email"
            type="email"
            required
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
          />
        </div>
        <div className="min-w-0">
          <FormField
            label="Phone"
            placeholder="Enter Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(value) => handleChange("phone", value)}
          />
        </div>
      </div>

      {/* Selected Property */}
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
            "
          />

          <FaLocationDot
            className="
              absolute right-[20px] top-1/2
              -translate-y-1/2 text-[18px] text-white
            "
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-[30px]">
        <label className="mb-[12px] block font-['Urbanist'] text-base font-semibold text-white">
          Message
        </label>

        <textarea
          placeholder="Enter your Message here"
          required
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="
            h-[140px] w-full resize-none
            rounded-[8px] border border-[#262626]
            bg-[#1A1A1A] px-[20px] py-[20px]
            font-['Urbanist'] text-[14px]
            text-white outline-none
            placeholder:text-[#666666]
            focus:border-[#703BF7]
          "
        />
      </div>

      {/* Bottom */}
      <div
        className="
          mt-[30px] flex flex-col gap-[30px]
          sm:flex-row sm:items-center
          sm:justify-between sm:gap-[50px]
        "
      >
        <label className="flex min-h-[28px] max-w-[584px] items-center gap-[10px]">
          <input
            type="checkbox"
            required
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="
              h-[20px] w-[20px] shrink-0
              appearance-none rounded-[4px]
              border border-[#262626]
              bg-[#141414]
              checked:bg-[#703BF7]
            "
          />

          <span className="font-['Urbanist'] text-sm text-[#999999]">
            I agree with Terms of Use and Privacy Policy
          </span>
        </label>

        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="
            h-[60px] w-full rounded-[8px]
            bg-[#703BF7]
            font-['Urbanist'] text-[14px]
            font-semibold text-white
            hover:bg-[#5f2fe0]
            disabled:cursor-not-allowed disabled:opacity-60
            sm:w-[250px]
          "
        >
          {submitStatus === "submitting" ? "Sending..." : "Send Your Message"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
