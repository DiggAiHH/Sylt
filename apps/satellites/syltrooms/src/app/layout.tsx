import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Sylt Rooms SEO Metadata
 * Optimized for boutique hotel search visibility
 */
export const metadata: Metadata = {
  title: {
    default: 'Sylt Rooms | 10 Exklusive Hotelzimmer auf Sylt',
    template: '%s | Sylt Rooms',
  },
  description:
    'Entdecken Sie unsere 10 exklusiven Hotelzimmer mit Dünenblick auf Sylt. Luxus, Komfort und nordische Eleganz in zentraler Lage von Westerland.',
  keywords: [
    'Sylt Hotel',
    'Hotelzimmer Sylt',
    'Boutique Hotel Sylt',
    'Luxus Zimmer Nordsee',
    'Dünenblick Sylt',
    'Westerland Hotel',
    'Nordsee Urlaub',
    'Sylt Unterkunft',
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
    canonical: 'https://syltrooms.de',
  },
  openGraph: {
    title: 'Sylt Rooms | 10 Exklusive Hotelzimmer',
    description: 'Luxus-Hotelzimmer mit Dünenblick auf Deutschlands schönster Insel',
    url: 'https://syltrooms.de',
    siteName: 'Sylt Rooms',
    type: 'website',
    locale: 'de_DE',
    images: [
      {
        url: '/images/og-syltrooms.jpg',
        width: 1200,
        height: 630,
        alt: 'Sylt Rooms - Exklusive Hotelzimmer mit Dünenblick',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sylt Rooms | 10 Exklusive Hotelzimmer',
    description: 'Luxus-Hotelzimmer mit Dünenblick auf Sylt',
    images: ['/images/og-syltrooms.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data: Hotel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Sylt Rooms',
              description: '10 exklusive Hotelzimmer mit Dünenblick auf Sylt',
              url: 'https://syltrooms.de',
              priceRange: '€€€',
              numberOfRooms: 10,
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
              checkinTime: '15:00',
              checkoutTime: '11:00',
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Kostenloses WLAN' },
                { '@type': 'LocationFeatureSpecification', name: 'Frühstück inklusive' },
                { '@type': 'LocationFeatureSpecification', name: 'Dünenblick' },
                { '@type': 'LocationFeatureSpecification', name: 'Strandnähe' },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: 4.9,
                reviewCount: 87,
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
