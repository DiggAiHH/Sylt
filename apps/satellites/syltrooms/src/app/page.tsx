import {
  HeroVideo,
  Container,
  Button,
  AnimatedSection,
  Heading,
  Text,
  DachmarkenNavigation,
  DachmarkenFooter,
  Card,
  PropertyCard,
  GallerySkeleton,
  Skeleton,
} from '@sylt/ui';
import { satelliteConfigs } from '@sylt/config';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Property } from '@sylt/types';

const Gallery = dynamic(() => import('@sylt/ui').then((mod) => mod.Gallery), {
  loading: () => <GallerySkeleton />,
  ssr: false,
});

const BookingWidget = dynamic(() => import('@sylt/ui').then((mod) => mod.BookingWidget), {
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl bg-sand-100" />,
  ssr: false,
});

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
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format',
  },
  {
    id: 2,
    name: 'Meereszimmer',
    description: 'Gemütliches Zimmer mit indirektem Meerblick',
    size: 32,
    capacity: 2,
    price: 280,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&auto=format',
  },
  {
    id: 3,
    name: 'Strandsuite',
    description: 'Luxuriöse Suite mit direktem Strandblick und Balkon',
    size: 55,
    capacity: 4,
    price: 450,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format',
  },
  {
    id: 4,
    name: 'Gartenzimmer',
    description: 'Ruhiges Zimmer mit Blick auf den gepflegten Garten',
    size: 28,
    capacity: 2,
    price: 220,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80&auto=format',
  },
  {
    id: 5,
    name: 'Penthouse Suite',
    description: 'Exklusive Dachsuite mit 360° Panoramablick',
    size: 75,
    capacity: 4,
    price: 650,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format',
  },
];

// Gallery images
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format', alt: 'Zimmer 1', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&auto=format', alt: 'Zimmer 2', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format', alt: 'Zimmer 3', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80&auto=format', alt: 'Zimmer 4', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format', alt: 'Zimmer 5', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80&auto=format', alt: 'Badezimmer', width: 800, height: 600 },
];

export default function SyltroomsPage() {
  return (
    <main>
      {/* Navigation */}
      <DachmarkenNavigation
        currentBrand="Sylt Rooms"
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
            {rooms.map((room, index) => {
              // Transform simple room data to full Property object for the card
              const roomProperty: Property = {
                id: room.id.toString(),
                name: room.name,
                slug: `room-${room.id}`,
                type: 'hotel-room',
                description: room.description,
                shortDescription: room.description,
                images: [{
                  url: room.image,
                  alt: room.name,
                  width: 800,
                  height: 600,
                  isPrimary: true
                }],
                amenities: [
                  { id: '1', name: `${room.size} m²`, icon: 'maximize', category: 'comfort' },
                  { id: '2', name: `bis ${room.capacity} Gäste`, icon: 'users', category: 'comfort' }
                ],
                location: {
                  address: 'Sylt Rooms',
                  city: 'Westerland',
                  postalCode: '25980',
                  country: 'Germany',
                  latitude: 0,
                  longitude: 0,
                  distanceToBeach: '200m'
                },
                rooms: [],
                priceRange: { min: room.price, max: room.price, currency: 'EUR' },
                featured: false,
                active: true
              };

              return (
                <AnimatedSection
                  key={room.id}
                  animation="slideUp"
                  delay={index * 0.1}
                >
                  <PropertyCard property={roomProperty} />
                </AnimatedSection>
              );
            })}
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

          <AnimatedSection animation="fadeIn" delay={0.2}>
            <Gallery images={galleryImages} columns={3} />
          </AnimatedSection>
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
      <DachmarkenFooter />
    </main>
  );
}
