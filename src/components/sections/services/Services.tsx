import ServiceCard from './ServiceCard';
import { StaggerContainer } from '../../common/StaggerContainer';

const Services: React.FC = () => {
  const services = [
    { icon: '/assets/Icon_1.png', heading: 'Find Your Dream Home' },
    { icon: '/assets/Icon_2.png', heading: 'Unlock Property Value' },
    { icon: '/assets/Icon_3.png', heading: 'Effortless Property Management' },
    { icon: '/assets/Icon_4.png', heading: 'Smart Investments, Informed Decisions' },
  ];

  return (
    <section className="w-full bg-(--bg-main) border border-bg-gray-1 py-1 sm:py-2" 
     style={{ boxShadow: 'var(--color-shadow)'}}>
      <div className="w-full mx-auto px-2 sm:px-1 lg:px-2">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              type="vertical"
              heading={service.heading}
              icon={service.icon}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;