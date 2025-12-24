import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "BLUM auf Sylt - Premium Markenportfolio",
  description: "BLUM ist die Dachmarke für exklusive Fisch-Spezialitäten, Seafood, Immobilien und Ferienhäuser auf Sylt. Martina Blum präsentiert Fisch Blum Sylt, Blum's Seafood Sylt, Sylt Homes by Blum und Long Island House Sylt.",
  keywords: ["Sylt", "Fisch", "Seafood", "Immobilien", "Ferienhäuser", "Blum", "Premium", "Nordsee"],
  authors: [{ name: "Martina Blum" }],
  openGraph: {
    title: "BLUM auf Sylt - Premium Markenportfolio",
    description: "BLUM ist die Dachmarke für exklusive Fisch-Spezialitäten, Seafood, Immobilien und Ferienhäuser auf Sylt.",
    url: "https://www.blumaufsylt.de",
    siteName: "BLUM auf Sylt",
    locale: "de_DE",
    type: "website",
  },
};

export const navigation = [
  { name: "BLUM", href: "/" },
  { name: "Fisch Blum Sylt", href: "/fisch-blum-sylt" },
  { name: "Blum's Seafood Sylt", href: "/blums-seafood-sylt" },
  { name: "Sylt Homes by Blum", href: "/sylt-homes-by-blum" },
  { name: "Long Island House Sylt", href: "/long-island-house-sylt" },
];

function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-sand-dark/20 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-light tracking-widest text-nordsee hover:text-nordsee-dark">
            BLUM
          </Link>
          <div className="hidden lg:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-reetdach hover:text-nordsee tracking-wide transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <MobileMenu navigation={navigation} />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-reetdach-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-light tracking-widest mb-6">BLUM</h3>
            <p className="text-sand-light/80 text-sm leading-relaxed">
              Premium Markenportfolio auf Sylt - 
              Fisch-Spezialitäten, Seafood, Immobilien & Ferienhäuser.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">Marken</h3>
            <ul className="space-y-3 text-sand-light/80 text-sm">
              {navigation.slice(1).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">Kontakt</h3>
            <address className="not-italic text-sand-light/80 text-sm leading-relaxed space-y-2">
              <p className="font-medium text-white">Martina Blum</p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Eidumweg 13, 25980 Sylt
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+4917240088846" className="hover:text-white transition-colors">
                  0172-4008846
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:blumsylt@web.de" className="hover:text-white transition-colors">
                  blumsylt@web.de
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sand-light/60 text-sm">
          <p>© {new Date().getFullYear()} BLUM auf Sylt. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
