import ScholarNexus from '../components/ScholarNexus';
import { SITE } from '../lib/collections';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': SITE + '/#organization',
      name: 'ScholarNexus',
      url: SITE,
      logo: SITE + '/logo-mark.png',
      email: 'info@scholarnexushub.com',
      founder: { '@type': 'Person', name: 'Jack Odoyo Otieno' },
      sameAs: ['https://x.com/SaharanAfric', 'https://www.facebook.com/profile.php?id=61559343783222'],
    },
    {
      '@type': 'WebSite',
      '@id': SITE + '/#website',
      name: 'ScholarNexus',
      url: SITE,
      description: 'Verified, open scholarship opportunities with official links, plus guidance on applications, CVs and theses.',
      publisher: { '@id': SITE + '/#organization' },
      inLanguage: 'en',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScholarNexus />
    </>
  );
}
