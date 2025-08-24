import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback, 
      fs: false,
      net: false,
      tls: false,
      dns: false
    };
    return config;
  },
  experimental: {
  },
  // Transpile ESM packages for reliable bundling in production
  transpilePackages: [
    'sanity',
    'next-sanity'
  ],
};

export default nextConfig;
