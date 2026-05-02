/**
 * Simple icon generator using Node.js Canvas (requires `canvas` package).
 * Run: node scripts/generate-icons.mjs
 *
 * Or replace public/icons/icon16.png, icon48.png, icon128.png with your own artwork.
 */

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

mkdirSync(iconsDir, { recursive: true });

const sizes = [16, 48, 128];

for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F0F0F';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fill();

  // Diamond (◆)
  ctx.fillStyle = '#F59E0B';
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx + r, cy);
  ctx.lineTo(cx, cy + r);
  ctx.lineTo(cx - r, cy);
  ctx.closePath();
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  writeFileSync(join(iconsDir, `icon${size}.png`), buffer);
  console.log(`Generated icon${size}.png`);
}

console.log('Done. Icons written to public/icons/');
