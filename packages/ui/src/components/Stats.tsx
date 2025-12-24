'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface Stat {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface StatsProps {
  stats: Stat[];
  className?: string;
  variant?: 'default' | 'cards' | 'inline';
}

export function Stats({ stats, className, variant = 'default' }: StatsProps) {
  const containerClasses = {
    default: 'grid grid-cols-2 md:grid-cols-4 gap-8',
    cards: 'grid grid-cols-2 md:grid-cols-4 gap-4',
    inline: 'flex flex-wrap justify-center gap-12',
  };

  return (
    <div className={cn(containerClasses[variant], className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={cn(
            'text-center',
            variant === 'cards' && 'bg-white/10 backdrop-blur-sm rounded-lg p-6'
          )}
        >
          <div className="font-heading text-4xl md:text-5xl text-nordsee-500 mb-2">
            {stat.prefix}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              {stat.value}
            </motion.span>
            {stat.suffix}
          </div>
          <p className="font-body text-sm text-reetdach-500 tracking-wide uppercase">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
