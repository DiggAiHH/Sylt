'use client';

import Image from 'next/image';
import { useState, memo } from 'react';
import { cn } from '../utils/cn';

/**
 * OptimizedImage Component
 * 
 * Wrapper around next/image with:
 * - Automatic lazy loading
 * - Blur placeholder during load
 * - Error handling with fallback
 * - SEO-optimized alt text enforcement
 * - Aspect ratio preservation
 */
interface OptimizedImageProps {
  /** Image source URL */
  src: string;
  /** Alt text - required for SEO and accessibility */
  alt: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Fill container instead of using fixed dimensions */
  fill?: boolean;
  /** Priority loading for LCP images */
  priority?: boolean;
  /** CSS class for the wrapper */
  className?: string;
  /** CSS class for the image element */
  imageClassName?: string;
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Object fit behavior */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Fallback image on error */
  fallbackSrc?: string;
  /** Image sizes for responsive loading */
  sizes?: string;
  /** Quality setting (1-100) */
  quality?: number;
  /** Loading behavior */
  loading?: 'lazy' | 'eager';
}

function OptimizedImageComponent({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  imageClassName,
  aspectRatio,
  objectFit = 'cover',
  fallbackSrc = '/images/placeholder.jpg',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  loading,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use fallback if original image fails
  const imageSrc = hasError ? fallbackSrc : src;

  // Determine loading behavior
  const loadingBehavior = loading || (priority ? 'eager' : 'lazy');

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Wrapper styles for aspect ratio preservation
  const wrapperStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio }
    : {};

  // Common image props
  const imageProps = {
    src: imageSrc,
    alt,
    quality,
    sizes,
    priority,
    loading: loadingBehavior as 'lazy' | 'eager',
    onLoad: handleLoad,
    onError: handleError,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      imageClassName
    ),
    style: { objectFit },
  };

  // Render with fill or fixed dimensions
  if (fill) {
    return (
      <div
        className={cn('relative overflow-hidden', className)}
        style={wrapperStyle}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-sand-200 animate-pulse" />
        )}
        <Image
          {...imageProps}
          fill
          alt={alt}
        />
      </div>
    );
  }

  // Fixed dimensions require width and height
  if (!width || !height) {
    console.warn('OptimizedImage: width and height are required when fill is false');
    return null;
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={wrapperStyle}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-sand-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <Image
        {...imageProps}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  );
}

/**
 * Memoized OptimizedImage component
 * Prevents unnecessary re-renders for static images
 */
export const OptimizedImage = memo(OptimizedImageComponent);

OptimizedImage.displayName = 'OptimizedImage';

/**
 * Hero Image component with priority loading
 * Optimized for Largest Contentful Paint (LCP)
 */
interface HeroImageProps extends Omit<OptimizedImageProps, 'priority' | 'loading'> {
  /** Optional overlay gradient */
  overlay?: boolean;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
}

export function HeroImage({
  overlay = true,
  overlayOpacity = 0.4,
  className,
  ...props
}: HeroImageProps) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <OptimizedImage
        {...props}
        fill
        priority
        sizes="100vw"
        quality={90}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/60"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}
