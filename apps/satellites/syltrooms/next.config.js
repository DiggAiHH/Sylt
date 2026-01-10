/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sylt/ui', '@sylt/booking', '@sylt/config', '@sylt/types'],
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.netlify.app',
      },
    ],
  },
  // API-Proxying wird über netlify.toml [[redirects]] gehandhabt
  // Nicht hier, da localhost in Production nicht funktioniert
};

module.exports = nextConfig;
