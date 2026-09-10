import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import ts from 'typescript';

// Exercise the actual layer setup/cleanup functions after Mapbox removes its canvas.
const files = (await readdir(new URL('../app/', import.meta.url))).filter((name) => name.endsWith('layer.ts'));
let checked = 0;
for (const file of files) {
  let source = await readFile(new URL(`../app/${file}`, import.meta.url), 'utf8');
  if (!source.includes('const handlers:')) continue;
  source = source.replace(/^import mapboxgl .*;$/m, 'const mapboxgl = { Popup: class { remove() {} } };')
    .replace(/^import manifest .*;$/m, 'const manifest = [{ state: "TEST", count: 1, url: "/test.geojson" }];');
  const code = ts.transpile(source, { module: ts.ModuleKind.ESNext });
  const module = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const setup = Object.entries(module).find(([name]) => name.startsWith('show'))[1];
  for (const removeFirst of [false, true]) {
    const canvas = { style: { cursor: '' } };
    let removed = false;
    const handlers = new Map();
    const map = {
      getCanvas: () => removed ? undefined : canvas,
      getSource: () => ({}), getLayer: () => ({}), setLayoutProperty() {},
      on: (event, id, callback) => handlers.set(`${event}:${id}`, callback),
      off: (event, id) => handlers.delete(`${event}:${id}`),
    };
    const cleanup = setup(map, true);
    [...handlers.entries()].find(([key]) => key.startsWith('mouseenter'))[1]();
    assert.equal(canvas.style.cursor, 'pointer');
    removed = removeFirst;
    assert.doesNotThrow(cleanup, `${file}: cleanup after removal=${removeFirst}`);
    assert.equal(canvas.style.cursor, '');
    assert.equal(handlers.size, 0);
  }
  checked++;
}
assert.equal(checked, 7);
console.log(`Verified cleanup before and after map removal for ${checked} overlay layers.`);
