'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for data fetching with caching, retry, and error handling.
 * 
 * Purpose: Provides a consistent way to fetch data in components with
 * built-in loading states, error handling, and automatic retries.
 */

interface UseFetchOptions<T> {
  /** Initial data before fetch completes */
  initialData?: T;
  /** Enable automatic refetching on window focus */
  refetchOnFocus?: boolean;
  /** Enable automatic refetching on network reconnection */
  refetchOnReconnect?: boolean;
  /** Cache time in milliseconds (0 = no cache) */
  cacheTime?: number;
  /** Retry count on failure */
  retryCount?: number;
  /** Delay between retries in milliseconds */
  retryDelay?: number;
  /** Whether to fetch on mount */
  enabled?: boolean;
  /** Callback on success */
  onSuccess?: (data: T) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

interface UseFetchResult<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  refetch: () => Promise<void>;
  mutate: (data: T) => void;
}

// Simple in-memory cache for client-side
const cache = new Map<string, { data: unknown; timestamp: number }>();

export function useFetch<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
  const {
    initialData,
    refetchOnFocus = false,
    refetchOnReconnect = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    retryCount = 3,
    retryDelay = 1000,
    enabled = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | undefined>(() => {
    // Check cache first
    if (key && cacheTime > 0) {
      const cached = cache.get(key);
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        return cached.data as T;
      }
    }
    return initialData;
  });
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(!data && enabled);
  const [isValidating, setIsValidating] = useState(false);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const retryRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (isRevalidation = false) => {
    if (!key || !enabled) return;

    // Abort any in-flight request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    if (isRevalidation) {
      setIsValidating(true);
    } else {
      setIsLoading(true);
    }

    try {
      const result = await fetcherRef.current();
      
      // Update cache
      if (cacheTime > 0) {
        cache.set(key, { data: result, timestamp: Date.now() });
      }

      setData(result);
      setError(undefined);
      retryRef.current = 0;
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      // Retry logic
      if (retryRef.current < retryCount) {
        retryRef.current += 1;
        setTimeout(() => {
          fetchData(isRevalidation);
        }, retryDelay * retryRef.current);
        return;
      }

      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  }, [key, enabled, cacheTime, retryCount, retryDelay, onSuccess, onError]);

  // Initial fetch
  useEffect(() => {
    if (enabled && key) {
      const cached = cache.get(key);
      if (!cached || Date.now() - cached.timestamp >= cacheTime) {
        fetchData();
      }
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [key, enabled, fetchData, cacheTime]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnFocus) return;

    const handleFocus = () => {
      fetchData(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnFocus, fetchData]);

  // Refetch on network reconnection
  useEffect(() => {
    if (!refetchOnReconnect) return;

    const handleOnline = () => {
      fetchData(true);
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [refetchOnReconnect, fetchData]);

  const refetch = useCallback(async () => {
    retryRef.current = 0;
    await fetchData(true);
  }, [fetchData]);

  const mutate = useCallback((newData: T) => {
    setData(newData);
    if (key && cacheTime > 0) {
      cache.set(key, { data: newData, timestamp: Date.now() });
    }
  }, [key, cacheTime]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    refetch,
    mutate,
  };
}

/**
 * Hook for lazy data fetching (fetch on demand instead of on mount).
 */
export function useLazyFetch<T, Args extends unknown[]>(
  fetcher: (...args: Args) => Promise<T>
): {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
  fetch: (...args: Args) => Promise<T | undefined>;
  reset: () => void;
} {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async (...args: Args): Promise<T | undefined> => {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await fetcher(...args);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  const reset = useCallback(() => {
    setData(undefined);
    setError(undefined);
    setIsLoading(false);
  }, []);

  return { data, error, isLoading, fetch, reset };
}

/**
 * Hook for debounced values (useful for search inputs).
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
