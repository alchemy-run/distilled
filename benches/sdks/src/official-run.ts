/**
 * Run the official-SDK programs (official.ts): bundle each with the same
 * rolldown settings as distilled programs, and probe it 3 times in fresh
 * processes (medians), with object counts in a separate process. Also the
 * download size of each official SDK with its dependencies, and of the
 * distilled package it is compared with, measured the same way.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { rolldown } from "rolldown";
import { inputOptions, outputOptions, type BuildVariant } from "../../bundle/src/options.ts";
import { installSize, type InstallSize } from "./official-size.ts";
import { OFFICIAL } from "./official.ts";
import { loadTargets } from "./targets.ts";
import { BENCH_DIR, lastJsonLine, OUT, PACKAGES, run } from "./util.ts";

const VARIANT: BuildVariant = { conditions: "node", pure: true, minify: true };
const PROBE = join(BENCH_DIR, "src", "official-probe.ts");

const bundleOne = async (id: string, source: string) => {
  const dir = join(OUT, "official", id.replace(/\W+/g, "_"));
  mkdirSync(dir, { recursive: true });
  const entry = join(dir, "entry.mjs");
  writeFileSync(entry, source);
  const stats = {
    matchedModules: 0,
    annotatedModules: 0,
    annotations: 0,
    sideEffectFreeModules: 0,
  };
  const b = await rolldown({ ...inputOptions(entry, BENCH_DIR, VARIANT, stats), onLog() {} });
  // One file, like distilled programs: dynamic imports are inlined.
  const out = await b.generate({
    ...outputOptions(join(dir, "dist"), VARIANT),
    codeSplitting: false,
  });
  await b.close();
  const code = out.output
    .filter((o) => o.type === "chunk")
    .map((o: any) => o.code)
    .join("\n");
  return { bytes: Buffer.byteLength(code), gzip: gzipSync(code, { level: 9 }).byteLength };
};

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[xs.length >> 1]!;

export const runOfficial = async (opts: { budgetMs: number; log: (s: string) => void }) => {
  const targets = loadTargets();
  const out: Record<string, unknown> = {};
  const distilledSize = new Map<string, InstallSize | { error: string }>();
  const sizeOrError = (roots: string[]) => {
    try {
      return installSize(roots);
    } catch (e) {
      return { error: String(e).slice(0, 300) };
    }
  };
  for (const p of OFFICIAL) {
    const t = targets[p.compare.pkg]?.[p.compare.protocol];
    if (!t) continue;
    const dir = join(OUT, "official", p.id.replace(/\W+/g, "_"));
    mkdirSync(dir, { recursive: true });
    const setup = join(dir, "setup.mjs");
    writeFileSync(setup, p.setup);
    const canned = JSON.stringify(t.response);
    const probe = async (objects: boolean) => {
      const r = await run(
        "node",
        ["--expose-gc", PROBE, setup, canned, String(opts.budgetMs), ...(objects ? ["1"] : [])],
        {
          timeoutMs: 300_000,
        },
      );
      return (
        lastJsonLine<any>(r.stdout) ?? { error: r.stderr.trim().split("\n").slice(-2).join(" | ") }
      );
    };
    const samples = [await probe(false), await probe(false), await probe(false)];
    const errors = samples.filter((s) => s.error);
    const ok = samples.filter((s) => !s.error);
    const counted = await probe(true);
    const pick = (k: string) => (ok.length ? median(ok.map((s) => s[k])) : undefined);
    let bundle: unknown;
    try {
      bundle = await bundleOne(p.id, p.bundle);
    } catch (e) {
      bundle = { error: String(e).slice(0, 300) };
    }
    if (!distilledSize.has(p.compare.pkg))
      distilledSize.set(p.compare.pkg, sizeOrError([join(PACKAGES, p.compare.pkg)]));
    out[p.id] = {
      label: p.label,
      packages: p.packages,
      compare: p.compare,
      bundle,
      size: {
        ...sizeOrError(p.packages.map((n) => join(BENCH_DIR, "node_modules", n))),
        distilled: distilledSize.get(p.compare.pkg),
      },
      runtime: {
        importMs: pick("importMs"),
        importHeap: pick("importHeap"),
        firstCallMs: pick("firstCallMs"),
        firstCallHeap: pick("firstCallHeap"),
        addedP50Us: pick("addedP50Us"),
        importObjects: counted.importObjects,
        firstCallObjects: counted.firstCallObjects,
      },
      ...(errors.length ? { error: errors[0].error } : {}),
    };
    const r = out[p.id] as any;
    opts.log(
      `  ${p.id}: download ${((r.size?.withDeps ?? 0) / 1048576).toFixed(1)} MB gz with deps, bundle ${((r.bundle?.gzip ?? 0) / 1024).toFixed(1)} KB gz, import ${((r.runtime.importHeap ?? 0) / 1024).toFixed(0)} KB, ` +
        `${r.runtime.importObjects ?? "?"} objects, +${r.runtime.addedP50Us?.toFixed(1) ?? "?"} us/call${r.error ? ` ERROR ${r.error}` : ""}`,
    );
  }
  return out;
};
