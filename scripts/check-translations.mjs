import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import ts from 'typescript';

const root = new URL('../app/', import.meta.url);
const messages = JSON.parse(await readFile(new URL('translations.json', root), 'utf8'));
for (const [key, entry] of Object.entries(messages)) {
  assert.ok(entry.en?.trim(), `Missing English: ${key}`);
  assert.ok(entry.pt?.trim(), `Missing Portuguese: ${key}`);
}
for (const name of await readdir(root)) {
  if (!/\.tsx?$/.test(name)) continue;
  const source = ts.createSourceFile(name, await readFile(new URL(name, root), 'utf8'), ts.ScriptTarget.Latest, true, name.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const check = (node) => {
    if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
      assert.ok(messages[node.arguments[0].text], `${name}: missing translation for ${node.arguments[0].text}`);
    }
    ts.forEachChild(node, check);
  };
  check(source);
}
assert.equal(messages.Ida.en, 'Outbound');
assert.equal(messages.Volta.pt, 'Volta');
assert.equal(messages['Pelos caminhos do sertão'].en, 'Along the roads of the sertão');
assert.equal(messages['Indigenous lands'].pt, 'Terras indígenas');
assert.equal(messages.Floresta, undefined, 'Do not translate the town of Floresta');
console.log(`Verified ${Object.keys(messages).length} bilingual messages and literal translation references.`);
