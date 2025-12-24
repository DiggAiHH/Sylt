/**
 * Zentrale Konstanten für die BLUM auf Sylt Website.
 * Single Source of Truth für Kontaktdaten und Markeninformationen.
 * Änderungen hier wirken sich auf alle Komponenten aus.
 */

// Kontaktinformationen - zentral verwaltet
export const CONTACT = {
  name: "Martina Blum",
  street: "Eidumweg 13",
  postalCode: "25980",
  city: "Sylt",
  fullAddress: "Eidumweg 13, 25980 Sylt",
  phone: "0172-4008846",
  phoneInternational: "+4917240088846",
  email: "blumsylt@web.de",
  website: "https://www.blumaufsylt.de",
} as const;

// Markeninformationen mit DPMA-Klassen
export const BRANDS = [
  {
    id: "fisch-blum-sylt",
    name: "Fisch Blum Sylt",
    href: "/fisch-blum-sylt",
    klasse: "Klasse 29",
    klasseDetail: "Fischerzeugnisse",
    description: "Premium Fischerzeugnisse aus der Nordsee",
    bgColor: "bg-nordsee",
    textColor: "text-nordsee",
  },
  {
    id: "blums-seafood-sylt",
    name: "Blum's Seafood Sylt",
    href: "/blums-seafood-sylt",
    klasse: "Klasse 29, 43",
    klasseDetail: "Seafood & Gastronomie",
    description: "Erstklassige Meeresfrüchte und gastronomische Dienstleistungen",
    bgColor: "bg-nordsee-light",
    textColor: "text-nordsee-light",
  },
  {
    id: "sylt-homes-by-blum",
    name: "Sylt Homes by Blum",
    href: "/sylt-homes-by-blum",
    klasse: "Klasse 36",
    klasseDetail: "Immobilien",
    description: "Exklusive Immobilien auf Sylt",
    bgColor: "bg-reetdach",
    textColor: "text-reetdach",
  },
  {
    id: "long-island-house-sylt",
    name: "Long Island House Sylt",
    href: "/long-island-house-sylt",
    klasse: "Klasse 36, 43",
    klasseDetail: "Ferienhäuser & Hospitality",
    description: "Premium Ferienhäuser mit erstklassigem Service",
    bgColor: "bg-reetdach-light",
    textColor: "text-reetdach-light",
  },
] as const;

// Navigation Items - abgeleitet aus BRANDS
export const NAVIGATION = [
  { name: "BLUM", href: "/" },
  ...BRANDS.map((brand) => ({ name: brand.name, href: brand.href })),
] as const;

// SEO Konstanten
export const SEO = {
  siteName: "BLUM auf Sylt",
  defaultTitle: "BLUM auf Sylt - Premium Markenportfolio",
  defaultDescription:
    "BLUM ist die Dachmarke für exklusive Fisch-Spezialitäten, Seafood, Immobilien und Ferienhäuser auf Sylt.",
  keywords: [
    "Sylt",
    "Fisch",
    "Seafood",
    "Immobilien",
    "Ferienhäuser",
    "Blum",
    "Premium",
    "Nordsee",
    "DPMA",
    "Marken",
  ],
  locale: "de_DE",
} as const;

// TypeScript Types für strikte Typisierung
export type Brand = (typeof BRANDS)[number];
export type NavigationItem = (typeof NAVIGATION)[number];
