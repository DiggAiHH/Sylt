import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Privat Homes SEO Metadata
 * Optimized for luxury vacation home search visibility
 */
export const metadata: Metadata = {
  title: {
    default: 'Privat Homes | Luxuriöse Ferienhäuser auf Sylt',
    template: '%s | Privat Homes Sylt',
  },
  description:
    'Exklusive Ferienhäuser für gehobene Ansprüche auf Sylt. Privatsphäre, Luxus und nordische Eleganz in handverlesenen Villen.',
  keywords: [
    'Ferienhaus Sylt',
    'Luxus Villa Sylt',
    'Privathaus mieten Sylt',
    'Exklusiver Urlaub Nordsee',
    'Ferienvilla Sylt',
    'Premium Ferienhaus',
    'Sylt Luxusunterkunft',
  ],
  authors: [{ name: 'BLUM Sylt Hotels GmbH' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://privathomes.de' },
  openGraph: {
    title: 'Privat Homes | Luxuriöse Ferienhäuser auf Sylt',
    description: 'Exklusive Ferienhäuser für gehobene Ansprüche',
    url: 'https://privathomes.de',
    siteName: 'Privat Homes Sylt',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: '/images/og-privathomes.jpg', width: 1200, height: 630, alt: 'Privat Homes Sylt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privat Homes | Luxuriöse Ferienhäuser auf Sylt',
    description: 'Exklusive Ferienhäuser für gehobene Ansprüche',
    images: ['/images/og-privathomes.jpg'],
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
              '@type': 'LodgingBusiness',
              name: 'Privat Homes Sylt',
              description: 'Exklusive Ferienhäuser für gehobene Ansprüche auf Sylt',
              url: 'https://privathomes.de',
              priceRange: '€€€€',
              address: { '@type': 'PostalAddress', addressLocality: 'Sylt', addressCountry: 'DE' },
              aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 34, bestRating: 5 },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
