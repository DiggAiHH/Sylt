import { NextResponse } from 'next/server';
import type { Booking, BookingRequest } from '@sylt/types';

// In-memory storage for demo purposes
const bookings: Map<string, Booking> = new Map();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('id');

  if (bookingId) {
    const booking = bookings.get(bookingId);
    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Booking not found',
          },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: booking });
  }

  return NextResponse.json({
    success: true,
    data: Array.from(bookings.values()),
  });
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.propertyId || !body.guestName || !body.guestEmail || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields',
          },
        },
        { status: 400 }
      );
    }

    // Create booking
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      propertyId: body.propertyId,
      guestName: body.guestName,
      guestEmail: body.guestEmail,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
      roomType: body.roomType,
      guests: body.guests,
      totalPrice: 0, // Would be calculated based on availability
      currency: 'EUR',
      status: 'pending',
      source: 'direct',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Calculate total price (mock)
    // Ensure minimum 1 night for valid bookings (same-day checkout not allowed)
    const nights = Math.max(
      1,
      Math.round(
        (booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    booking.totalPrice = nights * 350; // Mock price

    bookings.set(booking.id, booking);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Invalid request body',
        },
      },
      { status: 400 }
    );
  }
}
