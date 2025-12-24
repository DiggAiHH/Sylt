/**
 * Root Layout für die BLUM auf Sylt Website.
 * Enthält globale Navigation, Footer und strukturierte Daten für SEO.
 */

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";
import ScrollToTop from "@/components/ScrollToTop";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from "@/components/StructuredData";
import { CONTACT, NAVIGATION, SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  authors: [{ name: CONTACT.name }],
  creator: CONTACT.name,
  publisher: SEO.siteName,
  metadataBase: new URL(CONTACT.website),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: CONTACT.website,
    siteName: SEO.siteName,
    locale: SEO.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Navigation wird aus den zentralen Konstanten exportiert
export { NAVIGATION as navigation } from "@/lib/constants";

function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-sand-dark/20 sticky top-0 z-50">
      {/* Skip Link für Accessibility */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Hauptnavigation">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-light tracking-widest text-nordsee hover:text-nordsee-dark">
            BLUM
          </Link>
          <div className="hidden lg:flex space-x-6">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-reetdach hover:text-nordsee tracking-wide transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* NAVIGATION ist readonly, MobileMenu mutiert die Daten nicht */}
          <MobileMenu navigation={NAVIGATION as unknown as { name: string; href: string }[]} />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-reetdach-dark text-white py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-light tracking-widest mb-6">BLUM</h3>
            <p className="text-sand-light/80 text-sm leading-relaxed">
              Premium Markenportfolio auf Sylt - 
              Fisch-Spezialitäten, Seafood, Immobilien & Ferienhäuser.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">Marken</h3>
            <ul className="space-y-3 text-sand-light/80 text-sm">
              {NAVIGATION.slice(1).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">Kontakt</h3>
            <address className="not-italic text-sand-light/80 text-sm leading-relaxed space-y-2">
              <p className="font-medium text-white">{CONTACT.name}</p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {CONTACT.fullAddress}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${CONTACT.phoneInternational}`} className="hover:text-white transition-colors">
                  {CONTACT.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sand-light/60 text-sm">
          <p>© {new Date().getFullYear()} {SEO.siteName}. Alle Rechte vorbehalten.</p>
          <nav className="flex gap-6" aria-label="Rechtliche Links">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* Structured Data für SEO */}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
