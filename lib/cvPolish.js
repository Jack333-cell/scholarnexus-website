// Rule-based CV polisher (no AI service). It restructures a pasted CV into standard sections,
// rewrites weak phrases into action verbs, tidies dates and punctuation, and removes personal
// details that international applications should not include. Every change is listed.

const SECTIONS = [
  ['Profile', /^(profile|professional profile|personal profile|summary|professional summary|career summary|career objective|objective|about me)$/],
  ['Education', /^(education|educational background|academic background|academic qualifications|qualifications|education and training)$/],
  ['Experience', /^(experience|work experience|professional experience|employment|employment history|work history|career history|relevant experience)$/],
  ['Research Experience', /^(research|research experience|research projects|projects|academic projects|project)$/],
  ['Publications and Presentations', /^(publications|publications and presentations|presentations|conferences|papers)$/],
  ['Skills', /^(skills|key skills|technical skills|core skills|competencies|core competencies|skills and competencies|computer skills|soft skills)$/],
  ['Certifications and Training', /^(certifications|certificates|training|courses|certifications and training|professional development|short courses)$/],
  ['Awards and Honours', /^(awards|honours|honors|awards and honours|awards and honors|achievements|scholarships and awards)$/],
  ['Leadership and Volunteering', /^(leadership|volunteering|volunteer experience|leadership and volunteering|extracurricular activities|activities|community service|positions of responsibility)$/],
  ['Languages', /^(languages|language skills)$/],
  ['Referees', /^(referees|references|reference)$/],
  ['Interests', /^(interests|hobbies|hobbies and interests)$/],
  ['_personal', /^(personal details|personal information|personal data|bio data|biodata|personal particulars)$/],
];
const ORDER = ['Profile', 'Education', 'Research Experience', 'Experience', 'Publications and Presentations', 'Skills', 'Certifications and Training', 'Awards and Honours', 'Leadership and Volunteering', 'Languages', 'Interests', 'Referees', 'Other'];

const PERSONAL = /^(marital status|date of birth|d\.?o\.?b\.?|birth ?date|age|religion|tribe|ethnicity|id (no|number)|national id|id card|passport (no|number)|gender|sex|health( status)?|next of kin|number of children|height|weight|father'?s name|mother'?s name)\b/i;

const IRREGULAR = { leading: 'led', writing: 'wrote', teaching: 'taught', running: 'ran', making: 'made', building: 'built', keeping: 'kept', taking: 'took', giving: 'gave', getting: 'got', holding: 'held', speaking: 'spoke', winning: 'won', setting: 'set', putting: 'put', selling: 'sold', buying: 'bought', bringing: 'brought', thinking: 'thought', meeting: 'met', sending: 'sent', spending: 'spent', drawing: 'drew', overseeing: 'oversaw', undertaking: 'undertook', choosing: 'chose', planning: 'planned', shipping: 'shipped', mapping: 'mapped', tutoring: 'tutored', auditing: 'audited', editing: 'edited' };
// Gerund stems whose verb ends in a silent "e" (manag-ing -> managed).
const E_STEMS = /(manag|organis|organiz|coordinat|facilitat|supervis|prepar|analys|analyz|evaluat|creat|generat|validat|calculat|operat|translat|negotiat|initiat|investigat|educat|advis|compil|produc|reduc|introduc|serv|resolv|improv|achiev|receiv|schedul|handl|ensur|captur|stor|measur|secur|updat|integrat|automat|demonstrat|illustrat|motivat|rais|revis|summaris|summariz|utilis|utiliz|maximis|maximiz|minimis|minimiz|standardis|standardiz|prioritis|prioritiz|mobilis|mobiliz|sensitis|sensitiz|guid|provid|decid|engag|arrang|chang|purchas|releas|increas|decreas|diagnos|dispens|issu|pursu|continu|valu|cod|hous|clos|propos|enabl|assembl|sampl|scal|stat|financ|balanc|advanc|influenc|experienc|practis|exercis|merg|emerg|acquir|requir|inspir|examin|determin|combin|outlin|defin|refin|streamlin|pipelin|us|car|shar|compar|declar|explor|restor|scor|desir|retir|hir|fir|wir)$/;
const pastOf = (ing) => {
  const w = ing.toLowerCase();
  if (IRREGULAR[w]) return IRREGULAR[w];
  const stem = w.replace(/ing$/, '');
  if (E_STEMS.test(stem)) return stem + 'ed';
  if (/[^aeiou]y$/.test(stem)) return stem.slice(0, -1) + 'ied';
  return stem + 'ed';
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const WEAK = [
  [/^(i\s+was\s+|was\s+)?responsible\s+for\s+(the\s+)?([a-z]+ing)\b\s*/i, (m, a, b, v) => cap(pastOf(v)) + ' ', 'Replaced "responsible for" with an action verb'],
  [/^(i\s+was\s+|was\s+)?responsible\s+for\s+/i, () => 'Managed ', 'Replaced "responsible for" with an action verb'],
  [/^(duties|tasks|responsibilities)\s+(included|include|were)\s*:?\s*/i, () => '', 'Removed "duties included"'],
  [/^(i\s+was\s+)?in\s+charge\s+of\s+(the\s+)?([a-z]+ing)\b\s*/i, (m, a, b, v) => cap(pastOf(v)) + ' ', 'Replaced "in charge of" with an action verb'],
  [/^(i\s+was\s+)?in\s+charge\s+of\s+/i, () => 'Led ', 'Replaced "in charge of" with "Led"'],
  [/^(i\s+)?worked\s+on\s+/i, () => 'Contributed to ', 'Replaced "worked on" with "Contributed to"'],
  [/^(i\s+)?helped\s+(with|in)\s+/i, () => 'Supported ', 'Replaced "helped with" with "Supported"'],
  [/^(i\s+was\s+|was\s+)?involved\s+in\s+(the\s+)?([a-z]+ing)\b\s*/i, (m, a, b, v) => cap(pastOf(v)) + ' ', 'Replaced "involved in" with an action verb'],
  [/^(i\s+was\s+|was\s+)?involved\s+in\s+/i, () => 'Contributed to ', 'Replaced "involved in" with "Contributed to"'],
  [/^(i\s+)?did\s+/i, () => 'Performed ', 'Replaced "did" with "Performed"'],
  [/^(i\s+)?(have\s+|had\s+)/i, () => '', 'Removed first person ("I have")'],
  [/^i\s+([a-z]+ed)\b/i, (m, v) => cap(v), 'Removed first person ("I")'],
  [/^i\s+am\s+/i, () => '', 'Removed first person ("I am")'],
];

const MONTHS = { jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', may: 'May', jun: 'Jun', jul: 'Jul', aug: 'Aug', sep: 'Sep', sept: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Dec' };
function tidyDates(s) {
  let out = s.replace(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s*,?\s*((?:19|20)\d{2})\b/gi, (m, mo, y) => `${MONTHS[mo.toLowerCase().slice(0, mo.toLowerCase().startsWith('sept') ? 4 : 3)] || cap(mo.slice(0, 3))} ${y}`);
  out = out.replace(/\b((?:[A-Z][a-z]{2} )?(?:19|20)\d{2})\s*(?:-|–|—|to|till|until)\s*((?:[A-Z][a-z]{2} )?(?:19|20)\d{2}|present|current|date|now|ongoing)\b/gi, (m, a, b) => `${a} – ${/present|current|date|now|ongoing/i.test(b) ? 'Present' : b}`);
  return out;
}
function tidy(s) {
  return s.replace(/\s{2,}(?=(?:\(?[A-Z][a-z]{2,8}\.? )?(?:19|20)\d{2})/g, ' | ').replace(/\s+/g, ' ').replace(/\s+([,.;:])/g, '$1').replace(/([,;:])(?=[^\s\d/])/g, '$1 ').replace(/(\D),(?=\d)/g, '$1, ').replace(/: \/\//g, '://').replace(/\.{2,}$/, '.').replace(/ ,/g, ',').trim();
}

const EMAIL = /[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}/i;
const PHONE = /(\+?\d[\d\s()-]{7,}\d)/;
const isHeading = (line) => {
  const clean = line.replace(/[:\-–—_=*#|]+$/g, '').replace(/^[#*\s]+/, '').trim().toLowerCase();
  if (clean.length > 40) return null;
  for (const [name, re] of SECTIONS) if (re.test(clean)) return name;
  return null;
};
const BULLET = /^\s*([-*•·▪◦●o»>]|\d{1,2}[.)])\s+/;

export function polishCV(raw) {
  const changes = new Set();
  const removed = [];
  const lines = String(raw || '').replace(/\r/g, '').split('\n').map((l) => l.replace(/\t/g, ' ').trimEnd());
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;

  // Header: name and contact details from the top lines, until the first section heading.
  let name = (lines[i] || '').trim();
  if (isHeading(name) || EMAIL.test(name) || name.length > 60) name = '';
  else i++;
  if (name && name === name.toUpperCase() && /[A-Z]/.test(name)) { name = name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()); changes.add('Formatted your name consistently'); }
  name = name.replace(/^(name|full name)\s*:\s*/i, '');
  const contact = [];
  while (i < lines.length && !isHeading(lines[i].trim())) {
    const l = lines[i].trim();
    if (l) {
      if (PERSONAL.test(l.replace(/^[-*•]\s*/, ''))) { removed.push(l.split(':')[0]); }
      else l.split(/\s*[|·•]\s*|\s{2,}/).map((p) => tidy(p.replace(/^(email|e-mail|phone|tel|telephone|mobile|cell|address|location|linkedin)\s*:\s*/i, ''))).filter(Boolean).forEach((p) => contact.push(p));
    }
    i++;
  }

  // Body: split into sections.
  const sections = [];
  let cur = null;
  const push = (title) => { cur = sections.find((s) => s.title === title) || { title, items: [] }; if (!sections.includes(cur)) sections.push(cur); };
  for (; i < lines.length; i++) {
    const rawLine = lines[i];
    const l = rawLine.trim();
    if (!l) continue;
    const h = isHeading(l);
    if (h) { push(h); continue; }
    if (!cur) push('Profile');
    const content = l.replace(BULLET, '');
    const field = content.split(':')[0];
    if (cur.title === '_personal' || PERSONAL.test(content)) {
      if (PERSONAL.test(content)) removed.push(tidy(field));
      else if (/nationality|citizenship|languages?/i.test(field)) { push('Other'); cur.items.push({ type: 'text', text: tidy(content) }); }
      continue;
    }
    if (BULLET.test(rawLine) || (cur.title !== 'Profile' && cur.items.length && cur.items[cur.items.length - 1].type === 'bullet' && /^[a-z]/.test(l))) {
      let t = tidy(tidyDates(content));
      for (const [re, fn, msg] of WEAK) {
        if (re.test(t)) { const nt = t.replace(re, fn); if (nt !== t) { t = nt; changes.add(msg); } }
      }
      // Achievement sections read best in the past tense: "Preparing reports" -> "Prepared reports".
      if (/Experience|Leadership|Research/.test(cur.title)) {
        const g = t.match(/^([A-Za-z]{3,}ing)\b/);
        if (g && !/^(during|morning|evening|nothing|something|everything|bring|string|spring|king|ongoing)$/i.test(g[1])) { t = cap(pastOf(g[1])) + t.slice(g[1].length); changes.add('Put achievement bullets in the past tense'); }
      }
      t = t.replace(/^[a-z]/, (c) => c.toUpperCase()).replace(/[.;,]$/, '');
      if (t) cur.items.push({ type: 'bullet', text: t });
    } else {
      const t = tidy(tidyDates(content));
      cur.items.push({ type: /\b(19|20)\d{2}\b/.test(t) || t.length < 90 ? 'entry' : 'text', text: t });
    }
  }

  // Count date tidying and bullet fixes as changes.
  if (/(19|20)\d{2}\s*(-|to|—)\s*((19|20)\d{2}|present|current|date)/i.test(raw)) changes.add('Formatted date ranges consistently (e.g. 2018 – 2022, Jan 2023 – Present)');
  if (/^\s*([*·▪◦●o»>]|\d{1,2}[.)])\s+/m.test(raw)) changes.add('Made all bullet points the same style');
  if (/\s+[,.;:]/.test(raw) || / {2,}/.test(raw)) changes.add('Fixed spacing and punctuation');
  if (removed.length) changes.add(`Removed personal details international applications don't need: ${[...new Set(removed.map((r) => r.toLowerCase()))].join(', ')}`);

  const final = sections.filter((s) => s.title !== '_personal' && s.items.length);
  const before = final.map((s) => s.title).join('|');
  final.sort((a, b) => ORDER.indexOf(a.title) - ORDER.indexOf(b.title));
  if (final.map((s) => s.title).join('|') !== before) changes.add('Put sections in the order committees expect (Education and research first)');
  changes.add('Standardised section headings and applied a clean, professional layout');

  const titles = final.map((s) => s.title);
  const tips = [];
  if (!titles.includes('Profile')) tips.push('Add a 2–3 line profile at the top: who you are, your strongest evidence and what you want to do next.');
  if (!titles.includes('Referees')) tips.push('Add two referees (name, title, institution, email).');
  if (!contact.some((c) => EMAIL.test(c))) tips.push('Add a professional email address.');
  if (!contact.some((c) => PHONE.test(c))) tips.push('Add a phone number with country code (e.g. +254…).');
  const bullets = final.flatMap((s) => s.items.filter((x) => x.type === 'bullet'));
  if (bullets.length && bullets.filter((b) => /\d/.test(b.text)).length < Math.min(3, bullets.length)) tips.push('Add numbers to more bullet points (people trained, samples analysed, results achieved).');

  return { cv: { name: name || 'Your Name', contact: contact.slice(0, 6), sections: final.map((s) => ({ title: s.title === 'Other' ? 'Additional Information' : s.title, items: s.items })) }, changes: [...changes], tips };
}

// Stable text used for the payment check (the server re-hashes exactly this).
export const cvCanonical = (cv) => JSON.stringify({ name: cv.name, contact: cv.contact, sections: cv.sections });
