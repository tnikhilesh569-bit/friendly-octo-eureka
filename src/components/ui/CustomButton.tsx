import React, { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variantStyle = variant === 'primary' 
    ? "neumorphic-button text-[#4A3B32] hover:opacity-90"
    : "bg-[#FDF8F5] text-[#4A3B32] neumorphic-card hover:bg-[#F7F0EC]";

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
