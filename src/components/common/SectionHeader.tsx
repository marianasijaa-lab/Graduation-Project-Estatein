import React from 'react';
import { motion } from 'framer-motion';
import { StarCluster } from './StarCluster';
import { FadeInSection } from './FadeInSection';

export interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  className = '',
  fullWidth = false,
}) => {
  return (
    <FadeInSection direction="up" className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 ${className}`}>
      {/* الجانب الأيسر: النجوم + العنوان h2 + الوصف p */}
      <div className={`space-y-2.5 ${fullWidth ? 'w-full' : 'max-w-4xl'}`}>
        <StarCluster />

        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold tracking-tight text-(--text-main) leading-normal">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-gray leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      {actionLabel && (
        <div className="shrink-0 self-start lg:self-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            className="px-5 py-3.5 rounded-xl bg-(--bg-secondary) hover:bg-(--bg-secondary) border border-[#262626] hover:border-[#262626] text-(--text-main) text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap"
          >
            {actionLabel}
          </motion.button>
        </div>
      )}
    </FadeInSection>
  );
};