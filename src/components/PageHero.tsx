import React from 'react';
import { useTheme } from '../Context/ThemeContext'; 

interface PageHeroProps {
  title: string;
  description: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className={`w-full pt-12 md:pt-20 pb-8 md:pb-12 px-4 sm:px-8 md:px-10 transition-colors duration-300 ${
        isDark ? 'bg-bg-dark-1 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <h1
          className={`font-['Urbanist'] text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight tracking-normal transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className={`mt-3 font-['Urbanist'] text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-6xl transition-colors ${
            isDark ? 'text-gray' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;