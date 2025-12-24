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

/** Structured data for SEO (JSON-LD) */
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
