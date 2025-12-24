import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";

export const metadata: Metadata = {
  title: "Sylt Homes by Blum | BLUM Markenportfolio",
  description: "Sylt Homes by Blum - Luxuriöse Ferienunterkünfte auf der Nordseeinsel Sylt. DPMA-registrierte Marke.",
};

const niceClasses = [
  {
    number: 36,
    name: "Versicherungs- und Finanzwesen",
    description: "Immobilienvermittlung, Vermietung von Immobilien, Ferienhausvermittlung, Immobilienverwaltung.",
  },
  {
    number: 43,
    name: "Verpflegung und Beherbergung",
    description: "Beherbergung von Gästen, Vermietung von Ferienunterkünften, Ferienhausvermietung, Ferienwohnungsvermietung.",
  },
];

export default function SyltHomesByBlum() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Logo brandName="Sylt Homes by Blum" size="lg" className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Sylt Homes by Blum
          </h1>
          <p className="text-xl text-deep-sea-blue-100 max-w-2xl mx-auto">
            Luxuriöse Ferienunterkünfte auf der Nordseeinsel Sylt
          </p>
        </div>
      </section>

      {/* Brand Description */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg mx-auto">
            <p className="text-deep-sea-blue-700 text-lg leading-relaxed">
              Unter der Marke <strong className="text-deep-sea-blue">Sylt Homes by Blum</strong> kennzeichnen wir 
              erstklassige Ferienunterkünfte auf der Nordseeinsel Sylt. Die Marke steht für 
              exklusive Ferienhäuser und Wohnungen, die höchsten Komfort mit dem einzigartigen 
              Sylter Lebensgefühl verbinden.
            </p>
            <p className="text-deep-sea-blue-700 text-lg leading-relaxed mt-4">
              Jede Unterkunft wird sorgfältig ausgewählt und gepflegt, um unseren Gästen 
              einen unvergesslichen Aufenthalt zu garantieren. Genießen Sie Ihren Urlaub 
              in einer der schönsten Gegenden Deutschlands mit dem Qualitätsversprechen 
              von Sylt Homes by Blum.
            </p>
          </div>
        </div>
      </section>

      {/* Nice Classes */}
      <div className="bg-deep-sea-blue-50">
        <NiceClasses classes={niceClasses} />
      </div>

      {/* Contact Section */}
      <ContactInfo />
    </div>
  );
}
