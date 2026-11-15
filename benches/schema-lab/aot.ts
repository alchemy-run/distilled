/**
 * Effect SchemaAOTCompiler experiment: compile `is` for every shape's inner
 * (unsuspended, encoded-side) AST ahead of time, then measure first-use heap
 * and validation speed against the interpreted effect-lazy module.
 *
 *   node --conditions=bun --expose-gc aot.ts <corpus> [--dedupe]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as S from "effect/Schema";
import { SchemaAOTCompiler } from "effect/schema";
import * as SchemaAST from "effect/SchemaAST";

const [corpusName] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const dedupeDir = process.argv.includes("--dedupe") ? "mods-dedupe" : "mods";
const dir = join(import.meta.dirname, ".out", dedupeDir, corpusName!);
const samples: Array<{ name: string; valid: unknown; broken?: unknown }> = JSON.parse(
  readFileSync(join(dir, "samples.json"), "utf8"),
);
const snap = () => {
  (globalThis as any).gc();
  (globalThis as any).gc();
  return process.memoryUsage().heapUsed;
};

const mod = await import(join(dir, "effect-lazy.js"));
const shapeNames = Object.keys(mod).filter((k) => k.startsWith("$"));

/** Every AST the AOT module covers, in a stable order: each shape's encoded inner AST. */
const targetAsts = () =>
  shapeNames.map((k) => {
    const enc = SchemaAST.toEncoded(mod[k].ast) as any;
    return enc._tag === "Suspend" ? enc.thunk() : enc;
  });

// Build time: generate the compiled module.
let t = performance.now();
const asts = targetAsts();
const code = SchemaAOTCompiler.compile(asts.map((ast) => ({ ast, operations: ["is"] as const })));
const genMs = performance.now() - t;
const aotPath = join(dir, "effect-aot.gen.js");
writeFileSync(aotPath, code);

// Runtime: import, install, validate.
const before = snap();
t = performance.now();
const aot = await import(aotPath);
aot.install(asts);
const installMs = performance.now() - t;
const afterInstall = snap();
const validators = new Map<string, (v: unknown) => boolean>();
const validate = (name: string, v: unknown) => {
  let f = validators.get(name);
  if (!f) validators.set(name, (f = S.is(S.toEncoded(mod[`$${name}`]))));
  return f(v);
};
t = performance.now();
let ok = 0;
for (const s of samples) if (validate(s.name, s.valid)) ok++;
const firstMs = performance.now() - t;
const afterFirst = snap();
let rejected = 0,
  broken = 0;
for (const s of samples)
  if (s.broken !== undefined) {
    broken++;
    if (!validate(s.name, s.broken)) rejected++;
  }
const rounds = Math.max(1, Math.round(4000 / samples.length));
for (let r = 0; r < rounds; r++) for (const s of samples) validate(s.name, s.valid);
t = performance.now();
for (let r = 0; r < rounds; r++) for (const s of samples) validate(s.name, s.valid);
const us = ((performance.now() - t) * 1000) / (rounds * samples.length);
const kb = (n: number) => `${(n / 1024).toFixed(0)} KB`;
console.log(
  `${corpusName} (${dedupeDir}): ${shapeNames.length} shapes; AOT source ${kb(code.length)} generated in ${genMs.toFixed(0)} ms; ` +
    `import+install ${kb(afterInstall - before)} ${installMs.toFixed(0)} ms; first use ${kb(afterFirst - afterInstall)} ${firstMs.toFixed(0)} ms; ` +
    `${us.toFixed(2)} µs/validate; correct ${ok}/${samples.length} ${rejected}/${broken}`,
);
