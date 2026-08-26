import React from 'react';
import { SectionHeader } from '../../common/SectionHeader';
import { InfoBox } from '../infobox/InfoBox';

interface InvestmentServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const investmentServices: InvestmentServiceItem[] = [
  {
    id: '1',
    title: 'Market Insight',
    description:
      'Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions',
    icon: '/assets/Icon_19.png',
  },
  {
    id: '2',
    title: 'ROI Assessment',
    description:
      'Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments',
    icon: '/assets/Icon_27.png',
  },
  {
    id: '3',
    title: 'Customized Strategies',
    description:
      'Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs',
    icon: '/assets/Icon_28.png',
  },
  {
    id: '4',
    title: 'Diversification Mastery',
    description:
      'Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations',
    icon: '/assets/Icon_4.png',
  },
];

export const SmartInvestments: React.FC = () => {
  return (
    <section className="w-full bg-[#141414] border-t border-[#262626] py-16 sm:py-20 lg:py-24">
     
      <div className="site-container">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
       
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
              <div className="h-auto">
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

          
          <div className="lg:col-span-7 xl:col-span-8 rounded-[10px] bg-[#191919] p-1.5 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {investmentServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#141414] border border-[#262626] rounded-[8px] px-5 sm:px-6 py-3 sm:py-4 flex flex-col justify-start gap-4 hover:border-[#703BF7]/40 transition-all duration-300"
                >
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
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

                
                  <p className="text-[15px] sm:text-base font-normal text-[#999999] leading-[150%]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SmartInvestments;