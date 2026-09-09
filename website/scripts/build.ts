#!/usr/bin/env bun
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

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

const packageCard = (pkg: Pkg): string => {
  const name = escapeHtml(pkg.name);
  const short = escapeHtml(pkg.name.replace("@distilled.cloud/", ""));
  const dir = escapeHtml(pkg.dir);
  const version = pkg.version ? escapeHtml(pkg.version) : "";
  const search = escapeHtml(
    [pkg.name, pkg.dir, SEARCH_HINTS[pkg.dir] ?? ""].join(" "),
  );
  return [
    `<li class="pkg" data-search="${search}">`,
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

const packages = await readPackages();

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });

const indexPath = join(distDir, "index.html");
let html = await readFile(indexPath, "utf8");
html = html.replace("<!-- PACKAGES -->", renderGroups(packages));
html = html.replaceAll("<!-- PACKAGE_COUNT -->", String(packages.length));
await writeFile(indexPath, html);

console.log(`built ${packages.length} packages → ${distDir}`);
