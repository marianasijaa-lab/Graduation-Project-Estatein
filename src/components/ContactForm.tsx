import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

export interface ExtraField {
    name: string;
    label: string;
    type: 'input' | 'dropdown' | 'textarea' | 'radio-input';
    placeholder?: string;
    options?: string[];
    prefilled?: string;
    icon?: string;
    readOnly?: boolean;
}

interface ContactFormProps {
    extraFields?: ExtraField[];
    onSubmit?: (data: Record<string, any>) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
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
        initialFormState[field.name] = field.prefilled || '';
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
        ? 'bg-[#1A1A1A] border-[#262626] text-white placeholder-gray-500 focus:border-[#703BF7]'
        : 'bg-[#F9F9F9] border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#703BF7]';

    const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'
        }`;

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full max-w-7xl mx-auto rounded-2xl p-6 sm:p-10 lg:p-14 border space-y-6 sm:space-y-8 ${isDark ? 'bg-[#141414] border-bg-card' : 'bg-white border-gray-200 shadow-sm'
                }`}
        >

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

            {/* 3. الحقول الإضافية) */}
            {extraFields.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {extraFields.map((field) => (
                        <div
                            key={field.name}
                            className={field.type === 'textarea' ? 'col-span-full' : ''}
                        >
                            <label className={labelClass}>{field.label}</label>

                            {field.type === 'input' && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly={field.readOnly}
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        className={`w-full px-5 py-4 rounded-xl border outline-none transition-all ${inputBgClass} ${field.readOnly ? 'cursor-not-allowed opacity-80' : ''
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
                                            <option key={opt} value={opt} className={isDark ? 'bg-bg-dark' : 'bg-white'}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                                        {field.icon && <img src={field.icon} alt="icon" className="w-5 h-5 opacity-60" />}
                                        <span className="text-xs opacity-50">▼</span>
                                    </div>
                                </div>
                            )}

                            {field.type === 'radio-input' && (
                                <div className="flex flex-wrap gap-4 py-2">
                                    {field.options?.map((opt) => (
                                        <label
                                            key={opt}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData[field.name] === opt
                                                    ? 'border-primary bg-primary/10'
                                                    : isDark
                                                        ? 'border-bg-card bg-bg-dark'
                                                        : 'border-gray-200 bg-[#F9F9F9]'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={field.name}
                                                value={opt}
                                                checked={formData[field.name] === opt}
                                                onChange={(e) => handleChange(field.name, e.target.value)}
                                                className="accent-primary"
                                            />
                                            <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {opt}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}

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

            {/* 4. الحقل الثابت: Message */}
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

            {/* 5. الثوابت: الشروط والأحكام + زر الإرسال */}
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
    );
};