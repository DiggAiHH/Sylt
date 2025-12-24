import React from 'react';
import { cn } from '../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Using pulse as fallback since shimmer may not be defined
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-sand-200',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

// Pre-built skeleton patterns
export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-card">
      <Skeleton variant="rectangular" className="aspect-[4/3]" />
      <div className="p-6 space-y-4">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="rounded" width={100} height={40} />
        </div>
      </div>
    </div>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-card">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={20} height={20} />
        ))}
      </div>
      <div className="space-y-2 mb-6">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="space-y-2">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </div>
      </div>
    </div>
  );
}

export function RoomListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} variant="rounded" className="aspect-[4/3]" />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen">
      <Skeleton variant="rectangular" className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Skeleton variant="text" width={400} height={60} className="mb-4" />
        <Skeleton variant="text" width={300} height={24} />
      </div>
    </div>
  );
}
