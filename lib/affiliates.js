// Affiliate links (Impact). Deep links send the visitor to a specific Udemy page.
export const UDEMY_BASE = 'https://trk.udemy.com/c/8291344/3193860/39854';
export const udemyLink = (url) => (url ? `${UDEMY_BASE}?u=${encodeURIComponent(url)}` : UDEMY_BASE);
const search = (q) => udemyLink(`https://www.udemy.com/courses/search/?q=${encodeURIComponent(q)}`);

export const COURSE_GROUPS = [
  {
    title: 'Get ready to apply',
    blurb: 'Pass the language test and write a stronger application.',
    items: [
      { name: 'IELTS preparation', why: 'Most UK, Australian and European scholarships ask for IELTS.', q: 'IELTS preparation' },
      { name: 'TOEFL preparation', why: 'Needed for many US and Canadian programmes.', q: 'TOEFL' },
      { name: 'Duolingo English Test', why: 'A cheaper, at-home test accepted by many universities.', q: 'Duolingo English Test' },
      { name: 'GRE preparation', why: 'Asked for by many US Master’s and PhD programmes.', q: 'GRE preparation' },
      { name: 'Academic and essay writing', why: 'Write clearer SOPs, motivation letters and essays.', q: 'academic writing' },
    ],
  },
  {
    title: 'Research and Master’s/PhD skills',
    blurb: 'Skills supervisors and scholarship panels look for.',
    items: [
      { name: 'Research methods', why: 'Plan a research proposal with confidence.', q: 'research methodology' },
      { name: 'Writing a research proposal', why: 'Key for PhD and research scholarships.', q: 'research proposal writing' },
      { name: 'Statistics with SPSS', why: 'Analyse thesis data the way most departments expect.', q: 'SPSS statistics' },
      { name: 'R for data analysis', why: 'Free software widely used in research.', q: 'R programming data analysis' },
      { name: 'Reference management (Zotero, Mendeley)', why: 'Save hours on citations.', q: 'Zotero Mendeley' },
    ],
  },
  {
    title: 'Career and online work skills',
    blurb: 'In-demand skills for jobs, remote work and STEM scholarships.',
    items: [
      { name: 'Python programming', why: 'The most useful first coding language.', q: 'Python for beginners' },
      { name: 'Data analysis and Excel', why: 'Valuable in almost every job.', q: 'data analysis Excel' },
      { name: 'AI and machine learning', why: 'Fast-growing field with many funded programmes.', q: 'machine learning' },
      { name: 'Digital marketing', why: 'A practical skill for freelance and online work.', q: 'digital marketing' },
      { name: 'Project management', why: 'Boosts your CV for leadership scholarships.', q: 'project management' },
    ],
  },
].map((g) => ({ ...g, items: g.items.map((i) => ({ ...i, url: search(i.q) })) }));

// Preply Learners (Impact). $50 per subscription, 70% of new trial lessons.
export const PREPLY_BASE = 'https://preply.sjv.io/c/8291344/1987575/24422';
export const preplyLink = (url) => (url ? `${PREPLY_BASE}?u=${encodeURIComponent(url)}` : PREPLY_BASE);

export const TUTORS = [
  { name: 'English and IELTS tutors', why: 'One-to-one practice for IELTS, TOEFL, Duolingo and scholarship interviews.', url: preplyLink('https://preply.com/en/online/english-tutors') },
  { name: 'German tutors', why: 'For DAAD and other German scholarships, and life in Germany.', url: preplyLink('https://preply.com/en/online/german-tutors') },
  { name: 'French tutors', why: 'For Eiffel, Erasmus Mundus and study in France or Canada.', url: preplyLink('https://preply.com/en/online/french-tutors') },
  { name: 'Maths tutors', why: 'Get ready for GRE/GMAT quantitative sections.', url: preplyLink('https://preply.com/en/online/math-tutors') },
];

// "Prepare for this scholarship" picks shown on every scholarship page.
const LANG = {
  english: { name: 'English & IELTS tutor', why: 'Practise speaking for IELTS, TOEFL and interviews 1-on-1.', page: 'english-tutors' },
  german: { name: 'German tutor', why: 'Learn German before you arrive in Germany.', page: 'german-tutors' },
  french: { name: 'French tutor', why: 'Build your French for study and life abroad.', page: 'french-tutors' },
  spanish: { name: 'Spanish tutor', why: 'Costa Rica is Spanish-speaking: start learning before you travel.', page: 'spanish-tutors' },
};
const tutor = (k) => ({ ...LANG[k], src: 'Preply', url: preplyLink(`https://preply.com/en/online/${LANG[k].page}`) });
const course = (q) => ({ name: q.replace(/\b\w/g, (c) => c.toUpperCase()) + ' courses', why: 'Short, low-cost online courses with a certificate for your CV.', src: 'Udemy', url: udemyLink(`https://www.udemy.com/courses/search/?q=${encodeURIComponent(q)}`) });

export function prepFor(s) {
  const keys = s.prep || (() => {
    const c = s.country || '';
    const lang = /Germany/.test(c) ? 'german' : /France/.test(c) ? 'french' : 'english';
    const pg = s.levels.some((l) => l === 'masters' || l === 'phd');
    return [lang, pg ? 'udemy:research proposal writing' : 'udemy:IELTS preparation', 'udemy:academic writing'];
  })();
  return keys.map((k) => (k.startsWith('udemy:') ? course(k.slice(6)) : tutor(k)));
}
