// A small per-process ceiling; configure shared rate limiting when deploying at scale.
let windowStart = 0;
let attempts = 0;

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Invalid origin' }, { status: 403 });
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return Response.json({ error: 'JSON required' }, { status: 415 });
  }
  let input;
  try {
    const body = await request.text();
    if (body.length > 4096) return Response.json({ error: 'Request too large' }, { status: 413 });
    input = JSON.parse(body);
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const destination = typeof input?.destination === 'string' ? input.destination.trim() : '';
  if (destination.length < 2 || destination.length > 200) {
    return Response.json({ error: 'Invalid destination' }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SUGGESTIONS_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: 'Sending is unavailable' }, { status: 503 });
  }
  const now = Date.now();
  if (now - windowStart >= 60_000) { windowStart = now; attempts = 0; }
  if (attempts >= 10) {
    return Response.json({ error: 'Please try again later' }, { status: 429, headers: { 'Retry-After': '60' } });
  }
  attempts++;
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: ['edbelluti@gmail.com'],
        subject: input.language === 'pt' ? 'Stories — Sugestão de destino' : 'Stories — Destination suggestion',
        text: `A visitor suggested a destination for the next story:\n\n${destination}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return Response.json({ error: 'Sending failed' }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Sending failed' }, { status: 502 });
  }
}
