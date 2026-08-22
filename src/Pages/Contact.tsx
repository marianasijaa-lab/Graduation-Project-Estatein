import { SectionHeader } from "../components/common/SectionHeader";
import HeroContact from "../components/HeroContact/HeroContact";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import { services } from "./../Data/contactData";
const Contact = () => {
  return (
    <div>
      <HeroContact
        title="Get in Touch with Estatein"
        description1="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property,"
        description2=" explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service) => (
          <ServiceCard
            key={service.heading}
            type="vertical"
            icon={service.icon}
            heading={service.heading}
          />
        ))}
      </div>
      <SectionHeader
        title="Let's Connect"
        subtitle="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need."
        className="mb-10"
      />
    </div>
  );
};

export default Contact;
