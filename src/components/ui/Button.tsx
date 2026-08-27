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
      : undefined;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={variantInlineStyle}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 2xl:rounded-[10px] max-2xl:rounded-lg font-medium whitespace-nowrap transition-all ${variantStyles} ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || 'max-2xl:px-[20px] max-2xl:py-[14px] 2xl:px-[24px] 2xl:py-[18px] 2xl:text-[18px] max-2xl:text-sm'}`}
    >
      {icon && iconPosition === 'left' && <img src={icon} alt="" />}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <img src={icon} alt="" />}
    </motion.button>
  );
};