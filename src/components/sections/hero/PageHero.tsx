import { motion } from 'framer-motion';
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`w-full pt-8 md:pt-10 lg:pt-12 pb-6 md:pb-7 lg:pb-8 transition-colors duration-300 bg-(--bg-main) text-(--text-main) ${className}`}
      style={isDark ? { background: 'linear-gradient(95.93deg, #262626 -26.82%, rgba(38, 38, 38, 0) 40.46%)' } : undefined}
    >
      <div className="site-container relative z-10">
        {/* Title */}
        <h1
          className={`font-['Urbanist'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-normal transition-colors text-(--text-main)`}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className={`mt-3 font-['Urbanist'] text-sm sm:text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-6xl transition-colors text-gray`}
        >
          {description}
        </p>
      </div>
    </motion.section>
  );
};

export default PageHero;