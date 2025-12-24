/**
 * Next.js Konfiguration mit Security Headers.
 * Implementiert Best Practices für Webseiten-Sicherheit.
 */

import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Verhindert Clickjacking-Angriffe
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Verhindert MIME-Type Sniffing
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Aktiviert XSS-Filter im Browser
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // Kontrolliert Referrer-Informationen
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Berechtigungsrichtlinien
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // Strict Mode für bessere Entwicklungserfahrung
  reactStrictMode: true,

  /**
   * Security Headers für alle Routen.
   * X-Frame-Options: DENY ist beabsichtigt, da diese Website keine
   * eingebetteten Widgets oder iframes benötigt. Bei Bedarf können
   * spezifische Routen mit anderen Policies hinzugefügt werden.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Bildoptimierung Konfiguration
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
