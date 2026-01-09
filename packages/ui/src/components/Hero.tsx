'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroVideoProps {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function HeroVideo({
  src,
  poster,
  title,
  subtitle,
  overlayOpacity = 0.4,
  className = '',
  children,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  return (
    <section className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Poster fallback (Next.js Optimized) */}
        {poster && (
          <Image
            src={poster}
            alt={title || 'Video background'}
            fill
            priority
            className={`object-cover -z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
            sizes="100vw"
          />
        )}
        
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-wide"
          >
            {title}
          </motion.h1>
        )}
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-lg md:text-xl text-white/90 max-w-2xl mb-8"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function HeroImage({
  src,
  alt,
  title,
  subtitle,
  overlayOpacity = 0.4,
  className = '',
  children,
}: HeroImageProps) {
  return (
    <section className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Image Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full relative"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-wide"
          >
            {title}
          </motion.h1>
        )}
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-lg md:text-xl text-white/90 max-w-2xl mb-8"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children}
      </div>
    </section>
  );
}
