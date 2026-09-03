import { SectionHeader } from '../../common/SectionHeader';
import { InfoBox } from '../infobox/InfoBox';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerItem } from '../../common/StaggerContainer';
import { useSmartInvestments } from '../../../hooks/useSmartInvestments';

export const SmartInvestments = () => {
  const { smartInvestments } = useSmartInvestments();

  return (
    <section className="w-full bg-(--bg-main) border-t border-b border-bg-gray-1 py-16 sm:py-20 lg:py-24">
     
      <div className="site-container">


        <div className="flex flex-col gap-8 md:gap-10 lg:grid lg:grid-cols-12 lg:gap-10 items-start">


          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-start gap-0 sm:gap-1">
            <SectionHeader
              title={
                <>
                  Smart Investments,
                  <br />
                  Informed Decisions
                </>
              }
              subtitle="Building a real estate portfolio requires a strategic approach. Estatein's Investment Advisory Service empowers you to make smart investments and informed decisions."
              className="mb-0"
              fullWidth
            />


            <div className="w-full">
              <div className="h-auto ">
                <InfoBox
                variant="vertical"
                title="Unlock Your Investment Potential"
                description="Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
                buttonLabel="Learn More"
                onButtonClick={() => {
                  console.log('Learn More clicked');
                }}
                />
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-7 xl:col-span-8 rounded-[10px] bg-(--bg-border) p-1.5 mt-14">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {smartInvestments.map((service) => (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  whileHover={{y: -4}}
                  transition={{duration: 0.25}}
                  className="bg-(--bg-main) border border-bg-gray-1 rounded-lg px-5 sm:px-6 py-3 sm:py-4 flex flex-col justify-start gap-4 hover:border-primary/40 transition-all duration-300"
                >

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-(--text-main) text-lg xl:text-xl font-['Urbanist',sans-serif]">
                      {service.title}
                    </h3>
                  </div>


                  <p className="text-[15px] sm:text-base font-normal text-gray-1 leading-[150%]">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SmartInvestments;