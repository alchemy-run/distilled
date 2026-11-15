/**
 * Bundle time and output size of the published SDKs, per bundler.
 *
 *   node benches/bundlers/run.ts [--runs N] [--only esbuild,vite] [--no-build] [--keep]
 *
 * Builds and packs the SDKs (src/consumer.ts), then bundles each case of
 * src/cases.ts `--runs` times (default `$BENCH_RUNS`, then 3) in this
 * process. `first` is the first build of a case, `median` the median of the
 * rest. Prints a markdown table and writes `.out/results.json`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { outputSize } from "./src/bundlers.ts";
import { caseId, CASES } from "./src/cases.ts";
import { makeConsumer } from "./src/consumer.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const runs = Math.max(1, Number(flag("runs") ?? process.env.BENCH_RUNS ?? 3));
const only = flag("only")?.split(",");
const keep = args.includes("--keep");

const consumer = makeConsumer({ build: !args.includes("--no-build") });
const cases = CASES.filter((c) => !only || only.includes(c.bundler.name));

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length === 0 ? Number.NaN : s[Math.floor((s.length - 1) / 2)]!;
};
const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
const ms = (n: number) => (Number.isNaN(n) ? "-" : `${Math.round(n)} ms`);

const results = [];
for (const c of cases) {
  const outDir = path.join(consumer.dir, "out", `${c.bundler.name}-${c.target}-${c.fixture}`);
  const times: number[] = [];
  let errors: ReadonlyArray<string> = [];
  let warnings: ReadonlyArray<string> = [];
  for (let i = 0; i < runs; i++) {
    fs.rmSync(outDir, { recursive: true, force: true });
    const start = performance.now();
    const bundle = await c.bundler.build(consumer.fixture(c.fixture), outDir, c.target);
    times.push(performance.now() - start);
    ({ errors, warnings } = bundle);
    if (errors.length > 0) break;
  }
  const size = errors.length > 0 ? { files: 0, bytes: 0, gzip: 0 } : outputSize(outDir);
  results.push({
    case: caseId(c),
    bundler: c.bundler.name,
    target: c.target,
    fixture: c.fixture,
    firstMs: times[0]!,
    medianMs: median(times.slice(1)),
    ...size,
    errors,
    warnings,
  });
  console.error(`${caseId(c)}: ${ms(times[0]!)}${errors.length ? ` (${errors[0]})` : ""}`);
}

const versions = {
  node: process.versions.node,
  esbuild: (await import("esbuild")).version,
  rolldown: (await import("rolldown")).VERSION,
  vite: (await import("vite")).version,
  webpack: (await import("webpack")).default.version,
};

console.log(
  [
    `Bundling the published SDKs (${Object.entries(versions)
      .map(([k, v]) => `${k} ${v}`)
      .join(", ")}; ${runs} runs)`,
    "",
    "| bundler | target | first | median | files | bytes | gzip | warnings |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...results.map((r) =>
      r.errors.length > 0
        ? `| ${r.bundler} | ${r.target} | failed: ${r.errors[0]} | | | | | |`
        : `| ${r.bundler} | ${r.target} | ${ms(r.firstMs)} | ${ms(r.medianMs)} | ${r.files} | ${kb(r.bytes)} | ${kb(r.gzip)} | ${r.warnings.length} |`,
    ),
  ].join("\n"),
);

const out = path.join(here, ".out");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(
  path.join(out, "results.json"),
  JSON.stringify({ date: new Date().toISOString(), runs, versions, results }, null, 2),
);
if (keep) console.error(`bundles kept in ${consumer.dir}`);
else fs.rmSync(consumer.dir, { recursive: true, force: true });
