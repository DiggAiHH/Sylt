import type { Brand, BrandId } from '../types';

// Sylt-inspired color palette - Quiet Luxury theme
export const colors = {
  // Sand - warm beige tones
  sand: {
    50: '#faf8f5',
    100: '#f5f0e8',
    200: '#ebe3d5',
    300: '#dcd0bc',
    400: '#c9b89e',
    500: '#b8a182',
    600: '#a08a6a',
    700: '#857158',
    800: '#6d5c4a',
    900: '#5a4c3e',
  },
  // Reetdach-Grau - thatched roof grey
  reetdach: {
    50: '#f7f7f6',
    100: '#e8e7e4',
    200: '#d4d2cd',
    300: '#b8b5ae',
    400: '#9a968d',
    500: '#7f7a70',
    600: '#68635a',
    700: '#55514a',
    800: '#47443e',
    900: '#3d3a36',
  },
  // Nordsee-Blau - North Sea blue
  nordsee: {
    50: '#f0f7fa',
    100: '#dceef5',
    200: '#bde0ed',
    300: '#8ecce0',
    400: '#58b1cd',
    500: '#3896b5',
    600: '#2d7a99',
    700: '#28647d',
    800: '#265467',
    900: '#244757',
  },
  // Neutral whites and blacks
  white: '#ffffff',
  offwhite: '#fdfcfa',
  black: '#1a1918',
} as const;

// Typography - Serif for luxury feel
export const typography = {
  fonts: {
    serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  lineHeights: {
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// Spacing scale
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

// Brand configurations
export const brands: Record<BrandId, Brand> = {
  syltrooms: {
    id: 'syltrooms',
    name: 'Sylt Rooms',
    domain: 'syltrooms.de',
    tagline: 'Exklusives Wohnen auf der Insel',
    description: 'Stilvolle Apartments und Suiten im Herzen von Sylt',
    logo: '/brands/syltrooms/logo.svg',
    primaryColor: colors.nordsee[600],
    secondaryColor: colors.sand[200],
    accentColor: colors.reetdach[700],
  },
  privathomes: {
    id: 'privathomes',
    name: 'Privat Homes Sylt',
    domain: 'privathomes.de',
    tagline: 'Ihr privates Refugium',
    description: 'Exklusive Ferienhäuser für anspruchsvolle Gäste',
    logo: '/brands/privathomes/logo.svg',
    primaryColor: colors.reetdach[700],
    secondaryColor: colors.sand[100],
    accentColor: colors.nordsee[500],
  },
  longislandhouse: {
    id: 'longislandhouse',
    name: 'Long Island House',
    domain: 'longislandhouse.de',
    tagline: 'Amerikanischer Chic trifft Sylt',
    description: 'Stilvolle Apartments im Long Island Style',
    logo: '/brands/longislandhouse/logo.svg',
    primaryColor: colors.sand[600],
    secondaryColor: colors.nordsee[100],
    accentColor: colors.nordsee[600],
  },
  'auster-appartements': {
    id: 'auster-appartements',
    name: 'Auster Appartements',
    domain: 'auster-appartements.de',
    tagline: 'Maritime Eleganz',
    description: 'Geschmackvoll eingerichtete Appartements',
    logo: '/brands/auster/logo.svg',
    primaryColor: colors.nordsee[700],
    secondaryColor: colors.sand[50],
    accentColor: colors.sand[500],
  },
  'beach-home': {
    id: 'beach-home',
    name: 'Beach Home Sylt',
    domain: 'beach-home.de',
    tagline: 'Leben am Strand',
    description: 'Moderne Ferienwohnungen mit Meerblick',
    logo: '/brands/beach-home/logo.svg',
    primaryColor: colors.sand[500],
    secondaryColor: colors.nordsee[50],
    accentColor: colors.nordsee[600],
  },
};

// Hub configuration
export const hubConfig = {
  baseUrl: process.env.NEXT_PUBLIC_HUB_URL || 'https://booking.blumsylthotels.de',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.blumsylthotels.de',
  stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
} as const;

// Animation presets for Framer Motion
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  parallax: {
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const;

export function getBrand(brandId: BrandId): Brand {
  return brands[brandId];
}

export function getAllBrands(): Brand[] {
  return Object.values(brands);
}
