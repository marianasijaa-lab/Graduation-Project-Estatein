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
  compact?: boolean;
}

export const InfoBox: FC<InfoBoxProps> = ({
  title,
  description,
  buttonLabel = 'Learn More',
  onButtonClick,
  variant = 'horizontal',
  compact = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerBase = `relative overflow-hidden rounded-2xl border transition-colors ${isDark ? 'border-[#262626] bg-[#1a1a1a] text-white' : 'border-gray-200 bg-white text-gray-900'}`;
  const containerStyle = {};

  // Background overlay — differs per theme and variant
  const getBgOverlay = (isVertical = false) => (
    <div
      className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none"
      style={{
        backgroundImage: isDark
          ? `url(/assets/Abstract3.png)`
          : isVertical
            ? `url(/assets/Group 1.png)`
            : `url(/assets/background_2.png)`,
        opacity: isDark ? 1 : isVertical ? 0.35 : 0.25,
        mixBlendMode: isDark ? 'normal' : 'multiply',
      }}
    />
  );

  if (variant === 'vertical') {
    return (
      <div className={`${containerBase} flex flex-col ${compact ? 'p-6 sm:p-7 gap-4' : 'p-8 sm:p-10 gap-6'} h-auto`} style={containerStyle}>
        {getBgOverlay(true)}

        {/* Title */}
        <h3 className={`relative z-10 ${compact ? 'text-[20px] sm:text-2xl' : 'text-[20px] sm:text-2xl'} font-semibold leading-snug text-(--text-main)`}>
          {title}
        </h3>

        {/* Description */}
        <p className='relative z-10 text-sm sm:text-base leading-relaxed flex-1' style={{ color: isDark ? '#E4E4E7' : '#52525b' }}>
          {description}
        </p>

        {/* Full-width button */}
        <motion.button
          whileHover={{ opacity: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className={`relative z-10 w-full py-4 rounded-[10px] text-sm font-medium transition-colors border text-(--text-main) hover:bg-(--bg-hover) ${isDark ? 'bg-(--bg-main) border-[#262626]' : 'bg-gray-100 border-gray-200'}`}
        >
          {buttonLabel}
        </motion.button>
      </div>
    );
  }

  // horizontal (default)
  return (
    <FadeInSection direction="up" className={`${containerBase} h-full flex flex-col gap-4 px-8 sm:px-10 py-8`} style={containerStyle}>
      {getBgOverlay(false)}

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