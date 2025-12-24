import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Long Island House Sylt - Ferienhäuser & Hospitality | BLUM",
  description: "Long Island House Sylt bietet exklusive Ferienhäuser und erstklassige Hospitality-Dienstleistungen auf Sylt. DPMA-geschützte Marke der Klassen 36 und 43.",
};

export default function LongIslandHouseSyltPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-reetdach-light to-reetdach text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-sm tracking-widest text-sand-light/70">BLUM MARKE</span>
          </div>
          {/* Logo Area */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full">
            <span className="text-4xl font-extralight">LIH</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] mb-6">
            Long Island House Sylt
          </h1>
          <div className="inline-flex gap-3 flex-wrap justify-center">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 36: Immobilien
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 43: Beherbergung
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-reetdach leading-relaxed mb-8">
              <strong className="text-nordsee-dark">Long Island House Sylt</strong> vereint exklusive 
              Ferienhäuser mit erstklassigem Hospitality-Service. Inspiriert vom zeitlosen Charme 
              der Hamptons und der einzigartigen Atmosphäre Sylts, bietet diese Marke ein 
              unvergleichliches Urlaubserlebnis auf höchstem Niveau.
            </p>
            
            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              DPMA Markenregistrierung
            </h2>
            <div className="bg-sand-light rounded-lg p-6 mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-reetdach-light">Markenname</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Long Island House Sylt</dd>
                </div>
                <div>
                  <dt className="text-sm text-reetdach-light">Waren-/Dienstleistungsklassen</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">
                    Klasse 36 - Immobilienvermietung<br />
                    Klasse 43 - Beherbergung, Hospitality
                  </dd>
                </div>
              </dl>
            </div>

            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              Unsere Leistungen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Ferienhäuser (Klasse 36)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Exklusive Ferienvillen</li>
                  <li>• Luxus-Apartments</li>
                  <li>• Long-Stay Unterkünfte</li>
                  <li>• Premium-Ferienwohnungen</li>
                </ul>
              </div>
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Hospitality (Klasse 43)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Concierge-Service</li>
                  <li>• Willkommens-Catering</li>
                  <li>• Housekeeping</li>
                  <li>• Privater Chef-Service</li>
                </ul>
              </div>
            </div>

            <div className="bg-reetdach/5 border-l-4 border-reetdach rounded-r-lg p-6 mt-12">
              <h3 className="text-lg font-medium text-reetdach-dark mb-3">Das Long Island Feeling</h3>
              <p className="text-reetdach">
                Erleben Sie den einzigartigen Mix aus amerikanischem Küsten-Lifestyle und 
                norddeutscher Gastfreundschaft. Unsere Häuser verbinden zeitlose Eleganz 
                mit modernem Komfort – für einen unvergesslichen Aufenthalt auf Sylt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-light text-reetdach-dark mb-8">Kontakt</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-lg font-medium text-nordsee-dark mb-4">Martina Blum</p>
            <address className="not-italic text-reetdach space-y-1">
              <p>Eidumweg 13, 25980 Sylt</p>
              <p>
                <a href="tel:+4917240088​46" className="text-nordsee hover:text-nordsee-dark">
                  0172-4008846
                </a>
                {" | "}
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
