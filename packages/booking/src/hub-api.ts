import type {
  Property,
  Booking,
  BookingRequest,
  AvailabilityCalendar,
  PaymentIntent,
  ApiResponse,
} from '@sylt/types';

export interface HubApiClient {
  // Properties
  getProperties: () => Promise<ApiResponse<Property[]>>;
  getProperty: (id: string) => Promise<ApiResponse<Property>>;
  getPropertyBySlug: (slug: string) => Promise<ApiResponse<Property>>;

  // Availability
  getAvailability: (
    roomId: string,
    startDate: string,
    endDate: string
  ) => Promise<ApiResponse<AvailabilityCalendar>>;
  checkAvailability: (
    propertyId: string,
    checkIn: string,
    checkOut: string,
    guests: number
  ) => Promise<ApiResponse<{ available: boolean; rooms: string[] }>>;

  // Bookings
  createBooking: (booking: BookingRequest) => Promise<ApiResponse<Booking>>;
  getBooking: (id: string) => Promise<ApiResponse<Booking>>;
  cancelBooking: (id: string) => Promise<ApiResponse<Booking>>;

  // Payments
  createPaymentIntent: (bookingId: string) => Promise<ApiResponse<PaymentIntent>>;
  confirmPayment: (paymentIntentId: string) => Promise<ApiResponse<PaymentIntent>>;
}

interface HubApiClientConfig {
  baseUrl: string;
  apiKey?: string;
}

export function createHubApiClient(config: HubApiClientConfig): HubApiClient {
  const { baseUrl, apiKey } = config;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      // CRITICAL FIX: Add timeout to all requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options?.headers,
        },
        signal: options?.signal || controller.signal,
      });
      
      clearTimeout(timeoutId);

      // CRITICAL FIX: Better JSON parsing error handling
      let data: Record<string, unknown> | undefined;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          // Invalid JSON from server
          if (!response.ok) {
            return {
              success: false,
              error: {
                code: `HTTP_${response.status}`,
                message: `Server error: Invalid JSON response (${response.status})`,
              },
            };
          }
          data = undefined;
        }
      } else {
        // Non-JSON response
        const textResponse = await response.text();
        if (!response.ok) {
          return {
            success: false,
            error: {
              code: `HTTP_${response.status}`,
              message: textResponse || response.statusText || 'An error occurred',
            },
          };
        }
      }

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: (data as Record<string, unknown>)?.message as string || (data as Record<string, unknown>)?.error as string || 'An error occurred',
            details: data,
          },
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      // CRITICAL FIX: Differentiate between network errors and timeouts
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          error: {
            code: 'TIMEOUT_ERROR',
            message: 'Request timed out. Please check your connection and try again.',
          },
        };
      }
      
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error',
        },
      };
    }
  }

  return {
    // Properties
    getProperties: () => fetchApi<Property[]>('/api/properties'),

    getProperty: (id: string) => fetchApi<Property>(`/api/properties/${id}`),

    getPropertyBySlug: (slug: string) =>
      fetchApi<Property>(`/api/properties/slug/${slug}`),

    // Availability
    getAvailability: (roomId: string, startDate: string, endDate: string) =>
      fetchApi<AvailabilityCalendar>(
        `/api/availability/${roomId}?startDate=${startDate}&endDate=${endDate}`
      ),

    checkAvailability: (
      propertyId: string,
      checkIn: string,
      checkOut: string,
      guests: number
    ) =>
      fetchApi<{ available: boolean; rooms: string[] }>(
        `/api/availability/check?propertyId=${propertyId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      ),

    // Bookings
    createBooking: (booking: BookingRequest) =>
      fetchApi<Booking>('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(booking),
      }),

    getBooking: (id: string) => fetchApi<Booking>(`/api/bookings/${id}`),

    cancelBooking: (id: string) =>
      fetchApi<Booking>(`/api/bookings/${id}/cancel`, {
        method: 'POST',
      }),

    // Payments
    createPaymentIntent: (bookingId: string) =>
      fetchApi<PaymentIntent>('/api/payments/intent', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
      }),

    confirmPayment: (paymentIntentId: string) =>
      fetchApi<PaymentIntent>(`/api/payments/${paymentIntentId}/confirm`, {
        method: 'POST',
      }),
  };
}
