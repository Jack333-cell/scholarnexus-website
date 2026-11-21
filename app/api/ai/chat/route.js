import { NextResponse } from 'next/server';
import { geminiJSON, rateLimited } from '../../../../lib/gemini';
import { listingFacts, priceFacts, LINKS, openListings } from '../../../../lib/aiContext';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (rateLimited(req, 30)) return NextResponse.json({ fallback: true, reason: 'rate' }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-6).map((m) => `${m.from === 'you' ? 'Visitor' : 'Assistant'}: ${String(m.text || '').slice(0, 600)}`).join('\n');
  if (!msgs) return NextResponse.json({ fallback: true }, { status: 400 });
  const system = `You are the ScholarNexus AI Assistant on www.scholarnexushub.com, helping students find scholarships and use ScholarNexus services.
Rules:
- Recommend ONLY scholarships from the LISTINGS below, by their slug. Never invent scholarships, amounts, deadlines or eligibility.
- Always mention the money (funding amount) when recommending a scholarship.
- If nothing fits, say so honestly and suggest broadening the search or browsing all scholarships.
- Scholarship information on ScholarNexus is always free; official scholarships never need an agent or fee.
- For prices use only PRICES below. Payment is by M-Pesa or card via Paystack.
- Never write a visitor's essay, SOP or CV for them; point them to the AI CV polisher, the SOP checker, templates or paid review.
- Be warm and brief (max 90 words). Plain text, no markdown.
Return JSON: {"reply": string, "slugs": [up to 5 listing slugs, best first], "links": [up to 3 paths chosen from: ${Object.keys(LINKS).join(', ')}]}

LISTINGS (slug | title | levels | country | funding | deadline | notes):
${listingFacts()}

PRICES:
${priceFacts()}`;
  const out = await geminiJSON({ system, prompt: `${msgs}\n\nReply to the visitor's last message.`, temperature: 0.4, maxTokens: 700 });
  if (!out || typeof out.reply !== 'string') return NextResponse.json({ fallback: true }, { status: 503 });
  const valid = new Set(openListings().map((s) => s.slug));
  return NextResponse.json({
    reply: out.reply.slice(0, 1200),
    slugs: (out.slugs || []).filter((s) => valid.has(s)).slice(0, 5),
    links: (out.links || []).filter((l) => LINKS[l]).slice(0, 3).map((l) => [LINKS[l], l]),
  });
}
