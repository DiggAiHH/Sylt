'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  logo: React.ReactNode;
  items: NavItem[];
  className?: string;
  transparent?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Accessible Navigation Component
 * 
 * Features for elderly users:
 * - Large touch targets (48px minimum)
 * - Clear focus indicators
 * - High contrast text
 * - Keyboard navigation support
 * - Screen reader friendly with ARIA labels
 * - Reduced motion support
 */
export function Navigation({
  logo,
  items,
  className,
  transparent = true,
  ctaLabel = 'Buchen',
  ctaHref = '/booking',
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Close mobile menu on escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Trap focus within mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinkStyles = cn(
    // Base styles - larger text for readability
    'font-body text-lg tracking-wide',
    // Padding for larger touch target (48px minimum height)
    'py-3 px-4 -mx-4',
    // Focus visible ring
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:rounded-lg',
    // Transition
    reducedMotion ? '' : 'transition-colors duration-200'
  );

  return (
    <>
      <motion.header
        initial={reducedMotion ? {} : { y: -100 }}
        animate={{ y: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          reducedMotion ? '' : 'transition-all duration-300',
          transparent && !isScrolled
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-luxury shadow-sm',
          className
        )}
        role="banner"
      >
        <nav 
          id="main-nav"
          className="max-w-container-xl mx-auto px-6 md:px-8 lg:px-12"
          aria-label="Hauptnavigation"
        >
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link 
              href="/" 
              className={cn(
                'flex-shrink-0',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:rounded-lg',
                transparent && !isScrolled
                  ? 'focus-visible:ring-white'
                  : 'focus-visible:ring-nordsee-400'
              )}
              aria-label="Zur Startseite"
            >
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2" role="navigation">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    navLinkStyles,
                    transparent && !isScrolled
                      ? 'text-white hover:text-sand-200 focus-visible:ring-white'
                      : 'text-reetdach-700 hover:text-nordsee-600 focus-visible:ring-nordsee-400'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button - Large and prominent */}
            <div className="hidden lg:block">
              <Link
                href={ctaHref}
                className={cn(
                  // Base styles
                  'inline-flex items-center justify-center',
                  // Large touch target
                  'min-h-[48px] px-8 py-3',
                  // Typography
                  'font-body text-lg font-medium tracking-wide',
                  // Focus visible
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
                  // Rounded corners
                  'rounded-lg',
                  // Transition
                  reducedMotion ? '' : 'transition-all duration-200',
                  // Color variants
                  transparent && !isScrolled
                    ? 'bg-white/15 backdrop-blur text-white border-2 border-white/40 hover:bg-white/25 focus-visible:ring-white'
                    : 'bg-nordsee-600 text-white hover:bg-nordsee-700 focus-visible:ring-nordsee-400'
                )}
              >
                {ctaLabel}
              </Link>
            </div>

            {/* Mobile Menu Button - Large touch target */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden',
                // Large touch target (48x48px)
                'w-12 h-12 -mr-2',
                'flex flex-col items-center justify-center gap-1.5',
                // Focus visible
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 rounded-lg',
                transparent && !isScrolled
                  ? 'text-white focus-visible:ring-white'
                  : 'text-reetdach-700 focus-visible:ring-nordsee-400'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              <motion.span
                animate={reducedMotion ? {} : { rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                className="w-6 h-0.5 bg-current"
                aria-hidden="true"
              />
              <motion.span
                animate={reducedMotion ? {} : { opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-current"
                aria-hidden="true"
              />
              <motion.span
                animate={reducedMotion ? {} : { rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                className="w-6 h-0.5 bg-current"
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full screen with large touch targets */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
            className="fixed inset-x-0 top-20 bottom-0 z-40 lg:hidden bg-white overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <nav className="px-6 py-8" aria-label="Mobile Navigation">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        // Large touch target
                        'block min-h-[56px] py-4 px-4 -mx-4',
                        // Typography - extra large for mobile
                        'font-body text-xl text-reetdach-700',
                        // Hover and focus states
                        'hover:bg-sand-50 hover:text-nordsee-600',
                        'focus:outline-none focus-visible:ring-4 focus-visible:ring-nordsee-400 focus-visible:ring-inset',
                        // Border for visual separation
                        'border-b border-sand-200',
                        // Transition
                        reducedMotion ? '' : 'transition-colors duration-200'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button in mobile menu */}
              <Link
                href={ctaHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block w-full text-center mt-8',
                  'min-h-[56px] py-4',
                  'bg-nordsee-600 text-white',
                  'font-body text-xl font-medium tracking-wide',
                  'rounded-lg',
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-nordsee-400 focus-visible:ring-offset-2',
                  'hover:bg-nordsee-700',
                  reducedMotion ? '' : 'transition-colors duration-200'
                )}
              >
                {ctaLabel}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
