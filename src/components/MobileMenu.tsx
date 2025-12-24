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
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-reetdach hover:text-nordsee transition-colors"
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
            {/* Header */}
            <div className="flex justify-between items-center h-20 px-4 border-b border-sand-dark/20">
              <Link
                href="/"
                className="text-2xl font-light tracking-widest text-nordsee"
                onClick={() => setIsOpen(false)}
              >
                BLUM
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-reetdach hover:text-nordsee transition-colors"
                aria-label="Menü schließen"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow flex flex-col justify-center px-8" aria-label="Hauptnavigation">
              <ul className="space-y-6">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-light text-reetdach-dark hover:text-nordsee transition-colors block py-2"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="px-8 py-8 bg-sand-light border-t border-sand-dark/20">
              <p className="text-sm text-reetdach-light mb-2">Kontakt</p>
              <p className="font-medium text-nordsee-dark">Martina Blum</p>
              <p className="text-reetdach text-sm">0172-4008846</p>
              <p className="text-reetdach text-sm">blumsylt@web.de</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
