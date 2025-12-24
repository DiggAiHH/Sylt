import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-deep-sea-blue text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-rich-gold mb-4">
              BLUM Marken
            </h3>
            <p className="text-deep-sea-blue-200 text-sm">
              Premium Marken aus Sylt - Fisch-Spezialitäten, Ferienhäuser und mehr.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Untermarken</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fisch-blum-sylt" className="hover:text-rich-gold transition-colors">
                  Fisch Blum Sylt
                </Link>
              </li>
              <li>
                <Link href="/blums-seafood-sylt" className="hover:text-rich-gold transition-colors">
                  Blum&apos;s Seafood Sylt
                </Link>
              </li>
              <li>
                <Link href="/sylt-homes-by-blum" className="hover:text-rich-gold transition-colors">
                  Sylt Homes by Blum
                </Link>
              </li>
              <li>
                <Link href="/long-island-house-sylt" className="hover:text-rich-gold transition-colors">
                  Long Island House Sylt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="text-sm not-italic text-deep-sea-blue-200">
              Martina Blum<br />
              Eidumweg 13<br />
              25980 Sylt<br />
              <a href="tel:+491724008846" className="hover:text-rich-gold transition-colors">
                0172-4008846
              </a>
              <br />
              <a href="mailto:blumsylt@web.de" className="hover:text-rich-gold transition-colors">
                blumsylt@web.de
              </a>
            </address>
          </div>
        </div>
        <div className="border-t border-deep-sea-blue-700 mt-8 pt-8 text-center text-sm text-deep-sea-blue-300">
          <p>&copy; {new Date().getFullYear()} BLUM - Alle Rechte vorbehalten</p>
          <p className="mt-2">DPMA-konformer Markenauftritt</p>
        </div>
      </div>
    </footer>
  );
}
