import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Long Island House | Hampton-Style auf Sylt',
  description: 'Hampton-Style Eleganz trifft Sylter Charme. Exklusive Unterkunft im amerikanischen East Coast Design.',
  keywords: ['Sylt', 'Hampton Style', 'Long Island', 'Luxus', 'Design', 'Nordsee'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
