import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blum Sylt Hotels - Booking',
  description: 'Exklusive Unterkünfte auf Sylt buchen. Quiet Luxury trifft norddeutsche Gastfreundschaft.',
  keywords: ['Sylt', 'Ferienwohnung', 'Hotel', 'Luxus', 'Nordsee', 'Urlaub'],
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
      </head>
      <body className="antialiased bg-offwhite text-reetdach-900">
        {children}
      </body>
    </html>
  );
}
