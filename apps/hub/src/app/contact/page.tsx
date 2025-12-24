import {
  Container,
  Heading,
  Text,
  ContactForm,
  Navigation,
  Footer,
  AnimatedSection,
  JsonLd,
} from '@blumsylt/ui';
import { generateLocalBusinessSchema } from '@sylt/config';
import { Metadata } from 'next';

/**
 * Contact Page SEO Metadata
 * Optimized for local search with business information
 */
export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktieren Sie BLUM Sylt Hotels: Telefon +49 4651 12345, E-Mail info@blumsylthotels.de. Strandweg 1, 25980 Westerland, Sylt.',
  alternates: {
    canonical: 'https://blumsylthotels.de/contact',
  },
  openGraph: {
    title: 'Kontakt | BLUM Sylt Hotels',
    description: 'Kontaktieren Sie uns für Buchungen und Anfragen zu unseren Unterkünften auf Sylt.',
    url: 'https://blumsylthotels.de/contact',
  },
};

// Navigation items
const navItems = [
  { label: 'Unterkünfte', href: '/properties' },
  { label: 'Über Uns', href: '/about' },
  { label: 'Erlebnisse', href: '/experiences' },
  { label: 'Kontakt', href: '/contact' },
];

// Footer columns
const footerColumns = [
  {
    title: 'Unterkünfte',
    links: [
      { label: 'Sylt Rooms', href: 'https://syltrooms.de' },
      { label: 'Privat Homes', href: 'https://privathomes.de' },
      { label: 'Long Island House', href: 'https://longislandhouse.de' },
      { label: 'Auster Appartements', href: 'https://auster-appartements.de' },
      { label: 'Beach Home', href: 'https://beach-home.de' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Buchung', href: '/booking' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' },
    ],
  },
];

export default function ContactPage() {
  // Generate LocalBusiness schema for local search optimization
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <main>
      {/* LocalBusiness Schema.org Structured Data */}
      <JsonLd data={localBusinessSchema} id="local-business-schema" />

      {/* Navigation */}
      <Navigation
        logo={
          <span className="font-heading text-2xl text-charcoal">
            BLUM<span className="text-sand-400">SYLT</span>
          </span>
        }
        items={navItems}
        transparent={false}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-beach">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Kontakt
            </Text>
            <Heading as="h1" size="2xl" className="mb-6">
              Wir freuen uns auf Sie
            </Heading>
            <Text variant="lead">
              Haben Sie Fragen zu unseren Unterkünften oder möchten Sie eine 
              persönliche Beratung? Wir sind für Sie da.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-section-md bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <AnimatedSection animation="slideInLeft" className="lg:col-span-1">
              <div className="space-y-8">
                {/* Address */}
                <div>
                  <h3 className="font-heading text-lg text-charcoal mb-3">
                    Adresse
                  </h3>
                  <address className="not-italic font-body text-reetdach-600 leading-relaxed">
                    BLUM Sylt Hotels GmbH<br />
                    Strandweg 12<br />
                    25999 Kampen / Sylt<br />
                    Deutschland
                  </address>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="font-heading text-lg text-charcoal mb-3">
                    Telefon
                  </h3>
                  <a
                    href="tel:+494651123456"
                    className="font-body text-nordsee-500 hover:text-nordsee-600 transition-colors"
                  >
                    +49 (0) 4651 / 123 456
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h3 className="font-heading text-lg text-charcoal mb-3">
                    E-Mail
                  </h3>
                  <a
                    href="mailto:info@blumsylthotels.de"
                    className="font-body text-nordsee-500 hover:text-nordsee-600 transition-colors"
                  >
                    info@blumsylthotels.de
                  </a>
                </div>

                {/* Opening Hours */}
                <div>
                  <h3 className="font-heading text-lg text-charcoal mb-3">
                    Öffnungszeiten
                  </h3>
                  <p className="font-body text-reetdach-600 leading-relaxed">
                    Montag - Freitag: 9:00 - 18:00 Uhr<br />
                    Samstag: 10:00 - 14:00 Uhr<br />
                    Sonntag: Geschlossen
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="slideInRight" className="lg:col-span-2">
              <div className="bg-sand-50 rounded-lg p-8">
                <Heading as="h2" size="lg" className="mb-6">
                  Schreiben Sie uns
                </Heading>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-sand-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Text className="text-reetdach-400">
            Karte wird hier angezeigt
          </Text>
        </div>
      </section>

      {/* Footer */}
      <Footer
        logo={
          <span className="font-heading text-2xl text-white">
            BLUM<span className="text-sand-400">SYLT</span>
          </span>
        }
        columns={footerColumns}
      />
    </main>
  );
}
