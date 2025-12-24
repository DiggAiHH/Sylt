'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  style,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-nordsee-600 text-white hover:bg-nordsee-700 focus:ring-nordsee-500',
    secondary: 'bg-sand-200 text-reetdach-800 hover:bg-sand-300 focus:ring-sand-400',
    outline: 'border-2 border-current text-nordsee-600 hover:bg-nordsee-50 focus:ring-nordsee-500',
    ghost: 'text-reetdach-700 hover:bg-reetdach-100 focus:ring-reetdach-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={style}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
        hover ? 'cursor-pointer' : ''
      } ${className}`}
      whileHover={hover ? { y: -4, shadow: 'lg' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function CardImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// Section Component for consistent spacing
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'sand' | 'dark';
}

export function Section({ children, className = '', id, background = 'white' }: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    sand: 'bg-sand-50',
    dark: 'bg-reetdach-900 text-white',
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${backgrounds[background]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// Container with max-width
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl ${className}`}>
      {children}
    </div>
  );
}

// Typography Components
interface HeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export function Heading({ children, as: Component = 'h2', className = '' }: HeadingProps) {
  const sizes = {
    h1: 'text-5xl md:text-6xl lg:text-7xl',
    h2: 'text-4xl md:text-5xl',
    h3: 'text-3xl md:text-4xl',
    h4: 'text-2xl md:text-3xl',
    h5: 'text-xl md:text-2xl',
    h6: 'text-lg md:text-xl',
  };

  return (
    <Component className={`font-serif tracking-wide ${sizes[Component]} ${className}`}>
      {children}
    </Component>
  );
}

export function Text({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-reetdach-600 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

// Grid Component
interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Grid({ children, cols = 3, gap = 'md', className = '' }: GridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  };

  return (
    <div className={`grid ${colsMap[cols]} ${gapMap[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Divider
export function Divider({ className = '' }: { className?: string }) {
  return <hr className={`border-sand-200 my-8 ${className}`} />;
}

// Loading Spinner
export function Spinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <svg
      className={`animate-spin text-nordsee-600 ${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
