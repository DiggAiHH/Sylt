'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Brand } from '@blumsylt/shared';

interface BookingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand;
  hubUrl: string;
  propertyId?: string;
  propertyName?: string;
}

export function BookingOverlay({
  isOpen,
  onClose,
  brand,
  hubUrl,
  propertyId,
  propertyName,
}: BookingOverlayProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBookingClick = () => {
    setIsRedirecting(true);
    
    const params = new URLSearchParams({
      brand: brand.id,
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
      guests: guests.toString(),
    });

    const bookingUrl = propertyId 
      ? `${hubUrl}/book/${propertyId}?${params.toString()}`
      : `${hubUrl}/properties?${params.toString()}`;
    
    // Redirect to hub
    window.location.href = bookingUrl;
  };

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Overlay Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div 
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl max-w-lg mx-auto"
              style={{ 
                borderTop: `4px solid ${brand.primaryColor}`,
              }}
            >
              {/* Header */}
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-2xl text-gray-900">
                    {propertyName || 'Verfügbarkeit prüfen'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Schließen"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  {brand.name} • {brand.tagline}
                </p>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Anreise
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={today}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-shadow"
                      style={{ 
                        '--tw-ring-color': brand.primaryColor,
                      } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Abreise
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || today}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gäste
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="flex-1 text-center font-medium">
                      {guests} {guests === 1 ? 'Gast' : 'Gäste'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleBookingClick}
                  disabled={isRedirecting}
                  className="w-full py-4 rounded-lg text-white font-medium text-lg transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {isRedirecting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Weiterleitung...
                    </span>
                  ) : (
                    'Jetzt buchen'
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Sichere Zahlung
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Beste Preisgarantie
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Compact booking widget for property cards
interface BookingWidgetProps {
  brand: Brand;
  hubUrl: string;
  propertyId: string;
  className?: string;
}

export function BookingWidget({
  brand,
  hubUrl,
  propertyId,
  className = '',
}: BookingWidgetProps) {
  const handleClick = () => {
    window.location.href = `${hubUrl}/book/${propertyId}?brand=${brand.id}`;
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 ${className}`}
      style={{ backgroundColor: brand.primaryColor }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Verfügbarkeit prüfen
    </button>
  );
}
