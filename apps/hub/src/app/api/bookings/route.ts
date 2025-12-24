import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Booking, BookingRequest } from '@blumsylt/shared';

// Mock bookings storage - in production, this would be a database
const bookings: Map<string, Booking> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    const { propertyId, checkIn, checkOut, guests, guestName, guestEmail } = body;

    // Validate required fields
    if (!propertyId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Missing required fields',
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Invalid email format',
      }, { status: 400 });
    }

    // Check availability first (would be a proper call in production)
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Check-out date must be after check-in date',
      }, { status: 400 });
    }

    // Calculate nights and price
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerNight = 250; // Would come from property data
    const totalPrice = nights * pricePerNight;

    // Create booking
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();
    
    const booking: Booking = {
      id: bookingId,
      propertyId,
      guestName,
      guestEmail,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests || 1,
      totalPrice,
      currency: 'EUR',
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    // Store booking
    bookings.set(bookingId, booking);

    return NextResponse.json<ApiResponse<{ booking: Booking; paymentUrl: string }>>({
      success: true,
      data: {
        booking,
        // In production, this would be a Stripe checkout URL
        paymentUrl: `/checkout/${bookingId}`,
      },
      message: 'Booking created successfully. Please proceed to payment.',
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('id');
  
  if (!bookingId) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Missing booking ID',
    }, { status: 400 });
  }

  const booking = bookings.get(bookingId);
  
  if (!booking) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Booking not found',
    }, { status: 404 });
  }

  return NextResponse.json<ApiResponse<Booking>>({
    success: true,
    data: booking,
  });
}
