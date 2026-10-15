// Dependency-free SVG line chart: one point per run, in run order.

const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

/** Round tick step: 1, 2 or 5 × 10^n. */
const niceStep = (span, count) => {
  const raw = span / count;
  const p = 10 ** Math.floor(Math.log10(raw));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= raw) return m * p;
  return 10 * p;
};

/** A short line sample in the same stroke style as the series it names. */
const swatch = (cls, color) =>
  `<svg class="sw" viewBox="0 0 26 8" aria-hidden="true"><line class="${cls}" x1="1" x2="25" y1="4" y2="4"${color ? ` style="stroke:${color}"` : ""}/></svg>`;

/**
 * Shared x-range for every line chart: run indices [from, to], inclusive.
 * Every chart plots the same run list, so one range keeps them in sync.
 */
let zoom;
export const setZoom = (z) => {
  zoom = z;
};

let clipId = 0;

/**
 * points: [{ value, label, branch, cls, tip, id }]
 * opts: { format, branchLabel, second?: { label, values }, refs?: [{ value, label, short, color, kind, detail?(i) }] }
 * Each ref is a flat line across the whole chart: kind "exp" (an experiment) or "official" (an official SDK).
 * The y-axis always starts at 0 (or below, if a value is negative).
 */
export const lineChart = (points, opts) => {
  const last_ = points.length - 1;
  const a = zoom ? Math.max(0, Math.min(zoom.from, last_)) : 0;
  const b = zoom ? Math.max(a, Math.min(zoom.to, last_)) : last_;
  const inView = (i) => i >= a && i <= b;
  // Lines also run to the nearest point outside the range, clipped at the plot edge, so they don't stop short.
  const all = points.map((p, i) => ({ ...p, i })).filter((p) => Number.isFinite(p.value));
  const data = all.filter((d) => inView(d.i));
  if (!data.length)
    return `<div class="empty">no data${zoom ? " in the selected range" : ""}</div>`;
  const withEdges = (list) => {
    const before = list.findLast((d) => d.i < a);
    const after = list.find((d) => d.i > b);
    return [
      ...(before ? [before] : []),
      ...list.filter((d) => inView(d.i)),
      ...(after ? [after] : []),
    ];
  };
  const W = 560;
  const H = 320;
  const left = 72;
  const right = 16;
  const top = 22;
  const bottom = 64;
  const plotW = W - left - right;
  const plotH = H - top - bottom;

  const refs = (opts.refs ?? []).filter((r) => Number.isFinite(r.value));
  // Optional second series (strict mode), drawn dashed; gaps where a run has no value.
  const secondAll = (opts.second?.values ?? [])
    .map((value, i) => ({ value, i }))
    .filter((d) => Number.isFinite(d.value));
  const second = secondAll.filter((d) => inView(d.i));
  const values = [
    ...data.map((d) => d.value),
    ...refs.map((r) => r.value),
    ...second.map((d) => d.value),
  ];
  let lo = Math.min(0, ...values);
  let hi = Math.max(...values);
  if (hi === lo) {
    hi += Math.abs(hi) * 0.05 || 1;
    lo -= Math.abs(lo) * 0.05 || 1;
  }
  const step = niceStep(hi - lo, 4);
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil(hi / step) * step;
  const n = b - a + 1;
  const colW = plotW / n;
  const x = (i) => left + colW * (i - a + 0.5);
  const y = (v) => top + plotH - ((v - lo) / (hi - lo)) * plotH;

  const clip = `plot-clip-${++clipId}`;
  // data-* let the drag-to-zoom handler map a pointer x back to a run index.
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" data-left="${left}" data-colw="${colW}" data-from="${a}" data-to="${b}" data-top="${top}" data-ploth="${plotH}">`;
  svg += `<defs><clipPath id="${clip}"><rect x="${left}" y="${top - 6}" width="${plotW}" height="${plotH + 12}"/></clipPath></defs>`;

  // Shade the work branch.
  const firstBranch = points.findIndex((p, i) => i >= a && p.branch);
  if (firstBranch !== -1 && firstBranch <= b) {
    const bx = left + colW * (firstBranch - a);
    svg += `<rect class="branch-zone" x="${bx}" y="${top}" width="${left + plotW - bx}" height="${plotH}"/>`;
    svg += `<text class="zone-label" x="${bx + 6}" y="${top - 7}">${esc(opts.branchLabel ?? "branch")} →</text>`;
    if (firstBranch > a)
      svg += `<text class="zone-label" x="${bx - 6}" y="${top - 7}" text-anchor="end">← main</text>`;
  }

  for (let v = lo; v <= hi + step / 2; v += step) {
    const gy = y(v);
    svg += `<line class="grid-line" x1="${left}" x2="${left + plotW}" y1="${gy}" y2="${gy}"/>`;
    svg += `<text x="${left - 8}" y="${gy + 4}" text-anchor="end">${esc(opts.format(v))}</text>`;
  }

  // Every line's value at column i, top of the chart first, so the list reads in the same order as the lines.
  const refCls = (r) => `ref ${r.kind === "official" ? "official" : "exp"}`;
  const secondAt = new Map(second.map((d) => [d.i, d.value]));
  const seriesTip = (i) => {
    const rows = [];
    if (Number.isFinite(points[i].value))
      rows.push({ v: points[i].value, sw: swatch("series"), name: opts.seriesLabel ?? "normal" });
    if (secondAt.has(i))
      rows.push({ v: secondAt.get(i), sw: swatch("series strict"), name: opts.second.label });
    for (const r of refs)
      rows.push({
        v: r.value,
        sw: swatch(refCls(r), r.color),
        name: r.label,
        detail: r.detail?.(i),
      });
    if (!rows.length) return "";
    rows.sort((a, b) => b.v - a.v);
    return `<table class="tip-series">${rows
      .map(
        (r) =>
          `<tr><td>${r.sw}</td><td>${esc(r.name)}${r.detail ? `<div class="tip-detail">${esc(r.detail)}</div>` : ""}</td><td class="num">${esc(opts.format(r.v))}</td></tr>`,
      )
      .join("")}</table>`;
  };

  // Hover columns sit under the line so the whole column is a target.
  points.forEach((p, i) => {
    if (!inView(i)) return;
    svg += `<rect class="col" data-col="${i}" data-idx="${i}" data-run="${esc(p.id)}" data-tip="${esc(`${p.tip}${seriesTip(i)}`)}" x="${left + colW * (i - a)}" y="${top}" width="${colW}" height="${plotH + bottom - 4}"/>`;
  });

  // Experiment lines; short labels stack at the left edge so close values stay readable.
  const placed = [];
  for (const ref of [...refs].sort((a, b) => a.value - b.value)) {
    const ry = y(ref.value);
    let ly = ry - 5;
    while (placed.some((p) => Math.abs(p - ly) < 13)) ly -= 13;
    placed.push(ly);
    svg += `<line class="${refCls(ref)}" x1="${left}" x2="${left + plotW}" y1="${ry}" y2="${ry}" style="stroke:${ref.color}"/>`;
    svg += `<text class="ref-label" x="${left + 6}" y="${ly}" style="fill:${ref.color}">${esc(ref.short ?? ref.label)} · ${esc(opts.format(ref.value))}<title>${esc(ref.label)}</title></text>`;
  }

  if (second.length) {
    svg += `<polyline class="series strict" clip-path="url(#${clip})" points="${withEdges(secondAll)
      .map((d) => `${x(d.i).toFixed(1)},${y(d.value).toFixed(1)}`)
      .join(" ")}"/>`;
    for (const d of second)
      svg += `<circle class="dot strict" data-col="${d.i}" cx="${x(d.i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="3"/>`;
    const s = second.at(-1);
    svg += `<text class="end-label strict" x="${x(s.i) - 7}" y="${y(s.value) + 16}" text-anchor="end">${esc(opts.second.label)} ${esc(opts.format(s.value))}</text>`;
  }
  svg += `<polyline class="series" clip-path="url(#${clip})" points="${withEdges(all)
    .map((d) => `${x(d.i).toFixed(1)},${y(d.value).toFixed(1)}`)
    .join(" ")}"/>`;

  for (const d of data) {
    svg += `<circle class="dot ${d.cls}" data-col="${d.i}" cx="${x(d.i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4.5"/>`;
  }
  // Value labels on the first and last point.
  const first = data[0];
  const last = data.at(-1);
  // A line that starts late keeps its first label inside the plot.
  const firstRight = x(first.i) > left + plotW * 0.6;
  if (data.length > 1)
    svg += `<text class="end-label" x="${x(first.i) + (firstRight ? -7 : 7)}" y="${y(first.value) - 8}"${firstRight ? ' text-anchor="end"' : ""}>${esc(opts.format(first.value))}</text>`;
  svg += `<text class="end-label" x="${x(last.i) - 7}" y="${y(last.value) - 10}" text-anchor="end">${esc(opts.format(last.value))}</text>`;

  // Thin the commit labels so neighbours don't overlap; the newest one always shows.
  const every = Math.max(1, Math.ceil(15 / colW));
  points.forEach((p, i) => {
    if (!inView(i) || (b - i) % every !== 0) return;
    const lx = x(i);
    const ly = top + plotH + 12;
    svg += `<text class="xlabel" data-col="${i}" transform="translate(${lx + 3},${ly}) rotate(-55)" text-anchor="end">${esc(p.label)}</text>`;
  });

  // Legend only when there is more than the one line.
  const items = [];
  if (second.length || refs.length)
    items.push(`<span>${swatch("series")}${esc(opts.seriesLabel ?? "normal")}</span>`);
  if (second.length) items.push(`<span>${swatch("series strict")}${esc(opts.second.label)}</span>`);
  for (const r of refs)
    items.push(
      `<span title="${esc(r.label)}">${swatch(refCls(r), r.color)}${esc(r.short ?? r.label)}</span>`,
    );
  const legend = items.length ? `<div class="chart-legend">${items.join("")}</div>` : "";

  return `${legend}${svg}</svg>`;
};

/**
 * Horizontal bars, largest first as given. rows: [{ label, value, sub?, href?, key?, color? }]
 * opts: { format, labelWidth? }. A row with `key` is clickable (data-pick).
 */
export const barChart = (rows, opts) => {
  const data = rows.filter((r) => Number.isFinite(r.value));
  if (!data.length) return `<div class="empty small">No data in this run.</div>`;
  const W = 700;
  const rowH = 20;
  const labelW = opts.labelWidth ?? 230;
  // Room for the longest "value sub" text after the largest bar (monospace, about 7.3 px per character).
  const valueW = Math.min(
    400,
    Math.max(90, ...data.map((d) => `${opts.format(d.value)} ${d.sub ?? ""}`.length * 7.3 + 12)),
  );
  const plotW = W - labelW - valueW;
  const H = data.length * rowH + 4;
  const max = Math.max(...data.map((d) => d.value), 0) || 1;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img"><defs><linearGradient id="bar-fill" x1="0" x2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--rose)"/></linearGradient></defs>`;
  data.forEach((d, i) => {
    const y0 = i * rowH;
    const w = Math.max(1, (Math.max(0, d.value) / max) * plotW);
    const pick = d.key ? ` data-pick="${esc(d.key)}" class="pick"` : "";
    svg += `<g${pick}><rect class="row-hit" x="0" y="${y0}" width="${W}" height="${rowH}"/>`;
    svg += `<text x="${labelW - 8}" y="${y0 + 14}" text-anchor="end" class="bar-label"${d.color ? ` style="fill:${d.color}"` : ""}>${esc(d.label.length > 30 ? `…${d.label.slice(-29)}` : d.label)}</text>`;
    svg += `<rect class="bar" x="${labelW}" y="${y0 + 4}" width="${w.toFixed(1)}" height="${rowH - 8}" rx="2"${d.color ? ` style="fill:${d.color}"` : ""}/>`;
    svg += `<text x="${labelW + w + 6}" y="${y0 + 14}">${esc(opts.format(d.value))}${d.sub ? ` <tspan class="bar-sub">${esc(d.sub)}</tspan>` : ""}</text>`;
    svg += `<title>${esc(`${d.label}: ${opts.format(d.value)}`)}</title></g>`;
  });
  return `${svg}</svg>`;
};
