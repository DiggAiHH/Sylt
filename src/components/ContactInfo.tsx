import React from "react";

export default function ContactInfo() {
  return (
    <section className="bg-deep-sea-blue-50 border-t border-deep-sea-blue-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-serif text-deep-sea-blue mb-6">
          Kontakt
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              Inhaberin
            </h3>
            <p className="text-deep-sea-blue-700">Martina Blum</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              Anschrift
            </h3>
            <address className="text-deep-sea-blue-700 not-italic">
              Eidumweg 13<br />
              25980 Sylt
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              Telefon
            </h3>
            <a
              href="tel:+491724008846"
              className="text-deep-sea-blue-700 hover:text-rich-gold transition-colors"
            >
              0172-4008846
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              E-Mail
            </h3>
            <a
              href="mailto:blumsylt@web.de"
              className="text-deep-sea-blue-700 hover:text-rich-gold transition-colors"
            >
              blumsylt@web.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
