// Free, rule-based feedback for motivation letters, SOPs and CVs. Runs in the browser only.
const CLICHES = ['since childhood', 'since i was a child', 'from a young age', 'ever since i was', 'i have always been', 'i have always wanted', 'my dream', 'dream of', 'passionate', 'passion for', 'world-class', 'world class', 'prestigious', 'esteemed', 'make a difference', 'give back to', 'hard-working', 'hardworking', 'team player', 'in today\'s world', 'in this modern world', 'since time immemorial', 'it is my humble', 'humbly', 'golden opportunity', 'god-given', 'i am a person who'];
const STOP = new Set('the a an and or of to in for on with at by from is are was were be been being i my me we our you your it its this that these those as but not have has had will would can could should which who whom what when where how than then also very more most such so into about over after before during through'.split(' '));
const words = (t) => (t.toLowerCase().match(/[a-z][a-z'-]*/g) || []);
const sentences = (t) => t.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/).filter((s) => s.trim().length > 2);

export function checkLetter(text, kind = 'letter') {
  const t = text.trim();
  const w = words(t), n = w.length;
  const items = [];
  const add = (ok, title, detail) => items.push({ ok, title, detail });
  const lo = kind === 'sop' ? 600 : 450, hi = kind === 'sop' ? 1100 : 1000;
  add(n >= lo && n <= hi, `Length: ${n} words`, n < lo ? `Most ${kind === 'sop' ? 'SOPs' : 'motivation letters'} run ${lo}–${hi} words. Add specific evidence: projects, results, numbers.` : n > hi ? `Above the usual ${hi}-word limit. Cut repetition and general statements first. Always follow the programme's own limit.` : 'Within the usual range. Still check the programme\'s own word limit.');

  const first = (sentences(t)[0] || '').toLowerCase();
  const weakOpen = /^(my name is|i am writing|i am applying|i would like to apply|it is with great|i wish to)/.test(first) || /^["“]/.test(first);
  add(!weakOpen, 'Opening sentence', weakOpen ? 'Your opening is a formula committees see hundreds of times. Start with a concrete moment from your own work or study that shows why this field matters to you.' : 'Good: the letter does not open with a stock phrase.');

  const tl = ' ' + t.toLowerCase() + ' ';
  const found = CLICHES.filter((c) => tl.includes(c));
  add(found.length === 0, found.length ? `Clichés found (${found.length})` : 'No common clichés', found.length ? `Replace with specifics: "${found.slice(0, 5).join('", "')}". Show what you did instead of saying how you feel.` : 'Good: no stock phrases like "since childhood" or "passionate".');

  const nums = (t.match(/\b\d[\d,.]*%?/g) || []).length;
  add(nums >= 3, `Evidence and numbers: ${nums}`, nums >= 3 ? 'Good: numbers make your claims believable.' : 'Add measurable evidence: sample sizes, grades, ranks, people trained, results achieved.');

  const fit = /(module|course|curriculum|professor|prof\.|dr\.|faculty|laboratory|research group|lab |track|specialisation|specialization|programme|program)/i.test(t);
  add(fit, 'Programme fit', fit ? 'Good: you refer to the programme itself. Make sure you name 2–3 specific modules, professors or opportunities.' : 'Name 2–3 specific modules, professors, labs or opportunities in this programme and link each one to your goals.');

  const goals = /(after (graduat|complet|the programme|the program)|plan to|my goal|long-term|long term|career|return to|in the future|five years)/i.test(t);
  add(goals, 'Career goals', goals ? 'Good: you explain what you will do after the programme.' : 'Add a clear plan: what you will do after graduating and how this degree gets you there.');

  const ss = sentences(t);
  const iStarts = ss.filter((s) => /^i\b/i.test(s.trim())).length;
  const iRatio = ss.length ? iStarts / ss.length : 0;
  add(iRatio <= 0.35, `Sentences starting with "I": ${Math.round(iRatio * 100)}%`, iRatio > 0.35 ? 'Too many sentences start with "I". Vary them: start with the result, the place or the project.' : 'Good variety in how sentences begin.');

  const long = ss.filter((s) => words(s).length > 35).length;
  add(long <= 2, `Very long sentences: ${long}`, long > 2 ? 'Split sentences over 35 words. Shorter sentences are easier for busy readers.' : 'Sentence length is readable.');

  const paras = t.split(/\n\s*\n/).filter((p) => p.trim()).length;
  add(paras >= 4, `Paragraphs: ${paras}`, paras < 4 ? 'Use 4–6 paragraphs: hook, background, experience, programme fit, goals, closing. Leave a blank line between them.' : 'Good structure.');

  const freq = {};
  w.filter((x) => !STOP.has(x) && x.length > 3).forEach((x) => { freq[x] = (freq[x] || 0) + 1; });
  const over = Object.entries(freq).filter(([, c]) => n > 150 && c / n > 0.015 && c >= 5).sort((a, b) => b[1] - a[1]).slice(0, 4);
  add(over.length === 0, over.length ? 'Repeated words' : 'Word variety', over.length ? `You use ${over.map(([x, c]) => `"${x}" ${c}×`).join(', ')}. Vary or cut some.` : 'Good: no word is overused.');

  return summarize(items);
}

export function checkCV(text) {
  const t = text.trim(), tl = t.toLowerCase();
  const n = words(t).length;
  const items = [];
  const add = (ok, title, detail) => items.push({ ok, title, detail });
  const sec = { Education: /education|academic background|qualifications/, Experience: /experience|employment|work history|research experience|internship/, Skills: /skills|competenc|technical/, 'Publications / research': /publication|research|project|thesis|dissertation|presentation|poster/, Referees: /referee|references/, 'Awards / leadership': /award|honou?r|scholarship|leadership|volunteer|achievement/ };
  const missing = Object.keys(sec).filter((k) => !sec[k].test(tl));
  add(missing.length === 0, missing.length ? `Missing sections: ${missing.length}` : 'All key sections present', missing.length ? `Consider adding: ${missing.join(', ')}. Academic CVs usually include all of these.` : 'Education, experience, skills, research, awards and referees are all there.');
  add(/[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(t), 'Email address', /[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(t) ? 'Present. Use a professional address (name-based).' : 'Add a professional email address at the top.');
  add(/(\+?\d[\d\s-]{8,})/.test(t), 'Phone number', /(\+?\d[\d\s-]{8,})/.test(t) ? 'Present, ideally with country code (+254…).' : 'Add a phone number with country code.');
  const years = (t.match(/\b(19|20)\d{2}\b/g) || []).length;
  add(years >= 4, `Dates: ${years}`, years >= 4 ? 'Good: entries are dated.' : 'Give every education and experience entry dates (month/year – month/year), most recent first.');
  const weak = (tl.match(/responsible for|duties included|worked on|helped with|tasks included|in charge of/g) || []).length;
  add(weak === 0, weak ? `Weak phrases: ${weak}` : 'Strong action verbs', weak ? 'Replace "responsible for / duties included" with action verbs: led, built, analysed, trained, published.' : 'Good: bullets read as achievements, not duties.');
  const nums = (t.match(/\b\d[\d,.]*%?\b/g) || []).length - years;
  add(nums >= 3, `Measurable results: ${Math.max(nums, 0)}`, nums >= 3 ? 'Good: numbers show impact.' : 'Quantify achievements: "trained 40 students", "analysed 600 samples", "raised grades by 15%".');
  const personal = ['marital status', 'date of birth', 'religion', 'tribe', 'id number', 'gender:'].filter((p) => tl.includes(p));
  add(personal.length === 0, personal.length ? 'Unneeded personal details' : 'No unneeded personal details', personal.length ? `Remove ${personal.join(', ')}. International applications don't need them.` : 'Good: no ID, religion or marital status.');
  const firstPerson = (t.match(/(^|[.\n•-]\s*)I\s/g) || []).length;
  add(firstPerson <= 2, 'Writing style', firstPerson > 2 ? 'Avoid "I" in CV bullets. Start each with a verb: "Designed…", "Led…".' : 'Good: concise bullet style.');
  add(n >= 250 && n <= 1100, `Length: ${n} words`, n < 250 ? 'Very short. Add detail to research, experience and skills.' : n > 1100 ? 'Long for a student CV. Aim for 1–2 pages: cut old or minor items.' : 'Good length for a 1–2 page CV.');
  return summarize(items);
}

function summarize(items) {
  const score = Math.round((items.filter((i) => i.ok).length / items.length) * 100);
  return { score, items };
}
