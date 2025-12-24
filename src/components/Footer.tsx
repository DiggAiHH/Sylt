"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { NAV_BRANDS, CONTACT } from "@/lib/constants";

export default function Footer() {
  // Smooth scroll to top with error handling and reduced-motion support
  const scrollToTop = useCallback(() => {
    try {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ 
        top: 0, 
        behavior: prefersReducedMotion ? "auto" : "smooth" 
      });
    } catch {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-deep-sea-blue text-white py-12 relative"
      role="contentinfo"
      aria-label="Fußzeile"
    >
      {/* Back to Top Button - Larger touch target (56x56px) */}
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-rich-gold text-deep-sea-blue p-4 rounded-full shadow-lg hover:bg-rich-gold-300 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-deep-sea-blue min-w-[56px] min-h-[56px] flex items-center justify-center"
        aria-label="Nach oben scrollen"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      <div className="max-w-6xl mx-auto px-6">
        {/* Larger text and better spacing for readability */}
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-serif font-bold text-rich-gold mb-5">
              BLUM Marken
            </h3>
            <p className="text-deep-sea-blue-100 text-base leading-relaxed">
              Premium Marken aus Sylt - Fisch-Spezialitäten, Ferienhäuser und mehr.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5">Untermarken</h3>
            {/* Larger touch targets for links */}
            <ul className="space-y-3" role="list">
              {NAV_BRANDS.slice(1).map((brand) => (
                <li key={brand.href}>
                  <Link 
                    href={brand.href} 
                    className="text-base hover:text-rich-gold transition-colors py-2 inline-block min-h-[44px] flex items-center focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 focus:ring-offset-deep-sea-blue rounded"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5">Kontakt</h3>
            {/* Larger text for better readability */}
            <address className="text-base not-italic text-deep-sea-blue-100 leading-loose">
              <span className="font-medium text-white">{CONTACT.name}</span><br />
              {CONTACT.street}<br />
              {CONTACT.zip} {CONTACT.city}<br />
              <a 
                href={`tel:${CONTACT.phone}`} 
                className="hover:text-rich-gold transition-colors py-1 inline-block underline underline-offset-4 focus:ring-2 focus:ring-rich-gold rounded"
              >
                {CONTACT.phoneFormatted}
              </a>
              <br />
              <a 
                href={`mailto:${CONTACT.email}`} 
                className="hover:text-rich-gold transition-colors py-1 inline-block underline underline-offset-4 focus:ring-2 focus:ring-rich-gold rounded"
              >
                {CONTACT.email}
              </a>
            </address>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5">Rechtliches</h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link 
                  href="/impressum" 
                  className="text-base hover:text-rich-gold transition-colors py-2 inline-block min-h-[44px] flex items-center focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 focus:ring-offset-deep-sea-blue rounded"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link 
                  href="/datenschutz" 
                  className="text-base hover:text-rich-gold transition-colors py-2 inline-block min-h-[44px] flex items-center focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 focus:ring-offset-deep-sea-blue rounded"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-deep-sea-blue-700 mt-10 pt-10 text-center text-base text-deep-sea-blue-200">
          <p>&copy; {currentYear} BLUM - Alle Rechte vorbehalten</p>
          <p className="mt-3">DPMA-konformer Markenauftritt</p>
        </div>
      </div>
    </footer>
  );
}
