import React from 'react';

export const StarCluster: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center text-primary gap-1.5 mb-2.5 ${className}`} aria-hidden="true">
      {/* النجمة الكبيرة الأولى */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      {/* النجمة المتوسطة الثانية */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 opacity-70">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      {/* النجمة الصغيرة الثالثة */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 opacity-40">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  );
};