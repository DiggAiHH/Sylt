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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-nordsee to-nordsee-dark text-white py-32 overflow-hidden">
        {/* Decorative wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block text-sand-light/60 text-sm tracking-[0.3em] uppercase">
              Premium auf Sylt
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] mb-8">
            BLUM
          </h1>
          <p className="text-xl md:text-2xl font-light text-sand-light/90 max-w-3xl mx-auto leading-relaxed">
            Die Dachmarke für Premium-Angebote auf Sylt
          </p>
          <div className="mt-8 w-24 h-px bg-sand-light/40 mx-auto"></div>
          <div className="mt-12">
            <a
              href="#marken"
              className="inline-flex items-center gap-2 text-sand-light/80 hover:text-white transition-colors"
            >
              <span className="text-sm tracking-wide">Entdecken</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-reetdach-dark mb-8 tracking-wide wave-decoration">
            Willkommen bei BLUM auf Sylt
          </h2>
          <p className="text-lg text-reetdach leading-relaxed mb-6 mt-12">
            BLUM ist die Dachmarke für ein exklusives Portfolio von Marken, die alle mit der 
            einzigartigen Lebensart auf der Nordseeinsel Sylt verbunden sind. Von frischen 
            Fisch-Spezialitäten über erstklassigen Seafood bis hin zu exklusiven Immobilien 
            und Ferienhäusern – BLUM steht für Qualität, Tradition und das besondere Sylt-Gefühl.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section id="marken" aria-label="Unsere Marken" className="py-20 bg-sand scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-reetdach-dark mb-16 tracking-wide">
            Unsere Marken
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className={`${brand.bgColor} h-2 w-full group-hover:h-3 transition-all duration-300`}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`${brand.textColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                        {brand.icon}
                      </div>
                      <h3 className="text-2xl font-light text-reetdach-dark group-hover:text-nordsee transition-colors">
                        {brand.name}
                      </h3>
                    </div>
                    <span className="text-xs text-reetdach-light bg-sand-light px-3 py-1 rounded-full shrink-0">
                      {brand.klasse}
                    </span>
                  </div>
                  <p className="text-reetdach text-lg ml-12">
                    {brand.description}
                  </p>
                  <div className="mt-6 ml-12 text-nordsee text-sm font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                    Mehr erfahren 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-reetdach-dark mb-16 tracking-wide">
            Warum BLUM?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nordsee/10 text-nordsee mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-reetdach-dark mb-3">Premium Qualität</h3>
              <p className="text-reetdach">
                Alle unsere Marken stehen für höchste Qualitätsansprüche und authentische Sylt-Erlebnisse.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nordsee/10 text-nordsee mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-reetdach-dark mb-3">Tradition & Erfahrung</h3>
              <p className="text-reetdach">
                Jahrelange Erfahrung und tiefe Verbundenheit mit der einzigartigen Insel Sylt.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nordsee/10 text-nordsee mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-reetdach-dark mb-3">Persönlicher Service</h3>
              <p className="text-reetdach">
                Individuelle Betreuung und persönliche Ansprechpartner für all Ihre Anliegen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-reetdach-dark mb-8 tracking-wide">
            Kontakt
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nordsee/10 text-nordsee mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-xl font-medium text-nordsee-dark mb-4">Martina Blum</p>
            <address className="not-italic text-reetdach space-y-3">
              <p className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-nordsee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Eidumweg 13, 25980 Sylt
              </p>
              <p className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-nordsee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+4917240088846" className="text-nordsee hover:text-nordsee-dark">
                  0172-4008846
                </a>
              </p>
              <p className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-nordsee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:blumsylt@web.de" className="text-nordsee hover:text-nordsee-dark">
                  blumsylt@web.de
                </a>
              </p>
            </address>
          </div>
        </div>
      </section>
    </div>
  );
}
