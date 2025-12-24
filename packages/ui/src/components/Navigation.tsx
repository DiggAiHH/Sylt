'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          transparent && !isScrolled
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-luxury shadow-sm',
          className
        )}
      >
        <nav className="max-w-container-xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-body text-lg tracking-wide transition-colors duration-300',
                    transparent && !isScrolled
                      ? 'text-white hover:text-sand-200'
                      : 'text-reetdach-600 hover:text-nordsee-500'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href={ctaHref}
                className={cn(
                  'inline-flex items-center px-6 py-3 font-body tracking-luxury transition-all duration-300',
                  transparent && !isScrolled
                    ? 'bg-white/10 backdrop-blur text-white border border-white/30 hover:bg-white/20'
                    : 'bg-nordsee-500 text-white hover:bg-nordsee-600'
                )}
              >
                {ctaLabel}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5',
                transparent && !isScrolled ? 'text-white' : 'text-reetdach-600'
              )}
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                className="w-6 h-0.5 bg-current"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden bg-white shadow-luxury"
          >
            <div className="px-6 py-8 space-y-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-body text-lg text-reetdach-600 hover:text-nordsee-500 py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={ctaHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-nordsee-500 text-white py-3 mt-4 font-body tracking-luxury"
              >
                {ctaLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
