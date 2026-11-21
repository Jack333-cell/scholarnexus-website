import { NextResponse } from 'next/server';
import { geminiJSON, rateLimited } from '../../../../lib/gemini';

export const dynamic = 'force-dynamic';
const TYPES = new Set(['entry', 'bullet', 'text']);
const nums = (s) => (String(s).replace(/(\d),(\d)/g, '$1$2').match(/\d+/g) || []);

export async function POST(req) {
  if (rateLimited(req, 8)) return NextResponse.json({ fallback: true, reason: 'rate' }, { status: 429 });
  const { text } = await req.json().catch(() => ({}));
  const cvText = String(text || '').slice(0, 15000);
  if (cvText.trim().length < 80) return NextResponse.json({ fallback: true }, { status: 400 });

  const system = `You are an expert academic and career CV editor for students applying to scholarships, graduate programmes and jobs.
Polish the CV the user pastes. STRICT RULES:
- NEVER invent or add facts: no new jobs, employers, degrees, dates, numbers, skills, awards, publications or referees. Use only information in the CV.
- Rewrite bullets to start with strong past-tense action verbs (present tense only for current roles), make them concise and specific, remove "I", "responsible for", "duties included".
- Keep every real item; you may merge duplicates and fix grammar, spelling, capitalisation and punctuation (British English).
- Remove personal details international applications should not include: date of birth, age, marital status, religion, tribe/ethnicity, ID/passport numbers, gender, health, photos, next of kin.
- Use these section titles where they apply, in this order: Profile, Education, Research Experience, Experience, Publications and Presentations, Skills, Certifications and Training, Awards and Honours, Leadership and Volunteering, Languages, Interests, Referees, Additional Information.
- Keep the Profile only if the CV has one (improve its wording without adding claims).
- Format dates consistently, e.g. "2017 – 2021", "Mar 2022 – Present".
Return JSON:
{"cv":{"name":string,"contact":[strings: email, phone, location, links],"sections":[{"title":string,"items":[{"type":"entry"|"bullet"|"text","text":string}]}]},
 "changes":[6-12 short sentences describing what you improved],
 "tips":[0-4 short suggestions for information the person should add themselves, e.g. numbers or a profile]}
"entry" = a heading line such as a degree or job with institution and dates; "bullet" = an achievement or skill; "text" = a sentence or paragraph.`;
  const out = await geminiJSON({ system, prompt: cvText, temperature: 0.2, maxTokens: 4096 });
  const cv = out?.cv;
  const okShape = cv && typeof cv.name === 'string' && Array.isArray(cv.contact) && Array.isArray(cv.sections) && cv.sections.length > 0 &&
    cv.sections.every((s) => typeof s.title === 'string' && Array.isArray(s.items) && s.items.every((i) => TYPES.has(i.type) && typeof i.text === 'string'));
  if (!okShape) return NextResponse.json({ fallback: true }, { status: 503 });

  // Safety net: reject the AI version if it contains any number that wasn't in the original CV.
  const allowed = new Set(nums(cvText));
  const outNums = nums(JSON.stringify(cv));
  if (outNums.some((n) => !allowed.has(n))) return NextResponse.json({ fallback: true, reason: 'invented_numbers' }, { status: 422 });

  const clean = {
    name: cv.name.slice(0, 120),
    contact: cv.contact.filter((c) => typeof c === 'string').slice(0, 6).map((c) => c.slice(0, 200)),
    sections: cv.sections.slice(0, 16).map((s) => ({ title: s.title.slice(0, 60), items: s.items.slice(0, 40).map((i) => ({ type: i.type, text: i.text.slice(0, 600) })) })).filter((s) => s.items.length),
  };
  return NextResponse.json({ cv: clean, changes: (out.changes || []).filter((x) => typeof x === 'string').slice(0, 12), tips: (out.tips || []).filter((x) => typeof x === 'string').slice(0, 4), ai: true });
}
