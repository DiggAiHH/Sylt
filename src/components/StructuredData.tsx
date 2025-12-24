/**
 * Strukturierte Daten (JSON-LD) für SEO.
 * Verbessert die Sichtbarkeit in Suchmaschinen durch Rich Snippets.
 * Schema.org konforme Implementierung.
 */

import { CONTACT, BRANDS, SEO } from "@/lib/constants";

// Organization Schema für die Hauptseite
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.siteName,
    url: CONTACT.website,
    logo: `${CONTACT.website}/logo.png`,
    description: SEO.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      postalCode: CONTACT.postalCode,
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneInternational,
      email: CONTACT.email,
      contactType: "customer service",
      availableLanguage: ["German"],
    },
    // Untermarken als SubOrganizations
    subOrganization: BRANDS.map((brand) => ({
      "@type": "Brand",
      name: brand.name,
      url: `${CONTACT.website}${brand.href}`,
      description: brand.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema für lokale Suchanfragen
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO.siteName,
    description: SEO.defaultDescription,
    url: CONTACT.website,
    telephone: CONTACT.phoneInternational,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      postalCode: CONTACT.postalCode,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Sylt Koordinaten (ungefähr)
      latitude: 54.9079,
      longitude: 8.3275,
    },
    areaServed: {
      "@type": "Place",
      name: "Sylt, Deutschland",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema für bessere Navigation in Suchergebnissen
interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${CONTACT.website}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema für Sitelinks Searchbox
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.siteName,
    url: CONTACT.website,
    // Verwende SEO.locale für Konsistenz, konvertiert zu BCP 47 Format
    inLanguage: SEO.locale.replace("_", "-"),
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
