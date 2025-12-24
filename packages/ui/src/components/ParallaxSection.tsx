'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../utils/cn';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function ParallaxSection({
  children,
  backgroundImage,
  backgroundColor,
  speed = 0.5,
  className,
  overlay = false,
  overlayOpacity = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `-${speed * 100}px`]);

  return (
    <section
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor }}
    >
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-20 -bottom-20"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </motion.div>
      )}

      {overlay && (
        <div
          className="absolute inset-0 bg-charcoal"
          style={{ opacity: overlayOpacity }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
