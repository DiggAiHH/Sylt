'use client';

/**
 * Print Button Component
 * Client component for print functionality
 */
export default function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };
  
  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center px-6 py-3 bg-rich-gold text-deep-sea-blue rounded-xl hover:bg-rich-gold transition-colors font-semibold"
      aria-label="Rezept drucken"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Rezept drucken
    </button>
  );
}
