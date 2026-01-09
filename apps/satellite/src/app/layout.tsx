import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import { getBrandConfig } from '@/lib/config';
import './globals.css';

// DSGVO-konform: Fonts werden lokal via next/font geladen
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

// Get brand configuration - uses NEXT_PUBLIC_BRAND_ID embedded at build time
// This is the expected pattern for satellite deployments where each build
// is configured with a specific brand ID
const { brand } = getBrandConfig();

export const metadata: Metadata = {
  title: `${brand.name} - ${brand.tagline}`,
  description: brand.description,
  keywords: ['Sylt', 'Ferienwohnung', 'Hotel', 'Luxus', 'Nordsee', 'Urlaub', brand.name],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* DSGVO-konform: Keine externen Font-Verbindungen nötig */}
        <style>{`
          :root {
            --brand-primary: ${brand.primaryColor};
            --brand-secondary: ${brand.secondaryColor};
            --brand-accent: ${brand.accentColor};
          }
        `}</style>
      </head>
      <body className="antialiased bg-offwhite text-reetdach-900 font-body">
        {children}
      </body>
    </html>
  );
}
