/**
 * Simple in-memory rate limiter using sliding window algorithm.
 * Prevents abuse of API endpoints.
 * 
 * In production, this should use Redis or a similar distributed cache
 * to work across multiple server instances.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store - replace with Redis in production
const rateLimitStore = new Map<string, RateLimitEntry>();

// Max store size to prevent memory issues (cleanup oldest when exceeded)
const MAX_STORE_SIZE = 10000;

/**
 * Lazy cleanup of expired entries.
 * Called during rate limit checks to avoid setInterval issues in serverless.
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  const keys = Array.from(rateLimitStore.keys());
  
  for (const key of keys) {
    const entry = rateLimitStore.get(key);
    if (entry && entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  
  // If store is still too large, remove oldest entries
  if (rateLimitStore.size > MAX_STORE_SIZE) {
    const entriesToRemove = rateLimitStore.size - MAX_STORE_SIZE;
    const iterator = rateLimitStore.keys();
    for (let i = 0; i < entriesToRemove; i++) {
      const key = iterator.next().value;
      if (key) rateLimitStore.delete(key);
    }
  }
}

interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  maxRequests: number;  // Max requests per window
}

// Default rate limit configurations for different endpoints
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  availability: { windowMs: 60 * 1000, maxRequests: 30 },  // 30 req/min
  bookings: { windowMs: 60 * 1000, maxRequests: 10 },      // 10 req/min
  properties: { windowMs: 60 * 1000, maxRequests: 60 },    // 60 req/min
  ical: { windowMs: 60 * 1000, maxRequests: 20 },          // 20 req/min
  default: { windowMs: 60 * 1000, maxRequests: 100 },      // 100 req/min
};

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;  // Seconds until reset (if blocked)
}

/**
 * Check if request is allowed based on rate limit.
 * Uses sliding window algorithm for fair rate limiting.
 * 
 * @param identifier - Unique identifier (e.g., IP address, API key)
 * @param endpoint - Endpoint name for limit lookup
 * @returns RateLimitResult with allowed status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  endpoint: string = 'default'
): RateLimitResult {
  // Lazy cleanup on every 100th check to avoid overhead
  if (rateLimitStore.size > 100 && Math.random() < 0.01) {
    cleanupExpiredEntries();
  }
  
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS.default;
  const key = `${endpoint}:${identifier}`;
  const now = Date.now();
  
  const entry = rateLimitStore.get(key);
  
  // No entry or expired - create new window
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }
  
  // Within window - check count
  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter,
    };
  }
  
  // Increment count
  entry.count++;
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get rate limit headers for HTTP response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
  
  if (!result.allowed && result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString();
  }
  
  return headers;
}

/**
 * Extract client identifier from request.
 * Uses X-Forwarded-For for proxied requests, falls back to connection IP.
 * 
 * SECURITY NOTE: X-Forwarded-For can be spoofed by clients. In production:
 * - Configure your reverse proxy (nginx, cloudflare, etc.) to set this header
 * - Only trust this header when behind a trusted proxy
 * - Consider using additional identifiers like API keys for authenticated endpoints
 * - For Vercel/Cloudflare, the rightmost IP in the chain is typically most reliable
 */
export function getClientIdentifier(request: Request): string {
  // Prefer Cloudflare's connecting IP header (can't be spoofed when using Cloudflare)
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Vercel's real IP header
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim();
  }
  
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take the first IP in the chain (original client)
    // Note: In production behind a trusted proxy, consider taking the rightmost IP
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback for development (no proxy)
  return 'localhost';
}
