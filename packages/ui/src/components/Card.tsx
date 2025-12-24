'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  variant = 'default',
  hover = true,
  onClick,
}: CardProps) {
  const variants = {
    default: 'bg-white border border-sand-200',
    elevated: 'bg-white shadow-luxury',
    glass: 'bg-white/80 backdrop-blur-luxury border border-white/20',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={cn(
        'rounded-lg overflow-hidden',
        variants[variant],
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
