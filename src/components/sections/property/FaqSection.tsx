import { SectionHeader } from "../../common/SectionHeader";
import FAQSlider from "../../ui/slider/FAQSlider";

const FAQSection = () => {
  return (
    <section className="w-full bg-[#141414]">
      <div className="site-container py-8 sm:py-10 lg:py-14">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
          actionLabel="View All FAQ's"
          fullWidth
        />
        <FAQSlider />
      </div>
    </section>
  );
};

export default FAQSection;
