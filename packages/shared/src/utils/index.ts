// Date utilities
export function formatDate(date: Date, locale = 'de-DE'): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number, currency = 'EUR', locale = 'de-DE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function parseISODate(dateString: string): Date {
  return new Date(dateString);
}

export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidDateRange(checkIn: Date, checkOut: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return checkIn >= today && checkOut > checkIn;
}

// URL utilities
export function buildBookingUrl(
  hubBaseUrl: string,
  propertyId: string,
  brandId: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number
): string {
  const url = new URL(`${hubBaseUrl}/book/${propertyId}`);
  url.searchParams.set('brand', brandId);
  
  if (checkIn) url.searchParams.set('checkIn', checkIn);
  if (checkOut) url.searchParams.set('checkOut', checkOut);
  if (guests) url.searchParams.set('guests', guests.toString());
  
  return url.toString();
}

// Slug utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Array utilities
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set<T[keyof T]>();
  return array.filter(item => {
    if (seen.has(item[key])) return false;
    seen.add(item[key]);
    return true;
  });
}
