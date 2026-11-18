// Adds a newsletter subscriber to a Brevo contact list.
// Required Vercel environment variables:
//   BREVO_API_KEY  – Brevo API key (Brevo → SMTP & API → API Keys)
//   BREVO_LIST_ID  – numeric ID of the Brevo list to add contacts to
export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots fill the hidden "website" field; pretend success and do nothing.
  if (body?.website) return Response.json({ message: "You're subscribed!" });

  const email = String(body?.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    console.error('Newsletter not configured: set BREVO_API_KEY and BREVO_LIST_ID');
    return Response.json(
      { error: 'Sign-ups are temporarily unavailable. Please email infoscholarnexus@gmail.com or message us on WhatsApp.' },
      { status: 503 }
    );
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    });
    if (res.ok) {
      return Response.json({ message: "You're subscribed! Watch your inbox for new scholarships." });
    }
    const detail = await res.text();
    console.error('Brevo error', res.status, detail);
    return Response.json({ error: 'We could not subscribe you right now. Please try again later.' }, { status: 502 });
  } catch (err) {
    console.error('Brevo request failed', err);
    return Response.json({ error: 'We could not subscribe you right now. Please try again later.' }, { status: 502 });
  }
}
