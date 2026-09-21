/**
 * Everything the site renders that comes from the repository rather than
 * from copy: the package catalogue, per-package spec-patch statistics, the
 * benchmark artifacts and the list of packages Alchemy runs on.
 *
 * `collectSiteData` runs once per build (see `plugin.ts`). Each page gets its
 * own slice as a virtual module (`site:home`, `site:shame`, `site:bench`) so a
 * route's client chunk only carries the data it renders; the brand marks are
 * written out once as an SVG sprite and referenced by `<use>`.
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { readAlchemyUsage, type AlchemyUsage } from "./alchemy-usage.ts";
import {
  readBundleBench,
  readRuntimeBench,
  type BundleBench,
  type RuntimeBench,
} from "./bench-data.ts";
import { groupPackages, readPackages, SEARCH_HINTS } from "./packages.ts";
import { readPatchStats, type PatchStats } from "./patch-stats.ts";

// ───────────── Shapes the pages import ─────────────

/**
 * A provider's patch record and where it stands, carried alongside the
 * catalogue entry so an expanded card and a `/p/<provider>` page can show the
 * same numbers the wall of shame ranks on.
 */
export interface ProviderStats {
  readonly fixes: number;
  readonly files: number;
  readonly operations: number;
  /** Fixes per 100 SDK operations; `null` when there are no operations. */
  readonly per100: number | null;
  /** Imported by Alchemy on `main`. */
  readonly used: boolean;
  /** Place on the wall of shame, worst first; `null` when never patched. */
  readonly rank: number | null;
  /** How many providers are ranked, so `rank` reads as "N of <ranked>". */
  readonly ranked: number;
  /** Never patched and Alchemy runs on it — the honour roll. */
  readonly honour: boolean;
}

export interface CatalogPackage {
  readonly name: string;
  readonly dir: string;
  readonly short: string;
  readonly version: string;
  /** Lower-cased haystack for the catalogue filter. */
  readonly search: string;
  readonly hasIcon: boolean;
  readonly stats: ProviderStats;
  /**
   * Social card for this provider. `scripts/og.ts` renders one per provider
   * into `public/og/` as part of the build; without a browser to render them
   * that step is skipped, and the generic card stands in.
   */
  readonly card: string;
}

export interface CatalogGroup {
  readonly title: string;
  readonly packages: ReadonlyArray<CatalogPackage>;
}

/** One line in the "how much patching it takes" list on the homepage. */
export interface Fact {
  readonly n: string;
  readonly line: string;
  /** Optional trailing link. */
  readonly link?: { readonly href: string; readonly label: string };
}

/** The four numbers on the "import one operation" card. */
export interface BenchHeadline {
  readonly s3Gzip: string;
  readonly cfGzip: string;
  readonly cfP50: string;
  readonly awsP50: string;
}

export interface HomeData {
  /** Packages that cover a provider's API; excludes the shared `core` runtime. */
  readonly providerCount: number;
  readonly groups: ReadonlyArray<CatalogGroup>;
  readonly facts: ReadonlyArray<Fact>;
  readonly bench: BenchHeadline;
}

/** A package with operations, as ranked on the wall of shame. */
export interface RankedPackage extends PatchStats {
  readonly name: string;
  readonly short: string;
  readonly hasIcon: boolean;
  /** Imported by Alchemy on `main`. */
  readonly used: boolean;
}

export interface ShameData {
  readonly alchemy: AlchemyUsage;
  readonly totals: {
    readonly fixes: number;
    readonly files: number;
    readonly patched: number;
    readonly clean: number;
  };
  /** Patched packages, worst first. */
  readonly offenders: ReadonlyArray<RankedPackage>;
  /** Zero patches and used in Alchemy, most operations first. */
  readonly honour: ReadonlyArray<RankedPackage>;
  /** Zero patches, no consumer yet. */
  readonly unproven: ReadonlyArray<RankedPackage>;
  /** Social card carrying the current standings; see `cardOf`. */
  readonly card: string;
}

export interface BenchData {
  readonly runtime: RuntimeBench | null;
  readonly bundle: BundleBench | null;
}

export interface SiteData {
  readonly generatedAt: string;
  readonly home: HomeData;
  readonly shame: ShameData;
  readonly bench: BenchData;
  /** `<svg>` sprite with one `<symbol id="i-<dir>">` per brand mark. */
  readonly sprite: string;
}

// ───────────── Formatting shared with the pages ─────────────

const fmt = new Intl.NumberFormat("en-US");
const fmt1 = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const kb = (bytes: number) => `${fmt1.format(bytes / 1024)} KB`;
const ns = (n: number) =>
  n >= 1e6
    ? `${fmt1.format(n / 1e6)} ms`
    : n >= 1e3
      ? `${fmt.format(Math.round(n / 1e3))} µs`
      : `${fmt.format(Math.round(n))} ns`;

// ───────────── Brand marks ─────────────

export interface BrandIcon {
  readonly viewBox: string;
  /** Trusted SVG markup from `data/brand-icons.json`; fills use currentColor. */
  readonly inner: string;
}

const escapeAttr = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

/** Brand marks keyed by `packages/<dir>`; also read by `scripts/og.ts`. */
export const readBrandIcons = (websiteRoot: string): Promise<Record<string, BrandIcon>> =>
  readIcons(join(websiteRoot, "build", "data", "brand-icons.json"));

const readIcons = async (file: string): Promise<Record<string, BrandIcon>> => {
  const icons: Record<string, BrandIcon> = {};
  for (const [dir, icon] of Object.entries(
    JSON.parse(await readFile(file, "utf8")) as Record<string, BrandIcon | string>,
  )) {
    if (typeof icon === "object" && icon !== null) icons[dir] = icon;
  }
  return icons;
};

const spriteOf = (icons: Record<string, BrandIcon>): string =>
  `<svg xmlns="http://www.w3.org/2000/svg">` +
  Object.entries(icons)
    .map(
      ([dir, icon]) =>
        `<symbol id="i-${escapeAttr(dir)}" viewBox="${escapeAttr(icon.viewBox)}">${icon.inner}</symbol>`,
    )
    .join("") +
  `</svg>`;

// ───────────── Derivations ─────────────

/**
 * Three plain statements for the problem section, computed from the patch
 * files. Rates come from the providers Alchemy uses, so they reflect real use.
 */
const factsOf = (ranked: ReadonlyArray<RankedPackage>): Fact[] => {
  const used = ranked.filter((s) => s.used);
  const usedPatched = used.filter((s) => s.fixes > 0).length;
  const fixes = ranked.reduce((n, s) => n + s.fixes, 0);
  const patchedAll = ranked.filter((s) => s.fixes > 0).length;
  const byRate = [...used].sort((a, b) => (b.per100 ?? 0) - (a.per100 ?? 0));
  const mid = byRate[Math.floor(byRate.length / 2)];
  const opsPerFix = mid && mid.fixes > 0 ? Math.round(mid.operations / mid.fixes) : 0;
  // "all N" only while every provider Alchemy uses has needed a patch.
  const alchemyShare =
    usedPatched === used.length ? `all ${used.length}` : `${usedPatched} of the ${used.length}`;
  return [
    { n: fmt.format(fixes), line: "spec fixes, and counting" },
    {
      n: `${patchedAll} of ${ranked.length}`,
      line: `providers have needed at least one — including ${alchemyShare} that Alchemy runs on`,
    },
    {
      n: `1 in ${opsPerFix}`,
      line: "operations needed a fix on the median provider Alchemy runs on",
      link: { href: "/shame", label: "The full tally →" },
    },
  ];
};

const headlineOf = (runtime: RuntimeBench | null, bundle: BundleBench | null): BenchHeadline => {
  const row = (fixture: string) =>
    bundle?.rows.find((r) => r.fixture === fixture && r.variant === "bun");
  const fastestCall = (provider: string) =>
    runtime?.results
      .filter((r) => r.provider === provider && r.stage === "call")
      .sort((a, b) => a.p50 - b.p50)[0];
  const s3 = row("aws-s3-deep");
  const cf = row("cf-workers-deep");
  const cfCall = fastestCall("cloudflare");
  const awsCall =
    runtime?.results.find((r) => r.name === "aws/sts/GetCallerIdentity/call") ?? fastestCall("aws");
  return {
    s3Gzip: s3 ? kb(s3.gzipBytes) : "—",
    cfGzip: cf ? kb(cf.gzipBytes) : "—",
    cfP50: cfCall ? ns(cfCall.p50) : "—",
    awsP50: awsCall ? ns(awsCall.p50) : "—",
  };
};

const shameOf = (
  websiteRoot: string,
  ranked: ReadonlyArray<RankedPackage>,
  alchemy: AlchemyUsage,
): ShameData => {
  const offenders = ranked
    .filter((s) => s.fixes > 0)
    .sort((a, b) => (b.per100 ?? 0) - (a.per100 ?? 0) || b.fixes - a.fixes);
  const zeroPatch = ranked.filter((s) => s.fixes === 0).sort((a, b) => b.operations - a.operations);
  return {
    alchemy,
    totals: {
      fixes: ranked.reduce((n, s) => n + s.fixes, 0),
      files: ranked.reduce((n, s) => n + s.files, 0),
      patched: offenders.length,
      clean: zeroPatch.filter((s) => s.used).length,
    },
    offenders,
    honour: zeroPatch.filter((s) => s.used),
    unproven: zeroPatch.filter((s) => !s.used),
    card: cardOf(websiteRoot, "shame"),
  };
};

/**
 * Where a rendered social card lives. `scripts/og.ts` writes one PNG per
 * provider plus the wall of shame's into `public/og/`; that directory is build
 * output, so fall back to the generic card for any card not yet rendered.
 */
const cardOf = (websiteRoot: string, name: string): string =>
  existsSync(join(websiteRoot, "public", "og", `${name}.png`)) ? `/og/${name}.png` : "/og.png";

// ───────────── Entry point ─────────────

const collect = async (websiteRoot: string): Promise<SiteData> => {
  const repoRoot = join(websiteRoot, "..");
  const packagesDir = join(repoRoot, "packages");
  const dataDir = join(websiteRoot, "build", "data");

  const [packages, alchemy, icons, runtime, bundle] = await Promise.all([
    readPackages(packagesDir),
    readAlchemyUsage(join(dataDir, "alchemy-providers.json")),
    readBrandIcons(websiteRoot),
    readRuntimeBench(repoRoot),
    readBundleBench(repoRoot),
  ]);
  const used = new Set(alchemy.used);

  // Nothing is on the honour roll yet — every provider Alchemy runs on has
  // needed at least one patch — so that treatment has no live example.
  // `DISTILLED_HONOUR=<dir>` pretends one provider qualifies, consistently
  // everywhere the numbers are read. For looking at it locally, never CI.
  const pretend = process.env.DISTILLED_HONOUR;

  const stats = await Promise.all(
    packages.map(async (pkg) => {
      const patch = await readPatchStats(packagesDir, pkg.dir);
      return {
        ...patch,
        ...(pkg.dir === pretend
          ? {
              files: 0,
              fixes: 0,
              per100: patch.operations > 0 ? 0 : null,
              ops: {},
            }
          : {}),
        name: pkg.name,
        short: pkg.short,
        hasIcon: pkg.dir in icons,
        used: used.has(pkg.dir) || pkg.dir === pretend,
      };
    }),
  );
  // A provider package exposes operations; `core` is the shared runtime and is
  // neither ranked on the wall of shame nor listed in the catalogue.
  const ranked = stats.filter((s) => s.operations > 0);
  const providerDirs = new Set(ranked.map((s) => s.dir));
  const providers = packages.filter((pkg) => providerDirs.has(pkg.dir));

  const shame = shameOf(websiteRoot, ranked, alchemy);
  const byDir = new Map(ranked.map((s) => [s.dir, s]));
  const rankOf = new Map(shame.offenders.map((s, i) => [s.dir, i + 1]));
  const statsOf = (dir: string): ProviderStats => {
    const s = byDir.get(dir)!;
    return {
      fixes: s.fixes,
      files: s.files,
      operations: s.operations,
      per100: s.per100,
      used: s.used,
      rank: rankOf.get(dir) ?? null,
      ranked: shame.offenders.length,
      honour: s.fixes === 0 && s.used,
    };
  };

  const groups: CatalogGroup[] = groupPackages(providers).map((group) => ({
    title: group.title,
    packages: group.packages.map((pkg) => ({
      name: pkg.name,
      dir: pkg.dir,
      short: pkg.short,
      version: pkg.version,
      search: [pkg.name, pkg.dir, SEARCH_HINTS[pkg.dir] ?? ""].join(" ").toLowerCase(),
      hasIcon: pkg.dir in icons,
      stats: statsOf(pkg.dir),
      card: cardOf(websiteRoot, pkg.dir),
    })),
  }));

  return {
    generatedAt: new Date().toISOString(),
    home: {
      providerCount: providers.length,
      groups,
      facts: factsOf(ranked),
      bench: headlineOf(runtime, bundle),
    },
    shame,
    bench: { runtime, bundle },
    sprite: spriteOf(icons),
  };
};

/**
 * Collected once per build and shared: `vite.config.ts` needs the provider
 * list to enumerate prerender routes, `plugin.ts` serves the `site:*` modules
 * and `scripts/og.ts` renders the cards, and walking every generated service
 * to count operations is far too slow to repeat.
 */
const cache = new Map<string, Promise<SiteData>>();

export const collectSiteData = (websiteRoot: string): Promise<SiteData> => {
  let pending = cache.get(websiteRoot);
  if (!pending) {
    pending = collect(websiteRoot);
    cache.set(websiteRoot, pending);
  }
  return pending;
};

export const invalidateSiteData = () => cache.clear();

/** `packages/<dir>` of every provider in the catalogue, in catalogue order. */
export const providerDirs = async (websiteRoot: string): Promise<ReadonlyArray<string>> =>
  (await collectSiteData(websiteRoot)).home.groups.flatMap((group) =>
    group.packages.map((pkg) => pkg.dir),
  );
