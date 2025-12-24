"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavigationItem[];
}

/**
 * Mobile Menu - optimiert für Senioren mit größeren Touch-Targets.
 * Mindestens 48x48px für alle interaktiven Elemente.
 */
export default function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button - größer für bessere Touch-Bedienung */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-reetdach-dark hover:text-nordsee transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg hover:bg-sand-light"
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex flex-col h-full">
            {/* Header - größer */}
            <div className="flex justify-between items-center h-24 px-6 border-b-2 border-sand-dark/30">
              <Link
                href="/"
                className="text-3xl font-medium tracking-widest text-nordsee py-2"
                onClick={() => setIsOpen(false)}
              >
                BLUM
              </Link>
              {/* Schließen Button - größer */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 text-reetdach-dark hover:text-nordsee transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg hover:bg-sand-light"
                aria-label="Menü schließen"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links - größere Schrift und mehr Padding */}
            <nav className="flex-grow flex flex-col justify-center px-6" aria-label="Hauptnavigation">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-medium text-reetdach-dark hover:text-nordsee hover:bg-sand-light transition-colors block py-4 px-4 rounded-xl"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info - größer und prominenter */}
            <div className="px-6 py-8 bg-sand-light border-t-2 border-sand-dark/30">
              <p className="text-base text-reetdach mb-3 font-medium">Kontakt</p>
              <p className="font-semibold text-nordsee-dark text-xl mb-3">Martina Blum</p>
              {/* Telefonnummer als klickbarer Button */}
              <a 
                href="tel:+4917240088846"
                className="flex items-center gap-3 bg-nordsee text-white px-5 py-4 rounded-xl text-lg font-semibold mb-3 hover:bg-nordsee-dark transition-colors"
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Anrufen: 0172-4008846
              </a>
              <a 
                href="mailto:blumsylt@web.de"
                className="flex items-center gap-3 text-nordsee text-lg hover:underline underline-offset-4"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                blumsylt@web.de
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
