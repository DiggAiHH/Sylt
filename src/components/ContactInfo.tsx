import React from "react";
import { CONTACT } from "@/lib/constants";

export default function ContactInfo() {
  return (
    <section 
      className="bg-deep-sea-blue-50 border-t border-deep-sea-blue-200 py-16"
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Larger heading for better visibility */}
        <h2 
          id="contact-section-heading"
          className="text-3xl md:text-4xl font-serif text-deep-sea-blue mb-10"
        >
          Kontakt
        </h2>
        {/* Better spacing and larger text */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-deep-sea-blue mb-3">
              Inhaberin
            </h3>
            <p className="text-deep-sea-blue-700 text-lg">{CONTACT.name}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-deep-sea-blue mb-3">
              Anschrift
            </h3>
            <address className="text-deep-sea-blue-700 not-italic text-lg leading-relaxed">
              {CONTACT.street}<br />
              {CONTACT.zip} {CONTACT.city}
            </address>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-deep-sea-blue mb-3">
              Telefon
            </h3>
            {/* Larger, underlined link for better visibility and accessibility */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="text-deep-sea-blue-700 hover:text-rich-gold transition-colors text-lg underline underline-offset-4 decoration-2 py-2 inline-block min-h-[48px] focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 rounded"
            >
              {CONTACT.phoneFormatted}
            </a>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-deep-sea-blue mb-3">
              E-Mail
            </h3>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-deep-sea-blue-700 hover:text-rich-gold transition-colors text-lg underline underline-offset-4 decoration-2 py-2 inline-block min-h-[48px] focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 rounded"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
