import { barChart, lineChart, setZoom } from "./charts.js";
import work from "./work.json";

// Every run file in ../runs. Vite watches the glob, so a new run hot-reloads the page.
const modules = import.meta.glob("../runs/*.json", { eager: true, import: "default" });

//#region format

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const fmtBytes = (n) => {
  if (n === undefined) return "—";
  const a = Math.abs(n);
  if (a < 1000) return `${Math.round(n)} B`;
  if (a < 1e6) return `${(n / 1e3).toFixed(1)} KB`;
  return `${(n / 1e6).toFixed(a < 1e7 ? 2 : 1)} MB`;
};
const fmtCount = (n) => (n === undefined ? "—" : Math.round(n).toLocaleString("en-US"));
const fmtMs = (n) =>
  n === undefined
    ? "—"
    : n >= 1000
      ? `${(n / 1000).toFixed(2)} s`
      : `${n.toFixed(n < 10 ? 2 : 1)} ms`;
const fmtUs = (n) => (n === undefined ? "—" : `${n.toFixed(1)} µs`);
const shortSha = (sha) => sha?.slice(0, 9) ?? "?";
const when = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

//#endregion

//#region metrics

/**
 * The three numbers we drive down. Each is read per program (one program per
 * SDK and protocol: 1 auth + 1 operation) and then combined over the run.
 */
const METRICS = [
  {
    id: "bundle",
    label: "Bundle size",
    how: "Minified rolldown bundle of a program that sets up auth and calls 1 operation, gzip -9.",
    read: (p) => p.bundle?.gzip,
    strict: (p) => p.strictBundle?.gzip,
    format: fmtBytes,
    noise: (prev) => prev * 0.003,
  },
  {
    id: "speed",
    label: "Runtime speed",
    how: "Added latency: p50 of a call against a mocked HTTP response minus p50 of a bare mocked round trip.",
    read: (p) => p.runtime?.addedP50Us,
    strict: (p) => p.strictRuntime?.addedP50Us,
    format: fmtUs,
    noise: (prev) => Math.max(0.5, prev * 0.04),
  },
  {
    id: "memory",
    label: "Runtime memory",
    how: "Import heap: V8 heapUsed after importing the SDK modules, minus before (fresh Node, gc twice, Effect preloaded).",
    read: (p) => p.runtime?.importHeap?.heapUsed,
    strict: (p) => p.strictRuntime?.importHeap?.heapUsed,
    format: fmtBytes,
    noise: (prev) => prev * 0.03,
  },
  {
    id: "objects",
    label: "Objects at import",
    how: "Live JS objects added by importing credentials + 1 service module (v8.queryObjects(Object) after gc, in its own process). Recorded since the imports suite was added.",
    read: (p) => p.runtime?.importObjects,
    strict: (p) => p.strictRuntime?.importObjects,
    format: fmtCount,
    noise: (prev) => prev * 0.01,
  },
];

const AGGREGATES = {
  median: {
    label: "median per program",
    combine: (values) => {
      const s = [...values].sort((a, b) => a - b);
      if (!s.length) return undefined;
      const m = s.length >> 1;
      return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
    },
  },
  total: {
    label: "total over all programs",
    combine: (values) => (values.length ? values.reduce((a, b) => a + b, 0) : undefined),
  },
};
// Latency does not add up across programs, so "total" shows its median too.
const aggregateFor = (metric, mode) =>
  metric.id === "speed" ? AGGREGATES.median : AGGREGATES[mode];

/** Map of "sdk · protocol" -> program result for one run. */
const programsOf = (run) => {
  const out = new Map();
  for (const [pkg, sdk] of Object.entries(run.sdks ?? {})) {
    if (sdk.programs)
      for (const [proto, p] of Object.entries(sdk.programs)) out.set(`${pkg} · ${proto}`, p);
    else out.set(`${pkg} · ${sdk.target?.protocol ?? "primary"}`, sdk);
  }
  return out;
};

const valuesOf = (programs, metric, keys) => {
  const out = [];
  for (const key of keys ?? programs.keys()) {
    const v = metric.read(programs.get(key) ?? {});
    if (typeof v === "number" && Number.isFinite(v)) out.push(v);
  }
  return out;
};

//#endregion

//#region timeline

// main's runs in commit order, then the work branch's runs in branch order.
const stepIndex = new Map(work.steps.map((s, i) => [s.sha, i]));
/**
 * Why a run is a one-off experiment, or undefined for a timeline run.
 * Experiments are kept off the timeline: they don't measure a commit as committed.
 */
const experimentReason = (r) => {
  const named = /^experiment\b:?\s*(.*)$/i.exec(r.note ?? "");
  if (named) return named[1] || "experiment";
  if (r.git?.dirty) return r.note || "uncommitted changes";
  if (r.partial) return r.note || `partial run (${Object.keys(r.sdks ?? {}).length} SDKs)`;
  return undefined;
};

const allRuns = Object.values(modules)
  .filter((r) => r && r.schema === 1 && r.sdks)
  .map((r) => ({
    ...r,
    onBranch: stepIndex.has(r.git?.sha),
    programs: programsOf(r),
    experiment: experimentReason(r),
  }));

const runs = allRuns
  .filter((r) => !r.experiment)
  .sort((a, b) => {
    if (a.onBranch !== b.onBranch) return a.onBranch ? 1 : -1;
    if (a.onBranch)
      return (
        stepIndex.get(a.git.sha) - stepIndex.get(b.git.sha) ||
        a.startedAt.localeCompare(b.startedAt)
      );
    return (
      new Date(a.git?.committedAt ?? a.startedAt) - new Date(b.git?.committedAt ?? b.startedAt) ||
      a.startedAt.localeCompare(b.startedAt)
    );
  });
runs.forEach((r, i) => {
  r.index = i + 1;
  r.prev = runs[i - 1];
});
const baseRun = runs.findLast((r) => r.git?.sha === work.base.sha);

// Each experiment compares with the timeline run of its own commit, else the last timeline run before it.
// Kept clear of the normal (--fg) and strict (--code-f) series colours and the official-SDK colours.
const EXP_COLORS = [
  "var(--violet)",
  "#e070d0",
  "var(--teal-2)",
  "var(--rose)",
  "#a3e635",
  "var(--fg-3)",
];
const experiments = allRuns
  .filter((r) => r.experiment)
  .sort((a, b) => a.startedAt.localeCompare(b.startedAt))
  .map((r, i) => ({
    ...r,
    number: i + 1,
    color: EXP_COLORS[i % EXP_COLORS.length],
    baseline:
      runs.findLast((t) => t.git?.sha === r.git?.sha) ??
      runs.findLast((t) => t.startedAt <= r.startedAt) ??
      runs.at(-1),
  }));
const latestRun = runs.at(-1);
/** An experiment covers the same programs as the latest timeline run, so its whole-run value sits on the same scale. */

/** Value of a metric for a run, optionally over only some programs. */
const valueOf = (run, metric, mode, keys) =>
  aggregateFor(metric, mode).combine(valuesOf(run.programs, metric, keys));

/** Change from `before` to `run`, over the programs both runs have. */
const change = (run, before, metric, mode, keys) => {
  if (!before) return undefined;
  const shared = [...(keys ?? run.programs.keys())].filter(
    (k) => run.programs.has(k) && before.programs.has(k),
  );
  const from = valueOf(before, metric, mode, shared);
  const to = valueOf(run, metric, mode, shared);
  if (from === undefined || to === undefined) return undefined;
  const sameSet = shared.length === run.programs.size && shared.length === before.programs.size;
  return {
    from,
    to,
    diff: to - from,
    pct: from ? ((to - from) / from) * 100 : 0,
    noise: Math.abs(to - from) < metric.noise(from),
    sameSet,
    shared: shared.length,
  };
};

const deltaHtml = (c, metric, { big = false } = {}) => {
  if (!c) return `<span class="delta">—</span>`;
  const cls = c.noise ? "flat" : c.diff < 0 ? "good" : "bad";
  const sign = c.diff > 0 ? "+" : c.diff < 0 ? "−" : "±";
  const arrow = c.noise ? "≈" : c.diff < 0 ? "▼" : "▲";
  const title = `${metric.format(c.from)} → ${metric.format(c.to)}${c.sameSet ? "" : ` (over the ${c.shared} programs both runs have)`}${c.noise ? " · within noise" : ""}`;
  return `<span class="delta ${cls}${big ? " big" : ""}" title="${esc(title)}">${arrow} ${sign}${Math.abs(c.pct).toFixed(1)}%<small>${sign}${metric.format(Math.abs(c.diff))}</small></span>`;
};

//#endregion

//#region page

const state = {
  get mode() {
    return localStorage.getItem("bench.mode") === "total" ? "total" : "median";
  },
  get official() {
    return localStorage.getItem("bench.official") === "1";
  },
  get hiddenExp() {
    try {
      return new Set(JSON.parse(localStorage.getItem("bench.expHidden") ?? "[]"));
    } catch {
      return new Set();
    }
  },
  open: new Set(),
  openProv: new Set(),
};

const commitCell = (run) => `
  <div class="commit">
    <span class="sha">${esc(shortSha(run.git?.sha))}</span>
    <span class="tag ${run.onBranch ? "branch" : "main"}">${run.onBranch ? esc(work.branch) : "main"}</span>
    ${run.experiment ? `<span class="tag exp">experiment</span>` : ""}
    ${run.git?.dirty ? `<span class="tag warn">dirty</span>` : ""}
    ${run.partial ? `<span class="tag warn">partial</span>` : ""}
  </div>
  ${run.experiment ? `<div class="expname"><i style="background:${run.color}"></i>E${run.number} · ${esc(run.experiment)}</div>` : ""}
  <div class="subject">${esc(run.git?.subject ?? run.note ?? "")}</div>
  <div class="when">committed ${esc(when(run.git?.committedAt ?? run.startedAt))} · ran ${esc(when(run.startedAt))}</div>`;

const headline = (mode) => {
  const latest = runs.at(-1);
  if (!latest) return "";
  const cards = METRICS.map((m) => {
    const agg = aggregateFor(m, mode);
    return `<div class="card">
      <div class="label">${esc(m.label)}</div>
      <div class="value">${esc(m.format(valueOf(latest, m, mode)))}</div>
      <div class="sub">${esc(agg.label)}</div>
      <div class="vs"><span>since previous run</span>${deltaHtml(change(latest, latest.prev, m, mode), m)}</div>
      ${baseRun && baseRun !== latest ? `<div class="vs"><span>since main <code>${esc(shortSha(work.base.sha))}</code></span>${deltaHtml(change(latest, baseRun, m, mode), m, { big: true })}</div>` : ""}
    </div>`;
  }).join("");
  return `
    <section class="latest">
      <div class="latest-run">
        <div class="eyebrow">Latest run · #${latest.index} of ${runs.length}</div>
        ${commitCell(latest)}
      </div>
      <div class="cards">${cards}</div>
    </section>`;
};

/** Flat reference line for an experiment, valued over `keys` (all its programs if omitted). */
const expRef = (exp, m, mode, keys) => ({
  value: valueOf(exp, m, mode, keys),
  short: `E${exp.number}`,
  label: `E${exp.number} ${exp.experiment}`,
  color: exp.color,
  kind: "exp",
});

/** One chart per metric: every timeline run as a point, plus flat experiment lines and (when ticked) official-SDK lines. */
const metricCharts = (mode, { keys, exps = [], note = "" } = {}) =>
  METRICS.map((m) => {
    const points = runs.map((r) => {
      const c = change(r, r.prev, m, mode, keys);
      const v = valueOf(r, m, mode, keys);
      return {
        value: v,
        label: shortSha(r.git?.sha).slice(0, 7),
        branch: r.onBranch,
        cls: !c ? "" : c.noise ? "flat" : c.diff < 0 ? "good" : "bad",
        tip: `<b>#${r.index} ${esc(shortSha(r.git?.sha))}</b> ${esc(r.git?.subject ?? "")}<br>${esc(m.format(v))} ${c ? deltaHtml(c, m) : ""}`,
        id: r.id,
      };
    });
    return `<section class="panel chart-panel">
      <div class="chart-head">
        <h3>${esc(m.label)} <span class="muted">· ${esc(aggregateFor(m, mode).label)}${note ? ` · ${esc(note)}` : ""} · lower is better</span></h3>
        <div class="how">${esc(m.how)}</div>
      </div>
      <div class="chart" data-metric="${m.id}">${lineChart(points, {
        format: m.format,
        branchLabel: work.branch,
        refs: [
          ...exps.map((e) => expRef(e, m, mode, keys)),
          ...(state.official ? officialRefs(m, mode) : []),
        ],
        // Same aggregate over the strict-mode programs (ResponseValidation.strict); runs before the strict suite have none.
        second: m.strict
          ? {
              label: "strict",
              values: runs.map((r) => valueOf(r, { ...m, read: m.strict }, mode, keys)),
            }
          : undefined,
      })}</div>
    </section>`;
  }).join("");

const charts = (mode) => {
  const run = officialRun();
  const toggle = run
    ? `<label class="exp-toggle"><input type="checkbox" id="official-on-charts" ${state.official ? "checked" : ""}/> Show official SDKs on every chart</label>
       <span class="muted small">One flat line per official SDK (AWS SDK v3, cloudflare, @google-cloud/storage), measured in run #${run.index} on the ${Object.keys(run.official).length} calls it makes. Hover a column to see distilled on those same calls.</span>`
    : "";
  return `${toggle ? `<div class="chart-tools">${toggle}</div>` : ""}${metricCharts(mode)}`;
};

const experimentsSection = (mode) => {
  const head = `<div class="log-head"><h3 id="experiments">Experiments</h3>
    <span class="muted">One-off runs: <code>pnpm bench -- --experiment "name"</code>, or any run with uncommitted changes or <code>--only</code>. They stay off the timeline. Here each one is a flat line across the timeline, so you can see where it lands against every commit.</span></div>`;
  if (!experiments.length)
    return `<section class="panel">${head}<div class="empty small">No experiments yet. Record one with <code>pnpm bench -- --experiment "what I tried"</code>.</div></section>`;
  const hidden = state.hiddenExp;
  const shown = experiments.filter((e) => !hidden.has(e.id));
  const chips = [...experiments]
    .reverse()
    .map(
      (
        e,
      ) => `<label class="exp-chip ${hidden.has(e.id) ? "off" : ""}"><input type="checkbox" data-exp="${esc(e.id)}" ${hidden.has(e.id) ? "" : "checked"}/>
        <i style="background:${e.color}"></i><b>E${e.number}</b> ${esc(e.experiment)} <span class="muted">· ${esc(shortSha(e.git?.sha))}${e.git?.dirty ? "*" : ""} · ${esc(when(e.startedAt))} · ${e.programs.size} programs</span></label>`,
    )
    .join("");
  if (!shown.length)
    return `<section class="panel">${head}<div class="exp-chips">${chips}</div><div class="empty small">Tick an experiment to compare it.</div></section>`;

  // Compare like for like: only programs every ticked experiment ran.
  let keys = [...shown[0].programs.keys()];
  for (const e of shown.slice(1)) keys = keys.filter((k) => e.programs.has(k));
  const subset = latestRun && keys.length < latestRun.programs.size;
  const note = subset
    ? `over the ${keys.length} programs ${shown.length > 1 ? "every ticked experiment ran" : "this experiment ran"}`
    : "";

  const table = `<table class="exp-table">
    <thead><tr><th class="left">Experiment</th>${METRICS.map((m) => `<th>${esc(m.label)}</th>`).join("")}</tr></thead>
    <tbody>${shown
      .map((e) => {
        const cell = (m) => {
          const vsBase = change(e, e.baseline, m, mode, keys);
          const vsLatest =
            e.baseline === latestRun ? undefined : change(e, latestRun, m, mode, keys);
          return `<td><div class="v">${esc(m.format(valueOf(e, m, mode, keys)))}</div>
            <div class="vsrow"><span>vs #${e.baseline?.index}</span>${deltaHtml(vsBase, m)}</div>
            ${vsLatest ? `<div class="vsrow"><span>vs latest #${latestRun.index}</span>${deltaHtml(vsLatest, m)}</div>` : ""}</td>`;
        };
        return `<tr><td class="left"><div class="expname"><i style="background:${e.color}"></i>E${e.number} · ${esc(e.experiment)}</div>
          <div class="when">on <span class="sha">${esc(shortSha(e.git?.sha))}</span>${e.git?.dirty ? " with uncommitted changes" : ""} · compared with run #${e.baseline?.index} (${esc(shortSha(e.baseline?.git?.sha))}), ${e.baseline?.git?.sha === e.git?.sha ? "the same commit" : "the last timeline run before it"}</div></td>
          ${METRICS.map(cell).join("")}</tr>`;
      })
      .join("")}</tbody></table>`;

  return `<section class="panel exp-section">${head}<div class="exp-chips">${chips}</div>${table}</section>
    <div class="charts">${metricCharts(mode, { keys, exps: shown, note })}</div>`;
};

//#region providers

/**
 * The per-provider measurements, charted over time and across providers.
 * `read` gives one provider's value; `all` combines providers for the "All providers" line.
 */
const median = (xs) => {
  const s = xs.filter((x) => typeof x === "number" && Number.isFinite(x)).sort((a, b) => a - b);
  if (!s.length) return undefined;
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const sumOf = (xs) => {
  const v = xs.filter((x) => typeof x === "number" && Number.isFinite(x));
  return v.length ? v.reduce((a, b) => a + b, 0) : undefined;
};
const serviceTimes = (sdk) => Object.values(sdk?.services ?? {}).map((v) => v.importMs);
const allPairs = (run) =>
  Object.entries(run.sdks ?? {}).flatMap(([pkg, sdk]) =>
    Object.entries(sdk.services ?? {}).map(([name, v]) => ({ pkg, name, ...v })),
  );

const PROV_METRICS = [
  {
    id: "tarball",
    label: "Download size (tar.gz)",
    how: "Gzipped tarball npm would download for the SDK package alone (npm pack). An official SDK line counts the SDK plus every dependency npm installs; hover for distilled measured that way (+ core + effect).",
    read: (sdk) => sdk?.size?.tarball,
    // npm install downloads the official SDK with its dependencies; `distilled` is the same measurement of the distilled package (+ core + effect).
    official: {
      read: (o) => o.size?.withDeps,
      distilled: (o) => o.size?.distilled?.withDeps,
      what: "with its dependencies",
    },
    all: (run) => sumOf(Object.values(run.sdks).map((s) => s.size?.tarball)),
    allLabel: "total over all providers",
    format: fmtBytes,
  },
  {
    id: "heap",
    label: "Heap, provider imported",
    how: "Retained V8 heap after importing every service module of the provider in a fresh Node process (Effect loaded first).",
    read: (sdk) => sdk?.provider?.heap,
    // Only an official SDK that ships the whole API in one package (cloudflare) matches "every service imported".
    // The best first-party option: one client per service (AWS, GCS), the whole SDK where that is the only package (cloudflare).
    official: { read: (o) => o.runtime?.importHeap, perService: (v) => v?.heap },
    all: (run) => sumOf(Object.values(run.sdks).map((s) => s.provider?.heap)),
    allLabel: "total over all providers",
    format: fmtBytes,
  },
  {
    id: "objects",
    label: "Objects, provider imported",
    how: "Live JS objects added by importing every service module of the provider (v8.queryObjects after gc, own process).",
    read: (sdk) => sdk?.provider?.objects,
    official: { read: (o) => o.runtime?.importObjects },
    all: (run) => sumOf(Object.values(run.sdks).map((s) => s.provider?.objects)),
    allLabel: "total over all providers",
    format: fmtCount,
  },
  {
    id: "import",
    label: "Import time per service",
    how: "Time to import one service module alone in a fresh Node process (Effect loaded first), fastest of 3 processes (runs before this change used 1). Median over the services.",
    read: (sdk) => median(serviceTimes(sdk)),
    official: { read: (o) => o.runtime?.importMs, perService: (v) => v?.importMs },
    all: (run) => median(allPairs(run).map((p) => p.importMs)),
    allLabel: "median over every provider/service pair",
    format: fmtMs,
  },
];

const providerCharts = () => {
  const run = latestRun;
  if (!run) return "";
  const pkgs = Object.keys(run.sdks).sort();
  const chosen = pkgs.includes(localStorage.getItem("bench.provider"))
    ? localStorage.getItem("bench.provider")
    : "";
  const showAll = localStorage.getItem("bench.barsAll") === "1";
  const TOP = 25;
  // "Show top 25" counts only distilled rows and always keeps the official ones.
  const cut = (rows) => {
    if (showAll) return rows;
    let n = 0;
    return rows.filter((r) => r.official || n++ < TOP);
  };
  const more = (rows) =>
    rows.filter((r) => !r.official).length > TOP
      ? `<button type="button" class="linkbtn" data-bars-all>${showAll ? `Show top ${TOP}` : `Show all ${rows.length}`}</button>`
      : "";
  const withData = runs.filter((r) => Object.values(r.sdks).some((s) => s.provider)).length;
  const offRun = officialRun();
  // Official SDKs for the chosen provider, only while "Show official SDKs on every chart" is ticked.
  const vendor =
    state.official && offRun ? OFFICIAL_VENDORS.find((v) => v.pkg === chosen) : undefined;
  const offEntries = vendor
    ? Object.entries(offRun.official).filter(([id]) => vendor.match(id))
    : [];

  /** One flat line per vendor: the median over its clients, with distilled on the matching services in the tooltip. */
  const provRefs = (m) => {
    if (!offEntries.length || !m.official) return [];
    const vals = offEntries.map(([, o]) => m.official.read(o)).filter((x) => Number.isFinite(x));
    if (!vals.length) return [];
    const svcs = offEntries.map(([id]) => vendor.service(id)).filter(Boolean);
    const n = vals.length;
    return [
      {
        value: median(vals),
        short: vendor.name,
        label: `${vendor.name}${vendor.whole ? " (whole SDK, its only package)" : n > 1 ? ` · median of ${n} clients` : " · one client"}${m.official.what ? ` ${m.official.what}` : ""} · run #${offRun.index}`,
        color: vendor.color,
        kind: "official",
        detail: (i) => {
          if (m.official.distilled) {
            const d = median(offEntries.map(([, o]) => m.official.distilled(o)));
            return Number.isFinite(d)
              ? `distilled ${chosen} + core + effect, same measurement, run #${offRun.index}: ${m.format(d)}`
              : "";
          }
          const sdk = runs[i].sdks[chosen];
          // Like for like where the data allows: the matching distilled services, else the whole provider.
          const per =
            m.official.perService && svcs.length
              ? median(svcs.map((s) => m.official.perService(sdk?.services?.[s])))
              : undefined;
          const d = Number.isFinite(per) ? per : m.read(sdk);
          const what = Number.isFinite(per)
            ? `${svcs.map((s) => `${chosen}/${s}`).join(", ")}${svcs.length > 1 ? " (median)" : ""}`
            : `${chosen}, every service`;
          return Number.isFinite(d) ? `distilled ${what}: ${m.format(d)}` : "";
        },
      },
    ];
  };

  // Over time: one point per timeline run.
  const lines = PROV_METRICS.map((m) => {
    const points = runs.map((r) => {
      const v = chosen ? m.read(r.sdks[chosen]) : m.all(r);
      const prevV = r.prev ? (chosen ? m.read(r.prev.sdks[chosen]) : m.all(r.prev)) : undefined;
      const d = typeof v === "number" && typeof prevV === "number" ? v - prevV : undefined;
      return {
        value: v,
        label: shortSha(r.git?.sha).slice(0, 7),
        branch: r.onBranch,
        cls: d === undefined || d === 0 ? "" : d < 0 ? "good" : "bad",
        tip: `<b>#${r.index} ${esc(shortSha(r.git?.sha))}</b> ${esc(r.git?.subject ?? "")}<br>${esc(m.format(v))}${d ? ` (${d > 0 ? "+" : "−"}${esc(m.format(Math.abs(d)))})` : ""}`,
        id: r.id,
      };
    });
    return `<section class="panel chart-panel">
      <div class="chart-head">
        <h3>${esc(m.label)} <span class="muted">· ${chosen ? esc(chosen) : esc(m.allLabel)} · over time</span></h3>
        <div class="how">${esc(m.how)}</div>
      </div>
      <div class="chart">${lineChart(points, { format: m.format, branchLabel: work.branch, refs: provRefs(m), seriesLabel: "distilled" })}</div>
    </section>`;
  }).join("");

  // Latest run: bars across providers, or across one provider's services.
  let bars;
  if (!chosen) {
    const byProvider = (m) =>
      pkgs
        .map((pkg) => ({ label: pkg, key: pkg, value: m.read(run.sdks[pkg]) }))
        .filter((r) => typeof r.value === "number")
        .sort((a, b) => b.value - a.value);
    const pairs = allPairs(run)
      .map((p) => ({ label: `${p.pkg}/${p.name}`, key: p.pkg, value: p.importMs }))
      .filter((r) => typeof r.value === "number")
      .sort((a, b) => b.value - a.value);
    const block = (title, how, rows, format) => `<section class="panel chart-panel">
        <div class="chart-head"><h3>${esc(title)} <span class="muted">· run #${run.index} · ${rows.length} rows, largest first</span></h3><div class="how">${esc(how)}</div></div>
        <div class="chart bars">${barChart(cut(rows), { format })}</div>${more(rows)}
      </section>`;
    bars = [
      block(
        "Download size per provider",
        "SDK tar.gz. Click a provider to see only its charts.",
        byProvider(PROV_METRICS[0]),
        fmtBytes,
      ),
      block(
        "Heap per provider",
        "Every service of the provider imported in one process.",
        byProvider(PROV_METRICS[1]),
        fmtBytes,
      ),
      block(
        "Objects per provider",
        "Live JS objects with every service of the provider imported.",
        byProvider(PROV_METRICS[2]),
        fmtCount,
      ),
      block(
        "Import time per provider/service pair",
        "One service module imported alone, fresh process each. Slowest first.",
        pairs,
        fmtMs,
      ),
    ].join("");
  } else {
    const svc = Object.entries(run.sdks[chosen].services ?? {});
    // Official clients sit among the services, in the vendor colour, with the matching distilled service as the sub label.
    const rows = (read, offRead, format) =>
      [
        ...svc.map(([name, v]) => ({ label: `${chosen}/${name}`, value: read(v) })),
        ...offEntries.map(([id, o]) => {
          const s = vendor.service(id);
          const d = s ? read(run.sdks[chosen].services?.[s] ?? {}) : undefined;
          return {
            label: vendor.whole
              ? `${o.packages.join(" + ")} npm (whole SDK)`
              : o.packages.join(" + "),
            value: offRead(o),
            sub: `official${Number.isFinite(d) ? ` · distilled ${s}: ${format(d)}` : ""}`,
            color: vendor.color,
            official: true,
          };
        }),
      ]
        .filter((r) => typeof r.value === "number")
        .sort((a, b) => b.value - a.value);
    const block = (title, list, format) => `<section class="panel chart-panel">
        <div class="chart-head"><h3>${esc(title)} <span class="muted">· run #${run.index} · ${list.filter((r) => !r.official).length} services, largest first</span></h3><div class="how">Each service module imported alone in a fresh Node process, Effect loaded first.${
          offEntries.length
            ? ` Official SDKs (coloured) load their whole dependency tree with nothing preloaded, measured in run #${offRun.index}.`
            : ""
        }</div></div>
        <div class="chart bars">${barChart(cut(list), { format })}</div>${more(list)}
      </section>`;
    bars =
      block(
        `Import time per ${chosen} service`,
        rows(
          (v) => v.importMs,
          (o) => o.runtime?.importMs,
          fmtMs,
        ),
        fmtMs,
      ) +
      block(
        `Heap per ${chosen} service`,
        rows(
          (v) => v.heap,
          (o) => o.runtime?.importHeap,
          fmtBytes,
        ),
        fmtBytes,
      );
  }

  return `<section class="prov-charts">
    <div class="log-head">
      <h3 id="provider-charts">Per provider</h3>
      <label class="prov-pick">Provider <select id="pick-provider"><option value="">All providers</option>${pkgs
        .map(
          (p) => `<option value="${esc(p)}" ${p === chosen ? "selected" : ""}>${esc(p)}</option>`,
        )
        .join("")}</select></label>
      <div class="prov-quick" role="group" aria-label="Quick provider pick">${[
        ["", "All"],
        ["aws", "AWS"],
        ["cloudflare", "Cloudflare"],
        ["gcp", "GCP"],
      ]
        .filter(([p]) => !p || pkgs.includes(p))
        .map(
          ([p, name]) =>
            `<button type="button" data-provider-pick="${p}" class="${p === chosen ? "on" : ""}">${name}</button>`,
        )
        .join("")}</div>
      <span class="muted small">Heap, objects and per-service import times exist in ${withData} of ${runs.length} timeline runs (the imports suite is new), so those lines start late.</span>
    </div>
    <div class="charts">${lines}</div>
    <div class="charts bars-grid">${bars}</div>
  </section>`;
};

/** Per-provider numbers: one row per SDK package, from the latest timeline run. */
const PROVIDER_COLS = [
  {
    id: "tarball",
    label: "Download",
    sub: "SDK tar.gz",
    read: (s) => s.size?.tarball,
    format: fmtBytes,
    noise: () => 0,
  },
  {
    id: "tarballWithCore",
    label: "Download + core",
    sub: "SDK + core tar.gz",
    read: (s, run) =>
      s.size?.tarballWithCore ??
      (s.size?.tarball !== undefined && run.baselines?.size?.core?.tarball !== undefined
        ? s.size.tarball + run.baselines.size.core.tarball
        : undefined),
    format: fmtBytes,
    noise: () => 0,
  },
  {
    id: "heap",
    label: "Heap",
    sub: "all services imported",
    read: (s) => s.provider?.heap,
    format: fmtBytes,
    noise: (v) => v * 0.03,
  },
  {
    id: "objects",
    label: "Objects",
    sub: "all services imported",
    read: (s) => s.provider?.objects,
    format: fmtCount,
    noise: (v) => v * 0.01,
  },
  {
    id: "importAll",
    label: "Import",
    sub: "all services",
    read: (s) => s.provider?.importMs,
    format: fmtMs,
    noise: (v) => v * 0.1,
  },
  {
    id: "importMedian",
    label: "Import 1 service",
    sub: "median",
    read: (s) => s.provider?.serviceImportMedianMs,
    format: fmtMs,
    noise: (v) => v * 0.1,
  },
  {
    id: "importMax",
    label: "Slowest service",
    sub: "import",
    read: (s) => s.provider?.serviceImportMaxMs,
    format: fmtMs,
    noise: (v) => v * 0.1,
  },
];

/** Signed % change for a single number, coloured like the run deltas. */
const smallDelta = (from, to, noise, format) => {
  if (typeof from !== "number" || typeof to !== "number") return "";
  const d = to - from;
  if (d === 0) return "";
  const cls = Math.abs(d) <= noise(from) ? "flat" : d < 0 ? "good" : "bad";
  const pct = from ? `${d > 0 ? "+" : "−"}${Math.abs((d / from) * 100).toFixed(1)}%` : "new";
  return `<span class="delta ${cls}" title="${esc(`${format(from)} → ${format(to)}`)}">${pct}</span>`;
};

/** The official-SDK value for a chart metric. */
const OFFICIAL_READ = {
  bundle: (o) => o.bundle?.gzip,
  speed: (o) => o.runtime?.addedP50Us,
  memory: (o) => o.runtime?.importHeap,
  objects: (o) => o.runtime?.importObjects,
};
// Kept clear of the normal/strict series colours and the experiment colours.
const OFFICIAL_VENDORS = [
  // pkg: the distilled package; service(id): the distilled service it matches; whole: one package holds the whole API.
  {
    name: "AWS SDK v3",
    color: "#ff9900",
    pkg: "aws",
    match: (id) => id.startsWith("aws-sdk-v3/"),
    service: (id) => id.slice("aws-sdk-v3/".length),
  },
  {
    name: "cloudflare (npm)",
    color: "#d4b106",
    pkg: "cloudflare",
    whole: true,
    match: (id) => id.startsWith("cloudflare/"),
    service: (id) => id.split("/")[1]?.split(".")[0],
  },
  {
    name: "@google-cloud/storage",
    color: "#34a853",
    pkg: "gcp",
    match: (id) => id.startsWith("gcp/"),
    service: (id) => (id.startsWith("gcp/storage") ? "storage_v1" : undefined),
  },
];

const officialRun = () => runs.findLast((r) => r.official);

/**
 * One flat line per official SDK: its calls, combined with the same aggregate as the chart.
 * The tooltip adds distilled on those same calls at the hovered run, because the main
 * line covers every program and the official SDKs cover only a few calls.
 */
const officialRefs = (m, mode) => {
  const run = officialRun();
  if (!run || !OFFICIAL_READ[m.id]) return [];
  const entries = Object.entries(run.official);
  return OFFICIAL_VENDORS.map((v) => {
    const mine = entries.filter(([id]) => v.match(id));
    const keys = mine.map(([, o]) => `${o.compare.pkg} · ${o.compare.protocol}`);
    const vals = mine.map(([, o]) => OFFICIAL_READ[m.id](o)).filter((x) => Number.isFinite(x));
    const n = vals.length;
    return {
      value: n ? aggregateFor(m, mode).combine(vals) : NaN,
      short: v.name,
      label: `${v.name} · ${n} call${n === 1 ? "" : "s"} · run #${run.index}`,
      color: v.color,
      kind: "official",
      detail: (i) => {
        const d = valueOf(runs[i], m, mode, keys);
        return Number.isFinite(d)
          ? `distilled on the same call${n === 1 ? "" : "s"}: ${m.format(d)}`
          : "";
      },
    };
  });
};

/**
 * Official SDKs (AWS SDK v3, cloudflare, @google-cloud/storage) next to
 * distilled on the same call: newest timeline run that recorded them.
 */
const officialSection = () => {
  const run = [...runs].reverse().find((r) => r.official);
  if (!run) return "";
  const cols = [
    {
      label: "Download (with deps)",
      off: (o) => o.size?.withDeps,
      disOff: (o) => o.size?.distilled?.withDeps,
      disLabel: "distilled + core + effect",
      format: fmtBytes,
    },
    {
      label: "Bundle (gzip)",
      off: (o) => o.bundle?.gzip,
      dis: (p) => p.bundle?.gzip,
      strict: (p) => p.strictBundle?.gzip,
      format: fmtBytes,
    },
    {
      label: "Import memory",
      off: (o) => o.runtime?.importHeap,
      dis: (p) => p.runtime?.importHeap?.heapUsed,
      strict: (p) => p.strictRuntime?.importHeap?.heapUsed,
      format: fmtBytes,
    },
    {
      label: "Objects at import",
      off: (o) => o.runtime?.importObjects,
      dis: (p) => p.runtime?.importObjects,
      strict: (p) => p.strictRuntime?.importObjects,
      format: fmtCount,
    },
    {
      label: "First call",
      off: (o) => o.runtime?.firstCallMs,
      dis: (p) => p.runtime?.firstCallMs,
      strict: (p) => p.strictRuntime?.firstCallMs,
      format: (v) => (Number.isFinite(v) ? `${v.toFixed(1)} ms` : "—"),
    },
    {
      label: "Added latency",
      off: (o) => o.runtime?.addedP50Us,
      dis: (p) => p.runtime?.addedP50Us,
      strict: (p) => p.strictRuntime?.addedP50Us,
      format: fmtUs,
    },
  ];
  const ratio = (d, o) =>
    Number.isFinite(d) && Number.isFinite(o) && o > 0
      ? `<span class="${d < o ? "good-text" : "bad-text"}">${d < o ? `${(o / d).toFixed(1)}× smaller` : `${(d / o).toFixed(1)}× larger`}</span>`
      : "";
  const rows = Object.entries(run.official)
    .map(([id, o]) => {
      const p = run.programs.get(`${o.compare.pkg} · ${o.compare.protocol}`) ?? {};
      const cells = cols
        .map((c) => {
          const ov = c.off(o);
          const dv = c.disOff ? c.disOff(o) : c.dis(p);
          const sub = c.strict
            ? `distilled ${esc(c.format(dv))} · strict ${esc(c.format(c.strict(p)))}`
            : `${esc(c.disLabel)} ${esc(c.format(dv))}`;
          return `<td><div class="v">${esc(c.format(ov))}</div><div class="muted small">${sub}</div><div class="small">${ratio(dv, ov)}</div></td>`;
        })
        .join("");
      return `<tr><td class="left"><b>${esc(o.label)}</b><div class="muted small"><code>${esc(o.packages.join(", "))}</code> vs distilled ${esc(o.compare.pkg)} · ${esc(o.compare.protocol)}</div>${o.error ? `<div class="bad-text small">${esc(o.error)}</div>` : ""}</td>${cells}</tr>`;
    })
    .join("");
  return `<section class="panel">
    <div class="log-head">
      <h3 id="official">Official SDKs</h3>
      <span class="muted">Run #${run.index} (<code>${esc(shortSha(run.git?.sha))}</code>). Each official SDK makes the same call as the distilled program, against the same mocked response, measured the same way. Big number: official SDK. Below: distilled normal and strict, and how distilled (normal) compares.</span>
    </div>
    <div class="scroll"><table class="providers">
      <thead><tr><th class="left">Call</th>${cols.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </section>`;
};

const providersSection = () => {
  const run = latestRun;
  if (!run) return "";
  const prev = run.prev;
  const sortId = localStorage.getItem("bench.provSort") ?? "heap";
  const col = PROVIDER_COLS.find((c) => c.id === sortId) ?? PROVIDER_COLS[0];
  const pkgs = Object.keys(run.sdks).sort((a, b) => {
    const x = col.read(run.sdks[a], run);
    const y = col.read(run.sdks[b], run);
    return (y ?? -Infinity) - (x ?? -Infinity) || a.localeCompare(b);
  });
  const hasImports = pkgs.some((p) => run.sdks[p].provider);
  const totalCell = (c) => {
    if (c.id === "importMedian" || c.id === "importMax") return "";
    const xs = pkgs.map((p) => c.read(run.sdks[p], run)).filter((v) => typeof v === "number");
    if (!xs.length) return "—";
    const sum = esc(c.format(xs.reduce((a, b) => a + b, 0)));
    return xs.length < pkgs.length
      ? `${sum} <span class="muted" title="only providers with this number">(${xs.length} of ${pkgs.length})</span>`
      : sum;
  };
  const rows = pkgs
    .map((pkg) => {
      const sdk = run.sdks[pkg];
      const before = prev?.sdks?.[pkg];
      const open = state.openProv.has(pkg);
      const services = Object.keys(sdk.services ?? {}).length;
      const cells = PROVIDER_COLS.map((c) => {
        const v = c.read(sdk, run);
        return `<td><div class="v">${esc(c.format(v))}</div>${before ? smallDelta(c.read(before, prev), v, c.noise, c.format) : ""}</td>`;
      }).join("");
      return `<tr class="prov ${open ? "open" : ""}" data-prov="${esc(pkg)}">
          <td class="left"><b>${esc(pkg)}</b> ${services ? `<span class="muted small">${services} service${services === 1 ? "" : "s"}</span>` : ""}</td>
          ${cells}
        </tr>
        ${open ? `<tr class="detail"><td colspan="${PROVIDER_COLS.length + 1}" class="left">${servicesTable(pkg, sdk, before)}</td></tr>` : ""}`;
    })
    .join("");
  return `<section class="panel">
    <div class="log-head">
      <h3 id="providers">Providers table</h3>
      <span class="muted">Latest run #${run.index} (<code>${esc(shortSha(run.git?.sha))}</code>), one row per SDK package. Changes are from run #${prev?.index ?? "—"}. Click a header to sort, a row for every service.${
        hasImports
          ? ""
          : " Heap, objects and import times come from the imports suite; the next full run records them."
      }</span>
    </div>
    <div class="scroll prov-box">
    <table class="providers">
      <thead><tr><th class="left">Provider</th>${PROVIDER_COLS.map((c) => `<th data-sort="${c.id}" class="${c.id === col.id ? "sorted" : ""}">${esc(c.label)}<div class="thsub">${esc(c.sub)}</div></th>`).join("")}</tr>
      <tr class="totals"><td class="left">All ${pkgs.length} providers</td>${PROVIDER_COLS.map((c) => `<td>${totalCell(c)}</td>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>
  </section>`;
};

/** Every service of one provider: import time and heap when imported alone. */
const servicesTable = (pkg, sdk, before) => {
  const services = Object.entries(sdk.services ?? {});
  if (!services.length)
    return `<div class="muted">No per-service numbers in this run. The imports suite records them.</div>`;
  services.sort((a, b) => (b[1].importMs ?? 0) - (a[1].importMs ?? 0));
  const ms = { format: fmtMs, noise: (v) => v * 0.1 };
  const by = { format: fmtBytes, noise: (v) => v * 0.03 };
  return `<p class="muted small">Each service imported alone in a fresh Node process with Effect already loaded, slowest first.</p>
    <div class="svc-scroll"><table class="services">
      <thead><tr><th class="left">${esc(pkg)} / service</th><th>Import time</th><th>Heap</th></tr></thead>
      <tbody>${services
        .map(([name, v]) => {
          const b = before?.services?.[name];
          return `<tr><td class="left mono">${esc(pkg)}/${esc(name)}</td>
            <td>${esc(fmtMs(v.importMs))} ${b ? smallDelta(b.importMs, v.importMs, ms.noise, ms.format) : ""}</td>
            <td>${esc(fmtBytes(v.heap))} ${b ? smallDelta(b.heap, v.heap, by.noise, by.format) : ""}</td></tr>`;
        })
        .join("")}</tbody>
    </table></div>`;
};

//#endregion

const movers = (run, prev) => {
  if (!prev) return `<div class="muted">First run. Nothing to compare with.</div>`;
  const added = [...run.programs.keys()].filter((k) => !prev.programs.has(k));
  const removed = [...prev.programs.keys()].filter((k) => !run.programs.has(k));
  const blocks = METRICS.map((m) => {
    const rows = [];
    for (const [key, p] of run.programs) {
      const before = prev.programs.get(key);
      if (!before) continue;
      const a = m.read(before);
      const b = m.read(p);
      if (typeof a !== "number" || typeof b !== "number" || a === 0 || a === b) continue;
      rows.push({ key, a, b, diff: b - a, pct: ((b - a) / a) * 100 });
    }
    rows.sort((x, y) => Math.abs(y.pct) - Math.abs(x.pct));
    const better = rows.filter((r) => r.diff < 0).length;
    const worse = rows.filter((r) => r.diff > 0).length;
    const top = rows.slice(0, 6);
    return `<div class="mover">
      <h4>${esc(m.label)} <span class="muted">${better} programs down, ${worse} up</span></h4>
      ${
        top.length
          ? `<ul>${top
              .map(
                (r) =>
                  `<li><span class="prog">${esc(r.key)}</span><span class="ab">${esc(m.format(r.a))} → ${esc(m.format(r.b))}</span><span class="delta ${Math.abs(r.diff) < m.noise(r.a) ? "flat" : r.diff < 0 ? "good" : "bad"}">${r.diff > 0 ? "+" : "−"}${Math.abs(r.pct).toFixed(1)}%</span></li>`,
              )
              .join("")}</ul>`
          : `<div class="muted">no data</div>`
      }
    </div>`;
  }).join("");
  const setNote = run.experiment
    ? removed.length
      ? `<p class="setnote">This experiment ran ${run.programs.size} of the ${prev.programs.size} programs in run #${prev.index}. The % changes use only those.</p>`
      : ""
    : added.length || removed.length
      ? `<p class="setnote">Program set changed: ${added.length ? `${added.length} added (${esc(added.slice(0, 6).join(", "))}${added.length > 6 ? ", …" : ""})` : ""}${added.length && removed.length ? "; " : ""}${removed.length ? `${removed.length} removed (${esc(removed.slice(0, 6).join(", "))}${removed.length > 6 ? ", …" : ""})` : ""}. The % changes on this row use only the programs both runs have.</p>`
      : "";
  return `${setNote}<p class="muted small">Biggest per-program changes from run #${prev.index} (<code>${esc(shortSha(prev.git?.sha))}</code>) to this ${run.experiment ? "experiment" : "run"}.</p><div class="movers">${blocks}</div>`;
};

const log = (mode) => {
  // Branch commits with no run still get a row, so the log matches the branch history.
  const mainRows = runs.filter((r) => !r.onBranch).map((run) => ({ run }));
  const branchRows = work.steps.flatMap((step) => {
    const ran = runs.filter((r) => r.git?.sha === step.sha);
    return ran.length ? ran.map((run) => ({ run })) : [{ step }];
  });
  const all = [...mainRows, ...branchRows].reverse().flatMap((x) => {
    const exps = x.run
      ? experiments
          .filter((e) => e.baseline === x.run)
          .reverse()
          .map((exp) => ({ exp }))
      : [];
    return [...exps, x];
  });

  const body = all
    .map((x) => {
      if (x.step)
        return `<tr class="norun"><td class="num"></td><td class="left"><div class="commit"><span class="sha">${esc(shortSha(x.step.sha))}</span><span class="tag branch">${esc(work.branch)}</span><span class="tag">no run</span></div><div class="subject">${esc(x.step.subject)}</div></td><td colspan="${METRICS.length + 1}" class="left muted">Not benchmarked. Its effect shows up in the next run above.</td></tr>`;
      if (x.exp) {
        const e = x.exp;
        const open = state.open.has(e.id);
        const cells = METRICS.map(
          (m) =>
            `<td><div class="v">${esc(m.format(valueOf(e, m, mode)))}</div>${deltaHtml(change(e, e.baseline, m, mode), m)}</td>`,
        ).join("");
        return `<tr class="run exp ${open ? "open" : ""}" data-id="${esc(e.id)}" id="run-${esc(e.id)}">
          <td class="num">E${e.number}</td>
          <td class="left">${commitCell(e)}<div class="basenote exp">Off the timeline. Changes are from run #${e.baseline?.index}.</div></td>
          ${cells}
          <td>${e.programs.size}</td>
        </tr>
        ${open ? `<tr class="detail"><td></td><td colspan="${METRICS.length + 2}" class="left">${movers(e, e.baseline)}</td></tr>` : ""}`;
      }
      const r = x.run;
      const open = state.open.has(r.id);
      const cells = METRICS.map(
        (m) =>
          `<td><div class="v">${esc(m.format(valueOf(r, m, mode)))}</div>${deltaHtml(change(r, r.prev, m, mode), m)}</td>`,
      ).join("");
      const progs = r.programs.size;
      const progNote =
        r.prev && r.prev.programs.size !== progs
          ? ` <span class="tag warn" title="previous run had ${r.prev.programs.size}">was ${r.prev.programs.size}</span>`
          : "";
      return `<tr class="run ${open ? "open" : ""} ${r === baseRun ? "base" : ""}" data-id="${esc(r.id)}" id="run-${esc(r.id)}">
          <td class="num">#${r.index}</td>
          <td class="left">${commitCell(r)}${r === baseRun ? `<div class="basenote">Base of ${esc(work.branch)}: every "since main" number compares with this run.</div>` : ""}</td>
          ${cells}
          <td>${progs}${progNote}</td>
        </tr>
        ${open ? `<tr class="detail"><td></td><td colspan="${METRICS.length + 2}" class="left">${r.prev ? movers(r, r.prev) : `<div class="muted">First run. Nothing to compare with.</div>`}</td></tr>` : ""}`;
    })
    .join("");
  return `<section class="panel">
    <div class="log-head">
      <h3>Every run, newest first</h3>
      <span class="muted">Each change is from the run on the row below. Teal went down, rose went up, grey is within noise. Rows tagged experiment sit above the run they compare with and are not on the charts. Click a row to see which programs moved.</span>
    </div>
    <table class="log">
      <thead><tr><th class="num"></th><th class="left">Commit</th>${METRICS.map((m) => `<th>${esc(m.label)}<div class="thsub">${esc(aggregateFor(m, mode).label)}</div></th>`).join("")}<th>Programs</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
  </section>`;
};

//#region zoom

/**
 * Drag across any line chart to narrow every chart to those runs, like Grafana.
 * Stored as run ids (localStorage `bench.zoom`) so new runs and reloads keep it.
 */
const readZoom = () => {
  try {
    const z = JSON.parse(localStorage.getItem("bench.zoom") ?? "null");
    const from = runs.findIndex((r) => r.id === z?.from);
    const to = runs.findIndex((r) => r.id === z?.to);
    return from !== -1 && to !== -1 && from <= to && to - from < runs.length - 1
      ? { from, to }
      : undefined;
  } catch {
    return undefined;
  }
};
const saveZoom = (z) => {
  if (z)
    localStorage.setItem(
      "bench.zoom",
      JSON.stringify({ from: runs[z.from].id, to: runs[z.to].id }),
    );
  else localStorage.removeItem("bench.zoom");
};

/** Where a run sits relative to main: the base commit, N runs before it, or N steps into the branch. */
const relToMain = (r) => {
  if (r.onBranch)
    return {
      cls: "branch",
      text: `${work.branch} +${runs.filter((x) => x.onBranch).indexOf(r) + 1}`,
    };
  const base = baseRun ? runs.indexOf(baseRun) : -1;
  const i = runs.indexOf(r);
  if (base === -1 || i === base) return { cls: "main", text: i === base ? "main base" : "main" };
  return { cls: "main", text: `main ${i < base ? "−" : "+"}${Math.abs(base - i)}` };
};

const pillEnd = (r) => {
  const rel = relToMain(r);
  return `<span class="zp-end"><span class="zp-num">#${r.index}</span><span class="sha">${esc(shortSha(r.git?.sha))}</span><span class="tag ${rel.cls}">${esc(rel.text)}</span></span>`;
};

/** Floating pill at the bottom centre: the selected range, or the range being dragged. */
const renderPill = (z, { preview = false } = {}) => {
  let pill = document.getElementById("zoom-pill");
  if (!pill) {
    pill = document.createElement("div");
    pill.id = "zoom-pill";
    document.body.append(pill);
  }
  if (!z) {
    pill.className = "";
    pill.innerHTML = "";
    return;
  }
  const a = runs[z.from];
  const b = runs[z.to];
  const count = z.to - z.from + 1;
  const subj = (r) => esc(r.git?.subject ?? r.note ?? "");
  pill.className = `on${preview ? " preview" : ""}`;
  pill.innerHTML = `
    <svg class="zp-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h12M4 8h8M6 13h4" /></svg>
    <span class="zp-range" title="${subj(a)} → ${subj(b)}">${pillEnd(a)}<span class="zp-arrow">→</span>${pillEnd(b)}</span>
    <span class="zp-count">${count} of ${runs.length} runs</span>
    ${preview ? `<span class="zp-hint">release to zoom</span>` : `<button type="button" id="zoom-reset" title="Show every run (Esc)">Reset</button>`}`;
  pill.querySelector("#zoom-reset")?.addEventListener("click", () => {
    saveZoom(undefined);
    render();
  });
};

let dragging = false;
const wireZoom = (root) => {
  root.querySelectorAll(".chart svg[data-colw]").forEach((svg) => {
    const colAt = (clientX) => {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      const sx = pt.matrixTransform(svg.getScreenCTM().inverse()).x;
      const from = +svg.dataset.from;
      const to = +svg.dataset.to;
      return Math.max(
        from,
        Math.min(to, from + Math.floor((sx - +svg.dataset.left) / +svg.dataset.colw)),
      );
    };
    svg.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || !e.target.closest("rect.col")) return;
      e.preventDefault();
      const start = colAt(e.clientX);
      let end = start;
      const sel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      sel.setAttribute("class", "zoom-sel");
      sel.setAttribute("y", svg.dataset.top);
      sel.setAttribute("height", svg.dataset.ploth);
      svg.append(sel);
      const draw = () => {
        const lo = Math.min(start, end);
        const hi = Math.max(start, end);
        const w = +svg.dataset.colw;
        sel.setAttribute("x", +svg.dataset.left + (lo - +svg.dataset.from) * w);
        sel.setAttribute("width", (hi - lo + 1) * w);
        if (hi > lo) renderPill({ from: lo, to: hi }, { preview: true });
      };
      draw();
      dragging = true;
      document.body.classList.add("zooming");
      document.getElementById("tip").style.display = "none";
      const move = (ev) => {
        end = colAt(ev.clientX);
        draw();
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        dragging = false;
        document.body.classList.remove("zooming");
        sel.remove();
        if (end === start) {
          renderPill(readZoom());
          return;
        }
        // A drag is not a click: keep it from opening the run under the pointer.
        // The browser fires that click (if at all) right after pointerup, so the guard expires on the next tick.
        const swallow = (ce) => ce.stopPropagation();
        window.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(() => window.removeEventListener("click", swallow, { capture: true }), 0);
        saveZoom({ from: Math.min(start, end), to: Math.max(start, end) });
        render();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
    // Double-click a chart to zoom back out, like Grafana.
    svg.addEventListener("dblclick", () => {
      if (!readZoom()) return;
      saveZoom(undefined);
      render();
    });
  });
};

addEventListener("keydown", (e) => {
  if (e.key === "Escape" && readZoom() && !e.target.closest?.("input, select, textarea")) {
    saveZoom(undefined);
    render();
  }
});

//#endregion

const render = () => {
  const app = document.getElementById("app");
  if (!runs.length) {
    app.innerHTML = `<div class="empty">No runs yet. Run <code>pnpm bench</code>.</div>`;
    return;
  }
  const mode = state.mode;
  const z = readZoom();
  setZoom(z);
  renderPill(z);
  app.innerHTML = `
    <div class="toolbar">
      <div class="goal"><span class="eyebrow">Goal</span> ${esc(work.goal)} on <code>${esc(work.branch)}</code></div>
      <div class="switch" role="group" aria-label="Combine programs as">
        ${Object.entries(AGGREGATES)
          .map(
            ([id, a]) =>
              `<button type="button" data-mode="${id}" class="${mode === id ? "on" : ""}">${esc(a.label)}</button>`,
          )
          .join("")}
      </div>
    </div>
    ${headline(mode)}
    <div class="charts">${charts(mode)}</div>
    ${providerCharts()}
    ${officialSection()}
    ${providersSection()}
    ${experimentsSection(mode)}
    ${log(mode)}`;

  app.querySelectorAll("[data-mode]").forEach((b) =>
    b.addEventListener("click", () => {
      localStorage.setItem("bench.mode", b.dataset.mode);
      render();
    }),
  );
  app.querySelector("#official-on-charts")?.addEventListener("change", (e) => {
    localStorage.setItem("bench.official", e.target.checked ? "1" : "0");
    render();
  });
  app.querySelectorAll("[data-exp]").forEach((box) =>
    box.addEventListener("change", () => {
      const hidden = state.hiddenExp;
      box.checked ? hidden.delete(box.dataset.exp) : hidden.add(box.dataset.exp);
      localStorage.setItem("bench.expHidden", JSON.stringify([...hidden]));
      render();
    }),
  );
  app.querySelectorAll("[data-provider-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      localStorage.setItem("bench.provider", b.dataset.providerPick);
      render();
    }),
  );
  app.querySelector("#pick-provider")?.addEventListener("change", (e) => {
    localStorage.setItem("bench.provider", e.target.value);
    render();
  });
  app.querySelectorAll("[data-bars-all]").forEach((b) =>
    b.addEventListener("click", () => {
      localStorage.setItem(
        "bench.barsAll",
        localStorage.getItem("bench.barsAll") === "1" ? "0" : "1",
      );
      render();
    }),
  );
  app.querySelectorAll(".bars [data-pick]").forEach((g) =>
    g.addEventListener("click", () => {
      localStorage.setItem("bench.provider", g.dataset.pick);
      render();
      document.getElementById("provider-charts")?.scrollIntoView({ block: "start" });
    }),
  );
  app.querySelectorAll("[data-sort]").forEach((th) =>
    th.addEventListener("click", () => {
      localStorage.setItem("bench.provSort", th.dataset.sort);
      render();
    }),
  );
  app.querySelectorAll("tr.prov").forEach((tr) =>
    tr.addEventListener("click", () => {
      const pkg = tr.dataset.prov;
      state.openProv.has(pkg) ? state.openProv.delete(pkg) : state.openProv.add(pkg);
      render();
    }),
  );
  app.querySelectorAll("tr.run").forEach((tr) =>
    tr.addEventListener("click", () => {
      const id = tr.dataset.id;
      state.open.has(id) ? state.open.delete(id) : state.open.add(id);
      render();
    }),
  );
  // Clicking a point opens that run in the log.
  app.querySelectorAll(".chart [data-run]").forEach((el) =>
    el.addEventListener("click", () => {
      state.open.add(el.dataset.run);
      render();
      document
        .getElementById(`run-${el.dataset.run}`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    }),
  );
  wireTooltips(app);
  wireZoom(app);
};

const wireTooltips = (root) => {
  let tip = document.getElementById("tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "tip";
    document.body.append(tip);
  }
  root.querySelectorAll(".chart [data-tip]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (dragging) return;
      tip.innerHTML = el.dataset.tip;
      tip.style.display = "block";
      const idx = el.dataset.idx;
      root.querySelectorAll(`.chart [data-col="${idx}"]`).forEach((c) => c.classList.add("hover"));
    });
    el.addEventListener("mousemove", (e) => {
      const w = tip.offsetWidth;
      tip.style.left = `${Math.min(e.clientX + 14, innerWidth - w - 8)}px`;
      tip.style.top = `${e.clientY + 16}px`;
    });
    el.addEventListener("mouseleave", () => {
      tip.style.display = "none";
      root.querySelectorAll(".chart .hover").forEach((c) => c.classList.remove("hover"));
    });
  });
};

//#endregion

// Same behaviour and storage key as the toggle on distilled.cloud.
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  const stored = root.dataset.theme;
  const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.classList.add("theme-switching");
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
});

render();
