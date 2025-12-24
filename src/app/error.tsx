/**
 * Error Boundary für Next.js App Router.
 * Fängt Laufzeitfehler ab und zeigt eine benutzerfreundliche Fehlermeldung.
 * Ermöglicht dem Benutzer, die Seite neu zu laden oder zur Startseite zu navigieren.
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Fehler an Monitoring-Service senden (z.B. Sentry, LogRocket)
    // In Produktion würde hier ein richtiges Error-Tracking stehen
    console.error("Application Error:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-sand-light flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-100 text-red-600 mb-6">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Fehlermeldung */}
        <h1 className="text-3xl md:text-4xl font-light text-reetdach-dark mb-4">
          Etwas ist schiefgelaufen
        </h1>
        <p className="text-reetdach mb-8 leading-relaxed">
          Es tut uns leid, aber bei der Verarbeitung Ihrer Anfrage ist ein
          Fehler aufgetreten.
          <br />
          Bitte versuchen Sie es erneut oder kehren Sie zur Startseite zurück.
        </p>

        {/* Error Digest für Support-Anfragen */}
        {error.digest && (
          <p className="text-xs text-reetdach-light mb-8 font-mono bg-sand px-4 py-2 rounded-lg inline-block">
            Fehler-ID: {error.digest}
          </p>
        )}

        {/* Aktionsbuttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-nordsee text-white rounded-lg hover:bg-nordsee-dark transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-nordsee text-nordsee rounded-lg hover:bg-nordsee hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
