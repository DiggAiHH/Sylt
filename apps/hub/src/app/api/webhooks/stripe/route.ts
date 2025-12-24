import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { bookings } from '@/app/api/bookings/route';

// Initialize Stripe (with placeholder key - would be from env in production)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe events for payment processing:
 * - checkout.session.completed: Confirms booking after successful payment
 * - checkout.session.expired: Cancels booking if payment session expires
 * - payment_intent.payment_failed: Handles failed payments
 * - charge.refunded: Handles refunds and cancellations
 * 
 * Security: Webhook signatures are verified before processing events
 */
export async function POST(request: NextRequest) {
  if (!stripe) {
    console.log('[Stripe Webhook] Stripe not configured - webhook endpoint ready but inactive');
    return NextResponse.json({ received: true, message: 'Stripe not configured' });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    console.error('[Stripe Webhook] Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    if (!webhookSecret) {
      console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Log event for debugging
  console.log(`[Stripe Webhook] Processing event: ${event.type} (${event.id})`);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[Stripe Webhook] Payment completed for session: ${session.id}`);
      
      // Extract booking ID from metadata
      const bookingId = session.metadata?.bookingId;
      
      if (bookingId) {
        // Update booking status to 'confirmed'
        const booking = bookings.get(bookingId);
        if (booking) {
          booking.status = 'confirmed';
          booking.stripePaymentIntentId = session.payment_intent as string || session.id;
          booking.updatedAt = new Date();
          bookings.set(bookingId, booking);
          
          console.log(`[Stripe Webhook] Booking confirmed: ${bookingId}`);
          
          // In production, you would:
          // 1. Update booking in database
          // 2. Send confirmation email to guest
          // 3. Block dates in availability calendar
          // 4. Notify property manager
          // 5. Create calendar event (iCal export)
        } else {
          console.error(`[Stripe Webhook] Booking not found: ${bookingId}`);
        }
      } else {
        console.error('[Stripe Webhook] No bookingId in session metadata');
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      
      if (bookingId) {
        // Cancel pending booking
        const booking = bookings.get(bookingId);
        if (booking && booking.status === 'pending') {
          booking.status = 'cancelled';
          booking.updatedAt = new Date();
          bookings.set(bookingId, booking);
          
          console.log(`[Stripe Webhook] Booking cancelled due to expired session: ${bookingId}`);
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);
      
      // Find booking by payment intent ID and mark as failed
      // In production, notify customer about failed payment
      const failedMessage = paymentIntent.last_payment_error?.message;
      console.log(`[Stripe Webhook] Failure reason: ${failedMessage}`);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      console.log(`[Stripe Webhook] Charge refunded: ${charge.id}`);
      
      // In production:
      // 1. Find booking by payment intent
      // 2. Update booking status to 'cancelled' if fully refunded
      // 3. Unblock dates in availability calendar
      // 4. Send cancellation email to guest
      break;
    }

    case 'charge.dispute.created': {
      const dispute = event.data.object as Stripe.Dispute;
      console.log(`[Stripe Webhook] Dispute created: ${dispute.id}`);
      
      // Alert operations team about dispute
      break;
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  // Return 200 OK to acknowledge receipt of the event
  return NextResponse.json({ received: true, eventId: event.id });
}
