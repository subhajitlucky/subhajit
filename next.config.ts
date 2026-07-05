import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'subhajitlucky.vercel.app',
          },
        ],
        destination: 'https://subhajitpradhan.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'subhajitxyz.vercel.app',
          },
        ],
        destination: 'https://subhajitpradhan.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
