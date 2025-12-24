// Booking Types
export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface BookingRequest {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
}

// Property Types
export interface Property {
  id: string;
  brandId: BrandId;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: PropertyImage[];
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  currency: string;
  location: PropertyLocation;
  featured: boolean;
}

export interface PropertyImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface PropertyLocation {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

// Availability Types
export interface Availability {
  propertyId: string;
  date: string;
  isAvailable: boolean;
  price?: number;
  minimumStay?: number;
}

export interface AvailabilityCheck {
  propertyId: string;
  checkIn: string;
  checkOut: string;
}

export interface AvailabilityResponse {
  available: boolean;
  totalPrice?: number;
  nights?: number;
  blockedDates?: string[];
}

// iCal Types
export interface ICalEvent {
  uid: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
}

export interface ICalSync {
  id: string;
  propertyId: string;
  url: string;
  direction: 'import' | 'export';
  lastSyncAt?: Date;
  syncStatus: 'success' | 'error' | 'pending';
}

// Brand Types
export type BrandId = 
  | 'syltrooms'
  | 'privathomes'
  | 'longislandhouse'
  | 'auster-appartements'
  | 'beach-home';

export interface Brand {
  id: BrandId;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  heroVideo?: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
