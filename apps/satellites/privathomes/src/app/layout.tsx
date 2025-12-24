import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Privat Homes | Luxuriöse Ferienhäuser auf Sylt',
  description: 'Exklusive Ferienhäuser für gehobene Ansprüche auf Sylt. Privatsphäre, Luxus und nordische Eleganz.',
  keywords: ['Sylt', 'Ferienhaus', 'Luxus', 'Privathaus', 'Urlaub', 'Nordsee'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
