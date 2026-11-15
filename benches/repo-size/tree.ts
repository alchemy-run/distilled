/**
 * What a checkout of this repo holds, by kind of file: the categories the
 * repo-size lab (lab.ts) and the `Benchmarks` CI job (benches/sdks/ci.ts)
 * both report. Reads git objects only, so it needs no checkout and no build.
 */
import { execFileSync } from "node:child_process";

/** One name per kind of tracked file. Order matters: first match wins. */
export const CATEGORIES: {
  id: string;
  label: string;
  test: (path: string, size: number) => boolean;
}[] = [
  {
    id: "generated-specs",
    label: "Converted specs (.generated-specs/)",
    test: (p) => /^packages\/[^/]+\/\.generated-(specs|graphql)\//.test(p),
  },
  {
    id: "services",
    label: "Generated SDK source (src/services/)",
    // Older layouts generated into src/*.ts directly (stripe, posthog): any
    // src file over 200 KB counts as generated.
    test: (p, size) =>
      /^([^/]+\/){0,2}src\/(services|unstable-services)\//.test(p) ||
      (/^packages\/[^/]+\/src\//.test(p) && size > 200_000),
  },
  {
    id: "in-tree-specs",
    label: "Raw specs committed in the repo (before the spec mirrors)",
    test: (p) =>
      p.startsWith("aws-models/") ||
      /^packages\/[^/]+\/(specs|manual-specs|models|smithy|aws-models)\//.test(p),
  },
  {
    id: "patches",
    label: "Spec patches (patches/)",
    test: (p) => /^packages\/[^/]+\/patches\//.test(p),
  },
  {
    id: "handwritten",
    label: "Hand-written SDK code and tests",
    test: (p) => p.startsWith("packages/"),
  },
  { id: "benches", label: "Benchmarks (benches/)", test: (p) => p.startsWith("benches/") },
  {
    id: "other",
    label: "Everything else (website, stacks, scripts, lockfile, docs)",
    test: () => true,
  },
];

export const categoryOf = (path: string, size: number) =>
  CATEGORIES.find((c) => c.test(path, size))!.id;

export type Totals = Record<string, { bytes: number; files: number }>;

export const emptyTotals = (): Totals =>
  Object.fromEntries(CATEGORIES.map((c) => [c.id, { bytes: 0, files: 0 }]));

export interface Blob {
  readonly oid: string;
  readonly size: number;
  readonly path: string;
}

/** Every file tracked at `rev` (submodule gitlinks excluded), with its size. */
export const blobsAt = (rev: string, cwd: string): Blob[] =>
  execFileSync("git", ["ls-tree", "-r", "-l", "--full-tree", rev], {
    cwd,
    encoding: "utf8",
    maxBuffer: 1 << 30,
  })
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const [meta, path] = line.split("\t");
      const [, type, oid, size] = meta!.split(/\s+/);
      return type === "blob" ? [{ oid: oid!, size: Number(size), path: path! }] : [];
    });

export interface TreeSize {
  /** Bytes of every tracked file: what a checkout writes to disk, before block rounding. */
  readonly bytes: number;
  readonly files: number;
  readonly categories: Totals;
}

/** Tracked bytes at `rev`, by category. */
export const treeSize = (rev: string, cwd: string): TreeSize => {
  const categories = emptyTotals();
  let bytes = 0;
  let files = 0;
  for (const b of blobsAt(rev, cwd)) {
    const c = categories[categoryOf(b.path, b.size)]!;
    c.bytes += b.size;
    c.files += 1;
    bytes += b.size;
    files += 1;
  }
  return { bytes, files, categories };
};
