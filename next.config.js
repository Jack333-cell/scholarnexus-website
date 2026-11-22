/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Encrypted template files are read by the download API only (never served publicly).
  experimental: { outputFileTracingIncludes: { '/api/download': ['./private/**/*'] } },
  async redirects() {
    return [{ source: '/scholarships/mastercard-foundation-earth-university', destination: '/scholarships/earth-university-mastercard-foundation-scholarship', permanent: true }];
  },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] }];
  },
};

module.exports = nextConfig;
