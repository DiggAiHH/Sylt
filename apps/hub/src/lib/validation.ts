import { z } from 'zod';

/**
 * Validation Schemas using Zod for type-safe runtime validation.
 * All API inputs are validated before processing to prevent injection attacks
 * and ensure data integrity.
 */

// Date validation with proper ISO format checking
const isoDateString = z.string().refine(
  (val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(val);
  },
  { message: 'Invalid date format. Expected YYYY-MM-DD' }
);

// Email validation with RFC 5322 compliant pattern
const emailSchema = z.string().email('Ungültige E-Mail-Adresse').max(254);

// Property ID validation (alphanumeric with hyphens, prevents injection)
const propertyIdSchema = z.string()
  .min(1, 'Property ID ist erforderlich')
  .max(100)
  .regex(/^[a-zA-Z0-9-_]+$/, 'Ungültige Property ID');

// Guest name validation with XSS prevention
const guestNameSchema = z.string()
  .min(2, 'Name muss mindestens 2 Zeichen haben')
  .max(100, 'Name darf maximal 100 Zeichen haben')
  .transform((val) => val.trim())
  .refine(
    (val) => !/[<>]/.test(val),
    { message: 'Name enthält ungültige Zeichen' }
  );

// Booking request schema
export const bookingRequestSchema = z.object({
  propertyId: propertyIdSchema,
  checkIn: isoDateString,
  checkOut: isoDateString,
  guests: z.number()
    .int('Gästeanzahl muss eine ganze Zahl sein')
    .min(1, 'Mindestens 1 Gast erforderlich')
    .max(20, 'Maximal 20 Gäste erlaubt'),
  guestName: guestNameSchema,
  guestEmail: emailSchema,
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  { message: 'Abreisedatum muss nach dem Anreisedatum liegen', path: ['checkOut'] }
);

// Availability check schema
export const availabilityCheckSchema = z.object({
  propertyId: propertyIdSchema,
  checkIn: isoDateString,
  checkOut: isoDateString,
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  { message: 'Abreisedatum muss nach dem Anreisedatum liegen', path: ['checkOut'] }
).refine(
  (data) => new Date(data.checkIn) >= new Date(new Date().toISOString().split('T')[0]),
  { message: 'Anreisedatum darf nicht in der Vergangenheit liegen', path: ['checkIn'] }
);

// Booking ID validation (for GET requests)
export const bookingIdSchema = z.string()
  .min(1, 'Booking ID ist erforderlich')
  .regex(/^booking_\d+_[a-z0-9]+$/, 'Ungültige Booking ID');

// Month format validation for availability calendar
export const monthSchema = z.string()
  .regex(/^\d{4}-\d{2}$/, 'Ungültiges Monatsformat. Erwartet: YYYY-MM')
  .optional();

// Type exports for use in components
export type BookingRequest = z.infer<typeof bookingRequestSchema>;
export type AvailabilityCheck = z.infer<typeof availabilityCheckSchema>;

/**
 * Validate and parse request data with proper error formatting
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.errors.map((err) => {
    const path = err.path.length > 0 ? `${err.path.join('.')}: ` : '';
    return `${path}${err.message}`;
  });
  
  return { success: false, errors };
}
