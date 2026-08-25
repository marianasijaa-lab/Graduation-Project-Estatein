import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface TopBannerProps {
  onActionClick?: () => void;
  message?: string;
  actionText?: string;
}

export const TopBanner: React.FC<TopBannerProps> = ({
  onActionClick,
  message = 'Discover Your Dream Property with Estatein',
  actionText = 'Learn More',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className="relative w-full border-b border-(--color-border) text-(--text-main) py-3 px-4 sm:px-6 overflow-hidden select-none z-50 bg-(--bg-main) transition-colors duration-300"
    >
      {/* Background with opacity only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/background_1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity:'var(--decor-opacity)',
        }}
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 relative z-10">
        <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#F5C344] fill-[#F5C344]/30 shrink-0" />
          <span className="font-normal text-(--text-main) text-[8.5px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap shrink min-w-0 overflow-hidden text-ellipsis">
            {message}
          </span>
          <button
            onClick={onActionClick}
            className="font-medium text-(--text-main) hover:text-[#A37FFB] underline decoration-(--text-main) decoration-1 underline-offset-2 sm:underline-offset-4 cursor-pointer transition-colors text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap shrink-0"
          >
            {actionText}
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-(--text-main) hover:bg-(--text-main)/10 text-(--text-main)/60 hover:text-(--text-main) transition-colors cursor-pointer shrink-0"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};