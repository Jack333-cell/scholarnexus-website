import { NextResponse } from 'next/server';
import { geminiJSON, rateLimited } from '../../../../lib/gemini';
import { listingFacts, openListings } from '../../../../lib/aiContext';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (rateLimited(req, 15)) return NextResponse.json({ fallback: true, reason: 'rate' }, { status: 429 });
  const { profile, candidates } = await req.json().catch(() => ({}));
  const open = openListings();
  const pool = open.filter((s) => (candidates || []).includes(s.slug));
  if (!pool.length) return NextResponse.json({ fallback: true }, { status: 400 });
  const p = profile || {};
  const system = `You match students to scholarships. Rank ONLY the candidate listings given (already filtered for eligibility), best fit first, considering level, nationality, destination, funding need and field/keywords.
For each, write one short reason (max 22 words) addressed to the student that mentions the funding amount. Never invent facts beyond the listing text.
Return JSON: {"ranked":[{"slug":string,"reason":string}]}`;
  const prompt = `Student: level=${p.level}; nationality=${p.nat}; destination=${p.dest}; fully funded only=${p.funded ? 'yes' : 'no'}; field/keywords=${String(p.field || 'none').slice(0, 200)}

CANDIDATES:
${listingFacts(pool)}`;
  const out = await geminiJSON({ system, prompt, temperature: 0.2, maxTokens: 1200 });
  const valid = new Set(pool.map((s) => s.slug));
  const ranked = (out?.ranked || []).filter((r) => r && valid.has(r.slug)).map((r) => ({ slug: r.slug, reason: String(r.reason || '').slice(0, 220) }));
  if (!ranked.length) return NextResponse.json({ fallback: true }, { status: 503 });
  return NextResponse.json({ ranked });
}
