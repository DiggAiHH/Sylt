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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // Proxy to Hub
      },
    ];
  },
};

module.exports = nextConfig;
