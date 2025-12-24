'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '../utils/cn';

interface SkipLinkProps {
  /** Target element ID to skip to */
  targetId?: string;
  /** Custom label for the skip link */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Skip Link Component for Keyboard/Screen Reader Navigation
 * 
 * Allows users to bypass repetitive navigation and jump directly to main content.
 * Essential for keyboard-only users and screen reader users, especially seniors.
 * 
 * Usage:
 * 1. Add <SkipLink /> at the very top of your layout
 * 2. Ensure your main content has id="main-content"
 */
export function SkipLink({
  targetId = 'main-content',
  label = 'Zum Hauptinhalt springen',
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        // Hidden by default, visible on focus
        'sr-only focus:not-sr-only',
        // Positioning when visible
        'focus:fixed focus:top-4 focus:left-4 focus:z-[9999]',
        // Styling for visibility
        'focus:block focus:px-6 focus:py-4',
        'focus:bg-nordsee-500 focus:text-white',
        'focus:font-body focus:text-lg focus:font-medium',
        'focus:rounded-lg focus:shadow-luxury',
        // Large touch target and clear focus ring
        'focus:outline-none focus:ring-4 focus:ring-nordsee-300 focus:ring-offset-2',
        // Smooth transition
        'transition-all duration-200',
        className
      )}
    >
      {label}
    </a>
  );
}

interface SkipLinksGroupProps {
  /** Array of skip link targets */
  links?: Array<{
    targetId: string;
    label: string;
  }>;
  className?: string;
}

/**
 * Multiple Skip Links for Complex Pages
 * 
 * Provides multiple navigation options for pages with distinct sections.
 */
export function SkipLinksGroup({
  links = [
    { targetId: 'main-content', label: 'Zum Hauptinhalt springen' },
    { targetId: 'main-nav', label: 'Zur Navigation springen' },
    { targetId: 'footer', label: 'Zur Fußzeile springen' },
  ],
  className,
}: SkipLinksGroupProps) {
  return (
    <div className={cn('sr-only focus-within:not-sr-only', className)}>
      <div className="focus-within:fixed focus-within:top-4 focus-within:left-4 focus-within:z-[9999] focus-within:flex focus-within:flex-col focus-within:gap-2">
        {links.map((link) => (
          <a
            key={link.targetId}
            href={`#${link.targetId}`}
            className={cn(
              'block px-6 py-4',
              'bg-nordsee-500 text-white',
              'font-body text-lg font-medium',
              'rounded-lg shadow-luxury',
              'outline-none ring-4 ring-nordsee-300 ring-offset-2',
              'hover:bg-nordsee-600',
              'transition-colors duration-200'
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
