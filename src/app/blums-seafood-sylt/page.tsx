import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";

export const metadata: Metadata = {
  title: "Blum's Seafood Sylt | BLUM Markenportfolio",
  description: "Blum's Seafood Sylt - Exquisite Meeresfrüchte von der Nordseeinsel Sylt. DPMA-registrierte Marke.",
};

const niceClasses = [
  {
    number: 29,
    name: "Fleisch, Fisch, Geflügel und Wild",
    description: "Meeresfrüchte, Krebstiere, Muscheln, Austern, Garnelen, Hummer, Krabben, Seafood-Spezialitäten, verarbeitete Meeresfrüchte.",
  },
  {
    number: 43,
    name: "Verpflegung und Beherbergung",
    description: "Restaurant-Dienstleistungen, Catering-Dienstleistungen für Seafood und Meeresfrüchte.",
  },
];

export default function BlumsSeafoodSylt() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Logo brandName="Blum's Seafood Sylt" size="lg" className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Blum&apos;s Seafood Sylt
          </h1>
          <p className="text-xl text-deep-sea-blue-100 max-w-2xl mx-auto">
            Exquisite Meeresfrüchte von der Nordseeinsel Sylt
          </p>
        </div>
      </section>

      {/* Brand Description */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg mx-auto">
            <p className="text-deep-sea-blue-700 text-lg leading-relaxed">
              Die Marke <strong className="text-deep-sea-blue">Blum&apos;s Seafood Sylt</strong> kennzeichnet 
              exquisite Meeresfrüchte-Spezialitäten in Premium-Qualität. Unter dieser Marke bieten wir 
              eine erlesene Auswahl an frischen und verarbeiteten Meeresfrüchten, die höchsten 
              kulinarischen Ansprüchen gerecht werden.
            </p>
            <p className="text-deep-sea-blue-700 text-lg leading-relaxed mt-4">
              Von delikaten Austern über saftige Garnelen bis hin zu edlem Hummer - 
              Blum&apos;s Seafood Sylt steht für die beste Auswahl aus den Gewässern der Nordsee 
              und darüber hinaus.
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
