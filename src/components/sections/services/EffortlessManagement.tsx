import React from 'react';
import { SectionHeader } from '../../common/SectionHeader';
import { InfoBox } from '../infobox/InfoBox';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerItem } from '../../common/StaggerContainer';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const managementServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Tenant Harmony',
    description: 'Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.',
    icon: '/assets/Icon_23.png',
  },
  {
    id: '2',
    title: 'Maintenance Ease',
    description: 'Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.',
    icon: '/assets/Icon_24.png',
  },
  {
    id: '3',
    title: 'Financial Peace of Mind',
    description: 'Managing property finances can be complex. Our financial experts take care of rent collection',
    icon: '/assets/Icon_25.png',
  },
  {
    id: '4',
    title: 'Legal Guardian',
    description: 'Stay compliant with property laws and regulations effortlessly.',
    icon: '/assets/Icon_27.png',
  },
];

export const EffortlessPropertyManagement: React.FC = () => {
  const { effortlessPropertyManagement: cards } = useEffortlessPropertyManagement();

  return (
    <section className="w-full bg-[#141414] border-t border-[#262626] py-16 sm:py-20 lg:py-24">

      <div className="site-container">
        <SectionHeader
          title="Effortless Property Management"
          subtitle="Owning a property should be a pleasure, not a hassle. Estatein's Property Management Service takes the stress out of property ownership, offering comprehensive solutions tailored to your needs. Explore the categories below to see how we can make property management effortless for you"
          className="mb-12 sm:mb-16"
          fullWidth
        />

        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {managementServices.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{y: -4}}
              transition={{duration: 0.25}}
              className="bg-[#141414] border border-[#262626] rounded-[16px] p-5 sm:p-6 flex flex-col justify-start gap-3 hover:border-[#703BF7]/40 transition-all duration-300 lg:h-full lg:min-h-[200px]"
            >

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-white text-lg xl:text-xl font-['Urbanist',sans-serif]">
                  {service.title}
                </h3>
              </div>

              {/* الوصف */}
              <p className="text-[15px] sm:text-base font-normal text-[#999999] leading-[150%]">
                {service.description}
              </p>
            </motion.div>
          ))}

          {/* 3. كارت الـ Banner الأفقي الممتد على عمودين بنفس الارتفاع الدقيق 266px */}
          <div className="md:col-span-2 lg:col-span-2 h-full w-full">
            <InfoBox
              variant="horizontal"
             // className="h-full min-h-[266px] w-full"
              title="Experience Effortless Property Management"
              description="Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
              buttonLabel="Learn More"
              onButtonClick={() => {
                console.log('Learn More clicked');
              }}
            />
          </div>
        </StaggerContainer>

      </div>
    </section>
  );
};

export default EffortlessPropertyManagement;
