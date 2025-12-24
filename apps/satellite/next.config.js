/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@blumsylt/shared', '@blumsylt/ui'],
  experimental: {
    optimizePackageImports: ['@blumsylt/ui', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.blumsylthotels.de',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
