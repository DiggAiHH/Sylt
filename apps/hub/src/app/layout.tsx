import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import { DachmarkenNavigation, DachmarkenFooter, ToastProvider, PageTransition } from '@sylt/ui';
import './globals.css';

// DSGVO-konform: Fonts werden lokal via next/font geladen (kein externer Request)
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

/**
 * Blum Sylt Hub SEO Metadata
 * Central booking platform for all Blum brands
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://blumaufsylt.de'),
  title: {
    default: 'Blum Sylt Hotels | Exklusive Ferienwohnungen & Hotels auf Sylt',
    template: '%s | Blum Sylt Hotels',
  },
  description: 'Entdecken Sie unsere handverlesene Kollektion exklusiver Unterkünfte auf Sylt. Von Reetdach-Romantik bis Hampton Style – finden Sie Ihr perfektes Zuhause auf Zeit.',
  keywords: [
    'Sylt Ferienwohnung',
    'Sylt Hotel',
    'Luxus Urlaub Sylt',
    'Nordsee Unterkunft',
    'Westerland Ferienwohnung',
    'Kampen Hotel',
    'Sylt Reetdachhaus',
    'Blum Sylt',
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
    canonical: 'https://blumaufsylt.de',
  },
  openGraph: {
    title: 'Blum Sylt Hotels | Exklusive Unterkünfte auf Sylt',
    description: 'Quiet Luxury trifft norddeutsche Gastfreundschaft. Buchen Sie direkt bei uns.',
    url: 'https://blumaufsylt.de',
    siteName: 'Blum Sylt Hotels',
    type: 'website',
    locale: 'de_DE',
    images: [
      {
        url: '/images/og-blum-sylt.jpg',
        width: 1200,
        height: 630,
        alt: 'Blum Sylt Hotels - Exklusive Unterkünfte mit Nordsee-Blick',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blum Sylt Hotels | Exklusive Unterkünfte',
    description: 'Quiet Luxury auf Deutschlands schönster Insel',
    images: ['/images/og-blum-sylt.jpg'],
  },
};

/**
 * Viewport configuration
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3d3a36',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" dir="ltr" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* DSGVO-konform: Keine externen Font-Verbindungen nötig */}
        
        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BLUM Sylt Hotels GmbH',
              url: 'https://blumaufsylt.de',
              logo: 'https://blumaufsylt.de/logo.svg',
              description: 'Kollektion exklusiver Ferienunterkünfte auf Sylt',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sylt',
                addressRegion: 'Schleswig-Holstein',
                addressCountry: 'DE',
              },
              sameAs: [
                'https://www.instagram.com/blumaufsylt',
                'https://www.facebook.com/blumaufsylt',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-offwhite text-reetdach-900 font-body">
        <ToastProvider>
          <DachmarkenNavigation />
          <PageTransition>
            {children}
          </PageTransition>
          <DachmarkenFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
