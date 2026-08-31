import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export const Button = ({
  text,
  variant,
  onClick,
  icon,
  iconPosition,
  fullWidth,
  disabled,
  type,
  className = '',
}: ButtonProps) => {
  const variantStyles =
    variant === 'primary'
      ? ' bg-primary text-white hover:opacity-90'
      : 'text-white hover:opacity-90';

  const variantInlineStyle =
    variant === 'secondary'
      ? { backgroundColor: '#1A1A1A', border: '1px solid #262626' }
      : { backgroundColor: '#703bf7' };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={variantInlineStyle}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 rounded-[8px] font-medium whitespace-nowrap transition-all ${variantStyles} ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || ' md:px-[18px] md:py-[12px]  md:text-[16px] max-sm:text-[14px]'} max-sm:h-[40px] `}
    >
      {icon && iconPosition === 'left' && <img src={icon} alt="" />}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <img src={icon} alt="" />}
    </motion.button>
  );
};