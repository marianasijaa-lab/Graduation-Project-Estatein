import { motion } from 'framer-motion';
import React from 'react';


interface PageHeroProps {
  title: string;
  description: string;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, description, className = '' }) => {

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`w-full pt-12 md:pt-20 pb-8 md:pb-12 px-4 sm:px-8 md:px-10 transition-colors duration-300 bg-(--bg-main) text-(--text-mian) ${className}`}
      style={{ backgroundImage: '(--hero-gradient)'}}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <h1
          className="font-['Urbanist'] text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight tracking-normal transition-color text-(--text-mian)"
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="mt-3 font-['Urbanist'] text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-6xl transition-colors text-gray"
        >
          {description}
        </p>
      </div>
    </motion.section>
  );
};

export default PageHero;
