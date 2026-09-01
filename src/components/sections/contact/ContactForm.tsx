import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { FiChevronDown } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  validateRequired,
} from '../../../utils/validation';

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
  /** If true, run email validation on this extra field */
  validateAs?: 'email' | 'phone' | 'required';
}

interface ContactFormProps {
  extraFields?: ExtraField[];
  columns?: 2 | 3 | 4;
  onSubmit?: (data: Record<string, unknown>) => void;
  isSubmitting?: boolean;
}

// ─── Validation ───────────────────────────────────────────────────────────────

type CoreField = 'firstName' | 'lastName' | 'email' | 'phone' | 'message';

function validateField(name: string, value: string, extraFields: ExtraField[]): string {
  switch (name) {
    case 'firstName': return validateName(value, 'First name');
    case 'lastName':  return validateName(value, 'Last name');
    case 'email':     return validateEmail(value);
    case 'phone':     return validatePhone(value);
    case 'message':   return validateMessage(value, 10);
    default: {
      const extra = extraFields.find((f) => f.name === name);
      if (!extra) return '';
      if (extra.validateAs === 'email') return validateEmail(value);
      if (extra.validateAs === 'phone') return validatePhone(value);
      if (extra.validateAs === 'required') return validateRequired(value, extra.label || 'This field');
      return '';
    }
  }
}

function validateAll(
  formData: Record<string, unknown>,
  extraFields: ExtraField[],
): Record<string, string> {
  const errors: Record<string, string> = {};
  const coreFields: CoreField[] = ['firstName', 'lastName', 'email', 'phone', 'message'];
  for (const f of coreFields) {
    const err = validateField(f, String(formData[f] ?? ''), extraFields);
    if (err) errors[f] = err;
  }
  for (const ef of extraFields) {
    if (ef.readOnly || ef.type === 'dropdown') continue;
    const err = validateField(ef.name, String(formData[ef.name] ?? ''), extraFields);
    if (err) errors[ef.name] = err;
  }
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactForm: React.FC<ContactFormProps> = ({
  extraFields = [],
  columns = 3,
  onSubmit,
  isSubmitting = false,
}) => {

  // ── form data ──
  const initialFormState: Record<string, unknown> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreeTerms: false,
  };
  extraFields.forEach((f) => { initialFormState[f.name] = f.prefilled ?? ''; });

  const [formData, setFormData] = useState<Record<string, unknown>>(initialFormState);

  // ── validation state ──
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // ── handlers ──
  const handleChange = (name: string, value: unknown) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setShowSuccess(false);

    // re-validate this field only if it has already been touched
    if (touched[name]) {
      const err = validateField(name, String(value ?? ''), extraFields);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (name: string) => {
    if (touched[name]) return; // already touched
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, String(formData[name] ?? ''), extraFields);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Touch everything so all errors are revealed
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((k) => { allTouched[k] = true; });
    setTouched(allTouched);

    const allErrors = validateAll(formData, extraFields);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    if (onSubmit) onSubmit(formData);
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setShowSuccess(true);
  };

  // ── style helpers ──
  const inputBase = `w-full px-5 py-4 rounded-xl border outline-none transition-all text-sm md:text-[13px] lg:text-sm text-white`;

  const inputBg = (name: string) => {
    const hasError = touched[name] && errors[name];
    if (hasError) {
      return isDark
        ? 'bg-[#1A1A1A] border-red-500 text-white placeholder-[#666666] focus:border-red-400'
        : 'bg-[#F9F9F9] border-red-500 text-gray-900 placeholder-gray-400 focus:border-red-400';
    }
    return isDark
      ? 'bg-[#1A1A1A] border-[#262626] text-white placeholder-[#666666] focus:border-[#703BF7]'
      : 'bg-[#F9F9F9] border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#703BF7]';
  };

  const labelClass = `block text-sm font-medium mb-2 text-white`;
  const errorClass = 'mt-1.5 text-xs text-red-400 flex items-center gap-1';

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  const ErrorMsg = ({ name }: { name: string }) =>
    touched[name] && errors[name] ? (
      <p className={errorClass} role="alert">
        <span aria-hidden="true">⚠</span>
        {errors[name]}
      </p>
    ) : null;

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`autofill-none site-container rounded-2xl p-6 sm:p-10 lg:p-14 border space-y-6 sm:space-y-8 ${
        isDark ? 'bg-bg-dark-1 border-bg-gray-1' : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      {/* Success banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-400"
            role="status"
          >
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
            autoComplete="off"
            placeholder="Enter First Name"
            value={String(formData.firstName)}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            aria-invalid={!!(touched.firstName && errors.firstName)}
            aria-describedby={errors.firstName ? 'err-firstName' : undefined}
            className={`${inputBase} ${inputBg('firstName')}`}
          />
          <ErrorMsg name="firstName" />
        </div>

        {/* Last Name */}
        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter Last Name"
            value={String(formData.lastName)}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            aria-invalid={!!(touched.lastName && errors.lastName)}
            className={`${inputBase} ${inputBg('lastName')}`}
          />
          <ErrorMsg name="lastName" />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={String(formData.email)}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={!!(touched.email && errors.email)}
            className={`${inputBase} ${inputBg('email')}`}
          />
          <ErrorMsg name="email" />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            autoComplete="off"
            placeholder="Enter Phone Number"
            value={String(formData.phone)}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-invalid={!!(touched.phone && errors.phone)}
            className={`${inputBase} ${inputBg('phone')}`}
          />
          <ErrorMsg name="phone" />
        </div>

        {/* Extra Fields */}
        {extraFields.map((field) => {
          let spanClass = '';
          if (field.colSpan === 2) spanClass = 'col-span-1 sm:col-span-2 md:col-span-2';
          else if (field.colSpan === 1) spanClass = 'col-span-1';
          else if (field.readOnly || field.type === 'textarea' || field.type === 'radio-input')
            spanClass = 'col-span-full';
          const IconComponent = field.icon;
          const hasErr = !!(touched[field.name] && errors[field.name]);

          const extraInputBg = hasErr
            ? isDark
              ? 'bg-[#1A1A1A] border-red-500 text-white placeholder-[#666666] focus:border-red-400'
              : 'bg-[#F9F9F9] border-red-500 text-gray-900 placeholder-gray-400 focus:border-red-400'
            : isDark
            ? 'bg-[#1A1A1A] border-[#262626] text-white placeholder-[#666666] focus:border-[#703BF7]'
            : 'bg-[#F9F9F9] border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#703BF7]';

          return (
            <div key={field.name} className={spanClass}>
              {field.label && (
                <label
                  className={labelClass}
                  style={{ visibility: field.label.trim() === '' ? 'hidden' : 'visible' }}
                >
                  {field.label.trim() || 'placeholder'}
                </label>
              )}

              {field.type === 'input' && (
                <>
                  <div className="relative flex items-center">
                    {IconComponent && (
                      <IconComponent className="absolute left-5 text-white text-lg pointer-events-none" />
                    )}
                    <input
                      type="text"
                      readOnly={field.readOnly}
                      autoComplete="off"
                      placeholder={field.placeholder}
                      value={String(formData[field.name] ?? '')}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      onBlur={() => handleBlur(field.name)}
                      aria-invalid={hasErr}
                      className={`w-full py-4 rounded-xl border outline-none transition-all text-sm md:text-[12px] lg:text-sm text-white ${extraInputBg} ${
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
                              ? 'bg-[#703BF7]'
                              : 'border-2 border-[#703BF7] bg-transparent'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  <ErrorMsg name={field.name} />
                </>
              )}

              {field.type === 'dropdown' && (
                <div className="relative flex items-center">
                  {IconComponent && (
                    <IconComponent className="absolute left-5 text-gray-400 text-lg pointer-events-none" />
                  )}
                  <select
                    autoComplete="off"
                    value={String(formData[field.name] ?? '')}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onBlur={() => handleBlur(field.name)}
                    className={`w-full py-4 pr-12 rounded-xl border outline-none transition-all appearance-none cursor-pointer text-sm md:text-[13px] lg:text-sm ${
                      formData[field.name]
                        ? extraInputBg
                        : extraInputBg.replace('text-white', 'text-[#666666]')
                    } ${IconComponent ? 'pl-12' : 'pl-5'}`}
                  >
                    <option value="" disabled className="text-[#666666]">
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
                  <FiChevronDown className="absolute right-5 text-white text-lg pointer-events-none" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={5}
          autoComplete="off"
          placeholder="Enter your Message here.."
          value={String(formData.message)}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          aria-invalid={!!(touched.message && errors.message)}
          className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none text-sm md:text-[13px] lg:text-sm text-white ${inputBg('message')}`}
        />
        <ErrorMsg name="message" />
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            autoComplete="off"
            checked={Boolean(formData.agreeTerms)}
            onChange={(e) => handleChange('agreeTerms', e.target.checked)}
            onBlur={() => handleBlur('agreeTerms')}
            className={`mt-0.5 w-5 h-5 shrink-0 rounded cursor-pointer appearance-none border transition-all relative flex items-center justify-center checked:bg-primary checked:border-primary checked:before:content-['✓'] checked:before:text-white checked:before:text-xs checked:before:font-bold ${
              isDark ? 'bg-bg-dark border-bg-gray-1' : 'bg-gray-400 border-gray-500'
            }`}
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
          text={isSubmitting ? 'Sending...' : 'Send Your Message'}
          variant="primary"
          onClick={() => {}}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 sm:px-[18px] py-6 sm:py-[14px] text-[14px] sm:text-[16px]"
        />
      </div>
    </motion.form>
  );
};
