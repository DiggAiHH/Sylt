import React from "react";
import { CONTACT } from "@/lib/constants";

export default function ContactInfo() {
  return (
    <section 
      className="bg-deep-sea-blue-50 border-t border-deep-sea-blue-200 py-12"
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 
          id="contact-section-heading"
          className="text-2xl font-serif text-deep-sea-blue mb-6"
        >
          Kontakt
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              Inhaberin
            </h3>
            <p className="text-deep-sea-blue-700">{CONTACT.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              Anschrift
            </h3>
            <address className="text-deep-sea-blue-700 not-italic">
              {CONTACT.street}<br />
              {CONTACT.zip} {CONTACT.city}
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              Telefon
            </h3>
            <a
              href={`tel:${CONTACT.phone}`}
              className="text-deep-sea-blue-700 hover:text-rich-gold transition-colors"
            >
              {CONTACT.phoneFormatted}
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-2">
              E-Mail
            </h3>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-deep-sea-blue-700 hover:text-rich-gold transition-colors"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
