import type { Metadata } from "next";
import Logo from "@/components/Logo";
import NiceClasses from "@/components/NiceClasses";
import ContactInfo from "@/components/ContactInfo";
import StructuredData from "@/components/StructuredData";
import { getCanonicalUrl } from "@/lib/constants";

// Enhanced SEO metadata with all required fields
export const metadata: Metadata = {
  title: "Fisch Blum Sylt - Premium Fisch-Spezialitäten",
  description: "Fisch Blum Sylt - Erstklassige Fisch-Spezialitäten höchster Qualität von der Nordseeinsel Sylt. Traditionelle Handwerkskunst, geräucherter Lachs, Fischkonserven. DPMA-registrierte Marke.",
  keywords: [
    "Fisch Blum Sylt",
    "Fisch-Spezialitäten Sylt",
    "geräucherter Lachs Sylt",
    "Fischkonserven Nordsee",
    "Premium Fisch",
    "Sylter Fisch",
    "Fisch-Feinkost",
    "DPMA Marke",
  ],
  openGraph: {
    title: "Fisch Blum Sylt - Premium Fisch-Spezialitäten",
    description: "Erstklassige Fisch-Spezialitäten höchster Qualität von der Nordseeinsel Sylt. Traditionelle Handwerkskunst seit Generationen.",
    url: getCanonicalUrl("/fisch-blum-sylt"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisch Blum Sylt - Premium Fisch-Spezialitäten",
    description: "Erstklassige Fisch-Spezialitäten von der Nordseeinsel Sylt.",
  },
  alternates: {
    canonical: getCanonicalUrl("/fisch-blum-sylt"),
  },
};

const niceClasses = [
  {
    number: 29,
    name: "Fleisch, Fisch, Geflügel und Wild",
    description: "Fisch, Fischerzeugnisse, verarbeiteter Fisch, geräucherter Fisch, marinierter Fisch, Fischkonserven, Fischfilets, Fisch-Feinkost.",
  },
  {
    number: 35,
    name: "Werbung und Geschäftsführung",
    description: "Einzelhandelsdienstleistungen in Bezug auf Fisch und Fischprodukte, Online-Einzelhandelsdienstleistungen.",
  },
];

// Breadcrumb data for structured data
const breadcrumbs = [
  { name: "BLUM", path: "/" },
  { name: "Fisch Blum Sylt", path: "/fisch-blum-sylt" },
];

export default function FischBlumSylt() {
  return (
    <>
      {/* Page-specific structured data */}
      <StructuredData 
        type="webPage"
        pageName="Fisch Blum Sylt"
        pageDescription="Premium Fisch-Spezialitäten von der Nordseeinsel Sylt"
        pagePath="/fisch-blum-sylt"
        breadcrumbs={breadcrumbs}
      />
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Logo brandName="Fisch Blum Sylt" size="lg" className="mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Fisch Blum Sylt
            </h1>
            <p className="text-xl text-deep-sea-blue-100 max-w-2xl mx-auto">
              Premium Fisch-Spezialitäten von der Nordseeinsel Sylt
            </p>
          </div>
        </section>

        {/* Brand Description - optimized with semantic HTML */}
        <section className="py-12 bg-white" aria-labelledby="about-fisch-blum">
          <div className="max-w-4xl mx-auto px-4">
            <h2 id="about-fisch-blum" className="sr-only">Über Fisch Blum Sylt</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-deep-sea-blue-700 text-lg leading-relaxed">
                Unter der Marke <strong className="text-deep-sea-blue">Fisch Blum Sylt</strong> kennzeichnen wir 
                erstklassige Fisch-Spezialitäten höchster Qualität. Die Marke steht für traditionelle 
                Handwerkskunst, frische Produkte und die authentische maritime Tradition der Nordseeinsel Sylt.
              </p>
              <p className="text-deep-sea-blue-700 text-lg leading-relaxed mt-4">
                Unsere Fischprodukte werden nach überlieferten Rezepten und mit modernsten 
                Qualitätsstandards hergestellt. Von geräuchertem Lachs bis hin zu feinen Fischkonserven 
                - jedes Produkt trägt das Siegel unserer Sylter Qualitätsmarke.
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
