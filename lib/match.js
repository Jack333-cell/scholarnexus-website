// Free, rule-based matching on the site's own scholarship data (no AI service or API key).
import { scholarships } from './data';
import { shortTitle, isClosed, daysLeft, nextDate, sortByDeadline } from './collections';

export const COUNTRY_WORDS = {
  'United Kingdom': ['uk', 'britain', 'england', 'scotland', 'united kingdom', 'london', 'oxford', 'cambridge'],
  'United States': ['usa', 'us', 'u.s', 'america', 'united states', 'american'],
  Canada: ['canada', 'canadian'],
  Germany: ['germany', 'german', 'daad'],
  Netherlands: ['netherlands', 'holland', 'dutch'],
  Sweden: ['sweden', 'swedish'],
  Italy: ['italy', 'italian', 'milan'],
  China: ['china', 'chinese'],
  Japan: ['japan', 'japanese'],
  Australia: ['australia', 'australian'],
  'Costa Rica': ['costa rica'],
  France: ['france', 'french'],
  Switzerland: ['switzerland', 'swiss', 'zurich', 'lausanne'],
  Belgium: ['belgium', 'belgian', 'leuven'],
  Rwanda: ['rwanda', 'kigali'],
  Egypt: ['egypt', 'egyptian', 'cairo', 'alexandria'],
  Mauritius: ['mauritius', 'mauritian'],
  'Hong Kong': ['hong kong', 'hongkong', 'hku', 'cuhk', 'hkust'],
  'Saudi Arabia': ['saudi', 'saudi arabia', 'kaust'],
};
const EUROPE = ['United Kingdom', 'Europe (multiple countries)', 'Sweden', 'Germany', 'Netherlands', 'Italy', 'France', 'Switzerland', 'Belgium'];
const LEVEL_WORDS = {
  masters: ['masters', "master's", 'master', 'msc', 'mba', 'ma', 'llm', 'postgraduate', 'graduate'],
  phd: ['phd', 'doctoral', 'doctorate', 'research degree'],
  undergraduate: ['undergraduate', 'bachelor', "bachelor's", 'bsc', 'degree', 'freshman', 'high school', 'first-year'],
  programs: ['internship', 'intern', 'training', 'bootcamp', 'course', 'program', 'programme', 'leadership', 'summer', 'free'],
};
export const AFRICAN = ['kenya', 'kenyan', 'nigeria', 'nigerian', 'ghana', 'ghanaian', 'uganda', 'ugandan', 'tanzania', 'tanzanian', 'rwanda', 'ethiopia', 'ethiopian', 'south africa', 'zambia', 'zimbabwe', 'malawi', 'cameroon', 'africa', 'african', 'somalia', 'sudan', 'egypt', 'senegal'];
// Listings limited to particular nationalities (checked against the official pages).
const ONLY_FOR = { 'imperial-college-jack-hirst-scholarship-nigeria': ['nigeria', 'nigerian'], 'kra-internship-programme-2027': ['kenya', 'kenyan'], 'kra-pupillage-programme-2027': ['kenya', 'kenyan'] };
const STOP = new Set('closing soon deadline deadlines urgent month this week kenyans nigerians africans ghanaians ugandans a an the for in to of and or with on at by from is are am i me my want need looking scholarship scholarships fully funded study abroad any some please find show give what which who where how can do does best good opportunities opportunity student students international'.split(' '));

const has = (text, w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(text);

export function parseQuery(raw) {
  const t = ' ' + String(raw || '').toLowerCase().replace(/[’']/g, "'") + ' ';
  const levels = Object.keys(LEVEL_WORDS).filter((l) => LEVEL_WORDS[l].some((w) => has(t, w)));
  const countries = Object.keys(COUNTRY_WORDS).filter((c) => COUNTRY_WORDS[c].some((w) => has(t, w)));
  const europe = has(t, 'europe') || has(t, 'european') || has(t, 'erasmus');
  const nationality = AFRICAN.find((w) => has(t, w) || has(t, w + 's')) || null;
  const fullyFunded = /fully[- ]funded|full scholarship|full ride|full funding/.test(t);
  const soon = /closing|deadline soon|urgent|this month|soon/.test(t);
  const known = new Set([...Object.values(LEVEL_WORDS).flat(), ...Object.values(COUNTRY_WORDS).flat(), ...AFRICAN, 'europe', 'european', 'erasmus']);
  const keywords = t.split(/[^a-z0-9+#]+/).filter((w) => (w.length > 2 || w === 'ai') && !STOP.has(w) && !known.has(w)).map((w) => (w === 'ai' ? ' ai' : w));
  return { levels, countries, europe, nationality, fullyFunded, soon, keywords };
}

const blob = (s) => [s.title, s.excerpt, s.description, s.category, s.university, ...(s.requirements || []), ...(s.benefits || [])].join(' ').toLowerCase();

// Returns open listings that fit, best first, each with short reasons.
export function matchScholarships(q, { limit = 6, includeClosed = false } = {}) {
  const out = [];
  for (const s of scholarships) {
    if (!includeClosed && isClosed(s)) continue;
    const only = ONLY_FOR[s.slug];
    if (only && !(q.nationality && only.some((w) => q.nationality.startsWith(w.slice(0, 5))))) continue;
    if (s.africanFocus && q.nationalityOther) continue;
    let score = 0; const reasons = [];
    if (q.levels.length) {
      if (s.levels.some((l) => q.levels.includes(l))) { score += 4; reasons.push(`For ${s.levels.filter((l) => q.levels.includes(l)).map(levelLabel).join(' / ')}`); }
      else continue;
    }
    if (q.countries.length || q.europe) {
      const inCountry = q.countries.includes(s.country);
      const inEurope = q.europe && EUROPE.includes(s.country);
      if (inCountry || inEurope) { score += 3; reasons.push(`Study in ${s.country}`); }
      else continue;
    }
    if (q.fullyFunded) {
      if (s.amount.toLowerCase().startsWith('fully funded') || /full tuition/i.test(s.amount)) { score += 3; reasons.push(s.amount); }
      else score -= 2;
    }
    if (q.nationality && s.africanFocus) { score += 2; reasons.push('Open to African students'); }
    if (q.keywords.length) {
      const b = blob(s);
      const stem = (k) => (k.length > 6 ? k.slice(0, k.length - 2) : k);
      const hits = q.keywords.filter((k) => b.includes(stem(k)));
      score += hits.length * 2;
      if (hits.length) reasons.push(`Mentions ${hits.slice(0, 3).join(', ')}`);
      else if (!q.levels.length && !q.countries.length && !q.europe && !q.fullyFunded) continue;
    }
    const d = daysLeft(nextDate(s));
    if (d !== null && d >= 0) { if (q.soon && d <= 45) score += 3; reasons.push(d === 0 ? 'Closes today' : `${d} days left`); }
    if (!reasons.some((r) => r === s.amount)) reasons.unshift(s.amount);
    out.push({ s, score, reasons });
  }
  out.sort((a, b) => b.score - a.score || (nextDate(a.s) || '9999').localeCompare(nextDate(b.s) || '9999'));
  return out.slice(0, limit);
}

export const levelLabel = (l) => ({ masters: "Master's", phd: 'PhD', undergraduate: 'Undergraduate', programs: 'Programmes' }[l] || l);
export const closingNext = (n = 5) => sortByDeadline(scholarships.filter((s) => s.closeDate && !isClosed(s))).slice(0, n);
export { shortTitle };
