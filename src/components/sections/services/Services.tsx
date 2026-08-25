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
    <section className="w-full bg-bg-dark-1 border border-bg-gray-1 py-1 sm:py-2"
      style={{ boxShadow: '0px 0px 0px 6px #191919' }}>
      <div className="w-full max-w-[1590px] mx-auto px-2 sm:px-1 lg:px-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
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
