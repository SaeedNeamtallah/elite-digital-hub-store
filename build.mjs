import { cpSync, mkdirSync, rmSync } from 'node:fs';

const output = 'dist';
const files = [
  'index.html',
  'styles.css',
  'script.js',
  'manifest.webmanifest',
  'robots.txt'
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of files) {
  cpSync(file, `${output}/${file}`);
}

cpSync('assets', `${output}/assets`, { recursive: true });
console.log('Static storefront built in dist/');
