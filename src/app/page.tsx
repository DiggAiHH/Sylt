import Link from "next/link";
import Logo from "@/components/Logo";

const subBrands = [
  {
    name: "Fisch Blum Sylt",
    href: "/fisch-blum-sylt",
    description: "Premium Fisch-Spezialitäten",
  },
  {
    name: "Blum's Seafood Sylt",
    href: "/blums-seafood-sylt",
    description: "Exquisite Meeresfrüchte",
  },
  {
    name: "Sylt Homes by Blum",
    href: "/sylt-homes-by-blum",
    description: "Luxuriöse Ferienunterkünfte",
  },
  {
    name: "Long Island House Sylt",
    href: "/long-island-house-sylt",
    description: "Exklusives Ferienhaus",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Logo brandName="BLUM" size="lg" className="mb-8" />
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            BLUM
          </h1>
          <p className="text-xl md:text-2xl text-deep-sea-blue-100 max-w-3xl mx-auto leading-relaxed">
            BLUM ist die Dachmarke für erstklassige Produkte und Dienstleistungen 
            aus Sylt. Unter dem Namen BLUM vereinen wir Premium-Marken für 
            Fisch-Spezialitäten, Meeresfrüchte und exklusive Ferienunterkünfte.
          </p>
        </div>
      </section>

      {/* Sub-Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-deep-sea-blue text-center mb-4">
            Unsere Marken
          </h2>
          <p className="text-deep-sea-blue-600 text-center max-w-2xl mx-auto mb-12">
            Entdecken Sie das vielfältige Markenportfolio der BLUM Unternehmensgruppe
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {subBrands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="group block bg-white border-2 border-deep-sea-blue-100 rounded-lg p-8 hover:border-rich-gold hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-serif text-deep-sea-blue mb-2 group-hover:text-rich-gold transition-colors">
                  {brand.name}
                </h3>
                <p className="text-deep-sea-blue-600">{brand.description}</p>
                <span className="inline-block mt-4 text-rich-gold font-semibold">
                  Mehr erfahren →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-deep-sea-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-deep-sea-blue text-center mb-8">
            Über BLUM
          </h2>
          <div className="prose prose-lg mx-auto text-deep-sea-blue-700">
            <p className="text-center leading-relaxed">
              Die Marke BLUM steht für Qualität, Tradition und die einzigartige 
              Verbindung zur Nordseeinsel Sylt. Seit Generationen verbinden wir 
              handwerkliche Expertise mit der maritimen Lebensart der Insel.
            </p>
            <p className="text-center leading-relaxed mt-4">
              Alle BLUM-Marken sind beim Deutschen Patent- und Markenamt (DPMA) 
              registriert und erfüllen höchste Qualitätsstandards.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-deep-sea-blue mb-6">
            Kontakt
          </h2>
          <div className="text-deep-sea-blue-700">
            <p className="font-semibold text-lg">Martina Blum</p>
            <p>Eidumweg 13, 25980 Sylt</p>
            <p className="mt-2">
              <a href="tel:+491724008846" className="hover:text-rich-gold transition-colors">
                0172-4008846
              </a>
              {" | "}
              <a href="mailto:blumsylt@web.de" className="hover:text-rich-gold transition-colors">
                blumsylt@web.de
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
