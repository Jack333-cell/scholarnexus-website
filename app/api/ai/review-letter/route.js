import { NextResponse } from 'next/server';
import { geminiJSON, rateLimited } from '../../../../lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (rateLimited(req, 10)) return NextResponse.json({ fallback: true, reason: 'rate' }, { status: 429 });
  const { text, kind } = await req.json().catch(() => ({}));
  const draft = String(text || '').slice(0, 12000);
  if (draft.trim().length < 80) return NextResponse.json({ fallback: true }, { status: 400 });
  const doc = kind === 'sop' ? 'statement of purpose for a graduate programme' : 'motivation letter for a scholarship or study programme';
  const system = `You are an experienced scholarship committee reviewer. Give honest, specific, encouraging feedback on a ${doc}.
Do NOT rewrite the document or write new paragraphs for the applicant; the writing must stay their own. You may quote short phrases from it.
Judge: opening, clarity of motivation, evidence and specifics, programme fit, career goals, structure, tone, clichés, grammar.
Return JSON: {"score": integer 0-100, "summary": "2 sentences", "strengths": [2-4 short points], "improvements": [{"issue": "short title", "suggestion": "1-2 sentences of concrete advice"}] (3-6 items)}`;
  const out = await geminiJSON({ system, prompt: draft, temperature: 0.3, maxTokens: 1400 });
  if (!out || !Array.isArray(out.improvements)) return NextResponse.json({ fallback: true }, { status: 503 });
  return NextResponse.json({
    score: Math.max(0, Math.min(100, parseInt(out.score, 10) || 0)),
    summary: String(out.summary || '').slice(0, 500),
    strengths: (out.strengths || []).filter((x) => typeof x === 'string').slice(0, 4),
    improvements: out.improvements.filter((x) => x && x.issue).slice(0, 6).map((x) => ({ issue: String(x.issue).slice(0, 100), suggestion: String(x.suggestion || '').slice(0, 400) })),
  });
}
