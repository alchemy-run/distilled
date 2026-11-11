#!/usr/bin/env node
/**
 * Runs after `vite build`. Nitro's static preset writes `nitro.json` and the
 * Vite manifest into `dist/` after every hook has fired, and the whole of
 * `dist/` is uploaded as public assets — so drop them here, then print what
 * the build was made of.
 */
import { readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist", import.meta.url));

for (const entry of ["nitro.json", ".vite"]) {
  await rm(join(dist, entry), { recursive: true, force: true });
}

const pages = (await readdir(dist)).filter((f) => f.endsWith(".html"));
for (const page of pages) {
  const { size } = await stat(join(dist, page));
  console.log(`  ${page.padEnd(12)} ${(size / 1024).toFixed(1).padStart(7)} KB`);
}
