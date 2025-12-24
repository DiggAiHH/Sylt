'use client';

import Link from 'next/link';
import type { Brand } from '@blumsylt/shared';

interface FooterProps {
  brand: Brand;
}

export default function Footer({ brand }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-reetdach-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl mb-4">{brand.name}</h3>
            <p className="text-reetdach-300 mb-6 max-w-md">
              {brand.description}
            </p>
            <p className="text-reetdach-400 text-sm">
              Teil der Blum Sylt Hotels Familie
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-xl mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-reetdach-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-reetdach-300 hover:text-white transition-colors">
                  Unterkünfte
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-reetdach-300 hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-reetdach-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl mb-4">Kontakt</h4>
            <ul className="space-y-3 text-reetdach-300">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Strandstraße 10<br />
                  25980 Sylt
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:info@${brand.domain}`} className="hover:text-white transition-colors">
                  info@{brand.domain}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+494651555123" className="hover:text-white transition-colors">
                  +49 4651 555 123
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-reetdach-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-reetdach-400">
              © {currentYear} {brand.name}. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6 text-sm text-reetdach-400">
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/agb" className="hover:text-white transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
