import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auster Appartements | Moderne Apartments auf Sylt',
  description: 'Moderne Apartments im Herzen der Insel. Komfort und Design für den perfekten Sylt-Urlaub.',
  keywords: ['Sylt', 'Apartment', 'Modern', 'Design', 'Urlaub', 'Nordsee'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
