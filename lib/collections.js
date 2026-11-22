import { scholarships } from './data';

export const SITE = 'https://www.scholarnexushub.com';

// "Gates Cambridge Scholarship 2027/28 | Fully Funded (UK)" -> "Gates Cambridge Scholarship 2027/28"
export const shortTitle = (s) => s.title.split('|')[0].trim();

export const getBySlug = (slug) => scholarships.find((s) => s.slug === slug);

// Dates are compared in East Africa Time so a deadline counts as open through its whole day.
export const todayISO = () =>
  new Date(Date.now() + 3 * 3600 * 1000).toISOString().slice(0, 10);

export const daysLeft = (iso) => {
  if (!iso) return null;
  const ms = new Date(iso + 'T00:00:00Z') - new Date(todayISO() + 'T00:00:00Z');
  return Math.round(ms / 86400000);
};

export const isClosed = (s) => s.closeDate !== null && daysLeft(s.lastDate || s.closeDate) < 0;

// Next deadline still ahead (the first one, or the final one once the first has passed).
export const nextDate = (s) => (s.closeDate && daysLeft(s.closeDate) < 0 && s.lastDate ? s.lastDate : s.closeDate);

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const monthName = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Open items first, ordered by nearest deadline; rolling/varies after; closed last.
export const sortByDeadline = (list) =>
  [...list].sort((a, b) => {
    const rank = (s) => (isClosed(s) ? 2 : s.closeDate ? 0 : 1);
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    if (a.closeDate && b.closeDate) return nextDate(a).localeCompare(nextDate(b));
    return a.id - b.id;
  });

const EUROPE = ['United Kingdom', 'Europe (multiple countries)', 'Sweden', 'Germany', 'Netherlands', 'Italy', 'Switzerland'];

export const countries = [
  { slug: 'united-kingdom', name: 'the UK', match: ['United Kingdom'] },
  { slug: 'united-states', name: 'the USA', match: ['United States'] },
  { slug: 'canada', name: 'Canada', match: ['Canada'] },
  { slug: 'germany', name: 'Germany', match: ['Germany'] },
  { slug: 'netherlands', name: 'the Netherlands', match: ['Netherlands'] },
  { slug: 'sweden', name: 'Sweden', match: ['Sweden'] },
  { slug: 'italy', name: 'Italy', match: ['Italy'] },
  { slug: 'china', name: 'China', match: ['China'] },
  { slug: 'japan', name: 'Japan', match: ['Japan'] },
  { slug: 'australia', name: 'Australia', match: ['Australia'] },
  { slug: 'switzerland', name: 'Switzerland', match: ['Switzerland'] },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', match: ['Saudi Arabia'] },
  { slug: 'europe', name: 'Europe', match: EUROPE },
].map((c) => ({
  ...c,
  path: `/scholarships/country/${c.slug}`,
  heading: `Scholarships in ${c.name} for International Students`,
  title: `Scholarships in ${c.name} for International Students 2027`,
  description: `Verified scholarships to study in ${c.name}, with eligibility, benefits, deadlines and official application links. Updated regularly by ScholarNexus.`,
  items: () => sortByDeadline(scholarships.filter((s) => c.match.includes(s.country))),
}));

export const levels = [
  { slug: 'masters', label: 'Masters', heading: "Master's Scholarships for International Students" },
  { slug: 'phd', label: 'PhD', heading: 'PhD Scholarships for International Students' },
  { slug: 'undergraduate', label: 'Undergraduate', heading: 'Undergraduate Scholarships for International Students' },
  { slug: 'programs', label: 'Leadership & Internships', heading: 'Internships, Leadership & Youth Programmes' },
].map((l) => ({
  ...l,
  path: `/scholarships/level/${l.slug}`,
  title: `${l.heading} 2027`,
  description: `Open ${l.label.toLowerCase()} opportunities with eligibility, funding, deadlines and official links — verified by ScholarNexus.`,
  items: () => sortByDeadline(scholarships.filter((s) => s.levels.includes(l.slug))),
}));

export const fullyFunded = {
  path: '/scholarships/fully-funded',
  heading: 'Fully Funded Scholarships for International Students',
  title: 'Fully Funded Scholarships for International Students 2027',
  description: 'Fully funded scholarships covering tuition and living costs — Masters, PhD and undergraduate — with deadlines and official links, verified by ScholarNexus.',
  intro: 'These awards cover tuition and living costs (the exact package varies by scholarship — check the "What you get" list on each page).',
  items: () => sortByDeadline(scholarships.filter((s) => s.amount.startsWith('Fully Funded'))),
};

export const forAfrican = {
  path: '/scholarships/for-african-students',
  heading: 'Scholarships and Opportunities for African Students',
  title: 'Scholarships for African Students 2027',
  description: 'Scholarships, leadership programmes and student offers open specifically to African students — verified, with deadlines and official links.',
  intro: 'Opportunities reserved for, or with dedicated places for, students from African countries.',
  items: () => sortByDeadline(scholarships.filter((s) => s.africanFocus)),
};

// Open listings Kenyan citizens can apply for. Excludes awards restricted to other nationalities
// and ones whose 2027 country list we could not confirm includes Kenya.
const NOT_FOR_KENYA = ['imperial-college-jack-hirst-scholarship-nigeria', 'swedish-institute-scholarships-global-professionals'];
const isFull = (s) => /fully funded|full ride|full tuition|full fees/i.test(s.amount + ' ' + s.title);
export const forKenyan = {
  path: '/scholarships/for-kenyan-students',
  heading: 'Fully Funded Scholarships for Kenyan Students 2027',
  title: 'Fully Funded Scholarships for Kenyan Students 2027 (Open Now)',
  description: 'Open scholarships Kenyan students can apply for in 2027: fully funded Masters, PhD and undergraduate awards abroad, with the money you get, deadlines and official links.',
  intro: 'Scholarships open to Kenyan citizens right now, fully funded awards first, then partial awards and free programmes. Every listing shows what it pays and links to the official application page.',
  tips: [
    'Get your KCSE certificate, degree transcripts and passport ready early. Many universities need certified copies, and a passport can take weeks.',
    'Most awards in English-speaking countries and Europe ask for IELTS or TOEFL. Some universities accept a letter saying your degree was taught in English, so check before you pay for a test.',
    'Fully funded awards for Africans (Mastercard Foundation, Wageningen, EARTH) look for leadership and plans to return and contribute in Kenya. Show this clearly in your motivation letter.',
    'Never pay anyone to "secure" a scholarship. Real scholarships are free to apply for on the official website.',
  ],
  items: () => {
    const open = scholarships.filter((s) => !isClosed(s) && !NOT_FOR_KENYA.includes(s.slug));
    return [...sortByDeadline(open.filter(isFull)), ...sortByDeadline(open.filter((s) => !isFull(s)))];
  },
};

// Built at request time (page revalidates hourly) so the months in the title stay current.
export const closingSoon = () => {
  const open = scholarships
    .filter((s) => s.closeDate && !isClosed(s))
    .sort((a, b) => nextDate(a).localeCompare(nextDate(b)));
  const months = [...new Set(open.slice(0, 6).map((s) => monthName(nextDate(s))))].slice(0, 2);
  const when = months.length ? ` (${months.join(' & ')})` : '';
  return {
    path: '/scholarships/closing-soon',
    heading: 'Scholarships Closing Soon',
    title: `Scholarships Closing Soon${when}`,
    description: `Scholarship deadlines coming up${when ? ' in ' + months.join(' and ') : ''}: verified opportunities sorted by nearest deadline, with official application links.`,
    intro: 'Sorted by nearest deadline. Always confirm the exact date and time zone on the official page before you submit.',
    items: () => open,
  };
};

export const allCollections = () => [
  closingSoon(),
  fullyFunded,
  forAfrican,
  forKenyan,
  ...levels,
  ...countries.filter((c) => c.items().length > 0),
];
