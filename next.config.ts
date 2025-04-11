import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'illinois-state-dm-s3.imgix.net',
        port: '',
        search: '',
      },
    ],
  },
}

export default nextConfig;
