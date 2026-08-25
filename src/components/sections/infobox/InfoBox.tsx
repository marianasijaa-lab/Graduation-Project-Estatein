import React from 'react';
import { useTheme } from '../../../Context/ThemeContext';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerBase = `relative overflow-hidden rounded-2xl border transition-colors ${
    isDark ? 'bg-[#141414] border-[#262626] text-white' : 'bg-white border-gray-200 text-gray-900'
  }`;

  // Shared abstract background overlay
  const bgOverlay = (
    <div
      className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20 pointer-events-none"
      style={{ backgroundImage: `url(/assets/Abstract3.png)` }}
    />
  );

  if (variant === 'vertical') {
    return (
      <div className={`${containerBase} flex flex-col p-8 sm:p-10 gap-6 h-full`}>
        {bgOverlay}

        {/* Title */}
        <h3 className="relative z-10 text-xl sm:text-2xl font-semibold leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p
          className={`relative z-10 text-sm sm:text-base leading-relaxed flex-1 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {description}
        </p>

        {/* Full-width button */}
        <button
          onClick={onButtonClick}
          className={`relative z-10 w-full py-4 rounded-xl text-sm font-medium transition-colors ${
            isDark
              ? 'bg-bg-dark-1 border border-bg-gray-1 text-white hover:bg-[#222]'
              : 'bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className={`${containerBase} flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-10 py-8`}>
      {bgOverlay}

      {/* Text block */}
      <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
        <h3 className="text-xl sm:text-2xl font-semibold leading-snug">{title}</h3>
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Button */}
      <div className="relative z-10 shrink-0 w-full sm:w-auto flex justify-center sm:justify-end">
        <button
          onClick={onButtonClick}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors border ${
            isDark
              ? 'bg-bg-dark-1 border-border-gray-1 text-white hover:bg-[#222]'
              : 'bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};
