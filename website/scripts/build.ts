#!/usr/bin/env bun
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  readBundleBench,
  readRuntimeBench,
  type BundleBench,
  type BundleRow,
  type RuntimeBench,
} from "./bench-data.ts";
import { readPatchStats, type PatchStats } from "./patch-stats.ts";

const websiteRoot = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = join(websiteRoot, "..");
const publicDir = join(websiteRoot, "public");
const distDir = join(websiteRoot, "dist");
const packagesDir = join(repoRoot, "packages");

type Pkg = { name: string; dir: string; version: string };

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const readPackages = async (): Promise<Pkg[]> => {
  const entries = await readdir(packagesDir, { withFileTypes: true });
  const packages: Pkg[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pkgPath = join(packagesDir, entry.name, "package.json");
    try {
      const pkg = JSON.parse(await readFile(pkgPath, "utf8")) as {
        name?: unknown;
        version?: unknown;
        private?: unknown;
      };
      if (pkg.private === true) continue;
      if (
        typeof pkg.name !== "string" ||
        !pkg.name.startsWith("@distilled.cloud/")
      ) {
        continue;
      }
      packages.push({
        name: pkg.name,
        dir: entry.name,
        version: typeof pkg.version === "string" ? pkg.version : "",
      });
    } catch {
      // Skip directories without a readable package.json.
    }
  }
  packages.sort((a, b) => a.name.localeCompare(b.name));
  return packages;
};

/**
 * Catalogue grouping, keyed by `packages/<dir>`. Anything not listed lands in
 * "More", so a new package never breaks the build; add it here when it ships.
 */
const GROUPS: ReadonlyArray<readonly [string, ReadonlyArray<string>]> = [
  [
    "Clouds",
    [
      "aws",
      "azure",
      "gcp",
      "cloudflare",
      "digitalocean",
      "hetzner",
      "ovh",
      "hostinger",
    ],
  ],
  [
    "Platforms",
    [
      "vercel",
      "railway",
      "render",
      "fly-io",
      "modal",
      "coolify",
      "expo-eas",
      "kubernetes",
      "docker",
      "argocd",
      "remote",
    ],
  ],
  [
    "Data",
    [
      "neon",
      "supabase",
      "planetscale",
      "prisma-postgres",
      "turso",
      "xata",
      "mongodb-atlas",
      "redis-cloud",
      "elasticsearch",
      "meilisearch",
      "typesense",
      "turbopuffer",
      "surrealdb",
      "spacetimedb",
    ],
  ],
  [
    "Identity & secrets",
    [
      "auth0",
      "clerk",
      "workos",
      "okta",
      "onepassword",
      "doppler",
      "infisical",
      "unkey",
    ],
  ],
  [
    "Payments",
    [
      "stripe",
      "adyen",
      "paypal",
      "plaid",
      "coinbase",
      "mercury",
      "polar",
      "whop",
      "gusto",
    ],
  ],
  [
    "Observability",
    [
      "datadog",
      "sentry",
      "axiom",
      "grafana",
      "chronosphere",
      "posthog",
      "launchdarkly",
      "growthbook",
      "vanta",
    ],
  ],
  [
    "Messaging & support",
    ["slack", "discord", "resend", "intercom", "zendesk", "customerio"],
  ],
  [
    "Developer tools",
    [
      "github",
      "forgejo",
      "temporal",
      "inngest",
      "trigger-dev",
      "huggingface",
      "opencode",
      "core",
    ],
  ],
  [
    "Business",
    [
      "google-workspace",
      "squarespace",
      "porkbun",
      "metabase",
      "apache-superset",
      "modrinth",
      "archil",
    ],
  ],
];

const SEARCH_HINTS: Record<string, string> = {
  neon: "postgres serverless",
  supabase: "postgres auth storage",
  planetscale: "mysql postgres",
  "prisma-postgres": "postgres",
  turso: "sqlite libsql",
  xata: "postgres",
  "redis-cloud": "redis cache",
  "mongodb-atlas": "mongo document",
  aws: "s3 lambda dynamodb sqs iam ec2 smithy",
  gcp: "google compute storage discovery",
  azure: "microsoft arm",
  cloudflare: "workers r2 kv d1",
  github: "git repos actions",
  forgejo: "git gitea",
  auth0: "auth oidc",
  clerk: "auth users",
  workos: "auth sso",
  okta: "auth sso",
  onepassword: "secrets 1password",
  doppler: "secrets env",
  infisical: "secrets env",
  unkey: "api keys",
  stripe: "payments billing",
  adyen: "payments",
  paypal: "payments",
  plaid: "banking",
  coinbase: "crypto",
  mercury: "banking",
  polar: "payments open source",
  whop: "payments",
  gusto: "payroll",
  datadog: "metrics logs",
  sentry: "errors tracing",
  axiom: "logs otel",
  grafana: "dashboards",
  posthog: "analytics flags",
  launchdarkly: "feature flags",
  growthbook: "feature flags",
  resend: "email",
  customerio: "email messaging",
  intercom: "support chat",
  zendesk: "support tickets",
  temporal: "workflows",
  inngest: "workflows queues",
  "trigger-dev": "jobs workflows",
  huggingface: "ai models",
  "fly-io": "machines",
  modal: "ai gpu",
  kubernetes: "k8s",
  "expo-eas": "react native builds",
  "google-workspace": "gmail drive calendar",
  porkbun: "domains dns",
  hetzner: "servers",
  ovh: "servers",
  hostinger: "hosting",
  metabase: "bi dashboards",
  "apache-superset": "bi dashboards",
  modrinth: "minecraft mods",
  core: "runtime shared",
};

const groupPackages = (
  packages: Pkg[],
): Array<{ title: string; packages: Pkg[] }> => {
  const byDir = new Map(packages.map((pkg) => [pkg.dir, pkg]));
  const placed = new Set<string>();
  const groups: Array<{ title: string; packages: Pkg[] }> = [];
  for (const [title, dirs] of GROUPS) {
    const members: Pkg[] = [];
    for (const dir of dirs) {
      const pkg = byDir.get(dir);
      if (pkg && !placed.has(dir)) {
        members.push(pkg);
        placed.add(dir);
      }
    }
    members.sort((a, b) => a.name.localeCompare(b.name));
    if (members.length > 0) groups.push({ title, packages: members });
  }
  const rest = packages.filter((pkg) => !placed.has(pkg.dir));
  if (rest.length > 0) groups.push({ title: "More", packages: rest });
  return groups;
};

/** Packages a real consumer (Alchemy) imports; see data/alchemy-providers.json. */
const alchemyUsed = new Set(
  (
    JSON.parse(
      await readFile(
        join(websiteRoot, "data", "alchemy-providers.json"),
        "utf8",
      ),
    ) as { used: string[] }
  ).used,
);

type BrandIcon = { readonly viewBox: string; readonly d: string };
const brandIcons = JSON.parse(
  await readFile(join(websiteRoot, "data", "brand-icons.json"), "utf8"),
) as Record<string, BrandIcon | string>;

const hasIcon = (dir: string): boolean =>
  typeof brandIcons[dir] === "object" && brandIcons[dir] !== null;

/** One <symbol> per brand; referenced by <use> from each card. */
const iconSprite = (): string =>
  `<svg class="sprite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style="display:none">` +
  Object.entries(brandIcons)
    .filter(
      (e): e is [string, BrandIcon] =>
        typeof e[1] === "object" && e[1] !== null,
    )
    .map(
      ([dir, icon]) =>
        `<symbol id="i-${escapeHtml(dir)}" viewBox="${escapeHtml(icon.viewBox)}"><path d="${escapeHtml(icon.d)}"/></symbol>`,
    )
    .join("") +
  `</svg>`;

/** Monogram for brands without a mark: first letter, or two for hyphenated names. */
const monogram = (short: string): string => {
  const parts = short.split("-").filter(Boolean);
  const letters =
    parts.length > 1
      ? parts
          .slice(0, 2)
          .map((p) => p[0])
          .join("")
      : short.slice(0, 1);
  return letters.toUpperCase();
};

const brandMark = (pkg: { readonly dir: string }, short: string): string =>
  hasIcon(pkg.dir)
    ? `<span class="pkg__mark"><svg aria-hidden="true"><use href="#i-${escapeHtml(pkg.dir)}"/></svg></span>`
    : `<span class="pkg__mark pkg__mark--mono" aria-hidden="true">${escapeHtml(monogram(short))}</span>`;

const packageCard = (pkg: Pkg): string => {
  const name = escapeHtml(pkg.name);
  const short = escapeHtml(pkg.name.replace("@distilled.cloud/", ""));
  const dir = escapeHtml(pkg.dir);
  const version = pkg.version ? escapeHtml(pkg.version) : "";
  const search = escapeHtml(
    [pkg.name, pkg.dir, SEARCH_HINTS[pkg.dir] ?? ""].join(" "),
  );
  return [
    `<li class="pkg${hasIcon(pkg.dir) ? "" : " pkg--nomark"}" data-search="${search}">`,
    brandMark(pkg, short),
    `<a class="pkg__name" href="https://www.npmjs.com/package/${name}" rel="noopener">${short}</a>`,
    `<span class="pkg__meta">${version ? `<span>${version}</span>` : ""}</span>`,
    `<a class="pkg__src" href="https://github.com/alchemy-run/distilled/tree/main/packages/${dir}" rel="noopener" aria-label="${short} source on GitHub">src</a>`,
    `</li>`,
  ].join("");
};

const renderGroups = (packages: Pkg[]): string =>
  groupPackages(packages)
    .map(
      ({ title, packages }) =>
        `<section class="group" aria-label="${escapeHtml(title)}">` +
        `<h3 class="group__title">${escapeHtml(title)}<span class="group__count">${packages.length} package${packages.length === 1 ? "" : "s"}</span></h3>` +
        `<ul class="pkgs">${packages.map(packageCard).join("")}</ul>` +
        `</section>`,
    )
    .join("\n");

// ───────────── /shame ─────────────

type Ranked = PatchStats & { short: string; name: string };

const fmt = new Intl.NumberFormat("en-US");
const fmt1 = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const npmUrl = (name: string) => `https://www.npmjs.com/package/${name}`;
const patchesUrl = (dir: string) =>
  `https://github.com/alchemy-run/distilled/tree/main/packages/${dir}/patches`;

const OP_LABELS: Record<string, string> = {
  add: "added",
  replace: "replaced",
  remove: "removed",
  move: "moved",
  copy: "copied",
  test: "tested",
  declare: "declared",
  other: "other",
};

const opBreakdown = (ops: Readonly<Record<string, number>>): string =>
  Object.entries(ops)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([kind, n]) =>
        `<span class="op op--${escapeHtml(kind)}"><b>${fmt.format(n)}</b> ${OP_LABELS[kind] ?? escapeHtml(kind)}</span>`,
    )
    .join("");

const rankStats = async (packages: Pkg[]): Promise<Ranked[]> => {
  const all = await Promise.all(
    packages.map(async (pkg) => ({
      ...(await readPatchStats(packagesDir, pkg.dir)),
      name: pkg.name,
      short: pkg.name.replace("@distilled.cloud/", ""),
    })),
  );
  // Only packages that actually expose operations are ranked.
  return all.filter((s) => s.operations > 0);
};

const offenderRow = (s: Ranked, rank: number, max: number): string => {
  const per100 = s.per100 ?? 0;
  const width = Math.max(2, Math.round((per100 / max) * 100));
  const tier =
    rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "";
  return (
    `<li class="offender${tier ? ` offender--${tier}` : ""}">` +
    `<span class="offender__rank" aria-label="Rank ${rank}">${String(rank).padStart(2, "0")}</span>` +
    `<div class="offender__body">` +
    `<div class="offender__head">` +
    brandMark(s, s.short) +
    `<a class="offender__name" href="${npmUrl(s.name)}" rel="noopener">${escapeHtml(s.short)}</a>` +
    (alchemyUsed.has(s.dir)
      ? `<span class="proven" title="Imported by Alchemy resources on main">in production</span>`
      : "") +
    `<span class="offender__score"><b>${fmt1.format(per100)}</b> fixes / 100 ops</span>` +
    `</div>` +
    `<div class="bar" aria-hidden="true"><span class="bar__fill" style="width:${width}%"></span></div>` +
    `<div class="offender__meta">` +
    `<span><b>${fmt.format(s.fixes)}</b> fixes</span>` +
    `<span><b>${fmt.format(s.operations)}</b> operations</span>` +
    `<span><b>${fmt.format(s.files)}</b> patch file${s.files === 1 ? "" : "s"}</span>` +
    `<a class="offender__link" href="${patchesUrl(s.dir)}" rel="noopener">see patches →</a>` +
    `</div>` +
    `<div class="offender__ops">${opBreakdown(s.ops)}</div>` +
    `</div>` +
    `</li>`
  );
};

const honourItem = (s: Ranked): string =>
  `<li class="honour__item"><a href="${npmUrl(s.name)}" rel="noopener">${brandMark(s, s.short)}<span class="honour__name">${escapeHtml(s.short)}</span><span class="honour__ops">${fmt.format(s.operations)} ops</span></a></li>`;

const totalsHtml = (ranked: Ranked[]): string => {
  const patched = ranked.filter((s) => s.fixes > 0);
  const clean = ranked.filter(
    (s) => s.fixes === 0 && alchemyUsed.has(s.dir),
  ).length;
  const fixes = ranked.reduce((n, s) => n + s.fixes, 0);
  const files = ranked.reduce((n, s) => n + s.files, 0);
  const stat = (n: string, label: string) =>
    `<div class="stat"><span class="stat__n">${n}</span><span class="stat__l">${label}</span></div>`;
  return [
    stat(fmt.format(fixes), "spec fixes carried"),
    stat(fmt.format(files), "patch files"),
    stat(fmt.format(patched.length), "providers patched"),
    stat(fmt.format(clean), "clean & in production"),
  ].join("");
};

/**
 * The award goes to the least-patched package among those a real consumer
 * (Alchemy) exercises: lowest fixes per 100 operations, largest SDK on a tie.
 * Unused packages are excluded — zero patches there is absence of evidence.
 */
const pickAward = (ranked: Ranked[]): Ranked | undefined =>
  ranked
    .filter((s) => alchemyUsed.has(s.dir))
    .sort(
      (a, b) =>
        (a.per100 ?? 0) - (b.per100 ?? 0) || b.operations - a.operations,
    )[0];

const awardHtml = (ranked: Ranked[]): string => {
  const winner = pickAward(ranked);
  const worst = [...ranked]
    .filter((s) => s.fixes > 0)
    .sort((a, b) => (b.per100 ?? 0) - (a.per100 ?? 0))[0];
  if (!winner) return "";
  const laurel =
    `<svg class="award__laurel" viewBox="0 0 64 64" aria-hidden="true">` +
    `<path d="M32 10c-9 6-14 15-14 26 0 6 2 11 5 15M32 10c9 6 14 15 14 26 0 6-2 11-5 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M22 20c-4 0-7 3-7 7 4 0 7-3 7-7zm-4 12c-4 0-7 3-7 7 4 0 7-3 7-7zm1 11c-4 1-6 4-5 8 4-1 6-4 5-8zM42 20c4 0 7 3 7 7-4 0-7-3-7-7zm4 12c4 0 7 3 7 7-4 0-7-3-7-7zm-1 11c4 1 6 4 5 8-4-1-6-4-5-8z" fill="currentColor"/>` +
    `<circle cx="32" cy="34" r="6" fill="none" stroke="currentColor" stroke-width="2"/>` +
    `</svg>`;
  return (
    `<div class="award__card">` +
    laurel +
    `<div class="award__body">` +
    `<p class="eyebrow">Least patched, in production</p>` +
    `<h2 id="award-title" class="award__title"><a href="${npmUrl(winner.name)}" rel="noopener">${escapeHtml(winner.short)}</a></h2>` +
    (winner.fixes === 0
      ? `<p class="award__blurb"><b>${fmt.format(winner.operations)}</b> operations, in production under Alchemy, zero patches. The description was right.</p>`
      : `<p class="award__blurb"><b>${fmt.format(winner.operations)}</b> operations, in production under Alchemy, and only <b>${fmt.format(winner.fixes)}</b> ${winner.fixes === 1 ? "fix" : "fixes"} needed — <b>${fmt1.format(winner.per100 ?? 0)}</b> per 100.</p>`) +
    `</div>` +
    `<div class="award__aside">` +
    (worst
      ? `<p class="award__worst">At the other end: <a href="/shame">${escapeHtml(worst.short)}</a> needs <b>${fmt1.format(worst.per100 ?? 0)}</b> fixes per 100 operations.</p>`
      : "") +
    `<a class="btn btn--ghost" href="/shame">Wall of shame →</a>` +
    `</div>` +
    `</div>`
  );
};

// ───────────── /bench ─────────────

const kb = (bytes: number) => `${fmt1.format(bytes / 1024)} KB`;
const ms = (n: number) =>
  n >= 1000 ? `${fmt1.format(n / 1000)} s` : `${fmt.format(Math.round(n))} ms`;
const ns = (n: number) =>
  n >= 1e6
    ? `${fmt1.format(n / 1e6)} ms`
    : n >= 1e3
      ? `${fmt.format(Math.round(n / 1e3))} µs`
      : `${fmt.format(Math.round(n))} ns`;
const kops = (n: number) =>
  n >= 1e6
    ? `${fmt1.format(n / 1e6)}M`
    : n >= 1e3
      ? `${fmt.format(Math.round(n / 1e3))}k`
      : fmt.format(Math.round(n));

const shortDate = (iso: string): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? escapeHtml(iso)
    : d.toISOString().slice(0, 10);
};

/** Escape, then turn `code` spans into <code>; bench descriptions use them. */
const inlineCode = (text: string): string =>
  escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");

const benchNotice = (
  runtime: RuntimeBench | null,
  bundle: BundleBench | null,
): string => {
  const seeded = [
    runtime?.seed ? "runtime" : "",
    bundle?.seed ? "bundle" : "",
  ].filter(Boolean);
  if (seeded.length === 0) return "";
  return (
    `<p class="notice"><b>Interim numbers.</b> The ${seeded.join(" and ")} figures below are the values the benchmark authors posted while their harnesses land ` +
    `(<a href="https://github.com/alchemy-run/distilled/pull/567" rel="noopener">#567</a>, ` +
    `<a href="https://github.com/alchemy-run/distilled/pull/569" rel="noopener">#569</a>). ` +
    `This page switches to the committed <code>results/latest.json</code> automatically once it exists.</p>`
  );
};

const bundleSection = (b: BundleBench | null): string => {
  if (!b) return "";
  const rows = [...b.rows];
  const maxBytes = Math.max(...rows.map((r) => r.bytes));
  const base = (fixture: string) =>
    rows.find((r) => r.fixture === fixture && r.variant === "bun");
  const s3 = base("aws-s3-deep");
  const cf = base("cf-workers-deep");
  const both = base("combined-worker");
  const headline = [s3, cf, both]
    .filter((r): r is BundleRow => r !== undefined)
    .map((r) => {
      const label =
        r.fixture === "aws-s3-deep"
          ? "one S3 operation"
          : r.fixture === "cf-workers-deep"
            ? "one Workers operation"
            : "S3 + Workers together";
      return `<div class="stat"><span class="stat__n">${kb(r.gzipBytes)}</span><span class="stat__l">${label} · gzip</span></div>`;
    })
    .join("");

  const row = (r: BundleRow) => {
    const gzW = Math.max(1.5, (r.gzipBytes / maxBytes) * 100);
    const rawW = Math.max(gzW, (r.bytes / maxBytes) * 100);
    const shake = r.opsRetained
      .map(
        (o) =>
          `<span class="shake${o.retained <= 1 ? " shake--ok" : ""}"><b>${o.retained}</b>/${o.total} ${escapeHtml(o.service)}</span>`,
      )
      .join("");
    const leak =
      r.leaks > 0
        ? `<span class="shake shake--bad">${r.leaks} leak${r.leaks === 1 ? "" : "s"}</span>`
        : `<span class="shake shake--ok">no leaks</span>`;
    const variant =
      r.variant === "bun"
        ? ""
        : `<span class="variant">${escapeHtml(r.variant.replace("bun+", "+"))}</span>`;
    return (
      `<li class="brow">` +
      `<div class="brow__head">` +
      `<span class="brow__name"><code>${escapeHtml(r.fixture)}</code>${variant}</span>` +
      `<span class="brow__desc">${inlineCode(r.description ?? "")}</span>` +
      `</div>` +
      `<div class="brow__bar" aria-hidden="true">` +
      `<span class="brow__raw" style="width:${rawW.toFixed(1)}%"></span>` +
      `<span class="brow__gz" style="width:${gzW.toFixed(1)}%"></span>` +
      `</div>` +
      `<div class="brow__nums">` +
      `<span><b>${kb(r.gzipBytes)}</b> gzip</span>` +
      `<span>${kb(r.bytes)} raw</span>` +
      `<span><b>${ms(r.coldMs)}</b> cold</span>` +
      (r.warmMs === null ? "" : `<span>${ms(r.warmMs)} warm</span>`) +
      `</div>` +
      `<div class="brow__shake">${shake}${leak}</div>` +
      `</li>`
    );
  };

  return (
    `<div class="section__head">` +
    `<p class="eyebrow">Bundle size</p>` +
    `<h2 id="bundle-title">Import one operation, pay for <em>one</em> operation.</h2>` +
    `<p class="section__lede">Each row is a small worker that imports a single Distilled operation and calls it, bundled the way Alchemy bundles for Cloudflare Workers. Deep and barrel imports produce the same bytes; the barrel just costs bundle time.</p>` +
    `</div>` +
    `<div class="shame-stats bench-stats">${headline}</div>` +
    `<ul class="brows">${rows.map(row).join("")}</ul>` +
    `<p class="bench-meta">rolldown ${escapeHtml(b.rolldown)} · bun ${escapeHtml(b.bun)}${b.host?.cpu ? ` · ${escapeHtml(b.host.cpu)}` : ""} · ${b.runs} run${b.runs === 1 ? "" : "s"} · ${shortDate(b.generatedAt)} · <code>${escapeHtml(b.commit)}</code></p>`
  );
};

const STAGE_LABELS: Record<string, string> = {
  call: "Full call",
  build: "Build request",
  "wire-decode": "Parse response",
  encode: "Encode input",
  decode: "Decode output",
  "call-error": "Typed error",
};
const STAGE_ORDER = [
  "call",
  "build",
  "wire-decode",
  "decode",
  "encode",
  "call-error",
];

const runtimeSection = (r: RuntimeBench | null): string => {
  if (!r) return "";
  const results = [...r.results];
  const baseline =
    results.find((x) => x.name === "baseline/mock-http/roundtrip/call") ??
    results.find((x) => x.provider === "baseline" && x.stage === "call");
  const stages = STAGE_ORDER.filter((s) => results.some((x) => x.stage === s));
  const byStage = (s: string) =>
    results
      .filter((x) => x.stage === s && x.provider !== "baseline")
      .sort((a, b) => b.opsPerSec - a.opsPerSec);

  const fastest = (provider: string) =>
    byStage("call").find((x) => x.provider === provider);
  const cfBest = fastest("cloudflare");
  const awsBest = fastest("aws");
  const headline = [
    baseline
      ? `<div class="stat"><span class="stat__n">${ns(baseline.p50)}</span><span class="stat__l">mock round-trip, no SDK</span></div>`
      : "",
    cfBest
      ? `<div class="stat"><span class="stat__n">${ns(cfBest.p50)}</span><span class="stat__l">cloudflare ${escapeHtml(cfBest.op)} · p50</span></div>`
      : "",
    awsBest
      ? `<div class="stat"><span class="stat__n">${ns(awsBest.p50)}</span><span class="stat__l">aws ${escapeHtml(awsBest.op)} · p50 (SigV4)</span></div>`
      : "",
  ].join("");

  const rowsHtml = stages
    .map((stage) => {
      const list = byStage(stage);
      const maxP50 = Math.max(...list.map((x) => x.p50));
      return list
        .map((x) => {
          const w = Math.max(1.5, (x.p50 / maxP50) * 100);
          const baseW =
            baseline && stage === "call"
              ? Math.min(w, (baseline.p50 / maxP50) * 100)
              : 0;
          return (
            `<tr data-row-stage="${escapeHtml(stage)}" hidden>` +
            `<th scope="row"><span class="rrow__prov rrow__prov--${escapeHtml(x.provider)}">${escapeHtml(x.provider)}</span><code>${escapeHtml(x.service)}.${escapeHtml(x.op)}</code>${x.note ? `<span class="rrow__note">${escapeHtml(x.note)}</span>` : ""}</th>` +
            `<td class="num"><b>${kops(x.opsPerSec)}</b><span class="unit">ops/s</span></td>` +
            `<td class="num">${ns(x.p50)}</td>` +
            `<td class="num muted">${ns(x.p99)}</td>` +
            `<td class="barcell"><span class="rbar" aria-hidden="true"><i style="width:${w.toFixed(1)}%"></i>${baseW > 0 ? `<em style="width:${baseW.toFixed(1)}%" title="mock round-trip"></em>` : ""}</span></td>` +
            `</tr>`
          );
        })
        .join("");
    })
    .join("");

  const tabs = stages
    .map(
      (s) =>
        `<button type="button" data-stage="${escapeHtml(s)}" aria-pressed="false">${STAGE_LABELS[s] ?? escapeHtml(s)}</button>`,
    )
    .join("");

  return (
    `<div class="section__head">` +
    `<p class="eyebrow">Runtime</p>` +
    `<h2 id="runtime-title">Per call, with the network <em>removed</em>.</h2>` +
    `<p class="section__lede">The HTTP client is mocked, so this is only the SDK's own work: encode, sign, serialize, parse, decode. Lower p50 is better; the faint bar on <em>Full call</em> rows is the mocked round-trip with no SDK at all.</p>` +
    `</div>` +
    `<div class="shame-stats bench-stats">${headline}</div>` +
    `<div class="rtable" data-stages>` +
    `<div class="stage-tabs" role="group" aria-label="Stage">${tabs}</div>` +
    `<div class="rtable__scroll"><table>` +
    `<thead><tr><th scope="col">operation</th><th scope="col" class="num">throughput</th><th scope="col" class="num">p50</th><th scope="col" class="num muted">p99</th><th scope="col" class="barcell"><span class="sr-only">relative p50</span></th></tr></thead>` +
    `<tbody>${rowsHtml}</tbody></table></div>` +
    `</div>` +
    `<p class="bench-meta">${escapeHtml(r.machine.runtime)}${r.machine.cpu ? ` · ${escapeHtml(r.machine.cpu)}` : ""} · ${escapeHtml(r.profile)} profile · ${shortDate(r.generatedAt)} · <code>${escapeHtml(r.commit)}</code></p>`
  );
};

const packages = await readPackages();
const ranked = await rankStats(packages);
const [runtimeBench, bundleBench] = await Promise.all([
  readRuntimeBench(repoRoot, websiteRoot),
  readBundleBench(repoRoot, websiteRoot),
]);
const offenders = ranked
  .filter((s) => s.fixes > 0)
  .sort((a, b) => (b.per100 ?? 0) - (a.per100 ?? 0) || b.fixes - a.fixes);
const zeroPatch = ranked
  .filter((s) => s.fixes === 0)
  .sort((a, b) => b.operations - a.operations);
const honour = zeroPatch.filter((s) => alchemyUsed.has(s.dir));
const unproven = zeroPatch.filter((s) => !alchemyUsed.has(s.dir));
const maxPer100 = offenders[0]?.per100 ?? 1;

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });

const indexPath = join(distDir, "index.html");
let html = await readFile(indexPath, "utf8");
html = html.replace("<!-- PACKAGES -->", iconSprite() + renderGroups(packages));
html = html.replace("<!-- AWARD -->", awardHtml(ranked));
html = html.replaceAll("<!-- PACKAGE_COUNT -->", String(packages.length));
await writeFile(indexPath, html);

const shamePath = join(distDir, "shame.html");
let shame = await readFile(shamePath, "utf8");
shame = shame.replace("<!-- SHAME_TOTALS -->", totalsHtml(ranked));
shame = shame.replace(
  "<!-- SHAME_OFFENDERS -->",
  offenders.map((s, i) => offenderRow(s, i + 1, maxPer100)).join("\n"),
);
shame = shame.replace(
  "<!-- SHAME_HONOUR -->",
  iconSprite() +
    (honour.length > 0
      ? honour.map(honourItem).join("\n")
      : `<li class="honour__empty">Nobody. Every package Alchemy uses in production has needed at least one spec fix. The bar is here; nobody has cleared it yet.</li>`),
);
shame = shame.replace(
  "<!-- SHAME_UNPROVEN -->",
  unproven.map(honourItem).join("\n"),
);
shame = shame.replaceAll("<!-- UNPROVEN_COUNT -->", String(unproven.length));
shame = shame.replaceAll("<!-- HONOUR_COUNT -->", String(honour.length));
await writeFile(shamePath, shame);

const benchPath = join(distDir, "bench.html");
let bench = await readFile(benchPath, "utf8");
bench = bench.replace(
  "<!-- BENCH_NOTICE -->",
  benchNotice(runtimeBench, bundleBench),
);
bench = bench.replace("<!-- BENCH_BUNDLE -->", bundleSection(bundleBench));
bench = bench.replace("<!-- BENCH_RUNTIME -->", runtimeSection(runtimeBench));
await writeFile(benchPath, bench);

const benchNote = [
  runtimeBench
    ? `runtime ${runtimeBench.results.length}${runtimeBench.seed ? " (seed)" : ""}`
    : "runtime —",
  bundleBench
    ? `bundle ${bundleBench.rows.length}${bundleBench.seed ? " (seed)" : ""}`
    : "bundle —",
].join(", ");
console.log(
  `built ${packages.length} packages, ${offenders.length} shamed, ${honour.length} honoured, ${unproven.length} unproven, bench: ${benchNote} → ${distDir}`,
);
