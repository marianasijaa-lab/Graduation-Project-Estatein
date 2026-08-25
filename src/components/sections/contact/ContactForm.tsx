import React, { useState } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { Button } from '../../ui/Button';
import { FiChevronDown } from 'react-icons/fi';
import type { IconType } from 'react-icons';


export interface ExtraField {
  name: string;
  label?: string;
  type: 'input' | 'dropdown' | 'textarea' | 'radio-input';
  placeholder?: string;
  options?: string[];
  prefilled?: string;
  icon?: IconType;
  readOnly?: boolean;
  colSpan?: number; // لتحديد كم عمود يأخذ الحقل إذا احتجت
  hasDot?: boolean; // إظهار النقطة على اليمين
  dotSelected?: boolean;
}

interface ContactFormProps {
  extraFields?: ExtraField[];
  columns?: 2 | 3 | 4; // التحكم بأسلوب الأعمدة لكل فورم
  onSubmit?: (data: Record<string, any>) => void;
  isSubmitting?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  extraFields = [],
  columns = 3,
  onSubmit,
  isSubmitting = false,
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
    initialFormState[field.name] = field.prefilled || '';
  });

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const inputBgClass = isDark
    ? 'bg-[#1A1A1A] border-[#262626] text-white placeholder-gray-500 focus:border-[#703BF7]'
    : 'bg-[#F9F9F9] border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#703BF7]';

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'
    }`;

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-7xl mx-auto rounded-2xl p-6 sm:p-10 lg:p-14 border space-y-6 sm:space-y-8 ${isDark ? 'bg-bg-dark-1 border-bg-gray-1' : 'bg-white border-gray-200 shadow-sm'
        }`}
    >
      <div className={`grid ${gridColsClass} gap-6`}>
        {/* First Name */}
        <div>
          {columns !== 4 && <label className={labelClass}>First Name</label>}
          <input
            type="text"
            required
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
          />
        </div>

        {/* Last Name */}
        <div>
          {columns !== 4 && <label className={labelClass}>Last Name</label>}
          <input
            type="text"
            required
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
          />
        </div>

        {/* Email */}
        <div>
          {columns !== 4 && <label className={labelClass}>Email</label>}
          <input
            type="email"
            required
            placeholder="Enter your Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
          />
        </div>

        {/* Phone */}
        <div>
          {columns !== 4 && <label className={labelClass}>Phone</label>}
          <input
            type="tel"
            required
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass}`}
          />
        </div>

        {/* Extra Fields */}
        {extraFields.map((field) => {
          let spanClass = '';
          if (field.colSpan === 2) spanClass = 'col-span-1 sm:col-span-2';
          else if (field.readOnly || field.type === 'textarea' || field.type === 'radio-input') spanClass = 'col-span-full';
          const IconComponent = field.icon;
          return (
            <div key={field.name} className={spanClass}>
              {field.label && <label className={labelClass}>{field.label}</label>}

              {field.type === 'input' && (
                <div className="relative flex items-center">
                  {/* الأيقونة اليسارية من React Icons */}
                  {IconComponent && (
                    <IconComponent className="absolute left-5 text-gray-400 text-lg pointer-events-none" />
                  )}

                  <input
                    type="text"
                    readOnly={field.readOnly}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`w-full py-4 rounded-xl border outline-none transition-all ${inputBgClass} ${IconComponent ? 'pl-12' : 'pl-5'
                      } ${field.hasDot ? 'pr-12' : 'pr-5'} ${field.readOnly ? 'cursor-not-allowed opacity-80' : ''
                      }`}
                  />

                  {/* النقطة البنفسجية على اليمين (ممتلئة أو مفرغة) */}
                  {field.hasDot && (
                    <div className="absolute right-5 flex items-center justify-center pointer-events-none">
                      <span
                        className={`w-3.5 h-3.5 rounded-full transition-all ${field.dotSelected
                          ? 'bg-[#703BF7]'
                          : 'border-2 border-[#703BF7] bg-transparent'
                          }`}
                      />
                    </div>
                  )}
                </div>
              )}

              {field.type === 'dropdown' && (
                <div className="relative flex items-center">
                  {IconComponent && (
                    <IconComponent className="absolute left-5 text-gray-400 text-lg pointer-events-none" />
                  )}

                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`w-full py-4 pr-12 rounded-xl border outline-none transition-all appearance-none cursor-pointer ${inputBgClass} ${IconComponent ? 'pl-12' : 'pl-5'
                      }`}
                  >
                    <option value="" disabled>
                      {field.placeholder || 'Select Option'}
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className={isDark ? 'bg-[#1A1A1A]' : 'bg-white'}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <FiChevronDown className="absolute right-5 text-gray-400 text-lg pointer-events-none" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Message Field */}
      <div>
        {columns !== 4 && <label className={labelClass}>Message</label>}
        <textarea
          rows={5}
          required
          placeholder="Enter your Message here.."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none ${inputBgClass}`}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            checked={formData.agreeTerms}
            onChange={(e) => handleChange('agreeTerms', e.target.checked)}
            className={`w-5 h-5 rounded cursor-pointer appearance-none border transition-all relative flex items-center justify-center checked:bg-primary checked:border-primary checked:before:content-['✓'] checked:before:text-white checked:before:text-xs checked:before:font-bold ${isDark
                ? 'bg-bg-dark border-bg-gray-1'
                : 'bg-gray-400 border-gray-500'
              }`}
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
        <Button
            text={isSubmitting ? "Sending..." : "Send Your Message"}
            variant="primary"
            onClick={() => {}}
            disabled={isSubmitting}
          />

      </div>
    </form>
  );
};