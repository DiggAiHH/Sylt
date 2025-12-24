import {
  HeroVideo,
  Container,
  Button,
  AnimatedSection,
  Heading,
  Text,
  Navigation,
  Footer,
  Gallery,
  BookingWidget,
  Card,
} from '@sylt/ui';
import { satelliteConfigs } from '@sylt/config';
import Link from 'next/link';

const config = satelliteConfigs.syltrooms;

// Room data
const rooms = [
  {
    id: 1,
    name: 'Dünenblick Suite',
    description: 'Elegante Suite mit Panoramafenster und Blick auf die Dünenlandschaft',
    size: 45,
    capacity: 2,
    price: 350,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
  },
  {
    id: 2,
    name: 'Meereszimmer',
    description: 'Gemütliches Zimmer mit indirektem Meerblick',
    size: 32,
    capacity: 2,
    price: 280,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  },
  {
    id: 3,
    name: 'Strandsuite',
    description: 'Luxuriöse Suite mit direktem Strandblick und Balkon',
    size: 55,
    capacity: 4,
    price: 450,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
  },
  {
    id: 4,
    name: 'Gartenzimmer',
    description: 'Ruhiges Zimmer mit Blick auf den gepflegten Garten',
    size: 28,
    capacity: 2,
    price: 220,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
  },
  {
    id: 5,
    name: 'Penthouse Suite',
    description: 'Exklusive Dachsuite mit 360° Panoramablick',
    size: 75,
    capacity: 4,
    price: 650,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
  },
];

// Gallery images
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', alt: 'Zimmer 1', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', alt: 'Zimmer 2', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', alt: 'Zimmer 3', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', alt: 'Zimmer 4', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', alt: 'Zimmer 5', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', alt: 'Badezimmer', width: 800, height: 600 },
];

// Navigation items
const navItems = [
  { label: 'Zimmer', href: '#zimmer' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Lage', href: '#lage' },
  { label: 'Kontakt', href: '#kontakt' },
];

// Footer columns
const footerColumns = [
  {
    title: 'Sylt Rooms',
    links: [
      { label: 'Unsere Zimmer', href: '#zimmer' },
      { label: 'Preise', href: '#preise' },
      { label: 'Ausstattung', href: '#ausstattung' },
    ],
  },
  {
    title: 'BLUM Hotels',
    links: [
      { label: 'blumsylthotels.de', href: 'https://blumsylthotels.de' },
      { label: 'Alle Unterkünfte', href: 'https://blumsylthotels.de/properties' },
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

export default function SyltroomsPage() {
  return (
    <main>
      {/* Navigation */}
      <Navigation
        logo={
          <span className="font-heading text-2xl text-white">
            SYLT<span className="text-sand-400">ROOMS</span>
          </span>
        }
        items={navItems}
        transparent={true}
      />

      {/* Hero Section */}
      <HeroVideo
        videoSrc="/videos/sylt-rooms.mp4"
        posterSrc="/images/sylt-rooms-hero.jpg"
        title="Sylt Rooms"
        subtitle="10 exklusive Hotelzimmer mit Dünenblick"
        height="full"
      >
        <Button size="lg" variant="outline">
          Zimmer entdecken
        </Button>
      </HeroVideo>

      {/* Introduction */}
      <section className="luxury-section bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Text variant="accent" className="text-nordsee-500 mb-4">
                Boutique Experience
              </Text>
              <Heading as="h2" size="xl" className="mb-6">
                Intimität trifft Luxus
              </Heading>
              <Text variant="lead" className="mb-8">
                Mit nur 10 individuell gestalteten Zimmern bieten wir ein
                unvergleichliches Boutique-Erlebnis. Jedes Zimmer erzählt seine
                eigene Geschichte und verbindet traditionelle Sylter Eleganz mit
                modernem Komfort.
              </Text>
              <div className="flex gap-8">
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">10</span>
                  <span className="text-sm text-reetdach-400">Zimmer</span>
                </div>
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">200m</span>
                  <span className="text-sm text-reetdach-400">zum Strand</span>
                </div>
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">5★</span>
                  <span className="text-sm text-reetdach-400">Service</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800)',
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Rooms Section */}
      <section id="zimmer" className="luxury-section bg-sand-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Unsere Zimmer
            </Text>
            <Heading as="h2" size="xl">
              Finden Sie Ihr Traumzimmer
            </Heading>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <AnimatedSection
                key={room.id}
                animation="slideUp"
                delay={index * 0.1}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div
                    className="aspect-[4/3] bg-cover bg-center"
                    style={{ backgroundImage: `url(${room.image})` }}
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-charcoal mb-2">
                      {room.name}
                    </h3>
                    <p className="font-body text-reetdach-500 text-sm mb-4">
                      {room.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-reetdach-400 mb-4">
                      <span>{room.size} m²</span>
                      <span>•</span>
                      <span>bis zu {room.capacity} Gäste</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-heading text-2xl text-charcoal">
                          €{room.price}
                        </span>
                        <span className="text-sm text-reetdach-400"> / Nacht</span>
                      </div>
                      <Button size="sm">Buchen</Button>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section id="galerie" className="luxury-section bg-white">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Impressionen
            </Text>
            <Heading as="h2" size="xl">
              Galerie
            </Heading>
          </AnimatedSection>

          <Gallery images={galleryImages} columns={3} />
        </Container>
      </section>

      {/* Booking Widget Section */}
      <section className="luxury-section bg-nordsee-500">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Heading as="h2" size="xl" className="text-white mb-6">
                Jetzt buchen
              </Heading>
              <Text className="text-nordsee-100 mb-8">
                Sichern Sie sich Ihr exklusives Zimmer auf Sylt. Direkte Buchung
                ohne Zwischenhändler für den besten Preis.
              </Text>
              <ul className="space-y-3 text-white font-body">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sand-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bestpreisgarantie
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sand-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Kostenlose Stornierung bis 48h vor Anreise
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sand-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Persönlicher Service
                </li>
              </ul>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <BookingWidget
                propertyId="syltrooms"
                variant="sidebar"
                minPrice={220}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer
        logo={
          <span className="font-heading text-2xl text-white">
            SYLT<span className="text-sand-400">ROOMS</span>
          </span>
        }
        columns={footerColumns}
        copyright="© 2024 Sylt Rooms - Ein BLUM Sylt Hotel"
      />
    </main>
  );
}
