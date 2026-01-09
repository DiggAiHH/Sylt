import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

// DSGVO-konforme Schriftarten via next/font (lokal gehostet)
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Long Island House SEO Metadata
 * Optimized for Hampton-style accommodation search visibility
 */
export const metadata: Metadata = {
  title: {
    default: 'Long Island House | Hampton-Style auf Sylt',
    template: '%s | Long Island House Sylt',
  },
  description:
    'Hampton-Style Eleganz trifft Sylter Charme. Exklusive Unterkunft im amerikanischen East Coast Design – einzigartig auf Sylt.',
  keywords: [
    'Hampton Style Sylt',
    'Long Island Haus',
    'Amerikanischer Stil Unterkunft',
    'East Coast Design',
    'Luxus Hampton',
    'Sylt Design Hotel',
    'Unique Accommodation Sylt',
  ],
  authors: [{ name: 'BLUM Sylt Hotels GmbH' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://longislandhouse.de' },
  openGraph: {
    title: 'Long Island House | Hampton-Style auf Sylt',
    description: 'Hampton-Style Eleganz trifft Sylter Charme',
    url: 'https://longislandhouse.de',
    siteName: 'Long Island House Sylt',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: '/images/og-longislandhouse.jpg', width: 1200, height: 630, alt: 'Long Island House Sylt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Long Island House | Hampton-Style auf Sylt',
    description: 'Hampton-Style Eleganz trifft Sylter Charme',
    images: ['/images/og-longislandhouse.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8B9DC3', // Hampton blue
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* DSGVO-konform: Keine externen Font-Verbindungen */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              name: 'Long Island House Sylt',
              description: 'Hampton-Style Eleganz trifft Sylter Charme',
              url: 'https://longislandhouse.de',
              priceRange: '€€€€',
              address: { '@type': 'PostalAddress', addressLocality: 'Sylt', addressCountry: 'DE' },
              aggregateRating: { '@type': 'AggregateRating', ratingValue: 5.0, reviewCount: 28, bestRating: 5 },
            }),
          }}
        />
      </head>
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}
