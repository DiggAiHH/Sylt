import Stripe from 'stripe';

/**
 * Server-side Stripe Service
 * 
 * Handles all Stripe API interactions including:
 * - Creating Checkout Sessions for booking payments
 * - Processing webhooks for payment confirmation
 * - Handling refunds for cancelled bookings
 * 
 * Security: Only server-side usage - never expose secret key to client
 */

// Initialize Stripe with secret key from environment
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Create Stripe instance only if key is available
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  : null;

/**
 * Check if Stripe is properly configured
 */
export function isStripeConfigured(): boolean {
  return stripe !== null;
}

/**
 * Parameters for creating a Stripe Checkout Session
 */
interface CreateCheckoutSessionParams {
  bookingId: string;
  propertyName: string;
  guestEmail: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  totalPrice: number; // In euros (not cents)
  currency?: string;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * Result from creating a Checkout Session
 */
interface CheckoutSessionResult {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
}

/**
 * Creates a Stripe Checkout Session for booking payment
 * 
 * Uses Stripe Checkout for PCI-compliant payment collection.
 * The user is redirected to Stripe's hosted checkout page.
 */
export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<CheckoutSessionResult> {
  if (!stripe) {
    // Return mock response for development without Stripe
    console.log('[Stripe] Not configured - returning mock checkout URL');
    return {
      success: true,
      checkoutUrl: `${params.successUrl}?session_id=mock_session_${params.bookingId}`,
      sessionId: `mock_session_${params.bookingId}`,
    };
  }

  try {
    const {
      bookingId,
      propertyName,
      guestEmail,
      guestName,
      checkIn,
      checkOut,
      nights,
      totalPrice,
      currency = 'eur',
      successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/success`,
      cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/cancel`,
    } = params;

    // Format dates for display
    const checkInStr = checkIn.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const checkOutStr = checkOut.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'sepa_debit'],
      mode: 'payment',
      customer_email: guestEmail,
      client_reference_id: bookingId,
      
      // Store booking ID in metadata for webhook processing
      metadata: {
        bookingId,
        propertyName,
        guestName,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        nights: nights.toString(),
      },

      // Line items for the checkout
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Buchung: ${propertyName}`,
              description: `${nights} ${nights === 1 ? 'Nacht' : 'Nächte'}: ${checkInStr} - ${checkOutStr}\nGast: ${guestName}`,
            },
            // Stripe expects amount in cents
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],

      // Redirect URLs after payment
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${cancelUrl}?booking_id=${bookingId}`,

      // Automatic tax calculation (if configured in Stripe dashboard)
      // automatic_tax: { enabled: true },

      // Collect billing address
      billing_address_collection: 'required',

      // Session expiration (30 minutes)
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,

      // Locale for German users
      locale: 'de',

      // Enable Stripe Tax (optional)
      // tax_id_collection: { enabled: true },
    });

    return {
      success: true,
      checkoutUrl: session.url || undefined,
      sessionId: session.id,
    };
  } catch (error) {
    console.error('[Stripe] Error creating checkout session:', error);
    
    return {
      success: false,
      error: error instanceof Stripe.errors.StripeError
        ? error.message
        : 'Failed to create payment session',
    };
  }
}

/**
 * Retrieves a Checkout Session by ID
 */
export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) {
    return null;
  }

  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error('[Stripe] Error retrieving checkout session:', error);
    return null;
  }
}

/**
 * Verifies a webhook signature and constructs the event
 */
export function constructWebhookEvent(
  payload: string,
  signature: string,
  webhookSecret: string
): Stripe.Event | null {
  if (!stripe) {
    return null;
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('[Stripe] Webhook signature verification failed:', error);
    return null;
  }
}

/**
 * Creates a refund for a payment
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number, // Optional partial refund amount in cents
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
): Promise<{ success: boolean; refund?: Stripe.Refund; error?: string }> {
  if (!stripe) {
    return { success: false, error: 'Stripe not configured' };
  }

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
      reason,
    });

    return { success: true, refund };
  } catch (error) {
    console.error('[Stripe] Error creating refund:', error);
    return {
      success: false,
      error: error instanceof Stripe.errors.StripeError
        ? error.message
        : 'Failed to process refund',
    };
  }
}

/**
 * Export the Stripe instance for advanced usage
 */
export { stripe };
