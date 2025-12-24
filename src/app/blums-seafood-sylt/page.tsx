import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blum's Seafood Sylt - Seafood & Gastronomie | BLUM",
  description: "Die Marke Blum's Seafood Sylt kennzeichnet erstklassige Meeresfrüchte und gastronomische Dienstleistungen. DPMA-geschützte Marke der Klassen 29 und 43.",
};

export default function BlumsSeafoodSyltPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nordsee-light to-nordsee text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-sm tracking-widest text-sand-light/70">BLUM MARKE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] mb-6">
            Blum&apos;s Seafood Sylt
          </h1>
          <div className="inline-flex gap-3">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 29: Seafood
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-sand-light">
              Klasse 43: Gastronomie
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-reetdach leading-relaxed mb-8">
              Die Marke <strong className="text-nordsee-dark">Blum&apos;s Seafood Sylt</strong> kennzeichnet 
              erstklassige Meeresfrüchte und gastronomische Dienstleistungen auf höchstem Niveau. 
              Von der Beschaffung feinster Seafood-Produkte bis hin zu exklusiven Catering-Services 
              vereint diese Marke das Beste aus der Welt der Meeresfrüchte.
            </p>
            
            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              DPMA Markenregistrierung
            </h2>
            <div className="bg-sand-light rounded-lg p-6 mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-reetdach-light">Markenname</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">Blum&apos;s Seafood Sylt</dd>
                </div>
                <div>
                  <dt className="text-sm text-reetdach-light">Waren-/Dienstleistungsklassen</dt>
                  <dd className="text-lg font-medium text-nordsee-dark">
                    Klasse 29 - Meeresfrüchte, Seafood<br />
                    Klasse 43 - Verpflegung, Gastronomie
                  </dd>
                </div>
              </dl>
            </div>

            <h2 className="text-2xl font-light text-reetdach-dark mt-12 mb-6">
              Unsere Leistungen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Seafood (Klasse 29)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Premium Meeresfrüchte</li>
                  <li>• Frische Austern & Hummer</li>
                  <li>• Krabben & Garnelen</li>
                  <li>• Muscheln & Jakobsmuscheln</li>
                </ul>
              </div>
              <div className="bg-sand-light rounded-lg p-6">
                <h3 className="text-lg font-medium text-nordsee-dark mb-3">Gastronomie (Klasse 43)</h3>
                <ul className="space-y-2 text-reetdach text-sm">
                  <li>• Exklusives Catering</li>
                  <li>• Event-Gastronomie</li>
                  <li>• Seafood-Bar Services</li>
                  <li>• Kulinarische Beratung</li>
                </ul>
              </div>
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
  title: "Blum's Seafood Sylt - Exquisite Meeresfrüchte",
  description: "Blum's Seafood Sylt - Exquisite Meeresfrüchte-Spezialitäten in Premium-Qualität. Frische Austern, Garnelen, Hummer und mehr von der Nordseeinsel Sylt. DPMA-registrierte Marke.",
  keywords: [
    "Blums Seafood Sylt",
    "Meeresfrüchte Sylt",
    "Austern Sylt",
    "Garnelen Nordsee",
    "Hummer Sylt",
    "Seafood Premium",
    "Krabben Sylt",
    "DPMA Marke",
  ],
  openGraph: {
    title: "Blum's Seafood Sylt - Exquisite Meeresfrüchte",
    description: "Exquisite Meeresfrüchte-Spezialitäten in Premium-Qualität von der Nordseeinsel Sylt.",
    url: getCanonicalUrl("/blums-seafood-sylt"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blum's Seafood Sylt - Exquisite Meeresfrüchte",
    description: "Exquisite Meeresfrüchte von der Nordseeinsel Sylt.",
  },
  alternates: {
    canonical: getCanonicalUrl("/blums-seafood-sylt"),
  },
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

// Breadcrumb data for navigation and structured data
const breadcrumbs = [
  { name: "BLUM", path: "/" },
  { name: "Blum's Seafood Sylt", path: "/blums-seafood-sylt" },
];

export default function BlumsSeafoodSylt() {
  return (
    <>
      {/* Page-specific structured data */}
      <StructuredData 
        type="webPage"
        pageName="Blum's Seafood Sylt"
        pageDescription="Exquisite Meeresfrüchte von der Nordseeinsel Sylt"
        pagePath="/blums-seafood-sylt"
        breadcrumbs={breadcrumbs}
      />
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
      
      <div className="min-h-screen">
        {/* Senior-friendly: Breadcrumb navigation for orientation */}
        <Breadcrumb items={breadcrumbs} />
        
        {/* Hero Section - Senior-friendly: Larger text, better contrast */}
        <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Logo brandName="Blum's Seafood Sylt" size="lg" className="mb-8" />
            {/* Senior-friendly: Very large, readable heading */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">
              Blum&apos;s Seafood Sylt
            </h1>
            {/* Senior-friendly: Larger subtitle with better line height */}
            <p className="text-2xl text-deep-sea-blue-100 max-w-2xl mx-auto leading-relaxed">
              Exquisite Meeresfrüchte von der Nordseeinsel Sylt
            </p>
          </div>
        </section>

        {/* Brand Description - Senior-friendly: Larger text, better spacing */}
        <section className="py-16 bg-white" aria-labelledby="about-seafood">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="about-seafood" className="sr-only">Über Blum&apos;s Seafood Sylt</h2>
            <div className="prose prose-xl mx-auto">
              {/* Senior-friendly: Larger paragraph text with excellent readability */}
              <p className="text-deep-sea-blue-700 text-xl md:text-2xl leading-loose">
                Die Marke <strong className="text-deep-sea-blue font-bold">Blum&apos;s Seafood Sylt</strong> kennzeichnet 
                exquisite Meeresfrüchte-Spezialitäten in Premium-Qualität. Unter dieser Marke bieten wir 
                eine erlesene Auswahl an frischen und verarbeiteten Meeresfrüchten, die höchsten 
                kulinarischen Ansprüchen gerecht werden.
              </p>
              <p className="text-deep-sea-blue-700 text-xl md:text-2xl leading-loose mt-8">
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
    </>
  );
}
