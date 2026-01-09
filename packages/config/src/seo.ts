/**
 * SEO Configuration for Sylt Luxury Hotels
 * 
 * Centralized SEO utilities following best practices:
 * - Schema.org structured data (JSON-LD)
 * - Open Graph and Twitter Card metadata
 * - Canonical URL management
 * - Multi-site SEO consistency
 */

import type { Metadata } from 'next';

// Base SEO configuration for the hub
export const hubSeoConfig = {
  siteName: 'BLUM Sylt Hotels',
  siteUrl: 'https://blumsylthotels.de',
  locale: 'de_DE',
  twitterHandle: '@blumsylt',
  defaultImage: '/images/og-default.jpg',
  organization: {
    name: 'BLUM Sylt Hotels GmbH',
    logo: 'https://blumsylthotels.de/images/logo.png',
    address: {
      streetAddress: 'Strandweg 1',
      addressLocality: 'Westerland',
      addressRegion: 'Schleswig-Holstein',
      postalCode: '25980',
      addressCountry: 'DE',
    },
    telephone: '+49 4651 12345',
    email: 'info@blumsylthotels.de',
  },
} as const;

// Satellite-specific SEO configurations
export const satelliteSeoConfigs = {
  syltrooms: {
    siteName: 'Sylt Rooms',
    siteUrl: 'https://syltrooms.de',
    defaultTitle: 'Sylt Rooms | 10 Exklusive Hotelzimmer auf Sylt',
    defaultDescription: 'Entdecken Sie unsere 10 exklusiven Hotelzimmer mit Dünenblick auf Sylt. Luxus, Komfort und nordische Eleganz vereint.',
    defaultImage: '/images/syltrooms-og.jpg',
    keywords: ['Sylt Hotel', 'Boutique Hotel Sylt', 'Luxus Hotelzimmer', 'Dünenblick', 'Nordsee Urlaub'],
  },
  privathomes: {
    siteName: 'Privat Homes Sylt',
    siteUrl: 'https://privathomes.de',
    defaultTitle: 'Privat Homes | Exklusive Ferienhäuser auf Sylt',
    defaultDescription: 'Luxuriöse Ferienhäuser für gehobene Ansprüche. Privatsphäre und Komfort auf Deutschlands schönster Insel.',
    defaultImage: '/images/privathomes-og.jpg',
    keywords: ['Ferienhaus Sylt', 'Luxus Villa Sylt', 'Privathaus mieten', 'Exklusiver Urlaub'],
  },
  longislandhouse: {
    siteName: 'Long Island House Sylt',
    siteUrl: 'https://longislandhouse.de',
    defaultTitle: 'Long Island House | Hampton-Style auf Sylt',
    defaultDescription: 'Hampton-Style Eleganz trifft Sylter Charme. Erleben Sie amerikanischen Luxus an der Nordsee.',
    defaultImage: '/images/longislandhouse-og.jpg',
    keywords: ['Hampton Style', 'Long Island Haus', 'Amerikanischer Stil Sylt', 'Luxus Unterkunft'],
  },
  'auster-appartements': {
    siteName: 'Auster Appartements',
    siteUrl: 'https://auster-appartements.de',
    defaultTitle: 'Auster Appartements | Moderne Apartments auf Sylt',
    defaultDescription: 'Moderne Apartments im Herzen der Insel. Zentral gelegen mit allem Komfort für Ihren Sylt-Urlaub.',
    defaultImage: '/images/auster-og.jpg',
    keywords: ['Apartment Sylt', 'Ferienwohnung Sylt', 'Zentrale Lage', 'Modernes Wohnen'],
  },
  'beach-home': {
    siteName: 'Beach Home Sylt',
    siteUrl: 'https://beach-home.de',
    defaultTitle: 'Beach Home | Strandnahes Wohnen auf Sylt',
    defaultDescription: 'Direkt am Strand – Nordsee pur. Exklusive Strandunterkünfte mit Meerblick für unvergessliche Momente.',
    defaultImage: '/images/beachhome-og.jpg',
    keywords: ['Strandhaus Sylt', 'Meerblick', 'Beach House', 'Strandnah wohnen'],
  },
} as const;

export type SatelliteSeoId = keyof typeof satelliteSeoConfigs;

/**
 * Generate base metadata for Next.js pages
 * Includes Open Graph, Twitter Cards, and essential meta tags
 */
export function generateMetadata({
  title,
  description,
  path = '/',
  image,
  noindex = false,
  keywords = [],
  siteConfig = hubSeoConfig,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
  siteConfig?: typeof hubSeoConfig | typeof satelliteSeoConfigs[SatelliteSeoId];
}): Metadata {
  const url = `${'siteUrl' in siteConfig ? siteConfig.siteUrl : hubSeoConfig.siteUrl}${path}`;
  const ogImage = image || ('defaultImage' in siteConfig ? siteConfig.defaultImage : hubSeoConfig.defaultImage);
  const siteName = 'siteName' in siteConfig ? siteConfig.siteName : hubSeoConfig.siteName;

  return {
    title,
    description,
    keywords,
    authors: [{ name: hubSeoConfig.organization.name }],
    creator: hubSeoConfig.organization.name,
    publisher: hubSeoConfig.organization.name,
    // Indexing control
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    // Canonical URL prevents duplicate content issues
    alternates: {
      canonical: url,
      languages: {
        'de-DE': url,
      },
    },
    // Open Graph for social sharing (Facebook, LinkedIn)
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: hubSeoConfig.locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    // Twitter Card for Twitter/X sharing
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: hubSeoConfig.twitterHandle,
      site: hubSeoConfig.twitterHandle,
    },
    // Additional meta tags for better SEO
    other: {
      'format-detection': 'telephone=yes',
      'geo.region': 'DE-SH',
      'geo.placename': 'Sylt',
      'geo.position': '54.9079;8.3096',
      'ICBM': '54.9079, 8.3096',
    },
  };
}

/**
 * Schema.org Organization JSON-LD
 * Helps search engines understand the business entity
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: hubSeoConfig.organization.name,
    url: hubSeoConfig.siteUrl,
    logo: hubSeoConfig.organization.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: hubSeoConfig.organization.telephone,
      contactType: 'customer service',
      availableLanguage: ['German', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      ...hubSeoConfig.organization.address,
    },
    sameAs: [
      'https://instagram.com/blumsylt',
      'https://facebook.com/blumsylt',
      'https://pinterest.com/blumsylt',
    ],
  };
}

/**
 * Schema.org Hotel/LodgingBusiness JSON-LD
 * Essential for hotel SEO and rich snippets in Google
 */
export function generateHotelSchema({
  name,
  description,
  url,
  image,
  priceRange = '€€€',
  rating,
  reviewCount,
  amenities = [],
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  priceRange?: string;
  rating?: number;
  reviewCount?: number;
  amenities?: string[];
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name,
    description,
    url,
    image,
    priceRange,
    address: {
      '@type': 'PostalAddress',
      ...hubSeoConfig.organization.address,
    },
    telephone: hubSeoConfig.organization.telephone,
    email: hubSeoConfig.organization.email,
    amenityFeature: amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    })),
    checkinTime: '15:00',
    checkoutTime: '11:00',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    petsAllowed: true,
  };

  // Add aggregate rating if available
  if (rating && reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/**
 * Schema.org Product JSON-LD for individual rooms/properties
 * Enables rich product snippets in search results
 */
export function generateRoomSchema({
  name,
  description,
  image,
  price,
  currency = 'EUR',
  availability = 'InStock',
  url,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      seller: {
        '@type': 'Organization',
        name: hubSeoConfig.organization.name,
      },
    },
    brand: {
      '@type': 'Brand',
      name: hubSeoConfig.siteName,
    },
  };
}

/**
 * Schema.org BreadcrumbList JSON-LD
 * Improves navigation display in search results
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Schema.org FAQPage JSON-LD
 * Enables FAQ rich snippets in search results
 */
export function generateFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Schema.org LocalBusiness JSON-LD with opening hours
 * For local search optimization
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: hubSeoConfig.organization.name,
    image: hubSeoConfig.organization.logo,
    address: {
      '@type': 'PostalAddress',
      ...hubSeoConfig.organization.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 54.9079,
      longitude: 8.3096,
    },
    url: hubSeoConfig.siteUrl,
    telephone: hubSeoConfig.organization.telephone,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };
}

/**
 * Generate viewport meta tag configuration
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2C5F77', // Nordsee-Blau
};

/**
 * Generate common link preconnect hints
 * Improves performance for external resources
 * 
 * HINWEIS: Google Fonts wurden entfernt (DSGVO-Konformität)
 * Fonts werden lokal via next/font geladen
 */
export const preconnectLinks = [
  // DSGVO-konform: Keine Google Fonts preconnect mehr nötig
  // Fonts werden jetzt lokal via next/font gehostet
  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
  { rel: 'dns-prefetch', href: 'https://js.stripe.com' },
];
