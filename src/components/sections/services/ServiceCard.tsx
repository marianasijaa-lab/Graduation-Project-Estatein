import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';

interface ServiceCardProps {
  type: 'horizontal' | 'vertical';
  icon: string;
  heading: string;
  description?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, heading, icon, description }) => {
  if (type === 'vertical') {
    return (
      <div className="group relative flex flex-col items-center justify-center text-center bg-[#1A1A1A] border border-[#262626] rounded-[10px] py-8 px-10 sm:px-6 hover:border-[#703BF7]/50 hover:bg-[#1e1e1e] transition-all duration-300 cursor-pointer overflow-hidden w-full">
        {/* سهم الزاوية */}
        <GoArrowUpRight
          size={28}
          className="absolute right-4 top-4 text-border group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />

        {/* الأيقونة */}
        <div className="relative mb-5 flex items-center justify-center">
          <img src={icon} alt={heading} className="w-15 h-15 object-contain" />
        </div>

        {/* العنوان */}
        <h3 className="font-semibold text-white text-[11px] sm:text-[13px] lg:text-[15px]  leading-snug whitespace-nowrap">
          {heading}
        </h3>
      </div>
    );
  }

  // horizontal
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-14 h-14 rounded-full shrink-0 bg-bg-dark-1 border border-primary">
          <img src={icon} alt={heading} className="w-6 h-6 object-contain" />
        </div>
        <h3 className="font-semibold text-white text-lg xl:text-xl">{heading}</h3>
      </div>
      {description && (
        <p className="text-[15px] font-medium text-gray leading-[150%]">{description}</p>
      )}
    </div>
  );
};

export default ServiceCard;
