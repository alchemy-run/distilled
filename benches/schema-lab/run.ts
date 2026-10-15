/**
 * Schema lab: the same real shapes (extracted by extract.ts) in several
 * schema representations, measured on what distilled pays for schemas.
 *
 *   node --conditions=bun --expose-gc run.ts [corpus…] [--only cand,cand]
 *
 * Per (corpus, candidate):
 *   source      generated module size, raw and gzip
 *   import      heap retained and time to import the module (libraries preloaded)
 *   first       heap and time to validate one sample of every operation output once
 *   steady      µs per validation after warm-up
 *   correct     samples accepted / broken samples rejected (must be all / all)
 *   bundle      gzip of a minified bundle that imports ONE operation's output
 *               shape and validates it (tree-shaking test)
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { annotateNestedCalls } from "@distilled.cloud/core/codegen/pure";
import { rolldown } from "rolldown";
import { applyDedupe, dedupe } from "./src/dedupe.ts";
import { CANDIDATES, emit, type Candidate } from "./src/emit.ts";
import type { Corpus } from "./src/ir.ts";
import { broken, sample } from "./src/samples.ts";
const DEDUPE = process.argv.includes("--dedupe");

const LAB = import.meta.dirname;
const OUT = join(LAB, ".out");
const RUNTIME = join(LAB, "src", "desc-runtime.js");
const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const only = onlyIdx >= 0 ? (args[onlyIdx + 1]!.split(",") as Candidate[]) : CANDIDATES;
const corpora = args.filter((a, i) => !a.startsWith("--") && (onlyIdx < 0 || i !== onlyIdx + 1));
const names = corpora.length
  ? corpora
  : readdirSync(join(OUT, "corpus")).map((f) => f.replace(/\.json$/, ""));

const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;

/** What a bundle entry ships to validate one shape with each candidate. */
const entryFor = (cand: Candidate, mod: string, shape: string): string => {
  const id = `$${shape.replace(/[^A-Za-z0-9_$]/g, "_")}`;
  switch (cand) {
    case "effect-eager":
    case "effect-lazy":
    case "effect-jit":
      return `import * as S from ${JSON.stringify(cand === "effect-eager" ? "effect/Schema" : "@distilled.cloud/core/schema")};\nimport { ${id} } from ${JSON.stringify(mod)};\nconst is = S.is(S.toEncoded(${id}));\nexport default (v) => is(v);`;
    case "valibot":
      return `import * as v from "valibot";\nimport { ${id} } from ${JSON.stringify(mod)};\nexport default (x) => v.is(${id}, x);`;
    case "zod-mini":
      return `import { ${id} } from ${JSON.stringify(mod)};\nexport default (x) => ${id}.safeParse(x).success;`;
    case "typebox":
      return `import { Value } from "typebox/value";\nimport { ${id} } from ${JSON.stringify(mod)};\nexport default (x) => Value.Check(${id}, x);`;
    case "desc-obj":
    case "desc-pruned":
      return `import { validate } from ${JSON.stringify(RUNTIME)};\nimport { ${id} } from ${JSON.stringify(mod)};\nexport default (x) => validate(${id}, x);`;
    case "desc-str":
      return `import { validateStr } from ${JSON.stringify(RUNTIME)};\nimport { ${id} } from ${JSON.stringify(mod)};\nexport default (x) => validateStr(${id}, x);`;
  }
};

const bundle = async (entryPath: string): Promise<number> => {
  const b = await rolldown({
    input: entryPath,
    cwd: LAB,
    platform: "neutral",
    resolve: { conditionNames: ["bun", "import", "default"] },
    treeshake: true,
    onLog() {},
  });
  const out = await b.generate({ format: "esm", minify: true });
  const code = (out.output[0] as any).code as string;
  return gzipSync(code, { level: 9 }).length;
};

const results: Record<string, Record<string, any>> = {};

for (const corpusName of names) {
  const raw: Corpus = JSON.parse(readFileSync(join(OUT, "corpus", `${corpusName}.json`), "utf8"));
  const corpus = DEDUPE ? applyDedupe(raw, dedupe(raw)) : raw;
  const dir = join(OUT, DEDUPE ? "mods-dedupe" : "mods", corpusName);
  mkdirSync(dir, { recursive: true });

  // Samples: every operation output (capped), plus a broken copy each.
  const ops = corpus.operations.filter((o) => corpus.shapes[o.output]).slice(0, 200);
  const samples = ops.map((o) => {
    const valid = sample(corpus, o.output);
    return { name: o.output, valid, broken: broken(valid) };
  });
  const samplesPath = join(dir, "samples.json");
  writeFileSync(samplesPath, JSON.stringify(samples));

  // One mid-sized operation for the bundle test: the op whose output reaches the median number of shapes.
  const bundleOp = ops[Math.floor(ops.length / 2)]!;

  console.log(
    `\n== ${corpusName}: ${Object.keys(corpus.shapes).length} shapes, ${samples.length} sampled outputs, bundle op ${bundleOp.name} -> ${bundleOp.output}`,
  );
  console.log(
    [
      "candidate".padEnd(14),
      "source",
      "gzip",
      "import heap",
      "import ms",
      "1st-use heap",
      "1st ms",
      "µs/validate",
      "correct",
      "1-op bundle gz",
    ]
      .map((h, i) => (i ? h.padStart(13) : h))
      .join(""),
  );
  results[corpusName] = {};
  for (const cand of only) {
    const modPath = join(dir, `${cand}.js`);
    // The same PURE pass distilled's generator applies, so every candidate can tree-shake.
    const src = annotateNestedCalls(emit(corpus, cand, modPath, RUNTIME), `${cand}.js`);
    writeFileSync(modPath, src);
    let probe: any;
    try {
      const out = execFileSync(
        "node",
        [
          "--conditions=bun",
          "--expose-gc",
          "--max-old-space-size=8000",
          join(LAB, "src", "probe.ts"),
          modPath,
          samplesPath,
        ],
        {
          cwd: LAB,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
          env: { ...process.env, FORCE_COLOR: "", NO_COLOR: "1" },
        },
      );
      probe = JSON.parse(out.trim().split("\n").at(-1)!);
    } catch (e: any) {
      probe = {
        error: String(e.stderr ?? e)
          .split("\n")
          .filter((l: string) => /Error|error/.test(l))
          .slice(0, 2)
          .join(" | ")
          .slice(0, 200),
      };
    }
    const entryPath = join(dir, `entry-${cand}.js`);
    writeFileSync(entryPath, entryFor(cand, modPath, bundleOp.output));
    let bundleGz: number | undefined;
    try {
      bundleGz = await bundle(entryPath);
    } catch (e) {
      bundleGz = undefined;
    }
    const r = { source: src.length, sourceGz: gzipSync(src).length, bundleGz, ...probe };
    results[corpusName][cand] = r;
    if (probe.error) {
      console.log(`${cand.padEnd(14)} ERROR ${probe.error}`);
      continue;
    }
    console.log(
      [
        cand.padEnd(14),
        kb(r.source),
        kb(r.sourceGz),
        kb(r.importHeap),
        `${r.importMs.toFixed(0)} ms`,
        kb(r.firstHeap),
        `${r.firstMs.toFixed(0)} ms`,
        r.steadyUs.toFixed(2),
        `${r.accepted}/${r.samples} ${r.rejected}/${r.broken}`,
        bundleGz === undefined ? "error" : kb(bundleGz),
      ]
        .map((c, i) => (i ? String(c).padStart(13) : c))
        .join(""),
    );
  }
}
writeFileSync(
  join(OUT, DEDUPE ? "results-dedupe.json" : "results.json"),
  JSON.stringify(results, null, 2),
);
