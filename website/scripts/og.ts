#!/usr/bin/env bun
/**
 * Renders the social cards with a local headless Chromium.
 *
 * - `bun scripts/og.ts` renders `assets/og.html` to `public/og.png`, the
 *   generic card. That file is committed, so the site build never needs a
 *   browser to have a card for `/`, `/bench` and `/shame`.
 * - `bun scripts/og.ts --all` additionally renders `assets/og-provider.html`
 *   once per provider to `public/og/<provider>.png`, and `assets/og-shame.html`
 *   to `public/og/shame.png`. Those carry patch counts and standings, which
 *   change with every patch, so they are build output rather than committed
 *   files — the site build runs this step. Without a browser it warns and
 *   skips, and `build/site-data.ts` falls back to the generic card.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { availableParallelism, homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectSiteData,
  readBrandIcons,
  type BrandIcon,
  type CatalogPackage,
  type ShameData,
} from "../build/site-data.ts";
import { monogram } from "../src/lib/monogram.ts";

const websiteRoot = fileURLToPath(new URL("..", import.meta.url));
const assets = join(websiteRoot, "assets");
const publicDir = join(websiteRoot, "public");
const cardsDir = join(publicDir, "og");
const scratch = join(websiteRoot, "node_modules", ".cache", "distilled-og");

/**
 * The cards are laid out at 1200×630 — the aspect ratio every social scraper
 * expects — and rasterized at twice that, so they stay sharp where cards are
 * shown on high-density displays or upscaled (Slack, iMessage, X). The
 * `og:image:width` / `og:image:height` tags in `src/components/layout/Seo.tsx`
 * must state the rendered size, not the layout size.
 */
const SCALE = 2;
const WIDTH = 1200;
const HEIGHT = 630;

/** Width left for the provider name beside its mark, at the card's margins. */
const NAME_SLOT = 878;

const findChromium = async (): Promise<string> => {
  if (process.env.CHROMIUM) return process.env.CHROMIUM;
  const cache = join(homedir(), ".cache", "ms-playwright");
  if (existsSync(cache)) {
    for (const dir of (await readdir(cache)).sort().reverse()) {
      for (const candidate of [
        join(cache, dir, "chrome-headless-shell-linux64", "chrome-headless-shell"),
        join(cache, dir, "chrome-linux64", "chrome"),
        join(cache, dir, "chrome-linux", "chrome"),
      ]) {
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  for (const bin of ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable"]) {
    const found = Bun.which(bin);
    if (found) return found;
  }
  throw new Error("no Chromium found; set CHROMIUM=/path/to/chrome");
};

const shoot = async (chromium: string, src: string, out: string) => {
  const proc = Bun.spawn(
    [
      chromium,
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--hide-scrollbars",
      `--force-device-scale-factor=${SCALE}`,
      // Subpixel antialiasing would fringe the text with colour, which
      // survives every rescale a scraper applies. Grayscale antialiasing and
      // unhinted outlines also keep the render identical across machines.
      "--disable-lcd-text",
      "--font-render-hinting=none",
      `--window-size=${WIDTH},${HEIGHT}`,
      `--screenshot=${out}`,
      "--virtual-time-budget=2000",
      `file://${src}`,
    ],
    { stdout: "ignore", stderr: "pipe" },
  );
  if ((await proc.exited) !== 0) {
    throw new Error(await new Response(proc.stderr).text());
  }
  // Chromium reports success even when the window it screenshots is not the
  // size asked for, so read the dimensions back out of the PNG header (IHDR
  // width and height are big-endian uint32s at bytes 16 and 20).
  const png = await Bun.file(out).bytes();
  const header = new DataView(png.buffer, png.byteOffset);
  const rendered = [header.getUint32(16), header.getUint32(20)] as const;
  const expected = [WIDTH * SCALE, HEIGHT * SCALE] as const;
  if (rendered[0] !== expected[0] || rendered[1] !== expected[1]) {
    throw new Error(`${out}: rendered ${rendered.join("×")}, expected ${expected.join("×")}`);
  }
  return { size: png.length, dimensions: rendered.join("×") };
};

// ───────────── Provider cards ─────────────

const fmt = new Intl.NumberFormat("en-US");
const fmt1 = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** How a provider's patch record reads on its card. */
const standing = (stats: CatalogPackage["stats"]) => {
  const ops = `${fmt.format(stats.operations)} OPERATIONS`;
  if (stats.honour) {
    return {
      tone: "honour",
      badge: "HONOUR ROLL · ZERO PATCHES",
      tags: `${ops} · WORKS AS PUBLISHED · USED IN ALCHEMY`,
    };
  }
  if (stats.rank !== null) {
    return {
      tone: "ranked",
      badge: `RANK ${String(stats.rank).padStart(2, "0")} OF ${stats.ranked} · WALL OF SHAME`,
      tags: `${ops} · ${fmt.format(stats.fixes)} PATCHES${stats.used ? " · USED IN ALCHEMY" : ""}`,
    };
  }
  return {
    tone: "clean",
    badge: "ZERO PATCHES",
    tags: `${ops} · NO PATCHES YET · NOT USED IN ALCHEMY`,
  };
};

const markup = (icon: BrandIcon | undefined, short: string) =>
  icon
    ? `<svg viewBox="${escapeHtml(icon.viewBox)}" fill="currentColor">${icon.inner}</svg>`
    : `<span class="gram">${escapeHtml(monogram(short))}</span>`;

const cardHtml = (template: string, pkg: CatalogPackage, icon: BrandIcon | undefined) => {
  const { tone, badge, tags } = standing(pkg.stats);
  const slots: Record<string, string> = {
    css: `file://${join(assets, "og.css")}`,
    tone,
    mark: markup(icon, pkg.short),
    name: escapeHtml(pkg.short),
    // Long names would otherwise run past the card's right margin.
    nameSize: String(Math.min(92, Math.floor(NAME_SLOT / (pkg.short.length * 0.52)))),
    install: escapeHtml(`pnpm add ${pkg.name} effect`),
    badge: escapeHtml(badge),
    tags: escapeHtml(tags),
  };
  return template.replaceAll(/\{\{(\w+)\}\}/g, (whole, key: string) => slots[key] ?? whole);
};

/** Run `task` over `items`, at most `limit` browsers at a time. */
const pool = async <T>(
  items: ReadonlyArray<T>,
  limit: number,
  task: (item: T) => Promise<void>,
) => {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) await task(items[next++]!);
    }),
  );
};

const renderProviderCards = async (chromium: string) => {
  const [data, icons, template] = await Promise.all([
    collectSiteData(websiteRoot),
    readBrandIcons(websiteRoot),
    readFile(join(assets, "og-provider.html"), "utf8"),
  ]);
  const providers = data.home.groups.flatMap((group) => group.packages);

  // Rebuilt from scratch so a renamed or dropped provider leaves no card
  // behind for the site to advertise.
  await rm(cardsDir, { recursive: true, force: true });
  await rm(scratch, { recursive: true, force: true });
  await mkdir(cardsDir, { recursive: true });
  await mkdir(scratch, { recursive: true });

  let bytes = 0;
  try {
    await pool(providers, Math.min(8, availableParallelism()), async (pkg) => {
      const src = join(scratch, `${pkg.dir}.html`);
      await writeFile(src, cardHtml(template, pkg, icons[pkg.dir]));
      const { size } = await shoot(chromium, src, join(cardsDir, `${pkg.dir}.png`));
      bytes += size;
    });
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
  console.log(
    `wrote ${providers.length} provider cards to ${cardsDir} (${Math.round(bytes / 1024)} KB)`,
  );
};

// ───────────── Wall of Shame card ─────────────

/** Offenders the card has room for, above its totals line. */
const BOARD_ROWS = 3;

const boardHtml = (offenders: ShameData["offenders"]) =>
  offenders
    .slice(0, BOARD_ROWS)
    .map(
      (pkg, i) =>
        `<li><span class="rank">${String(i + 1).padStart(2, "0")}</span>` +
        `<span class="who">${escapeHtml(pkg.short)}</span>` +
        `<span class="per"><b>${fmt1.format(pkg.per100 ?? 0)}</b> / 100 ops</span></li>`,
    )
    .join("");

const renderShameCard = async (chromium: string) => {
  const [data, template] = await Promise.all([
    collectSiteData(websiteRoot),
    readFile(join(assets, "og-shame.html"), "utf8"),
  ]);
  const { totals, offenders, honour, unproven } = data.shame;
  const providers = offenders.length + honour.length + unproven.length;
  const slots: Record<string, string> = {
    css: `file://${join(assets, "og.css")}`,
    board: boardHtml(offenders),
    tags: escapeHtml(
      `${fmt.format(totals.fixes)} PATCHES ACROSS ${fmt.format(totals.files)} FILES · ` +
        `${totals.patched} OF ${providers} PROVIDERS PATCHED`,
    ),
  };
  await mkdir(cardsDir, { recursive: true });
  await mkdir(scratch, { recursive: true });
  const src = join(scratch, "shame.html");
  try {
    await writeFile(
      src,
      template.replaceAll(/\{\{(\w+)\}\}/g, (whole, key: string) => slots[key] ?? whole),
    );
    const out = join(cardsDir, "shame.png");
    const { size } = await shoot(chromium, src, out);
    console.log(`wrote ${out} (${Math.round(size / 1024)} KB)`);
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
};

// ───────────── Entry point ─────────────

const all = process.argv.includes("--all");

let chromium: string;
try {
  chromium = await findChromium();
} catch (error) {
  // A card for every provider is a build step, and a machine without a
  // browser still has to be able to build the site: the committed generic
  // card stands in (see `cardOf` in build/site-data.ts).
  if (all) {
    console.warn(`skipping provider cards: ${(error as Error).message}`);
    process.exit(0);
  }
  throw error;
}

if (all) {
  await renderProviderCards(chromium);
  await renderShameCard(chromium);
} else {
  const out = join(publicDir, "og.png");
  const { size, dimensions } = await shoot(chromium, join(assets, "og.html"), out);
  console.log(`wrote ${out} (${dimensions}, ${size} bytes)`);
}
