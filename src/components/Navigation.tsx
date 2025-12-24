"use client";

import React, { useState } from "react";
import Link from "next/link";

const brands = [
  { name: "BLUM", href: "/" },
  { name: "Fisch Blum Sylt", href: "/fisch-blum-sylt" },
  { name: "Blum's Seafood Sylt", href: "/blums-seafood-sylt" },
  { name: "Sylt Homes by Blum", href: "/sylt-homes-by-blum" },
  { name: "Long Island House Sylt", href: "/long-island-house-sylt" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-deep-sea-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-rich-gold hover:text-rich-gold-300 transition-colors"
          >
            BLUM
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-x-6 text-sm">
            {brands.slice(1).map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="hover:text-rich-gold transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-rich-gold after:transition-all hover:after:w-full"
              >
                {brand.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-deep-sea-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 focus:ring-offset-deep-sea-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-3 pt-2 border-t border-deep-sea-blue-700">
            {brands.slice(1).map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="hover:text-rich-gold transition-colors py-2 px-2 hover:bg-deep-sea-blue-700 rounded"
                onClick={() => setIsMenuOpen(false)}
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
