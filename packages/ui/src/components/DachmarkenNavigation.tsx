/**
 * Zentrale Dachmarken-Navigation für alle BLUM Marken
 * 
 * Diese Komponente wird in allen Satellites verwendet, um eine einheitliche
 * Verbindung zur Dachmarke BLUM herzustellen.
 * 
 * Features:
 * - Sticky Header mit Blur-Effekt
 * - Mobile-optimiert mit 56px Touch-Targets
 * - Alle Marken sind miteinander verlinkt
 * - "Quiet Luxury" Ästhetik
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

// Alle BLUM Marken mit ihren externen URLs
const BLUM_BRANDS = [
  { 
    name: 'BLUM', 
    href: 'https://www.blumaufsylt.de', 
    description: 'Dachmarke',
    isParent: true 
  },
  { 
    name: 'Fisch Blum Sylt', 
    href: 'https://www.blumaufsylt.de/fisch-blum-sylt', 
    description: 'Premium Fisch-Spezialitäten',
    isParent: false
  },
  { 
    name: "Blum's Seafood", 
    href: 'https://www.blumaufsylt.de/blums-seafood-sylt', 
    description: 'Exquisite Meeresfrüchte',
    isParent: false
  },
  { 
    name: 'Sylt Homes', 
    href: 'https://www.blumaufsylt.de/sylt-homes-by-blum', 
    description: 'Luxuriöse Ferienunterkünfte',
    isParent: false
  },
  { 
    name: 'Long Island House', 
    href: 'https://www.blumaufsylt.de/long-island-house-sylt', 
    description: 'Amerikanischer Küstenstil',
    isParent: false
  },
  { 
    name: 'Sylt Rooms', 
    href: 'https://syltrooms.de', 
    description: 'Boutique Hotelzimmer',
    isParent: false
  },
  { 
    name: 'Privat Homes', 
    href: 'https://privathomes.de', 
    description: 'Exklusive Ferienhäuser',
    isParent: false
  },
  { 
    name: 'Auster Appartements', 
    href: 'https://auster-appartements.de', 
    description: 'Maritime Eleganz',
    isParent: false 
  },
  { 
    name: 'Beach Home', 
    href: 'https://beach-home.de', 
    description: 'Strandnahe Unterkünfte',
    isParent: false
  },
] as const;

interface DachmarkenNavProps {
  /** Aktuelle Marke (wird hervorgehoben) */
  currentBrand?: string;
  /** Logo-Element oder Text */
  logo?: React.ReactNode;
  /** Ob Navigation transparent über Hero liegen soll */
  transparent?: boolean;
  /** Zusätzliche Navigation-Items */
  additionalItems?: Array<{ label: string; href: string }>;
}

export function DachmarkenNavigation({
  currentBrand,
  logo,
  transparent = false,
  additionalItems = [],
}: DachmarkenNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  // Scroll detection for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsBrandsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const baseClasses = transparent && !isScrolled
    ? 'bg-transparent text-white'
    : 'bg-white/95 backdrop-blur-md text-reetdach-900 shadow-sm';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${baseClasses}`}
        role="navigation"
        aria-label="Hauptnavigation"
      >
        {/* Dachmarken-Leiste */}
        <div className="bg-reetdach-900 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <span className="font-medium">Ein Unternehmen der BLUM Gruppe</span>
            <a
              href="https://www.blumaufsylt.de"
              className="hover:text-sand-300 transition-colors flex items-center gap-1 min-h-[44px] px-3 focus:outline-none focus:ring-2 focus:ring-sand-400 rounded"
            >
              Zur Dachmarke →
            </a>
          </div>
        </div>

        {/* Haupt-Navigation */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl md:text-3xl font-bold min-h-[48px] flex items-center px-2 rounded-lg focus:ring-2 focus:ring-sand-400 focus:ring-offset-2"
              aria-label="Zur Startseite"
            >
              {logo || 'BLUM'}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Marken-Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-sand-100 transition-colors min-h-[48px] focus:ring-2 focus:ring-sand-400"
                  aria-expanded={isBrandsOpen}
                  aria-haspopup="true"
                >
                  Unsere Marken
                  <svg
                    className={`w-4 h-4 transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isBrandsOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-sand-200 py-2 z-50"
                    onMouseLeave={() => setIsBrandsOpen(false)}
                  >
                    {BLUM_BRANDS.map((brand) => (
                      <a
                        key={brand.href}
                        href={brand.href}
                        className={`block px-4 py-3 hover:bg-sand-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sand-400 focus:ring-inset ${
                          currentBrand === brand.name ? 'bg-sand-100 font-medium' : ''
                        } ${brand.isParent ? 'border-b border-sand-200 mb-2' : ''}`}
                      >
                        <span className="font-medium">{brand.name}</span>
                        <span className="block text-sm text-reetdach-500">{brand.description}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Zusätzliche Navigation-Items */}
              {additionalItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 rounded-lg hover:bg-sand-100 transition-colors min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-sand-400"
                >
                  {item.label}
                </Link>
              ))}

              {/* CTA Button */}
              <a
                href="#buchung"
                className="bg-nordsee-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-nordsee-700 transition-colors min-h-[48px] flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-nordsee-400 focus:ring-offset-2"
              >
                Jetzt buchen
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-xl hover:bg-sand-100 transition-colors min-w-[56px] min-h-[56px] flex items-center justify-center focus:ring-2 focus:ring-sand-400"
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMenuOpen}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sand-200">
            <span className="font-heading text-xl font-bold">Menü</span>
            <button
              onClick={closeMenu}
              className="p-3 rounded-lg hover:bg-sand-100 min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Menü schließen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Zusätzliche Items */}
            {additionalItems.length > 0 && (
              <div className="px-4 mb-4">
                {additionalItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-4 px-4 hover:bg-sand-50 rounded-lg font-medium min-h-[56px] flex items-center"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Marken */}
            <div className="px-4">
              <h3 className="text-sm font-medium text-reetdach-500 uppercase tracking-wide mb-2 px-4">
                Alle BLUM Marken
              </h3>
              {BLUM_BRANDS.map((brand) => (
                <a
                  key={brand.href}
                  href={brand.href}
                  onClick={closeMenu}
                  className={`block py-4 px-4 hover:bg-sand-50 rounded-lg min-h-[56px] ${
                    currentBrand === brand.name ? 'bg-sand-100' : ''
                  } ${brand.isParent ? 'border-b border-sand-200 mb-2' : ''}`}
                >
                  <span className="font-medium">{brand.name}</span>
                  <span className="block text-sm text-reetdach-500">{brand.description}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-sand-200">
            <a
              href="#buchung"
              onClick={closeMenu}
              className="block w-full bg-nordsee-600 text-white text-center py-4 rounded-lg font-medium hover:bg-nordsee-700 transition-colors min-h-[56px]"
            >
              Jetzt buchen
            </a>
          </div>
        </div>
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-[120px]" aria-hidden="true" />
    </>
  );
}

export default DachmarkenNavigation;
