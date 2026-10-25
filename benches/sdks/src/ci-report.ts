import type { TreeSize } from "../../repo-size/tree.ts";
/**
 * Markdown for the `Benchmarks` CI job: a PR run against the main run it is
 * compared with. GitHub renders the Mermaid `xychart-beta` blocks as charts in
 * PR comments and job summaries.
 */
import { summaryMarkdown } from "./ci-image.ts";
import { fmtBytes, fmtMs } from "./util.ts";

export const MARKER = "<!-- distilled-bench -->";

export interface CiProgram {
  readonly pkg: string;
  readonly protocol: string;
  readonly label: string;
  bundle?: {
    readonly gzip: number;
    readonly bytes: number;
    readonly modules: number;
    readonly composition: { effect: number; core: number; sdk: number; other: number };
  };
  runtime?: {
    readonly importMs: number;
    readonly importHeap: number;
    readonly importObjects?: number;
    readonly firstCallMs: number;
    readonly firstCallHeap: number;
    readonly addedP50Us: number;
    readonly p50Us: number;
    readonly gcPer1k: number;
    readonly maxRss: number;
  };
}

export interface CiRun {
  readonly version: 1;
  readonly sha: string;
  readonly ref: string;
  readonly createdAt: string;
  /** `same-job` when a PR job measured main itself because no cached run existed. */
  readonly source?: string;
  readonly durationMs: number;
  readonly timings: Record<string, number>;
  readonly env: { node: string; cpus: number; cpu: string };
  readonly scope: {
    wide: boolean;
    changed: string[];
    bundle: string[];
    runtime: string[];
    untargeted: string[];
  };
  readonly baselines: {
    bundle: Record<string, { gzip: number; bytes: number }>;
    runtime: { effectImportMs: number; effectHeap: number; mockRoundtripP50Us: number };
  };
  readonly sizes: Record<string, { tarball: number; unpacked: number; files: number }>;
  readonly programs: Record<string, CiProgram>;
  /** Every service module of a whole SDK imported in one process. */
  readonly providers?: Record<
    string,
    {
      services: number;
      heap: number;
      objects?: number;
      importMs: number;
      /** git trees of the inputs; equal trees mean equal numbers. */
      inputs: string;
      /** Copied from the --reuse run because the inputs matched. */
      reused?: boolean;
    }
  >;
  /**
   * Tracked bytes of the checkout by kind of file (benches/repo-size/tree.ts):
   * `head` is the tree measured, `base` the `--changed-since` tree.
   */
  readonly repoSize?: { head: TreeSize; base?: TreeSize };
  readonly errors: string[];
}

interface Metric {
  readonly id: string;
  readonly title: string;
  readonly get: (p: CiProgram) => number | undefined;
  readonly fmt: (n: number) => string;
  /** A change is reported when both are exceeded: relative (fraction) and absolute. */
  readonly rel: number;
  readonly abs: number;
  /** Timings vary between runners; their changes are shown but never flagged red. */
  readonly noisy?: boolean;
}

const us = (n: number) => `${n.toFixed(1)} µs`;
const count = (n: number) => n.toLocaleString("en-US");

/**
 * Thresholds: sizes are deterministic, so any real change shows. Heap and
 * object counts move a little with GC timing. Latency and cold-start times
 * are measured on a different runner than main's, so only large moves count.
 */
export const METRICS: Metric[] = [
  {
    id: "bundle",
    title: "Bundle (gzip)",
    get: (p) => p.bundle?.gzip,
    fmt: fmtBytes,
    rel: 0.002,
    abs: 20,
  },
  {
    id: "heap",
    title: "Import heap",
    get: (p) => p.runtime?.importHeap,
    fmt: fmtBytes,
    rel: 0.08,
    abs: 32 * 1024,
  },
  {
    id: "objects",
    title: "Objects at import",
    get: (p) => p.runtime?.importObjects,
    fmt: count,
    rel: 0.01,
    abs: 20,
  },
  {
    id: "added",
    title: "Added latency (p50)",
    get: (p) => p.runtime?.addedP50Us,
    fmt: us,
    rel: 0.3,
    abs: 5,
    noisy: true,
  },
  {
    id: "import",
    title: "Import time",
    get: (p) => p.runtime?.importMs,
    fmt: fmtMs,
    rel: 0.25,
    abs: 2,
    noisy: true,
  },
  {
    id: "first",
    title: "First call",
    get: (p) => p.runtime?.firstCallMs,
    fmt: fmtMs,
    rel: 0.25,
    abs: 1,
    noisy: true,
  },
];

const pct = (head: number, base: number) =>
  base === 0 ? 0 : ((head - base) / Math.abs(base)) * 100;
const signed = (x: number, digits = 1) =>
  `${x > 0 ? "+" : x < 0 ? "−" : "±"}${Math.abs(x).toFixed(digits)}`;

type Verdict = "better" | "worse" | "same";
const verdict = (m: Metric, head: number, base: number): Verdict => {
  const d = head - base;
  if (Math.abs(d) < m.abs || Math.abs(d) < Math.abs(base) * m.rel) return "same";
  return d < 0 ? "better" : "worse";
};
const mark = (m: Metric, v: Verdict) =>
  v === "better" ? " 🟢" : v === "worse" ? (m.noisy ? " 🟡" : " 🔴") : "";

const cell = (m: Metric, head: CiProgram | undefined, base: CiProgram | undefined): string => {
  const h = head && m.get(head);
  if (h === undefined) return "—";
  const b = base && m.get(base);
  if (b === undefined) return m.fmt(h);
  const v = verdict(m, h, b);
  if (v === "same") return m.fmt(h);
  return `${m.fmt(h)} (${signed(pct(h, b))}%)${mark(m, v)}`;
};

const short = (sha: string) => sha.slice(0, 9);

/** Smaller moves are ordinary edits; a regenerated SDK or a new spec dump is bigger. */
const REPO_NOISE = 256 * 1024;
const REPO_PARTS: Array<[string, string]> = [
  ["generated-specs", ".generated-specs/"],
  ["services", "src/services/"],
];
const signedBytes = (d: number) => `${d > 0 ? "+" : d < 0 ? "−" : "±"}${fmtBytes(Math.abs(d))}`;

/**
 * Tracked bytes of the checkout, against the PR's base commit: one summary
 * line, plus a table by kind of file for the details.
 */
export const repoSizeMarkdown = (run: CiRun): { line: string[]; table: string[] } => {
  const size = run.repoSize;
  if (!size) return { line: [], table: [] };
  const { head, base } = size;
  const rest = (t: TreeSize) =>
    t.bytes - REPO_PARTS.reduce((s, [id]) => s + (t.categories[id]?.bytes ?? 0), 0);
  const parts = [
    ...REPO_PARTS.map(([id, label]) => {
      const h = head.categories[id]?.bytes ?? 0;
      const b = base?.categories[id]?.bytes;
      const d = b === undefined ? 0 : h - b;
      return `${label} ${fmtBytes(h)}${Math.abs(d) >= REPO_NOISE ? ` (${signedBytes(d)})` : ""}`;
    }),
    `everything else ${fmtBytes(rest(head))}`,
  ];
  const d = base ? head.bytes - base.bytes : 0;
  const mark = !base || Math.abs(d) < REPO_NOISE ? "⚪" : d > 0 ? "🔴" : "🟢";
  const change = base
    ? Math.abs(d) < REPO_NOISE
      ? `, same as main (${signedBytes(d)})`
      : `: ${signedBytes(d)} (${signed(pct(head.bytes, base.bytes))}%) vs main`
    : "";
  const line = [
    `- ${mark} **Repo size** ${fmtBytes(head.bytes)} tracked in ${count(head.files)} files${change}. ${parts.join(", ")}.`,
  ];
  const ids = Object.keys(head.categories).filter(
    (id) => (head.categories[id]?.bytes ?? 0) > 0 || (base?.categories[id]?.bytes ?? 0) > 0,
  );
  const row = (label: string, h: number, b: number | undefined, files: number) =>
    `| ${label} | ${fmtBytes(h)} | ${b === undefined ? "—" : signedBytes(h - b)} | ${count(files)} |`;
  const table = [
    "| Tracked files | Size | Change vs main | Files |",
    "| --- | ---: | ---: | ---: |",
    ...ids.map((id) =>
      row(
        `\`${id}\``,
        head.categories[id]?.bytes ?? 0,
        base ? (base.categories[id]?.bytes ?? 0) : undefined,
        head.categories[id]?.files ?? 0,
      ),
    ),
    row("**Total**", head.bytes, base?.bytes, head.files),
    "",
    "What a checkout or worktree writes to disk, from `git ls-tree` (`benches/repo-size/tree.ts`). The dashboard's Repo size page has the full picture.",
    "",
  ];
  return { line, table };
};

export const report = (
  head: CiRun,
  base: CiRun | undefined,
  opts: { runUrl?: string; imageBase?: string } = {},
) => {
  const names = Object.keys(head.programs).sort();
  const out: string[] = [MARKER];
  const repo = repoSizeMarkdown(head);
  const verdictLines: string[] = [];
  // Per metric: the programs that moved past the noise threshold.
  const moves = METRICS.map((m) => {
    const rows: Array<[string, number, number]> = [];
    let compared = 0;
    for (const n of names) {
      const h = m.get(head.programs[n]!);
      const b = base?.programs[n] && m.get(base.programs[n]!);
      if (h === undefined || b === undefined) continue;
      compared++;
      if (verdict(m, h, b) !== "same") rows.push([n, h, b]);
    }
    return { m, rows, compared };
  });

  // One verdict line a reader can stop at.
  let noisyLine = "";
  if (base) {
    const say = (dir: "worse" | "better", noisy: boolean) =>
      moves
        .filter(({ m }) => !!m.noisy === noisy)
        .map(({ m, rows }) => {
          const hit = rows.filter(([, h, b]) => verdict(m, h, b) === dir);
          if (!hit.length) return undefined;
          const worst = hit.reduce((x, y) =>
            Math.abs(y[1] / y[2] - 1) > Math.abs(x[1] / x[2] - 1) ? y : x,
          );
          return `${m.title.toLowerCase()} on ${hit.length} (up to ${signed(pct(worst[1], worst[2]))}%, ${worst[0]})`;
        })
        .filter(Boolean)
        .join("; ");
    const worse = say("worse", false);
    const better = say("better", false);
    noisyLine = [say("worse", true), say("better", true)].filter(Boolean).join("; ");
    if (worse) verdictLines.push(`### 🔴 Bigger than main: ${worse}`, "");
    if (better) verdictLines.push(`### 🟢 Smaller than main: ${better}`, "");
    if (!worse && !better) verdictLines.push("### 🟢 Same size as main", "");
  } else verdictLines.push("### No main run to compare with yet", "");

  // The numbers as text, then one image per chart (bench dashboard style).
  if (opts.imageBase) {
    const img = (name: string, width = "100%") =>
      `<img src="${opts.imageBase}/${name}.png" width="${width}" alt="${name}">`;
    out.push(
      `### Benchmarks: PR \`${short(head.sha)}\` vs main \`${base ? short(base.sha) : "none yet"}\``,
      "",
      ...summaryMarkdown(head, base),
      ...repo.line,
      "",
      ...(head.providers && Object.keys(head.providers).length ? [img("sdk-memory"), ""] : []),
      img("bundle-programs"),
      "",
      img("memory-programs"),
      "",
      `${img("bundle", "49%")} ${img("memory", "49%")}`,
      `${img("speed", "49%")} ${img("objects", "49%")}`,
      "",
    );
  } else
    out.push("## Benchmarks", "", ...verdictLines, ...(repo.line.length ? [...repo.line, ""] : []));

  out.push("<details><summary>Numbers</summary>", "");
  if (noisyLine) out.push(`🟡 Timings moved, may be runner noise: ${noisyLine}`, "");
  if (base) {
    out.push("| Metric | Change vs main | Programs |", "| --- | --- | ---: |");
    for (const { m, rows, compared } of moves) {
      if (!compared) continue;
      const better = rows.filter(([, h, b]) => verdict(m, h, b) === "better").length;
      const worse = rows.length - better;
      out.push(
        `| ${m.title}${m.noisy ? " ¹" : ""} | ${rows.length === 0 ? "no change" : [better && `${better} better`, worse && `${worse} worse`].filter(Boolean).join(", ")} | ${compared} |`,
      );
    }
    out.push("");
  }

  // Per-program table.
  const cols = METRICS.filter((m) => names.some((n) => m.get(head.programs[n]!) !== undefined));
  out.push(
    `| Program | Call | ${cols.map((m) => m.title).join(" | ")} |`,
    `| --- | --- | ${cols.map(() => "---:").join(" | ")} |`,
  );
  for (const n of names) {
    const h = head.programs[n]!;
    const b = base?.programs[n];
    out.push(`| ${n} | \`${h.label}\` | ${cols.map((m) => cell(m, h, b)).join(" | ")} |`);
  }
  out.push("");

  // Download size, baselines and scope.
  const sizeRows = Object.keys(head.sizes)
    .sort()
    .map((pkg) => {
      const h = head.sizes[pkg]!;
      const b = base?.sizes[pkg];
      const d = (x: number, y: number | undefined) =>
        y === undefined || x === y ? fmtBytes(x) : `${fmtBytes(x)} (${signed(pct(x, y))}%)`;
      return `| ${pkg} | ${d(h.tarball, b?.tarball)} | ${d(h.unpacked, b?.unpacked)} | ${h.files} |`;
    });
  const bl = head.baselines;
  const took = `${(head.durationMs / 1000).toFixed(0)} s on ${head.env.cpus} vCPU`;
  out.push(
    base
      ? `PR \`${short(head.sha)}\` against main \`${short(base.sha)}\` (${base.source === "same-job" ? "measured in this job, on the same runner" : `main's cached run from ${base.createdAt.slice(0, 16).replace("T", " ")} UTC`}). ${names.length} programs, measured in ${took}.`
      : `PR \`${short(head.sha)}\`. No main run is cached yet. ${names.length} programs, measured in ${took}.`,
    "",
    "| Package | Tarball | Unpacked | Files |",
    "| --- | ---: | ---: | ---: |",
    ...sizeRows,
    "",
    ...repo.table,
    `Effect alone: \`effect-minimal\` bundle ${fmtBytes(bl.bundle["effect-minimal"]?.gzip)} gzip, hand-written \`effect-http\` call ${fmtBytes(bl.bundle["effect-http"]?.gzip)} gzip; effect import ${fmtMs(bl.runtime?.effectImportMs)} and ${fmtBytes(bl.runtime?.effectHeap)} heap; bare mocked HTTP roundtrip ${us(bl.runtime?.mockRoundtripP50Us ?? NaN)} p50.`,
    "",
    `Bundled (from \`src/\`): ${head.scope.bundle.join(", ")}. Built and probed (from \`lib/\`): ${head.scope.runtime.join(", ")}.${head.scope.changed.length ? ` Changed in this PR: ${head.scope.changed.join(", ")}.` : ""}${head.scope.untargeted.length ? ` No target in targets.json: ${head.scope.untargeted.join(", ")}.` : ""}`,
    "",
    `Job time: ${Object.entries(head.timings)
      .map(([k, v]) => `${k} ${(v / 1000).toFixed(1)} s`)
      .join(", ")}.`,
    "",
    `¹ Timings run on a different runner than main's, so 🟡 marks a large move that may still be noise. Sizes, heap and object counts are stable. Offline: every call hits a canned in-memory response. Full suite: \`node benches/sdks/run.ts\`.${opts.runUrl ? ` [Job log](${opts.runUrl})` : ""}`,
    "",
    "</details>",
    "",
  );
  if (head.errors.length)
    out.push(
      "<details><summary>⚠️ " + head.errors.length + " error(s)</summary>",
      "",
      ...head.errors.map((e) => `- ${e.replaceAll("\n", " ")}`),
      "",
      "</details>",
      "",
    );
  return `${out.join("\n")}\n`;
};
