import { NextResponse } from 'next/server';
import { geminiJSON, rateLimited } from '../../../../lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (rateLimited(req, 10)) return NextResponse.json({ fallback: true, reason: 'rate' }, { status: 429 });
  const { text } = await req.json().catch(() => ({}));
  const raw = String(text || '').slice(0, 6000);
  if (raw.trim().length < 30) return NextResponse.json({ fallback: true }, { status: 400 });
  const system = `You help the ScholarNexus editor turn a scholarship announcement into a draft X (Twitter) post and listing fields.
Use only facts in the announcement; write "[CHECK]" where something is missing. The money (grant, stipend, allowance or "free") must come first after the title line.
Caption format, max 260 characters counting the link as 23:
"<flag emoji of host country> <Scholarship name>\\n\\n💰 <money>\\n🎓 <level>\\n🌍 <who can apply>\\n📅 Deadline: <date>\\n\\nDetails 👉 https://www.scholarnexushub.com/scholarships/<slug>\\n#Scholarships"
slug: lowercase-hyphenated short name, ASCII only.
Return JSON: {"slug":string,"caption":string,"fields":{"title":string,"country":string,"level":string,"amount":string,"deadline":string,"eligible":string},"warnings":[things to verify on the official site]}`;
  const out = await geminiJSON({ system, prompt: raw, temperature: 0.2, maxTokens: 900 });
  if (!out || typeof out.caption !== 'string') return NextResponse.json({ fallback: true }, { status: 503 });
  return NextResponse.json({ slug: String(out.slug || '').replace(/[^a-z0-9-]/g, '').slice(0, 80), caption: out.caption.slice(0, 600), fields: out.fields || {}, warnings: (out.warnings || []).slice(0, 6) });
}
