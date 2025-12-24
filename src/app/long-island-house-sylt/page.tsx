import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";

export const metadata: Metadata = {
  title: "Long Island House Sylt | BLUM Markenportfolio",
  description: "Long Island House Sylt - Exklusives Ferienhaus im amerikanischen Stil auf der Nordseeinsel Sylt. DPMA-registrierte Marke.",
};

const niceClasses = [
  {
    number: 36,
    name: "Versicherungs- und Finanzwesen",
    description: "Immobilienvermittlung, Vermietung von Ferienimmobilien, Premium-Ferienhausvermittlung.",
  },
  {
    number: 43,
    name: "Verpflegung und Beherbergung",
    description: "Beherbergung von Gästen in exklusiven Ferienunterkünften, Vermietung von Premium-Ferienhäusern.",
  },
];

export default function LongIslandHouseSylt() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Logo brandName="Long Island House Sylt" size="lg" className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Long Island House Sylt
          </h1>
          <p className="text-xl text-deep-sea-blue-100 max-w-2xl mx-auto">
            Exklusives Ferienhaus im amerikanischen Stil auf Sylt
          </p>
        </div>
      </section>

      {/* Brand Description */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg mx-auto">
            <p className="text-deep-sea-blue-700 text-lg leading-relaxed">
              Die Marke <strong className="text-deep-sea-blue">Long Island House Sylt</strong> kennzeichnet 
              unser exklusives Ferienhaus, das den eleganten Stil amerikanischer Küstenarchitektur 
              mit dem maritimen Charme der Nordseeinsel Sylt verbindet.
            </p>
            <p className="text-deep-sea-blue-700 text-lg leading-relaxed mt-4">
              Das Long Island House Sylt bietet anspruchsvollen Gästen eine einzigartige 
              Unterkunft mit erstklassiger Ausstattung, großzügigen Räumlichkeiten und 
              einem unvergleichlichen Ambiente. Erleben Sie den Luxus eines amerikanischen 
              Strandhauses inmitten der atemberaubenden Sylter Landschaft.
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
