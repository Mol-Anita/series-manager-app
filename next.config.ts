import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  experimental: {
    appDir: true, // Ensure Next.js App Router works properly
    disableMiddlewareWarning: true, // Prevent warnings
  },
};