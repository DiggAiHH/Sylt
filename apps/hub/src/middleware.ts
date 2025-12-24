import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getGlobalRateLimiter, getClientIdentifier } from '@sylt/booking';
import { generateRequestId } from '@sylt/booking';

/**
 * Next.js Middleware
 * 
 * Purpose: Centralized request processing for security, rate limiting,
 * request tracing, and CORS handling.
 * 
 * This middleware runs on every request matching the configured paths.
 */

// Initialize rate limiter with production-ready settings
const rateLimiter = getGlobalRateLimiter({
  maxTokens: 100,      // 100 requests
  refillTimeMs: 60000, // per minute
  refillAmount: 100,   // full refill
});

// CORS configuration
const ALLOWED_ORIGINS = [
  'https://blumsylthotels.de',
  'https://syltrooms.de',
  'https://privathomes.de',
  'https://longislandhouse.de',
  'https://auster-appartements.de',
  'https://beach-home.de',
  // Development origins
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
];

// Paths that require rate limiting
const RATE_LIMITED_PATHS = ['/api/bookings', '/api/payments', '/api/contact'];

// Paths that are exempt from rate limiting
const EXEMPT_PATHS = ['/api/health', '/_next', '/static'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');
  const requestId = request.headers.get('x-request-id') || generateRequestId();

  // Skip middleware for exempt paths
  if (EXEMPT_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Create response headers
  const responseHeaders = new Headers();
  responseHeaders.set('x-request-id', requestId);

  // CORS handling for API routes
  if (pathname.startsWith('/api')) {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return handlePreflight(origin, responseHeaders);
    }

    // Validate origin for cross-origin requests
    if (origin && !isAllowedOrigin(origin)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: {
            code: 'CORS_ERROR',
            message: 'Origin not allowed',
          },
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'x-request-id': requestId,
          },
        }
      );
    }

    // Add CORS headers for allowed origins
    if (origin && isAllowedOrigin(origin)) {
      responseHeaders.set('Access-Control-Allow-Origin', origin);
      responseHeaders.set('Access-Control-Allow-Credentials', 'true');
    }

    // Rate limiting for specific paths
    if (RATE_LIMITED_PATHS.some((path) => pathname.startsWith(path))) {
      const clientId = getClientIdentifier(request);
      const result = rateLimiter.consume(clientId);

      responseHeaders.set('X-RateLimit-Remaining', String(result.remainingTokens));
      responseHeaders.set('X-RateLimit-Reset', String(result.resetTime));

      if (!result.allowed) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: {
              code: 'RATE_LIMIT_EXCEEDED',
              message: 'Too many requests. Please try again later.',
              retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
            },
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(Math.ceil((result.resetTime - Date.now()) / 1000)),
              'x-request-id': requestId,
              ...Object.fromEntries(responseHeaders),
            },
          }
        );
      }
    }
  }

  // Add security headers
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('X-Frame-Options', 'DENY');
  responseHeaders.set('X-XSS-Protection', '1; mode=block');
  responseHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Continue to the route handler
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  // Copy response headers
  responseHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

function handlePreflight(origin: string | null, headers: Headers): NextResponse {
  if (origin && isAllowedOrigin(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  }

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

/**
 * Validates if origin is in the allowed list.
 * Note: Subdomain wildcards are NOT used to prevent unauthorized access.
 * All allowed origins must be explicitly listed in ALLOWED_ORIGINS.
 */
function isAllowedOrigin(origin: string): boolean {
  // In development, allow all origins for easier testing
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  // Strict check against explicit allowlist only
  return ALLOWED_ORIGINS.includes(origin);
}

// Configure which paths this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
