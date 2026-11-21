// Compact facts the AI may use. It must answer only from these.
import { scholarships } from './data';
import { isClosed, nextDate, daysLeft, shortTitle } from './collections';
import { PRICE_GROUPS, TEMPLATES, TEMPLATE_BUNDLE, CV_POLISH } from './pricing';

export const openListings = () => scholarships.filter((s) => !isClosed(s));
export const listingFacts = (list = openListings()) =>
  list.map((s) => {
    const d = daysLeft(nextDate(s));
    return `${s.slug} | ${shortTitle(s)} | levels: ${s.levels.join('/')} | ${s.country} | funding: ${s.amount} | deadline: ${s.deadline}${d !== null && d >= 0 ? ` (${d} days left)` : ''}${s.africanFocus ? ' | for African students' : ''} | ${s.excerpt}`;
  }).join('\n');

export const priceFacts = () => [
  ...PRICE_GROUPS.flatMap((g) => g.items.map((i) => `${i.name}: ${i.from ? 'from ' : ''}KES ${i.kes} ($${i.usd})`)),
  ...TEMPLATES.map((t) => `${t.title} template: KES ${t.kes}`),
  `${TEMPLATE_BUNDLE.title}: KES ${TEMPLATE_BUNDLE.kes}`,
  `${CV_POLISH.title}: KES ${CV_POLISH.kes}`,
].join('\n');

export const LINKS = {
  '/scholarships': 'All scholarships', '/scholarships/closing-soon': 'Closing soon', '/scholarships/fully-funded': 'Fully funded',
  '/scholarships/for-african-students': 'For African students', '/pricing': 'Prices', '/templates': 'Templates',
  '/tools/cv-polisher': 'AI CV polisher', '/tools/writing-checker': 'AI SOP checker', '/tools/matcher': 'AI scholarship matcher',
  'https://wa.me/254754835544': 'WhatsApp us',
};
