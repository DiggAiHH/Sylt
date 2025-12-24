/**
 * Rate Limiter using Token Bucket Algorithm
 * 
 * Purpose: Prevents API abuse and DoS attacks by limiting request rate per client.
 * The token bucket algorithm allows for burst traffic while maintaining a sustainable rate.
 */

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

interface RateLimiterConfig {
  /** Maximum number of tokens (requests) in the bucket */
  maxTokens: number;
  /** Time window in milliseconds for token refill */
  refillTimeMs: number;
  /** Number of tokens added per refill */
  refillAmount: number;
}

const DEFAULT_CONFIG: RateLimiterConfig = {
  maxTokens: 100,        // Max 100 requests
  refillTimeMs: 60000,   // Per minute
  refillAmount: 100,     // Full refill each minute
};

export class RateLimiter {
  private buckets: Map<string, TokenBucket> = new Map();
  private config: RateLimiterConfig;

  constructor(config: Partial<RateLimiterConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Attempts to consume a token for the given identifier.
   * Returns true if request is allowed, false if rate limited.
   */
  consume(identifier: string): { allowed: boolean; remainingTokens: number; resetTime: number } {
    const now = Date.now();
    let bucket = this.buckets.get(identifier);

    if (!bucket) {
      bucket = {
        tokens: this.config.maxTokens,
        lastRefill: now,
      };
      this.buckets.set(identifier, bucket);
    }

    // Refill tokens based on elapsed time
    const timeSinceRefill = now - bucket.lastRefill;
    const refillCycles = Math.floor(timeSinceRefill / this.config.refillTimeMs);
    
    if (refillCycles > 0) {
      bucket.tokens = Math.min(
        this.config.maxTokens,
        bucket.tokens + (refillCycles * this.config.refillAmount)
      );
      bucket.lastRefill = now;
    }

    const resetTime = bucket.lastRefill + this.config.refillTimeMs;

    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      return {
        allowed: true,
        remainingTokens: bucket.tokens,
        resetTime,
      };
    }

    return {
      allowed: false,
      remainingTokens: 0,
      resetTime,
    };
  }

  /**
   * Cleans up expired buckets to prevent memory leaks.
   * Should be called periodically in production.
   * 
   * Uses 2x refillTimeMs as expiry threshold because:
   * - After one refill cycle, the bucket is fully replenished
   * - A second cycle without activity indicates the client is inactive
   * - This provides a grace period for intermittent users
   */
  cleanup(): void {
    const now = Date.now();
    // Buckets inactive for 2 full refill cycles are considered stale
    const expiryTime = this.config.refillTimeMs * 2;

    const entries = Array.from(this.buckets.entries());
    for (const [identifier, bucket] of entries) {
      if (now - bucket.lastRefill > expiryTime) {
        this.buckets.delete(identifier);
      }
    }
  }

  /**
   * Gets the current status for an identifier without consuming a token.
   */
  status(identifier: string): { tokens: number; isLimited: boolean } {
    const bucket = this.buckets.get(identifier);
    if (!bucket) {
      return { tokens: this.config.maxTokens, isLimited: false };
    }
    return { tokens: bucket.tokens, isLimited: bucket.tokens <= 0 };
  }
}

// Singleton instance for shared use across API routes
let globalRateLimiter: RateLimiter | null = null;

export function getGlobalRateLimiter(config?: Partial<RateLimiterConfig>): RateLimiter {
  if (!globalRateLimiter) {
    globalRateLimiter = new RateLimiter(config);
  }
  return globalRateLimiter;
}

/**
 * Extracts client identifier from request for rate limiting.
 * Uses IP address with fallback to X-Forwarded-For header.
 */
export function getClientIdentifier(request: Request): string {
  // Check for forwarded IP (when behind proxy/load balancer)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP in the chain (original client)
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to connection info or default
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Default identifier for local development
  return 'anonymous';
}
