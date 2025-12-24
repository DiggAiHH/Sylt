'use client';

import React, { useState } from 'react';
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

  const variantStyles = {
    inline: 'bg-white p-6 rounded-lg shadow-card',
    floating: 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-luxury p-4 rounded-full shadow-luxury z-40',
    sidebar: 'bg-sand-50 p-6 rounded-lg border border-sand-200',
  };

  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(variantStyles[variant], className)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-sand-100 rounded-full">
            <svg className="w-5 h-5 text-reetdach-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent font-body text-sm border-none focus:outline-none w-32"
              placeholder="Anreise"
            />
          </div>
          <span className="text-reetdach-300">→</span>
          <div className="flex items-center gap-2 px-4 py-2 bg-sand-100 rounded-full">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent font-body text-sm border-none focus:outline-none w-32"
              placeholder="Abreise"
            />
          </div>
          <Button onClick={handleSearch} className="rounded-full">
            Verfügbarkeit prüfen
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn(variantStyles[variant], className)}>
      {minPrice && (
        <div className="mb-4 pb-4 border-b border-sand-200">
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-2xl text-charcoal">ab €{minPrice}</span>
            <span className="text-sm text-reetdach-400">/ Nacht</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body text-reetdach-500 mb-2">
              Anreise
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 border border-sand-300 rounded focus:border-nordsee-500 focus:ring-1 focus:ring-nordsee-500 font-body"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-reetdach-500 mb-2">
              Abreise
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-3 border border-sand-300 rounded focus:border-nordsee-500 focus:ring-1 focus:ring-nordsee-500 font-body"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-body text-reetdach-500 mb-2">
            Gäste
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-3 border border-sand-300 rounded focus:border-nordsee-500 focus:ring-1 focus:ring-nordsee-500 font-body"
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

        <p className="text-center text-sm text-reetdach-400 font-body">
          Kostenlose Stornierung bis 48h vor Anreise
        </p>
      </div>
    </div>
  );
}
