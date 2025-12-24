/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sylt/ui', '@sylt/booking', '@sylt/config', '@sylt/types'],
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
