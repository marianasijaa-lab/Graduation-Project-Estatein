import React from 'react';
import { SectionHeader } from '../../common/SectionHeader';
import ServiceCard from './ServiceCard';
import { useValues } from '../../../hooks/useValues';
import { StaggerContainer } from '../../common/StaggerContainer';

const Values: React.FC = () => {
  const { values } = useValues();

  return (
    <section className="w-full bg-(--bg-main) py-8 sm:py-10 lg:py-14">
      <div className="site-container">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
          {/* Header */}
          <div className="md:w-[35%] flex flex-col justify-center">
            <SectionHeader
              title="Our Values"
              subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
              className="mb-0"
            />
          </div>

          {/* Values Grid */}
          <StaggerContainer className="md:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {values.map((value) => (
              <ServiceCard
                key={value.id}
                type="horizontal"
                icon={value.icon}
                heading={value.title}
                description={value.description}
              />
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Values;