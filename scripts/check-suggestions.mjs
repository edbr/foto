import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../app/api/suggestions/route.ts', import.meta.url), 'utf8');
const code = ts.transpile(source, { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 });
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const request = (body, origin = 'http://localhost:3000') => new Request('http://localhost:3000/api/suggestions', {
  method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body),
});
const originalFetch = globalThis.fetch;
const savedKey = process.env.RESEND_API_KEY;
const savedFrom = process.env.SUGGESTIONS_FROM_EMAIL;
try {
  delete process.env.RESEND_API_KEY;
  delete process.env.SUGGESTIONS_FROM_EMAIL;
  assert.equal((await POST(request({ destination: 'Recife' }))).status, 503);
  assert.equal((await POST(request({ destination: ' ' }))).status, 400);
  assert.equal((await POST(request({ destination: 'x'.repeat(201) }))).status, 400);
  assert.equal((await POST(request(null))).status, 400);
  assert.equal((await POST(request({ destination: 'Recife' }, 'https://other.example'))).status, 403);
  process.env.RESEND_API_KEY = 'test-only';
  process.env.SUGGESTIONS_FROM_EMAIL = 'Stories <stories@example.com>';
  let sent;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    sent = JSON.parse(options.body);
    return Response.json({ id: 'test' });
  };
  assert.equal((await POST(request({ destination: ' Recife ', language: 'pt', to: 'other@example.com' }))).status, 200);
  assert.deepEqual(sent.to, ['edbelluti@gmail.com']);
  assert.ok(sent.text.endsWith('Recife'));
  assert.match(sent.subject, /Sugestão/);
  globalThis.fetch = async () => Response.json({ message: 'private provider error' }, { status: 401 });
  const failed = await POST(request({ destination: 'Olinda' }));
  assert.equal(failed.status, 502);
  assert.equal((await failed.text()).includes('private provider'), false);
  globalThis.fetch = async () => { throw new Error('timeout'); };
  assert.equal((await POST(request({ destination: 'Olinda' }))).status, 502);
  globalThis.fetch = async () => Response.json({ id: 'test' });
  for (let i = 0; i < 7; i++) await POST(request({ destination: 'Recife' }));
  assert.equal((await POST(request({ destination: 'Recife' }))).status, 429);
  console.log('Verified suggestion validation, fixed recipient, provider failures, configuration and rate limit. No emails sent.');
} finally {
  globalThis.fetch = originalFetch;
  if (savedKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = savedKey;
  if (savedFrom === undefined) delete process.env.SUGGESTIONS_FROM_EMAIL; else process.env.SUGGESTIONS_FROM_EMAIL = savedFrom;
}
