import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Auster Appartements SEO Metadata
 * Optimized for modern apartment search visibility
 */
export const metadata: Metadata = {
  title: {
    default: 'Auster Appartements | Moderne Apartments auf Sylt',
    template: '%s | Auster Appartements',
  },
  description:
    'Moderne Apartments im Herzen der Insel. Komfort und zeitgenössisches Design für den perfekten Sylt-Urlaub in zentraler Lage.',
  keywords: [
    'Apartment Sylt',
    'Ferienwohnung Sylt',
    'Moderne Unterkunft Sylt',
    'Zentrale Lage Sylt',
    'Design Apartment Nordsee',
    'Sylt Ferienwohnung buchen',
    'Westerland Apartment',
  ],
  authors: [{ name: 'BLUM Sylt Hotels GmbH' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://auster-appartements.de' },
  openGraph: {
    title: 'Auster Appartements | Moderne Apartments auf Sylt',
    description: 'Moderne Apartments im Herzen der Insel',
    url: 'https://auster-appartements.de',
    siteName: 'Auster Appartements',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: '/images/og-auster.jpg', width: 1200, height: 630, alt: 'Auster Appartements Sylt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auster Appartements | Moderne Apartments auf Sylt',
    description: 'Moderne Apartments im Herzen der Insel',
    images: ['/images/og-auster.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2C5F77',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ApartmentComplex',
              name: 'Auster Appartements',
              description: 'Moderne Apartments im Herzen von Sylt',
              url: 'https://auster-appartements.de',
              priceRange: '€€',
              address: { '@type': 'PostalAddress', addressLocality: 'Westerland', addressCountry: 'DE' },
              aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.7, reviewCount: 53, bestRating: 5 },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
