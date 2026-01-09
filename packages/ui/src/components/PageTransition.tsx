'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // easeOutQuint
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Overlay-based page transition for more dramatic effect
export function PageTransitionOverlay({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Wipe overlay */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${pathname}`}
          className="fixed inset-0 z-[9998] bg-sand-100 pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ 
            scaleY: [0, 1, 1, 0],
            transition: {
              duration: 0.8,
              times: [0, 0.4, 0.6, 1],
              ease: [0.22, 1, 0.36, 1],
            }
          }}
          style={{ transformOrigin: 'bottom' }}
        />
      </AnimatePresence>
    </>
  );
}

// Slide transition variant
export function SlidePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
