import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLUM auf Sylt - Premium Markenportfolio",
  description: "BLUM ist die Dachmarke für exklusive Fisch-Spezialitäten, Seafood, Immobilien und Ferienhäuser auf Sylt. Martina Blum präsentiert Fisch Blum Sylt, Blum's Seafood Sylt, Sylt Homes by Blum und Long Island House Sylt.",
};

const navigation = [
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
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-reetdach hover:text-nordsee tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <Link href="/" className="text-sm text-reetdach">
              Menu
            </Link>
          </div>
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
              <p>Eidumweg 13</p>
              <p>25980 Sylt</p>
              <p className="mt-4">
                <a href="tel:+4917240088846" className="hover:text-white transition-colors">
                  0172-4008846
                </a>
              </p>
              <p>
                <a href="mailto:blumsylt@web.de" className="hover:text-white transition-colors">
                  blumsylt@web.de
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sand-light/60 text-sm">
          <p>© {new Date().getFullYear()} BLUM auf Sylt. Alle Rechte vorbehalten.</p>
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
      </body>
    </html>
  );
}
