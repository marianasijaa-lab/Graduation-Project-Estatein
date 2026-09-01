import React from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../../common/FadeInSection';

interface InfoBoxProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  /**
   * horizontal → title + description on the left, button on the far right (wide banner style)
   * vertical   → title on top, description in middle, full-width button at the bottom (card style)
   */
  variant?: 'horizontal' | 'vertical';
  
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  description,
  buttonLabel = 'Learn More',
  onButtonClick,
  variant = 'horizontal',
}) => {

  const containerBase = 'relative overflow-hidden rounded-2xl border transition-colors bg-(--secondary) border-[#262626] text-white' ;

  // Shared abstract background overlay
  const bgOverlay = (
    <div
      className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none"
      style={{ backgroundImage: `url(/assets/Abstract3.png)` }}
    />
  );

  if (variant === 'vertical') {
    return (
      <div className={`${containerBase} flex flex-col p-8 sm:p-10 gap-6 h-auto`}>
        {bgOverlay}

        {/* Title */}
        <h3 className="relative z-10 text-xl sm:text-2xl font-semibold leading-snug text-(--text-main)">
          {title}
        </h3>

        {/* Description */}
        <p
          className='relative z-10 text-sm sm:text-base leading-relaxed flex-1 text-gray-400'
        >
          {description}
        </p>

        {/* Full-width button with animations */}
        <motion.button
          whileHover={{ opacity: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className='relative z-10 w-full py-4 rounded-xl text-sm font-medium transition-colors bg-(--bg-main) border border-bg-gray-1 text-(--text-main) hover:bg-(--bg-hover)'
        >
          {buttonLabel}
        </motion.button>
      </div>
    );
  }

  // horizontal (default)
  return (
    <FadeInSection direction="up" className={`${containerBase} flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-10 py-8`}>
      {bgOverlay}

      {/* Text block */}
      <div className="relative z-10 flex flex-col gap-3 max-w-2xl text-(--text-main)">
        <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-(--text-main)">{title}</h3>
        <p
          className='text-sm sm:text-base leading-relaxed text-gray-400'
        >
          {description}
        </p>
      </div>

      {/* Button with animations */}
      <div className="relative z-10 shrink-0 w-full sm:w-auto flex justify-center sm:justify-end">
        <motion.button
          whileHover={{ opacity: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onButtonClick}
          className='px-6 py-3 rounded-xl text-sm font-medium transition-colors border bg-(--bg-main) border-border-gray-1 text-(--text-main) hover:bg-(--bg-hover)'
        >
          {buttonLabel}
        </motion.button>
      </div>
    </FadeInSection>
  );
};