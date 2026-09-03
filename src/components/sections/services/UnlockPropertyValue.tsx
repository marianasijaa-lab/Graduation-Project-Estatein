import { SectionHeader } from '../../common/SectionHeader';
import { InfoBox } from '../infobox/InfoBox';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerItem } from '../../common/StaggerContainer';
import { useUnlockPropertyValue } from '../../../hooks/useUnlockPropertyValue';

export const UnlockPropertyValue = () => {
  const { unlockPropertyValue } = useUnlockPropertyValue();

  return (
    <section className="w-full bg-(--bg-main) border-t border-bg-gray-1 py-16 sm:py-20 lg:py-24">
      
      <div className="site-container">

        <SectionHeader
          title="Unlock Property Value"
          subtitle="Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey"
          className="mb-12 sm:mb-16"
          fullWidth
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {unlockPropertyValue.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{y: -4}}
              transition={{duration: 0.25}}
              className="bg-(--bg-main) border border-bg-gray-1 rounded-2xl p-5 sm:p-6 flex flex-col justify-start gap-3 hover:border-[#703BF7]/40 transition-all duration-300 lg:h-full lg:min-h-[200px]"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-(--text-main) text-lg xl:text-xl">
                  {service.title}
                </h3>
              </div>

              <p className="text-[15px] sm:text-base font-normal text-gray leading-[150%]">
                {service.description}
              </p>
            </motion.div>
          ))}

          <div className="md:col-span-2 lg:col-span-2 h-full w-full">
            <InfoBox
              variant="horizontal"
              title="Unlock the Value of Your Property Today"
              description="Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset."
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

export default UnlockPropertyValue;