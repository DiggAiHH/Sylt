import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";
import StructuredData from "@/components/StructuredData";
import Breadcrumb from "@/components/Breadcrumb";
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

// Breadcrumb data for navigation and structured data
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
        {/* Senior-friendly: Breadcrumb navigation for orientation */}
        <Breadcrumb items={breadcrumbs} />
        
        {/* Hero Section - Senior-friendly: Larger text, better contrast */}
        <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Logo brandName="Sylt Homes by Blum" size="lg" className="mb-8" />
            {/* Senior-friendly: Very large, readable heading */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">
              Sylt Homes by Blum
            </h1>
            {/* Senior-friendly: Larger subtitle with better line height */}
            <p className="text-2xl text-deep-sea-blue-100 max-w-2xl mx-auto leading-relaxed">
              Luxuriöse Ferienunterkünfte auf der Nordseeinsel Sylt
            </p>
          </div>
        </section>

        {/* Brand Description - Senior-friendly: Larger text, better spacing */}
        <section className="py-16 bg-white" aria-labelledby="about-sylt-homes">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="about-sylt-homes" className="sr-only">Über Sylt Homes by Blum</h2>
            <div className="prose prose-xl mx-auto">
              {/* Senior-friendly: Larger paragraph text with excellent readability */}
              <p className="text-deep-sea-blue-700 text-xl md:text-2xl leading-loose">
                Unter der Marke <strong className="text-deep-sea-blue font-bold">Sylt Homes by Blum</strong> kennzeichnen wir 
                erstklassige Ferienunterkünfte auf der Nordseeinsel Sylt. Die Marke steht für 
                exklusive Ferienhäuser und Wohnungen, die höchsten Komfort mit dem einzigartigen 
                Sylter Lebensgefühl verbinden.
              </p>
              <p className="text-deep-sea-blue-700 text-xl md:text-2xl leading-loose mt-8">
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
