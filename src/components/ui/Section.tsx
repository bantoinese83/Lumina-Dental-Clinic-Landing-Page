import React from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = '',
  fullWidth = false,
  noPadding = false,
}) => {
  return (
    <section id={id} className={`relative z-10 ${!noPadding ? 'py-24 md:py-32' : ''} ${className}`}>
      <div className={`container mx-auto px-4 ${!fullWidth ? 'max-w-7xl' : ''}`}>{children}</div>
    </section>
  );
};

export default Section;
