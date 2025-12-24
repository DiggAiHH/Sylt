import type { BookingRequest } from '@sylt/types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (international)
 * Requires at least 7 digits with optional country code and formatting
 */
export function isValidPhone(phone: string): boolean {
  // Extract only digits from the phone number
  const digitsOnly = phone.replace(/\D/g, '');
  // Must have at least 7 digits (minimum for valid phone numbers)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return false;
  }
  // Allow international format with optional country code
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Validate date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

/**
 * Validate checkout is after checkin
 */
export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return checkOutDate > checkInDate;
}

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

/**
 * Validate minimum stay requirement
 */
export function meetsMinimumStay(
  checkIn: string,
  checkOut: string,
  minimumNights: number
): boolean {
  return calculateNights(checkIn, checkOut) >= minimumNights;
}

/**
 * Validate guest count
 */
export function isValidGuestCount(guests: number, maxGuests: number): boolean {
  return guests > 0 && guests <= maxGuests;
}

/**
 * Escape HTML entities in a string.
 * This function converts special HTML characters to their entity equivalents.
 * 
 * IMPORTANT: For untrusted HTML content that needs to preserve markup,
 * use a dedicated library like DOMPurify instead.
 * 
 * This function is suitable for plain text that will be displayed in HTML context.
 */
export function escapeHtml(input: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  
  return input.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

/**
 * Strip all HTML tags from a string, leaving only plain text.
 * Use this for display purposes only - not for storing sanitized HTML.
 * 
 * Note: For complex HTML sanitization in production, use a dedicated library
 * like DOMPurify that handles all edge cases properly.
 */
export function stripHtmlTags(input: string): string {
  // Repeatedly remove tags to handle nested/malformed tags like <<script>script>
  let result = input;
  let previous = '';
  
  // Keep removing tags until no more are found (handles nested cases)
  while (result !== previous) {
    previous = result;
    result = result.replace(/<[^>]*>/g, '');
  }
  
  return result.trim();
}

/**
 * @deprecated Use escapeHtml for HTML entity encoding or stripHtmlTags for removing HTML.
 * This function is kept for backwards compatibility.
 */
export function sanitizeInput(input: string): string {
  return escapeHtml(stripHtmlTags(input));
}

/**
 * Validate a complete booking request
 */
export function validateBookingRequest(
  request: BookingRequest,
  options?: {
    maxGuests?: number;
    minimumNights?: number;
  }
): ValidationResult {
  const errors: ValidationError[] = [];
  const { maxGuests = 10, minimumNights = 1 } = options || {};

  // Required fields
  if (!request.propertyId) {
    errors.push({ field: 'propertyId', message: 'Unterkunft ist erforderlich' });
  }

  if (!request.guestName || request.guestName.trim().length < 2) {
    errors.push({ field: 'guestName', message: 'Bitte geben Sie Ihren Namen ein' });
  }

  if (!request.guestEmail || !isValidEmail(request.guestEmail)) {
    errors.push({ field: 'guestEmail', message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' });
  }

  if (request.guestPhone && !isValidPhone(request.guestPhone)) {
    errors.push({ field: 'guestPhone', message: 'Bitte geben Sie eine gültige Telefonnummer ein' });
  }

  // Date validation
  if (!request.checkIn) {
    errors.push({ field: 'checkIn', message: 'Anreisedatum ist erforderlich' });
  } else if (!isFutureDate(request.checkIn)) {
    errors.push({ field: 'checkIn', message: 'Anreisedatum muss in der Zukunft liegen' });
  }

  if (!request.checkOut) {
    errors.push({ field: 'checkOut', message: 'Abreisedatum ist erforderlich' });
  } else if (request.checkIn && !isValidDateRange(request.checkIn, request.checkOut)) {
    errors.push({ field: 'checkOut', message: 'Abreisedatum muss nach dem Anreisedatum liegen' });
  }

  // Minimum stay validation
  if (
    request.checkIn &&
    request.checkOut &&
    !meetsMinimumStay(request.checkIn, request.checkOut, minimumNights)
  ) {
    errors.push({
      field: 'checkOut',
      message: `Mindestaufenthalt beträgt ${minimumNights} ${minimumNights === 1 ? 'Nacht' : 'Nächte'}`,
    });
  }

  // Guest count validation
  if (!request.guests || request.guests < 1) {
    errors.push({ field: 'guests', message: 'Gästeanzahl ist erforderlich' });
  } else if (!isValidGuestCount(request.guests, maxGuests)) {
    errors.push({ field: 'guests', message: `Maximale Gästeanzahl ist ${maxGuests}` });
  }

  // Room type validation
  if (!request.roomType) {
    errors.push({ field: 'roomType', message: 'Zimmertyp ist erforderlich' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Format date range for display
 */
export function formatDateRange(checkIn: string, checkOut: string): string {
  const nights = calculateNights(checkIn, checkOut);
  const checkInFormatted = formatDate(checkIn, { weekday: undefined });
  const checkOutFormatted = formatDate(checkOut, { weekday: undefined });
  return `${checkInFormatted} – ${checkOutFormatted} (${nights} ${nights === 1 ? 'Nacht' : 'Nächte'})`;
}
