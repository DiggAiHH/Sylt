'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Booking Cancel Page
 * 
 * Displayed when user cancels the Stripe Checkout process.
 * Allows them to retry or return to homepage.
 */
function BookingCancelContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      {/* Cancel Icon */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6"
        >
          <svg 
            className="w-10 h-10 text-amber-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </motion.div>
        
        <h1 className="text-3xl font-serif text-reetdach-900 mb-2">
          Buchung abgebrochen
        </h1>
        <p className="text-lg text-reetdach-600">
          Die Zahlung wurde nicht abgeschlossen. Ihre Buchung ist noch nicht bestätigt.
        </p>
      </div>

      {/* Information */}
      <div className="bg-sand-50 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-medium text-reetdach-800 mb-3">
          Was ist passiert?
        </h2>
        <ul className="space-y-2 text-reetdach-600">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Sie haben den Zahlungsvorgang abgebrochen oder die Sitzung ist abgelaufen.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Es wurde keine Belastung vorgenommen.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-nordsee-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span>Sie können jederzeit eine neue Buchung starten.</span>
          </li>
        </ul>
      </div>

      {bookingId && (
        <div className="bg-reetdach-50 rounded-xl p-4 mb-8 text-center">
          <p className="text-sm text-reetdach-500">Buchungsnummer (nicht bestätigt)</p>
          <p className="font-mono text-reetdach-700">{bookingId}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex-1 py-3 px-6 text-center bg-nordsee-600 text-white rounded-lg font-medium hover:bg-nordsee-700 transition-colors"
        >
          Neue Buchung starten
        </Link>
        <Link
          href="/contact"
          className="flex-1 py-3 px-6 text-center border-2 border-nordsee-600 text-nordsee-600 rounded-lg font-medium hover:bg-nordsee-50 transition-colors"
        >
          Hilfe benötigt?
        </Link>
      </div>

      {/* Support Info */}
      <div className="mt-8 pt-6 border-t border-sand-200 text-center text-sm text-reetdach-500">
        <p>
          Haben Sie Probleme bei der Buchung? Kontaktieren Sie uns unter{' '}
          <a href="tel:+494651123456" className="text-nordsee-600 hover:underline">
            +49 4651 123 456
          </a>
          {' '}oder{' '}
          <a href="mailto:info@blumsylthotels.de" className="text-nordsee-600 hover:underline">
            info@blumsylthotels.de
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default function BookingCancelPage() {
  return (
    <main className="min-h-screen bg-sand-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-nordsee-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-reetdach-600">Wird geladen...</p>
          </div>
        }>
          <BookingCancelContent />
        </Suspense>
      </div>
    </main>
  );
}
