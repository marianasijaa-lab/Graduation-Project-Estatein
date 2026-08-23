import React, { useState } from 'react';
import { useTheme } from '../../../Context/ThemeContext';

export interface ExtraField {
  name: string;
  label: string;
  type: 'input' | 'dropdown' | 'textarea' | 'radio-input';
  placeholder?: string;
  options?: string[];
  prefilled?: string;
  icon?: string;
  readOnly?: boolean;
  colSpan?: 1 | 2 | 3 | 4; // إضافة 1: للتحكم في عرض الحقل
}

interface ContactFormProps {
  title?: string;        // إضافة 2: عنوان الفورم
  subtitle?: string;     // إضافة 2: وصف الفورم
  extraFields?: ExtraField[];
  onSubmit?: (data: Record<string, any>) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subtitle,
  extraFields = [],
  onSubmit,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const initialFormState: Record<string, any> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreeTerms: false,
  };

  extraFields.forEach((field) => {
    if (field.type === 'radio-input') {
      // إضافة 3: radio-input يحتاج selected value + input value لكل option
      initialFormState[`${field.name}_selected`] = field.prefilled || '';
      field.options?.forEach((opt) => {
        initialFormState[`${field.name}_${opt}`] = '';
      });
    } else {
      initialFormState[field.name] = field.prefilled || '';
    }
  });

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const inputBgClass = isDark
    ? 'bg-[#1A1A1A] border-[#262626] text-white placeholder-gray-500 focus:border-primary'
    : 'bg-[#F9F9F9] border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary';

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`;

  // دالة لتحديد عرض الحقل بناءً على colSpan
  const getColSpanClass = (colSpan?: number) => {
    switch (colSpan) {
      case 2: return 'sm:col-span-2';
      case 3: return 'sm:col-span-3';
      case 4: return 'col-span-full';
      default: return '';
    }
  };

  return (
    <div className="w-full">
      {/* إضافة 2: title و subtitle */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`w-full rounded-2xl p-6 sm:p-10 lg:p-14 border space-y-6 sm:space-y-8 ${
          isDark ? 'bg-[#141414] border-[#262626]' : 'bg-white border-gray-200 shadow-sm'
        }`}
      >
        {/* 1. First Name + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              required
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
            />
          </div>
        </div>

        {/* 2. Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              required
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
            />
          </div>
        </div>

        {/* 3. Extra Fields */}
        {extraFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraFields.map((field) => (
              <div
                key={field.name}
                className={
                  field.type === 'textarea' || field.type === 'radio-input'
                    ? 'col-span-full'
                    : getColSpanClass(field.colSpan)
                }
              >
                <label className={labelClass}>{field.label}</label>

                {/* input */}
                {field.type === 'input' && (
                  <div className="relative">
                    <input
                      type="text"
                      readOnly={field.readOnly}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass} ${
                        field.readOnly ? 'cursor-not-allowed opacity-80' : ''
                      }`}
                    />
                    {field.icon && (
                      <img
                        src={field.icon}
                        alt="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none opacity-60"
                      />
                    )}
                  </div>
                )}

                {/* dropdown */}
                {field.type === 'dropdown' && (
                  <div className="relative">
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`w-full px-5 py-4 rounded-xl border outline-none transition-all appearance-none cursor-pointer ${inputBgClass}`}
                    >
                      <option value="" disabled>
                        {field.placeholder || 'Select Option'}
                      </option>
                      {field.options?.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className={isDark ? 'bg-[#1A1A1A]' : 'bg-white'}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                      {field.icon && (
                        <img src={field.icon} alt="icon" className="w-5 h-5 opacity-60" />
                      )}
                      <span className="text-xs opacity-50">▼</span>
                    </div>
                  </div>
                )}

                {/* إضافة 3: radio-input = radio button + input field لكل خيار */}
                {field.type === 'radio-input' && (
                  <div className="flex flex-wrap gap-4 py-2">
                    {field.options?.map((opt) => {
                      const isSelected = formData[`${field.name}_selected`] === opt;
                      return (
                        <div
                          key={opt}
                          className={`flex items-center gap-3 flex-1 min-w-[200px] px-4 py-3 rounded-xl border transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : isDark
                              ? 'border-bg-gray-1 bg-bg-dark'
                              : 'border-gray-200 bg-[#F9F9F9]'
                          }`}
                        >
                          {/* Radio button */}
                          <input
                            type="radio"
                            name={field.name}
                            value={opt}
                            checked={isSelected}
                            onChange={() =>
                              handleChange(`${field.name}_selected`, opt)
                            }
                            className="accent-primary w-4 h-4 shrink-0 cursor-pointer"
                          />
                          {/* Input field لكتابة القيمة */}
                          <input
                            type={opt.toLowerCase().includes('email') ? 'email' : 'tel'}
                            placeholder={opt.toLowerCase().includes('email') ? 'Enter Your Email' : 'Enter Your Number'}
                            value={formData[`${field.name}_${opt}`] || ''}
                            onChange={(e) =>
                              handleChange(`${field.name}_${opt}`, e.target.value)
                            }
                            className={`flex-1 bg-transparent outline-none text-sm ${
                              isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* textarea */}
                {field.type === 'textarea' && (
                  <textarea
                    rows={4}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none ${inputBgClass}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 4. Message (ثابت) */}
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            rows={5}
            required
            placeholder="Enter your Message here.."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none ${inputBgClass}`}
          />
        </div>

        {/* 5. Terms + Submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={formData.agreeTerms}
              onChange={(e) => handleChange('agreeTerms', e.target.checked)}
              className="w-5 h-5 rounded accent-primary cursor-pointer"
            />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              I agree with{' '}
              <a href="#" className={`underline ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className={`underline ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-[#5e2ed9] text-white text-sm font-medium rounded-xl transition-colors shadow-sm shrink-0"
          >
            Send Your Message
          </button>
        </div>
      </form>
    </div>
  );
};
