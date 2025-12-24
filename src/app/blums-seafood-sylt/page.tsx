import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blum's Seafood Sylt - Seafood & Gastronomie | BLUM",
  description: "Die Marke Blum's Seafood Sylt kennzeichnet erstklassige Meeresfrüchte und gastronomische Dienstleistungen. DPMA-geschützte Marke der Klassen 29 und 43.",
};

export default function BlumsSeafoodSyltPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nordsee-light to-nordsee text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-sm tracking-widest text-sand-light/70">BLUM MARKE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] mb-6">
            Blum&apos;s Seafood Sylt
          </h1>
          <div className="inline-flex gap-3">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 29: Seafood
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 43: Gastronomie
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-reetdach leading-relaxed mb-8">
              Die Marke <strong className="text-nordsee-dark">Blum&apos;s Seafood Sylt</strong> kennzeichnet 
              erstklassige Meeresfrüchte und gastronomische Dienstleistungen auf höchstem Niveau. 
              Von der Beschaffung feinster Seafood-Produkte bis hin zu exklusiven Catering-Services 
              vereint diese Marke das Beste aus der Welt der Meeresfrüchte.
            </p>
            
            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              DPMA Markenregistrierung
            </h2>
            <div className="bg-sand-light rounded-lg p-6 mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-reetdach-light">Markenname</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Blum&apos;s Seafood Sylt</dd>
                </div>
                <div>
                  <dt className="text-sm text-reetdach-light">Waren-/Dienstleistungsklassen</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">
                    Klasse 29 - Meeresfrüchte, Seafood<br />
                    Klasse 43 - Verpflegung, Gastronomie
                  </dd>
                </div>
              </dl>
            </div>

            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              Unsere Leistungen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Seafood (Klasse 29)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Premium Meeresfrüchte</li>
                  <li>• Frische Austern & Hummer</li>
                  <li>• Krabben & Garnelen</li>
                  <li>• Muscheln & Jakobsmuscheln</li>
                </ul>
              </div>
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Gastronomie (Klasse 43)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Exklusives Catering</li>
                  <li>• Event-Gastronomie</li>
                  <li>• Seafood-Bar Services</li>
                  <li>• Kulinarische Beratung</li>
                </ul>
              </div>
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
