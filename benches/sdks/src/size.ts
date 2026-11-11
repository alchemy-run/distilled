/**
 * Download size: what `npm pack` would publish for each package (tarball
 * and unpacked bytes, file count) split into sources, JS, declarations and
 * source maps, plus the generated-code footprint and the install size with
 * `@distilled.cloud/core` and `effect`.
 *
 * `npm pack --dry-run --offline` reads the package's `files` list locally;
 * it needs `lib/` to exist (`tsc -b`).
 */
import { readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { join } from "node:path";
import { countOperations } from "./targets.ts";
import { BENCH_DIR, lastJsonLine, PACKAGES, run } from "./util.ts";

export interface SizeResult {
  readonly tarball: number;
  readonly unpacked: number;
  readonly files: number;
  readonly srcBytes: number;
  readonly jsBytes: number;
  readonly dtsBytes: number;
  readonly mapBytes: number;
  readonly generatedBytes: number;
  readonly generatedLines: number;
  readonly services: number;
  readonly operations: number;
  /** unpacked + core unpacked + effect unpacked */
  readonly installBytes?: number;
}

export const packSize = async (
  dir: string,
): Promise<Omit<SizeResult, "generatedBytes" | "generatedLines" | "services" | "operations">> => {
  const res = await run("npm", ["pack", "--dry-run", "--json", "--offline", "--ignore-scripts"], {
    cwd: dir,
    timeoutMs: 300_000,
  });
  const text = res.stdout.slice(res.stdout.indexOf("["));
  let info: any;
  try {
    info = JSON.parse(text)[0];
  } catch {
    info = lastJsonLine(res.stdout);
  }
  if (!info)
    throw new Error(`npm pack failed: ${res.stderr.trim().split("\n").slice(-2).join(" ")}`);
  let srcBytes = 0;
  let jsBytes = 0;
  let dtsBytes = 0;
  let mapBytes = 0;
  for (const f of info.files as Array<{ path: string; size: number }>) {
    if (f.path.endsWith(".map")) mapBytes += f.size;
    else if (f.path.endsWith(".d.ts")) dtsBytes += f.size;
    else if (f.path.startsWith("src/")) srcBytes += f.size;
    else if (f.path.endsWith(".js")) jsBytes += f.size;
  }
  return {
    tarball: info.size,
    unpacked: info.unpackedSize,
    files: info.entryCount,
    srcBytes,
    jsBytes,
    dtsBytes,
    mapBytes,
  };
};

const walk = (dir: string, fn: (path: string) => void) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, fn);
    else fn(p);
  }
};

const generated = (pkg: string) => {
  let bytes = 0;
  let lines = 0;
  try {
    walk(join(PACKAGES, pkg, "src", "services"), (p) => {
      if (!p.endsWith(".ts")) return;
      const text = readFileSync(p);
      bytes += text.byteLength;
      for (let i = 0; i < text.length; i++) if (text[i] === 10) lines++;
    });
  } catch {}
  return { generatedBytes: bytes, generatedLines: lines };
};

export const sizeOf = async (pkg: string): Promise<SizeResult> => ({
  ...(await packSize(join(PACKAGES, pkg))),
  ...generated(pkg),
  ...countOperations(pkg),
});

/** Unpacked size of the installed `effect` package (what npm puts on disk). */
export const effectSize = (): { version: string; unpacked: number; files: number } => {
  const dir = realpathSync(join(BENCH_DIR, "node_modules", "effect"));
  let unpacked = 0;
  let files = 0;
  walk(dir, (p) => {
    if (p.slice(dir.length).includes("/node_modules/")) return;
    unpacked += statSync(p).size;
    files++;
  });
  const version = JSON.parse(readFileSync(join(dir, "package.json"), "utf8")).version;
  return { version, unpacked, files };
};
