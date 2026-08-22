import React from 'react';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  logoSrc?: string; 
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  className = '',
  logoSrc = '/public/assets/logo_icon.png', 
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
    
      <img
        src={logoSrc}
        alt="Estatein Logo"
        className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
      />
     
      <span className="font-semibold tracking-tight text-white text-xl font-['Urbanist',sans-serif]">
        Estatein
      </span>
    </div>
  );
};