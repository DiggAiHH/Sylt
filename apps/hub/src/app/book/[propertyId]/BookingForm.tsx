'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Property, Brand } from '@sylt/shared';
import { formatCurrency, isValidEmail, isValidDateRange, sanitizeForPlainText } from '@sylt/shared';

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
  const performAvailabilityCheck = useCallback(async (checkInVal: string, checkOutVal: string) => {
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

      // CRITICAL FIX: Check response.ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Fehler bei der Verfügbarkeitsprüfung';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = `Server-Fehler (${response.status}): ${response.statusText}`;
        }
        setError(errorMessage);
        setAvailability(null);
        return;
      }

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
  }, [property.id]);

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
  }, [performAvailabilityCheck]);

  // Check availability when dates change (with debounce)
  useEffect(() => {
    if (checkIn && checkOut) {
      checkAvailabilityDebounced(checkIn, checkOut);
    } else {
      setAvailability(null);
    }
  }, [checkIn, checkOut, checkAvailabilityDebounced]);

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

      // CRITICAL FIX: Check response.ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Buchung fehlgeschlagen';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = `Server-Fehler (${response.status}). Bitte versuchen Sie es später erneut.`;
        }
        setError(errorMessage);
        return;
      }

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
      className="bg-white rounded-2xl p-6 md:p-8 luxury-shadow"
    >
      <h3 className="font-serif text-2xl md:text-3xl text-reetdach-900 mb-6">Buchung</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection - larger inputs for elderly users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="form-checkin"
              className="block text-base font-medium text-reetdach-700 mb-2"
            >
              Anreise
            </label>
            <input
              id="form-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              required
              className="w-full px-4 py-4 text-lg border-2 border-reetdach-200 rounded-xl focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
            />
          </div>
          <div>
            <label 
              htmlFor="form-checkout"
              className="block text-base font-medium text-reetdach-700 mb-2"
            >
              Abreise
            </label>
            <input
              id="form-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
              required
              className="w-full px-4 py-4 text-lg border-2 border-reetdach-200 rounded-xl focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Guests - larger buttons for elderly users */}
        <div>
          <label 
            id="form-guests-label"
            className="block text-base font-medium text-reetdach-700 mb-2"
          >
            Anzahl Gäste
          </label>
          <div 
            className="flex items-center border-2 border-reetdach-200 rounded-xl"
            role="group"
            aria-labelledby="form-guests-label"
          >
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
              className="px-6 py-4 text-reetdach-500 hover:text-reetdach-700 hover:bg-sand-50 transition-colors min-w-[60px] min-h-[56px] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Gäste reduzieren"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
            <span 
              className="flex-1 text-center text-xl font-medium text-reetdach-900 py-4"
              aria-live="polite"
            >
              {guests} {guests === 1 ? 'Gast' : 'Gäste'}
            </span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(property.maxGuests, guests + 1))}
              disabled={guests >= property.maxGuests}
              className="px-6 py-4 text-reetdach-500 hover:text-reetdach-700 hover:bg-sand-50 transition-colors min-w-[60px] min-h-[56px] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Gäste erhöhen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-reetdach-500 mt-2">
            Maximal {property.maxGuests} Gäste möglich
          </p>
        </div>

        {/* Availability Check Result */}
        {isChecking && (
          <div className="flex items-center justify-center py-6" aria-live="polite">
            <svg className="animate-spin h-6 w-6 text-nordsee-600 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-lg text-reetdach-600">Verfügbarkeit wird geprüft...</span>
          </div>
        )}

        {availability?.available && !isChecking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nordsee-50 border-2 border-nordsee-200 rounded-xl p-5"
            role="status"
            aria-live="polite"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg text-reetdach-600">
                {availability.nights} {availability.nights === 1 ? 'Nacht' : 'Nächte'} × {formatCurrency(property.pricePerNight)}
              </span>
              <span className="text-lg font-medium text-reetdach-900">
                {formatCurrency(availability.totalPrice || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xl font-semibold pt-3 border-t border-nordsee-200">
              <span className="text-reetdach-900">Gesamtpreis</span>
              <span className="text-nordsee-700 text-2xl">
                {formatCurrency(availability.totalPrice || 0)}
              </span>
            </div>
          </motion.div>
        )}

        {/* Guest Information - larger inputs */}
        {availability?.available && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-5 pt-5 border-t-2 border-reetdach-100"
          >
            <div>
              <label 
                htmlFor="form-name"
                className="block text-base font-medium text-reetdach-700 mb-2"
              >
                Ihr vollständiger Name
              </label>
              <input
                id="form-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                placeholder="Max Mustermann"
                autoComplete="name"
                className="w-full px-4 py-4 text-lg border-2 border-reetdach-200 rounded-xl focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
              />
            </div>
            <div>
              <label 
                htmlFor="form-email"
                className="block text-base font-medium text-reetdach-700 mb-2"
              >
                E-Mail-Adresse
              </label>
              <input
                id="form-email"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                placeholder="max@beispiel.de"
                autoComplete="email"
                className="w-full px-4 py-4 text-lg border-2 border-reetdach-200 rounded-xl focus:ring-2 focus:ring-nordsee-500 focus:border-transparent"
              />
              <p className="text-sm text-reetdach-500 mt-2">
                Ihre Buchungsbestätigung wird an diese Adresse gesendet.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message - more visible */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-xl text-base"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Submit Button - larger for elderly users */}
        <button
          type="submit"
          disabled={!availability?.available || isSubmitting}
          className="w-full py-5 rounded-xl text-white font-semibold text-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed min-h-[60px]"
          style={{ backgroundColor: brand.primaryColor }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird verarbeitet...
            </span>
          ) : (
            'Jetzt verbindlich buchen'
          )}
        </button>

        {/* Trust Badges - larger for readability */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-reetdach-500">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Sichere SSL-Verschlüsselung
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sofortige Bestätigung
          </span>
        </div>
      </form>
    </motion.div>
  );
}
