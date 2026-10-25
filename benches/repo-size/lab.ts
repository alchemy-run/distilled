/**
 * Repo-size lab: what a distilled checkout costs on disk, where the bytes
 * are, and what each way of shrinking it would save. Writes
 * `benches/dashboard/repo-size/lab.json`, which the dashboard's Repo size
 * page reads.
 *
 *   node benches/repo-size/lab.ts                  # everything
 *   node benches/repo-size/lab.ts --skip worktree,clone,timeline,local
 *
 * Sections:
 * - tree:        tracked bytes at HEAD by category and by package (git ls-tree)
 * - composition: what the generated TypeScript and the converted specs are
 *                made of (docs, PURE markers, indentation, code)
 * - clone:       bytes a `git clone --depth=1` downloads (git pack-objects
 *                over HEAD's objects), for each option
 * - worktree:    time and disk of `git worktree add`, full and sparse
 * - local:       this machine: object store, worktrees, node_modules, lib/
 * - timeline:    tracked bytes by category across main's history (GitHub
 *                trees API, cached in ~/.cache/distilled-repo-size)
 *
 * Read-only on the checkout. The worktree section adds two temporary
 * worktrees under ~/.cache/distilled-repo-size and removes them.
 */
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = join(import.meta.dirname, "..", "..");
const OUT = join(ROOT, "benches", "dashboard", "repo-size", "lab.json");
const CACHE = join(homedir(), ".cache", "distilled-repo-size");
const REPO = "alchemy-run/distilled";

const argv = process.argv.slice(2);
const skipArg = argv.indexOf("--skip");
const skip = new Set(skipArg >= 0 ? (argv[skipArg + 1] ?? "").split(",") : []);

const sh = (cmd: string, args: string[], opts: { cwd?: string; input?: string } = {}): string =>
  execFileSync(cmd, args, {
    cwd: opts.cwd ?? ROOT,
    input: opts.input,
    encoding: "utf8",
    maxBuffer: 1 << 30,
    stdio: ["pipe", "pipe", "pipe"],
  });
const git = (args: string[], cwd = ROOT) => sh("git", args, { cwd });
const log = (msg: string) => process.stderr.write(`[repo-size] ${msg}\n`);
const MB = (n: number) => `${(n / 1048576).toFixed(1)} MB`;

//#region categories

/** One name per kind of tracked file. Order matters: first match wins. */
const CATEGORIES: { id: string; label: string; test: (path: string, size: number) => boolean }[] = [
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
const categoryOf = (path: string, size: number) => CATEGORIES.find((c) => c.test(path, size))!.id;

const emptyTotals = () =>
  Object.fromEntries(CATEGORIES.map((c) => [c.id, { bytes: 0, files: 0 }])) as Record<
    string,
    { bytes: number; files: number }
  >;

type Blob = { oid: string; size: number; path: string };

const headBlobs = (): Blob[] =>
  git(["ls-tree", "-r", "-l", "--full-tree", "HEAD"])
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const [meta, path] = line.split("\t");
      const [, type, oid, size] = meta!.split(/\s+/);
      return type === "blob" ? [{ oid: oid!, size: Number(size), path: path! }] : [];
    });

//#endregion

//#region tree

const treeSection = (blobs: Blob[]) => {
  const totals = emptyTotals();
  const packages: Record<string, Record<string, number>> = {};
  for (const b of blobs) {
    const c = categoryOf(b.path, b.size);
    totals[c]!.bytes += b.size;
    totals[c]!.files += 1;
    const pkg = /^packages\/([^/]+)\//.exec(b.path)?.[1];
    if (pkg) {
      packages[pkg] ??= {};
      packages[pkg][c] = (packages[pkg][c] ?? 0) + b.size;
    }
  }
  const bytes = blobs.reduce((s, b) => s + b.size, 0);
  const pkgRows = Object.entries(packages)
    .map(([name, byCat]) => ({
      name,
      bytes: Object.values(byCat).reduce((s, n) => s + n, 0),
      byCategory: byCat,
    }))
    .sort((a, b) => b.bytes - a.bytes);
  return { bytes, files: blobs.length, categories: totals, packages: pkgRows };
};

//#endregion

//#region composition

/**
 * Split generated TypeScript into byte classes with a small scanner that
 * knows strings, template literals and comments.
 */
const classifyTs = (src: string) => {
  const out = { jsdoc: 0, pure: 0, comment: 0, indent: 0, newline: 0, string: 0, code: 0 };
  const n = src.length;
  let i = 0;
  let lineStart = true;
  while (i < n) {
    const ch = src[i]!;
    if (ch === "\n") {
      out.newline++;
      i++;
      lineStart = true;
      continue;
    }
    if (lineStart && (ch === " " || ch === "\t")) {
      out.indent++;
      i++;
      continue;
    }
    lineStart = false;
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      const stop = end < 0 ? n : end + 2;
      const body = src.slice(i, stop);
      let len = stop - i;
      if (/^\/\*\s*[#@]__PURE__\s*\*\/$/.test(body)) {
        if (src[stop] === " ") len++;
        out.pure += len;
      } else if (body.startsWith("/**")) out.jsdoc += len;
      else out.comment += len;
      // Newlines inside comments still count as comment bytes.
      i += len;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      const end = src.indexOf("\n", i);
      const stop = end < 0 ? n : end;
      out.comment += stop - i;
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < n && src[j] !== ch) j += src[j] === "\\" ? 2 : 1;
      out.string += j + 1 - i;
      i = j + 1;
      continue;
    }
    out.code++;
    i++;
  }
  return out;
};

/**
 * Split generated TypeScript by what each top-level statement is: JSDoc
 * blocks, TypeScript types, runtime schemas, operations, error classes.
 */
const STATEMENT_KINDS: [string, RegExp][] = [
  ["types", /^(export )?(interface|type) /],
  ["operations", /^export const \w+: API\.|^export const \w+ = \/\*@__PURE__\*\/ \(?API\./],
  ["errors", /^(export )?class /],
  ["schemas", /^function __c\d+|^(export )?const \w+ = |^__s\[|^function __S/],
  ["imports", /^import /],
];
const DOC_BLOCK = /^[ \t]*\/\*\*(?![ \t]*[@#]__PURE__)[\s\S]*?\*\/[ \t]*\n?/gm;
const statementKinds = (src: string, into: Record<string, number>) => {
  const add = (k: string, n: number) => (into[k] = (into[k] ?? 0) + n);
  const noDoc = src.replace(DOC_BLOCK, (m) => (add("docs", m.length), ""));
  let current = "other";
  for (const line of noDoc.split("\n")) {
    if (/^\S/.test(line) && !/^[})\]>]/.test(line))
      current = STATEMENT_KINDS.find(([, re]) => re.test(line))?.[0] ?? "other";
    add(current, line.length + 1);
  }
};

const walk = (dir: string, keep: (path: string) => boolean, acc: string[] = []): string[] => {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, keep, acc);
    else if (keep(p)) acc.push(p);
  }
  return acc;
};

const compositionSection = () => {
  const pkgs = readdirSync(join(ROOT, "packages"));
  // Generated TypeScript.
  const ts = { files: 0, bytes: 0, gzip: 0, lines: 0, pureMarkers: 0 } as Record<string, number>;
  const classes = { jsdoc: 0, pure: 0, comment: 0, indent: 0, newline: 0, string: 0, code: 0 };
  const kinds: Record<string, number> = {};
  for (const pkg of pkgs) {
    for (const sub of ["services", "unstable-services"]) {
      for (const file of walk(join(ROOT, "packages", pkg, "src", sub), (p) => p.endsWith(".ts"))) {
        const buf = readFileSync(file);
        const src = buf.toString("latin1");
        ts.files! += 1;
        ts.bytes! += buf.length;
        ts.gzip! += gzipSync(buf, { level: 6 }).length;
        ts.lines! += src.split("\n").length;
        ts.pureMarkers! += src.match(/\/\*\s*[#@]__PURE__\s*\*\//g)?.length ?? 0;
        const c = classifyTs(src);
        for (const k of Object.keys(classes) as (keyof typeof classes)[]) classes[k] += c[k];
        statementKinds(src, kinds);
      }
    }
  }
  log(`composition: services ${ts.files} files, ${MB(ts.bytes!)}`);
  // Converted specs: how much is pretty-printing.
  const specs = { files: 0, bytes: 0, minified: 0, gzip: 0 };
  for (const pkg of pkgs) {
    for (const sub of [".generated-specs", ".generated-graphql"]) {
      for (const file of walk(join(ROOT, "packages", pkg, sub), (p) =>
        /\.(json|graphql)$/.test(p),
      )) {
        const buf = readFileSync(file);
        specs.files++;
        specs.bytes += buf.length;
        specs.gzip += gzipSync(buf, { level: 6 }).length;
        if (file.endsWith(".json")) {
          try {
            specs.minified += Buffer.byteLength(JSON.stringify(JSON.parse(buf.toString("utf8"))));
          } catch {
            specs.minified += buf.length;
          }
        } else specs.minified += buf.length;
      }
    }
  }
  log(`composition: specs ${specs.files} files, ${MB(specs.bytes)}`);
  return { services: { ...ts, classes, kinds }, specs };
};

//#endregion

//#region clone

/**
 * Bytes `git clone --depth=1` would download: a pack of HEAD's commit,
 * trees and blobs, built the way a server builds one. Each variant drops
 * the blobs of some categories.
 */
const packBytes = (blobs: Blob[], drop: Set<string>) => {
  const head = git(["rev-parse", "HEAD"]).trim();
  // Trees only: submodule gitlinks show up as `commit` entries and are not
  // part of the superproject's pack.
  const trees = git([
    "ls-tree",
    "-r",
    "-d",
    "--full-tree",
    "--format=%(objecttype) %(objectname) %(path)",
    "HEAD",
  ])
    .split("\n")
    .filter((l) => l.startsWith("tree "))
    .map((l) => l.slice(5));
  const rootTree = git(["rev-parse", "HEAD^{tree}"]).trim();
  const lines = [head, rootTree, ...trees];
  for (const b of blobs)
    if (!drop.has(categoryOf(b.path, b.size))) lines.push(`${b.oid} ${b.path}`);
  const started = Date.now();
  const res = spawnSync(
    "sh",
    ["-c", "set -o pipefail; git pack-objects --stdout --threads=0 -q | wc -c"],
    { cwd: ROOT, input: lines.join("\n") + "\n", encoding: "utf8" },
  );
  if (res.status !== 0) throw new Error(`pack-objects failed: ${res.stderr}`);
  return { bytes: Number(res.stdout.trim()), objects: lines.length, ms: Date.now() - started };
};

const cloneSection = (blobs: Blob[]) => {
  const variants = [
    { id: "today", label: "Today", drop: [] as string[] },
    { id: "no-specs", label: "Without .generated-specs/", drop: ["generated-specs"] },
    {
      id: "no-generated",
      label: "Without .generated-specs/ and src/services/",
      drop: ["generated-specs", "services"],
    },
  ];
  return variants.map((v) => {
    const r = packBytes(blobs, new Set(v.drop));
    log(`clone ${v.id}: ${MB(r.bytes)} in ${r.ms} ms`);
    return { id: v.id, label: v.label, drop: v.drop, ...r };
  });
};

//#endregion

//#region worktree

const duBytes = (dir: string) => {
  // Blocks actually used (what `df` loses), and the file count.
  const blocks = Number(sh("du", ["-s", "--block-size=1", dir]).split("\t")[0]);
  const files = Number(
    sh("sh", ["-c", `find "${dir}" -path "${dir}/.git" -prune -o -type f -print | wc -l`]),
  );
  return { disk: blocks, files };
};

const timeMs = (fn: () => void) => {
  const t = process.hrtime.bigint();
  fn();
  return Number(process.hrtime.bigint() - t) / 1e6;
};

const SPARSE_PATTERNS = [
  "/*",
  "!/packages/*/.generated-specs/",
  "!/packages/*/.generated-graphql/",
];

/** Used bytes on the filesystem that holds `dir`, after a sync. */
const dfUsed = (dir: string) => {
  spawnSync("sync");
  return Number(sh("df", ["--output=used", "-B1", dir]).trim().split("\n").pop());
};

/** Does this filesystem share blocks between files (XFS reflink, btrfs, APFS)? */
const reflinkSupported = () => {
  const a = join(CACHE, "reflink-probe");
  writeFileSync(a, "probe");
  const ok = spawnSync("cp", ["--reflink=always", a, `${a}.2`]).status === 0;
  rmSync(a, { force: true });
  rmSync(`${a}.2`, { force: true });
  return ok && spawnSync("xfs_io", ["-V"]).status === 0;
};

/**
 * Bytes of the checkout's files that sit in extents shared with another
 * file (FIEMAP "shared" flag). `du` cannot see sharing, and `df` deltas
 * pick up every other process writing at the time.
 */
const sharedBytes = (dir: string) =>
  Number(
    sh(
      "sh",
      [
        "-c",
        `git ls-files -z | xargs -0 filefrag -v 2>/dev/null | awk -F: '/^ *[0-9]+:/ && /shared/ { s += $4 } END { printf "%d", s * 4096 }'`,
      ],
      { cwd: dir },
    ),
  );

const removeWorktree = (dir: string) => {
  if (existsSync(dir)) spawnSync("git", ["worktree", "remove", "--force", dir], { cwd: ROOT });
  rmSync(dir, { recursive: true, force: true });
  spawnSync("git", ["worktree", "prune"], { cwd: ROOT });
};

/** Replace each tracked file's blocks with the template's (kernel-checked dedupe). */
const DEDUPE_SCRIPT = `git ls-files -z | xargs -0 -P8 -n200 sh -c 'for f; do
  [ -f "$f" ] && [ ! -L "$f" ] || continue
  sz=$(stat -c %s "$f"); [ "$sz" -gt 4096 ] || continue
  xfs_io -c "dedupe $TEMPLATE/$f 0 0 $sz" "$f" >/dev/null 2>&1
done' _ || true`;

const worktreeSection = () => {
  mkdirSync(CACHE, { recursive: true });
  const head = git(["rev-parse", "HEAD"]).trim();
  const reflink = reflinkSupported();
  const template = join(CACHE, "wt-template");
  const runs: Record<string, unknown>[] = [];

  type Mode = "full" | "sparse" | "reflink" | "dedupe";
  const add = (id: string, label: string, mode: Mode) => {
    const dir = join(CACHE, `wt-${id}`);
    removeWorktree(dir);
    const before = dfUsed(CACHE);
    const ms = timeMs(() => {
      if (mode === "full" || mode === "dedupe") {
        git(["worktree", "add", "--detach", "-q", dir, head]);
      } else if (mode === "sparse") {
        git(["worktree", "add", "--detach", "--no-checkout", "-q", dir, head]);
        // Per-worktree sparse file, set without touching the shared config
        // (`git sparse-checkout set` would enable extensions.worktreeConfig).
        const sparseFile = git(["rev-parse", "--git-path", "info/sparse-checkout"], dir).trim();
        const abs = sparseFile.startsWith("/") ? sparseFile : join(dir, sparseFile);
        mkdirSync(dirname(abs), { recursive: true });
        writeFileSync(abs, SPARSE_PATTERNS.join("\n") + "\n");
        git(["-c", "core.sparseCheckout=true", "read-tree", "-mu", "HEAD"], dir);
      } else {
        // Copy-on-write clone of a checkout of the same commit, then let git
        // index it. Unchanged files share the template's blocks.
        git(["worktree", "add", "--detach", "--no-checkout", "-q", dir, head]);
        const entries = readdirSync(template).filter((e) => e !== ".git");
        sh("cp", ["-a", "--reflink=always", ...entries.map((e) => join(template, e)), dir]);
        git(["reset", "-q", "--mixed", head], dir);
        git(["update-index", "-q", "--refresh"], dir);
      }
      if (mode === "dedupe") {
        execFileSync("sh", ["-c", DEDUPE_SCRIPT], {
          cwd: dir,
          env: { ...process.env, TEMPLATE: template },
        });
      }
    });
    const size = duBytes(dir);
    const diskDelta = dfUsed(CACHE) - before;
    const shared = reflink ? sharedBytes(dir) : 0;
    const clean = git(["status", "--porcelain"], dir).trim() === "";
    removeWorktree(dir);
    // New disk this worktree costs: its blocks minus the ones it shares.
    const newDisk = size.disk - shared;
    log(
      `worktree ${id}: ${(ms / 1000).toFixed(1)} s, du ${MB(size.disk)}, shared ${MB(shared)}, new ${MB(newDisk)} (df ${MB(diskDelta)}), ${size.files} files, clean=${clean}`,
    );
    runs.push({ id, label, mode, ms, ...size, shared, newDisk, diskDelta, clean });
  };

  // Warm the object cache so every variant reads objects from memory.
  add("warmup", "warm-up (not shown)", "full");
  runs.length = 0;
  add("full", "git worktree add", "full");
  add("sparse", "git worktree add, sparse: no .generated-specs/", "sparse");
  if (reflink) {
    removeWorktree(template);
    git(["worktree", "add", "--detach", "-q", template, head]);
    add("reflink", "reflink copy of a checkout, then git reset", "reflink");
    add("dedupe", "git worktree add, then dedupe against a checkout", "dedupe");
    removeWorktree(template);
  }
  return {
    head,
    sparsePatterns: SPARSE_PATTERNS,
    reflinkSupported: reflink,
    filesystem: sh("stat", ["-f", "-c", "%T", CACHE]).trim(),
    note: "Warm page cache. df deltas include anything else writing to the disk at the time.",
    runs,
  };
};

//#endregion

//#region local

const localSection = () => {
  const common = git(["rev-parse", "--path-format=absolute", "--git-common-dir"]).trim();
  const du = (p: string) =>
    existsSync(p) ? Number(sh("du", ["-s", "--block-size=1", p]).split("\t")[0]) : 0;
  const objects = du(join(common, "objects"));
  const modules = du(join(common, "modules"));
  const worktrees = git(["worktree", "list", "--porcelain"])
    .split("\n")
    .filter((l) => l.startsWith("worktree "))
    .map((l) => l.slice(9))
    .filter((p) => existsSync(p) && !p.startsWith(CACHE));
  const rows = worktrees.map((wt) => {
    const lib = readdirSync(join(wt, "packages"))
      .map((p) => du(join(wt, "packages", p, "lib")))
      .reduce((s, n) => s + n, 0);
    const nm = join(wt, "node_modules");
    let nodeModules = { files: 0, unique: 0, hardlinked: 0 };
    if (existsSync(nm)) {
      const stats = sh("sh", [
        "-c",
        `find "${nm}" -type f -printf '%n %s\\n' | awk '{ if ($1==1) u+=$2; else h+=$2; n++ } END { printf "%d %d %d", n, u, h }'`,
      ]).split(" ");
      nodeModules = {
        files: Number(stats[0]),
        unique: Number(stats[1]),
        hardlinked: Number(stats[2]),
      };
    }
    // The checkout itself: everything except node_modules, lib/ and .git.
    const checkout = Number(
      sh("sh", [
        "-c",
        `du -s --block-size=1 --exclude=node_modules --exclude=lib --exclude=.git "${wt}" | cut -f1`,
      ]),
    );
    return { path: wt.replace(homedir(), "~"), checkout, lib, nodeModules };
  });
  log(`local: ${rows.length} worktrees`);

  // What block sharing (reflink copies or a dedupe pass) could reclaim
  // across the worktrees: bytes of every file minus bytes of distinct
  // contents. Tracked files by their index blob id (a dirty file counts as
  // its committed content); lib/ by content hash. Files of 4 KB or less are
  // left out: they fit in one block and dedupe skips them.
  // Blocks are shared only within one filesystem (a /tmp worktree is not).
  const sameFs = worktrees.filter((wt) => statSync(wt).dev === statSync(common).dev);
  const oidUse = new Map<string, number>();
  for (const wt of sameFs) {
    for (const line of git(["ls-files", "-s"], wt).split("\n")) {
      const oid = line.split(" ")[1];
      if (oid && !line.startsWith("160000")) oidUse.set(oid, (oidUse.get(oid) ?? 0) + 1);
    }
  }
  const sizes = sh("git", ["cat-file", "--batch-check=%(objectname) %(objectsize)"], {
    input: [...oidUse.keys()].join("\n") + "\n",
  });
  let trackedTotal = 0;
  let trackedUnique = 0;
  for (const line of sizes.split("\n")) {
    const [oid, size] = line.split(" ");
    const n = Number(size);
    if (!oid || !(n > 4096)) continue;
    trackedTotal += n * oidUse.get(oid)!;
    trackedUnique += n;
  }
  const libHashes = sh("sh", [
    "-c",
    `for w in ${sameFs.map((w) => `"${w}"`).join(" ")}; do find "$w"/packages/*/lib -type f -size +4k 2>/dev/null; done | tr '\\n' '\\0' | xargs -0 -P8 -n500 sh -c 'for f; do printf "%s " "$(stat -c %s "$f")"; sha1sum "$f" | cut -c1-40; done' _`,
  ]);
  const libSeen = new Set<string>();
  let libTotal = 0;
  let libUnique = 0;
  for (const line of libHashes.split("\n")) {
    const [size, hash] = line.split(" ");
    if (!hash) continue;
    libTotal += Number(size);
    if (!libSeen.has(hash)) {
      libSeen.add(hash);
      libUnique += Number(size);
    }
  }
  const sharing = { worktrees: sameFs.length, trackedTotal, trackedUnique, libTotal, libUnique };
  log(
    `local: sharing could reclaim ${MB(trackedTotal - trackedUnique)} tracked + ${MB(libTotal - libUnique)} lib`,
  );
  // What keeps the object store alive: refs by namespace, and the pack the
  // store would shrink to if only origin/main's (shallow) history stayed.
  const refs: Record<string, number> = {};
  for (const ref of git(["for-each-ref", "--format=%(refname)"]).split("\n").filter(Boolean)) {
    const ns = ref.split("/").slice(0, 2).join("/");
    refs[ns] = (refs[ns] ?? 0) + 1;
  }
  const mainOnly = Number(
    sh("sh", [
      "-c",
      "echo origin/main | git pack-objects --revs --stdout --threads=0 -q | wc -c",
    ]).trim(),
  );
  return {
    objects,
    submodules: modules,
    refs,
    mainOnlyPack: mainOnly,
    mainCommitsLocal: Number(git(["rev-list", "--count", "origin/main"]).trim()),
    sharing,
    worktrees: rows,
  };
};

//#endregion

//#region alchemy

/**
 * Distilled as Alchemy uses it: a submodule at submodules/distilled. Alchemy's
 * post-checkout hook (scripts/bootstrap-distilled.mjs) gives every Alchemy
 * worktree its own `git worktree add` of the primary checkout's submodule
 * repo, so each one pays for a full distilled checkout. This section sizes
 * that checkout as Alchemy needs it, at Alchemy's pin.
 */
const ALCHEMY = process.env.ALCHEMY_REPO ?? join(homedir(), "code", "alchemy", "alchemy");

/** Distilled packages Alchemy builds (tsconfig references) or depends on (package.json). */
const alchemyPackages = (root: string) => {
  const used = new Set<string>();
  const tsconfig = readFileSync(join(root, "tsconfig.json"), "utf8");
  for (const m of tsconfig.matchAll(/submodules\/distilled\/packages\/([^/]+)\/tsconfig/g))
    used.add(m[1]!);
  const manifests = sh(
    "sh",
    [
      "-c",
      `ls packages/*/package.json examples/*/package.json stacks/*/package.json website/package.json package.json 2>/dev/null || true`,
    ],
    { cwd: root },
  );
  for (const file of manifests.split("\n").filter(Boolean)) {
    const text = readFileSync(join(root, file), "utf8");
    for (const m of text.matchAll(/"@distilled\.cloud\/([a-z0-9-]+)"/g)) used.add(m[1]!);
  }
  return [...used].sort();
};

const alchemySection = () => {
  if (!existsSync(join(ALCHEMY, ".git"))) return undefined;
  const pin = git(["rev-parse", "HEAD:submodules/distilled"], ALCHEMY).trim();
  const havePin =
    spawnSync("git", ["cat-file", "-e", `${pin}^{commit}`], { cwd: ROOT }).status === 0;
  const commit = havePin ? pin : git(["rev-parse", "HEAD"]).trim();
  const used = alchemyPackages(ALCHEMY);

  // Tracked bytes of the distilled checkout at the pin, split by what Alchemy needs.
  const split = { specs: 0, usedServices: 0, unusedServices: 0, rest: 0 };
  const unused = new Set<string>();
  for (const line of git(["ls-tree", "-r", "-l", "--full-tree", commit]).split("\n")) {
    const [meta, path] = line.split("\t");
    const [, type, , size] = (meta ?? "").split(/\s+/);
    if (type !== "blob" || !path) continue;
    const n = Number(size);
    const c = categoryOf(path, n);
    const pkg = /^packages\/([^/]+)\//.exec(path)?.[1];
    if (c === "generated-specs") split.specs += n;
    else if (c === "services" && pkg && used.includes(pkg)) split.usedServices += n;
    else if (c === "services" && pkg) {
      split.unusedServices += n;
      unused.add(pkg);
    } else split.rest += n;
  }

  // Alchemy's own tracked files (submodules are gitlinks, so not counted).
  const own = git(["ls-tree", "-r", "-l", "--full-tree", "HEAD"], ALCHEMY)
    .split("\n")
    .reduce((s, line) => {
      const [, type, , size] = line.split("\t")[0]!.split(/\s+/);
      return type === "blob" ? s + Number(size) : s;
    }, 0);

  // What bootstrap-distilled could check out instead: measured worktrees.
  const variants = [
    { id: "full", label: "Today: full checkout", patterns: undefined as string[] | undefined },
    { id: "no-specs", label: "Without .generated-specs/", patterns: SPARSE_PATTERNS },
    {
      id: "alchemy-only",
      label: "… and only the services Alchemy uses",
      patterns: [...SPARSE_PATTERNS, ...[...unused].map((p) => `!/packages/${p}/src/`)],
    },
  ].map((v) => {
    const dir = join(CACHE, `wt-alchemy-${v.id}`);
    removeWorktree(dir);
    const ms = timeMs(() => {
      if (!v.patterns) return git(["worktree", "add", "--detach", "-q", dir, commit]);
      git(["worktree", "add", "--detach", "--no-checkout", "-q", dir, commit]);
      const sparseFile = git(["rev-parse", "--git-path", "info/sparse-checkout"], dir).trim();
      const abs = sparseFile.startsWith("/") ? sparseFile : join(dir, sparseFile);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, v.patterns.join("\n") + "\n");
      git(["-c", "core.sparseCheckout=true", "read-tree", "-mu", "HEAD"], dir);
    });
    const size = duBytes(dir);
    removeWorktree(dir);
    log(`alchemy ${v.id}: ${(ms / 1000).toFixed(1)} s, ${MB(size.disk)}, ${size.files} files`);
    return { id: v.id, label: v.label, ms, ...size };
  });

  // Every Alchemy worktree on this machine: its own files, distilled, distilled lib/.
  const du = (p: string, extra: string[] = []) =>
    existsSync(p) ? Number(sh("du", ["-s", "--block-size=1", ...extra, p]).split("\t")[0]) : 0;
  const worktrees = git(["worktree", "list", "--porcelain"], ALCHEMY)
    .split("\n")
    .filter((l) => l.startsWith("worktree "))
    .map((l) => l.slice(9))
    .filter((p) => existsSync(p))
    .map((wt) => {
      const d = join(wt, "submodules", "distilled");
      const lib = existsSync(join(d, "packages"))
        ? readdirSync(join(d, "packages"))
            .map((p) => du(join(d, "packages", p, "lib")))
            .reduce((s, n) => s + n, 0)
        : 0;
      return {
        path: wt.replace(homedir(), "~"),
        alchemy: du(wt, ["--exclude=node_modules", "--exclude=submodules", "--exclude=.git"]),
        distilled: du(d, ["--exclude=node_modules", "--exclude=lib", "--exclude=.git"]),
        distilledLib: lib,
      };
    });

  // The submodule repo every Alchemy worktree's distilled checkout shares.
  const moduleRepo = join(ALCHEMY, ".git", "modules", "distilled");
  const registered = existsSync(join(moduleRepo, "worktrees"))
    ? readdirSync(join(moduleRepo, "worktrees")).length
    : 0;
  const prunable = (
    spawnSync("git", ["worktree", "list", "--porcelain"], {
      cwd: join(ALCHEMY, "submodules", "distilled"),
      encoding: "utf8",
    }).stdout ?? ""
  )
    .split("\n")
    .filter((l) => l.startsWith("prunable")).length;

  return {
    pin: pin.slice(0, 9),
    measuredAt: commit.slice(0, 9),
    usedPackages: used,
    unusedPackages: unused.size,
    alchemyTracked: own,
    split,
    variants,
    worktrees,
    moduleRepo: { bytes: du(moduleRepo), registered, prunable },
  };
};

//#endregion

//#region timeline

type Commit = { sha: string; tree: string; date: string; message: string };

const ghJson = (path: string) => JSON.parse(sh("gh", ["api", path]));

const listMainCommits = (): Commit[] => {
  const out: Commit[] = [];
  for (let page = 1; page < 100; page++) {
    const batch = ghJson(`repos/${REPO}/commits?sha=main&per_page=100&page=${page}`) as any[];
    for (const c of batch)
      out.push({
        sha: c.sha,
        tree: c.commit.tree.sha,
        date: c.commit.committer.date,
        message: String(c.commit.message).split("\n")[0]!,
      });
    if (batch.length < 100) break;
  }
  return out.reverse();
};

/**
 * Last commit of each day for the last `dailyDays` days, of each week
 * before. Starts in 2026: before that the repo was the AWS-only SDK, with a
 * different layout.
 */
const SINCE = Date.UTC(2026, 0, 1);
const sample = (commits: Commit[], dailyDays = 45) => {
  const cutoff = Date.now() - dailyDays * 864e5;
  const buckets = new Map<string, Commit>();
  for (const c of commits) {
    const t = Date.parse(c.date);
    if (t < SINCE) continue;
    const d = new Date(t);
    const key =
      t >= cutoff
        ? d.toISOString().slice(0, 10)
        : `w${Math.floor((t - Date.UTC(2023, 0, 2)) / (7 * 864e5))}`;
    buckets.set(key, c);
  }
  return [...buckets.values()];
};

const treeSummary = (commit: Commit) => {
  // Bump the version when CATEGORIES change: summaries are per category.
  const file = join(CACHE, "trees-v3", `${commit.tree}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const tree = ghJson(`repos/${REPO}/git/trees/${commit.tree}?recursive=1`);
  const totals = emptyTotals();
  let bytes = 0;
  let files = 0;
  for (const e of tree.tree as { type: string; path: string; size?: number }[]) {
    if (e.type !== "blob") continue;
    const c = categoryOf(e.path, e.size ?? 0);
    totals[c]!.bytes += e.size ?? 0;
    totals[c]!.files += 1;
    bytes += e.size ?? 0;
    files++;
  }
  const summary = { bytes, files, categories: totals, truncated: Boolean(tree.truncated) };
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(summary));
  return summary;
};

const timelineSection = () => {
  const commits = listMainCommits();
  const points = sample(commits);
  log(`timeline: ${commits.length} commits on main, ${points.length} sampled`);
  const repoInfo = ghJson(`repos/${REPO}`);
  return {
    commitsOnMain: commits.length,
    // GitHub's own figure for the whole repository (full history), in KB.
    githubRepoSizeBytes: Number(repoInfo.size) * 1024,
    points: points.map((c, i) => {
      if (i % 10 === 0) log(`timeline ${i}/${points.length}`);
      return { sha: c.sha.slice(0, 9), date: c.date, message: c.message, ...treeSummary(c) };
    }),
  };
};

//#endregion

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const blobs = headBlobs();
const result: Record<string, unknown> = {
  ...previous,
  generatedAt: new Date().toISOString(),
  head: git(["rev-parse", "--short=9", "HEAD"]).trim(),
  categories: CATEGORIES.map(({ id, label }) => ({ id, label })),
};
const run = (name: string, fn: () => unknown) => {
  if (skip.has(name)) return log(`skip ${name} (keeping the previous result)`);
  const started = Date.now();
  result[name] = fn();
  log(`${name} done in ${((Date.now() - started) / 1000).toFixed(1)} s`);
};
run("tree", () => treeSection(blobs));
run("composition", compositionSection);
run("clone", () => cloneSection(blobs));
run("worktree", worktreeSection);
run("local", localSection);
run("alchemy", alchemySection);
run("timeline", timelineSection);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(result, null, 1) + "\n");
log(`wrote ${OUT.replace(ROOT + "/", "")} (${MB(statSync(OUT).size)})`);
