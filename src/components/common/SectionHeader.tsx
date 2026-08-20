import React from 'react';
import { StarCluster } from './StarCluster';

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 ${className}`}>
      {/* الجانب الأيسر: النجوم + العنوان h2 + الوصف p */}
      <div className="space-y-2.5 max-w-4xl">
        <StarCluster />
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Urbanist',sans-serif]">
          {title}
        </h2>
        
        <p className="text-sm sm:text-base text-[#999999] leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

     
      {actionLabel && (
        <div className="shrink-0 self-start lg:self-end">
          <button
            onClick={onAction}
            className="px-5 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#262626] hover:border-[#703BF7]/50 text-white text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};