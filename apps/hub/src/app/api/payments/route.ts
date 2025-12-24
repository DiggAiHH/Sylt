import { NextResponse } from 'next/server';
import type { PaymentIntent } from '@sylt/types';

// In-memory storage for demo purposes
const paymentIntents: Map<string, PaymentIntent> = new Map();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, amount, currency = 'eur' } = body;

    if (!bookingId || !amount) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'bookingId and amount are required',
          },
        },
        { status: 400 }
      );
    }

    // Create mock payment intent
    // In production, this would use the Stripe API:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({...});

    const paymentIntent: PaymentIntent = {
      id: `pi_${Date.now()}`,
      bookingId,
      amount: amount * 100, // Convert to cents
      currency,
      status: 'requires_payment_method',
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      createdAt: new Date(),
    };

    paymentIntents.set(paymentIntent.id, paymentIntent);

    return NextResponse.json({ success: true, data: paymentIntent });
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentIntentId = searchParams.get('id');

  if (paymentIntentId) {
    const paymentIntent = paymentIntents.get(paymentIntentId);
    if (!paymentIntent) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Payment intent not found',
          },
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: paymentIntent });
  }

  return NextResponse.json({
    success: true,
    data: Array.from(paymentIntents.values()),
  });
}
