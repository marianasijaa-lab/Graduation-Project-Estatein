/*import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    { icon: "/assets/Icon_1.png", heading: "Find Your Dream Home" },
    { icon: "/assets/Icon_2.png", heading: "Unlock Property Value" },
    { icon: "/assets/Icon_3.png", heading: "Effortless Property Management" },
    {
      icon: "/assets/Icon_4.png",
      heading: "Smart Investments, Informed Decisions",
    },
  ];
  return (
    <div className="bg-bg-dark grid grid-cols-2 lg:grid-cols-4 p-2.5 w-full justify-center gap-2.5">
      {services.map((service) => (
        <ServiceCard type="vertical" heading={service.heading} icon={service.icon} />
      ))}
    </div>
  );
};

export default Services;*/
import React from 'react';
import ServiceCard from './ServiceCard';

const Services: React.FC = () => {
  const services = [
    { icon: '/assets/Icon_1.png', heading: 'Find Your Dream Home' },
    { icon: '/assets/Icon_2.png', heading: 'Unlock Property Value' },
    { icon: '/assets/Icon_3.png', heading: 'Effortless Property Management' },
    { icon: '/assets/Icon_4.png', heading: 'Smart Investments, Informed Decisions' },
  ];

  return (
    <section className="w-full bg-[#141414] py-8 sm:py-10">
      <div className="w-full max-w-[1590px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              type="vertical"
              heading={service.heading}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
