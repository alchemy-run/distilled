/**
 * The published `@distilled.cloud/*` catalogue, read from
 * `packages/*\/package.json` at build time.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export interface Pkg {
  /** npm name, e.g. `@distilled.cloud/aws`. */
  readonly name: string;
  /** `packages/<dir>`. */
  readonly dir: string;
  /** Name without the scope. */
  readonly short: string;
  readonly version: string;
}

export const readPackages = async (packagesDir: string): Promise<Pkg[]> => {
  const entries = await readdir(packagesDir, { withFileTypes: true });
  const packages: Pkg[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pkgPath = join(packagesDir, entry.name, "package.json");
    let pkg: { name?: unknown; version?: unknown; private?: unknown };
    try {
      pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    } catch {
      continue;
    }
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
      short: pkg.name.replace("@distilled.cloud/", ""),
      version: typeof pkg.version === "string" ? pkg.version : "",
    });
  }
  packages.sort((a, b) => a.name.localeCompare(b.name));
  return packages;
};

/**
 * Catalogue grouping, keyed by `packages/<dir>`. Anything not listed lands in
 * "More", so a new package never breaks the build; add it here when it ships.
 */
export const GROUPS: ReadonlyArray<readonly [string, ReadonlyArray<string>]> = [
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
  ["Identity", ["auth0", "clerk", "workos", "okta"]],
  ["Secrets", ["onepassword", "doppler", "infisical", "unkey"]],
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
    ],
  ],
  [
    "Business & analytics",
    [
      "google-workspace",
      "squarespace",
      "porkbun",
      "metabase",
      "apache-superset",
    ],
  ],
];

/** Extra words the catalogue filter matches on, keyed by `packages/<dir>`. */
export const SEARCH_HINTS: Record<string, string> = {
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

export interface PackageGroup {
  readonly title: string;
  readonly packages: ReadonlyArray<Pkg>;
}

export const groupPackages = (packages: ReadonlyArray<Pkg>): PackageGroup[] => {
  const byDir = new Map(packages.map((pkg) => [pkg.dir, pkg]));
  const placed = new Set<string>();
  const groups: PackageGroup[] = [];
  for (const [title, dirs] of GROUPS) {
    const members: Pkg[] = [];
    for (const dir of dirs) {
      const pkg = byDir.get(dir);
      if (!pkg || placed.has(dir)) continue;
      members.push(pkg);
      placed.add(dir);
    }
    members.sort((a, b) => a.name.localeCompare(b.name));
    if (members.length > 0) groups.push({ title, packages: members });
  }
  const rest = packages.filter((pkg) => !placed.has(pkg.dir));
  if (rest.length > 0) groups.push({ title: "More", packages: rest });
  return groups;
};
