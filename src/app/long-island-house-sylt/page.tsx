import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";
import StructuredData from "@/components/StructuredData";
import Breadcrumb from "@/components/Breadcrumb";
import { getCanonicalUrl } from "@/lib/constants";

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: "Long Island House Sylt - Exklusives Ferienhaus",
  description: "Long Island House Sylt - Exklusives Ferienhaus im amerikanischen Stil auf der Nordseeinsel Sylt. Elegante Küstenarchitektur trifft maritimen Charme. DPMA-registrierte Marke.",
  keywords: [
    "Long Island House Sylt",
    "Ferienhaus Sylt",
    "amerikanisches Strandhaus Sylt",
    "Luxus Ferienhaus Nordsee",
    "Premium Unterkunft Sylt",
    "exklusives Ferienhaus",
    "Küstenarchitektur Sylt",
    "DPMA Marke",
  ],
  openGraph: {
    title: "Long Island House Sylt - Exklusives Ferienhaus",
    description: "Exklusives Ferienhaus im amerikanischen Stil auf der Nordseeinsel Sylt.",
    url: getCanonicalUrl("/long-island-house-sylt"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long Island House Sylt - Exklusives Ferienhaus",
    description: "Exklusives Ferienhaus im amerikanischen Stil auf Sylt.",
  },
  alternates: {
    canonical: getCanonicalUrl("/long-island-house-sylt"),
  },
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

// Breadcrumb data for navigation and structured data
const breadcrumbs = [
  { name: "BLUM", path: "/" },
  { name: "Long Island House Sylt", path: "/long-island-house-sylt" },
];

export default function LongIslandHouseSylt() {
  return (
    <>
      {/* Page-specific structured data */}
      <StructuredData 
        type="webPage"
        pageName="Long Island House Sylt"
        pageDescription="Exklusives Ferienhaus im amerikanischen Stil auf Sylt"
        pagePath="/long-island-house-sylt"
        breadcrumbs={breadcrumbs}
      />
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
      
      <div className="min-h-screen">
        {/* Senior-friendly: Breadcrumb navigation for orientation */}
        <Breadcrumb items={breadcrumbs} />
        
        {/* Hero Section - Senior-friendly: Larger text, better contrast */}
        <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Logo brandName="Long Island House Sylt" size="lg" className="mb-8" />
            {/* Senior-friendly: Very large, readable heading */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">
              Long Island House Sylt
            </h1>
            {/* Senior-friendly: Larger subtitle with better line height */}
            <p className="text-2xl text-deep-sea-blue-100 max-w-2xl mx-auto leading-relaxed">
              Exklusives Ferienhaus im amerikanischen Stil auf Sylt
            </p>
          </div>
        </section>

        {/* Brand Description - Senior-friendly: Larger text, better spacing */}
        <section className="py-16 bg-white" aria-labelledby="about-long-island">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="about-long-island" className="sr-only">Über Long Island House Sylt</h2>
            <div className="prose prose-xl mx-auto">
              {/* Senior-friendly: Larger paragraph text with excellent readability */}
              <p className="text-deep-sea-blue-700 text-xl md:text-2xl leading-loose">
                Die Marke <strong className="text-deep-sea-blue font-bold">Long Island House Sylt</strong> kennzeichnet 
                unser exklusives Ferienhaus, das den eleganten Stil amerikanischer Küstenarchitektur 
                mit dem maritimen Charme der Nordseeinsel Sylt verbindet.
              </p>
              <p className="text-deep-sea-blue-700 text-xl md:text-2xl leading-loose mt-8">
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
    </>
  );
}
