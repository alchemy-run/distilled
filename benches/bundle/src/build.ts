/**
 * One fixture × one variant, built `runs` times in this process. Spawned by
 * `run.ts` as a fresh `bun` process per fixture so the first build is a true
 * cold start (native binding load, resolver caches, plugin package cache);
 * later builds in the same process are the warm number.
 *
 * Usage: `bun src/build.ts '<BuildRequest json>'` — prints `BuildResult` JSON.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { gzipSync } from "node:zlib";
import { rolldown } from "rolldown";
import { analyzeModule, type ModuleAnalysis } from "./analyze.ts";
import { inputOptions, outputOptions, type BuildVariant } from "./options.ts";
import type { PurePluginStats } from "./pure-plugin.ts";

export interface BuildRequest {
  readonly entry: string;
  readonly cwd: string;
  readonly outDir: string;
  readonly variant: BuildVariant;
  readonly runs: number;
}

export interface ModuleShare {
  readonly id: string;
  readonly renderedLength: number;
  readonly renderedExports: number;
}

export interface BuildResult {
  readonly timesMs: number[];
  readonly bytes: number;
  readonly gzipBytes: number;
  readonly moduleCount: number;
  readonly outputFile: string;
  readonly pure: PurePluginStats;
  /** Per-module rendered (post-treeshake, pre-minify) sizes. */
  readonly modules: ModuleShare[];
  /** What survived inside the distilled service modules. */
  readonly services: ModuleAnalysis[];
  readonly warnings: string[];
}

const SERVICE_MODULE_RE =
  /\/packages\/[^/]+\/src\/services\/(?!index\.ts$)[^/]+\.ts$/;

const emptyStats = (): PurePluginStats => ({
  matchedModules: 0,
  annotatedModules: 0,
  annotations: 0,
  sideEffectFreeModules: 0,
});

export async function buildOnce(req: BuildRequest) {
  const stats = emptyStats();
  const warnings: string[] = [];
  const t0 = performance.now();
  const bundle = await rolldown({
    ...inputOptions(req.entry, req.cwd, req.variant, stats),
    onLog(level, log) {
      if (level === "warn") warnings.push(String(log.message ?? log));
    },
  });
  const out = await bundle.write(outputOptions(req.outDir, req.variant));
  await bundle.close();
  const ms = performance.now() - t0;
  const chunk = out.output.find((o) => o.type === "chunk" && o.isEntry);
  if (!chunk || chunk.type !== "chunk") throw new Error("no entry chunk");
  return { ms, chunk, stats, warnings };
}

export async function build(req: BuildRequest): Promise<BuildResult> {
  await fs.rm(req.outDir, { recursive: true, force: true });
  await fs.mkdir(req.outDir, { recursive: true });
  const timesMs: number[] = [];
  let last: Awaited<ReturnType<typeof buildOnce>> | undefined;
  for (let i = 0; i < Math.max(1, req.runs); i++) {
    last = await buildOnce(req);
    timesMs.push(last.ms);
  }
  const { chunk, stats, warnings } = last!;
  const code = chunk.code;
  const modules = Object.entries(chunk.modules)
    .map(([id, m]) => ({
      id,
      renderedLength: m.renderedLength,
      renderedExports: m.renderedExports.length,
    }))
    .filter((m) => m.renderedLength > 0)
    .sort((a, b) => b.renderedLength - a.renderedLength);
  const rendered = Object.entries(chunk.modules).filter(
    ([, m]) => m.renderedLength > 0 && m.code,
  );
  const services = rendered
    .filter(([id]) => SERVICE_MODULE_RE.test(id))
    .map(([id, m]) =>
      analyzeModule(
        id,
        m.code!,
        rendered
          .filter(([other]) => other !== id)
          .map(([, o]) => o.code!)
          .join("\n"),
      ),
    );
  return {
    timesMs,
    bytes: Buffer.byteLength(code),
    gzipBytes: gzipSync(code).byteLength,
    moduleCount: chunk.moduleIds.length,
    outputFile: path.join(req.outDir, chunk.fileName),
    pure: stats,
    modules,
    services,
    warnings,
  };
}

if (import.meta.main) {
  const req = JSON.parse(process.argv[2] ?? "{}") as BuildRequest;
  build(req).then(
    (res) => {
      process.stdout.write(JSON.stringify(res));
    },
    (err) => {
      console.error(err);
      process.exit(1);
    },
  );
}
