'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Button } from './Button';

interface BookingWidgetProps {
  propertyId: string;
  className?: string;
  variant?: 'inline' | 'floating' | 'sidebar';
  minPrice?: number;
  onSearch?: (data: BookingSearchData) => void;
}

export interface BookingSearchData {
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyId: string;
}

/**
 * Accessible Booking Widget Component
 * 
 * Features for elderly users:
 * - Large form fields with 48px+ height
 * - Clear labels with high contrast
 * - Large touch targets
 * - Screen reader announcements
 * - Reduced motion support
 */
export function BookingWidget({
  propertyId,
  className,
  variant = 'inline',
  minPrice,
  onSearch,
}: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleSearch = () => {
    if (onSearch && checkIn && checkOut) {
      onSearch({
        checkIn,
        checkOut,
        guests,
        propertyId,
      });
    }
  };

  // Enhanced input styles for elderly users
  const inputClasses = cn(
    // Base size - large and comfortable
    'w-full min-h-[52px] px-5 py-4',
    // Border with better contrast
    'border-2 border-reetdach-300 rounded-lg',
    // Typography - larger text
    'font-body text-lg text-charcoal',
    // Focus states with thick ring
    'focus:border-nordsee-600 focus:ring-4 focus:ring-nordsee-200 focus:outline-none',
    // Transition
    reducedMotion ? '' : 'transition-all duration-200'
  );

  // Label styles
  const labelClasses = 'block font-body text-base font-medium text-reetdach-700 mb-3';

  const variantStyles = {
    inline: 'bg-white p-8 rounded-xl shadow-card',
    floating: 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-luxury p-6 rounded-2xl shadow-luxury z-40',
    sidebar: 'bg-sand-50 p-8 rounded-xl border-2 border-sand-200',
  };

  if (variant === 'floating') {
    return (
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(variantStyles[variant], className)}
        role="search"
        aria-label="Buchungssuche"
      >
        <div className="flex flex-wrap items-end gap-4">
          {/* Check-in Date */}
          <div className="flex-1 min-w-[160px]">
            <label htmlFor="floating-checkin" className="block font-body text-sm font-medium text-reetdach-600 mb-2">
              Anreise
            </label>
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-reetdach-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                id="floating-checkin"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={cn(
                  'min-h-[48px] w-full pl-12 pr-4 py-3',
                  'bg-sand-50 border-2 border-sand-200 rounded-lg',
                  'font-body text-base',
                  'focus:border-nordsee-600 focus:ring-4 focus:ring-nordsee-200 focus:outline-none'
                )}
                aria-label="Anreisedatum auswählen"
              />
            </div>
          </div>

          <span className="text-reetdach-400 text-2xl pb-3" aria-hidden="true">→</span>

          {/* Check-out Date */}
          <div className="flex-1 min-w-[160px]">
            <label htmlFor="floating-checkout" className="block font-body text-sm font-medium text-reetdach-600 mb-2">
              Abreise
            </label>
            <input
              type="date"
              id="floating-checkout"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={cn(
                'min-h-[48px] w-full px-4 py-3',
                'bg-sand-50 border-2 border-sand-200 rounded-lg',
                'font-body text-base',
                'focus:border-nordsee-600 focus:ring-4 focus:ring-nordsee-200 focus:outline-none'
              )}
              aria-label="Abreisedatum auswählen"
            />
          </div>

          <Button onClick={handleSearch} size="lg" className="rounded-lg">
            Verfügbarkeit prüfen
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div 
      className={cn(variantStyles[variant], className)}
      role="search"
      aria-label="Buchungsformular"
    >
      {minPrice && (
        <div className="mb-6 pb-6 border-b-2 border-sand-200">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl text-charcoal">ab €{minPrice}</span>
            <span className="text-lg text-reetdach-500">/ Nacht</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor={`checkin-${propertyId}`} className={labelClasses}>
              Anreise
            </label>
            <input
              type="date"
              id={`checkin-${propertyId}`}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={inputClasses}
              aria-label="Anreisedatum auswählen"
            />
          </div>
          <div>
            <label htmlFor={`checkout-${propertyId}`} className={labelClasses}>
              Abreise
            </label>
            <input
              type="date"
              id={`checkout-${propertyId}`}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={inputClasses}
              aria-label="Abreisedatum auswählen"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`guests-${propertyId}`} className={labelClasses}>
            Gäste
          </label>
          <select
            id={`guests-${propertyId}`}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={inputClasses}
            aria-label="Anzahl der Gäste auswählen"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Gast' : 'Gäste'}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleSearch} className="w-full" size="lg">
          Verfügbarkeit prüfen
        </Button>

        <p className="text-center text-base text-reetdach-600 font-body leading-relaxed">
          Kostenlose Stornierung bis 48 Stunden vor Anreise
        </p>
      </div>
    </div>
  );
}
