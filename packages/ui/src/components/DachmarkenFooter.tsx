/**
 * Zentraler BLUM Dachmarken-Footer
 * 
 * Verbindet alle BLUM Marken miteinander und stellt sicher,
 * dass Impressum/Datenschutz korrekt verlinkt sind (DSGVO-konform).
 * 
 * Features:
 * - Alle Marken sind miteinander verlinkt
 * - Separate Impressum/Datenschutz Links (DSGVO)
 * - Mobile-optimiert (min 44px Touch-Targets)
 * - "Quiet Luxury" Ästhetik
 */

import React from 'react';
import Link from 'next/link';

// Alle BLUM Marken
const BRAND_CATEGORIES = {
  hospitality: {
    title: 'Unterkünfte',
    brands: [
      { name: 'Sylt Rooms', href: 'https://syltrooms.de', description: 'Boutique Hotelzimmer' },
      { name: 'Privat Homes', href: 'https://privathomes.de', description: 'Exklusive Ferienhäuser' },
      { name: 'Long Island House', href: 'https://longislandhouse.de', description: 'Hampton-Style Eleganz' },
      { name: 'Auster Appartements', href: 'https://auster-appartements.de', description: 'Maritime Eleganz' },
      { name: 'Beach Home', href: 'https://beach-home.de', description: 'Strandnahe Unterkünfte' },
    ],
  },
  culinary: {
    title: 'Kulinarik',
    brands: [
      { name: 'Fisch Blum Sylt', href: 'https://www.blumaufsylt.de/fisch-blum-sylt', description: 'Premium Fisch-Spezialitäten' },
      { name: "Blum's Seafood", href: 'https://www.blumaufsylt.de/blums-seafood-sylt', description: 'Exquisite Meeresfrüchte' },
    ],
  },
};

const LEGAL_LINKS = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'AGB', href: '/agb' },
];

const CONTACT = {
  name: 'Martina Blum',
  company: 'BLUM Sylt',
  street: 'Eidumweg 13',
  zip: '25980',
  city: 'Sylt',
  phone: '+49 172 400 8846',
  email: 'blumsylt@web.de',
};

interface DachmarkenFooterProps {
  /** Aktuelle Marke */
  currentBrand?: string;
  /** Impressum/Datenschutz URLs (falls abweichend) */
  legalLinks?: typeof LEGAL_LINKS;
}

export function DachmarkenFooter({
  currentBrand,
  legalLinks = LEGAL_LINKS,
}: DachmarkenFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-reetdach-900 text-white" role="contentinfo">
      {/* Marken-Bereich */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BLUM Dachmarke */}
          <div>
            <a
              href="https://www.blumaufsylt.de"
              className="inline-block mb-6 focus:outline-none focus:ring-2 focus:ring-sand-400 rounded-lg"
            >
              <span className="font-heading text-3xl font-bold text-sand-400">BLUM</span>
            </a>
            <p className="text-reetdach-300 leading-relaxed mb-6">
              Premium Marken aus Sylt – Fisch-Spezialitäten, 
              exklusive Ferienunterkünfte und nordische Gastfreundschaft.
            </p>
            <p className="text-sm text-reetdach-400">
              Ein Unternehmen der BLUM Gruppe
            </p>
          </div>

          {/* Unterkünfte */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-sand-400 mb-6">
              {BRAND_CATEGORIES.hospitality.title}
            </h3>
            <ul className="space-y-3">
              {BRAND_CATEGORIES.hospitality.brands.map((brand) => (
                <li key={brand.href}>
                  <a
                    href={brand.href}
                    className={`block py-2 hover:text-sand-300 transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-sand-400 rounded ${
                      currentBrand === brand.name ? 'text-sand-400 font-medium' : 'text-reetdach-200'
                    }`}
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kulinarik */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-sand-400 mb-6">
              {BRAND_CATEGORIES.culinary.title}
            </h3>
            <ul className="space-y-3">
              {BRAND_CATEGORIES.culinary.brands.map((brand) => (
                <li key={brand.href}>
                  <a
                    href={brand.href}
                    className="block py-2 text-reetdach-200 hover:text-sand-300 transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-sand-400 rounded"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Kochbuch Link */}
            <div className="mt-6 pt-6 border-t border-reetdach-700">
              <a
                href="https://www.blumaufsylt.de/kochbuch"
                className="flex items-center gap-2 text-reetdach-200 hover:text-sand-300 transition-colors py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-sand-400 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Sylter Fisch-Kochbuch
              </a>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-sand-400 mb-6">
              Kontakt
            </h3>
            <address className="not-italic text-reetdach-200 leading-relaxed">
              <p className="font-medium text-white mb-2">{CONTACT.company}</p>
              <p>{CONTACT.street}</p>
              <p className="mb-4">{CONTACT.zip} {CONTACT.city}</p>
              
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="block py-2 hover:text-sand-300 transition-colors min-h-[44px] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sand-400 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CONTACT.phone}
              </a>
              
              <a
                href={`mailto:${CONTACT.email}`}
                className="block py-2 hover:text-sand-300 transition-colors min-h-[44px] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sand-400 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {CONTACT.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Legal Bar - DSGVO-konform: Impressum & Datenschutz klar getrennt */}
      <div className="border-t border-reetdach-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-reetdach-400">
              © {currentYear} BLUM Sylt. Alle Rechte vorbehalten.
            </p>
            
            {/* Legal Links - DSGVO-konform: Separat und deutlich sichtbar */}
            <nav aria-label="Rechtliches" className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-reetdach-300 hover:text-sand-300 transition-colors py-2 min-h-[44px] flex items-center underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-sand-400 rounded"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-reetdach-600 hidden md:inline" aria-hidden="true">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DachmarkenFooter;
