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
    return [
      { source: '/:path*', headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] },
      // Posters are fetched by the social-posting automation from facebook.com / x.com.
      { source: '/posters/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] },
    ];
  },
};

module.exports = nextConfig;
