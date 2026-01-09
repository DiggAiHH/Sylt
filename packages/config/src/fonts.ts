/**
 * DSGVO-konforme Font-Konfiguration für Sylt Luxury Hotels
 * 
 * WICHTIG: Fonts werden lokal gehostet (next/font) um DSGVO-Verstöße zu vermeiden.
 * Google Fonts darf NIEMALS direkt eingebunden werden!
 * 
 * Design System:
 * - Heading: Playfair Display (Serif - Quiet Luxury)
 * - Body: Cormorant Garamond (Serif - Elegant)
 * - Accent: Inter (Sans-serif - Modern, readable)
 */

import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';

// Playfair Display - Luxury Headings
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-heading',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

// Cormorant Garamond - Elegant Body Text
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
  fallback: ['Georgia', 'serif'],
});

// Inter - Modern UI Elements & Fallback
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

/**
 * Combined font variables for use in layout className
 * Usage: <html className={fontVariables}>
 */
export const fontVariables = `${playfairDisplay.variable} ${cormorantGaramond.variable} ${inter.variable}`;

/**
 * Font class names for direct application
 */
export const fontClasses = {
  heading: playfairDisplay.className,
  body: cormorantGaramond.className,
  sans: inter.className,
};

/**
 * CSS Custom Properties to add to globals.css
 * These are automatically set by the font variables
 */
export const fontCSSVars = `
  --font-heading: ${playfairDisplay.style.fontFamily};
  --font-body: ${cormorantGaramond.style.fontFamily};
  --font-sans: ${inter.style.fontFamily};
`;
