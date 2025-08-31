import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for Firebase hosting
  // basePath: process.env.NODE_ENV === 'production' ? '/home-manager' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/home-manager/' : '',
};

export default nextConfig;
