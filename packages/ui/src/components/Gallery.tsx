'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
  variant?: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4;
}

export function Gallery({
  images,
  className,
  variant = 'grid',
  columns = 3,
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div
        className={cn(
          'grid gap-4',
          columnClasses[columns],
          className
        )}
        role="list"
      >
        {images.map((image, index) => (
          <motion.button
            key={image.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group w-full focus:outline-none focus:ring-4 focus:ring-nordsee-200"
            onClick={() => setSelectedImage(image)}
            aria-label={`Bild vergrößern: ${image.alt}`}
            role="listitem"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Bildansicht"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="object-contain w-full h-full rounded-lg"
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl w-10 h-10 rounded-full bg-charcoal/50 hover:bg-charcoal/70 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Schließen"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
