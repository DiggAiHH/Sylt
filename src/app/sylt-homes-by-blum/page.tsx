import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sylt Homes by Blum - Exklusive Immobilien | BLUM",
  description: "BLUM ist die Dachmarke für exklusive Immobilien auf Sylt. Sylt Homes by Blum bietet erstklassige Immobilienvermittlung. DPMA-geschützte Marke der Klasse 36.",
};

export default function SyltHomesByBlumPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-reetdach to-reetdach-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-sm tracking-widest text-sand-light/70">BLUM MARKE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] mb-6">
            Sylt Homes by Blum
          </h1>
          <div className="inline-block bg-white/10 px-4 py-2 rounded-full">
            <span className="text-sm text-sand-light">Klasse 36: Immobilien</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-reetdach leading-relaxed mb-8">
              <strong className="text-nordsee-dark">BLUM</strong> ist die Dachmarke für exklusive 
              Immobilienangebote auf Sylt. Unter dem Namen <strong className="text-nordsee-dark">Sylt Homes by Blum</strong> 
              {" "}vermitteln wir erstklassige Immobilien – von traditionellen Reetdachhäusern bis hin zu 
              modernen Villen mit Blick auf die Nordsee.
            </p>
            
            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              DPMA Markenregistrierung
            </h2>
            <div className="bg-sand-light rounded-lg p-6 mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-reetdach-light">Markenname</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Sylt Homes by Blum</dd>
                </div>
                <div>
                  <dt className="text-sm text-reetdach-light">Waren-/Dienstleistungsklasse</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Klasse 36 - Immobilienwesen</dd>
                </div>
              </dl>
            </div>

            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              Unsere Immobilienleistungen
            </h2>
            <ul className="space-y-3 text-reetdach">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Vermittlung von Luxusimmobilien auf Sylt
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Beratung bei Immobilienkauf und -verkauf
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Immobilienbewertung und Marktanalyse
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Exklusive Off-Market-Objekte
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-reetdach rounded-full mr-3"></span>
                Reetdachhäuser und traditionelle Friesenhäuser
              </li>
            </ul>

            <div className="bg-nordsee/5 border-l-4 border-nordsee rounded-r-lg p-6 mt-12">
              <p className="text-reetdach italic">
                &quot;Sylt Homes by Blum – Ihr Partner für exklusive Immobilien auf der schönsten 
                Insel Deutschlands.&quot;
              </p>
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
                <a href="tel:+4917240088846" className="text-nordsee hover:text-nordsee-dark">
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
