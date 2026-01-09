/**
 * Sylt Luxury Hotels Design System
 * "Quiet Luxury" Aesthetic
 */

// Re-export SEO utilities
export * from './seo';

// Re-export Accessibility utilities
export * from './a11y';

// Re-export DSGVO-konforme Fonts
export * from './fonts';

// Sylt Color Palette
export const colors = {
  // Primary Colors
  sand: {
    50: '#FAF8F5',
    100: '#F5F1EB',
    200: '#EBE4D9',
    300: '#E1D6C7',
    400: '#D4C5B0', // Main Sand color
    500: '#C4B399',
    600: '#A89775',
    700: '#8A7A5C',
    800: '#6C5E45',
    900: '#4E432F',
  },
  reetdach: {
    50: '#F7F7F7',
    100: '#EEEEEE',
    200: '#DDDDDD',
    300: '#BBBBBB',
    400: '#999999',
    500: '#6B6B6B', // Main Reetdach-Grau
    600: '#555555',
    700: '#444444',
    800: '#333333',
    900: '#222222',
  },
  nordsee: {
    50: '#F0F7FA',
    100: '#E0EFF5',
    200: '#B3D6E5',
    300: '#7FBDD4',
    400: '#4CA3C3',
    500: '#2C5F77', // Main Nordsee-Blau
    600: '#254F64',
    700: '#1E4051',
    800: '#17303D',
    900: '#10212A',
  },
  // Neutral colors
  white: '#FFFFFF',
  cream: '#FDFCFA',
  charcoal: '#2A2A2A',
} as const;

// Typography
export const typography = {
  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"Cormorant", Georgia, serif',
    accent: '"Cormorant Garamond", Georgia, serif',
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
  },
  lineHeights: {
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Spacing
export const spacing = {
  section: {
    sm: '4rem',    // 64px
    md: '6rem',    // 96px
    lg: '8rem',    // 128px
    xl: '10rem',   // 160px
  },
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Animation
export const animation = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    slowest: 1.2,
  },
  easing: {
    default: [0.25, 0.1, 0.25, 1],
    smooth: [0.4, 0, 0.2, 1],
    elastic: [0.68, -0.55, 0.265, 1.55],
    luxury: [0.16, 1, 0.3, 1],
  },
} as const;

// Satellite Configurations
export const satelliteConfigs = {
  syltrooms: {
    id: 'syltrooms',
    name: 'Sylt Rooms',
    domain: 'syltrooms.de',
    hubApiUrl: 'https://api.blumsylthotels.de',
    propertyType: 'hotel-room' as const,
    theme: {
      primaryColor: colors.sand[400],
      secondaryColor: colors.reetdach[500],
      accentColor: colors.nordsee[500],
      fonts: {
        heading: typography.fonts.heading,
        body: typography.fonts.body,
      },
    },
    features: {
      heroVideo: true,
      parallaxScrolling: true,
      premiumGallery: true,
      instantBooking: true,
      virtualTour: false,
    },
  },
  privathomes: {
    id: 'privathomes',
    name: 'Privat Homes',
    domain: 'privathomes.de',
    hubApiUrl: 'https://api.blumsylthotels.de',
    propertyType: 'vacation-home' as const,
    theme: {
      primaryColor: colors.sand[400],
      secondaryColor: colors.reetdach[500],
      accentColor: colors.nordsee[500],
      fonts: {
        heading: typography.fonts.heading,
        body: typography.fonts.body,
      },
    },
    features: {
      heroVideo: true,
      parallaxScrolling: true,
      premiumGallery: true,
      instantBooking: true,
      virtualTour: true,
    },
  },
  longislandhouse: {
    id: 'longislandhouse',
    name: 'Long Island House',
    domain: 'longislandhouse.de',
    hubApiUrl: 'https://api.blumsylthotels.de',
    propertyType: 'vacation-home' as const,
    theme: {
      primaryColor: '#F5F5F0', // Hampton white
      secondaryColor: '#8B9DC3', // Hampton blue
      accentColor: '#4A5568', // Slate
      fonts: {
        heading: typography.fonts.heading,
        body: typography.fonts.body,
      },
    },
    features: {
      heroVideo: true,
      parallaxScrolling: true,
      premiumGallery: true,
      instantBooking: true,
      virtualTour: true,
    },
  },
  'auster-appartements': {
    id: 'auster-appartements',
    name: 'Auster Appartements',
    domain: 'auster-appartements.de',
    hubApiUrl: 'https://api.blumsylthotels.de',
    propertyType: 'apartment' as const,
    theme: {
      primaryColor: colors.sand[400],
      secondaryColor: colors.reetdach[500],
      accentColor: colors.nordsee[500],
      fonts: {
        heading: typography.fonts.heading,
        body: typography.fonts.body,
      },
    },
    features: {
      heroVideo: true,
      parallaxScrolling: true,
      premiumGallery: true,
      instantBooking: true,
      virtualTour: false,
    },
  },
  'beach-home': {
    id: 'beach-home',
    name: 'Beach Home',
    domain: 'beach-home.de',
    hubApiUrl: 'https://api.blumsylthotels.de',
    propertyType: 'beach-house' as const,
    theme: {
      primaryColor: colors.sand[300],
      secondaryColor: colors.nordsee[400],
      accentColor: colors.nordsee[600],
      fonts: {
        heading: typography.fonts.heading,
        body: typography.fonts.body,
      },
    },
    features: {
      heroVideo: true,
      parallaxScrolling: true,
      premiumGallery: true,
      instantBooking: true,
      virtualTour: true,
    },
  },
} as const;

export type SatelliteId = keyof typeof satelliteConfigs;
