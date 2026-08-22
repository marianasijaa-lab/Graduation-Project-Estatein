import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import ServiceCard from './ServiceCard';

const valuesData = [
  {
    icon: '/assets/Icon_33.png',
    heading: 'Trust',
    description: 'Trust is the cornerstone of every successful real estate transaction.',
  },
  {
    icon: '/assets/icon_10.png',
    heading: 'Excellence',
    description:
      'We set the bar high for ourselves. From the properties we list to the services we provide.',
  },
  {
    icon: '/assets/icon_11.png',
    heading: 'Client-Centric',
    description:
      'Your dreams and needs are at the center of our universe. We listen, understand.',
  },
  {
    icon: '/assets/icon_12.png',
    heading: 'Our Commitment',
    description:
      'We are dedicated to providing you with the highest level of service, professionalism, and support.',
  },
];

const Values: React.FC = () => {
  return (
    <section className="w-full bg-bg-dark-1 py-14 sm:py-16 lg:py-22">
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Header */}
          <div className="lg:w-[35%] flex flex-col justify-center">
            <SectionHeader
              title="Our Values"
              subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
              className="mb-0"
            />
          </div>

          {/* Values Grid */}
          <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {valuesData.map((value, index) => (
              <ServiceCard
                key={index}
                type="horizontal"
                icon={value.icon}
                heading={value.heading}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
