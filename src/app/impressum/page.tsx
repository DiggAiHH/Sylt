import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | BLUM auf Sylt",
  description: "Impressum und rechtliche Angaben für BLUM auf Sylt - Martina Blum, Eidumweg 13, 25980 Sylt.",
};

export default function ImpressumPage() {
  return (
    <div className="bg-sand-light min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-reetdach to-reetdach-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-wide mb-4">
            Impressum
          </h1>
          <p className="text-sand-light/80">Angaben gemäß § 5 TMG</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-12">
            
            {/* Anbieter */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                Verantwortlich für den Inhalt
              </h2>
              <address className="not-italic text-reetdach leading-relaxed">
                <p className="font-medium text-nordsee-dark text-lg">Martina Blum</p>
                <p>Eidumweg 13</p>
                <p>25980 Sylt</p>
                <p className="mt-4">
                  Telefon: <a href="tel:+4917240088846" className="text-nordsee hover:text-nordsee-dark">0172-4008846</a>
                </p>
                <p>
                  E-Mail: <a href="mailto:blumsylt@web.de" className="text-nordsee hover:text-nordsee-dark">blumsylt@web.de</a>
                </p>
              </address>
            </div>

            {/* Marken */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                Marken und Kennzeichen
              </h2>
              <p className="text-reetdach leading-relaxed mb-4">
                Die auf dieser Website verwendeten Marken und Kennzeichen sind beim Deutschen Patent- und Markenamt (DPMA) registriert oder zur Registrierung angemeldet:
              </p>
              <ul className="space-y-2 text-reetdach">
                <li className="flex items-start gap-2">
                  <span className="text-nordsee">•</span>
                  <span><strong>Fisch Blum Sylt</strong> - Klasse 29: Fischerzeugnisse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nordsee">•</span>
                  <span><strong>Blum&apos;s Seafood Sylt</strong> - Klasse 29, 43: Seafood, Gastronomie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nordsee">•</span>
                  <span><strong>Sylt Homes by Blum</strong> - Klasse 36: Immobilien</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nordsee">•</span>
                  <span><strong>Long Island House Sylt</strong> - Klasse 36, 43: Immobilienvermietung, Beherbergung</span>
                </li>
              </ul>
            </div>

            {/* Haftungsausschluss */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                Haftungsausschluss
              </h2>
              <h3 className="text-lg font-medium text-reetdach-dark mb-2">Haftung für Inhalte</h3>
              <p className="text-reetdach leading-relaxed mb-4">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              
              <h3 className="text-lg font-medium text-reetdach-dark mb-2">Haftung für Links</h3>
              <p className="text-reetdach leading-relaxed mb-4">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>
            </div>

            {/* Urheberrecht */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                Urheberrecht
              </h2>
              <p className="text-reetdach leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
