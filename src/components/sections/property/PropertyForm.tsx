import { FaLocationDot } from "react-icons/fa6";
import FormField from "./FormField";
import { motion } from "framer-motion";


interface PropertyFormProps {
  propertyLocation?: string;
}

const PropertyForm = ({
  propertyLocation = "Seaside Serenity Villa, Malibu, California",
}: PropertyFormProps) => {
  const [formData, setFormData] = useState(initialFormState);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError] = useState<string | null>(null);

  const handleChange = (name: keyof typeof initialFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus === "submitted" || submitStatus === "error") setSubmitStatus("idle");
  };

  return (
    <motion.form
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.1}}
      transition={{duration: 0.6, ease: [0.25, 0.1, 0.25, 1]}}
      className="
        autofill-none min-w-0 max-w-full w-full rounded-[10px] border border-bg-gray-1
        bg-bg-dark-1 p-[25px]
        sm:p-[35px]
        xl:p-[50px]
      "
    >
      {/* Inputs */}
      <div className="grid min-w-0 grid-cols-1 gap-[30px] sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="min-w-0">
            <FormField {...field} />
          </div>
        ))}
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

        <motion.button
          type="submit"
          whileHover={{scale: 1.03}}
          whileTap={{scale: 0.97}}
          className="
            h-[60px] w-full rounded-[8px]
            bg-[#703BF7]
            font-['Urbanist'] text-[14px]
            font-semibold text-white
            hover:bg-[#5f2fe0]
            sm:w-[250px]
          "
        >
          Send Your Message
        </motion.button>
      </div>
    </motion.form>
  );
}

export default PropertyForm;