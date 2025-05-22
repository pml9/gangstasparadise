import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

// Conditionally apply code coverage instrumentation in development mode
const enableInstrumentation = process.env.NODE_ENV === 'development' || process.env.COVERAGE === 'true';

const nextConfig: NextConfig = {
  transpilePackages: ['msw'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Enable instrumentation for code coverage in development
    clientInstrumentationHook: enableInstrumentation,
  },
};

// Add bundle analyzer when explicitly requested
const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzerConfig(nextConfig);
