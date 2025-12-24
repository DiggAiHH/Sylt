/**
 * Custom 404 Seite.
 * Bietet hilfreiche Navigation und konsistentes Design.
 * Vermeidet Frustration bei Nutzern, die auf nicht existierende Seiten gelangen.
 */

import Link from "next/link";
import { NAV_BRANDS } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-sand-light flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-nordsee/10 text-nordsee mb-6">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Fehlermeldung */}
        <h1 className="text-6xl md:text-8xl font-extralight text-nordsee tracking-widest mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-reetdach-dark mb-6">
          Seite nicht gefunden
        </h2>
        <p className="text-reetdach mb-8 leading-relaxed">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          <br />
          Vielleicht finden Sie hier, was Sie suchen:
        </p>

        {/* Hilfreiche Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Zur Startseite
          </Link>
        </div>

        {/* Quick Links zu allen Marken */}
        <div className="border-t border-sand-dark/20 pt-8">
          <p className="text-sm text-reetdach-light mb-4">Unsere Marken:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {NAV_BRANDS.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-nordsee hover:text-nordsee-dark transition-colors px-3 py-1 bg-white rounded-full shadow-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
