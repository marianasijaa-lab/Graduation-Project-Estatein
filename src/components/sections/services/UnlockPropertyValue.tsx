import React from 'react';
import { StarCluster } from '../../common/StarCluster';
import { InfoBox } from '../infobox/InfoBox';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const unlockServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Valuation Mastery',
    description: 'Discover the true worth of your property with our expert valuation services.',
    icon: '/assets/Icon_19.png',
  },
  {
    id: '2',
    title: 'Strategic Marketing',
    description: 'Selling a property requires more than just a listing; it demands a strategic marketing approach.',
    icon: '/assets/Icon_20.png',
  },
  {
    id: '3',
    title: 'Negotiation Wizardry',
    description: 'Negotiating the best deal is an art, and our negotiation experts are masters of it.',
    icon: '/assets/Icon_21.png',
  },
  {
    id: '4',
    title: 'Closing Success',
    description: 'A successful sale is not complete until the closing. We guide you through the intricate closing process.',
    icon: '/assets/Icon_22.png',
  },
];

export const UnlockPropertyValue: React.FC = () => {
  return (
    <section className="w-full bg-[#141414] border-t border-[#262626] py-16 sm:py-20 lg:py-24">
      {/* Container مطابق لعرض Figma المحدد 1596px */}
      <div className="max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* 1. Header القسم (مع النجوم، والعرض 1296px لسطرين فقط مثل فيغما تماماً) */}
        <div className="mb-12 sm:mb-16 space-y-3.5 max-w-[1296px]">
          <StarCluster />
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[120%] font-['Urbanist',sans-serif]">
            Unlock Property Value
          </h2>
          <p className="text-sm sm:text-base lg:text-[16px] text-[#999999] leading-[150%] font-normal">
            Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey
          </p>
        </div>

        {/* 2. شبكة الكروت (3 أعمدة مع items-stretch لارتفاع متساوٍ لكافة العناصر بالصف) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* الكروت الأربعة الأولى (بما فيها كرت Closing Success) */}
          {unlockServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#1A1A1A] border border-[#262626] rounded-[16px] p-8 sm:p-10 flex flex-col justify-between gap-6 hover:border-[#703BF7]/40 transition-all duration-300 h-full min-h-[266px]"
            >
              {/* الصف العلوي: الأيقونة (82px × 82px بدون إطار خارجي) + العنوان */}
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-[82px] sm:h-[82px] shrink-0 flex items-center justify-center">
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

              {/* نص الوصف */}
              <p className="text-[15px] sm:text-base font-normal text-[#999999] leading-[150%]">
                {service.description}
              </p>
            </div>
          ))}

          {/* 3. كارت الـ Banner الممتد على عمودين مع نفس الارتفاع المتطابق (266px) وصورة الخلفية محلياً */}
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

        </div>

      </div>
    </section>
  );
};

export default UnlockPropertyValue;