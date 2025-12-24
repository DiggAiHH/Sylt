'use client';

import React, { useState } from 'react';
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

    try {
      if (onSubmit) {
        await onSubmit(formData);
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
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = cn(
    'w-full px-4 py-3 border border-sand-300 rounded-lg',
    'font-body text-charcoal placeholder:text-reetdach-400',
    'focus:border-nordsee-500 focus:ring-2 focus:ring-nordsee-500/20 focus:outline-none',
    'transition-all duration-200'
  );

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'bg-white rounded-lg p-8 text-center',
          variant === 'sidebar' && 'shadow-card',
          className
        )}
      >
        <div className="w-16 h-16 bg-nordsee-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-nordsee-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-2xl text-charcoal mb-2">
          Vielen Dank!
        </h3>
        <p className="font-body text-reetdach-500">
          Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="ghost"
          className="mt-6"
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
        'space-y-6',
        variant === 'sidebar' && 'bg-white rounded-lg p-6 shadow-card',
        className
      )}
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 font-body text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-body text-sm text-reetdach-500 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="Ihr Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-body text-sm text-reetdach-500 mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="ihre@email.de"
          />
        </div>
      </div>

      {variant !== 'minimal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block font-body text-sm text-reetdach-500 mb-2">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+49 123 456789"
            />
          </div>
          <div>
            <label htmlFor="propertyInterest" className="block font-body text-sm text-reetdach-500 mb-2">
              Interesse an
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
        <label htmlFor="subject" className="block font-body text-sm text-reetdach-500 mb-2">
          Betreff *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder="Wie können wir Ihnen helfen?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-sm text-reetdach-500 mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={cn(inputClasses, 'resize-none')}
          placeholder="Ihre Nachricht an uns..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          required
          aria-describedby="privacy-description"
          className="mt-1 w-4 h-4 border-sand-300 rounded text-nordsee-500 focus:ring-2 focus:ring-nordsee-500 focus:ring-offset-2"
        />
        <label htmlFor="privacy" id="privacy-description" className="font-body text-sm text-reetdach-500">
          Ich habe die{' '}
          <a href="/datenschutz" className="text-nordsee-500 hover:underline focus:outline-none focus:ring-2 focus:ring-nordsee-500 focus:ring-offset-1 rounded">
            Datenschutzerklärung
          </a>{' '}
          gelesen und stimme der Verarbeitung meiner Daten zu. *
        </label>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
        Nachricht senden
      </Button>
    </form>
  );
}
