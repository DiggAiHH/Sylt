import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BLUM Sylt Hotels | Exklusive Unterkünfte auf Sylt',
  description:
    'Entdecken Sie unsere exklusiven Luxus-Unterkünfte auf Sylt. Hotelzimmer, Apartments, Ferienhäuser und Strandhäuser mit erstklassigem Service.',
  keywords: [
    'Sylt',
    'Luxus Hotel',
    'Ferienhaus Sylt',
    'Apartment Sylt',
    'Strandhaus',
    'Nordsee',
    'Premium Unterkunft',
  ],
  openGraph: {
    title: 'BLUM Sylt Hotels',
    description: 'Exklusive Unterkünfte auf Sylt',
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
