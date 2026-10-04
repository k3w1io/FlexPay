// Render the code-native FlexPay mark into bundled Android launcher assets.
// No external graphics dependency is needed; rerun with `node scripts/generate-brand.mjs`.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
const green = [23, 60, 49, 255];
const lime = [217, 246, 157, 255];
const transparent = [0, 0, 0, 0];
function segment(x, y, x1, y1, x2, y2, r) {
  const t = Math.max(
    0,
    Math.min(
      1,
      ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) /
        ((x2 - x1) ** 2 + (y2 - y1) ** 2),
    ),
  );
  return (
    (x - x1 - t * (x2 - x1)) ** 2 + (y - y1 - t * (y2 - y1)) ** 2 <= r ** 2
  );
}
function pixel(x, y, background, foreground) {
  if (
    segment(x, y, 11, 26, 11, 14, 2) ||
    segment(x, y, 11, 14, 30, 14, 2) ||
    segment(x, y, 11, 20, 25, 20, 2) ||
    (x - 28) ** 2 + (y - 26) ** 2 <= 9
  )
    return foreground;
  return background;
}
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, crc]);
}
function render(filename, size, background, foreground) {
  const data = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const samples = [
        [0.25, 0.25],
        [0.75, 0.25],
        [0.25, 0.75],
        [0.75, 0.75],
      ].map(([dx, dy]) =>
        pixel(
          ((x + dx) * 40) / size,
          ((y + dy) * 40) / size,
          background,
          foreground,
        ),
      );
      for (let i = 0; i < 4; i++)
        data[y * (1 + size * 4) + 1 + x * 4 + i] = Math.round(
          samples.reduce((sum, color) => sum + color[i], 0) / 4,
        );
    }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  writeFileSync(
    new URL(`../assets/${filename}`, import.meta.url),
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk('IHDR', header),
      chunk('IDAT', deflateSync(data)),
      chunk('IEND', Buffer.alloc(0)),
    ]),
  );
}
render('icon.png', 1024, green, lime);
render('favicon.png', 64, green, lime);
render('android-icon-foreground.png', 1024, transparent, lime);
render('android-icon-monochrome.png', 1024, transparent, [255, 255, 255, 255]);
console.log('Generated FlexPay app, favicon and Android launcher assets.');
