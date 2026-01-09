import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@sylt/shared';
import { AnimatedSection, Button } from '@sylt/ui';
import type { BrandId } from '@sylt/shared';

// Mock properties data - würde in Produktion aus API/DB kommen
const mockProperties = [
  {
    id: 'property-1',
    brandId: 'syltrooms' as BrandId,
    name: 'Strandhaus Kampen',
    shortDescription: 'Luxuriöses Strandhaus mit direktem Meerblick',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    pricePerNight: 450,
    bedrooms: 3,
    maxGuests: 6,
    location: 'Kampen',
  },
  {
    id: 'property-2',
    brandId: 'privathomes' as BrandId,
    name: 'Reetdachhaus List',
    shortDescription: 'Traditionelles Reetdachhaus in ruhiger Lage',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    pricePerNight: 520,
    bedrooms: 4,
    maxGuests: 8,
    location: 'List',
  },
  {
    id: 'property-3',
    brandId: 'longislandhouse' as BrandId,
    name: 'Hampton Suite',
    shortDescription: 'Elegante Suite im amerikanischen East Coast Stil',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    pricePerNight: 280,
    bedrooms: 2,
    maxGuests: 4,
    location: 'Westerland',
  },
  {
    id: 'property-4',
    brandId: 'auster-appartements' as BrandId,
    name: 'Urban Loft Sylt',
    shortDescription: 'Modernes Loft-Apartment im Stadtzentrum',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    pricePerNight: 195,
    bedrooms: 1,
    maxGuests: 2,
    location: 'Westerland',
  },
  {
    id: 'property-5',
    brandId: 'beach-home' as BrandId,
    name: 'Strandperle Wenningstedt',
    shortDescription: 'Gemütliches Strandhaus nur 50m vom Meer',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    pricePerNight: 340,
    bedrooms: 2,
    maxGuests: 5,
    location: 'Wenningstedt',
  },
  {
    id: 'property-6',
    brandId: 'syltrooms' as BrandId,
    name: 'Dünenblick Zimmer',
    shortDescription: 'Exklusives Hotelzimmer mit Panoramablick',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    pricePerNight: 180,
    bedrooms: 1,
    maxGuests: 2,
    location: 'Westerland',
  },
];

interface PropertiesPageProps {
  searchParams: Promise<{ brand?: string }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const query = await searchParams;
  const selectedBrandId = query.brand as BrandId | undefined;
  const selectedBrand = selectedBrandId ? brands[selectedBrandId] : null;

  // Filter properties by brand if specified
  const filteredProperties = selectedBrandId 
    ? mockProperties.filter(p => p.brandId === selectedBrandId)
    : mockProperties;

  return (
    <main className="min-h-screen bg-sand-50 pt-24">
      {/* Header */}
      <section className="py-12 bg-white border-b border-sand-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-reetdach-900 mb-2">
                  {selectedBrand ? selectedBrand.name : 'Alle Unterkünfte'}
                </h1>
                <p className="text-reetdach-600 text-lg">
                  {selectedBrand 
                    ? selectedBrand.tagline 
                    : 'Entdecken Sie unsere exklusive Kollektion auf Sylt'}
                </p>
              </div>
              
              {/* Brand Filter */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/properties"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !selectedBrandId 
                      ? 'bg-reetdach-900 text-white' 
                      : 'bg-sand-100 text-reetdach-700 hover:bg-sand-200'
                  }`}
                >
                  Alle
                </Link>
                {Object.values(brands).map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/properties?brand=${brand.id}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedBrandId === brand.id 
                        ? 'text-white' 
                        : 'bg-sand-100 text-reetdach-700 hover:bg-sand-200'
                    }`}
                    style={selectedBrandId === brand.id ? { backgroundColor: brand.primaryColor } : {}}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-reetdach-500 text-lg mb-6">
                Keine Unterkünfte für diese Auswahl gefunden.
              </p>
              <Link href="/properties">
                <Button variant="outline">Alle Unterkünfte anzeigen</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => {
                const brand = brands[property.brandId];
                return (
                  <AnimatedSection key={property.id} delay={index * 0.1}>
                    <Link 
                      href={`/book/${property.id}`}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div 
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: brand.primaryColor }}
                        >
                          {brand.name}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-serif text-xl text-reetdach-900 group-hover:text-nordsee-700 transition-colors">
                            {property.name}
                          </h3>
                        </div>
                        
                        <p className="text-reetdach-500 text-sm mb-4">
                          {property.location}
                        </p>
                        
                        <p className="text-reetdach-600 text-sm mb-4 line-clamp-2">
                          {property.shortDescription}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-reetdach-500 mb-4">
                          <span>{property.bedrooms} Schlafzimmer</span>
                          <span>•</span>
                          <span>max. {property.maxGuests} Gäste</span>
                        </div>
                        
                        <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
                          <div>
                            <span className="font-serif text-2xl text-reetdach-900">
                              €{property.pricePerNight}
                            </span>
                            <span className="text-reetdach-500 text-sm"> / Nacht</span>
                          </div>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: brand.primaryColor }}
                          >
                            Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
