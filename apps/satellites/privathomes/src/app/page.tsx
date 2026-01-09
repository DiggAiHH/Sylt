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

// Privat Homes Data
const houses = [
  {
    id: 1,
    name: 'Reetdachhaus Kampen',
    description: 'Exklusives Anwesen mit großem Garten und Wellness-Bereich.',
    size: 180,
    capacity: 8,
    price: 850,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format',
    featured: true,
  },
  {
    id: 2,
    name: 'Dünenvilla Rantum',
    description: 'Alleinstehendes Haus inmitten der Rantumer Dünenlandschaft.',
    size: 140,
    capacity: 6,
    price: 650,
    image: 'https://images.unsplash.com/photo-1600596542815-2250657d2fc5?w=800&q=80&auto=format',
    featured: false,
  },
  {
    id: 3,
    name: 'Kapitäns-Haus Keitum',
    description: 'Historisches Friesenhaus mit modernem Interieur.',
    size: 120,
    capacity: 5,
    price: 550,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format',
    featured: false,
  },
];

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format', alt: 'Exterior', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1600596542815-2250657d2fc5?w=800&q=80&auto=format', alt: 'Garden', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format', alt: 'Living Room', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format', alt: 'Kitchen', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format', alt: 'Bedroom', width: 800, height: 600 },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format', alt: 'Pool', width: 800, height: 600 },
];

export default function PrivatHomesPage() {
  return (
    <main>
      <DachmarkenNavigation 
        currentBrand="Privat Homes"
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/privathomes.mp4"
        posterSrc="/images/privathomes-hero.jpg"
        title="Privat Homes"
        subtitle="Luxuriöse Ferienhäuser für gehobene Ansprüche"
        height="full"
      >
        <Button size="lg" variant="outline">Häuser entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideInLeft">
              <Text variant="accent" className="text-nordsee-500 mb-4">Exklusivität</Text>
              <Heading as="h2" size="xl" className="mb-6">Ihr privates Refugium auf Sylt</Heading>
              <Text variant="lead" className="mb-8">
                Unsere handverlesenen Ferienhäuser bieten höchsten Komfort und absolute Privatsphäre. 
                Jedes Haus ist ein Unikat mit eigenem Charakter und erstklassiger Ausstattung.
                Genießen Sie die Freiheit eines eigenen Hauses mit dem Service eines Luxushotels.
              </Text>
              <div className="flex gap-8">
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">100%</span>
                  <span className="text-sm text-reetdach-400">Privatsphäre</span>
                </div>
                <div>
                  <span className="block font-heading text-4xl text-nordsee-500">Premium</span>
                  <span className="text-sm text-reetdach-400">Ausstattung</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800)',
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Houses Section */}
      <section id="houses" className="luxury-section bg-sand-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <Text variant="accent" className="text-nordsee-500 mb-4">
              Unsere Häuser
            </Text>
            <Heading as="h2" size="xl">
              Einzigartige Anwesen
            </Heading>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8">
            {houses.map((house, index) => {
              const houseProperty: Property = {
                id: house.id.toString(),
                name: house.name,
                slug: `house-${house.id}`,
                type: 'vacation-home',
                description: house.description,
                shortDescription: house.description,
                images: [{
                  url: house.image,
                  alt: house.name,
                  width: 800,
                  height: 600,
                  isPrimary: true
                }],
                amenities: [
                  { id: '1', name: `${house.size} m²`, icon: 'maximize', category: 'comfort' },
                  { id: '2', name: `bis ${house.capacity} Gäste`, icon: 'users', category: 'comfort' }
                ],
                location: {
                  address: 'Privat Homes',
                  city: 'Sylt',
                  postalCode: '25980',
                  country: 'Germany',
                  latitude: 0,
                  longitude: 0,
                  distanceToBeach: '800m'
                },
                rooms: [],
                priceRange: { min: house.price, max: house.price, currency: 'EUR' },
                featured: house.featured,
                active: true
              };

              return (
                <AnimatedSection
                  key={house.id}
                  animation="slideUp"
                  delay={index * 0.1}
                >
                  <PropertyCard 
                    property={houseProperty} 
                    variant={house.featured ? 'featured' : 'default'}
                    className={house.featured ? 'lg:col-span-2' : ''}
                  />
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
                Finden Sie Ihr Traumhaus
              </Heading>
              <Text className="text-nordsee-100 mb-8">
                Ob Reetdachhaus in Kampen oder Strandvilla in Rantum – wir haben das perfekte
                Feriendomizil für Ihren nächsten Sylt-Urlaub.
              </Text>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-nordsee-600">
                Jetzt anfragen
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="slideInRight">
              <BookingWidget
                propertyId="privathomes"
                variant="sidebar"
                minPrice={550}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <DachmarkenFooter />
    </main>
  );
}
