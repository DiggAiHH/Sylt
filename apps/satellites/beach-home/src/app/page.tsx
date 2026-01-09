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

// Beach Home Data
const beachHomes = [
  {
    id: 1,
    name: 'Dünennest',
    description: 'Kuscheliges Reetdachhaus direkt hinter den Dünen.',
    size: 45,
    capacity: 2,
    price: 280,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format',
  },
  {
    id: 2,
    name: 'Strandvilla',
    description: 'Großzügiges Ferienhaus mit direktem Strandzugang.',
    size: 120,
    capacity: 6,
    price: 650,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format',
  },
  {
    id: 3,
    name: 'Meeresrauschen',
    description: 'Modernes Apartment mit Panoramablick auf die Nordsee.',
    size: 65,
    capacity: 4,
    price: 380,
    image: 'https://images.unsplash.com/photo-1511840636560-acee95b3ea27?w=800&q=80&auto=format',
  },
];

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format', alt: 'Strand', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80&auto=format', alt: 'Exterior', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format', alt: 'Interior', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1511840636560-acee95b3ea27?w=800&q=80&auto=format', alt: 'View', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80&auto=format', alt: 'Dunes', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1468413253740-8063aa1f209a?w=800&q=80&auto=format', alt: 'Sunset', width: 800, height: 600 },
];

export default function BeachHomePage() {
  return (
    <main>
      <DachmarkenNavigation 
        currentBrand="Beach Home"
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/beach-home.mp4"
        posterSrc="/images/beach-home-hero.jpg"
        title="Beach Home"
        subtitle="Direkt am Strand – Nordsee pur"
        height="full"
      >
        <Button size="lg" variant="outline">Strandnah entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Text variant="accent" className="text-nordsee-500 mb-4">Meerblick</Text>
              <Heading as="h2" size="xl" className="mb-6">Aufwachen mit Wellenrauschen</Heading>
              <Text variant="lead" className="mb-8">
                Beach Home bietet exklusive Strandunterkünfte mit direktem Zugang zur Nordsee. 
                Erleben Sie das Meer von Ihrer Terrasse aus – ungestört und unvergesslich.
                Der perfekte Ort für alle, die das Meer lieben.
              </Text>
              <div className="flex gap-8">
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">0m</span>
                  <span className="text-sm text-reetdach-400">zum Strand</span>
                </div>
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">100%</span>
                  <span className="text-sm text-reetdach-400">Meerblick</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800)',
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Homes Section */}
      <section id="homes" className="luxury-section bg-sand-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Unsere Unterkünfte
            </Text>
            <Heading as="h2" size="xl">
              Ihr Zuhause am Meer
            </Heading>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beachHomes.map((home, index) => {
              const homeProperty: Property = {
                id: home.id.toString(),
                name: home.name,
                slug: `home-${home.id}`,
                type: 'beach-house',
                description: home.description,
                shortDescription: home.description,
                images: [{
                  url: home.image,
                  alt: home.name,
                  width: 800,
                  height: 600,
                  isPrimary: true
                }],
                amenities: [
                  { id: '1', name: `${home.size} m²`, icon: 'maximize', category: 'comfort' },
                  { id: '2', name: `bis ${home.capacity} Gäste`, icon: 'users', category: 'comfort' }
                ],
                location: {
                  address: 'Beach Home',
                  city: 'Rantum',
                  postalCode: '25980',
                  country: 'Germany',
                  latitude: 0,
                  longitude: 0,
                  distanceToBeach: '0m'
                },
                rooms: [],
                priceRange: { min: home.price, max: home.price, currency: 'EUR' },
                featured: index === 1,
                active: true
              };

              return (
                <AnimatedSection
                  key={home.id}
                  animation="slideUp"
                  delay={index * 0.1}
                >
                  <PropertyCard property={homeProperty} />
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
                Buchen Sie Ihren Traumurlaub
              </Heading>
              <Text className="text-nordsee-100 mb-8">
                Sichern Sie sich jetzt Ihre Auszeit direkt am Meer. 
                Unvergessliche Momente warten auf Sie.
              </Text>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-nordsee-500">
                Jetzt Verfügbarkeit prüfen
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <BookingWidget
                propertyId="beachhome"
                variant="sidebar"
                minPrice={280}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <DachmarkenFooter />
    </main>
  );
}
