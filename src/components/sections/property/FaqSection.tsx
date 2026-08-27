import { SectionHeader } from "../../common/SectionHeader";
import FAQSlider from "../../ui/slider/FAQSlider";
import { useState } from "react";

const FAQSection = () => {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <section className="w-full bg-bg-dark-1">
      <div className="site-container py-8 sm:py-10 lg:py-14">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
          actionLabel="View All FAQ's"
          onAction={() => setShowAllFaqs(true)}
          fullWidth
        />
        <FAQSlider showAll={showAllFaqs} onBack={() => setShowAllFaqs(false)} />
      </div>
    </section>
  );
};

export default FAQSection;
