import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Beach Home SEO Metadata
 * Optimized for beachfront accommodation search visibility
 */
export const metadata: Metadata = {
  title: {
    default: 'Beach Home | Strandnahes Wohnen auf Sylt',
    template: '%s | Beach Home Sylt',
  },
  description:
    'Direkt am Strand – Nordsee pur. Exklusive Strandunterkünfte mit Meerblick auf Sylt für unvergessliche Urlaubsmomente an der Nordsee.',
  keywords: [
    'Strandhaus Sylt',
    'Beach House Nordsee',
    'Meerblick Sylt',
    'Strandnah wohnen',
    'Nordsee Ferienhaus',
    'Sylt Strand',
    'Beachfront Unterkunft',
    'Sylt Urlaub am Meer',
  ],
  authors: [{ name: 'BLUM Sylt Hotels GmbH' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://beach-home.de',
  },
  openGraph: {
    title: 'Beach Home | Strandnahes Wohnen auf Sylt',
    description: 'Exklusive Strandunterkünfte mit Meerblick – Nordsee pur',
    url: 'https://beach-home.de',
    siteName: 'Beach Home Sylt',
    type: 'website',
    locale: 'de_DE',
    images: [
      {
        url: '/images/og-beachhome.jpg',
        width: 1200,
        height: 630,
        alt: 'Beach Home Sylt - Strandunterkünfte mit Meerblick',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beach Home | Strandnahes Wohnen auf Sylt',
    description: 'Exklusive Strandunterkünfte mit Meerblick',
    images: ['/images/og-beachhome.jpg'],
  },
};

/**
 * Viewport configuration
 */
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

        {/* Structured Data: VacationRental */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              name: 'Beach Home Sylt',
              description: 'Exklusive Strandunterkünfte mit Meerblick auf Sylt',
              url: 'https://beach-home.de',
              priceRange: '€€€',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Strandweg 1',
                addressLocality: 'Westerland',
                addressRegion: 'Schleswig-Holstein',
                postalCode: '25980',
                addressCountry: 'DE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 54.9079,
                longitude: 8.3096,
              },
              telephone: '+49-4651-12345',
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Meerblick' },
                { '@type': 'LocationFeatureSpecification', name: 'Direkter Strandzugang' },
                { '@type': 'LocationFeatureSpecification', name: 'Kostenloses WLAN' },
                { '@type': 'LocationFeatureSpecification', name: 'Terrasse' },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: 4.8,
                reviewCount: 42,
                bestRating: 5,
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
