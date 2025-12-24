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

/**
 * Heading sizes optimized for elderly users
 * - Larger base sizes
 * - Better contrast (charcoal text)
 * - Relaxed line heights for readability
 * - Responsive scaling uses calc() with --a11y-font-scale CSS variable
 */
const headingSizes = {
  sm: 'text-xl md:text-2xl leading-snug',
  md: 'text-2xl md:text-3xl leading-snug',
  lg: 'text-3xl md:text-4xl leading-snug',
  xl: 'text-4xl md:text-5xl leading-tight',
  '2xl': 'text-5xl md:text-6xl lg:text-7xl leading-tight',
  '3xl': 'text-6xl md:text-7xl lg:text-8xl leading-none',
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
        // Font family and tracking
        'font-heading tracking-luxury',
        // High contrast text color
        'text-charcoal',
        // Size variant
        headingSizes[size],
        // Support for font scaling
        'a11y-scalable',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps extends TypographyProps {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'body' | 'accent' | 'lead' | 'caption';
}

/**
 * Text sizes optimized for elderly users
 * - Minimum 16px for body text (WCAG recommendation)
 * - 1.6 line height for comfortable reading
 * - Improved contrast ratios
 */
const textSizes = {
  sm: 'text-base',        // 16px minimum for accessibility
  base: 'text-lg',        // 18px default
  lg: 'text-xl',          // 20px
  xl: 'text-2xl',         // 24px
};

const textVariants = {
  body: 'font-body text-reetdach-700 leading-relaxed',
  accent: 'font-accent italic text-reetdach-600 leading-relaxed',
  lead: 'font-body text-xl md:text-2xl text-reetdach-600 leading-relaxed',
  caption: 'font-body text-base text-reetdach-500 leading-normal',
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
        textSizes[size],
        textVariants[variant],
        'a11y-scalable',
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * Highlighted/Important Text
 * Uses stronger contrast and weight for emphasis
 */
interface HighlightedTextProps extends TypographyProps {
  color?: 'primary' | 'secondary' | 'accent';
}

export function HighlightedText({
  children,
  color = 'primary',
  className,
}: HighlightedTextProps) {
  const colors = {
    primary: 'text-nordsee-700 bg-nordsee-50',
    secondary: 'text-sand-800 bg-sand-100',
    accent: 'text-charcoal bg-cream',
  };

  return (
    <span
      className={cn(
        'font-body font-medium',
        'px-2 py-1 rounded',
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Error/Help Text for Forms
 * High contrast for visibility
 */
interface FormTextProps extends TypographyProps {
  variant?: 'error' | 'success' | 'help';
}

export function FormText({
  children,
  variant = 'help',
  className,
}: FormTextProps) {
  const variants = {
    error: 'text-red-700 bg-red-50 border-red-200',
    success: 'text-green-800 bg-green-50 border-green-200',
    help: 'text-reetdach-600',
  };

  if (variant === 'help') {
    return (
      <span
        className={cn(
          'font-body text-base leading-normal',
          variants[variant],
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={cn(
        'font-body text-base leading-normal',
        'px-4 py-3 rounded-lg border',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

// Legacy Typography component for backwards compatibility
export function Typography({
  children,
  className,
}: TypographyProps) {
  return (
    <div className={cn('font-body text-lg text-reetdach-700 leading-relaxed a11y-scalable', className)}>
      {children}
    </div>
  );
}
