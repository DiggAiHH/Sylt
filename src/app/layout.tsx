/**
 * Root Layout for the BLUM website
 * Contains global navigation, footer, and structured data for SEO
 */

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import StructuredData from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";

// Enhanced metadata for SEO and social sharing
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "BLUM",
    "Sylt",
    "Fisch-Spezialitäten",
    "Seafood",
    "Ferienhäuser",
    "Ferienunterkünfte",
    "Nordseeinsel",
    "Premium-Marken",
    "DPMA",
    "Nordsee",
    "Schleswig-Holstein",
    "Fisch Blum Sylt",
    "Blums Seafood",
    "Long Island House",
  ],
  authors: [{ name: CONTACT.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Open Graph for social sharing (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    countryName: "Germany",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: "@blumaufsylt",
  },
  // Additional metadata
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "de-DE": SITE_CONFIG.url,
    },
  },
  category: "business",
  classification: "Premium Marken, Fisch-Spezialitäten, Ferienhäuser",
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A2540" },
    { media: "(prefers-color-scheme: dark)", color: "#0A2540" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.language}>
      <head>
        {/* Organization and LocalBusiness structured data for rich results */}
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" brandName={SITE_CONFIG.name} />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Geographic meta tags for local SEO */}
        <meta name="geo.region" content="DE-SH" />
        <meta name="geo.placename" content="Sylt" />
        <meta name="geo.position" content="54.9079;8.3507" />
        <meta name="ICBM" content="54.9079, 8.3507" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <SkipLink />
        <Navigation />
        <main id="main-content" className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
        {/* CRITICAL FIX: Add ScrollToTop button for better UX */}
        <ScrollToTop />
      </body>
    </html>
  );
}
