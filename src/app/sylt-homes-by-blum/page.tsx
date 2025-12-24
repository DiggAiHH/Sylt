import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sylt Homes by Blum - Exklusive Immobilien | BLUM",
  description: "BLUM ist die Dachmarke für exklusive Immobilien auf Sylt. Sylt Homes by Blum bietet erstklassige Immobilienvermittlung. DPMA-geschützte Marke der Klasse 36.",
};

export default function SyltHomesByBlumPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-reetdach to-reetdach-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-sm tracking-widest text-sand-light/70">BLUM MARKE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] mb-6">
            Sylt Homes by Blum
          </h1>
          <div className="inline-block bg-white/10 px-4 py-2 rounded-full">
            <span className="text-sm text-sand-light">Klasse 36: Immobilien</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-reetdach leading-relaxed mb-8">
              <strong className="text-nordsee-dark">BLUM</strong> ist die Dachmarke für exklusive 
              Immobilienangebote auf Sylt. Unter dem Namen <strong className="text-nordsee-dark">Sylt Homes by Blum</strong> 
              {" "}vermitteln wir erstklassige Immobilien – von traditionellen Reetdachhäusern bis hin zu 
              modernen Villen mit Blick auf die Nordsee.
            </p>
            
            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              DPMA Markenregistrierung
            </h2>
            <div className="bg-sand-light rounded-lg p-6 mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-reetdach-light">Markenname</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Sylt Homes by Blum</dd>
                </div>
                <div>
                  <dt className="text-sm text-reetdach-light">Waren-/Dienstleistungsklasse</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Klasse 36 - Immobilienwesen</dd>
                </div>
              </dl>
            </div>

            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              Unsere Immobilienleistungen
            </h2>
            <ul className="space-y-3 text-reetdach">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Vermittlung von Luxusimmobilien auf Sylt
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Beratung bei Immobilienkauf und -verkauf
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Immobilienbewertung und Marktanalyse
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Exklusive Off-Market-Objekte
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Reetdachhäuser und traditionelle Friesenhäuser
              </li>
            </ul>

            <div className="bg-nordsee/5 border-l-4 border-nordsee rounded-r-lg p-6 mt-12">
              <p className="text-reetdach italic">
                &quot;Sylt Homes by Blum – Ihr Partner für exklusive Immobilien auf der schönsten 
                Insel Deutschlands.&quot;
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
                <a href="tel:+4917240088846" className="text-nordsee hover:text-nordsee-dark">
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
