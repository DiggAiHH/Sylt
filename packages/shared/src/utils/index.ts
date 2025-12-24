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
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return email.length <= 254 && emailRegex.test(email);
}

export function isValidDateRange(checkIn: Date, checkOut: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return checkIn >= today && checkOut > checkIn;
}

/**
 * Validate ISO date string format (YYYY-MM-DD)
 * Performs comprehensive validation including format and actual date validity
 */
export function isValidISODate(dateString: string): boolean {
  // Check format first
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }
  
  // Parse components to validate actual date values
  const [yearStr, monthStr, dayStr] = dateString.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  
  // Validate ranges
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  
  // Create date and verify it matches input (catches invalid dates like Feb 30)
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
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

/**
 * Debounce function for rate-limiting function calls.
 * Useful for search inputs and API calls triggered by user input.
 * 
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttle function for limiting function call frequency.
 * Ensures function is called at most once per interval.
 * 
 * @param fn - The function to throttle
 * @param interval - Minimum interval between calls in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = interval - (now - lastCall);
    
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  };
}

/**
 * Sanitize user input to prevent XSS attacks.
 * Encodes dangerous characters rather than removing them to preserve input intent.
 * For HTML contexts, use a proper library like DOMPurify on the client.
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .substring(0, 1000) // Limit length first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Sanitize input for use in plain text contexts (not HTML).
 * Removes potentially dangerous characters.
 */
export function sanitizeForPlainText(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets only
    .substring(0, 1000);
}

/**
 * Safe JSON parse with fallback value
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
