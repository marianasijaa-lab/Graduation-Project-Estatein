interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;       // error message to display
  touched?: boolean;    // only show error after the field has been interacted with
}

const FormField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  required,
  error,
  touched,
}: FormFieldProps) => {
  const showError = touched && !!error;

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
        onBlur={onBlur}
        aria-invalid={showError}
        aria-describedby={showError ? `ff-err-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined}
        className={`
          h-[52px] w-full rounded-lg border
          bg-bg-dark px-[20px]
          font-['Urbanist'] text-[14px] font-medium
          text-(--text-main) outline-none
          placeholder:text-placeholder
          transition-colors
          ${showError
            ? 'border-red-500 focus:border-red-400'
            : 'border-bg-gray-1 focus:border-primary'
          }
        `}
      />

      {showError && (
        <p
          id={`ff-err-${label.replace(/\s+/g, '-').toLowerCase()}`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
