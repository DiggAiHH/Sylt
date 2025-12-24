import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/config';
import './globals.css';

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
    <html lang="de">
      <head>
        {/* Google Fonts - loaded via link for better compatibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        <style>{`
          :root {
            --brand-primary: ${brand.primaryColor};
            --brand-secondary: ${brand.secondaryColor};
            --brand-accent: ${brand.accentColor};
          }
        `}</style>
      </head>
      <body className="antialiased bg-offwhite text-reetdach-900">
        {children}
      </body>
    </html>
  );
}
