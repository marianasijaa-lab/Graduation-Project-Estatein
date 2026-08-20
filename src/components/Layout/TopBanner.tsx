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
    <aside className="relative w-full bg-[#1A1A1A] border-b border-[#262626] text-white py-3 px-4 sm:px-6 overflow-hidden select-none z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center gap-2 text-xs sm:text-sm text-[#999999]">
          <Sparkles className="w-4 h-4 text-[#F5C344] fill-[#F5C344]/30" />
          <span className="font-normal text-white/90">
            {message}
          </span>
          <button
            onClick={onActionClick}
            className="font-medium text-white hover:text-[#A37FFB] underline underline-offset-4 cursor-pointer transition-colors ml-1"
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