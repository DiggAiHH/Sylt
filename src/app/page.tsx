import Link from "next/link";
import Logo from "@/components/Logo";
import { SUB_BRANDS, FEATURES, CONTACT, formatFullAddress } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Larger text and better spacing for readability */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-28 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Logo brandName="BLUM" size="lg" className="mb-10 animate-fade-in" />
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-wide">
            BLUM
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            BLUM ist die Dachmarke für erstklassige Produkte und Dienstleistungen 
            aus Sylt. Unter dem Namen BLUM vereinen wir Premium-Marken für 
            Fisch-Spezialitäten, Meeresfrüchte und exklusive Ferienunterkünfte.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {/* Larger button with better touch target (min 48px height) */}
            <a
              href="#marken"
              className="inline-flex items-center px-8 py-4 bg-rich-gold text-deep-sea-blue text-lg font-bold rounded-xl hover:bg-rich-gold-300 transition-all duration-300 hover:scale-105 shadow-lg min-h-[56px] focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-deep-sea-blue"
            >
              Unsere Marken entdecken
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Sub-Brands Section - Improved readability and larger touch targets */}
      <section id="marken" className="py-24 bg-white scroll-mt-20" aria-labelledby="brands-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="brands-heading" className="text-4xl md:text-5xl font-serif text-deep-sea-blue text-center mb-6">
            Unsere Marken
          </h2>
          <p className="text-deep-sea-blue-700 text-center text-lg max-w-2xl mx-auto mb-20 leading-relaxed">
            Entdecken Sie das vielfältige Markenportfolio der BLUM Unternehmensgruppe
          </p>
          
          <div className="grid md:grid-cols-2 gap-10">
            {SUB_BRANDS.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="group block bg-white border-3 border-deep-sea-blue-200 rounded-2xl p-10 hover:border-rich-gold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:ring-4 focus:ring-rich-gold focus:ring-offset-2"
              >
                <div className="flex items-start gap-6">
                  {/* Larger icon for better visibility */}
                  <span className="text-5xl" role="img" aria-label={brand.description}>
                    {brand.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-serif text-deep-sea-blue mb-2 group-hover:text-rich-gold transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-rich-gold font-semibold text-lg mb-3">{brand.description}</p>
                    <p className="text-deep-sea-blue-700 text-base leading-relaxed">{brand.tagline}</p>
                  </div>
                </div>
                {/* Larger click area with clear call-to-action */}
                <div className="mt-8 flex items-center text-rich-gold text-lg font-bold group-hover:translate-x-2 transition-transform">
                  Mehr erfahren 
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Better spacing and larger text */}
      <section className="py-24 bg-gradient-to-r from-deep-sea-blue-50 to-white" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="features-heading" className="text-4xl md:text-5xl font-serif text-deep-sea-blue text-center mb-20">
            Warum BLUM?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center p-8 bg-white rounded-2xl shadow-sm">
                {/* Larger icons for better visibility */}
                <div className="w-20 h-20 bg-rich-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-deep-sea-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-deep-sea-blue mb-4">{feature.title}</h3>
                <p className="text-deep-sea-blue-700 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Improved readability */}
      <section className="py-24 bg-deep-sea-blue-50" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto px-6">
          <h2 id="about-heading" className="text-4xl md:text-5xl font-serif text-deep-sea-blue text-center mb-10">
            Über BLUM
          </h2>
          <div className="prose prose-xl mx-auto text-deep-sea-blue-700">
            <p className="text-center leading-loose text-xl">
              Die Marke BLUM steht für Qualität, Tradition und die einzigartige 
              Verbindung zur Nordseeinsel Sylt. Seit Generationen verbinden wir 
              handwerkliche Expertise mit der maritimen Lebensart der Insel.
            </p>
            <p className="text-center leading-loose mt-6 text-xl">
              Alle BLUM-Marken sind beim Deutschen Patent- und Markenamt (DPMA) 
              registriert und erfüllen höchste Qualitätsstandards.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Preview - Larger buttons and better accessibility */}
      <section className="py-24 bg-white" aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-serif text-deep-sea-blue mb-10">
            Kontakt
          </h2>
          <div className="bg-deep-sea-blue-50 rounded-2xl p-10 md:p-12 inline-block shadow-sm">
            <p className="font-bold text-2xl text-deep-sea-blue">{CONTACT.name}</p>
            <p className="text-deep-sea-blue-700 mt-3 text-xl">{formatFullAddress()}</p>
            {/* Larger, more accessible contact buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <a 
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center px-8 py-4 bg-deep-sea-blue text-white text-lg font-semibold rounded-xl hover:bg-deep-sea-blue-700 transition-colors min-h-[56px] focus:ring-4 focus:ring-rich-gold focus:ring-offset-2"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CONTACT.phoneFormatted}
              </a>
              <a 
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center px-8 py-4 bg-rich-gold text-deep-sea-blue text-lg font-semibold rounded-xl hover:bg-rich-gold-300 transition-colors min-h-[56px] focus:ring-4 focus:ring-deep-sea-blue focus:ring-offset-2"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
