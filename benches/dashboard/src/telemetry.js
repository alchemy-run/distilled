// Telemetry lab page (brainstorm). Reads ../telemetry/lab.json, written by
// benches/otel-lab/lab.ts: real distilled calls against a mocked HttpClient,
// recorded under each telemetry level (operation / debug).
import lab from "../telemetry/lab.json";

const LEVELS = [
  {
    id: "operation",
    label: "operation",
    how: "Default. One client span per operation call, named like S3.GetObject. It replaces Effect's per-request HTTP span and carries its facts. A retried call records the tries on the same span: attempts, the error of each failed try, and total backoff. On failure, the caller's line becomes a stack frame.",
    enable: ["(always on)"],
  },
  {
    id: "debug",
    label: "debug",
    how: "Operation, plus an Attempt span for every try (even the first), Effect's HTTP span inside each, and spans for distilled's internals: setup, serialize, sign, deserialize, retry backoff, and the read of a GenAI stream.",
    enable: [
      "Effect.provide(TelemetryDebug.layer)",
      "TelemetryDebug.layerWith({ logRequests: true })",
    ],
  },
];

const SOURCES = {
  distilled: "distilled operation",
  attempt: "attempt (debug: one per try)",
  internal: "distilled internals (debug)",
  "effect-http": "Effect HttpClient",
  user: "your code (Effect.fn)",
};

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const fmtDur = (us) =>
  us >= 1e6
    ? `${(us / 1e6).toFixed(2)} s`
    : us >= 1000
      ? `${(us / 1000).toFixed(us >= 1e4 ? 0 : 1)} ms`
      : `${Math.round(us)} µs`;
const fmtUs = (n) => `${n.toFixed(1)} µs`;

const store = {
  get: (k, d) => {
    try {
      return localStorage.getItem(k) ?? d;
    } catch {
      return d;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};

const state = {
  scenario: store.get("tele.scenario", lab.scenarios[0].id),
  level: store.get("tele.level", "operation"),
  span: undefined,
};
if (!lab.scenarios.some((s) => s.id === state.scenario)) state.scenario = lab.scenarios[0].id;
// A stored level this page no longer has.
if (!LEVELS.some((l) => l.id === state.level)) state.level = "operation";

/** A distilled span made by debug mode (internal kind), as opposed to the operation span. */
const sourceOf = (span) =>
  span.source === "distilled" && span.kind === "internal" ? "internal" : span.source;

//#region cost

const costSection = () => {
  const c = lab.cost.perCallUs;
  const rows = [
    ["operation", "native", "operation, no exporter", "nohttp"],
    ["operation", "recording", "operation, with an exporter", "op"],
    ["debug", "native", "debug, no exporter", "nodebug"],
    ["debug", "recording", "debug, with an exporter", "debug"],
  ];
  const max = Math.max(...rows.map(([id, ex]) => c[id][ex]));
  const bars = rows
    .map(
      ([id, ex, label, cls]) => `<div class="cost-row">
        <span class="cost-label">${esc(label)}</span>
        <span class="cost-track"><span class="cost-bar c-${cls}" style="width:${(c[id][ex] / max) * 100}%"></span></span>
        <span class="cost-value">${fmtUs(c[id][ex])}</span>
      </div>`,
    )
    .join("");
  const cap = lab.cost.callSite;
  return `
  <section class="panel tele-cost">
    <p class="verdict">Recording the operation span costs <b>${fmtUs(c.operation.recording - c.operation.native)}</b> per call. With no exporter installed distilled records no span; debug adds <b>${fmtUs(c.debug.recording - c.operation.recording)}</b> over operation when spans are exported.</p>
    <div class="cost-bars">${bars}</div>
    <p class="muted small">Warm STS GetCallerIdentity against a mocked HTTP response; about 10 µs of each number is the mock building a web <code>Response</code>. Median of 41 interleaved batches of 300 calls, ${esc(lab.node)}. "With an exporter" installs a tracer that keeps every span in memory. The comparison with main is the PR's benchmark comment (runtime speed). Capturing the caller's frame costs ${Math.round(cap.prototypeNs)} ns per call (<code>Error.captureStackTrace</code>, 2 frames, nothing formatted; a plain <code>new Error()</code> costs ${Math.round(cap.newErrorNs[10])} ns). Formatting it costs ${(cap.formatNs / 1000).toFixed(1)} µs, paid only when an error is printed or a debug span exports <code>code.*</code>.</p>
  </section>`;
};

//#endregion

//#region waterfall

const depthOf = (spans) => {
  const byId = new Map(spans.map((s) => [s.id, s]));
  return (s) => {
    let d = 0;
    let cur = s;
    while (cur.parent && byId.has(cur.parent)) {
      d++;
      cur = byId.get(cur.parent);
    }
    return d;
  };
};

const label = (s) =>
  s.name === "Attempt" ? `Attempt ${s.attributes["distilled.attempt"] ?? ""}` : s.name;

const waterfall = (run) => {
  const spans = run.spans;
  if (!spans.length) return `<div class="empty small">No spans.</div>`;
  const total = Math.max(...spans.map((s) => s.endUs), 1);
  const depth = depthOf(spans);
  const ticks = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => `<span style="left:${f * 100}%">${fmtDur(f * total)}</span>`)
    .join("");
  const rows = spans
    .map((s) => {
      const left = (s.startUs / total) * 100;
      const width = Math.max(((s.endUs - s.startUs) / total) * 100, 0.25);
      const src = sourceOf(s);
      const sel = state.span === s.id ? " sel" : "";
      const labelRight = left + width > 78;
      return `<button class="wf-row${sel}" data-span="${esc(s.id)}" title="${esc(s.name)}">
        <span class="wf-name" style="padding-left:${depth(s) * 14 + 8}px"><i class="dot src-${src}"></i>${esc(label(s))}</span>
        <span class="wf-track">
          <span class="wf-bar src-${src}${s.status === "error" ? " err" : ""}" style="left:${left}%;width:${width}%"></span>
          <span class="wf-dur${labelRight ? " right" : ""}" style="${labelRight ? `right:${100 - left + 0.6}%` : `left:${left + width + 0.6}%`}">${fmtDur(s.endUs - s.startUs)}</span>
        </span>
      </button>`;
    })
    .join("");
  return `<div class="wf"><div class="wf-axis"><span class="wf-name"></span><span class="wf-track">${ticks}</span></div>${rows}</div>`;
};

const legend = (run) => {
  const present = new Set(run.spans.map(sourceOf));
  return `<div class="legend">${Object.entries(SOURCES)
    .filter(([k]) => present.has(k))
    .map(([k, v]) => `<span><i class="dot src-${k}"></i>${esc(v)}</span>`)
    .join("")}<span><i class="dot err-dot"></i>failed</span></div>`;
};

const details = (run) => {
  const s = run.spans.find((x) => x.id === state.span) ?? run.spans[0];
  if (!s) return "";
  const attrs = Object.entries(s.attributes);
  return `<div class="span-detail">
    <div class="sd-head"><b>${esc(label(s))}</b><span class="muted">${esc(s.kind)} · ${fmtDur(s.endUs - s.startUs)} · ${s.status === "error" ? `<span class="bad">error</span>` : "ok"} · ${esc(SOURCES[sourceOf(s)])}</span></div>
    ${
      attrs.length
        ? `<dl>${attrs.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(typeof v === "string" ? v : JSON.stringify(v))}</dd>`).join("")}</dl>`
        : `<p class="muted small">No attributes.</p>`
    }
    ${
      s.links?.length
        ? `<div class="sd-links"><span class="eyebrow">links (trace context read from messages)</span>${s.links
            .map(
              (l) =>
                `<code>${esc(l.traceId)} / ${esc(l.spanId)}${Object.entries(l.attributes ?? {})
                  .map(([k, v]) => ` · ${esc(k)}=${esc(v)}`)
                  .join("")}</code>`,
            )
            .join("")}</div>`
        : ""
    }
  </div>`;
};

//#endregion

//#region stack trace

const stackTrace = (run) => {
  if (!run.pretty) {
    return `<p class="muted small">The call succeeded, so there is no error to print.</p>`;
  }
  const opNames = new Set(run.spans.filter((s) => sourceOf(s) === "distilled").map((s) => s.name));
  const lines = run.pretty.split("\n").map((line, i) => {
    if (i === 0) return `<span class="st-head">${esc(line)}</span>`;
    const m = /^\s*at (.+?) \(/.exec(line);
    const cls =
      m && opNames.has(m[1])
        ? "st-op"
        : /packages\/|node_modules\//.test(line)
          ? "st-internal"
          : "st-user";
    const tag =
      cls === "st-op"
        ? `<em>distilled operation span</em>`
        : cls === "st-internal"
          ? `<em>inside distilled</em>`
          : `<em>your code</em>`;
    return `<span class="${cls}">${esc(line)}${tag}</span>`;
  });
  const keys = run.errorFields ? Object.keys(run.errorFields) : [];
  const missing = ["requestId", "status", "operation"].filter(
    (k) => !keys.some((x) => x.toLowerCase().includes(k.toLowerCase())),
  );
  const fields = run.errorFields
    ? `<div class="err-fields"><span class="eyebrow">enumerable fields on the error object</span><code>${esc(keys.join(", ") || "(none)")}</code>${
        missing.length
          ? `<span class="muted">No ${missing.join(", ")} on the error itself: only the span has them.</span>`
          : ""
      }</div>`
    : "";
  return `<pre class="stack">${lines.join("")}</pre>${fields}`;
};

//#endregion

/** The request body, for scenarios where what distilled sent is the point. */
const SHOW_SENT = new Set([
  "sqs-send",
  "sqs-receive",
  "railway-graphql",
  "lambda-invoke",
  "eventbridge-put",
  "neon-project",
]);

const sentSection = (sc, run) => {
  if (!SHOW_SENT.has(sc.id) || !run.sent?.length) return "";
  let body = run.sent[0];
  try {
    body = JSON.stringify(JSON.parse(body), null, 2);
  } catch {}
  const headers = run.sentHeaders?.[0] ?? {};
  const headerText = Object.entries(headers)
    .map(([k, v]) => `${k}: ${k === "x-amz-client-context" ? `${v}\n  = ${atob(v)}` : v}`)
    .join("\n");
  return `<h3>Request sent</h3><pre class="snippet sent">${esc(headerText ? `${headerText}\n\n${body}` : body)}</pre>`;
};

const scenarioSection = () => {
  const sc = lab.scenarios.find((s) => s.id === state.scenario);
  const run = sc.runs.find((r) => r.level === state.level) ?? sc.runs[0];
  if (!run.spans.some((s) => s.id === state.span)) {
    state.span = (run.spans.find((s) => sourceOf(s) === "distilled") ?? run.spans[0])?.id;
  }
  const level = LEVELS.find((l) => l.id === state.level);
  const tabs = lab.scenarios
    .map(
      (s) =>
        `<button class="${s.id === state.scenario ? "on" : ""}" data-scenario="${esc(s.id)}">${esc(s.title)}</button>`,
    )
    .join("");
  const levels = LEVELS.map((l) => {
    const r = sc.runs.find((x) => x.level === l.id);
    return `<button class="${l.id === state.level ? "on" : ""}" data-level="${l.id}">${l.label} <span class="muted">· ${r.spans.length} span${r.spans.length === 1 ? "" : "s"}</span></button>`;
  }).join("");
  return `
  <section class="tele-scenario">
    <div class="scenario-tabs">${tabs}</div>
    <div class="panel">
      <div class="toolbar">
        <div class="switch">${levels}</div>
        <div class="enable">${level.enable.map((e) => `<code>${esc(e)}</code>`).join(" or ")}</div>
      </div>
      <p class="level-how">${esc(level.how)}</p>
      <div class="tele-grid">
        <div>
          <div class="code-what"><pre class="snippet">${esc(sc.code)}</pre><p class="small">${esc(sc.what)}</p></div>
          <h3>Trace</h3>
          ${legend(run)}
          ${waterfall(run)}
        </div>
        <div>
          <h3>Selected span</h3>
          ${details(run)}
          ${sentSection(sc, run)}
          <h3>Error, as <code>Cause.pretty</code> prints it</h3>
          ${stackTrace(run)}
        </div>
      </div>
    </div>
  </section>`;
};

const render = () => {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Telemetry <em>lab</em></h2>
    <p class="intro muted">Brainstorm prototype on <code>pear/otel-debug-layer-brainstorm</code>. Real SDK calls, mocked HTTP, an in-memory tracer. Generated ${esc(new Date(lab.generatedAt).toLocaleString())} by <code>benches/otel-lab/lab.ts</code>.</p>
    ${costSection()}
    ${scenarioSection()}`;
  app.querySelectorAll("[data-scenario]").forEach((b) =>
    b.addEventListener("click", () => {
      state.scenario = b.dataset.scenario;
      state.span = undefined;
      store.set("tele.scenario", state.scenario);
      render();
    }),
  );
  app.querySelectorAll("[data-level]").forEach((b) =>
    b.addEventListener("click", () => {
      state.level = b.dataset.level;
      state.span = undefined;
      store.set("tele.level", state.level);
      render();
    }),
  );
  app.querySelectorAll("[data-span]").forEach((b) =>
    b.addEventListener("click", () => {
      state.span = b.dataset.span;
      render();
    }),
  );
};

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
