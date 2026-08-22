
interface ButtonProps 
{
  text: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  icon?: string ;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}



export const Button = (
  {
  text,
  variant,
  onClick,
  icon,
  iconPosition,
  fullWidth ,
  disabled ,
  type ,
}: ButtonProps) => {

     const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-white hover:opacity-90'
      : 'bg-transparent border border-bg-gray-1 text-white hover:bg-white/5';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
             className={`inline-flex items-center justify-center gap-2 max-2xl:px-[20px]
                max-2xl:py-[14px] 2xl:px-[24px] 2xl:py-[18px] 2xl:rounded-[10px] max-2xl:rounded-[8px] font-medium 2xl:text-[18px] max-2xl:text-sm whitespace-nowrap transition-all ${variantStyles} ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
         >
      {icon && iconPosition === 'left' && <img src={icon} alt="" />}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <img src={icon} alt="" />}
    </button>
  );
};
