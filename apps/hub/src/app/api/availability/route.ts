import { NextResponse } from 'next/server';
import type { Availability } from '@sylt/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = parseInt(searchParams.get('guests') || '2', 10);

  if (!propertyId || !checkIn || !checkOut) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'MISSING_PARAMS',
          message: 'propertyId, checkIn, and checkOut are required',
        },
      },
      { status: 400 }
    );
  }

  // Mock availability check
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Generate mock availability
  const availability: Availability[] = [];
  const current = new Date(checkInDate);

  while (current < checkOutDate) {
    const isWeekend = current.getDay() === 0 || current.getDay() === 6;
    availability.push({
      roomId: `${propertyId}-room-1`,
      date: current.toISOString().split('T')[0],
      available: true,
      price: isWeekend ? 400 : 350,
      minStay: isWeekend ? 2 : 1,
    });
    current.setDate(current.getDate() + 1);
  }

  return NextResponse.json({
    success: true,
    data: {
      propertyId,
      checkIn,
      checkOut,
      nights,
      guests,
      available: true,
      rooms: [`${propertyId}-room-1`],
      availability,
      totalPrice: availability.reduce((sum, a) => sum + (a.price || 0), 0),
    },
  });
}
