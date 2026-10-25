// Repo size page. Reads ../repo-size/lab.json, written by
// benches/repo-size/lab.ts: what a checkout costs on disk, where the bytes
// are, and what each way of shrinking it would save.
import lab from "../repo-size/lab.json";

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

const MiB = 1048576;
/** Binary units, like du: 1 MB = 1,048,576 bytes. */
const fmt = (bytes) => {
  const mb = bytes / MiB;
  if (Math.abs(mb) >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  if (Math.abs(mb) >= 100) return `${Math.round(mb)} MB`;
  if (Math.abs(mb) >= 10) return `${mb.toFixed(1)} MB`;
  return `${mb.toFixed(mb < 1 ? 2 : 1)} MB`;
};
const pct = (part, whole) => `${Math.round((100 * part) / whole)}%`;
const int = (n) => Math.round(n).toLocaleString("en-US");
const secs = (ms) => `${(ms / 1000).toFixed(1)} s`;

const COLORS = {
  "generated-specs": "var(--rose)",
  services: "var(--accent)",
  "in-tree-specs": "var(--violet)",
  patches: "var(--teal)",
  handwritten: "var(--code-f)",
  benches: "var(--code-s)",
  other: "var(--fg-3)",
};
const SHORT = {
  "generated-specs": ".generated-specs/",
  services: "src/services/",
  "in-tree-specs": "raw specs in repo",
  patches: "patches/",
  handwritten: "hand-written code",
  benches: "benches/",
  other: "everything else",
};

const tree = lab.tree;
const run = (id) => lab.worktree?.runs.find((r) => r.id === id);
const full = run("full");
const sparse = run("sparse");
const reflink = run("reflink");
const dedupe = run("dedupe");
const comp = lab.composition;
const local = lab.local;

//#region pieces

/** One horizontal bar split into segments: [{ value, color, label }]. */
const stackBar = (segments, total = segments.reduce((s, x) => s + x.value, 0)) =>
  `<div class="stack">${segments
    .filter((s) => s.value > 0)
    .map(
      (s) =>
        `<span class="seg" style="width:${((100 * s.value) / total).toFixed(3)}%;background:${s.color}" title="${esc(`${s.label}: ${fmt(s.value)} (${pct(s.value, total)})`)}"></span>`,
    )
    .join("")}</div>`;

const legend = (segments, total) =>
  `<ul class="legend">${segments
    .filter((s) => s.value > 0)
    .map(
      (s) =>
        `<li><i style="background:${s.color}"></i>${esc(s.label)} <b>${esc(fmt(s.value))}</b> <span class="muted">${pct(s.value, total)}</span></li>`,
    )
    .join("")}</ul>`;

/** Bars on one scale: [{ label, value, color?, tag?, segments? }]. */
const bars = (rows, { max = Math.max(...rows.map((r) => r.value)) } = {}) =>
  `<div class="hbars">${rows
    .map((r) => {
      const width = Math.max(0.3, (100 * Math.max(0, r.value)) / max);
      const fill = r.segments
        ? `<span class="hbar stacked" style="width:${width.toFixed(2)}%">${r.segments
            .filter((s) => s.value > 0)
            .map(
              (s) =>
                `<span class="seg" style="width:${((100 * s.value) / r.value).toFixed(3)}%;background:${s.color}" title="${esc(`${s.label}: ${fmt(s.value)}`)}"></span>`,
            )
            .join("")}</span>`
        : `<span class="hbar" style="width:${width.toFixed(2)}%;background:${r.color ?? "var(--accent)"}"></span>`;
      return `<div class="hrow">
        <div class="hlabel">${esc(r.label)}${r.tag ? ` <span class="tag ${r.tag}">${r.tag}</span>` : ""}</div>
        <div class="htrack">${fill}</div>
        <div class="hvalue">${esc(fmt(r.value))}</div>
      </div>`;
    })
    .join("")}</div>`;

const card = (label, value, sub) =>
  `<div class="card"><div class="label">${esc(label)}</div><div class="value">${esc(value)}</div><div class="sub">${sub}</div></div>`;

//#endregion

//#region sections

const ORDER = [
  "generated-specs",
  "services",
  "in-tree-specs",
  "patches",
  "handwritten",
  "benches",
  "other",
];
const treeSegments = (cats) =>
  ORDER.map((id) => ({ value: cats[id]?.bytes ?? 0, color: COLORS[id], label: SHORT[id] }));

const alc = lab.alchemy;
const alcRun = (id) => alc?.variants.find((v) => v.id === id);

const headline = () => {
  const specs = tree.categories["generated-specs"].bytes;
  const sharing = local?.sharing;
  const reclaim = sharing ? sharing.trackedTotal - sharing.trackedUnique : 0;
  const libReclaim = sharing ? sharing.libTotal - sharing.libUnique : 0;
  const slim = alcRun("alchemy-only");
  return `
    <p class="verdict">Every Alchemy worktree gets its own distilled checkout: <b>${fmt(full?.disk ?? tree.bytes)}</b> in ${int(full?.files ?? tree.files)} files, next to about ${alc ? fmt(alc.alchemyTracked) : "?"} of Alchemy itself.
    <b>${pct(specs, tree.bytes)}</b> of it is <code>.generated-specs/</code>, which Alchemy never reads.
    ${slim ? `Checking out only what Alchemy builds takes it to <b>${fmt(slim.disk)}</b>, with nothing to regenerate.` : ""}</p>
    <div class="cards">
      ${card("Distilled in each worktree", fmt(full?.disk ?? tree.bytes), `${int(full?.files ?? tree.files)} files${full ? ` · <code>git worktree add</code> ${secs(full.ms)}` : ""}`)}
      ${sparse ? card("Without .generated-specs/", fmt(sparse.disk), `${int(sparse.files)} files · what #933 gives`) : ""}
      ${slim ? card("Only what Alchemy builds", fmt(slim.disk), `${int(slim.files)} files · ${alc.usedPackages.length} of ${alc.usedPackages.length + alc.unusedPackages} packages' src/`) : ""}
      ${sharing ? card("Duplicate bytes on this laptop", fmt(reclaim + libReclaim), `${fmt(reclaim)} tracked + ${fmt(libReclaim)} lib/ · ${sharing.worktrees} distilled checkouts`) : ""}
    </div>`;
};

const alchemySection = () => {
  if (!alc) return "";
  const s = alc.split;
  const segs = [
    {
      value: s.specs,
      color: COLORS["generated-specs"],
      label: ".generated-specs/ (Alchemy never reads)",
    },
    {
      value: s.unusedServices,
      color: "var(--violet)",
      label: "src/services/ of packages Alchemy doesn't use",
    },
    { value: s.usedServices, color: COLORS.services, label: "src/services/ Alchemy builds" },
    { value: s.rest, color: COLORS.other, label: "everything else" },
  ];
  const total = segs.reduce((n, x) => n + x.value, 0);
  const wts = alc.worktrees.slice(1).map((w) => ({
    label: w.path.replace("~/code/.worktrees/alchemy/", ""),
    value: w.alchemy + w.distilled + w.distilledLib,
    segments: [
      { value: w.alchemy, color: "var(--code-f)", label: "Alchemy" },
      { value: w.distilled, color: "var(--accent)", label: "distilled checkout" },
      { value: w.distilledLib, color: "var(--violet)", label: "distilled lib/" },
    ],
  }));
  const variants = alc.variants.map((v) => ({
    label: v.label,
    value: v.disk,
    tag: "measured",
    color: v.id === "full" ? "var(--fg-3)" : "var(--accent)",
  }));
  return `<section class="panel">
    <div class="chart-head"><h3>Distilled inside an Alchemy worktree <span class="muted">· pin <code>${esc(alc.pin)}</code></span></h3>
    <div class="how">T3 runs <code>git worktree add</code> on Alchemy. Alchemy's <code>post-checkout</code> hook (<code>scripts/bootstrap-distilled.mjs</code>) then runs <code>git worktree add</code> on the primary checkout's distilled submodule, so every Alchemy worktree gets a full distilled checkout over one shared object store. Alchemy builds or depends on ${alc.usedPackages.length} distilled packages: ${alc.usedPackages.map((p) => `<code>${esc(p)}</code>`).join(" ")}.</div></div>
    ${stackBar(segs, total)}
    ${legend(segs, total)}
    <h3 class="sub-h">What bootstrap-distilled could check out <span class="muted">· a real worktree at the pin, sized</span></h3>
    ${bars(variants)}
    ${
      wts.length
        ? `<h3 class="sub-h">Alchemy worktrees on this laptop</h3>
    <ul class="legend"><li><i style="background:var(--code-f)"></i>Alchemy (untracked build output included)</li><li><i style="background:var(--accent)"></i>distilled checkout</li><li><i style="background:var(--violet)"></i>distilled lib/ (built by Alchemy's tsrs -b)</li></ul>
    ${bars(wts)}`
        : ""
    }
    <div class="how">The shared submodule repo <code>.git/modules/distilled</code> is ${fmt(alc.moduleRepo.bytes)} with ${alc.moduleRepo.registered} registered worktrees, ${alc.moduleRepo.prunable} of them prunable.</div>
  </section>`;
};

const optionsSection = () => {
  if (!full || !sparse) return "";
  const services = tree.categories.services.bytes;
  const docs = comp?.services.kinds?.docs ?? 0;
  const indent = comp?.services.classes.indent ?? 0;
  const after = sparse.disk;
  const slim = alcRun("alchemy-only");
  const options = [
    { label: "Today", value: full.disk, tag: "measured", color: "var(--fg-3)" },
    { label: "Without .generated-specs/ (#933, or sparse)", value: after, tag: "measured" },
    ...(slim
      ? [
          {
            label: "… and only the packages Alchemy uses (sparse)",
            value: slim.disk,
            tag: "measured",
          },
        ]
      : []),
    {
      label: "… JSDoc moved out of src/services/",
      value: after - docs,
      tag: "computed",
      color: "var(--fg-3)",
    },
    {
      label: "… no indentation in generated code",
      value: after - indent,
      tag: "computed",
      color: "var(--fg-3)",
    },
    {
      label: "… src/services/ not committed",
      value: after - services,
      tag: "computed",
      color: "var(--fg-3)",
    },
    ...(dedupe
      ? [
          {
            label: "Today + dedupe pass against the primary checkout",
            value: dedupe.newDisk,
            tag: "measured",
            color: "var(--teal)",
          },
        ]
      : []),
    ...(reflink
      ? [
          {
            label: "Today + reflink copy of the primary checkout",
            value: reflink.newDisk,
            tag: "measured",
            color: "var(--teal)",
          },
        ]
      : []),
  ];
  const cloneRows = (lab.clone ?? []).map((c) => ({
    label: c.label,
    value: c.bytes,
    tag: "measured",
    color: c.id === "today" ? "var(--fg-3)" : "var(--accent)",
  }));
  const ideas = [
    {
      name: "1 · Land #933, publish converted specs elsewhere",
      saves: `−${fmt(full.disk - after)} per worktree, distilled and Alchemy`,
      how: "Alchemy never reads <code>.generated-specs/</code>, so dropping it costs Alchemy nothing to regenerate. For the few who read them: CI pushes the converted models to a separate repo (for example in the distilled-mirror org), one commit per distilled main commit. People browse and diff them on GitHub, and nobody's clone or worktree carries them. <code>pnpm convert &lt;pkg&gt;</code> stays as the local fallback.",
      cost: "A CI job that fetches the spec mirrors and converts the changed packages on each push to main. <code>patches:names</code> and <code>patches:audit</code> convert locally first (seconds per package once its mirror is fetched).",
    },
    {
      name: "2 · Sparse checkout in bootstrap-distilled.mjs",
      saves: slim ? `${fmt(full.disk)} → ${fmt(slim.disk)} per Alchemy worktree` : "",
      how: "The hook already runs <code>git worktree add</code> and already turns on <code>extensions.worktreeConfig</code>. Add <code>--no-checkout</code>, write sparse patterns, then check out: no <code>.generated-specs/</code>, and no <code>src/</code> for packages Alchemy neither builds nor depends on. The hook reads that list from Alchemy's <code>tsconfig.json</code> and package.json files at checkout time. Works on any filesystem and in CI.",
      cost: "To edit a package Alchemy doesn't use from inside an Alchemy worktree, run <code>git sparse-checkout add packages/&lt;pkg&gt;</code>. Each Alchemy worktree still holds what it builds.",
    },
    {
      name: "3 · Share blocks with the primary checkout",
      saves: dedupe ? `${fmt(full.disk)} → ${fmt(dedupe.newDisk)} per worktree` : "",
      how: `Same hook: after the checkout, dedupe its files against the primary checkout's distilled. On XFS here it took ${dedupe ? secs(dedupe.ms) : "?"} and left <code>git status</code> clean; the kernel compares bytes before it shares them. On macOS, APFS clones files (<code>cp -c</code>) the same way. Built <code>lib/</code> could be shared too; whether Alchemy's <code>tsrs -b</code> then skips rebuilding is UNCLEAR and untested.`,
      cost: "Does nothing on ext4 or in CI. Savings shrink as a worktree's pin drifts from the primary's.",
    },
    {
      name: "4 · Keep src/services/ committed",
      saves: `would save ${fmt(services)}`,
      how: "Alchemy's <code>tsrs -b</code> builds from these files. Without them, every Alchemy worktree and every Alchemy CI job must fetch the spec mirrors (about 406 MB) and run generate (minutes) before it can type-check.",
      cost: `Same for a JSDoc sidecar (−${fmt(docs)}): the docs would need a build step in Alchemy too. Not worth it after options 1 and 2.`,
    },
    {
      name: "5 · Prune and gc the shared repos",
      saves: alc ? `Alchemy's distilled module repo: ${fmt(alc.moduleRepo.bytes)}` : "",
      how: `${alc ? `Alchemy's <code>.git/modules/distilled</code> has ${alc.moduleRepo.prunable} prunable worktree registrations. ` : ""}${local ? `The distilled repo's own store is ${fmt(local.objects)}; origin/main's history alone packs to ${fmt(local.mainOnlyPack)}. Old branches and T3 checkpoints (${int(local.refs["refs/t3"] ?? 0)} refs) keep the rest alive.` : ""}`,
      cost: "Once per machine. Deleted refs are gone; the floor depends on which branches you keep.",
    },
  ];
  return `<section class="panel">
    <div class="chart-head"><h3>Ways to shrink distilled's checkout <span class="muted">· new disk for one worktree</span></h3>
    <div class="how"><span class="tag measured">measured</span> a real worktree was created and sized. <span class="tag computed">computed</span> from exact byte counts, not built; grey ones make Alchemy regenerate or rebuild. Teal bars share blocks with a checkout that already exists, so they need a copy-on-write filesystem.</div></div>
    ${bars(options)}
    <h3 class="sub-h">Options, in the order I would do them</h3>
    <div class="options">${ideas
      .map(
        (o) => `<div class="option">
          <div class="option-head"><h4>${esc(o.name)}</h4><span class="saves">${esc(o.saves)}</span></div>
          <p>${o.how}</p>
          <p class="cost"><b>Cost:</b> ${o.cost}</p>
        </div>`,
      )
      .join("")}</div>
    <h3 class="sub-h">Clone download, <code>git clone --depth=1</code></h3>
    <div class="how">A pack of HEAD's objects, built the way the server builds one. Alchemy CI already fetches the submodule with <code>--depth=1</code>. The download is small; the unpacked working tree is what hurts.</div>
    ${bars(cloneRows)}
  </section>`;
};

const whereSection = () => {
  const segs = treeSegments(tree.categories);
  return `<section class="panel">
    <div class="chart-head"><h3>Where a checkout's bytes are <span class="muted">· ${fmt(tree.bytes)} tracked at <code>${esc(lab.head)}</code></span></h3>
    <div class="how">Every tracked file at HEAD, by kind (<code>git ls-tree -l</code>). Both big blocks are generated: the converted Smithy models, and the TypeScript made from them.</div></div>
    ${stackBar(segs, tree.bytes)}
    ${legend(segs, tree.bytes)}
    <h3 class="sub-h">Largest packages</h3>
    ${bars(
      tree.packages.slice(0, 12).map((p) => ({
        label: p.name,
        value: p.bytes,
        segments: ORDER.map((id) => ({
          value: p.byCategory[id] ?? 0,
          color: COLORS[id],
          label: SHORT[id],
        })),
      })),
    )}
  </section>`;
};

const STACK = [
  "services",
  "generated-specs",
  "in-tree-specs",
  "patches",
  "handwritten",
  "benches",
  "other",
];

/** Stacked area of tracked bytes by category across main's history. */
const timelineChart = (pts) => {
  const W = 900;
  const H = 300;
  const left = 64;
  const right = 12;
  const top = 12;
  const bottom = 46;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const max = Math.max(...pts.map((p) => p.bytes));
  const stepMb = [50, 100, 200, 250, 500].find((s) => max / MiB / s <= 6) ?? 500;
  const hi = Math.ceil(max / MiB / stepMb) * stepMb * MiB;
  const colW = plotW / pts.length;
  const x = (i) => left + colW * (i + 0.5);
  const y = (v) => top + plotH - (v / hi) * plotH;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tracked bytes on main over time">`;
  for (let v = 0; v <= hi + 1; v += stepMb * MiB) {
    svg += `<line class="grid-line" x1="${left}" x2="${left + plotW}" y1="${y(v)}" y2="${y(v)}"/>`;
    svg += `<text x="${left - 8}" y="${y(v) + 4}" text-anchor="end">${Math.round(v / MiB)} MB</text>`;
  }
  const base = pts.map(() => 0);
  for (const id of STACK) {
    const lower = [...base];
    pts.forEach((p, i) => (base[i] += p.categories[id]?.bytes ?? 0));
    if (base.every((v, i) => v === lower[i])) continue;
    const upper = pts.map((_, i) => `${x(i).toFixed(1)},${y(base[i]).toFixed(1)}`);
    const down = pts.map((_, i) => `${x(i).toFixed(1)},${y(lower[i]).toFixed(1)}`).reverse();
    svg += `<polygon class="area" points="${[...upper, ...down].join(" ")}" style="fill:${COLORS[id]}"/>`;
  }
  svg += `<polyline class="area-top" points="${pts.map((p, i) => `${x(i).toFixed(1)},${y(p.bytes).toFixed(1)}`).join(" ")}"/>`;
  // Month labels at the first sampled commit of each month.
  let month = "";
  pts.forEach((p, i) => {
    const m = p.date.slice(0, 7);
    if (m === month) return;
    month = m;
    const name = new Date(`${m}-15`).toLocaleString("en-US", { month: "short" });
    svg += `<line class="month-tick" x1="${x(i)}" x2="${x(i)}" y1="${top + plotH}" y2="${top + plotH + 5}"/>`;
    svg += `<text class="xlabel" x="${x(i)}" y="${top + plotH + 18}" text-anchor="middle">${esc(name)}</text>`;
  });
  pts.forEach((p, i) => {
    const rows = [...STACK]
      .reverse()
      .filter((id) => (p.categories[id]?.bytes ?? 0) > 0)
      .map(
        (id) =>
          `<tr><td><i class="sw-box" style="background:${COLORS[id]}"></i></td><td>${esc(SHORT[id])}</td><td class="num">${esc(fmt(p.categories[id].bytes))}</td></tr>`,
      )
      .join("");
    const tip = `<b>${esc(p.date.slice(0, 10))}</b> <code>${esc(p.sha)}</code><div class="tip-msg">${esc(p.message)}</div><table class="tip-series">${rows}<tr class="total"><td></td><td>total · ${int(p.files)} files</td><td class="num">${esc(fmt(p.bytes))}</td></tr></table>`;
    svg += `<rect class="col" data-tip="${esc(tip)}" x="${left + colW * i}" y="${top}" width="${colW}" height="${plotH}"/>`;
  });
  return `${svg}</svg>`;
};

const timelineSection = () => {
  const t = lab.timeline;
  if (!t?.points.length) return "";
  const shown = STACK.filter((id) => t.points.some((p) => (p.categories[id]?.bytes ?? 0) > MiB));
  return `<section class="panel chart">
    <div class="chart-head"><h3>Tracked bytes on main over time <span class="muted">· ${t.points.length} of ${int(t.commitsOnMain)} commits</span></h3>
    <div class="how">The last commit of each week since January 2026, and of each day for the last 45 days (GitHub trees API). <code>.generated-specs/</code> arrived in August; the raw specs moved out to the spec mirrors in September. GitHub reports ${fmt(t.githubRepoSizeBytes)} for the full history. Hover for a commit.</div></div>
    ${timelineChart(t.points)}
    <ul class="legend">${shown.map((id) => `<li><i style="background:${COLORS[id]}"></i>${esc(SHORT[id])}</li>`).join("")}</ul>
  </section>`;
};

const compositionSection = () => {
  if (!comp) return "";
  const s = comp.services;
  const k = s.kinds ?? {};
  const kindRows = [
    { value: k.docs ?? 0, color: "var(--violet)", label: "JSDoc" },
    { value: k.schemas ?? 0, color: "var(--accent)", label: "runtime schemas" },
    { value: k.types ?? 0, color: "var(--code-f)", label: "TypeScript types" },
    { value: k.operations ?? 0, color: "var(--teal)", label: "operations" },
    { value: k.errors ?? 0, color: "var(--rose)", label: "error classes" },
    { value: (k.imports ?? 0) + (k.other ?? 0), color: "var(--fg-3)", label: "other" },
  ];
  const sp = comp.specs;
  return `<section class="panel">
    <div class="chart-head"><h3>What the generated TypeScript is made of <span class="muted">· ${fmt(s.bytes)} in ${int(s.files)} files</span></h3>
    <div class="how">Each top-level statement of <code>src/services/*.ts</code>, by kind. Indentation is ${fmt(s.classes.indent)}. ${int(s.pureMarkers)} <code>/*@__PURE__*/</code> markers add ${fmt(s.classes.pure)}. The files gzip ${(s.bytes / s.gzip).toFixed(1)}× smaller, so git packs them well; the working tree holds them uncompressed.</div></div>
    ${stackBar(kindRows, s.bytes)}
    ${legend(kindRows, s.bytes)}
    <h3 class="sub-h">Converted specs <span class="muted">· ${int(sp.files)} files</span></h3>
    ${bars([
      { label: "As committed (pretty JSON)", value: sp.bytes, color: "var(--rose)" },
      { label: "Minified", value: sp.minified, color: "var(--rose)" },
      { label: "gzip", value: sp.gzip, color: "var(--rose)" },
    ])}
  </section>`;
};

const localSection = () => {
  if (!local) return "";
  const rows = [...local.worktrees]
    .sort((a, b) => b.checkout + b.lib - (a.checkout + a.lib))
    .map((w) => ({
      label: w.path.replace("~/code/.worktrees/distilled/", "").replace("~/", ""),
      value: w.checkout + w.lib,
      segments: [
        { value: w.checkout, color: "var(--accent)", label: "checkout" },
        { value: w.lib, color: "var(--violet)", label: "lib/" },
      ],
    }));
  const sh = local.sharing;
  const nm = local.worktrees.filter((w) => w.nodeModules.files > 0);
  const avg = (f) => (nm.length ? nm.reduce((s, w) => s + f(w), 0) / nm.length : 0);
  const total = rows.reduce((s, r) => s + r.value, 0);
  return `<section class="panel">
    <div class="chart-head"><h3>This laptop <span class="muted">· ${local.worktrees.length} checkouts, ${fmt(total)} in checkouts and lib/</span></h3>
    <div class="how">Each checkout without <code>node_modules</code>, by <code>du</code>.${sh ? ` Distinct content: ${fmt(sh.trackedUnique)} of ${fmt(sh.trackedTotal)} tracked, ${fmt(sh.libUnique)} of ${fmt(sh.libTotal)} lib/ (files over 4 KB on the same filesystem).` : ""}
    <code>node_modules</code> lists about ${fmt(avg((w) => w.nodeModules.hardlinked))} per checkout, but those are hard links into the pnpm store: about ${fmt(avg((w) => w.nodeModules.unique))} is new.
    The shared object store is ${fmt(local.objects)}; the spec-mirror submodules add ${fmt(local.submodules)}.</div></div>
    <ul class="legend"><li><i style="background:var(--accent)"></i>checkout</li><li><i style="background:var(--violet)"></i>lib/ (built output, out of scope)</li></ul>
    ${bars(rows)}
  </section>`;
};

//#endregion

const wireTooltips = (root) => {
  let tip = document.getElementById("tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "tip";
    document.body.append(tip);
  }
  root.querySelectorAll("[data-tip]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      tip.innerHTML = el.dataset.tip;
      tip.style.display = "block";
      el.classList.add("hover");
    });
    el.addEventListener("mousemove", (e) => {
      const w = tip.offsetWidth;
      tip.style.left = `${Math.min(e.clientX + 14, innerWidth - w - 8)}px`;
      tip.style.top = `${e.clientY + 16}px`;
    });
    el.addEventListener("mouseleave", () => {
      tip.style.display = "none";
      el.classList.remove("hover");
    });
  });
};

const render = () => {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Repo <em>size</em></h2>
    <p class="intro muted">Planning page. Generated ${esc(new Date(lab.generatedAt).toLocaleString())} at <code>${esc(lab.head)}</code> by <code>node benches/repo-size/lab.ts</code>. 1 MB = 1,048,576 bytes.</p>
    ${headline()}
    ${alchemySection()}
    ${optionsSection()}
    ${whereSection()}
    ${timelineSection()}
    ${compositionSection()}
    ${localSection()}`;
  wireTooltips(app);
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
