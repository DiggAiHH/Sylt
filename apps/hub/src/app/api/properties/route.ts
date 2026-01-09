import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Property, PaginatedResponse, BrandId } from '@sylt/shared';

// Mock properties data - in production, this would come from a CMS/database
const mockProperties: Property[] = [
  {
    id: 'property-1',
    brandId: 'syltrooms',
    name: 'Strandhaus Kampen',
    slug: 'strandhaus-kampen',
    description: 'Luxuriöses Strandhaus mit direktem Meerzugang. Genießen Sie den unvergleichlichen Blick auf die Nordsee von Ihrer privaten Terrasse aus.',
    shortDescription: 'Luxuriöses Strandhaus mit Meerblick',
    images: [
      { url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', alt: 'Strandhaus Außenansicht', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Wohnzimmer', isPrimary: false },
    ],
    amenities: ['Meerblick', 'Private Terrasse', 'WLAN', 'Küche', 'Sauna', 'Kamin'],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    pricePerNight: 450,
    currency: 'EUR',
    location: {
      address: 'Strandweg 15',
      city: 'Kampen',
      postalCode: '25999',
      country: 'Deutschland',
    },
    featured: true,
  },
  {
    id: 'property-2',
    brandId: 'longislandhouse',
    name: 'Long Island Suite',
    slug: 'long-island-suite',
    description: 'Stilvolle Suite im amerikanischen Long Island Style. Helle Räume, maritime Einrichtung und erstklassiger Komfort.',
    shortDescription: 'Stilvolle Suite im Long Island Style',
    images: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Suite Innenansicht', isPrimary: true },
    ],
    amenities: ['Balkon', 'WLAN', 'Küchenzeile', 'Smart TV', 'Klimaanlage'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    pricePerNight: 280,
    currency: 'EUR',
    location: {
      address: 'Hafenstraße 8',
      city: 'List',
      postalCode: '25992',
      country: 'Deutschland',
    },
    featured: true,
  },
  {
    id: 'property-3',
    brandId: 'beach-home',
    name: 'Beach Home Westerland',
    slug: 'beach-home-westerland',
    description: 'Moderne Ferienwohnung nur wenige Schritte vom Strand entfernt. Perfekt für einen entspannten Strandurlaub.',
    shortDescription: 'Moderne Ferienwohnung am Strand',
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Wohnung', isPrimary: true },
    ],
    amenities: ['Strandnähe', 'WLAN', 'Küche', 'Waschmaschine', 'Fahrräder'],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 180,
    currency: 'EUR',
    location: {
      address: 'Strandpromenade 23',
      city: 'Westerland',
      postalCode: '25980',
      country: 'Deutschland',
    },
    featured: false,
  },
  {
    id: 'property-4',
    brandId: 'privathomes',
    name: 'Villa Morsum',
    slug: 'villa-morsum',
    description: 'Exklusive Reetdachvilla im idyllischen Morsum. Ihr privates Refugium mit großem Garten und traditionellem Friesenflair.',
    shortDescription: 'Exklusive Reetdachvilla mit Garten',
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', alt: 'Villa Außenansicht', isPrimary: true },
    ],
    amenities: ['Reetdach', 'Großer Garten', 'WLAN', 'Küche', 'Kamin', 'Sauna', 'Parkplatz'],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    pricePerNight: 650,
    currency: 'EUR',
    location: {
      address: 'Nöstigweg 5',
      city: 'Morsum',
      postalCode: '25980',
      country: 'Deutschland',
    },
    featured: true,
  },
  {
    id: 'property-5',
    brandId: 'auster-appartements',
    name: 'Auster Appartement Deluxe',
    slug: 'auster-appartement-deluxe',
    description: 'Geschmackvoll eingerichtetes Appartement mit maritimem Flair. Zentrale Lage in Westerland mit allen Annehmlichkeiten.',
    shortDescription: 'Maritimes Appartement in Westerland',
    images: [
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', alt: 'Appartement', isPrimary: true },
    ],
    amenities: ['Zentrale Lage', 'WLAN', 'Küche', 'Smart TV', 'Balkon'],
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 220,
    currency: 'EUR',
    location: {
      address: 'Friedrichstraße 12',
      city: 'Westerland',
      postalCode: '25980',
      country: 'Deutschland',
    },
    featured: false,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const brandId = searchParams.get('brand') as BrandId | null;
  const featured = searchParams.get('featured');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  // Filter properties
  let filteredProperties = [...mockProperties];
  
  if (brandId) {
    filteredProperties = filteredProperties.filter(p => p.brandId === brandId);
  }
  
  if (featured === 'true') {
    filteredProperties = filteredProperties.filter(p => p.featured);
  }

  // Paginate
  const total = filteredProperties.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = filteredProperties.slice(startIndex, startIndex + pageSize);

  return NextResponse.json<ApiResponse<PaginatedResponse<Property>>>({
    success: true,
    data: {
      items,
      total,
      page,
      pageSize,
      totalPages,
    },
  });
}
