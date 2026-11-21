/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Encrypted template files are read by the download API only (never served publicly).
  experimental: { outputFileTracingIncludes: { '/api/download': ['./private/**/*'] } },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] }];
  },
};

module.exports = nextConfig;
