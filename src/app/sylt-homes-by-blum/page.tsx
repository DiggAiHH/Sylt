import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";
import StructuredData from "@/components/StructuredData";
import { getCanonicalUrl } from "@/lib/constants";

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: "Sylt Homes by Blum - Luxuriöse Ferienunterkünfte",
  description: "Sylt Homes by Blum - Erstklassige Ferienunterkünfte auf der Nordseeinsel Sylt. Exklusive Ferienhäuser und Wohnungen mit höchstem Komfort. DPMA-registrierte Marke.",
  keywords: [
    "Sylt Homes by Blum",
    "Ferienunterkünfte Sylt",
    "Ferienhäuser Sylt",
    "Ferienwohnungen Sylt",
    "Luxus Ferienhaus Sylt",
    "Urlaub Sylt",
    "Nordsee Ferienhaus",
    "DPMA Marke",
  ],
  openGraph: {
    title: "Sylt Homes by Blum - Luxuriöse Ferienunterkünfte",
    description: "Erstklassige Ferienunterkünfte auf der Nordseeinsel Sylt mit höchstem Komfort.",
    url: getCanonicalUrl("/sylt-homes-by-blum"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylt Homes by Blum - Luxuriöse Ferienunterkünfte",
    description: "Erstklassige Ferienunterkünfte auf der Nordseeinsel Sylt.",
  },
  alternates: {
    canonical: getCanonicalUrl("/sylt-homes-by-blum"),
  },
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

// Breadcrumb data for structured data
const breadcrumbs = [
  { name: "BLUM", path: "/" },
  { name: "Sylt Homes by Blum", path: "/sylt-homes-by-blum" },
];

export default function SyltHomesByBlum() {
  return (
    <>
      {/* Page-specific structured data */}
      <StructuredData 
        type="webPage"
        pageName="Sylt Homes by Blum"
        pageDescription="Luxuriöse Ferienunterkünfte auf der Nordseeinsel Sylt"
        pagePath="/sylt-homes-by-blum"
        breadcrumbs={breadcrumbs}
      />
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
      
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
        <section className="py-12 bg-white" aria-labelledby="about-sylt-homes">
          <div className="max-w-4xl mx-auto px-4">
            <h2 id="about-sylt-homes" className="sr-only">Über Sylt Homes by Blum</h2>
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
    </>
  );
}
