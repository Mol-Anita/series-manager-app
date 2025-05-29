/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Disable source maps in development
  productionBrowserSourceMaps: false,
  // Configure the development server
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // Configure Turbopack
  experimental: {
    turbo: {
      rules: {
        // Add any Turbopack-specific rules here if needed
      },
    },
  },
  images: {
    domains: ['localhost'], // or your actual API domain if not localhost
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 