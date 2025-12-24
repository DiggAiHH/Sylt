import React from 'react';
import { cn } from '../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Container({
  children,
  size = 'xl',
  className,
  as: Component = 'div',
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-container-sm',
    md: 'max-w-container-md',
    lg: 'max-w-container-lg',
    xl: 'max-w-container-xl',
    '2xl': 'max-w-container-2xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'mx-auto px-6 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
