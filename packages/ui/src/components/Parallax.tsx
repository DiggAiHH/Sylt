'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: ['start end' | 'end start' | 'center center', 'start end' | 'end start' | 'center center'];
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  offset = ['start end', 'end start'],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ParallaxText({
  children,
  speed = 0.2,
  direction = 'up',
  className = '',
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const transformValue = `${speed * 100}%`;
  
  const transforms: Record<string, MotionValue<string>> = {
    up: useTransform(scrollYProgress, [0, 1], ['0%', `-${transformValue}`]),
    down: useTransform(scrollYProgress, [0, 1], ['0%', transformValue]),
    left: useTransform(scrollYProgress, [0, 1], ['0%', `-${transformValue}`]),
    right: useTransform(scrollYProgress, [0, 1], ['0%', transformValue]),
  };

  const isHorizontal = direction === 'left' || direction === 'right';
  const motionStyle = isHorizontal 
    ? { x: transforms[direction] } 
    : { y: transforms[direction] };

  return (
    <motion.div ref={ref} style={motionStyle} className={className}>
      {children}
    </motion.div>
  );
}
