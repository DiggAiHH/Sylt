"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-to-Top Button - größer und sichtbarer für Senioren.
 * Erscheint nach 200px Scrollen (früher für bessere UX).
 * Größerer Touch-Target (min. 48x48px) für Barrierefreiheit.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Früher sichtbar werden für bessere UX
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-4 bg-nordsee text-white rounded-2xl shadow-xl hover:bg-nordsee-dark transition-all duration-300 hover:scale-105 min-w-[56px] min-h-[56px] flex items-center justify-center border-2 border-white/30"
      aria-label="Nach oben scrollen"
      title="Zurück nach oben"
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
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
