import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize package imports for faster bundle sizes
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-icons'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    // Enable image optimization with modern formats
    formats: ['image/avif', 'image/webp'],
    // Set minimum cache TTL to 1 year for better performance
    minimumCacheTTL: 31536000,
    // Remove unoptimized flag to enable optimization
    unoptimized: false,
  },

  // Enable React compiler optimizations in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
