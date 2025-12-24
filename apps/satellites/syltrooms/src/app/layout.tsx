import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sylt Rooms | 10 Exklusive Hotelzimmer auf Sylt',
  description:
    'Entdecken Sie unsere 10 exklusiven Hotelzimmer mit Dünenblick auf Sylt. Luxus, Komfort und nordische Eleganz.',
  keywords: [
    'Sylt',
    'Hotelzimmer',
    'Boutique Hotel',
    'Luxus Zimmer',
    'Dünenblick',
    'Nordsee',
  ],
  openGraph: {
    title: 'Sylt Rooms',
    description: '10 Exklusive Hotelzimmer auf Sylt',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
