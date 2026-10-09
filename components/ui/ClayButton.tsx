import React from 'react';
import { cn } from '@/lib/utils';

interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'warning' | 'glass';
}

export const ClayButton: React.FC<ClayButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}) => {
  const base = "px-4 py-2.5 rounded-2xl font-semibold text-xs transition-all clay-btn flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]",
    danger: "bg-rose-600 text-white shadow-[0_4px_12px_rgba(225,29,72,0.3)]",
    warning: "bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]",
    glass: "bg-white/80 text-indigo-600 border border-slate-200/80 shadow-sm hover:bg-white",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
