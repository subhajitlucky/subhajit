import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/writing/kalia',
        destination: '/writing/kalia-build-log',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
