import { motion } from 'framer-motion';
import React from 'react';
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
        whileHover={{y: -4}}
        transition={{duration: 0.25}}
        className="group relative flex flex-col items-center justify-center text-center bg-(--bg-main) border border-(--color-border) rounded-[10px] py-8 px-10 sm:px-6 hover:border-primary/50 hover:bg-(--bg-secondary) transition-all duration-300 cursor-pointer overflow-hidden w-full">
        {/* سهم الزاوية */}
        <GoArrowUpRight
          size={28}
          className="absolute right-4 top-4 text-(--color-border) group-hover:text-(--text-main) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />

        {/* الأيقونة */}
        <div className="relative mb-5 flex items-center justify-center">
          <img src={icon} alt={heading} className="w-15 h-15 object-contain" />
        </div>

        {/* العنوان */}
        <h3 className="font-semibold text-(--text-main) text-[11px] sm:text-[13px] lg:text-[15px]  leading-snug whitespace-nowrap">
          {heading}
        </h3>
      </motion.div>
    );
  }

  // horizontal
  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-14 h-14 rounded-full shrink-0 bg-(--bg-secondary) border border-primary">
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
