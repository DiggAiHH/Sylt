import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Beach Home | Strandnahes Wohnen auf Sylt',
  description: 'Direkt am Strand – Nordsee pur. Exklusive Strandunterkünfte mit Meerblick.',
  keywords: ['Sylt', 'Strand', 'Beach', 'Meerblick', 'Strandhaus', 'Nordsee'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
