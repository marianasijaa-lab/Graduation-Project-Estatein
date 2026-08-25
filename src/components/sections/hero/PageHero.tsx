import React from 'react';
import { useTheme } from '../../../Context/ThemeContext'; 

interface PageHeroProps {
  title: string;
  description: string;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className={`w-full pt-8 md:pt-12 pb-6 md:pb-8 transition-colors duration-300 ${
        isDark ? 'text-white' : 'bg-white text-gray-900'
      } ${className}`}
      style={isDark ? { background: 'linear-gradient(95.93deg, #262626 -26.82%, rgba(38, 38, 38, 0) 40.46%)' } : undefined}
    >
      <div className="site-container relative z-10">
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
