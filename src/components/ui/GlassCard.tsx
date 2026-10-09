import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  inset = false,
}) => {
  const cardStyle = inset ? 'neumorphic-card-inset' : 'neumorphic-card';
  
  return (
    <div className={`p-6 transition-all duration-300 ${cardStyle} ${className}`}>
      {children}
    </div>
  );
};
