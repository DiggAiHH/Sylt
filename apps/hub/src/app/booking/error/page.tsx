'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Booking Error Page
 * 
 * Displayed when there's an error creating the payment session.
 * Provides options to retry or contact support.
 */
function BookingErrorContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      {/* Error Icon */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
        >
          <svg 
            className="w-10 h-10 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </motion.div>
        
        <h1 className="text-3xl font-serif text-reetdach-900 mb-2">
          Buchungsfehler
        </h1>
        <p className="text-lg text-reetdach-600">
          Leider ist bei der Verarbeitung Ihrer Buchung ein Fehler aufgetreten.
        </p>
      </div>

      {/* Error Details */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-medium text-red-800 mb-3">
          Was können Sie tun?
        </h2>
        <ul className="space-y-2 text-red-700">
          <li className="flex items-start gap-2">
            <span className="font-medium">1.</span>
            <span>Versuchen Sie es in wenigen Minuten erneut.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">2.</span>
            <span>Überprüfen Sie Ihre Internetverbindung.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">3.</span>
            <span>Kontaktieren Sie uns, wenn das Problem weiterhin besteht.</span>
          </li>
        </ul>
      </div>

      {bookingId && (
        <div className="bg-sand-50 rounded-xl p-4 mb-8 text-center">
          <p className="text-sm text-reetdach-500">Buchungsreferenz (zur Fehlerbehebung)</p>
          <p className="font-mono text-reetdach-700">{bookingId}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex-1 py-3 px-6 text-center bg-nordsee-600 text-white rounded-lg font-medium hover:bg-nordsee-700 transition-colors"
        >
          Erneut versuchen
        </Link>
        <Link
          href="/contact"
          className="flex-1 py-3 px-6 text-center border-2 border-nordsee-600 text-nordsee-600 rounded-lg font-medium hover:bg-nordsee-50 transition-colors"
        >
          Kontakt aufnehmen
        </Link>
      </div>

      {/* Support Info */}
      <div className="mt-8 pt-6 border-t border-sand-200 text-center text-sm text-reetdach-500">
        <p className="mb-2 font-medium text-reetdach-700">Dringend? Rufen Sie uns an:</p>
        <a 
          href="tel:+494651123456" 
          className="text-lg text-nordsee-600 font-semibold hover:underline"
        >
          +49 4651 123 456
        </a>
        <p className="mt-2">
          Oder per E-Mail:{' '}
          <a href="mailto:buchung@blumsylthotels.de" className="text-nordsee-600 hover:underline">
            buchung@blumsylthotels.de
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default function BookingErrorPage() {
  return (
    <main className="min-h-screen bg-sand-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-nordsee-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-reetdach-600">Wird geladen...</p>
          </div>
        }>
          <BookingErrorContent />
        </Suspense>
      </div>
    </main>
  );
}
