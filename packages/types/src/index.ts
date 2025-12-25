// Booking Types
export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  roomType: string;
  guests: number;
  totalPrice: number;
  currency: 'EUR' | 'USD';
  status: BookingStatus;
  paymentIntentId?: string;
  source: BookingSource;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show';

export type BookingSource = 
  | 'direct'
  | 'booking.com'
  | 'airbnb'
  | 'expedia';

export interface BookingRequest {
  propertyId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  roomType: string;
  guests: number;
  specialRequests?: string;
}

// Property Types
export interface Property {
  id: string;
  name: string;
  slug: string;
  type: PropertyType;
  description: string;
  shortDescription: string;
  images: PropertyImage[];
  amenities: Amenity[];
  location: Location;
  rooms: Room[];
  priceRange: PriceRange;
  featured: boolean;
  active: boolean;
}

export type PropertyType = 
  | 'hotel-room'
  | 'apartment'
  | 'vacation-home'
  | 'beach-house';

export interface PropertyImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'comfort' | 'bathroom' | 'kitchen' | 'outdoor' | 'entertainment';
}

export interface Location {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  distanceToBeach?: string;
}

// Room Types
export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  beds: BedConfiguration[];
  size: number; // in square meters
  pricePerNight: number;
  images: PropertyImage[];
  amenities: Amenity[];
}

export interface BedConfiguration {
  type: 'single' | 'double' | 'queen' | 'king' | 'sofa-bed';
  count: number;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: 'EUR';
}

// Availability Types
export interface Availability {
  roomId: string;
  date: string; // ISO date string
  available: boolean;
  price?: number;
  minStay?: number;
}

export interface AvailabilityCalendar {
  roomId: string;
  availability: Availability[];
}

// iCal Types
export interface ICalEvent {
  uid: string;
  summary: string;
  dtstart: Date;
  dtend: Date;
  description?: string;
}

export interface ICalSync {
  propertyId: string;
  roomId: string;
  source: BookingSource;
  icalUrl: string;
  lastSync: Date;
  events: ICalEvent[];
}

// Stripe Types
export interface PaymentIntent {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  clientSecret?: string;
  createdAt: Date;
}

export type PaymentStatus = 
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'succeeded'
  | 'canceled';

// Satellite Configuration
export interface SatelliteConfig {
  id: string;
  name: string;
  domain: string;
  hubApiUrl: string;
  propertyType: PropertyType;
  theme: ThemeConfig;
  features: SatelliteFeatures;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fonts: {
    heading: string;
    body: string;
  };
  logo?: string;
}

export interface SatelliteFeatures {
  heroVideo: boolean;
  parallaxScrolling: boolean;
  premiumGallery: boolean;
  instantBooking: boolean;
  virtualTour: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Hub API Types
export interface HubApi {
  getProperties: () => Promise<ApiResponse<Property[]>>;
  getProperty: (id: string) => Promise<ApiResponse<Property>>;
  getAvailability: (roomId: string, startDate: string, endDate: string) => Promise<ApiResponse<AvailabilityCalendar>>;
  createBooking: (booking: BookingRequest) => Promise<ApiResponse<Booking>>;
  createPaymentIntent: (bookingId: string) => Promise<ApiResponse<PaymentIntent>>;
}

// Export Recipe Types
export * from './recipe';
