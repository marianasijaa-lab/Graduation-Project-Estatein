import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  logoSrc?: string;
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  className = '',
  logoSrc = '/assets/logo_icon.png',
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      <img
        src={logoSrc}
        alt="Estatein Logo"
        className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span className="font-semibold text-lg md:text-xl ">
        Estatein
      </span>
    </motion.div>
  );
};