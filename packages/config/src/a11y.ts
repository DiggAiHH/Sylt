/**
 * Accessibility Configuration for Sylt Luxury Hotels
 * Senior-friendly and WCAG 2.1 AA compliant design tokens
 * 
 * Design Rationale:
 * - Minimum 16px base font for readability
 * - 44x44px minimum touch targets (WCAG 2.1 Success Criterion 2.5.5)
 * - Contrast ratio minimum 4.5:1 for normal text, 3:1 for large text
 * - Supports reduced motion preferences
 */

// Font sizes optimized for elderly users (larger base sizes)
export const a11yFontSizes = {
  default: {
    xs: '0.875rem',   // 14px - used sparingly
    sm: '1rem',       // 16px - minimum for body text
    base: '1.125rem', // 18px - comfortable reading
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '1.875rem', // 30px
    '3xl': '2.25rem', // 36px
    '4xl': '2.75rem', // 44px
    '5xl': '3.5rem',  // 56px
    '6xl': '4.5rem',  // 72px
  },
  // Large text mode for vision-impaired users
  large: {
    xs: '1rem',       // 16px
    sm: '1.125rem',   // 18px
    base: '1.25rem',  // 20px
    lg: '1.5rem',     // 24px
    xl: '1.75rem',    // 28px
    '2xl': '2.25rem', // 36px
    '3xl': '2.75rem', // 44px
    '4xl': '3.5rem',  // 56px
    '5xl': '4.5rem',  // 72px
    '6xl': '5.5rem',  // 88px
  },
} as const;

// Minimum touch target sizes (WCAG 2.1 Level AAA = 44x44px)
export const touchTargets = {
  minimum: '44px',    // Minimum for elderly users
  comfortable: '48px', // Comfortable for all users
  large: '56px',      // Extra large for impaired motor control
} as const;

// Focus ring styles for keyboard navigation
export const focusStyles = {
  // High contrast focus ring for visibility
  ring: {
    width: '3px',
    offset: '2px',
    color: '#2C5F77', // Nordsee blue
    colorLight: '#4CA3C3', // Lighter variant for dark backgrounds
  },
  // Skip link styling
  skipLink: {
    background: '#2C5F77',
    color: '#FFFFFF',
    padding: '1rem 1.5rem',
    fontSize: '1.125rem',
  },
} as const;

// Enhanced contrast colors for better visibility
export const highContrastColors = {
  // Text colors with improved contrast ratios
  text: {
    primary: '#1A1A1A',    // Near black for maximum contrast
    secondary: '#3D3D3D',  // Dark gray (7:1 ratio on white)
    muted: '#5C5C5C',      // Medium gray (4.5:1 ratio minimum)
    inverse: '#FFFFFF',
  },
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FAF8F5',
    tertiary: '#F0EDE8',
    dark: '#2A2A2A',
  },
  // Action colors with AA compliance
  action: {
    primary: '#2C5F77',    // Nordsee blue (meets AA)
    primaryHover: '#1E4051',
    secondary: '#C4B399',
    secondaryHover: '#A89775',
    danger: '#C53030',
    dangerHover: '#9B2C2C',
    success: '#276749',
    successHover: '#1E5039',
  },
  // Border colors for form elements
  border: {
    default: '#BBBBBB',    // Visible border (3:1 ratio)
    focus: '#2C5F77',
    error: '#C53030',
    success: '#276749',
  },
} as const;

// Line heights for better readability
export const a11yLineHeights = {
  tight: '1.25',
  normal: '1.6',     // Increased from 1.5 for better readability
  relaxed: '1.8',
  loose: '2',
} as const;

// Letter spacing for better readability
export const a11yLetterSpacing = {
  tight: '-0.01em',
  normal: '0.01em',  // Slight positive for readability
  wide: '0.025em',
  wider: '0.05em',
} as const;

// Animation settings respecting reduced motion
export const a11yAnimation = {
  // Duration modifiers
  reducedMotion: {
    duration: 0,
    delay: 0,
  },
  default: {
    duration: 0.3,
    delay: 0,
  },
  // Disabled animations for reduced motion preference
  disabledTransforms: {
    scale: 1,
    translateY: 0,
    translateX: 0,
    rotate: 0,
  },
} as const;

// Spacing for comfortable interaction areas
export const a11ySpacing = {
  // Form element spacing
  formGap: '1.5rem',      // 24px between form fields
  inputPadding: '1rem',   // 16px internal padding
  labelGap: '0.75rem',    // 12px between label and input
  
  // Button spacing
  buttonPaddingX: '1.5rem',
  buttonPaddingY: '0.875rem',
  buttonGap: '1rem',
  
  // General component spacing
  cardPadding: '2rem',
  sectionGap: '3rem',
} as const;

// ARIA labels and announcements (German)
export const ariaLabels = {
  navigation: {
    main: 'Hauptnavigation',
    mobile: 'Mobile Navigation',
    skipToContent: 'Zum Hauptinhalt springen',
    skipToNav: 'Zur Navigation springen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
  },
  booking: {
    widget: 'Buchungsformular',
    checkIn: 'Anreisedatum auswählen',
    checkOut: 'Abreisedatum auswählen',
    guests: 'Anzahl der Gäste auswählen',
    submit: 'Verfügbarkeit prüfen',
  },
  form: {
    required: 'Pflichtfeld',
    error: 'Fehler: ',
    success: 'Erfolgreich: ',
    loading: 'Wird geladen...',
    submitting: 'Wird gesendet...',
  },
  gallery: {
    previous: 'Vorheriges Bild',
    next: 'Nächstes Bild',
    imageOf: 'Bild {current} von {total}',
    expand: 'Bild vergrößern',
    close: 'Bildansicht schließen',
  },
  fontControl: {
    increase: 'Schriftgröße vergrößern',
    decrease: 'Schriftgröße verkleinern',
    reset: 'Schriftgröße zurücksetzen',
    current: 'Aktuelle Schriftgröße: {size}',
  },
} as const;

// Error messages with clear, actionable text
export const errorMessages = {
  validation: {
    required: 'Bitte füllen Sie dieses Feld aus.',
    email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    phone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
    date: 'Bitte wählen Sie ein gültiges Datum.',
    dateRange: 'Das Abreisedatum muss nach dem Anreisedatum liegen.',
    minLength: 'Bitte geben Sie mindestens {min} Zeichen ein.',
    maxLength: 'Bitte geben Sie maximal {max} Zeichen ein.',
  },
  network: {
    offline: 'Sie sind offline. Bitte überprüfen Sie Ihre Internetverbindung.',
    timeout: 'Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.',
    serverError: 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    notFound: 'Die angeforderte Seite wurde nicht gefunden.',
  },
  booking: {
    unavailable: 'Leider ist diese Unterkunft für den gewählten Zeitraum nicht verfügbar.',
    minStay: 'Mindestaufenthalt: {nights} Nächte.',
    maxGuests: 'Maximale Gästezahl: {max} Personen.',
  },
} as const;

export type FontSizeMode = 'default' | 'large';
