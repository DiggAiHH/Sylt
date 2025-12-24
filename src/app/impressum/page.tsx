import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | BLUM Markenportfolio",
  description: "Impressum - BLUM Marken aus Sylt. Angaben gemäß § 5 TMG.",
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold text-deep-sea-blue mb-8">
          Impressum
        </h1>
        
        <div className="prose prose-lg text-deep-sea-blue-700">
          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            Angaben gemäß § 5 TMG
          </h2>
          <address className="not-italic">
            <strong>Martina Blum</strong><br />
            Eidumweg 13<br />
            25980 Sylt
          </address>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            Kontakt
          </h2>
          <p>
            Telefon: <a href="tel:+491724008846" className="text-rich-gold hover:underline">0172-4008846</a><br />
            E-Mail: <a href="mailto:blumsylt@web.de" className="text-rich-gold hover:underline">blumsylt@web.de</a>
          </p>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <address className="not-italic">
            Martina Blum<br />
            Eidumweg 13<br />
            25980 Sylt
          </address>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            EU-Streitschlichtung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-rich-gold hover:underline ml-1">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mt-2">
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            Verbraucherstreitbeilegung/Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren 
            vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            Markenrechte
          </h2>
          <p>
            Alle auf dieser Website genannten Marken sind beim Deutschen Patent- und 
            Markenamt (DPMA) registriert und unterliegen dem Markenschutz. Die 
            unbefugte Nutzung dieser Marken ist untersagt.
          </p>
        </div>
      </div>
    </div>
  );
}
