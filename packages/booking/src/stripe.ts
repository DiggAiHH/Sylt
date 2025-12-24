import type { PaymentIntent, Booking } from '@sylt/types';

export interface StripeConfig {
  publishableKey: string;
  secretKey?: string;
}

export interface CreatePaymentIntentParams {
  booking: Booking;
  currency?: string;
}

/**
 * Stripe Service for payment processing
 * Note: This is a client-side utility. Server-side operations should use the Hub API.
 */
export class StripeService {
  private publishableKey: string;

  constructor(config: StripeConfig) {
    this.publishableKey = config.publishableKey;
  }

  /**
   * Initialize Stripe.js on the client
   */
  async loadStripe() {
    if (typeof window === 'undefined') {
      throw new Error('Stripe can only be loaded on the client side');
    }

    // Dynamic import of Stripe.js
    const { loadStripe } = await import('@stripe/stripe-js');
    return loadStripe(this.publishableKey);
  }

  /**
   * Calculate total amount for a booking
   */
  calculateBookingAmount(booking: Pick<Booking, 'checkIn' | 'checkOut'>, pricePerNight: number): number {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    return nights * pricePerNight * 100; // Convert to cents
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency,
    }).format(amount / 100);
  }

  /**
   * Validate payment intent response
   */
  validatePaymentIntent(paymentIntent: PaymentIntent): boolean {
    return (
      paymentIntent.id !== undefined &&
      paymentIntent.amount > 0 &&
      paymentIntent.clientSecret !== undefined
    );
  }
}

/**
 * Payment status messages in German
 */
export const paymentStatusMessages: Record<string, string> = {
  requires_payment_method: 'Zahlungsmethode erforderlich',
  requires_confirmation: 'Bestätigung erforderlich',
  requires_action: 'Weitere Aktion erforderlich',
  processing: 'Zahlung wird verarbeitet',
  succeeded: 'Zahlung erfolgreich',
  canceled: 'Zahlung abgebrochen',
};

/**
 * Get user-friendly payment status message
 */
export function getPaymentStatusMessage(status: string): string {
  return paymentStatusMessages[status] || 'Unbekannter Status';
}
