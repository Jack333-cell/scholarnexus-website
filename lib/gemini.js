// Server-only Google Gemini helper. GEMINI_API_KEY is set in Vercel (never in code).
// GEMINI_MODEL is optional; without it the newest available "flash-lite"/"flash" model is used.
const BASE = 'https://generativelanguage.googleapis.com/v1beta';
const key = () => (process.env.GEMINI_API_KEY || '').trim();
export const geminiReady = () => Boolean(key());

let cachedModel = null;
async function pickModel() {
  if (process.env.GEMINI_MODEL) return process.env.GEMINI_MODEL.trim();
  if (cachedModel) return cachedModel;
  const r = await fetch(`${BASE}/models?pageSize=200`, { headers: { 'x-goog-api-key': key() }, cache: 'no-store' });
  const j = await r.json().catch(() => ({}));
  const names = (j.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => m.name.replace(/^models\//, ''))
    .filter((n) => /^gemini-/.test(n) && !/(preview|exp|image|tts|audio|live|thinking|embedding|vision)/.test(n));
  const ver = (n) => parseFloat((n.match(/gemini-(\d+(?:\.\d+)?)/) || [])[1] || '0');
  const rank = (n) => (/flash-lite/.test(n) ? 2 : /flash/.test(n) ? 1 : 0);
  names.sort((a, b) => rank(b) - rank(a) || ver(b) - ver(a) || a.length - b.length);
  cachedModel = names.find((n) => rank(n) > 0) || 'gemini-2.0-flash-lite';
  return cachedModel;
}

// Best-effort limit per visitor (per server instance): protects the free quota from abuse.
const hits = new Map();
export function rateLimited(req, max = 20, windowMs = 10 * 60 * 1000) {
  const ip = (req.headers.get('x-forwarded-for') || 'x').split(',')[0].trim();
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

// Asks Gemini for a JSON answer. Returns the parsed object, or null on any failure.
export async function geminiJSON({ system, prompt, temperature = 0.3, maxTokens = 2048 }) {
  if (!geminiReady()) return null;
  try {
    const model = await pickModel();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 25000);
    const r = await fetch(`${BASE}/models/${model}:generateContent`, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key() },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature, maxOutputTokens: maxTokens, responseMimeType: 'application/json' },
      }),
      cache: 'no-store',
    });
    clearTimeout(timer);
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { console.error('gemini', r.status, JSON.stringify(j).slice(0, 300)); return null; }
    const text = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
    return JSON.parse(text.replace(/^```(json)?|```$/g, '').trim());
  } catch (e) {
    console.error('gemini error', e?.message);
    return null;
  }
}

export async function geminiStatus() {
  if (!geminiReady()) return { ready: false };
  const model = await pickModel().catch(() => null);
  const ok = await geminiJSON({ system: 'Reply with JSON only.', prompt: 'Return {"ok":true}', maxTokens: 20 });
  return { ready: Boolean(ok?.ok), model };
}
