/**
 * In-Memory Cache with TTL Support
 * 
 * Purpose: Reduces database/API load by caching frequently accessed data.
 * Implements LRU-style cleanup and TTL-based expiration.
 * 
 * For production, consider replacing with Redis for distributed caching.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  createdAt: number;
}

interface CacheConfig {
  /** Default TTL in milliseconds */
  defaultTtlMs: number;
  /** Maximum number of entries before cleanup */
  maxEntries: number;
  /** Enable stale-while-revalidate pattern */
  staleWhileRevalidate: boolean;
  /** Percentage of entries to remove during cleanup (0.0 - 1.0) */
  cleanupPercentage: number;
}

const DEFAULT_CONFIG: CacheConfig = {
  defaultTtlMs: 5 * 60 * 1000, // 5 minutes
  maxEntries: 1000,
  staleWhileRevalidate: true,
  cleanupPercentage: 0.2, // Remove oldest 20% when at capacity
};

export class CacheService<T = unknown> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private config: CacheConfig;
  private pendingRequests: Map<string, Promise<T>> = new Map();

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Gets a value from cache.
   * Returns undefined if not found or expired.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }

    const now = Date.now();
    
    // Check if expired
    if (now > entry.expiresAt) {
      // If stale-while-revalidate is enabled, return stale data
      if (this.config.staleWhileRevalidate) {
        return entry.value;
      }
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Checks if a cached value is stale (expired but still returned).
   */
  isStale(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return true;
    return Date.now() > entry.expiresAt;
  }

  /**
   * Sets a value in cache with optional custom TTL.
   */
  set(key: string, value: T, ttlMs?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttlMs ?? this.config.defaultTtlMs);

    // Cleanup if we're at capacity
    if (this.cache.size >= this.config.maxEntries) {
      this.cleanup();
    }

    this.cache.set(key, {
      value,
      expiresAt,
      createdAt: now,
    });
  }

  /**
   * Deletes a specific key from cache.
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears all cache entries.
   */
  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }

  /**
   * Gets a value from cache or fetches it using the provided function.
   * Implements request deduplication to prevent thundering herd.
   */
  async getOrFetch(
    key: string,
    fetchFn: () => Promise<T>,
    ttlMs?: number
  ): Promise<T> {
    // Check cache first
    const cached = this.get(key);
    if (cached !== undefined && !this.isStale(key)) {
      return cached;
    }

    // Check if there's already a pending request for this key (deduplication)
    const pending = this.pendingRequests.get(key);
    if (pending) {
      return pending;
    }

    // Create new fetch promise
    const fetchPromise = fetchFn()
      .then((value) => {
        this.set(key, value, ttlMs);
        return value;
      })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, fetchPromise);

    // If we have stale data, return it immediately while revalidating
    if (cached !== undefined && this.config.staleWhileRevalidate) {
      fetchPromise.catch(() => {
        // Silently handle revalidation errors when returning stale data
      });
      return cached;
    }

    return fetchPromise;
  }

  /**
   * Removes expired entries and oldest entries if over capacity.
   */
  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());

    // Remove expired entries first
    for (const [key, entry] of entries) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }

    // If still over capacity, remove oldest entries based on configured percentage
    if (this.cache.size >= this.config.maxEntries) {
      const sortedEntries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].createdAt - b[1].createdAt);
      
      const removeCount = Math.floor(this.config.maxEntries * this.config.cleanupPercentage);
      const toRemove = sortedEntries.slice(0, removeCount);
      for (const [key] of toRemove) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Returns cache statistics for monitoring.
   */
  stats(): { size: number; pendingRequests: number } {
    return {
      size: this.cache.size,
      pendingRequests: this.pendingRequests.size,
    };
  }
}

// Singleton instances for different cache types
const caches: Map<string, CacheService<unknown>> = new Map();

export function getCache<T>(namespace: string, config?: Partial<CacheConfig>): CacheService<T> {
  let cache = caches.get(namespace);
  if (!cache) {
    cache = new CacheService<T>(config);
    caches.set(namespace, cache);
  }
  return cache as CacheService<T>;
}
