import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBrand, brands } from '@sylt/shared';
import type { BrandId, Property } from '@sylt/shared';
import BookingForm from './BookingForm';

// Mock property fetch - in production would be from API/database
async function getProperty(propertyId: string): Promise<Property | null> {
  // Simulated API call
  const mockProperties: Record<string, Property> = {
    'property-1': {
      id: 'property-1',
      brandId: 'syltrooms',
      name: 'Strandhaus Kampen',
      slug: 'strandhaus-kampen',
      description: 'Luxuriöses Strandhaus mit direktem Meerzugang.',
      shortDescription: 'Luxuriöses Strandhaus mit Meerblick',
      images: [
        { url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200', alt: 'Strandhaus', isPrimary: true },
      ],
      amenities: ['Meerblick', 'Private Terrasse', 'WLAN', 'Küche', 'Sauna'],
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
    // Add more mock properties as needed
  };

  return mockProperties[propertyId] || null;
}

interface BookPageProps {
  params: Promise<{ propertyId: string }>;
  searchParams: Promise<{ 
    brand?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function BookPage({ params, searchParams }: BookPageProps) {
  const { propertyId } = await params;
  const query = await searchParams;
  const property = await getProperty(propertyId);

  if (!property) {
    notFound();
  }

  // Get brand from query or property
  const brandId = (query.brand as BrandId) || property.brandId;
  const brand = getBrand(brandId) || brands[property.brandId];

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Header */}
      <header 
        className="py-6 px-4"
        style={{ backgroundColor: brand.primaryColor }}
      >
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1 className="font-serif text-2xl text-white">{brand.name}</h1>
          <span className="text-white/80 text-sm">{brand.tagline}</span>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Property Info */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-6 luxury-shadow">
              <Image
                src={property.images[0].url}
                alt={property.images[0].alt}
                width={1200}
                height={800}
                className="w-full h-80 object-cover"
                priority
              />
            </div>
            
            <h2 className="font-serif text-3xl text-reetdach-900 mb-4">
              {property.name}
            </h2>
            
            <p className="text-reetdach-600 mb-6">
              {property.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl text-center">
                <span className="text-2xl font-serif text-nordsee-600">{property.bedrooms}</span>
                <p className="text-sm text-reetdach-500">Schlafzimmer</p>
              </div>
              <div className="bg-white p-4 rounded-xl text-center">
                <span className="text-2xl font-serif text-nordsee-600">{property.bathrooms}</span>
                <p className="text-sm text-reetdach-500">Badezimmer</p>
              </div>
              <div className="bg-white p-4 rounded-xl text-center">
                <span className="text-2xl font-serif text-nordsee-600">{property.maxGuests}</span>
                <p className="text-sm text-reetdach-500">Gäste max.</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl text-reetdach-900 mb-3">Ausstattung</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1 bg-white text-reetdach-600 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <BookingForm
              property={property}
              brand={brand}
              initialCheckIn={query.checkIn}
              initialCheckOut={query.checkOut}
              initialGuests={query.guests ? parseInt(query.guests) : 2}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-reetdach-900 text-white py-8 mt-12">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-reetdach-400">
            Sichere Buchung bei {brand.name} • Teil von Blum Sylt Hotels
          </p>
        </div>
      </footer>
    </main>
  );
}
