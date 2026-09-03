import React from 'react';
import { motion } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import { staggerItem } from '../../common/StaggerContainer';

interface ServiceCardProps {
  type: 'horizontal' | 'vertical';
  icon: string;
  heading: string;
  description?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, heading, icon, description }) => {
  if (type === 'vertical') {
    return (
      <motion.div
        variants={staggerItem}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group relative flex flex-col items-center justify-center text-center bg-(--bg-secondary) border border-bg-gray-1 rounded-[10px] py-6 px-4 sm:py-8 sm:px-10 hover:border-[#703BF7]/50 hover:bg-(--bg-hover) transition-all duration-300 cursor-pointer overflow-hidden w-full"
      >
        {/* سهم الزاوية */}
        <GoArrowUpRight
          size={22}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-(--color-arrow) group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />

        {/* الأيقونة */}
        <div className="relative mb-4 flex items-center justify-center">
          <img src={icon} alt={heading} className="w-12 h-12 sm:w-15 sm:h-15 object-contain" />
        </div>

        {/* العنوان */}
        <h3 className="font-semibold text-(--text-main) text-[11px] sm:text-[13px] lg:text-base whitespace-nowrap">
          {heading}
        </h3>
      </motion.div>
    );
  }

  // horizontal
  return (
    <motion.div variants={staggerItem} className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-14 h-14 rounded-full shrink-0 bg-(--bg-main) border border-primary">
          <img src={icon} alt={heading} className="w-6 h-6 object-contain" />
        </div>
        <h3 className="font-semibold text-(--text-main) text-lg xl:text-xl">{heading}</h3>
      </div>
      {description && (
        <p className="text-[15px] font-medium text-gray leading-[150%]">{description}</p>
      )}
    </motion.div>
  );
};

export default ServiceCard;