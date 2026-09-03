import type { FC } from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../../common/FadeInSection';
import { useTheme } from '../../../Context/ThemeContext';

interface InfoBoxProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  variant?: 'horizontal' | 'vertical';
}

export const InfoBox: FC<InfoBoxProps> = ({
  title,
  description,
  buttonLabel = 'Learn More',
  onButtonClick,
  variant = 'horizontal',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerBase = `relative overflow-hidden rounded-2xl border transition-colors border-[#262626] text-white ${isDark ? 'bg-[#1a1a1a]' : 'bg-(--bg-secondary)'}`;
  const containerStyle = {};

  // Shared abstract background overlay
  const bgOverlay = (
    <div
      className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none"
      style={{ backgroundImage: `url(/assets/Abstract3.png)` }}
    />
  );

  if (variant === 'vertical') {
    return (
      <div className={`${containerBase} flex flex-col p-8 sm:p-10 gap-6 h-auto`} style={containerStyle}>
        {bgOverlay}

        {/* Title */}
        <h3 className="relative z-10 text-xl sm:text-2xl font-semibold leading-snug text-(--text-main)">
          {title}
        </h3>

        {/* Description */}
        <p
          className='relative z-10 text-sm sm:text-base leading-relaxed flex-1 text-gray'
        >
          {description}
        </p>

        {/* Full-width button with animations */}
        <motion.button
          whileHover={{ opacity: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
        className='relative z-10 w-full py-4 rounded-[10px] text-sm font-medium transition-colors bg-(--bg-main) border border-[#262626] text-(--text-main) hover:bg-(--bg-hover)'
        >
          {buttonLabel}
        </motion.button>
      </div>
    );
  }

  // horizontal (default)
  return (
    <FadeInSection direction="up" className={`${containerBase} flex flex-col gap-4 px-8 sm:px-10 py-8`} style={containerStyle}>
      {bgOverlay}

      {/* الصف العلوي: العنوان + الزر */}
      <div className="relative z-10 flex items-center justify-between gap-4 w-full">
        <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-(--text-main)">{title}</h3>

        {/* الزر — مخفي على الشاشات الصغيرة */}
        <motion.button
          whileHover={{ opacity: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className='hidden sm:block shrink-0 px-6 py-3 rounded-[10px] text-sm font-medium transition-colors border bg-(--bg-main) border-[#262626] text-(--text-main) hover:bg-(--bg-hover)'
        >
          {buttonLabel}
        </motion.button>
      </div>

      {/* الزر — يظهر فقط على الشاشات الصغيرة */}
      <div className="relative z-10 w-full sm:hidden">
        <motion.button
          whileHover={{ opacity: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className='w-full py-3 rounded-[10px] text-sm font-medium transition-colors border bg-(--bg-main) border-[#262626] text-(--text-main) hover:bg-(--bg-hover)'
        >
          {buttonLabel}
        </motion.button>
      </div>

      {/* الوصف — على كامل العرض */}
      <p className='relative z-10 text-sm sm:text-base leading-relaxed text-gray w-full'>
        {description}
      </p>
    </FadeInSection>
  );
};