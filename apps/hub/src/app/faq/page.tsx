import {
  Container,
  Heading,
  Text,
  Accordion,
  Navigation,
  Footer,
  AnimatedSection,
  Button,
} from '@sylt/ui';
import Link from 'next/link';

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
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Buchung', href: '/booking' },
      { label: 'Kontakt', href: '/contact' },
    ],
  },
];

// FAQ items
const generalFAQs = [
  {
    id: 'checkin-time',
    title: 'Wann kann ich einchecken und auschecken?',
    content: (
      <p>
        Check-in ist ab 15:00 Uhr möglich, Check-out bis 11:00 Uhr. 
        Gegen Aufpreis können wir Ihnen einen Early Check-in ab 12:00 Uhr 
        oder Late Check-out bis 14:00 Uhr anbieten – je nach Verfügbarkeit.
      </p>
    ),
  },
  {
    id: 'cancellation',
    title: 'Wie sind die Stornierungsbedingungen?',
    content: (
      <div>
        <p className="mb-2">
          Unsere flexiblen Stornierungsbedingungen:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Kostenlose Stornierung bis 48 Stunden vor Anreise</li>
          <li>50% Gebühr bei Stornierung innerhalb von 48 Stunden</li>
          <li>100% Gebühr bei Nichterscheinen (No-Show)</li>
        </ul>
        <p className="mt-2 text-sm text-reetdach-400">
          In der Hochsaison (Juni-August) gelten abweichende Bedingungen.
        </p>
      </div>
    ),
  },
  {
    id: 'pets',
    title: 'Sind Haustiere erlaubt?',
    content: (
      <p>
        In ausgewählten Unterkünften heißen wir gut erzogene Hunde herzlich 
        willkommen. Bitte geben Sie bei Ihrer Buchung an, ob Sie mit Haustier 
        anreisen. Es wird ein Aufpreis von 25€ pro Nacht berechnet.
      </p>
    ),
  },
  {
    id: 'parking',
    title: 'Gibt es Parkmöglichkeiten?',
    content: (
      <p>
        Die meisten unserer Unterkünfte verfügen über kostenfreie Parkplätze. 
        Bei den Sylt Rooms stehen Ihnen Tiefgaragenstellplätze zur Verfügung 
        (Reservierung empfohlen, 15€/Tag).
      </p>
    ),
  },
];

const bookingFAQs = [
  {
    id: 'payment',
    title: 'Welche Zahlungsmethoden werden akzeptiert?',
    content: (
      <div>
        <p className="mb-2">Wir akzeptieren:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Kreditkarten (Visa, MasterCard, American Express)</li>
          <li>PayPal</li>
          <li>Banküberweisung (bei Buchung 14+ Tage im Voraus)</li>
          <li>SEPA-Lastschrift</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'deposit',
    title: 'Ist eine Anzahlung erforderlich?',
    content: (
      <p>
        Bei Buchung wird eine Anzahlung von 30% fällig. Der Restbetrag ist 
        14 Tage vor Anreise oder bei Check-in zu zahlen.
      </p>
    ),
  },
  {
    id: 'group-booking',
    title: 'Kann ich für eine größere Gruppe buchen?',
    content: (
      <p>
        Selbstverständlich! Für Gruppenanfragen ab 8 Personen kontaktieren Sie 
        uns bitte direkt unter <a href="mailto:gruppen@blumsylthotels.de" className="text-nordsee-500 hover:underline">gruppen@blumsylthotels.de</a> – 
        wir erstellen Ihnen gerne ein individuelles Angebot.
      </p>
    ),
  },
  {
    id: 'modification',
    title: 'Kann ich meine Buchung ändern?',
    content: (
      <p>
        Buchungsänderungen sind bis 48 Stunden vor Anreise kostenlos möglich, 
        sofern die gewünschte Alternative verfügbar ist. Kontaktieren Sie uns 
        hierfür bitte telefonisch oder per E-Mail.
      </p>
    ),
  },
];

const serviceFAQs = [
  {
    id: 'breakfast',
    title: 'Ist Frühstück inklusive?',
    content: (
      <p>
        In den Sylt Rooms ist ein reichhaltiges Frühstücksbuffet inklusive. 
        Bei den anderen Unterkünften kann Frühstück optional hinzugebucht 
        werden (ab 18€ pro Person).
      </p>
    ),
  },
  {
    id: 'cleaning',
    title: 'Wie oft wird gereinigt?',
    content: (
      <p>
        In den Hotelzimmern erfolgt täglich eine Reinigung. Bei Ferienhäusern 
        und Apartments ist die Endreinigung inklusive. Zwischenreinigung kann 
        gegen Aufpreis gebucht werden.
      </p>
    ),
  },
  {
    id: 'wifi',
    title: 'Gibt es WLAN?',
    content: (
      <p>
        Ja, in allen unseren Unterkünften steht Ihnen kostenloses Highspeed-WLAN 
        zur Verfügung.
      </p>
    ),
  },
];

export default function FAQPage() {
  return (
    <main>
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
              Häufige Fragen
            </Text>
            <Heading as="h1" size="2xl" className="mb-6">
              Wie können wir helfen?
            </Heading>
            <Text variant="lead">
              Hier finden Sie Antworten auf die häufigsten Fragen zu unseren 
              Unterkünften, Buchungen und Services.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      {/* FAQ Sections */}
      <section className="py-section-md bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            {/* General FAQs */}
            <AnimatedSection>
              <Heading as="h2" size="lg" className="mb-8">
                Allgemeine Fragen
              </Heading>
              <Accordion items={generalFAQs} />
            </AnimatedSection>

            {/* Booking FAQs */}
            <AnimatedSection delay={0.1}>
              <Heading as="h2" size="lg" className="mb-8">
                Buchung & Zahlung
              </Heading>
              <Accordion items={bookingFAQs} />
            </AnimatedSection>

            {/* Service FAQs */}
            <AnimatedSection delay={0.2}>
              <Heading as="h2" size="lg" className="mb-8">
                Service & Ausstattung
              </Heading>
              <Accordion items={serviceFAQs} />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-section-md bg-sand-50">
        <Container>
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <Heading as="h2" size="lg" className="mb-4">
              Noch Fragen?
            </Heading>
            <Text className="mb-8">
              Wenn Sie keine Antwort auf Ihre Frage gefunden haben, 
              kontaktieren Sie uns gerne direkt.
            </Text>
            <Link href="/contact">
              <Button>Kontakt aufnehmen</Button>
            </Link>
          </AnimatedSection>
        </Container>
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
