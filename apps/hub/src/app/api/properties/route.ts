import { NextResponse } from 'next/server';
import type { Property } from '@sylt/types';

// Mock data for properties
const properties: Property[] = [
  {
    id: 'syltrooms-1',
    name: 'Dünenblick Suite',
    slug: 'duenenblick-suite',
    type: 'hotel-room',
    description: 'Elegante Suite mit atemberaubendem Blick auf die Sylter Dünenlandschaft. Hochwertige Materialien und zeitlose Eleganz.',
    shortDescription: 'Elegante Suite mit Dünenblick',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        alt: 'Dünenblick Suite',
        width: 800,
        height: 600,
        isPrimary: true,
      },
    ],
    amenities: [
      { id: 'wifi', name: 'WLAN', icon: 'wifi', category: 'comfort' },
      { id: 'minibar', name: 'Minibar', icon: 'glass', category: 'comfort' },
      { id: 'safe', name: 'Safe', icon: 'lock', category: 'comfort' },
    ],
    location: {
      address: 'Strandweg 12',
      city: 'Kampen',
      postalCode: '25999',
      country: 'Deutschland',
      latitude: 54.9558,
      longitude: 8.3508,
      distanceToBeach: '200m',
    },
    rooms: [
      {
        id: 'room-1',
        name: 'Dünenblick Suite',
        description: 'Luxuriöse Suite mit Panoramafenster',
        capacity: 2,
        beds: [{ type: 'king', count: 1 }],
        size: 45,
        pricePerNight: 350,
        images: [],
        amenities: [],
      },
    ],
    priceRange: { min: 350, max: 450, currency: 'EUR' },
    featured: true,
    active: true,
  },
  {
    id: 'beach-home-1',
    name: 'Strandhaus Nordsee',
    slug: 'strandhaus-nordsee',
    type: 'beach-house',
    description: 'Luxuriöses Strandhaus direkt an der Nordsee. Perfekt für Familien und Ruhesuchende.',
    shortDescription: 'Luxuriöses Strandhaus direkt am Meer',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
        alt: 'Strandhaus Nordsee',
        width: 800,
        height: 600,
        isPrimary: true,
      },
    ],
    amenities: [
      { id: 'terrace', name: 'Terrasse', icon: 'sun', category: 'outdoor' },
      { id: 'kitchen', name: 'Küche', icon: 'kitchen', category: 'kitchen' },
      { id: 'parking', name: 'Parkplatz', icon: 'car', category: 'comfort' },
    ],
    location: {
      address: 'Strandpromenade 5',
      city: 'Westerland',
      postalCode: '25980',
      country: 'Deutschland',
      latitude: 54.9079,
      longitude: 8.3078,
      distanceToBeach: '50m',
    },
    rooms: [
      {
        id: 'room-2',
        name: 'Master Schlafzimmer',
        description: 'Großzügiges Schlafzimmer mit Meerblick',
        capacity: 2,
        beds: [{ type: 'queen', count: 1 }],
        size: 25,
        pricePerNight: 550,
        images: [],
        amenities: [],
      },
    ],
    priceRange: { min: 550, max: 750, currency: 'EUR' },
    featured: true,
    active: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: properties,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, this would save to a database
    return NextResponse.json({
      success: true,
      data: { ...body, id: `property-${Date.now()}` },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Invalid request body',
        },
      },
      { status: 400 }
    );
  }
}
