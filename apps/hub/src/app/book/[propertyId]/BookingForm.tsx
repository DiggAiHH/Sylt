'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Property, Brand } from '@blumsylt/shared';
import { formatCurrency, isValidEmail, isValidDateRange, sanitizeForPlainText } from '@blumsylt/shared';

interface BookingFormProps {
  property: Property;
  brand: Brand;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

// Debounce delay for availability check (prevents excessive API calls)
const AVAILABILITY_CHECK_DELAY_MS = 500;

export default function BookingForm({
  property,
  brand,
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
}: BookingFormProps) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<{
    available: boolean;
    totalPrice?: number;
    nights?: number;
  } | null>(null);
  const [error, setError] = useState('');
  
  // Ref for debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Ref for abort controller to cancel pending requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Today's date for min date
  const today = new Date().toISOString().split('T')[0];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Debounced availability check to prevent excessive API calls
  const checkAvailabilityDebounced = useCallback((checkInVal: string, checkOutVal: string) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    debounceTimerRef.current = setTimeout(() => {
      performAvailabilityCheck(checkInVal, checkOutVal);
    }, AVAILABILITY_CHECK_DELAY_MS);
  }, [property.id]);

  // Check availability when dates change (with debounce)
  useEffect(() => {
    if (checkIn && checkOut) {
      checkAvailabilityDebounced(checkIn, checkOut);
    } else {
      setAvailability(null);
    }
  }, [checkIn, checkOut, checkAvailabilityDebounced]);

  const performAvailabilityCheck = async (checkInVal: string, checkOutVal: string) => {
    const checkInDate = new Date(checkInVal);
    const checkOutDate = new Date(checkOutVal);

    if (!isValidDateRange(checkInDate, checkOutDate)) {
      setError('Bitte wählen Sie gültige Daten.');
      setAvailability(null);
      return;
    }

    setIsChecking(true);
    setError('');
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn: checkInVal,
          checkOut: checkOutVal,
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();

      if (data.success) {
        setAvailability(data.data);
        if (!data.data.available) {
          setError('Diese Daten sind leider nicht verfügbar.');
        }
      } else {
        setError(data.error || 'Fehler bei der Verfügbarkeitsprüfung');
      }
    } catch (err) {
      // Ignore aborted requests (user changed dates quickly)
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Availability check failed:', err);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!availability?.available) {
      setError('Bitte prüfen Sie zuerst die Verfügbarkeit.');
      return;
    }

    // Validate and sanitize input
    const sanitizedName = sanitizeForPlainText(guestName);
    if (sanitizedName.length < 2) {
      setError('Bitte geben Sie Ihren vollständigen Namen ein.');
      return;
    }

    const trimmedEmail = guestEmail.trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn,
          checkOut,
          guests,
          guestName: sanitizedName,
          guestEmail: trimmedEmail,
        }),
      });

      const data = await response.json();

      if (data.success && data.data.paymentUrl) {
        // Redirect to payment
        window.location.href = data.data.paymentUrl;
      } else {
        setError(data.error || 'Buchung fehlgeschlagen');
      }
    } catch (err) {
      console.error('Booking failed:', err);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 luxury-shadow"
    >
      <h3 className="font-serif text-2xl text-reetdach-900 mb-6">Buchung</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-reetdach-700 mb-2">
              Anreise
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              required
              className="w-full px-4 py-3 border border-reetdach-200 rounded-lg focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-reetdach-700 mb-2">
              Abreise
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
              required
              className="w-full px-4 py-3 border border-reetdach-200 rounded-lg focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-reetdach-700 mb-2">
            Gäste
          </label>
          <div className="flex items-center border border-reetdach-200 rounded-lg">
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="px-4 py-3 text-reetdach-500 hover:text-reetdach-700 hover:bg-sand-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="flex-1 text-center font-medium text-reetdach-900">
              {guests} {guests === 1 ? 'Gast' : 'Gäste'}
            </span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(property.maxGuests, guests + 1))}
              className="px-4 py-3 text-reetdach-500 hover:text-reetdach-700 hover:bg-sand-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-reetdach-400 mt-1">
            Maximal {property.maxGuests} Gäste
          </p>
        </div>

        {/* Availability Check Result */}
        {isChecking && (
          <div className="flex items-center justify-center py-4">
            <svg className="animate-spin h-5 w-5 text-nordsee-600 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-reetdach-600">Verfügbarkeit wird geprüft...</span>
          </div>
        )}

        {availability?.available && !isChecking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nordsee-50 border border-nordsee-200 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-reetdach-600">
                {availability.nights} {availability.nights === 1 ? 'Nacht' : 'Nächte'} × {formatCurrency(property.pricePerNight)}
              </span>
              <span className="font-medium text-reetdach-900">
                {formatCurrency(availability.totalPrice || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-reetdach-900">Gesamtpreis</span>
              <span className="text-nordsee-700">
                {formatCurrency(availability.totalPrice || 0)}
              </span>
            </div>
          </motion.div>
        )}

        {/* Guest Information */}
        {availability?.available && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-4 border-t border-reetdach-100"
          >
            <div>
              <label className="block text-sm font-medium text-reetdach-700 mb-2">
                Ihr Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                placeholder="Max Mustermann"
                className="w-full px-4 py-3 border border-reetdach-200 rounded-lg focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-reetdach-700 mb-2">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                placeholder="max@beispiel.de"
                className="w-full px-4 py-3 border border-reetdach-200 rounded-lg focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!availability?.available || isSubmitting}
          className="w-full py-4 rounded-lg text-white font-medium text-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: brand.primaryColor }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird verarbeitet...
            </span>
          ) : (
            'Jetzt verbindlich buchen'
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-reetdach-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Sichere SSL-Verschlüsselung
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sofortige Bestätigung
          </span>
        </div>
      </form>
    </motion.div>
  );
}
