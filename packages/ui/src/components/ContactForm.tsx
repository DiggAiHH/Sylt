'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Button } from './Button';

interface ContactFormProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
  variant?: 'default' | 'minimal' | 'sidebar';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  propertyInterest?: string;
}

/**
 * Accessible Contact Form Component
 * 
 * Features for elderly users:
 * - Large form fields with 48px minimum height
 * - Clear labels with sufficient contrast
 * - Error messages announced to screen readers
 * - Large checkbox with visible focus ring
 * - Reduced motion support
 */
export function ContactForm({
  className,
  onSubmit,
  variant = 'default',
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // CRITICAL FIX: Add client-side validation before submission
    // Validate name
    const trimmedName = formData.name.trim();
    if (trimmedName.length < 2) {
      setError('Bitte geben Sie einen gültigen Namen ein (mindestens 2 Zeichen).');
      setIsSubmitting(false);
      return;
    }
    
    // Validate email with RFC 5322 compliant regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const trimmedEmail = formData.email.trim().toLowerCase();
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      setIsSubmitting(false);
      return;
    }
    
    // Validate subject
    const trimmedSubject = formData.subject.trim();
    if (trimmedSubject.length < 3) {
      setError('Bitte geben Sie einen Betreff ein (mindestens 3 Zeichen).');
      setIsSubmitting(false);
      return;
    }
    
    // Validate message
    const trimmedMessage = formData.message.trim();
    if (trimmedMessage.length < 10) {
      setError('Bitte geben Sie eine Nachricht ein (mindestens 10 Zeichen).');
      setIsSubmitting(false);
      return;
    }
    
    // Sanitize phone number if provided
    const sanitizedPhone = formData.phone?.trim().replace(/[^0-9+\-\s()]/g, '');

    try {
      if (onSubmit) {
        await onSubmit({
          ...formData,
          name: trimmedName,
          email: trimmedEmail,
          phone: sanitizedPhone,
          subject: trimmedSubject,
          message: trimmedMessage,
        });
      }
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyInterest: '',
      });
    } catch (err) {
      // CRITICAL FIX: Better error message
      const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.';
      setError(`Fehler beim Senden: ${errorMessage} Bitte versuchen Sie es erneut.`);
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced input styles for elderly users
  const inputClasses = cn(
    // Base styles with larger size
    'w-full min-h-[52px] px-5 py-4',
    // Border with better contrast
    'border-2 border-reetdach-300 rounded-lg',
    // Typography - larger text
    'font-body text-lg text-charcoal',
    // Placeholder with sufficient contrast
    'placeholder:text-reetdach-500',
    // Focus states with thick ring
    'focus:border-nordsee-600 focus:ring-4 focus:ring-nordsee-200 focus:outline-none',
    // Transition (respect reduced motion)
    reducedMotion ? '' : 'transition-all duration-200'
  );

  // Label styles - larger and more visible
  const labelClasses = cn(
    'block font-body text-base font-medium text-reetdach-700 mb-3'
  );

  if (isSubmitted) {
    return (
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'bg-white rounded-xl p-10 text-center',
          variant === 'sidebar' && 'shadow-card',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="w-20 h-20 bg-nordsee-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-nordsee-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-3xl text-charcoal mb-4">
          Vielen Dank!
        </h3>
        <p className="font-body text-lg text-reetdach-600 leading-relaxed mb-8">
          Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          size="lg"
        >
          Neue Nachricht senden
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'space-y-8',
        variant === 'sidebar' && 'bg-white rounded-xl p-8 shadow-card',
        className
      )}
      noValidate
    >
      {error && (
        <div 
          role="alert"
          aria-live="assertive"
          className={cn(
            'bg-red-50 border-2 border-red-300 rounded-lg',
            'p-5 text-red-800 font-body text-lg'
          )}
        >
          <span className="font-medium">Fehler: </span>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">(Pflichtfeld)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            className={inputClasses}
            placeholder="Ihr vollständiger Name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-Mail <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">(Pflichtfeld)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            className={inputClasses}
            placeholder="ihre@email.de"
            autoComplete="email"
          />
        </div>
      </div>

      {variant !== 'minimal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Telefon <span className="text-reetdach-400">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+49 123 456789"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="propertyInterest" className={labelClasses}>
              Interesse an <span className="text-reetdach-400">(optional)</span>
            </label>
            <select
              id="propertyInterest"
              name="propertyInterest"
              value={formData.propertyInterest}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Bitte wählen...</option>
              <option value="syltrooms">Sylt Rooms</option>
              <option value="privathomes">Privat Homes</option>
              <option value="longislandhouse">Long Island House</option>
              <option value="auster-appartements">Auster Appartements</option>
              <option value="beach-home">Beach Home</option>
              <option value="all">Alle Unterkünfte</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="subject" className={labelClasses}>
          Betreff <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          aria-required="true"
          className={inputClasses}
          placeholder="Wie können wir Ihnen helfen?"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Nachricht <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-required="true"
          rows={6}
          className={cn(inputClasses, 'min-h-[180px] resize-y')}
          placeholder="Ihre Nachricht an uns..."
        />
      </div>

      {/* Privacy checkbox with large touch target */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            id="privacy"
            required
            aria-required="true"
            aria-describedby="privacy-description"
            className={cn(
              // Large checkbox for elderly users
              'w-6 h-6',
              // Border and colors
              'border-2 border-reetdach-400 rounded',
              'text-nordsee-600',
              // Focus ring
              'focus:ring-4 focus:ring-nordsee-200 focus:ring-offset-2',
              // Cursor
              'cursor-pointer'
            )}
          />
        </div>
        <label 
          htmlFor="privacy" 
          id="privacy-description" 
          className="font-body text-base text-reetdach-700 leading-relaxed cursor-pointer"
        >
          Ich habe die{' '}
          <a 
            href="/datenschutz" 
            className={cn(
              'text-nordsee-600 font-medium underline underline-offset-2',
              'hover:text-nordsee-800',
              'focus:outline-none focus:ring-4 focus:ring-nordsee-200 rounded'
            )}
          >
            Datenschutzerklärung
          </a>{' '}
          gelesen und stimme der Verarbeitung meiner Daten zu.{' '}
          <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">(Pflichtfeld)</span>
        </label>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          isLoading={isSubmitting} 
          size="lg"
          className="w-full md:w-auto min-w-[200px]"
        >
          Nachricht senden
        </Button>
      </div>
    </form>
  );
}
