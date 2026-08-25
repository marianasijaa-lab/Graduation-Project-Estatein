import React from 'react';
import { SectionHeader } from '../../common/SectionHeader';
import ServiceCard from './ServiceCard';
import { values } from '../../../data/aboutData';
import { StaggerContainer } from '../../common/StaggerContainer';

const Values: React.FC = () => {
  return (
    <section className="w-full bg-(--bg-main) py-14 sm:py-16 lg:py-22 transition-colors duration-300">
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
          <StaggerContainer className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {values.map((value) => (
              <ServiceCard
                key={value.id}
                type="horizontal"
                icon={value.icon}
                heading={value.title}
                description={value.description}
              />
            ))}
          </stag>
        </div>
      </div>
    </section>
  );
};

export default Values;
