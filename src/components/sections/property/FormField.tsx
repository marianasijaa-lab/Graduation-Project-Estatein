interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

const FormField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="mb-[12px] font-['Urbanist'] text-base font-semibold text-(--text-main)">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="
          h-[52px] w-full rounded-[8px]
          border border-[#262626]
          bg-(--bg-secondary) px-[20px]
          font-['Urbanist'] text-[14px] font-medium
          text-(--text-main) outline-none
          placeholder:text-[#666666]
          focus:border-[#703BF7]
        "
      />
    </div>
  );
};

export default FormField;
