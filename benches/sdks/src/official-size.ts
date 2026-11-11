/**
 * Download size of an installed package and everything `npm install` would
 * fetch with it: the package plus its dependencies, optional dependencies and
 * peer dependencies, transitively, each counted once. Runs with no network.
 *
 * Each package's tarball is rebuilt locally: tar of its files under
 * `package/` in npm's order (by extension, then path, so similar files
 * compress together), gzip -9: within 0.2-1% of `npm pack`. An installed package holds
 * exactly its published files; a workspace package uses the file list from
 * `npm pack --dry-run`. (`npm pack` itself crashes in pnpm's store.) Used for
 * the official SDKs and for the distilled package each one is compared with,
 * so both sides are measured the same way.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { gzipSync } from "node:zlib";

export interface InstallSize {
  /** gzipped tarball of the package alone */
  readonly tarball: number;
  /** gzipped tarballs of the package and every dependency it installs */
  readonly withDeps: number;
  readonly unpackedWithDeps: number;
  /** packages counted, including the package itself */
  readonly packages: number;
}

/** Node's lookup: the nearest node_modules/<name> above `from`. */
const findDep = (from: string, name: string): string | undefined => {
  for (let d = from; d !== dirname(d); d = dirname(d)) {
    const c = basename(d) === "node_modules" ? join(d, name) : join(d, "node_modules", name);
    if (existsSync(join(c, "package.json"))) return realpathSync(c);
  }
  return undefined;
};

const listFiles = (dir: string): string[] => {
  if (!dir.includes(`/node_modules/`)) {
    const r = spawnSync("npm", ["pack", "--dry-run", "--json", "--offline", "--ignore-scripts"], {
      cwd: dir,
      encoding: "utf8",
      maxBuffer: 1 << 28,
    });
    const out = r.stdout.slice(r.stdout.indexOf("["));
    return (JSON.parse(out)[0].files as Array<{ path: string }>).map((f) => f.path);
  }
  const files: string[] = [];
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name === "node_modules") continue;
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) files.push(relative(dir, p));
    }
  };
  walk(dir);
  return files;
};

const packed = new Map<string, { tarball: number; unpacked: number }>();
const pack = (dir: string) => {
  let p = packed.get(dir);
  if (!p) {
    const files = listFiles(dir).sort(
      (a, b) =>
        extname(a).toLowerCase().localeCompare(extname(b).toLowerCase(), "en") ||
        a.localeCompare(b, "en"),
    );
    const tar = spawnSync(
      "tar",
      [
        "--owner=0",
        "--group=0",
        "--numeric-owner",
        "--mtime=@0",
        "--transform=s,^,package/,",
        "-cf",
        "-",
        "-C",
        dir,
        "-T",
        "-",
      ],
      { input: files.join("\n"), maxBuffer: 1 << 30 },
    );
    if (tar.status !== 0) throw new Error(`tar failed in ${dir}: ${tar.stderr}`);
    p = {
      tarball: gzipSync(tar.stdout, { level: 9 }).byteLength,
      unpacked: files.reduce((a, f) => a + statSync(join(dir, f)).size, 0),
    };
    packed.set(dir, p);
  }
  return p;
};

/** Every directory `npm install` would put on disk for the package at `root`. */
const closure = (root: string): string[] => {
  const seen = new Set<string>();
  const queue = [realpathSync(root)];
  while (queue.length) {
    const dir = queue.pop()!;
    if (seen.has(dir)) continue;
    seen.add(dir);
    const pj = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    const optionalPeers = new Set(
      Object.entries(pj.peerDependenciesMeta ?? {})
        .filter(([, m]: [string, any]) => m?.optional)
        .map(([n]) => n),
    );
    const names = [
      ...Object.keys(pj.dependencies ?? {}),
      ...Object.keys(pj.optionalDependencies ?? {}),
      ...Object.keys(pj.peerDependencies ?? {}).filter((n) => !optionalPeers.has(n)),
    ];
    for (const n of names) {
      const d = findDep(dir, n);
      if (d && !seen.has(d)) queue.push(d);
    }
  }
  return [...seen];
};

/** Install size of the packages at `roots`, installed together: shared dependencies count once. */
export const installSize = (roots: ReadonlyArray<string>): InstallSize => {
  const dirs = [...new Set(roots.flatMap(closure))];
  const sizes = dirs.map(pack);
  const own = roots.map((r) => pack(realpathSync(r)));
  return {
    tarball: own.reduce((a, s) => a + s.tarball, 0),
    withDeps: sizes.reduce((a, s) => a + s.tarball, 0),
    unpackedWithDeps: sizes.reduce((a, s) => a + s.unpacked, 0),
    packages: dirs.length,
  };
};
