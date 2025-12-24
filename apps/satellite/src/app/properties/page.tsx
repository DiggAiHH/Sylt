'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getBrand, hubConfig } from '@blumsylt/shared';
import type { BrandId } from '@blumsylt/shared';
import { Section, Container, Heading, Text, Grid, Card, CardImage, CardContent, BookingOverlay } from '@blumsylt/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Get brand from environment variable
const brandId = (process.env.NEXT_PUBLIC_BRAND_ID || 'syltrooms') as BrandId;
const brand = getBrand(brandId);

// Mock properties - would come from API in production
const allProperties = [
  {
    id: 'property-1',
    name: 'Strandhaus Kampen',
    shortDescription: 'Luxuriöses Strandhaus mit Meerblick und direktem Strandzugang',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    pricePerNight: 450,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['Meerblick', 'Sauna', 'Kamin'],
  },
  {
    id: 'property-2',
    name: 'Dünenvilla List',
    shortDescription: 'Moderne Villa in den Dünen mit privatem Garten',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    pricePerNight: 380,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['Garten', 'WLAN', 'Küche'],
  },
  {
    id: 'property-3',
    name: 'Hafenblick Apartment',
    shortDescription: 'Gemütliches Apartment am Hafen mit maritimem Flair',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    pricePerNight: 220,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['Hafenblick', 'Balkon', 'WLAN'],
  },
  {
    id: 'property-4',
    name: 'Reetdach-Cottage Keitum',
    shortDescription: 'Traditionelles Friesenhaus im malerischen Keitum',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    pricePerNight: 320,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['Reetdach', 'Garten', 'Kamin'],
  },
  {
    id: 'property-5',
    name: 'Penthouse Westerland',
    shortDescription: 'Exklusives Penthouse mit Panoramablick über die Nordsee',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    pricePerNight: 550,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['Panoramablick', 'Dachterrasse', 'Sauna'],
  },
  {
    id: 'property-6',
    name: 'Strandnah Studio',
    shortDescription: 'Modernes Studio nur wenige Schritte vom Strand',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    pricePerNight: 150,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['Strandnähe', 'WLAN', 'Küche'],
  },
];

export default function PropertiesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof allProperties[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  const handlePropertyClick = (property: typeof allProperties[0]) => {
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  const filteredProperties = allProperties.filter(property => {
    if (filter === 'all') return true;
    if (filter === 'small') return property.maxGuests <= 2;
    if (filter === 'medium') return property.maxGuests >= 3 && property.maxGuests <= 4;
    if (filter === 'large') return property.maxGuests >= 5;
    return true;
  });

  return (
    <>
      <Header brand={brand} />

      <main className="pt-24">
        {/* Hero */}
        <section 
          className="py-20 md:py-28"
          style={{ backgroundColor: brand.secondaryColor }}
        >
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Heading as="h1" className="text-reetdach-900 mb-6">
                  Unsere Unterkünfte
                </Heading>
                <Text className="text-lg">
                  Entdecken Sie unsere handverlesene Auswahl an exklusiven Ferienunterkünften auf Sylt. 
                  Jede Unterkunft wurde sorgfältig ausgewählt, um Ihnen einen unvergesslichen Aufenthalt zu ermöglichen.
                </Text>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Filter */}
        <Section background="white">
          <Container>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { value: 'all', label: 'Alle Unterkünfte' },
                { value: 'small', label: 'Für 1-2 Gäste' },
                { value: 'medium', label: 'Für 3-4 Gäste' },
                { value: 'large', label: 'Für 5+ Gäste' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setFilter(option.value as typeof filter)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    filter === option.value
                      ? 'text-white'
                      : 'text-reetdach-600 bg-sand-100 hover:bg-sand-200'
                  }`}
                  style={{
                    backgroundColor: filter === option.value ? brand.primaryColor : undefined,
                  }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>

            {/* Properties Grid */}
            <Grid cols={3} gap="lg">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card hover onClick={() => handlePropertyClick(property)}>
                    <div className="relative">
                      <CardImage 
                        src={property.image} 
                        alt={property.name}
                        className="h-64"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="font-medium" style={{ color: brand.primaryColor }}>
                          €{property.pricePerNight}/Nacht
                        </span>
                      </div>
                    </div>
                    <CardContent>
                      <h3 className="font-serif text-xl text-reetdach-900 mb-2">
                        {property.name}
                      </h3>
                      <p className="text-reetdach-600 text-sm mb-4">
                        {property.shortDescription}
                      </p>
                      
                      {/* Property Stats */}
                      <div className="flex items-center gap-4 text-sm text-reetdach-500 mb-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {property.bedrooms} Schlafzimmer
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          max. {property.maxGuests} Gäste
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 bg-sand-100 text-reetdach-600 rounded text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-t border-reetdach-100">
                        <button
                          className="w-full py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: brand.primaryColor }}
                        >
                          Verfügbarkeit prüfen
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Grid>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Text className="text-lg">
                  Keine Unterkünfte gefunden. Bitte versuchen Sie einen anderen Filter.
                </Text>
              </div>
            )}
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
        hubUrl={hubConfig.baseUrl}
        propertyId={selectedProperty?.id}
        propertyName={selectedProperty?.name}
      />
    </>
  );
}
