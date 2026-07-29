/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'holicindo.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.holicindo.com', pathname: '/**' },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
