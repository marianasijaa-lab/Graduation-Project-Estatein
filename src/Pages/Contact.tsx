import { useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import OfficeLocations from "../components/OfficeLocations/OfficeLocations";
import PageHero from "../components/sections/hero/PageHero";
import Services from "../components/sections/services/Services";
import TeamCard from "../components/TeamCard/TeamCard";
import { ContactForm } from "../components/sections/contact/ContactForm";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestoreDb } from "../firebase/config";

type SubmitStatus = "idle" | "submitting" | "submitted" | "error";

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (data: Record<string, string>) => {
    setSubmitStatus("submitting");
    setSubmitError(null);
    try {
      if (!firestoreDb) throw new Error("Firebase غير مهيأ — يرجى ملء ملف .env");
      await addDoc(collection(firestoreDb, "contacts"), {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        message: data.message || "",
        inquiryType: data.inquiryType || "",
        howDidYouHear: data.howDidYouHear || "",
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSubmitStatus("submitted");
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err instanceof Error ? err.message : "حدث خطأ أثناء إرسال الرسالة");
    }
  };

  return (
    <div>
      <PageHero
        title="Get in Touch with Estatein"
        description="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away."
      />

      {/* Services Bar */}
      <Services />

      {/* Contact Form */}
      <div className="site-container pt-8 sm:pt-10">
        <SectionHeader
          title="Let's Connect"
          subtitle="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein."
          className="mb-10"
          fullWidth
        />

        {/* Success state */}
        {submitStatus === "submitted" && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center">
            ✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
          </div>
        )}

        {/* Error state */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
            ⚠️ {submitError ?? "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى."}
          </div>
        )}

        <ContactForm
          columns={3}
          extraFields={[
            {
              name: "inquiryType",
              label: "Inquiry Type",
              type: "dropdown",
              placeholder: "Select Inquiry Type",
              options: ["Buying", "Selling", "Renting", "Investment", "Other"],
            },
            {
              name: "howDidYouHear",
              label: "How Did You Hear About Us?",
              type: "dropdown",
              placeholder: "Select",
              options: ["Google", "Social Media", "Friend", "Advertisement", "Other"],
            },
          ]}
          onSubmit={handleFormSubmit}
          isSubmitting={submitStatus === "submitting"}
        />
      </div>

      <div className="site-container pt-10 sm:pt-14">
        <SectionHeader
          title="Explore Estatein's World"
          subtitle="Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better."
          className="mb-10"
          fullWidth
        />
      </div>
      <OfficeLocations />
      <TeamCard />
    </div>
  );
};

export default Contact;
