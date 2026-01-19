import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'outline' | 'glow';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'outline', className = '' }) => {
  const baseStyles =
    'px-3 py-1 text-[10px] uppercase tracking-wider font-sans backdrop-blur-sm rounded-full font-semibold';

  const variants = {
    outline: 'text-slate-500 border border-slate-200 bg-white/50',
    glow: 'border border-teal-500/30 bg-teal-50 text-teal-700 shadow-sm',
  };

  return <div className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</div>;
};

export default Badge;
