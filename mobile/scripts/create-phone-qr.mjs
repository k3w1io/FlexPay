// Use the same QR encoder as Expo CLI to generate a shareable PNG.
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const expoRequire = createRequire(
  new URL('../node_modules/expo/package.json', import.meta.url),
);
const cliRequire = createRequire(expoRequire.resolve('@expo/cli'));
const { toQR } = cliRequire('toqr');
const response = await fetch(
  'http://localhost:8082/_expo/open?platform=android&runtime=expo',
);
if (!response.ok)
  throw new Error('The Expo Go server is not available on port 8082.');
const { url, runtime } = await response.json();
if (runtime !== 'expo' || !url.startsWith('exp://'))
  throw new Error('Expected an Expo Go link.');
const cells = toQR(url);
const extent = Math.sqrt(cells.length);
if (!Number.isInteger(extent)) throw new Error('Invalid QR matrix.');
const quiet = 4;
const scale = 10;
const size = (extent + quiet * 2) * scale;
const pixels = Buffer.alloc(size * (size * 3 + 1), 255);
for (let y = 0; y < size; y++) {
  pixels[y * (size * 3 + 1)] = 0;
  for (let x = 0; x < size; x++) {
    const row = Math.floor(y / scale) - quiet;
    const col = Math.floor(x / scale) - quiet;
    const black =
      row >= 0 &&
      col >= 0 &&
      row < extent &&
      col < extent &&
      cells[row * extent + col];
    if (black)
      pixels.fill(
        0,
        y * (size * 3 + 1) + 1 + x * 3,
        y * (size * 3 + 1) + 4 + x * 3,
      );
  }
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
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([len, name, data, crc]);
}
const header = Buffer.alloc(13);
header.writeUInt32BE(size, 0);
header.writeUInt32BE(size, 4);
header[8] = 8;
header[9] = 2;
const output = new URL(
  '../../artifacts/FlexPay-Expo-Go-QR.png',
  import.meta.url,
);
mkdirSync(dirname(fileURLToPath(output)), { recursive: true });
writeFileSync(
  output,
  Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(pixels)),
    chunk('IEND', Buffer.alloc(0)),
  ]),
);
console.log(JSON.stringify({ url, runtime, qrSize: size, file: output.href }));
