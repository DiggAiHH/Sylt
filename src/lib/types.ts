/**
 * Type definitions for the BLUM brand website
 * Centralizes all TypeScript interfaces for type safety and maintainability
 */

/** Represents a sub-brand under the BLUM umbrella */
export interface SubBrand {
  readonly name: string;
  readonly href: string;
  readonly description: string;
  readonly icon: string;
  readonly tagline: string;
}

/** Nice class for DPMA trademark registration */
export interface NiceClass {
  readonly number: number;
  readonly name: string;
  readonly description: string;
}

/** Contact information structure */
export interface ContactInfo {
  readonly name: string;
  readonly street: string;
  readonly zip: string;
  readonly city: string;
  readonly phone: string;
  readonly phoneFormatted: string;
  readonly email: string;
}

/** Navigation brand item */
export interface NavBrand {
  readonly name: string;
  readonly href: string;
}

/** Feature item for "Warum BLUM?" section */
export interface Feature {
  readonly title: string;
  readonly description: string;
  readonly iconPath: string;
}

/** Logo size configuration */
export interface LogoSize {
  readonly width: number;
  readonly height: number;
  readonly symbolFontSize: number;
  readonly initialFontSize: number;
}

/** Structured data for SEO (JSON-LD) - Organization */
export interface OrganizationSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "Organization";
  readonly name: string;
  readonly url: string;
  readonly logo?: string;
  readonly contactPoint: {
    readonly "@type": "ContactPoint";
    readonly telephone: string;
    readonly email: string;
    readonly contactType: string;
  };
  readonly address: {
    readonly "@type": "PostalAddress";
    readonly streetAddress: string;
    readonly postalCode: string;
    readonly addressLocality: string;
    readonly addressCountry: string;
  };
}

/** Structured data for SEO (JSON-LD) - LocalBusiness */
export interface LocalBusinessSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "LocalBusiness";
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly telephone: string;
  readonly email: string;
  readonly address: {
    readonly "@type": "PostalAddress";
    readonly streetAddress: string;
    readonly postalCode: string;
    readonly addressLocality: string;
    readonly addressCountry: string;
  };
  readonly geo?: {
    readonly "@type": "GeoCoordinates";
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly areaServed?: string;
  readonly priceRange?: string;
}

/** Structured data for SEO (JSON-LD) - BreadcrumbList */
export interface BreadcrumbSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "BreadcrumbList";
  readonly itemListElement: readonly BreadcrumbItem[];
}

export interface BreadcrumbItem {
  readonly "@type": "ListItem";
  readonly position: number;
  readonly name: string;
  readonly item: string;
}

/** Structured data for SEO (JSON-LD) - WebPage */
export interface WebPageSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "WebPage";
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly isPartOf: {
    readonly "@type": "WebSite";
    readonly name: string;
    readonly url: string;
  };
  readonly breadcrumb?: BreadcrumbSchema;
}

/** SEO metadata for pages */
export interface PageSEO {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly canonicalUrl: string;
}
