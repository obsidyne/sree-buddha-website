/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      '13.51.85.192',
      'sbce.ac.in'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.51.85.192',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sbce.ac.in',
        port: '1337',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;