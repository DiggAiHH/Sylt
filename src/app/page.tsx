import Link from "next/link";

const brands = [
  {
    name: "Fisch Blum Sylt",
    href: "/fisch-blum-sylt",
    klasse: "Klasse 29",
    description: "Fischerzeugnisse",
    color: "bg-nordsee",
  },
  {
    name: "Blum's Seafood Sylt",
    href: "/blums-seafood-sylt",
    klasse: "Klasse 29, 43",
    description: "Seafood & Gastronomie",
    color: "bg-nordsee-light",
  },
  {
    name: "Sylt Homes by Blum",
    href: "/sylt-homes-by-blum",
    klasse: "Klasse 36",
    description: "Immobilien",
    color: "bg-reetdach",
  },
  {
    name: "Long Island House Sylt",
    href: "/long-island-house-sylt",
    klasse: "Klasse 36, 43",
    description: "Ferienhäuser & Hospitality",
    color: "bg-reetdach-light",
  },
];

export default function Home() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nordsee to-nordsee-dark text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] mb-8">
            BLUM
          </h1>
          <p className="text-xl md:text-2xl font-light text-sand-light/90 max-w-3xl mx-auto leading-relaxed">
            Die Dachmarke für Premium-Angebote auf Sylt
          </p>
          <div className="mt-8 w-24 h-px bg-sand-light/40 mx-auto"></div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-reetdach-dark mb-8 tracking-wide">
            Willkommen bei BLUM auf Sylt
          </h2>
          <p className="text-lg text-reetdach leading-relaxed mb-6">
            BLUM ist die Dachmarke für ein exklusives Portfolio von Marken, die alle mit der 
            einzigartigen Lebensart auf der Nordseeinsel Sylt verbunden sind. Von frischen 
            Fisch-Spezialitäten über erstklassigen Seafood bis hin zu exklusiven Immobilien 
            und Ferienhäusern – BLUM steht für Qualität, Tradition und das besondere Sylt-Gefühl.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-reetdach-dark mb-16 tracking-wide">
            Unsere Marken
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className={`${brand.color} h-2 w-full`}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-light text-reetdach-dark group-hover:text-nordsee transition-colors">
                      {brand.name}
                    </h3>
                    <span className="text-xs text-reetdach-light bg-sand-light px-3 py-1 rounded-full">
                      {brand.klasse}
                    </span>
                  </div>
                  <p className="text-reetdach text-lg">
                    {brand.description}
                  </p>
                  <div className="mt-6 text-nordsee text-sm font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Mehr erfahren →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-reetdach-dark mb-8 tracking-wide">
            Kontakt
          </h2>
          <div className="bg-sand-light rounded-lg p-8 md:p-12">
            <p className="text-xl font-medium text-nordsee-dark mb-4">Martina Blum</p>
            <address className="not-italic text-reetdach space-y-2">
              <p>Eidumweg 13</p>
              <p>25980 Sylt</p>
              <p className="mt-4">
                <a href="tel:+4917240088846" className="text-nordsee hover:text-nordsee-dark">
                  0172-4008846
                </a>
              </p>
              <p>
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
