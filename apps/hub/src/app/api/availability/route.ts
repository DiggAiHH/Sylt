import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, AvailabilityResponse } from '@sylt/shared';
import { availabilityCheckSchema, validateRequest, monthSchema } from '@/lib/validation';
import { ApiError, ErrorCode, handleError, logError } from '@/lib/errors';
import { checkRateLimit, getClientIdentifier, getRateLimitHeaders } from '@/lib/rate-limit';

// Mock blocked dates storage - in production, this would come from a database
// Using Set for O(1) lookup instead of Array.includes() O(n)
const propertyBlockedDates: Record<string, Set<string>> = {
  'property-1': new Set(['2024-12-25', '2024-12-26', '2024-12-31', '2025-01-01']),
  'property-2': new Set(['2024-12-24', '2024-12-25']),
};

// Mock property prices
const propertyPrices: Record<string, number> = {
  'property-1': 250,
  'property-2': 350,
  'property-3': 180,
};

/**
 * Generate array of dates between check-in and check-out.
 * Optimized to avoid repeated Date object creation.
 */
function getDateRange(checkIn: string, checkOut: string): string[] {
  const dates: string[] = [];
  const current = new Date(checkIn);
  const end = new Date(checkOut);
  
  while (current < end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

/**
 * Check availability for a property with O(1) date lookup per day
 */
function checkDateConflicts(propertyId: string, dates: string[]): string[] {
  const blockedSet = propertyBlockedDates[propertyId];
  if (!blockedSet) return [];
  
  // O(n) where n = number of nights, with O(1) lookup per date
  return dates.filter(date => blockedSet.has(date));
}

export async function POST(request: NextRequest) {
  // Rate limiting check
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'availability');
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      new ApiError(ErrorCode.RATE_LIMIT_EXCEEDED).toResponse(),
      { 
        status: 429, 
        headers: getRateLimitHeaders(rateLimit) 
      }
    );
  }

  try {
    const body = await request.json();
    
    // Validate input with Zod schema
    const validation = validateRequest(availabilityCheckSchema, body);
    
    if (!validation.success) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: validation.errors.join('; '),
      }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
    }

    const { propertyId, checkIn, checkOut } = validation.data;

    // Generate date range and check for conflicts
    const requestedDates = getDateRange(checkIn, checkOut);
    const conflictingDates = checkDateConflicts(propertyId, requestedDates);
    
    if (conflictingDates.length > 0) {
      return NextResponse.json<ApiResponse<AvailabilityResponse>>({
        success: true,
        data: {
          available: false,
          blockedDates: conflictingDates,
        },
      }, { headers: getRateLimitHeaders(rateLimit) });
    }

    // Calculate total price
    const nights = requestedDates.length;
    const pricePerNight = propertyPrices[propertyId] || 200;
    const totalPrice = nights * pricePerNight;

    return NextResponse.json<ApiResponse<AvailabilityResponse>>({
      success: true,
      data: {
        available: true,
        totalPrice,
        nights,
      },
    }, { headers: getRateLimitHeaders(rateLimit) });

  } catch (error) {
    const apiError = handleError(error);
    logError(apiError, { endpoint: 'availability', method: 'POST' });
    
    return NextResponse.json(
      apiError.toResponse(),
      { status: apiError.httpStatus }
    );
  }
}

export async function GET(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'availability');
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      new ApiError(ErrorCode.RATE_LIMIT_EXCEEDED).toResponse(),
      { status: 429, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    const month = searchParams.get('month');

    if (!propertyId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Missing propertyId parameter',
      }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
    }

    // Validate month format if provided
    if (month) {
      const monthValidation = monthSchema.safeParse(month);
      if (!monthValidation.success) {
        return NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'Invalid month format. Expected YYYY-MM',
        }, { status: 400, headers: getRateLimitHeaders(rateLimit) });
      }
    }

    // Get blocked dates (convert Set to Array for response)
    const blockedSet = propertyBlockedDates[propertyId] || new Set<string>();
    const blocked = Array.from(blockedSet);
    
    const filteredBlocked = month
      ? blocked.filter(date => date.startsWith(month))
      : blocked;

    return NextResponse.json<ApiResponse<{ blockedDates: string[] }>>({
      success: true,
      data: { blockedDates: filteredBlocked },
    }, { headers: getRateLimitHeaders(rateLimit) });

  } catch (error) {
    const apiError = handleError(error);
    logError(apiError, { endpoint: 'availability', method: 'GET' });
    
    return NextResponse.json(
      apiError.toResponse(),
      { status: apiError.httpStatus }
    );
  }
}
