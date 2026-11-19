export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: 'https://www.scholarnexushub.com/sitemap.xml',
    host: 'https://www.scholarnexushub.com',
  };
}
