import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { FiChevronDown } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { AnimatePresence, motion } from 'framer-motion';


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
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setShowSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    setFormData(initialFormState);
    setShowSuccess(true);
  };

  const inputBgClass = "bg-(--bg-secondary) border-[#262626] text-(--text-main) placeholder-[#666666] focus:border-[#703BF7]"

  const labelClass = "block text-sm font-medium mb-2 text-(--text-main) "

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <motion.form
      onSubmit={handleSubmit}
      autoComplete="off"
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.1}}
      transition={{duration: 0.6, ease: [0.25, 0.1, 0.25, 1]}}
      className="autofill-none site-container rounded-2xl p-6 sm:p-10 lg:p-14 border space-y-6 sm:space-y-8 border-bg-gray-1 bg-(--bg-main) shadow-sm"
    >
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
            className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-400">
            Your message has been sent successfully!
          </motion.div>
        )}
      </AnimatePresence>


      <div className={`grid ${gridColsClass} gap-6`}>
        {/* First Name */}
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            required
            autoComplete="off"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-sm md:text-[13px] lg:text-sm text-(--text-main) ${inputBgClass}`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            required
            autoComplete="off"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-sm md:text-[13px] lg:text-sm text-(--text-main) ${inputBgClass}`}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            autoComplete="off"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-sm md:text-[13px] lg:text-sm text-(--text-main) ${inputBgClass}`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            required
            autoComplete="off"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-sm md:text-[13px] lg:text-sm text-(--text-main) ${inputBgClass}`}
          />
        </div>

        {/* Extra Fields */}
        {extraFields.map((field) => {
          let spanClass = '';
          if (field.colSpan === 2) spanClass = 'col-span-1 sm:col-span-2 md:col-span-2';
          else if (field.colSpan === 1) spanClass = 'col-span-1';
          else if (field.readOnly || field.type === 'textarea' || field.type === 'radio-input') spanClass = 'col-span-full';
          const IconComponent = field.icon;
          return (
            <div key={field.name} className={spanClass}>
              {field.label && (
                <label className={labelClass} style={{ visibility: field.label.trim() === '' ? 'hidden' : 'visible' }}>
                  {field.label.trim() || 'placeholder'}
                </label>
              )}

              {field.type === 'input' && (
                <div className="relative flex items-center">
                  {IconComponent && (
                    <IconComponent className="absolute left-5 text-white text-lg pointer-events-none" />
                  )}

                  <input
                    type="text"
                    readOnly={field.readOnly}
                    autoComplete="off"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`w-full py-4 rounded-xl border outline-none transition-all text-sm md:text-[12px] lg:text-sm text-(--text-main) ${inputBgClass} ${IconComponent ? 'pl-12' : 'pl-5'
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
                    autoComplete="off"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`w-full py-4 pr-12 rounded-xl border outline-none transition-all appearance-none cursor-pointer text-sm md:text-[13px] lg:text-sm ${formData[field.name] ? inputBgClass : inputBgClass.replace('text-(--text-main)', 'text-[#666666]')} ${IconComponent ? 'pl-12' : 'pl-5'
                      }`}
                  >
                    <option value="" disabled className="text-[#666666]">
                      {field.placeholder || 'Select Option'}
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className="bg-(--bg-secondary)">
                        {opt}
                      </option>
                    ))}
                  </select>

                  <FiChevronDown className="absolute right-5 text-(--text-main) text-lg pointer-events-none" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Message Field */}
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={5}
          required
          autoComplete="off"
          placeholder="Enter your Message here.."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none text-sm md:text-[13px] lg:text-sm text-(--text-main) ${inputBgClass}`}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            autoComplete="off"
            checked={formData.agreeTerms}
            onChange={(e) => handleChange('agreeTerms', e.target.checked)}
            className="w-5 h-5 rounded cursor-pointer appearance-none border transition-all relative flex items-center justify-center checked:bg-primary checked:border-primary checked:before:content-['✓'] checked:before:text-white checked:before:text-xs checked:before:font-bold bg-(--bg-main) border-bg-gray-1"
          />
          <span className='text-[11px] sm:text-[14px] text-gray'>
            I agree with{' '}
            <a href="#" className="underline text-gray">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="underline text-gray">
              Privacy Policy
            </a>
          </span>
        </label>
          <Button
          type="submit"
            text={isSubmitting ? "Sending..." : "Send Your Message"}
            variant="primary"
            onClick={() => {}}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 sm:px-[18px] py-6 sm:py-[14px] text-[14px] sm:text-[16px]"
          />

      </div>
    </motion.form>
  );
};