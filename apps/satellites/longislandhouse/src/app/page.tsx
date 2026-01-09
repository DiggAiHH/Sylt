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

// Hampton Style Suites Data
const suites = [
  {
    id: 1,
    name: 'Hamptons Suite',
    description: 'Großzügige Suite mit weißem Holzwerk und maritimem Flair.',
    size: 55,
    capacity: 2,
    price: 420,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format',
  },
  {
    id: 2,
    name: 'Newport Room',
    description: 'Klassische Eleganz mit Blick auf die Dünen.',
    size: 35,
    capacity: 2,
    price: 290,
    image: 'https://images.unsplash.com/photo-1616594039964-40891f922533?w=800&q=80&auto=format',
  },
  {
    id: 3,
    name: 'Montauk Loft',
    description: 'Weitläufiges Loft unter dem Reetdach mit Kamin.',
    size: 70,
    capacity: 4,
    price: 550,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80&auto=format',
  },
];

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format', alt: 'Interior', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1616594039964-40891f922533?w=800&q=80&auto=format', alt: 'Bedroom', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80&auto=format', alt: 'Living Room', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format', alt: 'Detail', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80&auto=format', alt: 'Exterior', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80&auto=format', alt: 'Lounge', width: 800, height: 600 },
];

export default function LongIslandHousePage() {
  return (
    <main>
      <DachmarkenNavigation 
        currentBrand="Long Island House"
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/longislandhouse.mp4"
        posterSrc="/images/longislandhouse-hero.jpg"
        title="Long Island House"
        subtitle="Hampton-Style Eleganz trifft Sylter Charme"
        height="full"
      >
        <Button size="lg" variant="outline">Entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Text variant="accent" className="text-nordsee-500 mb-4">East Coast Feeling</Text>
              <Heading as="h2" size="xl" className="mb-6">Amerikanische Eleganz an der Nordsee</Heading>
              <Text variant="lead" className="mb-8">
                Das Long Island House verbindet den klassischen Hampton-Style mit der einzigartigen 
                Atmosphäre Sylts. Weiße Holzverkleidungen, maritime Details und zeitlose Eleganz 
                schaffen einen Rückzugsort der besonderen Art.
              </Text>
              <div className="flex gap-8">
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">12</span>
                  <span className="text-sm text-reetdach-400">Suiten</span>
                </div>
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">100%</span>
                  <span className="text-sm text-reetdach-400">Hampton Style</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
               <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800)',
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Suites Section */}
      <section id="suiten" className="luxury-section bg-sand-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Unsere Suiten
            </Text>
            <Heading as="h2" size="xl">
              Wohnen wie in den Hamptons
            </Heading>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suites.map((suite, index) => {
               const suiteProperty: Property = {
                id: suite.id.toString(),
                name: suite.name,
                slug: `suite-${suite.id}`,
                type: 'apartment',
                description: suite.description,
                shortDescription: suite.description,
                images: [{
                  url: suite.image,
                  alt: suite.name,
                  width: 800,
                  height: 600,
                  isPrimary: true
                }],
                amenities: [
                  { id: '1', name: `${suite.size} m²`, icon: 'maximize', category: 'comfort' },
                  { id: '2', name: `bis ${suite.capacity} Gäste`, icon: 'users', category: 'comfort' }
                ],
                location: {
                  address: 'Long Island House',
                  city: 'Kampen',
                  postalCode: '25999',
                  country: 'Germany',
                  latitude: 0,
                  longitude: 0,
                  distanceToBeach: '500m'
                },
                rooms: [],
                priceRange: { min: suite.price, max: suite.price, currency: 'EUR' },
                featured: index === 0,
                active: true
              };

              return (
                <AnimatedSection
                  key={suite.id}
                  animation="slideUp"
                  delay={index * 0.1}
                >
                  <PropertyCard property={suiteProperty} />
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
                Ihr Sommer in den Hamptons
              </Heading>
              <Text className="text-nordsee-100 mb-8">
                Erleben Sie den einzigartigen Long Island Lifestyle mitten auf Sylt.
                Buchen Sie jetzt Ihren Aufenthalt im exklusivsten Hideaway der Insel.
              </Text>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-nordsee-600">
                Verfügbarkeit prüfen
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <BookingWidget
                propertyId="longislandhouse"
                variant="sidebar"
                minPrice={290}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <DachmarkenFooter />
    </main>
  );
}
