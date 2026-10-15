/**
 * One measurement in a fresh process: import a generated shape module, then
 * validate samples.   node --expose-gc src/probe.ts <module> <samples.json>
 * Prints one JSON line.
 */
import { readFileSync } from "node:fs";

const [modulePath, samplesPath] = process.argv.slice(2) as [string, string];
const snap = () => {
  (globalThis as any).gc();
  (globalThis as any).gc();
  return process.memoryUsage().heapUsed;
};

// Preload every library, so the delta below is the shape module alone.
await import("effect/Schema");
await import("@distilled.cloud/core/schema");
await import("valibot");
await import("zod/mini");
await import("typebox");
await import("typebox/value");
await import("./desc-runtime.js");

const samples: Array<{ name: string; valid: unknown; broken?: unknown }> = JSON.parse(
  readFileSync(samplesPath, "utf8"),
);

const before = snap();
let t = performance.now();
const mod = await import(modulePath);
const importMs = performance.now() - t;
const importHeap = snap() - before;

// First validation of each sample: builds whatever the candidate builds lazily.
t = performance.now();
let accepted = 0;
for (const s of samples) if (mod.validate(s.name, s.valid)) accepted++;
const firstMs = performance.now() - t;
const afterFirst = snap();

let rejected = 0,
  brokenCount = 0;
for (const s of samples) {
  if (s.broken === undefined) continue;
  brokenCount++;
  if (!mod.validate(s.name, s.broken)) rejected++;
}

// Steady state.
const rounds = Math.max(1, Math.round(4000 / samples.length));
for (let r = 0; r < rounds; r++) for (const s of samples) mod.validate(s.name, s.valid);
t = performance.now();
for (let r = 0; r < rounds; r++) for (const s of samples) mod.validate(s.name, s.valid);
const steadyUs = ((performance.now() - t) * 1000) / (rounds * samples.length);

console.log(
  JSON.stringify({
    importMs,
    importHeap,
    firstMs,
    firstHeap: afterFirst - before - importHeap,
    steadyUs,
    accepted,
    samples: samples.length,
    rejected,
    broken: brokenCount,
  }),
);
