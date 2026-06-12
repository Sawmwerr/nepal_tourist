/**
 * Resize + re-compress all JPG/PNG in public/ (non-recursive, skips _src/).
 * Originals are backed up to public/_src/ before being overwritten.
 *
 * Usage:  node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, copyFile, stat, mkdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const PUBLIC   = "public";
const BACKUP   = join(PUBLIC, "_src");
const MAX_DIM  = 2560;        // px — longest edge cap
const JPG_Q    = 82;          // JPEG quality (0-100)
const PNG_Q    = { quality: 80, compressionLevel: 9 };

const EXTS = new Set([".jpg", ".jpeg", ".png"]);

async function formatBytes(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} MB`;
  return `${(n / 1_000).toFixed(0)} KB`;
}

async function optimise(file) {
  const ext    = extname(file).toLowerCase();
  if (!EXTS.has(ext)) return null;

  const src    = join(PUBLIC, file);
  const backup = join(BACKUP, file);

  // Skip already-backed-up originals
  const info   = await stat(src);
  const before = info.size;

  // Back up original (once — don't overwrite an existing backup)
  try {
    await stat(backup);         // throws if missing → first run
  } catch {
    await copyFile(src, backup);
  }

  // Load, cap dimensions, re-compress
  const img = sharp(backup);   // always read from original backup
  const meta = await img.metadata();
  const needsResize = (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM;

  let pipeline = needsResize
    ? img.resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
    : img.clone();

  if (ext === ".png") {
    pipeline = pipeline.png(PNG_Q);
  } else {
    pipeline = pipeline.jpeg({ quality: JPG_Q, mozjpeg: true, progressive: true });
  }

  await pipeline.toFile(src);

  const after = (await stat(src)).size;
  const pct   = (((before - after) / before) * 100).toFixed(1);
  const dim   = `${meta.width}×${meta.height}`;
  const flag  = needsResize ? " [resized]" : "";
  console.log(
    `  ${file.padEnd(40)} ${dim.padEnd(12)} ${await formatBytes(before)} → ${await formatBytes(after)}  (${pct}%${pct < 0 ? " ⚠ grew" : " saved"})${flag}`
  );

  return { before, after };
}

async function main() {
  await mkdir(BACKUP, { recursive: true });

  const files = (await readdir(PUBLIC)).filter(f => EXTS.has(extname(f).toLowerCase()));

  console.log(`\nOptimising ${files.length} images in ${PUBLIC}/\n`);
  console.log(`  ${"File".padEnd(40)} ${"Dimensions".padEnd(12)} Before → After\n`);

  let totalBefore = 0;
  let totalAfter  = 0;

  for (const f of files) {
    const r = await optimise(f);
    if (r) { totalBefore += r.before; totalAfter += r.after; }
  }

  const saved = totalBefore - totalAfter;
  const pct   = ((saved / totalBefore) * 100).toFixed(1);
  console.log(`\n  Total: ${await formatBytes(totalBefore)} → ${await formatBytes(totalAfter)}  (${pct}% saved, ${await formatBytes(saved)} freed)\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
