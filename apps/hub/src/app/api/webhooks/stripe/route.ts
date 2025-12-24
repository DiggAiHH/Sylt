import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe (with placeholder key - would be from env in production)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    console.log('Stripe not configured - webhook endpoint ready but inactive');
    return NextResponse.json({ received: true, message: 'Stripe not configured' });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment completed for session:', session.id);
      
      // Extract booking ID from metadata
      const bookingId = session.metadata?.bookingId;
      
      if (bookingId) {
        // In production: Update booking status to 'confirmed' in database
        console.log(`Confirming booking: ${bookingId}`);
        
        // Send confirmation email
        // await sendConfirmationEmail(bookingId);
        
        // Block dates in calendar
        // await blockDatesInCalendar(bookingId);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      
      if (bookingId) {
        // In production: Cancel pending booking
        console.log(`Cancelling expired booking: ${bookingId}`);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      
      // In production: Handle failed payment, notify customer
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      console.log('Charge refunded:', charge.id);
      
      // In production: Update booking status, unblock dates
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
