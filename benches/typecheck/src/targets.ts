/**
 * What a typecheck bench target is, and how to find them.
 *
 * A target is one `tsc -b <tsconfig>` invocation plus the list of outputs a
 * "clean" run deletes first. Per-package targets point at the package's own
 * `tsconfig.json` (the SDK, not `tsconfig.scripts.json`); `monorepo` is the
 * root `tsconfig.json`, i.e. exactly what `pnpm typecheck` / `pnpm
 * typecheck:ci` run.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export const REPO_ROOT = resolve(new URL("../../..", import.meta.url).pathname);

export interface Target {
  /** Short name used in the table and `--filter` (`core`, `aws`, `monorepo`). */
  readonly name: string;
  /** Path to the tsconfig, relative to the repo root. */
  readonly tsconfig: string;
  /**
   * Paths (relative to the repo root) removed before a clean run: the emit
   * directory and the incremental build state. Referenced projects are NOT
   * cleaned unless listed here.
   */
  readonly outputs: ReadonlyArray<string>;
  /** `src/**` size, for context in the table. */
  readonly srcFiles: number;
  readonly srcBytes: number;
}

interface PackageInfo {
  readonly dir: string;
  readonly name: string;
  readonly short: string;
}

/** Everything the emit + build state of one package lands in. */
const packageOutputs = (dir: string): ReadonlyArray<string> => [
  join(dir, "lib"),
  join(dir, "tsconfig.tsbuildinfo"),
  join(dir, ".scripts-types"),
];

const walk = (dir: string): { files: number; bytes: number } => {
  let files = 0;
  let bytes = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const d = stack.pop()!;
    if (!existsSync(d)) continue;
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, entry.name);
      if (entry.isDirectory()) stack.push(p);
      else if (entry.isFile() && (p.endsWith(".ts") || p.endsWith(".json"))) {
        files++;
        bytes += statSync(p).size;
      }
    }
  }
  return { files, bytes };
};

/**
 * SDK packages in the order the root tsconfig references them. Only
 * `packages/<x>/tsconfig.json` entries count; the `tsconfig.scripts.json`
 * siblings are the generator scripts, not the SDK.
 */
const listPackages = (): ReadonlyArray<PackageInfo> => {
  const root = JSON.parse(
    readFileSync(join(REPO_ROOT, "tsconfig.json"), "utf8"),
  ) as { references: ReadonlyArray<{ path: string }> };
  const out: PackageInfo[] = [];
  for (const ref of root.references) {
    const m = /^\.\/packages\/([^/]+)\/tsconfig\.json$/.exec(ref.path);
    if (!m) continue;
    const dir = `packages/${m[1]}`;
    const pkg = JSON.parse(
      readFileSync(join(REPO_ROOT, dir, "package.json"), "utf8"),
    ) as { name: string };
    out.push({ dir, name: pkg.name, short: m[1]! });
  }
  return out;
};

const packageTarget = (p: PackageInfo): Target => {
  const src = walk(join(REPO_ROOT, p.dir, "src"));
  return {
    name: p.short,
    tsconfig: `${p.dir}/tsconfig.json`,
    outputs: packageOutputs(p.dir),
    srcFiles: src.files,
    srcBytes: src.bytes,
  };
};

/** The default set: the three packages that matter most, plus the whole repo. */
export const DEFAULT_PACKAGES: ReadonlyArray<string> = [
  "core",
  "aws",
  "cloudflare",
];

export const allTargets = (full: boolean): ReadonlyArray<Target> => {
  const packages = listPackages();
  const everything = packages.map(packageTarget);
  const pkgTargets = full
    ? [...everything]
    : everything.filter((t) => DEFAULT_PACKAGES.includes(t.name));
  // Largest first so the slow rows come early and the table reads top-down.
  pkgTargets.sort((a, b) => b.srcBytes - a.srcBytes);
  // `core` is what everything else references; keep it first regardless so
  // it is already built (and checked) before any per-package target runs —
  // otherwise the first package row would also pay for core.
  const core = pkgTargets.findIndex((t) => t.name === "core");
  if (core > 0) pkgTargets.unshift(...pkgTargets.splice(core, 1));

  const monorepo: Target = {
    name: "monorepo",
    tsconfig: "tsconfig.json",
    outputs: packages.flatMap((p) => packageOutputs(p.dir)),
    srcFiles: everything.reduce((n, t) => n + t.srcFiles, 0),
    srcBytes: everything.reduce((n, t) => n + t.srcBytes, 0),
  };
  return [...pkgTargets, monorepo];
};

export const relToRoot = (p: string): string => relative(REPO_ROOT, p) || ".";
