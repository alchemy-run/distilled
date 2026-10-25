/**
 * The PR benchmark comment as one PNG that looks like the bench dashboard
 * (benches/dashboard): the same stylesheet, the same `lineChart`, the same
 * headline cards. Each chart is main's recent runs (from the CI history the
 * push-to-main job keeps) with this PR as the last point, in the shaded
 * branch zone.
 *
 * Rendered with a local headless Chrome, like the website's social cards:
 * one `--dump-dom` pass reads the page height, a second takes the shot.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { lineChart } from "../../dashboard/src/charts.js";
import type { CiProgram, CiRun } from "./ci-report.ts";
import { median, REPO } from "./util.ts";

const DASH = join(REPO, "benches", "dashboard");
const WIDTH = 820;
const SCALE = 2;

// Formatting and noise exactly as the dashboard's METRICS (src/main.js).
const fmtBytes = (n: number | undefined) => {
  if (n === undefined || !Number.isFinite(n)) return "—";
  const a = Math.abs(n);
  if (a < 1000) return `${Math.round(n)} B`;
  if (a < 1e6) return `${(n / 1e3).toFixed(1)} KB`;
  return `${(n / 1e6).toFixed(a < 1e7 ? 2 : 1)} MB`;
};
const fmtUs = (n: number | undefined) =>
  n === undefined || !Number.isFinite(n) ? "—" : `${n.toFixed(1)} µs`;
const fmtCount = (n: number | undefined) =>
  n === undefined || !Number.isFinite(n) ? "—" : Math.round(n).toLocaleString("en-US");

interface Metric {
  readonly id: string;
  readonly label: string;
  readonly how: string;
  readonly read: (p: CiProgram) => number | undefined;
  readonly format: (n: number | undefined) => string;
  readonly noise: (prev: number) => number;
}

const METRICS: Metric[] = [
  {
    id: "bundle",
    label: "Bundle size",
    how: "Minified rolldown bundle of a program that sets up auth and calls 1 operation, gzip -9.",
    read: (p) => p.bundle?.gzip,
    format: fmtBytes,
    noise: (prev) => prev * 0.003,
  },
  {
    id: "speed",
    label: "Runtime speed",
    how: "Added latency: p50 of a call against a mocked HTTP response minus p50 of a bare mocked round trip.",
    read: (p) => p.runtime?.addedP50Us,
    format: fmtUs,
    // CI runners are noisier than the dashboard's machine.
    noise: (prev) => Math.max(3, prev * 0.3),
  },
  {
    id: "memory",
    label: "Runtime memory",
    how: "Import heap: V8 heapUsed after importing the SDK modules, minus before (fresh Node, gc twice, Effect preloaded).",
    read: (p) => p.runtime?.importHeap,
    format: fmtBytes,
    noise: (prev) => Math.max(32 * 1024, prev * 0.08),
  },
  {
    id: "objects",
    label: "Objects at import",
    how: "Live JS objects added by importing credentials + 1 service module (v8.queryObjects(Object) after gc, in its own process).",
    read: (p) => p.runtime?.importObjects,
    format: fmtCount,
    noise: (prev) => prev * 0.01,
  },
];

/** Whole-SDK import heap; tighter noise than per-program heap, since it is multi-MB. */
const SDK_HEAP: Metric = {
  id: "sdk-memory",
  label: "Whole-SDK memory",
  how: "",
  read: () => undefined,
  format: fmtBytes,
  noise: (prev) => Math.max(64 * 1024, prev * 0.02),
};

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const short = (sha: string) => sha.slice(0, 9);

/** Median per program, over `keys` the run has. */
const valueOf = (run: CiRun, m: Metric, keys: string[]) => {
  const values = keys.flatMap((k) => {
    const p = run.programs[k];
    const v = p && m.read(p);
    return v === undefined || !Number.isFinite(v) ? [] : [v];
  });
  return values.length ? median(values) : undefined;
};

interface Change {
  from: number;
  to: number;
  diff: number;
  pct: number;
  noise: boolean;
}

/** Change from `before` to `run`, over the programs both have (as the dashboard does). */
const change = (run: CiRun, before: CiRun | undefined, m: Metric, keys: string[]) => {
  if (!before) return undefined;
  const shared = keys.filter((k) => run.programs[k] && before.programs[k]);
  const from = valueOf(before, m, shared);
  const to = valueOf(run, m, shared);
  if (from === undefined || to === undefined) return undefined;
  return {
    from,
    to,
    diff: to - from,
    pct: from ? ((to - from) / from) * 100 : 0,
    noise: Math.abs(to - from) < m.noise(from),
  } satisfies Change;
};

export interface ImageMeta {
  readonly pr?: string;
  readonly title?: string;
}

/** Main's runs oldest first, ending at the base this PR is compared with, then the PR. */
const timeline = (head: CiRun, base: CiRun | undefined, history: CiRun[]) => {
  const mains = [...history, ...(base ? [base] : [])].filter(
    (r, i, all) => all.findIndex((x) => x.sha === r.sha) === i,
  );
  if (base)
    mains.push(
      mains.splice(
        mains.findIndex((r) => r.sha === base.sha),
        1,
      )[0]!,
    );
  return [...mains.slice(-30), head];
};

/**
 * The headline cards as markdown lines: value, change since main.
 * Every number is the median over the programs this PR measured.
 */
export const summaryMarkdown = (head: CiRun, base: CiRun | undefined): string[] => {
  const keys = Object.keys(head.programs);
  return METRICS.map((m) => {
    const v = m.format(valueOf(head, m, keys));
    const c = change(head, base, m, keys);
    if (!c) return `- **${m.label}** ${v}`;
    const sign = c.diff > 0 ? "+" : c.diff < 0 ? "−" : "±";
    const mark = c.noise ? "⚪" : c.diff < 0 ? "🟢" : "🔴";
    const word = c.noise ? "same as main" : c.diff < 0 ? "smaller than main" : "bigger than main";
    return `- ${mark} **${m.label}** ${v}: ${sign}${Math.abs(c.pct).toFixed(1)}% (${sign}${m.format(Math.abs(c.diff))}), ${word}`;
  }).concat(sdkLine(head, base));
};

/** Whole-SDK heap as one markdown line: "aws 9.1 MB (+0.4%), cloudflare ...". */
const sdkLine = (head: CiRun, base: CiRun | undefined): string[] => {
  const entries = Object.entries(head.providers ?? {});
  if (!entries.length) return [];
  let worst = 0;
  const parts = entries.map(([k, p]) => {
    const b = base?.providers?.[k]?.heap;
    if (p.reused) return `${k} ${fmtBytes(p.heap)} (unchanged)`;
    if (b === undefined) return `${k} ${fmtBytes(p.heap)}`;
    const d = p.heap - b;
    if (Math.abs(d) >= SDK_HEAP.noise(b)) worst = Math.abs(d) > Math.abs(worst) ? d : worst;
    const sign = d > 0 ? "+" : d < 0 ? "−" : "±";
    return `${k} ${fmtBytes(p.heap)} (${sign}${Math.abs((d / b) * 100).toFixed(1)}%)`;
  });
  const mark = worst > 0 ? "🔴" : worst < 0 ? "🟢" : "⚪";
  return [`- ${mark} **Whole-SDK memory** ${parts.join(", ")}`];
};

/** One chart per page; the names are the PNG file names. */
export const CHARTS = [
  "sdk-memory",
  "bundle-programs",
  "memory-programs",
  "bundle",
  "speed",
  "memory",
  "objects",
] as const;

const page = (
  css: string,
  body: string,
) => `<!doctype html><html data-theme="light"><head><meta charset="utf-8"><style>${css}
html,body{width:${WIDTH}px;overflow:hidden;background:var(--bg)}
body{background-image:none}
/* The font Ubuntu runners have, so a local render matches CI. */
:root{--mono:"DejaVu Sans Mono",monospace}
#shot{padding:14px}
#shot .panel{margin:0}
.rows{display:grid;grid-template-columns:auto 1fr auto auto;column-gap:14px;row-gap:6px;align-items:center;margin-top:12px}
.rows .name{font-family:var(--mono);font-size:13px;color:var(--fg-2);text-align:right;white-space:nowrap}
.rows .track{position:relative;height:14px}
.rows .track i{position:absolute;left:0;top:0;bottom:0;border-radius:3px}
.rows .track .main{background:color-mix(in oklab,var(--fg-3) 22%,transparent)}
.rows .track .pr{top:3px;bottom:3px;background:var(--line-2)}
.rows .track .pr.bad{background:var(--rose)}
.rows .track .pr.good{background:var(--teal)}
.rows .size{font-family:var(--mono);font-size:13px;color:var(--fg);text-align:right;white-space:nowrap}
.rows .diff{font-family:var(--mono);font-size:13px;font-weight:700;white-space:nowrap;color:var(--fg-3)}
.rows .diff.bad{color:var(--rose)}
.rows .diff.good{color:var(--teal)}
.rows .colhead{font-family:var(--mono);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-3)}
</style></head><body><div id="shot">${body}</div>
<script>document.title = "h=" + Math.ceil(document.querySelector("#shot").getBoundingClientRect().bottom + scrollY)</script>
</body></html>`;

/** Every chart as its own HTML page, in the order of `CHARTS`. */
export const imagePages = (
  head: CiRun,
  base: CiRun | undefined,
  history: CiRun[],
  meta: ImageMeta = {},
): Array<{ name: (typeof CHARTS)[number]; html: string }> => {
  const runs = timeline(head, base, history);
  // Line points are medians over the programs this PR measured, so the line
  // compares like with like even though main measures every SDK.
  const keys = Object.keys(head.programs);
  const branch = meta.pr ? `PR #${meta.pr}` : "this PR";
  const css = readFileSync(join(DASH, "src", "style.css"), "utf8").replaceAll(
    'url("/fonts/',
    `url("file://${join(DASH, "public", "fonts")}/`,
  );
  const byId = (id: string) => METRICS.find((m) => m.id === id)!;

  // Per program: main as a faint bar with an edge, the PR on top, and next to
  // it the PR's size and its change from main.
  type Row = { k: string; h: number; b: number | undefined; note?: string };
  const programs = (m: Metric, custom?: { rows: Row[]; title: string; how: string }) => {
    const rows = (
      custom?.rows ??
      keys.flatMap((k) => {
        const h = m.read(head.programs[k]!);
        if (h === undefined) return [];
        const b = base?.programs[k] && m.read(base.programs[k]!);
        return [{ k, h, b } as Row];
      })
    ).sort((x, y) => y.h - x.h);
    const max = Math.max(...rows.flatMap((r) => [r.h, r.b ?? 0]));
    const w = (n: number) => `${((n / max) * 100).toFixed(2)}%`;
    let changed = 0;
    const html = rows
      .map(({ k, h, b, note }) => {
        let cls = "";
        let diff = "new";
        if (!base) diff = "";
        else if (b !== undefined) {
          const d = h - b;
          const sign = d > 0 ? "+" : d < 0 ? "−" : "±";
          const noise = Math.abs(d) < m.noise(b);
          if (!noise) changed++;
          cls = noise ? "" : d > 0 ? "bad" : "good";
          diff = `${sign}${m.format(Math.abs(d))} (${sign}${Math.abs(b ? (d / b) * 100 : 0).toFixed(1)}%)`;
        }
        if (note) diff = diff ? `${diff} ${note}` : note;
        return `<span class="name">${esc(k)}</span>
<span class="track">${b !== undefined ? `<i class="main" style="width:${w(b)}"></i>` : ""}<i class="pr ${cls}" style="width:${w(h)}"></i></span>
<span class="size">${esc(m.format(h))}</span><span class="diff ${cls}">${esc(diff)}</span>`;
      })
      .join("\n");
    const note = !base ? "" : changed ? ` · ${changed} changed vs main` : " · none changed vs main";
    return `<section class="panel chart-panel">
  <div class="chart-head"><h3>${esc(custom?.title ?? m.label)} <span class="muted">· ${custom ? "every service imported" : "per program"}${note}</span></h3>
  <div class="how">${esc(custom?.how ?? `Faint wide bar = main. Bar on top = this PR (red bigger, teal smaller, grey within noise). Then the PR's ${m.id === "bundle" ? "size" : "heap"} and its change from main.`)}</div></div>
  <div class="rows"><span></span><span></span><span class="colhead">this PR</span><span class="colhead">vs main</span>
${html}</div>
</section>`;
  };

  // Change vs main in percent: main is 0, so the chart shows the move, not the size.
  const line = (m: Metric) => {
    const ref = base ? valueOf(base, m, keys) : valueOf(runs[0]!, m, keys);
    const pct = (v: number | undefined) =>
      v === undefined || !ref ? undefined : ((v - ref) / ref) * 100;
    const fmt = (p: number) =>
      `${p > 0.05 ? "+" : p < -0.05 ? "−" : "±"}${Math.abs(p).toFixed(1)}%`;
    const points = runs.map((r, i) => {
      const c = change(r, runs[i - 1], m, keys);
      return {
        value: pct(valueOf(r, m, keys)),
        label: r === head ? branch : short(r.sha).slice(0, 7),
        branch: r === head,
        cls: !c ? "" : c.noise ? "flat" : c.diff < 0 ? "good" : "bad",
        tip: "",
        id: r.sha,
      };
    });
    return `<section class="panel chart-panel">
  <div class="chart-head"><h3>${esc(m.label)} <span class="muted">· change vs main ${base ? `<code>${esc(short(base.sha))}</code>` : ""} · median per program</span></h3>
  <div class="how">${esc(m.label)} of this PR: ${esc(m.format(valueOf(head, m, keys)))}, main: ${esc(m.format(ref))}. Lower is better.</div></div>
  <div class="chart">${lineChart(points, { format: fmt, branchLabel: "PR", around0: true, minSpan: 1 })}</div>
</section>`;
  };

  const sdkMemory = () =>
    programs(SDK_HEAP, {
      title: "Whole-SDK memory",
      how: "Heap after importing every service module of the SDK in one fresh Node process (what Alchemy loads). Faint wide bar = main. 'unchanged' = the SDK, core, build scripts and lockfile are the same as main's, so main's number is reused.",
      rows: Object.entries(head.providers ?? {}).map(([k, p]) => ({
        k: `${k} (${p.services} services)`,
        h: p.heap,
        b: base?.providers?.[k]?.heap,
        note: p.reused ? "unchanged" : undefined,
      })),
    });

  return CHARTS.filter(
    (name) => name !== "sdk-memory" || Object.keys(head.providers ?? {}).length,
  ).map((name) => ({
    name,
    html: page(
      css,
      name === "sdk-memory"
        ? sdkMemory()
        : name === "bundle-programs"
          ? programs(byId("bundle"))
          : name === "memory-programs"
            ? programs(byId("memory"))
            : line(byId(name)),
    ),
  }));
};

const findChrome = (): string => {
  if (process.env.CHROMIUM) return process.env.CHROMIUM;
  for (const dir of (process.env.PATH ?? "").split(delimiter))
    for (const bin of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"])
      if (dir && existsSync(join(dir, bin))) return join(dir, bin);
  const cache = join(process.env.HOME ?? "", ".cache", "puppeteer", "chrome");
  if (existsSync(cache))
    for (const v of readdirSync(cache).sort().reverse()) {
      const bin = join(cache, v, "chrome-linux64", "chrome");
      if (existsSync(bin)) return bin;
    }
  throw new Error("no Chrome found; set CHROMIUM=/path/to/chrome");
};

const chrome = (args: string[]) =>
  new Promise<string>((resolve, reject) => {
    const proc = spawn(findChrome(), args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d) => (stdout += d));
    proc.stderr.on("data", (d) => (stderr += d));
    proc.on("error", reject);
    proc.on("close", (code) =>
      code === 0
        ? resolve(stdout)
        : reject(new Error(stderr.slice(-2000) || `chrome exited ${code}`)),
    );
  });

/** Writes `<outDir>/<chart>.png` for every chart in `CHARTS`. */
export const renderImages = async (
  head: CiRun,
  base: CiRun | undefined,
  history: CiRun[],
  outDir: string,
  meta: ImageMeta = {},
) => {
  const dir = mkdtempSync(join(tmpdir(), "bench-img-"));
  const common = [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--disable-lcd-text",
    "--font-render-hinting=none",
    "--allow-file-access-from-files",
    "--virtual-time-budget=2000",
    `--user-data-dir=${join(dir, "profile")}`,
  ];
  for (const { name, html } of imagePages(head, base, history, meta)) {
    const src = join(dir, `${name}.html`);
    const out = join(outDir, `${name}.png`);
    writeFileSync(src, html);
    const dom = await chrome([
      ...common,
      `--window-size=${WIDTH},3000`,
      "--dump-dom",
      `file://${src}`,
    ]);
    const height = Number(/<title>h=(\d+)<\/title>/.exec(dom)?.[1] ?? 1200);
    await chrome([
      ...common,
      `--force-device-scale-factor=${SCALE}`,
      `--window-size=${WIDTH},${height}`,
      `--screenshot=${out}`,
      `file://${src}`,
    ]);
    if (!existsSync(out)) throw new Error(`chrome wrote no screenshot to ${out}`);
  }
  rmSync(dir, { recursive: true, force: true });
};
