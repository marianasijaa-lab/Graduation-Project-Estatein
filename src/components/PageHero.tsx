import React from 'react';

interface PageHeroProps {
  title: string;
  description: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description }) => {
  return (
    <section className="w-full bg-[#141414] border-b border-[#262626]">
      <div className="w-full max-w-[1590px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 sm:pt-20 sm:pb-14">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base font-normal text-[#999999] max-w-4xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;