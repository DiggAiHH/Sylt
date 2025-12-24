import Link from "next/link";

const brands = [
  {
    name: "Fisch Blum Sylt",
    href: "/fisch-blum-sylt",
    klasse: "Klasse 29",
    description: "Fischerzeugnisse",
    bgColor: "bg-nordsee",
    textColor: "text-nordsee",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C7.5 3 3 7 3 12c0 2.5 1 4.5 2.5 6l6.5-3 6.5 3c1.5-1.5 2.5-3.5 2.5-6 0-5-4.5-9-9-9z" />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Blum's Seafood Sylt",
    href: "/blums-seafood-sylt",
    klasse: "Klasse 29, 43",
    description: "Seafood & Gastronomie",
    bgColor: "bg-nordsee-light",
    textColor: "text-nordsee-light",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Sylt Homes by Blum",
    href: "/sylt-homes-by-blum",
    klasse: "Klasse 36",
    description: "Immobilien",
    bgColor: "bg-reetdach",
    textColor: "text-reetdach",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Long Island House Sylt",
    href: "/long-island-house-sylt",
    klasse: "Klasse 36, 43",
    description: "Ferienhäuser & Hospitality",
    bgColor: "bg-reetdach-light",
    textColor: "text-reetdach-light",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section - größere Schrift und mehr Kontrast */}
      <section className="relative bg-gradient-to-b from-nordsee to-nordsee-dark text-white py-36 overflow-hidden">
        {/* Decorative wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-block text-sand-light text-lg tracking-[0.3em] uppercase font-medium">
              Premium auf Sylt
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-medium tracking-[0.15em] mb-10">
            BLUM
          </h1>
          <p className="text-2xl md:text-3xl font-normal text-white max-w-3xl mx-auto leading-relaxed">
            Die Dachmarke für Premium-Angebote auf Sylt
          </p>
          <div className="mt-10 w-32 h-1 bg-sand-light/60 mx-auto rounded"></div>
          {/* Größerer, deutlicherer CTA-Button */}
          <div className="mt-14">
            <a
              href="#marken"
              className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white text-lg font-medium px-8 py-4 rounded-xl transition-all border-2 border-white/40 hover:border-white/60"
            >
              <span className="tracking-wide">Unsere Marken entdecken</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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

      {/* Introduction - größere Schrift und mehr Padding */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-reetdach-dark mb-10 tracking-wide wave-decoration">
            Willkommen bei BLUM auf Sylt
          </h2>
          <p className="text-xl text-reetdach-dark leading-loose mb-6 mt-16">
            BLUM ist die Dachmarke für ein exklusives Portfolio von Marken, die alle mit der 
            einzigartigen Lebensart auf der Nordseeinsel Sylt verbunden sind. Von frischen 
            Fisch-Spezialitäten über erstklassigen Seafood bis hin zu exklusiven Immobilien 
            und Ferienhäusern – BLUM steht für Qualität, Tradition und das besondere Sylt-Gefühl.
          </p>
        </div>
      </section>

      {/* Brands Grid - größere Cards und bessere Touch-Targets */}
      <section id="marken" aria-label="Unsere Marken" className="py-24 bg-sand scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-medium text-center text-reetdach-dark mb-20 tracking-wide">
            Unsere Marken
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border-2 border-transparent hover:border-nordsee/30"
              >
                <div className={`${brand.bgColor} h-3 w-full group-hover:h-4 transition-all duration-300`}></div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                      <div className={`${brand.textColor} opacity-70 group-hover:opacity-100 transition-opacity`}>
                        {/* Größere Icons */}
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          {brand.icon.props.children}
                        </svg>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-medium text-reetdach-dark group-hover:text-nordsee transition-colors">
                        {brand.name}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-reetdach bg-sand-light px-4 py-2 rounded-full shrink-0">
                      {brand.klasse}
                    </span>
                  </div>
                  <p className="text-reetdach-dark text-xl ml-15 leading-relaxed">
                    {brand.description}
                  </p>
                  {/* Größerer, deutlicherer Link */}
                  <div className="mt-8 text-nordsee text-lg font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                    Mehr erfahren 
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
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

      {/* Features Section - größere Icons und Text */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-medium text-center text-reetdach-dark mb-20 tracking-wide">
            Warum BLUM?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-sand-light rounded-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nordsee/15 text-nordsee mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-reetdach-dark mb-4">Premium Qualität</h3>
              <p className="text-lg text-reetdach-dark leading-relaxed">
                Alle unsere Marken stehen für höchste Qualitätsansprüche und authentische Sylt-Erlebnisse.
              </p>
            </div>
            <div className="text-center p-8 bg-sand-light rounded-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nordsee/15 text-nordsee mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-reetdach-dark mb-4">Tradition & Erfahrung</h3>
              <p className="text-lg text-reetdach-dark leading-relaxed">
                Jahrelange Erfahrung und tiefe Verbundenheit mit der einzigartigen Insel Sylt.
              </p>
            </div>
            <div className="text-center p-8 bg-sand-light rounded-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nordsee/15 text-nordsee mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-reetdach-dark mb-4">Persönlicher Service</h3>
              <p className="text-lg text-reetdach-dark leading-relaxed">
                Individuelle Betreuung und persönliche Ansprechpartner für all Ihre Anliegen.
              </p>
            </div>
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

      {/* Contact Section - prominente Telefonnummer für Senioren */}
      <section className="py-24 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-medium text-reetdach-dark mb-10 tracking-wide">
            Kontakt
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-nordsee/15 text-nordsee mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-nordsee-dark mb-6">Martina Blum</p>
            <address className="not-italic text-reetdach-dark space-y-5 text-lg">
              <p className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-nordsee shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Eidumweg 13, 25980 Sylt
              </p>
              {/* Telefonnummer extra groß und prominent für ältere Menschen */}
              <div className="bg-nordsee/10 rounded-xl p-6 mt-6">
                <p className="text-sm text-reetdach mb-2 font-medium">Rufen Sie uns an:</p>
                <a 
                  href="tel:+4917240088846" 
                  className="flex items-center justify-center gap-3 text-nordsee hover:text-nordsee-dark text-2xl md:text-3xl font-bold"
                >
                  <svg className="w-8 h-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0172-4008846
                </a>
              </div>
              <p className="flex items-center justify-center gap-3 pt-2">
                <svg className="w-6 h-6 text-nordsee shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:blumsylt@web.de" className="text-nordsee hover:text-nordsee-dark font-medium underline underline-offset-4">
                  blumsylt@web.de
                </a>
              </p>
            </address>
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
