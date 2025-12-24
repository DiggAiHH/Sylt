"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-deep-sea-blue text-white py-8 relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-rich-gold text-deep-sea-blue p-3 rounded-full shadow-lg hover:bg-rich-gold-300 transition-all duration-300 hover:scale-110"
        aria-label="Nach oben scrollen"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-rich-gold mb-4">
              BLUM Marken
            </h3>
            <p className="text-deep-sea-blue-200 text-sm">
              Premium Marken aus Sylt - Fisch-Spezialitäten, Ferienhäuser und mehr.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Untermarken</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fisch-blum-sylt" className="hover:text-rich-gold transition-colors">
                  Fisch Blum Sylt
                </Link>
              </li>
              <li>
                <Link href="/blums-seafood-sylt" className="hover:text-rich-gold transition-colors">
                  Blum&apos;s Seafood Sylt
                </Link>
              </li>
              <li>
                <Link href="/sylt-homes-by-blum" className="hover:text-rich-gold transition-colors">
                  Sylt Homes by Blum
                </Link>
              </li>
              <li>
                <Link href="/long-island-house-sylt" className="hover:text-rich-gold transition-colors">
                  Long Island House Sylt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="text-sm not-italic text-deep-sea-blue-200">
              Martina Blum<br />
              Eidumweg 13<br />
              25980 Sylt<br />
              <a href="tel:+491724008846" className="hover:text-rich-gold transition-colors">
                0172-4008846
              </a>
              <br />
              <a href="mailto:blumsylt@web.de" className="hover:text-rich-gold transition-colors">
                blumsylt@web.de
              </a>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-rich-gold transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-rich-gold transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-deep-sea-blue-700 mt-8 pt-8 text-center text-sm text-deep-sea-blue-300">
          <p>&copy; {new Date().getFullYear()} BLUM - Alle Rechte vorbehalten</p>
          <p className="mt-2">DPMA-konformer Markenauftritt</p>
        </div>
      </div>
    </footer>
  );
}
