'use client';

import React from 'react';
import Image from 'next/image';
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
      {/* Poster Image (Next.js Optimized) */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={title}
          fill
          priority
          className="absolute inset-0 object-cover -z-10"
          sizes="100vw"
        />
      )}

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
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

        {/* Scroll Indicator - Premium Line Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-3"
        >
          <span className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-sans">Entdecken</span>
          <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
