import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../../common/FadeInSection';
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
  colSpan?: number;
  hasDot?: boolean;
  dotSelected?: boolean;
}

interface ContactFormProps {
  title?: string;        // جديد: عنوان الفورم مع أنيميشن
  subtitle?: string;     // جديد: وصف الفورم مع أنيميشن
  extraFields?: ExtraField[];
  columns?: 2 | 3 | 4;
  onSubmit?: (data: Record<string, any>) => void;
  isSubmitting?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subtitle,
  extraFields = [],
  columns = 3,
  onSubmit,
  isSubmitting = false,
}) => {
  // تهيئة الحالة مع دعم radio-input مثل الكود الأول
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
      initialFormState[`${field.name}_selected`] = field.prefilled || '';
      field.options?.forEach((opt) => {
        initialFormState[`${field.name}_${opt}`] = '';
      });
    } else {
      initialFormState[field.name] = field.prefilled || '';
    }
  });

  const [formData, setFormData] = useState(initialFormState);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setShowSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    if (onSubmit) onSubmit(formData);
    setFormData(initialFormState);
  };

  // ✅ استخدام CSS variables بدلاً من الألوان الثابتة (Light Mode)
  const inputBgClass =
    'bg-bg-dark border-bg-gray-1 text-(--text-main) placeholder-gray-500 focus:border-primary transition-colors duration-300';

  const labelClass = 'block text-sm font-medium mb-2 text-white';

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className="w-full">
      {/* ✅ إضافة title و subtitle مع FadeInSection مثل الكود الأول */}
      {(title || subtitle) && (
        <FadeInSection direction="up" className="mb-8">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-(--text-main)">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base leading-relaxed text-gray">
              {subtitle}
            </p>
          )}
        </FadeInSection>
      )}

      {/* ✅ إضافة motion.form مع أنيميشن whileInView مثل الكود الأول */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.24, 0.1, 0.25, 1] }}
        className="w-full rounded-2xl p-6 sm:p-10 lg:p-14 border space-y-6 sm:space-y-8 bg-(--bg-main) border-bg-gray-1 transition-colors duration-300"
      >
        {showSuccess && (
          <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-400">
            ✅ Your message has been sent successfully!
          </div>
        )}

        {/* الحقول الأساسية مع نفس تصميم الكود الثاني مع ألوان CSS variables */}
        <div className={`grid ${gridColsClass} gap-6`}>
          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Email */}
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

          {/* Phone */}
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

          {/* Extra Fields مع دعم radio-input كامل مثل الكود الأول */}
          {extraFields.map((field) => {
            let spanClass = '';
            if (field.colSpan === 2) spanClass = 'col-span-1 sm:col-span-2';
            else if (
              field.readOnly ||
              field.type === 'textarea' ||
              field.type === 'radio-input'
            )
              spanClass = 'col-span-full';
            else if (field.colSpan === 3) spanClass = 'sm:col-span-3';
            else if (field.colSpan === 4) spanClass = 'col-span-full';

            const IconComponent = field.icon;
            return (
              <div key={field.name} className={spanClass}>
                {field.label && <label className={labelClass}>{field.label}</label>}

                {/* input */}
                {field.type === 'input' && (
                  <div className="relative flex items-center">
                    {IconComponent && (
                      <IconComponent className="absolute left-5 text-gray-400 text-lg pointer-events-none" />
                    )}
                    <input
                      type="text"
                      readOnly={field.readOnly}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`w-full py-4 rounded-xl border outline-none transition-all ${inputBgClass} ${
                        IconComponent ? 'pl-12' : 'pl-5'
                      } ${field.hasDot ? 'pr-12' : 'pr-5'} ${
                        field.readOnly ? 'cursor-not-allowed opacity-80' : ''
                      }`}
                    />
                    {field.hasDot && (
                      <div className="absolute right-5 flex items-center justify-center pointer-events-none">
                        <span
                          className={`w-3.5 h-3.5 rounded-full transition-all ${
                            field.dotSelected
                              ? 'bg-primary'
                              : 'border-2 border-primary bg-transparent'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* dropdown */}
                {field.type === 'dropdown' && (
                  <div className="relative flex items-center">
                    {IconComponent && (
                      <IconComponent className="absolute left-5 text-gray-400 text-lg pointer-events-none" />
                    )}
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`w-full py-4 pr-12 rounded-xl border outline-none transition-all appearance-none cursor-pointer ${inputBgClass} ${
                        IconComponent ? 'pl-12' : 'pl-5'
                      }`}
                    >
                      <option value="" disabled>
                        {field.placeholder || 'Select Option'}
                      </option>
                      {field.options?.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-(--bg-secondary) text-(--text-main)"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-5 text-gray-400 text-lg pointer-events-none" />
                  </div>
                )}

                {/* ✅ radio-input كامل مثل الكود الأول مع ألوان CSS variables */}
                {field.type === 'radio-input' && (
                  <div className="flex flex-wrap gap-4 py-2">
                    {field.options?.map((opt) => {
                      const isSelected =
                        formData[`${field.name}_selected`] === opt;
                      return (
                        <div
                          key={opt}
                          className={`flex items-center gap-3 flex-1 min-w-50 px-4 py-3 rounded-xl border transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : 'border-bg-gray-1 bg-bg-dark transition-all duration-300'
                          }`}
                        >
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
                          <input
                            type={
                              opt.toLowerCase().includes('email')
                                ? 'email'
                                : 'tel'
                            }
                            placeholder={
                              opt.toLowerCase().includes('email')
                                ? 'Enter Your Email'
                                : 'Enter Your Number'
                            }
                            value={formData[`${field.name}_${opt}`] || ''}
                            onChange={(e) =>
                              handleChange(`${field.name}_${opt}`, e.target.value)
                            }
                            className="flex-1 bg-transparent outline-none text-sm text-(--text-main) placeholder-gray-500"
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
            );
          })}
        </div>

        {/* Message Field */}
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

        {/* Footer مع checkbox مبسط باستخدام accent-primary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={formData.agreeTerms}
              onChange={(e) => handleChange('agreeTerms', e.target.checked)}
              className="w-5 h-5 rounded accent-primary cursor-pointer"
            />
            <span className="text-sm text-gray">
              I agree with{' '}
              <a href="#" className="underline text-(--text-main)">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="underline text-(--text-main)">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* ✅ زر الإرسال مع motion.button مثل الكود الأول */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Your Message'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};