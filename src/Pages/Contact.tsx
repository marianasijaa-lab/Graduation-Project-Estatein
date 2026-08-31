import { useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import OfficeLocations from "../components/OfficeLocations/OfficeLocations";
import PageHero from "../components/sections/hero/PageHero";
import TeamCard from "../components/TeamCard/TeamCard";
import { ContactForm } from "../components/sections/contact/ContactForm";
import { useServices } from "../hooks/useServices";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";
import { ErrorMessage } from "../components/ui/ErrorMessage";
// import { OfficesSection } from "../components/sections/contact/OfficesSection";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestoreDb } from "../firebase/config";
import { StaggerContainer } from "../components/common/StaggerContainer";
import ServiceCard from "../components/sections/services/ServiceCard";
import { services } from "../data/contactData";

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
    <div className="bg-(--bg-main)">
      <PageHero
        title="Get in Touch with Estatein"
        description="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away."
      />

      {/* Services Bar with Animation */}
      <section
        className="w-full bg-(--bg-secondary) border border-(--color-border) py-1 sm:py-2 transition-colors duration-300"
        style={{ boxShadow: '0px 0px 0px 6px var(--bg-main)' }}
      >
        <div className="w-full mx-auto px-2 sm:px-1 lg:px-2">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {services.map((service) => (
              <ServiceCard
                key={service.heading}
                type="vertical"
                icon={service.icon}
                heading={service.heading}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form */}
      <div className=" site-container pt-8 sm:pt-10">
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

      <div className="bg-(--bg-main) site-container pt-10 sm:pt-14">
        <SectionHeader
          title="Discover Our Office Locations"
          subtitle="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you."
          className="mb-2"
          fullWidth
          
        />
      </div>
      <OfficeLocations  />
      <div className=" site-container mb-16">
        <TeamCard />
      </div>
    </div>
  );
};

export default Contact;