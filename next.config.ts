import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's1.pclncdn.com' ,

      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mobileimg.pclncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.pclncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },

    ],
  },
};

export default nextConfig;
