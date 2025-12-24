'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroVideo, HeroImage, BookingOverlay, Section, Container, Heading, Text, Grid, Card, CardImage, CardContent, Button } from '@blumsylt/ui';
import { ParallaxSection, ParallaxText } from '@blumsylt/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBrandConfig, getHubUrl } from '@/lib/config';

// Get brand configuration - uses NEXT_PUBLIC_BRAND_ID embedded at build time
const { brand } = getBrandConfig();
const hubUrl = getHubUrl();

// Mock featured properties - would come from API in production
const featuredProperties = [
  {
    id: 'property-1',
    name: 'Strandhaus Kampen',
    shortDescription: 'Luxuriöses Strandhaus mit Meerblick',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    pricePerNight: 450,
    bedrooms: 3,
    maxGuests: 6,
  },
  {
    id: 'property-2',
    name: 'Dünenvilla List',
    shortDescription: 'Moderne Villa in den Dünen',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    pricePerNight: 380,
    bedrooms: 2,
    maxGuests: 4,
  },
  {
    id: 'property-3',
    name: 'Hafenblick Apartment',
    shortDescription: 'Gemütliches Apartment am Hafen',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    pricePerNight: 220,
    bedrooms: 1,
    maxGuests: 2,
  },
];

export default function SatelliteHomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof featuredProperties[0] | null>(null);

  const handlePropertyClick = (property: typeof featuredProperties[0]) => {
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  return (
    <>
      <Header brand={brand} />

      <main>
        {/* Hero Section with Video or Image */}
        {brand.heroVideo ? (
          <HeroVideo
            videoSrc={brand.heroVideo}
            posterSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
            title={brand.name}
            subtitle={brand.tagline}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              style={{ backgroundColor: 'white', color: brand.primaryColor }}
            >
              Jetzt buchen
            </Button>
          </HeroVideo>
        ) : (
          <HeroImage
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
            alt="Sylt Strand"
            title={brand.name}
            subtitle={brand.tagline}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-4 bg-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
              style={{ color: brand.primaryColor }}
            >
              Jetzt buchen
            </motion.button>
          </HeroImage>
        )}

        {/* About Section with Parallax */}
        <Section background="sand">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ParallaxText speed={0.1} direction="up">
                <Heading as="h2" className="text-reetdach-900 mb-6">
                  {brand.description}
                </Heading>
                <Text className="text-lg mb-8">
                  Erleben Sie Sylt von seiner schönsten Seite. Unsere handverlesenen Unterkünfte 
                  bieten Ihnen den perfekten Rahmen für einen unvergesslichen Aufenthalt an der Nordsee.
                </Text>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="/properties"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    Alle Unterkünfte
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </ParallaxText>
              
              <ParallaxSection speed={0.15}>
                <div className="rounded-2xl overflow-hidden luxury-shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"
                    alt="Sylt Unterkunft"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </ParallaxSection>
            </div>
          </Container>
        </Section>

        {/* Featured Properties */}
        <Section>
          <Container>
            <div className="text-center mb-16">
              <Heading as="h2" className="text-reetdach-900 mb-4">
                Unsere Empfehlungen
              </Heading>
              <Text className="max-w-2xl mx-auto">
                Entdecken Sie unsere handverlesene Auswahl an exklusiven Ferienunterkünften.
              </Text>
            </div>

            <Grid cols={3} gap="lg">
              {featuredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover onClick={() => handlePropertyClick(property)}>
                    <CardImage 
                      src={property.image} 
                      alt={property.name}
                      className="h-64"
                    />
                    <CardContent>
                      <h3 className="font-serif text-xl text-reetdach-900 mb-2">
                        {property.name}
                      </h3>
                      <p className="text-reetdach-600 text-sm mb-4">
                        {property.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-reetdach-500">
                          <span>{property.bedrooms} Schlafzimmer</span>
                          <span>•</span>
                          <span>max. {property.maxGuests} Gäste</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-reetdach-100 flex items-center justify-between">
                        <span className="font-serif text-xl" style={{ color: brand.primaryColor }}>
                          ab €{property.pricePerNight}
                        </span>
                        <span className="text-sm text-reetdach-400">pro Nacht</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Grid>

            <div className="text-center mt-12">
              <motion.a
                href="/properties"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 rounded-lg font-medium transition-colors hover:bg-sand-50"
                style={{ borderColor: brand.primaryColor, color: brand.primaryColor }}
              >
                Alle Unterkünfte entdecken
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </Container>
        </Section>

        {/* Parallax Image Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <ParallaxSection speed={0.3} className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
              alt="Sylt Strand"
              className="w-full h-[120%] object-cover"
            />
          </ParallaxSection>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                Ihr Traumurlaub beginnt hier
              </h2>
              <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
                Lassen Sie den Alltag hinter sich und genießen Sie die einzigartige Atmosphäre von Sylt.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-4 bg-white rounded-lg font-medium text-lg shadow-lg"
                style={{ color: brand.primaryColor }}
              >
                Verfügbarkeit prüfen
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <Section background="white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  title: 'Handverlesene Unterkünfte',
                  description: 'Jede unserer Unterkünfte wird persönlich ausgewählt und erfüllt höchste Qualitätsstandards.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Schnelle Buchung',
                  description: 'Buchen Sie Ihre Traumunterkunft in wenigen Minuten mit sofortiger Bestätigung.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  title: 'Persönlicher Service',
                  description: 'Unser Team steht Ihnen vor, während und nach Ihrem Aufenthalt zur Verfügung.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: brand.secondaryColor, color: brand.primaryColor }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-reetdach-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-reetdach-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <Footer brand={brand} />

      {/* Booking Overlay */}
      <BookingOverlay
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedProperty(null);
        }}
        brand={brand}
        hubUrl={hubUrl}
        propertyId={selectedProperty?.id}
        propertyName={selectedProperty?.name}
      />
    </>
  );
}
