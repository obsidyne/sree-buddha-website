/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    // ✅ Ignore all ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      '13.51.85.192', // For backward compatibility
      'sbce.ac.in'    // Add sbce.ac.in to fix the invalid src prop error
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.51.85.192',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Optionally, add a remote pattern for sbce.ac.in if needed (e.g., for specific paths or ports)
       {
         protocol: 'https',
         hostname: 'sbce.ac.in',
         port: '1337', // If there's a specific port
         pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;