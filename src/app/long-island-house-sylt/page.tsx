import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Long Island House Sylt - Ferienhäuser & Hospitality | BLUM",
  description: "Long Island House Sylt bietet exklusive Ferienhäuser und erstklassige Hospitality-Dienstleistungen auf Sylt. DPMA-geschützte Marke der Klassen 36 und 43.",
};

export default function LongIslandHouseSyltPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-reetdach-light to-reetdach text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-sm tracking-widest text-sand-light/70">BLUM MARKE</span>
          </div>
          {/* Logo Area */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full">
            <span className="text-4xl font-extralight">LIH</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] mb-6">
            Long Island House Sylt
          </h1>
          <div className="inline-flex gap-3 flex-wrap justify-center">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 36: Immobilien
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 43: Beherbergung
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-reetdach leading-relaxed mb-8">
              <strong className="text-nordsee-dark">Long Island House Sylt</strong> vereint exklusive 
              Ferienhäuser mit erstklassigem Hospitality-Service. Inspiriert vom zeitlosen Charme 
              der Hamptons und der einzigartigen Atmosphäre Sylts, bietet diese Marke ein 
              unvergleichliches Urlaubserlebnis auf höchstem Niveau.
            </p>
            
            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              DPMA Markenregistrierung
            </h2>
            <div className="bg-sand-light rounded-lg p-6 mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-reetdach-light">Markenname</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Long Island House Sylt</dd>
                </div>
                <div>
                  <dt className="text-sm text-reetdach-light">Waren-/Dienstleistungsklassen</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">
                    Klasse 36 - Immobilienvermietung<br />
                    Klasse 43 - Beherbergung, Hospitality
                  </dd>
                </div>
              </dl>
            </div>

            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              Unsere Leistungen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Ferienhäuser (Klasse 36)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Exklusive Ferienvillen</li>
                  <li>• Luxus-Apartments</li>
                  <li>• Long-Stay Unterkünfte</li>
                  <li>• Premium-Ferienwohnungen</li>
                </ul>
              </div>
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Hospitality (Klasse 43)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Concierge-Service</li>
                  <li>• Willkommens-Catering</li>
                  <li>• Housekeeping</li>
                  <li>• Privater Chef-Service</li>
                </ul>
              </div>
            </div>

            <div className="bg-reetdach/5 border-l-4 border-reetdach rounded-r-lg p-6 mt-12">
              <h3 className="text-lg font-medium text-reetdach-dark mb-3">Das Long Island Feeling</h3>
              <p className="text-reetdach">
                Erleben Sie den einzigartigen Mix aus amerikanischem Küsten-Lifestyle und 
                norddeutscher Gastfreundschaft. Unsere Häuser verbinden zeitlose Eleganz 
                mit modernem Komfort – für einen unvergesslichen Aufenthalt auf Sylt.
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
