import { SectionHeader } from "../components/common/SectionHeader";
import PageHero from "../components/sections/hero/PageHero";
import ServiceCard from "../components/sections/services/ServiceCard";
import { services } from "../data/contactData";
const Contact = () => {
  return (
    <div>
      <PageHero
        title="Get in Touch with Estatein"
        description="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
      />
      <section
        className="w-full bg-bg-dark-1 border border-bg-gray-1 py-1 sm:py-2"
        style={{ boxShadow: '0px 0px 0px 6px #191919' }}
      >
        <div className="w-full max-w-[1590px] mx-auto px-2 sm:px-1 lg:px-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {services.map((service) => (
              <ServiceCard
                key={service.heading}
                type="vertical"
                icon={service.icon}
                heading={service.heading}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="w-full max-w-[1590px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14">
        <SectionHeader
          title="Let's Connect"
          subtitle="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need."
          className="mb-10"
          fullWidth
        />
      </div>
    </div>
  );
};

export default Contact;
