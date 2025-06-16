import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.codebasics.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.codebasics.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;