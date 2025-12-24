'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useReducedMotion } from '../hooks/useAccessibility';

interface AccessibilityControlsProps {
  className?: string;
  variant?: 'floating' | 'inline' | 'compact';
}

/**
 * Accessibility Controls Component
 * 
 * Provides user-accessible controls for:
 * - Font size adjustment (A- / A / A+)
 * - High contrast toggle
 * 
 * Designed for elderly users with clear, large buttons and labels.
 */
export function AccessibilityControls({
  className,
  variant = 'floating',
}: AccessibilityControlsProps) {
  const reducedMotion = useReducedMotion();
  const [fontSize, setFontSize] = React.useState<'default' | 'large' | 'extra-large'>('default');
  const [isOpen, setIsOpen] = React.useState(false);

  // Apply font scaling to document
  React.useEffect(() => {
    const fontScales = {
      'default': '1',
      'large': '1.15',
      'extra-large': '1.3',
    };
    document.documentElement.style.setProperty('--a11y-font-scale', fontScales[fontSize]);
    
    // Persist preference
    try {
      localStorage.setItem('sylt-font-size', fontSize);
    } catch {
      // localStorage not available
    }
  }, [fontSize]);

  // Load saved preference
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('sylt-font-size') as typeof fontSize | null;
      if (saved && ['default', 'large', 'extra-large'].includes(saved)) {
        setFontSize(saved);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const handleIncrease = () => {
    const sizes: typeof fontSize[] = ['default', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const handleDecrease = () => {
    const sizes: typeof fontSize[] = ['default', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const handleReset = () => {
    setFontSize('default');
  };

  const buttonBaseStyles = cn(
    // Large touch targets for elderly users (48x48px minimum)
    'min-w-[48px] min-h-[48px]',
    'flex items-center justify-center',
    // Clear visual feedback
    'border-2 border-reetdach-300',
    'bg-white text-charcoal',
    'font-body font-semibold',
    // Focus visible for keyboard users
    'focus:outline-none focus:ring-4 focus:ring-nordsee-300 focus:ring-offset-2',
    // Hover states
    'hover:bg-sand-100 hover:border-nordsee-500',
    // Transitions (respect reduced motion)
    reducedMotion ? '' : 'transition-all duration-200',
    // Rounded for friendly appearance
    'rounded-lg'
  );

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <button
          onClick={handleDecrease}
          disabled={fontSize === 'default'}
          className={cn(buttonBaseStyles, 'text-lg px-3', fontSize === 'default' && 'opacity-50 cursor-not-allowed')}
          aria-label="Schriftgröße verkleinern"
          title="Schrift kleiner"
        >
          A-
        </button>
        <button
          onClick={handleReset}
          className={cn(buttonBaseStyles, 'text-xl px-3')}
          aria-label="Schriftgröße zurücksetzen"
          title="Standard Schriftgröße"
        >
          A
        </button>
        <button
          onClick={handleIncrease}
          disabled={fontSize === 'extra-large'}
          className={cn(buttonBaseStyles, 'text-2xl px-3', fontSize === 'extra-large' && 'opacity-50 cursor-not-allowed')}
          aria-label="Schriftgröße vergrößern"
          title="Schrift größer"
        >
          A+
        </button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex flex-col gap-4 p-4 bg-sand-50 rounded-lg', className)}>
        <div className="flex items-center justify-between">
          <span className="font-body text-lg text-charcoal font-medium">
            Schriftgröße anpassen
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={fontSize === 'default'}
              className={cn(buttonBaseStyles, 'text-lg', fontSize === 'default' && 'opacity-50 cursor-not-allowed')}
              aria-label="Schriftgröße verkleinern"
            >
              A-
            </button>
            <button
              onClick={handleReset}
              className={cn(buttonBaseStyles, 'text-xl')}
              aria-label="Schriftgröße zurücksetzen"
            >
              A
            </button>
            <button
              onClick={handleIncrease}
              disabled={fontSize === 'extra-large'}
              className={cn(buttonBaseStyles, 'text-2xl', fontSize === 'extra-large' && 'opacity-50 cursor-not-allowed')}
              aria-label="Schriftgröße vergrößern"
            >
              A+
            </button>
          </div>
        </div>
        <p className="font-body text-base text-reetdach-500">
          Aktuelle Größe: {fontSize === 'default' ? 'Standard' : fontSize === 'large' ? 'Groß' : 'Sehr groß'}
        </p>
      </div>
    );
  }

  // Floating variant (default)
  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full',
          'bg-nordsee-500 text-white',
          'shadow-luxury',
          'flex items-center justify-center',
          'focus:outline-none focus:ring-4 focus:ring-nordsee-300 focus:ring-offset-2',
          'hover:bg-nordsee-600'
        )}
        whileHover={reducedMotion ? {} : { scale: 1.05 }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
        aria-label={isOpen ? 'Barrierefreiheit-Menü schließen' : 'Barrierefreiheit-Menü öffnen'}
        aria-expanded={isOpen}
        aria-controls="a11y-menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </motion.button>

      {/* Menu Panel */}
      {isOpen && (
        <motion.div
          id="a11y-menu"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
          className={cn(
            'absolute bottom-16 right-0',
            'w-72 p-6',
            'bg-white rounded-xl shadow-luxury',
            'border border-sand-200'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Barrierefreiheit-Einstellungen"
        >
          <h3 className="font-heading text-xl text-charcoal mb-6">
            Barrierefreiheit
          </h3>

          {/* Font Size Controls */}
          <div className="mb-6">
            <label className="block font-body text-base text-reetdach-600 mb-3">
              Schriftgröße
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrease}
                disabled={fontSize === 'default'}
                className={cn(
                  buttonBaseStyles,
                  'text-lg flex-1',
                  fontSize === 'default' && 'opacity-50 cursor-not-allowed'
                )}
                aria-label="Schriftgröße verkleinern"
              >
                A-
              </button>
              <button
                onClick={handleReset}
                className={cn(buttonBaseStyles, 'text-xl flex-1')}
                aria-label="Schriftgröße zurücksetzen"
              >
                A
              </button>
              <button
                onClick={handleIncrease}
                disabled={fontSize === 'extra-large'}
                className={cn(
                  buttonBaseStyles,
                  'text-2xl flex-1',
                  fontSize === 'extra-large' && 'opacity-50 cursor-not-allowed'
                )}
                aria-label="Schriftgröße vergrößern"
              >
                A+
              </button>
            </div>
            <p className="mt-2 font-body text-sm text-reetdach-400">
              {fontSize === 'default' ? 'Standard' : fontSize === 'large' ? 'Groß' : 'Sehr groß'}
            </p>
          </div>

          {/* Info Text */}
          <p className="font-body text-sm text-reetdach-500 leading-relaxed">
            Diese Einstellungen werden gespeichert und bei Ihrem nächsten Besuch wiederhergestellt.
          </p>
        </motion.div>
      )}
    </div>
  );
}
