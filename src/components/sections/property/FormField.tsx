interface FormFieldProps {
    label: string;
    placeholder: string;
    type?: string;
  }
  
  const FormField = ({
    label,
    placeholder,
    type = "text",
  }: FormFieldProps) => {
    return (
      <div className="flex flex-col">
        <label className="mb-[12px] font-['Urbanist'] text-[14px] font-semibold text-white">
          {label}
        </label>
  
        <input
          type={type}
          placeholder={placeholder}
          className="
            h-[68px] w-full rounded-[8px]
            border border-[#262626]
            bg-[#1A1A1A] px-[20px]
            font-['Urbanist'] text-[14px] font-medium
            text-white outline-none
            placeholder:text-[#666666]
            focus:border-[#703BF7]
          "
        />
      </div>
    );
  };
  
  export default FormField;