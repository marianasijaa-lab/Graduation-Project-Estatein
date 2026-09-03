import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { StarCluster } from './StarCluster';
import { FadeInSection } from './FadeInSection';

export interface SectionHeaderProps {
  title: ReactNode;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  className = '',
  fullWidth = false,
}) => {
  return (
    <FadeInSection direction="up" className={`flex flex-col items-start gap-4 sm:gap-6 mb-0 sm:mb-14 md:flex-row md:items-end md:justify-between overflow-visible ${className}`}>
      {/* الجانب الأيسر: النجوم + العنوان h2 + الوصف p */}
      <div className={`space-y-2.5 ${fullWidth ? 'w-full' : 'max-w-4xl'}`}>
        <StarCluster />

        <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] font-semibold tracking-tight text-(--text-main) leading-normal">
          {title}
        </h2>

        <p className="text-[13px] sm:text-base text-gray leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      {actionLabel && (
        <div className="w-fit shrink-0 self-start md:self-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            className="hidden w-fit px-4 py-2.5 rounded-xl bg-(--bg-secondary) hover:bg-(--bg-secondary)  border border-bg-gray-1 hover:border-bg-gray-1 text-(--text-main) text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap text-left md:inline-flex sm:px-5 sm:py-3.5"
          >
            {actionLabel}
          </motion.button>
        </div>
      )}
    </FadeInSection>
  );
};