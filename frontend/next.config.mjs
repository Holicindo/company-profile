/** @type {import('next').NextConfig} */
const backendBase =
  process.env.BACKEND_URL ||
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production' ? 'http://52.64.193.232:3011' : 'http://localhost:3011');

const cleanBackend = backendBase.replace(/\/+$/, '').replace(/\/api$/, '');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'holicindo.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.holicindo.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.amplifyapp.com', pathname: '/**' },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${cleanBackend}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${cleanBackend}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
