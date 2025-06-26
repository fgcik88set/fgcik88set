import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
