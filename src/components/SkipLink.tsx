/**
 * SkipLink Component
 * Provides keyboard-only skip navigation for accessibility (WCAG 2.1)
 * Allows screen reader users to skip repetitive navigation content
 */

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-rich-gold focus:text-deep-sea-blue focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none"
    >
      Zum Hauptinhalt springen
    </a>
  );
}
