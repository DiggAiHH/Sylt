import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Comprehensive SEO metadata for the Hub
 * Optimized for search engines, social sharing, and accessibility
 */
export const metadata: Metadata = {
  // Core metadata
  title: {
    default: 'BLUM Sylt Hotels | Exklusive Unterkünfte auf Sylt',
    template: '%s | BLUM Sylt Hotels',
  },
  description:
    'Entdecken Sie unsere exklusiven Luxus-Unterkünfte auf Sylt. 5 einzigartige Häuser: Hotelzimmer, Apartments, Ferienhäuser und Strandhäuser mit erstklassigem Service an der Nordsee.',
  keywords: [
    'Sylt',
    'Luxus Hotel Sylt',
    'Ferienhaus Sylt',
    'Apartment Sylt',
    'Strandhaus Sylt',
    'Nordsee Urlaub',
    'Premium Unterkunft Sylt',
    'Boutique Hotel Nordsee',
    'Ferienwohnung Sylt',
    'Luxusurlaub Deutschland',
    'Sylt Urlaub',
    'Westerland Hotel',
  ],

  // Authorship and ownership
  authors: [{ name: 'BLUM Sylt Hotels GmbH' }],
  creator: 'BLUM Sylt Hotels GmbH',
  publisher: 'BLUM Sylt Hotels GmbH',

  // Favicon and icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // App manifest for PWA
  manifest: '/manifest.json',

  // Search engine indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical and alternate URLs
  alternates: {
    canonical: 'https://blumsylthotels.de',
    languages: {
      'de-DE': 'https://blumsylthotels.de',
    },
  },

  // Open Graph for social sharing (Facebook, LinkedIn)
  openGraph: {
    title: 'BLUM Sylt Hotels | Exklusive Unterkünfte auf Sylt',
    description:
      'Entdecken Sie unsere exklusiven Luxus-Unterkünfte auf Sylt. Hotels, Apartments, Ferienhäuser und Strandhäuser mit erstklassigem Service.',
    url: 'https://blumsylthotels.de',
    siteName: 'BLUM Sylt Hotels',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'BLUM Sylt Hotels - Exklusive Unterkünfte auf Sylt',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'BLUM Sylt Hotels | Exklusive Unterkünfte auf Sylt',
    description:
      'Entdecken Sie unsere exklusiven Luxus-Unterkünfte auf Sylt. Hotels, Apartments, Ferienhäuser und Strandhäuser.',
    creator: '@blumsylt',
    site: '@blumsylt',
    images: ['/opengraph-image'],
  },

  // Verification for search consoles
  verification: {
    google: 'google-site-verification-code', // Replace with actual code
  },

  // App-specific metadata
  applicationName: 'BLUM Sylt Hotels',
  category: 'travel',

  // Geographic targeting
  other: {
    'geo.region': 'DE-SH',
    'geo.placename': 'Sylt',
    'geo.position': '54.9079;8.3096',
    ICBM: '54.9079, 8.3096',
    'format-detection': 'telephone=yes',
  },
};

/**
 * Viewport configuration
 * Optimized for mobile devices and theme consistency
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFCFA' },
    { media: '(prefers-color-scheme: dark)', color: '#2C5F77' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" dir="ltr">
      <head>
        {/* Preconnect to external resources for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BLUM Sylt Hotels GmbH',
              url: 'https://blumsylthotels.de',
              logo: 'https://blumsylthotels.de/images/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+49-4651-12345',
                contactType: 'customer service',
                availableLanguage: ['German', 'English'],
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Strandweg 1',
                addressLocality: 'Westerland',
                addressRegion: 'Schleswig-Holstein',
                postalCode: '25980',
                addressCountry: 'DE',
              },
              sameAs: [
                'https://instagram.com/blumsylt',
                'https://facebook.com/blumsylt',
                'https://pinterest.com/blumsylt',
              ],
            }),
          }}
        />

        {/* Structured Data: Hotel/LodgingBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              name: 'BLUM Sylt Hotels',
              description:
                'Exklusive Luxus-Unterkünfte auf Sylt. Hotels, Apartments, Ferienhäuser und Strandhäuser.',
              url: 'https://blumsylthotels.de',
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
              email: 'info@blumsylthotels.de',
              checkinTime: '15:00',
              checkoutTime: '11:00',
              currenciesAccepted: 'EUR',
              paymentAccepted: 'Cash, Credit Card',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: 4.9,
                reviewCount: 156,
                bestRating: 5,
                worstRating: 1,
              },
            }),
          }}
        />

        {/* Structured Data: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'BLUM Sylt Hotels',
              url: 'https://blumsylthotels.de',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://blumsylthotels.de/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
