'use client';

import React, { useState } from 'react';
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
  const [isFavorite, setIsFavorite] = useState(false);

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
            <div className="absolute top-4 left-4 bg-nordsee-500 text-white px-3 py-1 text-sm font-body tracking-wide z-10">
              Featured
            </div>
          )}

          {/* Favorite Button - Loveable Micro-interaction */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent link navigation
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-nordsee-400 group/heart"
            aria-label={isFavorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={cn(
                "w-5 h-5 transition-colors duration-300", 
                isFavorite ? "fill-red-500 text-red-500" : "fill-transparent text-charcoal group-hover/heart:text-red-500"
              )}
              stroke="currentColor"
              strokeWidth="1.5"
              initial={false}
              animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </motion.svg>
          </button>
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
