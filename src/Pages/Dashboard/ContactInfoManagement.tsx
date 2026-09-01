import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useContactInfo } from "../../hooks/useContactInfo";
import { setDocument } from "../../api/firestore";
import { CONTACT_INFO_DOC_ID } from "../../store/slices/contactInfoSlice";
import type { FirestoreContactInfo, SocialLink, SocialPlatform } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { DashboardPageShell, staggerItem } from "../../components/dashboard/DashboardPageShell";

const SOCIAL_PLATFORMS: SocialPlatform[] = ["facebook", "linkedin", "twitter", "youtube", "instagram"];
const PLATFORM_LABEL: Record<SocialPlatform, string> = { facebook: "Facebook", linkedin: "LinkedIn", twitter: "Twitter / X", youtube: "YouTube", instagram: "Instagram" };

interface ContactInfoFormState {
  email: string; phone: string; address: string; mapUrl: string; openingHours: string; socialLinks: SocialLink[];
}
type ContactInfoFormErrors = Partial<Record<"email" | "phone" | "address" | "social", string>>;

function buildState(data: FirestoreContactInfo): ContactInfoFormState {
  return { email: data.email, phone: data.phone, address: data.address, mapUrl: data.mapUrl ?? "", openingHours: data.openingHours ?? "", socialLinks: data.socialLinks.map((l) => ({ ...l })) };
}

function validate(values: ContactInfoFormState): ContactInfoFormErrors {
  const errors: ContactInfoFormErrors = {};
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone is required.";
  if (!values.address.trim()) errors.address = "Address is required.";
  if (values.socialLinks.some((l) => l.enabled && !l.url.trim())) errors.social = "Every enabled social link needs a URL.";
  return errors;
}

export const ContactInfoManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { contactInfo, status } = useContactInfo();
  const [values, setValues] = useState<ContactInfoFormState>(() => buildState(contactInfo));
  const [errors, setErrors] = useState<ContactInfoFormErrors>({});
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => { if (!dirty) setValues(buildState(contactInfo)); }, [contactInfo, dirty]);

  const setField = <K extends keyof ContactInfoFormState>(field: K, value: ContactInfoFormState[K]) => {
    setValues((prev) => ({ ...prev, [field]: value })); setDirty(true); setSaveState("idle");
  };
  const setSocialLink = (index: number, patch: Partial<SocialLink>) => {
    setField("socialLinks", values.socialLinks.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  };
  const addSocialLink = () => {
    const used = new Set(values.socialLinks.map((l) => l.platform));
    const nextPlatform = SOCIAL_PLATFORMS.find((p) => !used.has(p)) ?? "facebook";
    setField("socialLinks", [...values.socialLinks, { platform: nextPlatform, url: "", enabled: true }]);
  };
  const removeSocialLink = (index: number) => setField("socialLinks", values.socialLinks.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const payload: Omit<FirestoreContactInfo, "id"> = {
      email: values.email.trim(), phone: values.phone.trim(), address: values.address.trim(),
      mapUrl: values.mapUrl.trim() || undefined, openingHours: values.openingHours.trim() || undefined,
      socialLinks: values.socialLinks.map((l) => ({ platform: l.platform, url: l.url.trim(), enabled: l.enabled })),
    };
    setSaveState("saving"); setSaveError(null);
    try {
      await setDocument<FirestoreContactInfo>("siteSettings", CONTACT_INFO_DOC_ID, payload);
      setDirty(false); setSaveState("saved");
    } catch (error) {
      setSaveState("error");
      setSaveError(error instanceof Error ? error.message : "Failed to save. Please try again.");
    }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputBgClass = isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary";
  const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`;
  const fieldClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all ${inputBgClass}`;
  const errorClass = "mt-1.5 text-xs text-red-500";

  const availablePlatforms = (index: number): SocialPlatform[] => {
    const usedElsewhere = new Set(values.socialLinks.filter((_, i) => i !== index).map((l) => l.platform));
    return SOCIAL_PLATFORMS.filter((p) => !usedElsewhere.has(p));
  };

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem}>
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          These details feed the contact info and social links shown in the site footer and on the Contact page. Changes are saved to a single settings record.
        </p>
      </motion.div>

      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-4 px-5 text-center text-sm text-rose-500">
          Couldn't load the current settings — you're editing the defaults.
        </motion.div>
      )}

      <motion.form variants={staggerItem} onSubmit={handleSubmit}
        className={`rounded-2xl border p-6 sm:p-8 flex flex-col gap-6 ${panelClass}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass} htmlFor="ci-email">Email</label>
            <input id="ci-email" type="email" placeholder="info@estatein.com" value={values.email} onChange={(e) => setField("email", e.target.value)} className={fieldClass} />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="ci-phone">Phone</label>
            <input id="ci-phone" type="tel" placeholder="+1 (123) 456-7890" value={values.phone} onChange={(e) => setField("phone", e.target.value)} className={fieldClass} />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="ci-address">Address</label>
          <input id="ci-address" type="text" placeholder="123 Estatein Plaza, City Center, Metropolis" value={values.address} onChange={(e) => setField("address", e.target.value)} className={fieldClass} />
          {errors.address && <p className={errorClass}>{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass} htmlFor="ci-map">Map URL (optional)</label>
            <input id="ci-map" type="url" placeholder="https://maps.google.com/…" value={values.mapUrl} onChange={(e) => setField("mapUrl", e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="ci-hours">Opening Hours (optional)</label>
            <input id="ci-hours" type="text" placeholder="Mon–Fri, 9:00 AM – 6:00 PM" value={values.openingHours} onChange={(e) => setField("openingHours", e.target.value)} className={fieldClass} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className={labelClass}>Social Links</span>
            <button type="button" onClick={addSocialLink} disabled={values.socialLinks.length >= SOCIAL_PLATFORMS.length}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"} disabled:opacity-50 disabled:cursor-not-allowed`}>
              <FiPlus className="w-3.5 h-3.5" /> Add link
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {values.socialLinks.map((link, index) => (
              <div key={index} className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border p-3 ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <select value={link.platform} onChange={(e) => setSocialLink(index, { platform: e.target.value as SocialPlatform })} aria-label="Platform"
                  className={`px-3 py-2.5 rounded-lg border outline-none cursor-pointer transition-all sm:w-40 ${inputBgClass}`}>
                  {availablePlatforms(index).map((p) => <option key={p} value={p} className={isDark ? "bg-bg-dark" : "bg-white"}>{PLATFORM_LABEL[p]}</option>)}
                </select>
                <input type="url" placeholder="https://…" value={link.url} onChange={(e) => setSocialLink(index, { url: e.target.value })}
                  aria-label={`${PLATFORM_LABEL[link.platform]} URL`} className={`flex-1 px-3 py-2.5 rounded-lg border outline-none transition-all ${inputBgClass}`} />
                <label className={`flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  <input type="checkbox" checked={link.enabled} onChange={(e) => setSocialLink(index, { enabled: e.target.checked })} className="w-4 h-4 rounded cursor-pointer accent-primary" />
                  Shown
                </label>
                <button type="button" onClick={() => removeSocialLink(index)} aria-label={`Remove ${PLATFORM_LABEL[link.platform]}`}
                  className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {values.socialLinks.length === 0 && <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>No social links yet — add one above.</p>}
          </div>
          {errors.social && <p className={errorClass}>{errors.social}</p>}
        </div>

        <div className={`flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-2 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          {saveState === "saved" && <span className="text-sm text-green-500 sm:mr-auto">Settings saved.</span>}
          {saveState === "error" && <span className="text-sm text-rose-500 sm:mr-auto">{saveError}</span>}
          <Button text={saveState === "saving" ? "Saving…" : "Save Changes"} variant="primary" type="submit" disabled={saveState === "saving"} onClick={() => {}} />
        </div>
      </motion.form>
    </DashboardPageShell>
  );
};

export default ContactInfoManagement;
