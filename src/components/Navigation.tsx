"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { NAV_BRANDS } from "@/lib/constants";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close menu when link is clicked
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav 
      className="bg-deep-sea-blue text-white sticky top-0 z-50 shadow-lg"
      role="navigation"
      aria-label="Hauptnavigation"
    >
      {/* Larger padding and text for better accessibility */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          {/* Larger logo text for better visibility */}
          <Link
            href="/"
            className="text-3xl font-serif font-bold text-rich-gold hover:text-rich-gold-300 transition-colors min-h-[48px] flex items-center focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-deep-sea-blue rounded-lg px-2"
            aria-label="BLUM - Zur Startseite"
          >
            BLUM
          </Link>
          
          {/* Desktop Navigation - Larger text and better spacing */}
          <div className="hidden lg:flex gap-x-8 text-base" role="menubar">
            {NAV_BRANDS.slice(1).map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="hover:text-rich-gold transition-colors relative py-2 px-3 min-h-[48px] flex items-center rounded-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-deep-sea-blue after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-rich-gold after:transition-all hover:after:w-full"
                role="menuitem"
              >
                {brand.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Larger touch target (56x56px) */}
          <button
            type="button"
            className="lg:hidden p-4 hover:bg-deep-sea-blue-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 focus:ring-offset-deep-sea-blue min-w-[56px] min-h-[56px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {/* Larger icon for better visibility */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu - Larger text and touch targets */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t border-deep-sea-blue-700">
            {NAV_BRANDS.slice(1).map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="text-lg hover:text-rich-gold transition-colors py-4 px-4 hover:bg-deep-sea-blue-700 rounded-xl min-h-[56px] flex items-center focus:ring-2 focus:ring-rich-gold focus:ring-inset"
                onClick={closeMenu}
                role="menuitem"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
