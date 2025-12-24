/**
 * Central configuration for the BLUM brand website
 * Single source of truth for all brand data, contact info, and site configuration
 * Ensures consistency across all pages and components
 */

import type { 
  SubBrand, 
  ContactInfo, 
  NavBrand, 
  Feature, 
  OrganizationSchema, 
  LocalBusinessSchema,
  BreadcrumbSchema,
  WebPageSchema 
} from "./types";

/** Primary contact information - used across all pages */
export const CONTACT: ContactInfo = {
  name: "Martina Blum",
  street: "Eidumweg 13",
  zip: "25980",
  city: "Sylt",
  phone: "+491724008846",
  phoneFormatted: "0172-4008846",
  email: "blumsylt@web.de",
} as const;

/** Site metadata configuration */
export const SITE_CONFIG = {
  name: "BLUM",
  url: "https://www.blumaufsylt.de",
  title: "BLUM | Markenportfolio Sylt",
  description: "BLUM - Dachmarke für Premium-Marken aus Sylt: Fisch-Spezialitäten, Seafood, Ferienhäuser und mehr.",
  locale: "de_DE",
  language: "de",
} as const;

/** Geographic coordinates for Sylt (for LocalBusiness schema) */
export const GEO_COORDINATES = {
  latitude: 54.9079,
  longitude: 8.3507,
} as const;

/** Color palette - matches Tailwind config */
export const COLORS = {
  deepSeaBlue: "#0A2540",
  richGold: "#C9A962",
  background: "#F8F9FA",
} as const;

/** Navigation brands - for header and footer */
export const NAV_BRANDS: readonly NavBrand[] = [
  { name: "BLUM", href: "/" },
  { name: "Fisch Blum Sylt", href: "/fisch-blum-sylt" },
  { name: "Blum's Seafood Sylt", href: "/blums-seafood-sylt" },
  { name: "Sylt Homes by Blum", href: "/sylt-homes-by-blum" },
  { name: "Long Island House Sylt", href: "/long-island-house-sylt" },
] as const;

/** Sub-brands with full details - for homepage cards and SEO */
export const SUB_BRANDS: readonly SubBrand[] = [
  {
    name: "Fisch Blum Sylt",
    href: "/fisch-blum-sylt",
    description: "Premium Fisch-Spezialitäten",
    icon: "🐟",
    tagline: "Traditionelle Handwerkskunst seit Generationen",
  },
  {
    name: "Blum's Seafood Sylt",
    href: "/blums-seafood-sylt",
    description: "Exquisite Meeresfrüchte",
    icon: "🦐",
    tagline: "Frisch aus den Gewässern der Nordsee",
  },
  {
    name: "Sylt Homes by Blum",
    href: "/sylt-homes-by-blum",
    description: "Luxuriöse Ferienunterkünfte",
    icon: "🏡",
    tagline: "Ihr Zuhause auf Zeit an der Nordsee",
  },
  {
    name: "Long Island House Sylt",
    href: "/long-island-house-sylt",
    description: "Exklusives Ferienhaus",
    icon: "🏠",
    tagline: "Amerikanischer Charme trifft Sylter Eleganz",
  },
] as const;

/** Features for "Warum BLUM?" section */
export const FEATURES: readonly Feature[] = [
  {
    title: "DPMA-registriert",
    description: "Alle Marken sind beim Deutschen Patent- und Markenamt geschützt",
    iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Tradition",
    description: "Seit Generationen verwurzelt in der maritimen Kultur Sylts",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Premium-Qualität",
    description: "Höchste Standards in Produkten und Dienstleistungen",
    iconPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
] as const;

/** All pages for sitemap generation */
export const ALL_PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/fisch-blum-sylt", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blums-seafood-sylt", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sylt-homes-by-blum", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/long-island-house-sylt", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
] as const;

/** Generates Organization schema for SEO (JSON-LD) */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      postalCode: CONTACT.zip,
      addressLocality: CONTACT.city,
      addressCountry: "DE",
    },
  };
}

/** Generates LocalBusiness schema for local SEO */
export function generateLocalBusinessSchema(brandName?: string): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brandName || SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      postalCode: CONTACT.zip,
      addressLocality: CONTACT.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    areaServed: "Sylt, Schleswig-Holstein, Deutschland",
    priceRange: "€€€",
  };
}

/** Generates Breadcrumb schema for navigation SEO */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

/** Generates WebPage schema for page-level SEO */
export function generateWebPageSchema(
  pageName: string,
  pageDescription: string,
  pagePath: string,
  breadcrumbs?: Array<{ name: string; path: string }>
): WebPageSchema {
  const schema: WebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    description: pageDescription,
    url: `${SITE_CONFIG.url}${pagePath}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
  
  // Add breadcrumb if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    return {
      ...schema,
      breadcrumb: generateBreadcrumbSchema(breadcrumbs),
    };
  }
  
  return schema;
}

/** Format full address for display */
export function formatFullAddress(): string {
  return `${CONTACT.street}, ${CONTACT.zip} ${CONTACT.city}`;
}

/** Generate canonical URL for a path */
export function getCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}
