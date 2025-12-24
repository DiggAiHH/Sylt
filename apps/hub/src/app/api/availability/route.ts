import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, AvailabilityCheck, AvailabilityResponse } from '@blumsylt/shared';

// Mock blocked dates storage - in production, this would come from a database
const blockedDates: Record<string, string[]> = {
  'property-1': ['2024-12-25', '2024-12-26', '2024-12-31', '2025-01-01'],
  'property-2': ['2024-12-24', '2024-12-25'],
};

// Mock property prices
const propertyPrices: Record<string, number> = {
  'property-1': 250,
  'property-2': 350,
  'property-3': 180,
};

export async function POST(request: NextRequest) {
  try {
    const body: AvailabilityCheck = await request.json();
    const { propertyId, checkIn, checkOut } = body;

    if (!propertyId || !checkIn || !checkOut) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Missing required fields: propertyId, checkIn, checkOut',
      }, { status: 400 });
    }

    // Parse dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate dates
    if (checkOutDate <= checkInDate) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Check-out date must be after check-in date',
      }, { status: 400 });
    }

    // Check for blocked dates
    const blocked = blockedDates[propertyId] || [];
    const requestedDates: string[] = [];
    
    const currentDate = new Date(checkInDate);
    while (currentDate < checkOutDate) {
      requestedDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const conflictingDates = requestedDates.filter(date => blocked.includes(date));
    
    if (conflictingDates.length > 0) {
      return NextResponse.json<ApiResponse<AvailabilityResponse>>({
        success: true,
        data: {
          available: false,
          blockedDates: conflictingDates,
        },
      });
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
    });

  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const month = searchParams.get('month'); // Format: YYYY-MM

  if (!propertyId) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Missing propertyId parameter',
    }, { status: 400 });
  }

  // Return blocked dates for the property (and optionally filtered by month)
  const blocked = blockedDates[propertyId] || [];
  const filteredBlocked = month
    ? blocked.filter(date => date.startsWith(month))
    : blocked;

  return NextResponse.json<ApiResponse<{ blockedDates: string[] }>>({
    success: true,
    data: { blockedDates: filteredBlocked },
  });
}
