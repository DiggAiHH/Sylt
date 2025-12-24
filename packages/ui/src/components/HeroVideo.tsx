'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface HeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  title: string;
  subtitle?: string;
  overlayOpacity?: number;
  height?: 'full' | 'large' | 'medium';
  children?: React.ReactNode;
  className?: string;
}

export function HeroVideo({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  overlayOpacity = 0.3,
  height = 'full',
  children,
  className,
}: HeroVideoProps) {
  const heightClasses = {
    full: 'h-screen',
    large: 'h-[85vh]',
    medium: 'h-[70vh]',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        heightClasses[height],
        className
      )}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white tracking-luxury mb-6"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-body text-xl md:text-2xl text-white/90 tracking-wide max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
