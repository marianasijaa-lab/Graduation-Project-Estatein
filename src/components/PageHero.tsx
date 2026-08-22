import React from 'react';

interface PageHeroProps {
  title: string;
  description: string;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description, className = '' }) => {
  return (
    <section
      className="w-full border-b border-bg-gray-1"
      style={{
        background: 'linear-gradient(95.93deg, #262626 -26.82%, rgba(38, 38, 38, 0) 40.46%)',
      }}
    >
      <div className={`w-full max-w-[1590px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 sm:pt-20 sm:pb-14 ${className}`}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <p className="text-sm sm:text-base font-normal text-gray  max-w-[1100px] leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
