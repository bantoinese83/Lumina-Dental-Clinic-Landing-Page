import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glow' | 'link' | 'icon';
  children: React.ReactNode;
  icon?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  href,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center transition-all duration-300 font-sans uppercase tracking-widest text-xs font-bold';

  const variants = {
    primary:
      'bg-gradient-to-br from-teal-600 to-blue-500 text-white px-6 py-2 rounded-full hover:opacity-90 hover:scale-105 hover:shadow-[0_4px_20px_rgba(14,165,233,0.3)]',
    glow: 'bg-gradient-to-br from-teal-500 to-blue-600 text-white px-10 py-4 hover:scale-105 hover:shadow-[0_4px_30px_rgba(13,148,136,0.3)] rounded-full',
    link: 'text-slate-600 hover:text-teal-600 pt-4 gap-4 group',
    icon: 'p-2 text-slate-400 hover:text-teal-600',
  };

  const content = (
    <>
      <span className={variant !== 'icon' ? 'relative z-10' : ''}>{children}</span>
      {icon && (
        <ArrowRight className='ml-2 w-4 h-4 text-teal-500 transform group-hover:translate-x-1 transition-transform' />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};

export default Button;
