import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(process.cwd(), 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, size, size);

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = '#4F46E5';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = '#FBBF24';
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buffer);
});

console.log('Real binary PNGs generated successfully.');
