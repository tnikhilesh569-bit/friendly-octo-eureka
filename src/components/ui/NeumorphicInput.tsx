import React, { InputHTMLAttributes } from 'react';

interface NeumorphicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const NeumorphicInput: React.FC<NeumorphicInputProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-[#4A3B32]">{label}</label>}
      <input
        className={`w-full px-4 py-3 bg-[#FDF8F5] text-[#4A3B32] placeholder-[#8C7A70] rounded-xl outline-none transition-all duration-200 neumorphic-card-inset focus:ring-2 focus:ring-[#E2B8A8] ${className}`}
        {...props}
      />
    </div>
  );
};
