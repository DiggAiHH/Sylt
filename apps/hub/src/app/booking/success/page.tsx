'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Booking } from '@blumsylt/shared';

/**
 * Booking Success Page
 * 
 * Displayed after successful Stripe Checkout payment.
 * Shows booking confirmation details to the guest.
 */
function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const sessionId = searchParams.get('session_id');
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookingId) {
      fetchBooking(bookingId);
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const fetchBooking = async (id: string) => {
    try {
      // CRITICAL FIX: Add timeout to prevent infinite waiting
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`/api/bookings?id=${id}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      // CRITICAL FIX: Check response.ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Buchung konnte nicht gefunden werden.';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = `Server-Fehler (${response.status}): ${response.statusText}`;
        }
        setError(errorMessage);
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setBooking(data.data);
      } else {
        setError(data.error || 'Buchung konnte nicht gefunden werden.');
      }
    } catch (err) {
      // CRITICAL FIX: Better error differentiation
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Die Anfrage hat zu lange gedauert. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.');
      } else {
        setError('Fehler beim Laden der Buchungsdetails. Bitte laden Sie die Seite neu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-nordsee-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-reetdach-600 text-lg">Buchung wird geladen...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      {/* Success Icon */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
        >
          <svg 
            className="w-10 h-10 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </motion.div>
        
        <h1 className="text-3xl font-serif text-reetdach-900 mb-2">
          Buchung bestätigt!
        </h1>
        <p className="text-lg text-reetdach-600">
          Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {booking && (
        <div className="space-y-6">
          {/* Booking Reference */}
          <div className="bg-sand-50 rounded-xl p-6">
            <p className="text-sm text-reetdach-500 mb-1">Buchungsnummer</p>
            <p className="text-xl font-mono font-medium text-reetdach-900">
              {booking.id}
            </p>
          </div>

          {/* Booking Details */}
          <div className="border-t border-sand-200 pt-6">
            <h2 className="text-lg font-serif text-reetdach-900 mb-4">
              Buchungsdetails
            </h2>
            
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-reetdach-500">Gast</dt>
                <dd className="text-reetdach-900 font-medium">{booking.guestName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-reetdach-500">E-Mail</dt>
                <dd className="text-reetdach-900">{booking.guestEmail}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-reetdach-500">Anreise</dt>
                <dd className="text-reetdach-900">{formatDate(booking.checkIn)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-reetdach-500">Abreise</dt>
                <dd className="text-reetdach-900">{formatDate(booking.checkOut)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-reetdach-500">Gäste</dt>
                <dd className="text-reetdach-900">{booking.guests} {booking.guests === 1 ? 'Person' : 'Personen'}</dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-sand-200">
                <dt className="text-reetdach-700 font-medium">Gesamtpreis</dt>
                <dd className="text-xl text-nordsee-600 font-semibold">
                  {formatCurrency(booking.totalPrice)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-3 rounded-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="font-medium">Zahlung erfolgreich</span>
          </div>
        </div>
      )}

      {sessionId && !booking && (
        <div className="bg-nordsee-50 rounded-xl p-6 text-center">
          <p className="text-nordsee-800">
            Ihre Zahlung wurde erfolgreich verarbeitet.
          </p>
          <p className="text-sm text-nordsee-600 mt-2">
            Session ID: {sessionId}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex-1 py-3 px-6 text-center bg-nordsee-600 text-white rounded-lg font-medium hover:bg-nordsee-700 transition-colors"
        >
          Zur Startseite
        </Link>
        <Link
          href="/contact"
          className="flex-1 py-3 px-6 text-center border-2 border-nordsee-600 text-nordsee-600 rounded-lg font-medium hover:bg-nordsee-50 transition-colors"
        >
          Kontakt
        </Link>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-sand-200 text-center text-sm text-reetdach-500">
        <p>
          Bei Fragen zu Ihrer Buchung erreichen Sie uns unter{' '}
          <a href="mailto:info@blumsylthotels.de" className="text-nordsee-600 hover:underline">
            info@blumsylthotels.de
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-sand-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-nordsee-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-reetdach-600">Wird geladen...</p>
          </div>
        }>
          <BookingSuccessContent />
        </Suspense>
      </div>
    </main>
  );
}
