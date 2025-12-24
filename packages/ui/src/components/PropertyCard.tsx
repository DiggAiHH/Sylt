'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import type { Property } from '@sylt/types';

interface PropertyCardProps {
  property: Property;
  className?: string;
  variant?: 'default' | 'featured';
}

export function PropertyCard({
  property,
  className,
  variant = 'default',
}: PropertyCardProps) {
  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0];

  return (
    <Link href={`/properties/${property.slug}`}>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-luxury transition-shadow duration-300',
          variant === 'featured' && 'lg:flex',
          className
        )}
      >
        {/* Image */}
        <div
          className={cn(
            'relative overflow-hidden',
            variant === 'default' ? 'aspect-[4/3]' : 'aspect-[4/3] lg:aspect-auto lg:w-1/2'
          )}
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {property.featured && (
            <div className="absolute top-4 left-4 bg-nordsee-500 text-white px-3 py-1 text-sm font-body tracking-wide">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn('p-6', variant === 'featured' && 'lg:w-1/2 lg:p-8 lg:flex lg:flex-col lg:justify-center')}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-body text-nordsee-500 uppercase tracking-wider">
              {property.type === 'hotel-room' && 'Hotelzimmer'}
              {property.type === 'apartment' && 'Apartment'}
              {property.type === 'vacation-home' && 'Ferienhaus'}
              {property.type === 'beach-house' && 'Strandhaus'}
            </span>
          </div>

          <h3 className="font-heading text-2xl text-charcoal mb-2 group-hover:text-nordsee-500 transition-colors">
            {property.name}
          </h3>

          <p className="font-body text-reetdach-500 mb-4 line-clamp-2">
            {property.shortDescription}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-reetdach-400 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{property.location.city}</span>
            {property.location.distanceToBeach && (
              <span>• {property.location.distanceToBeach} zum Strand</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-xl text-charcoal">
              ab €{property.priceRange.min}
            </span>
            <span className="text-sm text-reetdach-400">/ Nacht</span>
          </div>

          {/* Amenities Preview */}
          {property.amenities.length > 0 && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-sand-200">
              {property.amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity.id}
                  className="text-xs text-reetdach-400 bg-sand-100 px-2 py-1 rounded"
                >
                  {amenity.name}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-xs text-reetdach-400">
                  +{property.amenities.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
