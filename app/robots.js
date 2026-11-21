export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/tools/listing-helper', '/pay/'] }],
    sitemap: 'https://www.scholarnexushub.com/sitemap.xml',
    host: 'https://www.scholarnexushub.com',
  };
}
