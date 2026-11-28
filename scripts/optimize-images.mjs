/**
 * Roadmap §12 (performance): writes a WebP copy next to every JPG/JPEG in
 * public/images, resized to at most 1920px wide. <SmartImage> serves the WebP
 * through <picture> and keeps the JPG as the fallback. Runs before dev/build and
 * skips files whose WebP is already newer than the source.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), "public", "images");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.jpe?g$/i.test(entry.name)) yield full;
  }
}

// sharp ships with Next.js as an optional dependency. If it is missing, keep the
// committed WebP files and let the build continue.
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.log("optimize-images: sharp not available, using committed WebP files");
  process.exit(0);
}

let made = 0;
for await (const src of walk(root)) {
  const out = src.replace(/\.jpe?g$/i, ".webp");
  const [s, o] = await Promise.all([stat(src), stat(out).catch(() => null)]);
  if (o && o.mtimeMs >= s.mtimeMs) continue;
  await sharp(src).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
  const after = (await stat(out)).size;
  console.log(`webp  ${path.relative(root, out)}  ${Math.round(s.size / 1024)}KB -> ${Math.round(after / 1024)}KB`);
  made++;
}
console.log(`optimize-images: ${made} file(s) written`);
