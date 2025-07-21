import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'ia.media-imdb.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'img.omdbapi.com',
        port: '',
        pathname: '/**',
      },
      // Allow any HTTPS image source as a fallback
      // You can be more specific based on the domains you encounter
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
