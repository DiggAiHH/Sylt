import React from "react";
import Link from "next/link";

const brands = [
  { name: "BLUM", href: "/" },
  { name: "Fisch Blum Sylt", href: "/fisch-blum-sylt" },
  { name: "Blum's Seafood Sylt", href: "/blums-seafood-sylt" },
  { name: "Sylt Homes by Blum", href: "/sylt-homes-by-blum" },
  { name: "Long Island House Sylt", href: "/long-island-house-sylt" },
];

export default function Navigation() {
  return (
    <nav className="bg-deep-sea-blue text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-rich-gold hover:text-rich-gold-300 transition-colors"
          >
            BLUM
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {brands.slice(1).map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="hover:text-rich-gold transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
