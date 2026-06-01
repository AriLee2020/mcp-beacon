/**
 * Asset Generation Script
 * Converts SVG design assets to PNG for production use.
 * Run: npx tsx scripts/generate-assets.ts
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const PUBLIC = join(process.cwd(), 'public');

async function svgToPng(inputPath: string, outputPath: string, width: number, height?: number) {
  const svgBuffer = readFileSync(inputPath);
  const h = height || width;
  const pngBuffer = await sharp(svgBuffer)
    .resize(width, h)
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(outputPath, pngBuffer);
  console.log(`  ✓ ${outputPath} (${width}×${h})`);
}

async function main() {
  console.log('🚀 Generating assets from SVG sources...\n');

  // OG Image: 1200×630 PNG
  await svgToPng(
    join(PUBLIC, 'og-image.svg'),
    join(PUBLIC, 'og-image.png'),
    1200,
    630
  );

  // Favicon: generate multiple sizes and ICO
  const faviconSvg = join(PUBLIC, 'favicon.svg');
  
  // 32×32 PNG
  await svgToPng(faviconSvg, join(PUBLIC, 'favicon-32x32.png'), 32);
  
  // 16×16 PNG
  await svgToPng(faviconSvg, join(PUBLIC, 'favicon-16x16.png'), 16);
  
  // 48×48 PNG (for ICO)
  await svgToPng(faviconSvg, join(PUBLIC, 'favicon-48x48.png'), 48);
  
  // Combined favicon.ico (multi-size .ico isn't straightforward with sharp,
  // so we use a 32x32 PNG as the primary and reference others in HTML)
  
  // Apple Touch Icon: 180×180 PNG
  await svgToPng(
    join(PUBLIC, 'apple-touch-icon.svg'),
    join(PUBLIC, 'apple-touch-icon.png'),
    180
  );

  // Also generate a 192×192 icon (for PWA manifest)
  await svgToPng(
    join(PUBLIC, 'apple-touch-icon.svg'),
    join(PUBLIC, 'icon-192x192.png'),
    192
  );

  // 512×512 icon (for PWA manifest)
  await svgToPng(
    join(PUBLIC, 'apple-touch-icon.svg'),
    join(PUBLIC, 'icon-512x512.png'),
    512
  );

  console.log('\n✅ All assets generated!');
}

main().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
