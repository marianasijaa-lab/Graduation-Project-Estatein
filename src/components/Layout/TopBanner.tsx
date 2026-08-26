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
      className="relative w-full border-b border-bg-gray-1 text-white py-3 px-4 sm:px-6 overflow-hidden select-none z-50 opacity-50"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* Background with opacity only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/background_1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />
      <div className="site-container flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 min-w-0 overflow-hidden">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#F5C344] fill-[#F5C344]/30 shrink-0" />
          <span className="font-normal text-white/90 text-[8.5px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap shrink min-w-0 overflow-hidden text-ellipsis">
            {message}
          </span>
          <button
            onClick={onActionClick}
            className="font-medium text-white hover:text-[#A37FFB] underline decoration-white decoration-1 underline-offset-2 sm:underline-offset-4 cursor-pointer transition-colors text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap shrink-0"
          >
            {actionText}
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};