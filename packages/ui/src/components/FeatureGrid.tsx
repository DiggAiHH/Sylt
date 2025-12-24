'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  className?: string;
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'cards' | 'minimal';
}

export function FeatureGrid({
  features,
  className,
  columns = 3,
  variant = 'default',
}: FeatureGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-8', columnClasses[columns], className)}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={cn(
            variant === 'cards' && 'bg-white rounded-lg p-8 shadow-card hover:shadow-luxury transition-shadow duration-300',
            variant === 'minimal' && 'text-center'
          )}
        >
          <div
            className={cn(
              'mb-4',
              variant === 'minimal' && 'flex justify-center'
            )}
          >
            <div
              className={cn(
                'w-14 h-14 rounded-lg flex items-center justify-center',
                variant === 'cards' ? 'bg-nordsee-50' : 'bg-nordsee-100'
              )}
            >
              {feature.icon}
            </div>
          </div>
          <h3 className="font-heading text-xl text-charcoal mb-2">
            {feature.title}
          </h3>
          <p className="font-body text-reetdach-500 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
