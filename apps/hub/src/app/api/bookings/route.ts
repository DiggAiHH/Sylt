import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import type { ApiResponse, Booking } from '@blumsylt/shared';
import { bookingRequestSchema, bookingIdSchema, validateRequest } from '@/lib/validation';
import { ApiError, ErrorCode, handleError, logError } from '@/lib/errors';
import { checkRateLimit, getClientIdentifier, getRateLimitHeaders } from '@/lib/rate-limit';
import { createCheckoutSession, isStripeConfigured } from '@/lib/stripe';

// Mock bookings storage - in production, this would be a database
// Exported for use by other modules (e.g., webhooks)
export const bookings: Map<string, Booking> = new Map();

/**
 * Generate cryptographically secure booking ID
 */
function generateBookingId(): string {
  const timestamp = Date.now();
  const randomPart = randomBytes(6).toString('hex');
  return `booking_${timestamp}_${randomPart}`;
}

/**
 * Sanitize string input to prevent XSS
 */
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 200);    // Limit length
}

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'bookings');
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      new ApiError(ErrorCode.RATE_LIMIT_EXCEEDED).toResponse(),
      { status: 429, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const body = await request.json();
    
    // Validate input with Zod schema
    const validation = validateRequest(bookingRequestSchema, body);
    
    if (!validation.success) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: validation.errors.join('; '),
      }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
    }

    const { propertyId, checkIn, checkOut, guests, guestName, guestEmail } = validation.data;

    // Parse and validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Calculate nights and price
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // Validate minimum stay (1 night) and maximum stay (30 nights)
    if (nights < 1 || nights > 30) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Aufenthaltsdauer muss zwischen 1 und 30 Nächten liegen.',
      }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
    }

    const pricePerNight = 250; // Would come from property data in production
    const totalPrice = nights * pricePerNight;

    // Create booking with secure ID
    const bookingId = generateBookingId();
    const now = new Date();
    
    const booking: Booking = {
      id: bookingId,
      propertyId,
      guestName: sanitizeString(guestName),
      guestEmail: guestEmail.toLowerCase().trim(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      currency: 'EUR',
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    // Store booking
    bookings.set(bookingId, booking);

    // Log successful booking creation (for audit trail)
    logError(new Error('Booking created'), { 
      bookingId, 
      propertyId, 
      checkIn, 
      checkOut,
      action: 'CREATE_BOOKING'
    });

    // Create Stripe Checkout Session for payment
    const checkoutResult = await createCheckoutSession({
      bookingId,
      propertyName: `Unterkunft ${propertyId}`, // Would come from property data in production
      guestEmail: guestEmail.toLowerCase().trim(),
      guestName: sanitizeString(guestName),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      totalPrice,
      currency: 'eur',
    });

    if (!checkoutResult.success || !checkoutResult.checkoutUrl) {
      // Log payment session creation failure
      logError(new Error('Failed to create checkout session'), {
        bookingId,
        error: checkoutResult.error,
      });
      
      // Still return booking but with fallback checkout URL
      // In production, you might want to fail the booking creation instead
      const fallbackUrl = isStripeConfigured()
        ? `/booking/error?booking_id=${bookingId}`
        : `/checkout/${bookingId}`;

      return NextResponse.json<ApiResponse<{ booking: Booking; paymentUrl: string }>>({
        success: true,
        data: {
          booking,
          paymentUrl: fallbackUrl,
        },
        message: isStripeConfigured()
          ? 'Buchung erstellt, aber Zahlungssitzung konnte nicht erstellt werden.'
          : 'Buchung erfolgreich erstellt. Zahlung ist im Entwicklungsmodus simuliert.',
      }, { headers: getRateLimitHeaders(rateLimit) });
    }

    // Update booking with Stripe session ID for tracking
    booking.stripePaymentIntentId = checkoutResult.sessionId;
    bookings.set(bookingId, booking);

    return NextResponse.json<ApiResponse<{ booking: Booking; paymentUrl: string }>>({
      success: true,
      data: {
        booking,
        paymentUrl: checkoutResult.checkoutUrl,
      },
      message: 'Buchung erfolgreich erstellt. Bitte fahren Sie mit der Zahlung fort.',
    }, { headers: getRateLimitHeaders(rateLimit) });

  } catch (error) {
    const apiError = handleError(error);
    logError(apiError, { endpoint: 'bookings', method: 'POST' });
    
    return NextResponse.json(
      apiError.toResponse(),
      { status: apiError.httpStatus }
    );
  }
}

export async function GET(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'bookings');
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      new ApiError(ErrorCode.RATE_LIMIT_EXCEEDED).toResponse(),
      { status: 429, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');
    
    if (!bookingId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Buchungs-ID fehlt',
      }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
    }

    // Validate booking ID format to prevent injection
    const idValidation = bookingIdSchema.safeParse(bookingId);
    if (!idValidation.success) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Ungültige Buchungs-ID',
      }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
    }

    const booking = bookings.get(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        new ApiError(ErrorCode.BOOKING_NOT_FOUND).toResponse(),
        { status: 404, headers: getRateLimitHeaders(rateLimit) }
      );
    }

    return NextResponse.json<ApiResponse<Booking>>({
      success: true,
      data: booking,
    }, { headers: getRateLimitHeaders(rateLimit) });

  } catch (error) {
    const apiError = handleError(error);
    logError(apiError, { endpoint: 'bookings', method: 'GET' });
    
    return NextResponse.json(
      apiError.toResponse(),
      { status: apiError.httpStatus }
    );
  }
}
