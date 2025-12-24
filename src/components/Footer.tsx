"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { NAV_BRANDS, CONTACT } from "@/lib/constants";

export default function Footer() {
  // Smooth scroll to top with error handling
  const scrollToTop = useCallback(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-deep-sea-blue text-white py-8 relative"
      role="contentinfo"
      aria-label="Fußzeile"
    >
      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-rich-gold text-deep-sea-blue p-3 rounded-full shadow-lg hover:bg-rich-gold-300 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-deep-sea-blue"
        aria-label="Nach oben scrollen"
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
            <ul className="space-y-2 text-sm" role="list">
              {NAV_BRANDS.slice(1).map((brand) => (
                <li key={brand.href}>
                  <Link 
                    href={brand.href} 
                    className="hover:text-rich-gold transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="text-sm not-italic text-deep-sea-blue-200">
              {CONTACT.name}<br />
              {CONTACT.street}<br />
              {CONTACT.zip} {CONTACT.city}<br />
              <a 
                href={`tel:${CONTACT.phone}`} 
                className="hover:text-rich-gold transition-colors"
              >
                {CONTACT.phoneFormatted}
              </a>
              <br />
              <a 
                href={`mailto:${CONTACT.email}`} 
                className="hover:text-rich-gold transition-colors"
              >
                {CONTACT.email}
              </a>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm" role="list">
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
          <p>&copy; {currentYear} BLUM - Alle Rechte vorbehalten</p>
          <p className="mt-2">DPMA-konformer Markenauftritt</p>
        </div>
      </div>
    </footer>
  );
}
