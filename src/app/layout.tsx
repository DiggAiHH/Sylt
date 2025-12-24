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
    <header className="bg-white/95 backdrop-blur-sm border-b-2 border-sand-dark/30 sticky top-0 z-50">
      {/* Skip Link für Accessibility - größer und deutlicher */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Hauptnavigation">
        <div className="flex justify-between items-center h-24">
          {/* Logo größer für bessere Sichtbarkeit */}
          <Link 
            href="/" 
            className="text-3xl font-medium tracking-widest text-nordsee hover:text-nordsee-dark py-2 px-1"
            aria-label="BLUM Startseite"
          >
            BLUM
          </Link>
          {/* Navigation mit größeren Links und mehr Abstand */}
          <div className="hidden lg:flex space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-reetdach-dark hover:text-nordsee tracking-wide transition-colors py-3 px-2 rounded-lg hover:bg-sand-light"
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
    <footer className="bg-reetdach-dark text-white py-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-2xl font-medium tracking-widest mb-8">BLUM</h3>
            <p className="text-sand-light text-base leading-relaxed">
              Premium Markenportfolio auf Sylt - 
              Fisch-Spezialitäten, Seafood, Immobilien & Ferienhäuser.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium tracking-wide mb-8">Marken</h3>
            <ul className="space-y-4 text-sand-light text-base">
              {NAVIGATION.slice(1).map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="hover:text-white transition-colors py-2 inline-block underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium tracking-wide mb-8">Kontakt</h3>
            <address className="not-italic text-sand-light text-base leading-loose space-y-3">
              <p className="font-semibold text-white text-lg">{CONTACT.name}</p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {CONTACT.fullAddress}
              </p>
              {/* Telefonnummer prominent hervorgehoben für Senioren */}
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href={`tel:${CONTACT.phoneInternational}`} 
                  className="text-white font-semibold text-lg hover:underline underline-offset-4"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${CONTACT.email}`} 
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/20 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sand-light text-base">
          <p>© {new Date().getFullYear()} {SEO.siteName}. Alle Rechte vorbehalten.</p>
          <nav className="flex gap-8" aria-label="Rechtliche Links">
            <Link 
              href="/impressum" 
              className="hover:text-white transition-colors py-2 underline-offset-4 hover:underline"
            >
              Impressum
            </Link>
            <Link 
              href="/datenschutz" 
              className="hover:text-white transition-colors py-2 underline-offset-4 hover:underline"
            >
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
