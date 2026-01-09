import {
  HeroVideo,
  Container,
  Button,
  AnimatedSection,
  Heading,
  Text,
  DachmarkenNavigation,
  DachmarkenFooter,
  PropertyCard,
  GallerySkeleton,
  Skeleton,
} from '@sylt/ui';
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

// Auster Appartements Data
const apartments = [
  {
    id: 1,
    name: 'City Loft',
    description: 'Modernes Loft mitten in Westerland. Perfekt für Paare.',
    size: 45,
    capacity: 2,
    price: 180,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format',
  },
  {
    id: 2,
    name: 'Hafen Suite',
    description: 'Großzügiges Apartment mit Blick Richtung Hafen.',
    size: 65,
    capacity: 4,
    price: 250,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&auto=format',
  },
  {
    id: 3,
    name: 'Garden Flat',
    description: 'Ruhiges Apartment mit eigener Terrasse und Gartenanteil.',
    size: 55,
    capacity: 3,
    price: 220,
    image: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80&auto=format',
  },
];

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format', alt: 'Loft Interior', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&auto=format', alt: 'Living Room', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80&auto=format', alt: 'Kitchen', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80&auto=format', alt: 'Bedroom', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format', alt: 'Bathroom', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80&auto=format', alt: 'Terrace', width: 800, height: 600 },
];

export default function AusterAppartementsPage() {
  return (
    <main>
      <DachmarkenNavigation 
        currentBrand="Auster Appartements"
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/auster.mp4"
        posterSrc="/images/auster-hero.jpg"
        title="Auster Appartements"
        subtitle="Moderne Apartments im Herzen der Insel"
        height="full"
      >
        <Button size="lg" variant="outline">Apartments entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Text variant="accent" className="text-nordsee-500 mb-4">Urban Living</Text>
              <Heading as="h2" size="xl" className="mb-6">Modernes Wohnen auf Sylt</Heading>
              <Text variant="lead" className="mb-8">
                Die Auster Appartements vereinen zeitgenössisches Design mit Sylter Lebensart. 
                Hochwertige Ausstattung, klare Linien und durchdachte Grundrisse schaffen 
                den perfekten Rückzugsort mitten im Leben.
              </Text>
              <div className="flex gap-8">
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">Zentral</span>
                  <span className="text-sm text-reetdach-400">Lage</span>
                </div>
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">Design</span>
                  <span className="text-sm text-reetdach-400">Interieur</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800)',
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Apartments Section */}
      <section id="apartments" className="luxury-section bg-sand-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Unsere Apartments
            </Text>
            <Heading as="h2" size="xl">
              Stilvoll & Zentral
            </Heading>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt, index) => {
              const aptProperty: Property = {
                id: apt.id.toString(),
                name: apt.name,
                slug: `apt-${apt.id}`,
                type: 'apartment',
                description: apt.description,
                shortDescription: apt.description,
                images: [{
                  url: apt.image,
                  alt: apt.name,
                  width: 800,
                  height: 600,
                  isPrimary: true
                }],
                amenities: [
                  { id: '1', name: `${apt.size} m²`, icon: 'maximize', category: 'comfort' },
                  { id: '2', name: `bis ${apt.capacity} Gäste`, icon: 'users', category: 'comfort' }
                ],
                location: {
                  address: 'Auster Appartements',
                  city: 'Westerland',
                  postalCode: '25980',
                  country: 'Germany',
                  latitude: 0,
                  longitude: 0,
                  distanceToBeach: '400m'
                },
                rooms: [],
                priceRange: { min: apt.price, max: apt.price, currency: 'EUR' },
                featured: index === 0,
                active: true
              };

              return (
                <AnimatedSection
                  key={apt.id}
                  animation="slideUp"
                  delay={index * 0.1}
                >
                  <PropertyCard property={aptProperty} />
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
      <section className="luxury-section bg-nordsee-600">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Heading as="h2" size="xl" className="text-white mb-6">
                Ihr City-Trip nach Sylt
              </Heading>
              <Text className="text-nordsee-100 mb-8">
                Genießen Sie die perfekte Kombination aus Strandnähe und urbanem Leben.
                Buchen Sie jetzt Ihr Apartment in Westerland.
              </Text>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-nordsee-600">
                Verfügbarkeit prüfen
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <BookingWidget
                propertyId="auster"
                variant="sidebar"
                minPrice={180}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <DachmarkenFooter />
    </main>
  );
}
