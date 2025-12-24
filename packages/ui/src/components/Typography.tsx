import React from 'react';
import { cn } from '../utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends TypographyProps {
  as?: HeadingLevel;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const headingSizes = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-5xl',
  '2xl': 'text-5xl md:text-6xl lg:text-7xl',
  '3xl': 'text-6xl md:text-7xl lg:text-8xl',
};

export function Heading({
  children,
  as: Component = 'h2',
  size = 'lg',
  className,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-heading tracking-luxury text-charcoal',
        headingSizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps extends TypographyProps {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'body' | 'accent' | 'lead';
}

const textSizes = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const textVariants = {
  body: 'font-body',
  accent: 'font-accent italic',
  lead: 'font-body text-lg md:text-xl leading-relaxed',
};

export function Text({
  children,
  size = 'base',
  variant = 'body',
  className,
}: TextProps) {
  return (
    <p
      className={cn(
        'text-reetdach-600',
        textSizes[size],
        textVariants[variant],
        className
      )}
    >
      {children}
    </p>
  );
}

// Legacy Typography component for backwards compatibility
export function Typography({
  children,
  className,
}: TypographyProps) {
  return (
    <div className={cn('font-body text-reetdach-600', className)}>
      {children}
    </div>
  );
}
