// Applied to every response. The CSP only sets rules that cannot break AdSense, Vercel Analytics or the
// Paystack redirect (no script-src allow-list); tighten it once ads are approved and their domains are known.
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Encrypted template files are read by the download API only (never served publicly).
  outputFileTracingIncludes: { '/api/download': ['./private/**/*'] },
  async redirects() {
    return [{ source: '/scholarships/mastercard-foundation-earth-university', destination: '/scholarships/earth-university-mastercard-foundation-scholarship', permanent: true }];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Posters are fetched by the social-posting automation from facebook.com / x.com.
      { source: '/posters/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] },
    ];
  },
};

module.exports = nextConfig;
