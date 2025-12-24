import {
  HeroVideo,
  Container,
  Button,
  AnimatedSection,
  Heading,
  Text,
  Navigation,
  Footer,
  ParallaxSection,
  Testimonials,
  Stats,
} from '@sylt/ui';
import { colors } from '@sylt/config';
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
      { label: 'Auster Appartements', href: 'https://auster-appartements.de' },
      { label: 'Beach Home', href: 'https://beach-home.de' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Buchung', href: '/booking' },
      { label: 'Stornierung', href: '/cancellation' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Geschenkgutscheine', href: '/gift-cards' },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { label: 'Anfahrt', href: '/directions' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Karriere', href: '/careers' },
      { label: 'Presse', href: '/press' },
    ],
  },
];

// Property types for showcase
const propertyTypes = [
  {
    title: 'Sylt Rooms',
    description: '10 exklusive Hotelzimmer mit Blick auf die Dünen',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    href: 'https://syltrooms.de',
  },
  {
    title: 'Privat Homes',
    description: 'Luxuriöse Ferienhäuser für gehobene Ansprüche',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    href: 'https://privathomes.de',
  },
  {
    title: 'Long Island House',
    description: 'Hampton-Style Eleganz trifft Sylter Charme',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    href: 'https://longislandhouse.de',
  },
  {
    title: 'Auster Appartements',
    description: 'Moderne Apartments im Herzen der Insel',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    href: 'https://auster-appartements.de',
  },
  {
    title: 'Beach Home',
    description: 'Direkt am Strand – Nordsee pur',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    href: 'https://beach-home.de',
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Navigation */}
      <Navigation
        logo={
          <span className="font-heading text-2xl text-white">
            BLUM<span className="text-sand-400">SYLT</span>
          </span>
        }
        items={navItems}
        transparent={true}
      />

      {/* Hero Section */}
      <HeroVideo
        videoSrc="/videos/sylt-waves.mp4"
        posterSrc="/images/sylt-hero.jpg"
        title="Willkommen auf Sylt"
        subtitle="Erleben Sie zeitlose Eleganz an der Nordsee"
        height="full"
      >
        <Button size="lg" variant="outline">
          Unterkünfte entdecken
        </Button>
      </HeroVideo>

      {/* Introduction Section */}
      <section className="luxury-section luxury-gradient">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Quiet Luxury
            </Text>
            <Heading as="h2" size="xl" className="mb-6">
              Exklusive Unterkünfte für unvergessliche Momente
            </Heading>
            <Text variant="lead" className="mb-8">
              Von eleganten Hotelzimmern bis hin zu weitläufigen Ferienhäusern –
              unsere handverlesenen Unterkünfte verbinden nordische Ästhetik mit
              modernem Luxus. Entdecken Sie die Schönheit Sylts in einer Atmosphäre
              vollkommener Entspannung.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      {/* Property Types Section */}
      <section className="luxury-section bg-white">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Unsere Häuser
            </Text>
            <Heading as="h2" size="xl">
              Fünf einzigartige Welten
            </Heading>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyTypes.map((property, index) => (
              <AnimatedSection
                key={property.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <Link
                  href={property.href}
                  className="group block relative overflow-hidden rounded-lg aspect-[4/5]"
                  target="_blank"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${property.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-heading text-2xl text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="font-body text-sand-200 text-sm">
                      {property.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-sand-300 text-sm font-body tracking-wide group-hover:text-white transition-colors">
                      Entdecken
                      <svg
                        className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
        overlay
        overlayOpacity={0.6}
        className="luxury-section"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Text variant="accent" className="text-sand-300 mb-4">
                Unser Versprechen
              </Text>
              <Heading as="h2" size="xl" className="text-white mb-6">
                Mehr als nur Übernachten
              </Heading>
              <Text className="text-sand-200 mb-8">
                Bei BLUM Sylt Hotels bedeutet Gastfreundschaft, dass jeder Moment
                zu einem besonderen Erlebnis wird. Von der ersten Buchung bis zum
                letzten Sonnenuntergang am Strand – wir kümmern uns um jedes Detail.
              </Text>
              <Button variant="outline">Mehr erfahren</Button>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" className="grid grid-cols-2 gap-6">
              {[
                { icon: '🏖️', title: 'Strandnähe', desc: 'Wenige Schritte zum Meer' },
                { icon: '🍽️', title: 'Kulinarik', desc: 'Regionale Spezialitäten' },
                { icon: '🧖', title: 'Wellness', desc: 'Entspannung pur' },
                { icon: '🚴', title: 'Aktivitäten', desc: 'Erlebnisse vor Ort' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-center"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h4 className="font-heading text-lg text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="font-body text-sm text-sand-300">{feature.desc}</p>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </Container>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="luxury-section bg-white">
        <Container>
          <Stats
            stats={[
              { value: '5', label: 'Einzigartige Häuser' },
              { value: '50', suffix: '+', label: 'Unterkünfte' },
              { value: '15', label: 'Jahre Erfahrung' },
              { value: '98', suffix: '%', label: 'Zufriedene Gäste' },
            ]}
          />
        </Container>
      </section>

      {/* Testimonials Section */}
      <Testimonials
        testimonials={[
          {
            id: '1',
            name: 'Familie Schmidt',
            location: 'Hamburg',
            text: 'Ein unvergesslicher Urlaub! Das Strandhaus war traumhaft und der Service erstklassig. Wir kommen definitiv wieder.',
            rating: 5,
          },
          {
            id: '2',
            name: 'Dr. Michael Weber',
            location: 'München',
            text: 'Die perfekte Mischung aus Luxus und nordischer Gemütlichkeit. Das Long Island House hat alle Erwartungen übertroffen.',
            rating: 5,
          },
          {
            id: '3',
            name: 'Anna & Thomas K.',
            location: 'Berlin',
            text: 'Sylt Rooms bietet alles, was man für einen entspannten Kurzurlaub braucht. Besonders das Frühstück war hervorragend!',
            rating: 5,
          },
        ]}
        subtitle="Erfahrungen und Bewertungen unserer Gäste"
      />

      {/* CTA Section */}
      <section className="luxury-section bg-nordsee-500">
        <Container>
          <AnimatedSection className="text-center">
            <Heading as="h2" size="xl" className="text-white mb-6">
              Bereit für Ihren Sylt-Urlaub?
            </Heading>
            <Text className="text-nordsee-100 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine persönliche Beratung oder buchen Sie
              direkt Ihre Traumunterkunft online.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Jetzt buchen
              </Button>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="text-white hover:bg-nordsee-400">
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>
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
        socialLinks={{
          instagram: 'https://instagram.com/blumsylt',
          facebook: 'https://facebook.com/blumsylt',
          pinterest: 'https://pinterest.com/blumsylt',
        }}
      />
    </main>
  );
}
