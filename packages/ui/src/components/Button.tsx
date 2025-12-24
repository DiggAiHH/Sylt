'use client';

import React, { useEffect, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

type MotionButtonProps = HTMLMotionProps<'button'>;

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
  /** Optional icon to display before text */
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

/**
 * Accessible Button Component
 * 
 * Features for elderly users:
 * - Large touch targets (minimum 44x44px, recommended 48px)
 * - High contrast colors meeting WCAG AA standards
 * - Clear focus indicators for keyboard navigation
 * - Reduced motion support
 * - Larger text sizes
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  isLoading,
  disabled,
  icon,
  onClick,
  type = 'button',
  style,
}: ButtonProps) {
  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const baseStyles = cn(
    // Flexbox layout
    'inline-flex items-center justify-center gap-2',
    // Typography - larger for readability
    'font-body font-medium tracking-wide',
    // Transitions (respect reduced motion)
    reducedMotion ? '' : 'transition-all duration-200',
    // Focus ring - thick and visible for keyboard users
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
    // Disabled states
    'disabled:opacity-60 disabled:cursor-not-allowed',
    // Rounded corners for friendly appearance
    'rounded-lg'
  );

  // Variants with improved contrast ratios
  const variants = {
    primary: cn(
      'bg-nordsee-600 text-white',
      'hover:bg-nordsee-700',
      'focus-visible:ring-nordsee-400',
      'active:bg-nordsee-800'
    ),
    secondary: cn(
      'bg-sand-400 text-charcoal',
      'hover:bg-sand-500',
      'focus-visible:ring-sand-500',
      'active:bg-sand-600'
    ),
    outline: cn(
      'border-2 border-nordsee-600 text-nordsee-700 bg-transparent',
      'hover:bg-nordsee-50 hover:border-nordsee-700',
      'focus-visible:ring-nordsee-400',
      'active:bg-nordsee-100'
    ),
    ghost: cn(
      'text-reetdach-700 bg-transparent',
      'hover:bg-sand-100',
      'focus-visible:ring-sand-400',
      'active:bg-sand-200'
    ),
  };

  // Sizes with minimum 44px touch targets for accessibility
  const sizes = {
    sm: 'min-h-[44px] px-4 py-2 text-base',      // 44px minimum height
    md: 'min-h-[48px] px-6 py-3 text-lg',        // 48px comfortable
    lg: 'min-h-[52px] px-8 py-4 text-lg',        // 52px large
    xl: 'min-h-[56px] px-10 py-5 text-xl',       // 56px extra large for elderly
  };

  // Loading spinner with better visibility
  const LoadingSpinner = () => (
    <svg
      className={cn(
        'animate-spin',
        size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const motionProps: MotionButtonProps = reducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      };

  return (
    <motion.button
      {...motionProps}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      style={style}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          <span className="sr-only">Wird geladen...</span>
        </>
      ) : icon ? (
        <span aria-hidden="true">{icon}</span>
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
}
