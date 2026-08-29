import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  logoSrc?: string;
  /**
   * Opt-in entrance animation for the splash/route-transition overlays.
   * "full": animated icon + glow + letter-by-letter text (initial load).
   * "quick": animated icon only, no glow or text (route changes).
   * Omitted: static icon + text, as used everywhere else.
   */
  animated?: 'full' | 'quick';
}

const BRAND_NAME = 'Estatein';

export const Logo: React.FC<LogoProps> = ({
  onClick,
  className = '',
  logoSrc = '/assets/logo_icon.png',
  animated,
}) => {
  const icon =
    animated === 'full' ? (
      <span className="relative inline-flex items-center justify-center shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full blur-lg bg-primary animate-logo-glow"
        />
        <img
          src={logoSrc}
          alt="Estatein Logo"
          className="w-9 h-9 object-contain animate-logo-icon-in"
        />
      </span>
    ) : animated === 'quick' ? (
      <img
        src={logoSrc}
        alt="Estatein Logo"
        className="w-9 h-9 object-contain animate-logo-icon-in-quick"
      />
    ) : (
      <img
        src={logoSrc}
        alt="Estatein Logo"
        className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
      />
    );

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      {icon}

      {animated === 'full' ? (
        <span className="font-semibold text-lg md:text-xl inline-flex">
          {BRAND_NAME.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-letter-in"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      ) : animated === 'quick' ? null : (
        <span className="font-semibold text-lg md:text-xl">{BRAND_NAME}</span>
      )}
    </motion.div>
  );
};
