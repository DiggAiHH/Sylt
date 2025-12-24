import Link from "next/link";
import Logo from "@/components/Logo";

const subBrands = [
  {
    name: "Fisch Blum Sylt",
    href: "/fisch-blum-sylt",
    description: "Premium Fisch-Spezialitäten",
    icon: "🐟",
    tagline: "Traditionelle Handwerkskunst seit Generationen",
  },
  {
    name: "Blum's Seafood Sylt",
    href: "/blums-seafood-sylt",
    description: "Exquisite Meeresfrüchte",
    icon: "🦐",
    tagline: "Frisch aus den Gewässern der Nordsee",
  },
  {
    name: "Sylt Homes by Blum",
    href: "/sylt-homes-by-blum",
    description: "Luxuriöse Ferienunterkünfte",
    icon: "🏡",
    tagline: "Ihr Zuhause auf Zeit an der Nordsee",
  },
  {
    name: "Long Island House Sylt",
    href: "/long-island-house-sylt",
    description: "Exklusives Ferienhaus",
    icon: "🏠",
    tagline: "Amerikanischer Charme trifft Sylter Eleganz",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Logo brandName="BLUM" size="lg" className="mb-8 animate-fade-in" />
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            BLUM
          </h1>
          <p className="text-xl md:text-2xl text-deep-sea-blue-100 max-w-3xl mx-auto leading-relaxed">
            BLUM ist die Dachmarke für erstklassige Produkte und Dienstleistungen 
            aus Sylt. Unter dem Namen BLUM vereinen wir Premium-Marken für 
            Fisch-Spezialitäten, Meeresfrüchte und exklusive Ferienunterkünfte.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#marken"
              className="inline-flex items-center px-6 py-3 bg-rich-gold text-deep-sea-blue font-semibold rounded-lg hover:bg-rich-gold-300 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Unsere Marken entdecken
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Sub-Brands Section */}
      <section id="marken" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-sea-blue text-center mb-4">
            Unsere Marken
          </h2>
          <p className="text-deep-sea-blue-600 text-center max-w-2xl mx-auto mb-16">
            Entdecken Sie das vielfältige Markenportfolio der BLUM Unternehmensgruppe
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {subBrands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="group block bg-white border-2 border-deep-sea-blue-100 rounded-xl p-8 hover:border-rich-gold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl" role="img" aria-label={brand.description}>
                    {brand.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif text-deep-sea-blue mb-1 group-hover:text-rich-gold transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-rich-gold font-medium text-sm mb-2">{brand.description}</p>
                    <p className="text-deep-sea-blue-600 text-sm">{brand.tagline}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center text-rich-gold font-semibold group-hover:translate-x-2 transition-transform">
                  Mehr erfahren 
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-deep-sea-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-sea-blue text-center mb-16">
            Warum BLUM?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rich-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-deep-sea-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-deep-sea-blue mb-2">DPMA-registriert</h3>
              <p className="text-deep-sea-blue-600">Alle Marken sind beim Deutschen Patent- und Markenamt geschützt</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rich-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-deep-sea-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-deep-sea-blue mb-2">Tradition</h3>
              <p className="text-deep-sea-blue-600">Seit Generationen verwurzelt in der maritimen Kultur Sylts</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rich-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-deep-sea-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-deep-sea-blue mb-2">Premium-Qualität</h3>
              <p className="text-deep-sea-blue-600">Höchste Standards in Produkten und Dienstleistungen</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-deep-sea-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-sea-blue text-center mb-8">
            Über BLUM
          </h2>
          <div className="prose prose-lg mx-auto text-deep-sea-blue-700">
            <p className="text-center leading-relaxed text-lg">
              Die Marke BLUM steht für Qualität, Tradition und die einzigartige 
              Verbindung zur Nordseeinsel Sylt. Seit Generationen verbinden wir 
              handwerkliche Expertise mit der maritimen Lebensart der Insel.
            </p>
            <p className="text-center leading-relaxed mt-4 text-lg">
              Alle BLUM-Marken sind beim Deutschen Patent- und Markenamt (DPMA) 
              registriert und erfüllen höchste Qualitätsstandards.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-sea-blue mb-8">
            Kontakt
          </h2>
          <div className="bg-deep-sea-blue-50 rounded-xl p-8 inline-block">
            <p className="font-semibold text-xl text-deep-sea-blue">Martina Blum</p>
            <p className="text-deep-sea-blue-700 mt-2">Eidumweg 13, 25980 Sylt</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+491724008846" 
                className="inline-flex items-center px-4 py-2 bg-deep-sea-blue text-white rounded-lg hover:bg-deep-sea-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0172-4008846
              </a>
              <a 
                href="mailto:blumsylt@web.de" 
                className="inline-flex items-center px-4 py-2 bg-rich-gold text-deep-sea-blue rounded-lg hover:bg-rich-gold-300 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                blumsylt@web.de
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
