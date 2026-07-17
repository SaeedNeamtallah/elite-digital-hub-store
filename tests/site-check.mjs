import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

assert.match(html, /<html lang="ar" dir="rtl">/, 'Page must be Arabic RTL');
assert.match(html, /name="description"/, 'SEO description is required');
assert.match(html, /application\/ld\+json/, 'Structured data is required');
assert.match(html, /201006530760/g, 'WhatsApp number must be present');
assert.equal((html.match(/class="product-card(?:\s|\")/g) || []).length, 10, 'Expected ten product cards');
assert.ok((html.match(/class="order-now"/g) || []).length >= 10, 'Every product needs a direct order button');
assert.doesNotMatch(html, /class="announcement"/, 'Top announcement bar should be removed');
assert.doesNotMatch(html, /class="header-contact"/, 'Header CTA should be removed');
assert.doesNotMatch(html, /https?:\/\/[^\s"']+\.(?:css|js|woff2?)/i, 'Runtime assets must be local for speed');
assert.match(css, /@media \(min-width: 620px\)/, 'Responsive tablet breakpoint is required');
assert.match(css, /@media \(min-width: 1080px\)/, 'Responsive desktop breakpoint is required');
assert.match(js, /encodeURIComponent\(message\)/, 'WhatsApp order message must be safely encoded');

const localAssets = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)]
  .map((match) => match[1])
  .filter((value) => !/^(?:https?:|tel:|mailto:)/.test(value));

for (const asset of localAssets) {
  assert.ok(fs.existsSync(path.join(root, asset)), `Missing local asset: ${asset}`);
}

console.log(`Site checks passed: ${localAssets.length} local references, 10 products, RTL + SEO verified.`);
