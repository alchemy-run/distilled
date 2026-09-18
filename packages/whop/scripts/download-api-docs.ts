#!/usr/bin/env bun
/**
 * Download every Whop docs page as Markdown.
 *
 * docs.whop.com serves a Markdown twin of every page — the "Copy as
 * Markdown" button on each page just appends `.md` to its URL:
 *   page: https://docs.whop.com/developer/api/versioning
 *   md:   https://docs.whop.com/developer/api/versioning.md
 *
 * Files mirror the URL path, so the example above lands at
 * `specs/docs/developer/api/versioning.md`.
 *
 * The page list is the UNION of two indexes, because neither is complete:
 *   • /llms.txt   — the curated, product-area-grouped index (~912 pages)
 *   • /sitemap.xml — the crawler index (~879 pages)
 * Each carries pages the other omits (llms.txt misses several webhook-event
 * pages; the sitemap misses a handful of api-reference operations), so
 * taking one alone silently loses documentation.
 *
 * EMBEDDED OPENAPI IS STRIPPED. Every `/api-reference/**` page inlines the
 * whole of `/openapi/api-v1-native.json` or `/openapi/api-v1-stable.json`
 * into a ```yaml fence — 58 KB of spec per page, ~37 MB across the
 * reference, all of it a duplicate of what `scripts/download-spec.ts`
 * already commits under `specs/`. Each fence is replaced with a one-line
 * pointer at the spec file it came from; the page's own prose (summary,
 * required permissions, notes) is kept verbatim. Guide pages, which carry no
 * such fence, are saved byte-for-byte.
 *
 * These pages are DOCUMENTATION, not the codegen source — the SDK is
 * generated from the OpenAPI documents (see scripts/convert.ts). They are
 * committed so the prose that only exists on the docs site (versioning,
 * idempotency, sandbox, webhooks, the OAuth flow) travels with the spec.
 *
 * A failed download logs a warning and the run continues. A manifest of
 * every page URL → markdown URL → local file is written to
 * specs/docs/_manifest.json.
 *
 * Usage:
 *   bun scripts/download-api-docs.ts
 *   bun scripts/download-api-docs.ts --concurrency 16
 *   bun scripts/download-api-docs.ts --limit 20        # smoke test
 *   bun scripts/download-api-docs.ts --out specs/docs --force
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Data, Effect, Schedule } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { PlatformError } from "effect/PlatformError";
import { Command, Flag } from "effect/unstable/cli";

const ORIGIN = "https://docs.whop.com";

// ============================================================================
// Errors
// ============================================================================

class FetchError extends Data.TaggedError("FetchError")<{
  readonly url: string;
  readonly status?: number;
  readonly cause?: unknown;
}> {}

// ============================================================================
// HTTP
// ============================================================================

/** Fetch a URL as text, failing with FetchError on a network error or non-2xx. */
const fetchText = (url: string): Effect.Effect<string, FetchError> =>
  Effect.tryPromise({
    try: async () => {
      const res = await fetch(url, {
        headers: { "user-agent": "distilled.cloud-whop-docs-downloader" },
      });
      if (!res.ok) {
        throw new FetchError({ url, status: res.status });
      }
      return await res.text();
    },
    catch: (cause) =>
      cause instanceof FetchError ? cause : new FetchError({ url, cause }),
  });

// ============================================================================
// Index extraction
// ============================================================================

/**
 * Normalize a docs URL to a page path: drop the origin, the `.md` suffix
 * llms.txt links with, any query/hash, and a trailing slash. Returns
 * undefined for anything not a docs.whop.com page (external links, the
 * dashboard, npm/github references — llms.txt is full of them).
 */
const toPagePath = (raw: string, origin: string): string | undefined => {
  if (!raw.startsWith(`${origin}/`)) return undefined;
  let path = raw.slice(origin.length).replace(/[?#].*$/, "");
  if (path.endsWith(".md")) path = path.slice(0, -3);
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  // The index files themselves, and anything still carrying an extension
  // (sitemap.xml, favicon.svg), are not pages.
  if (path === "" || path === "/") return undefined;
  const lastSegment = path.split("/").pop() ?? "";
  if (lastSegment.includes(".")) return undefined;
  return path;
};

/**
 * Every docs page llms.txt links to (markdown links + bare URLs).
 *
 * llms.txt is prose, so a URL runs up against whatever punctuation ended the
 * sentence or closed the code span it sat in (`…/mcp\``, `…/start.md):`).
 * Trailing punctuation is trimmed before the URL is read — a backtick left
 * on the end is a guaranteed 404.
 */
const extractFromLlmsTxt = (text: string, origin: string): string[] => {
  const out: string[] = [];
  for (const match of text.matchAll(/https?:\/\/[^\s)<>"']+/g)) {
    const path = toPagePath(match[0].replace(/[.,;:`'"*_\]]+$/, ""), origin);
    if (path) out.push(path);
  }
  return out;
};

/** Every docs page the sitemap lists. */
const extractFromSitemap = (xml: string, origin: string): string[] => {
  const out: string[] = [];
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const path = toPagePath(match[1].trim(), origin);
    if (path) out.push(path);
  }
  return out;
};

// ============================================================================
// OpenAPI fence stripping
// ============================================================================

/**
 * Mintlify renders an api-reference page from an OpenAPI operation and, in
 * the Markdown twin, inlines the ENTIRE source document under a fence headed
 * ` ```` yaml /openapi/<file> <method> <path> `. Replace the body with a
 * pointer; keep the heading line's method/path, which is the one piece of
 * information the prose doesn't otherwise carry.
 *
 * The fence uses FOUR backticks (its payload contains three-backtick
 * examples), and is always the last block on the page.
 */
const OPENAPI_FENCE =
  /^````yaml (\/openapi\/(\S+))((?: \S+)*)\n[\s\S]*?^````[ \t]*$/gm;

const stripOpenApiFence = (
  markdown: string,
): { readonly text: string; readonly stripped: boolean } => {
  let stripped = false;
  const text = markdown.replace(
    OPENAPI_FENCE,
    (_all, _ref: string, file: string, route: string) => {
      stripped = true;
      const where = route.trim() ? `\`${route.trim()}\` in ` : "";
      return `<!-- OpenAPI source: ${where}specs/${file} (inlined by docs.whop.com; stripped on download) -->`;
    },
  );
  return { text, stripped };
};

// ============================================================================
// Download
// ============================================================================

interface PageEntry {
  readonly pagePath: string; // e.g. /developer/api/versioning
  readonly pageUrl: string; // full page URL
  readonly markdownUrl: string; // page URL + .md
  readonly localPath: string; // absolute path of the saved .md file
  readonly indexes: readonly string[]; // which index(es) listed it
}

const downloadPage = (
  entry: PageEntry,
  force: boolean,
  // A failed DOWNLOAD is absorbed into "failed" below — one stale llms.txt
  // slug must not end the crawl. A failed WRITE is not: a full disk or an
  // unwritable output directory means every remaining page is lost too.
): Effect.Effect<
  "saved" | "skipped" | "failed",
  PlatformError,
  FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    if (!force && (yield* fs.exists(entry.localPath))) {
      return "skipped" as const; // already downloaded
    }

    const result = yield* fetchText(entry.markdownUrl).pipe(
      // The docs host answers a burst of concurrent requests with the odd
      // 504; a page that 404s is genuinely gone (llms.txt keeps a few stale
      // slugs) and retrying it only slows the run down.
      Effect.retry({
        times: 3,
        while: (err: FetchError) =>
          err.status === undefined || err.status >= 500,
        schedule: Schedule.exponential(500),
      }),
      Effect.map((text) => ({ ok: true as const, text })),
      Effect.catch((err) => {
        const detail =
          err.status !== undefined
            ? `HTTP ${err.status}`
            : `${err.cause ?? "network error"}`;
        return Console.warn(
          `⚠️  Failed to download ${entry.markdownUrl} (${detail}) — skipping`,
        ).pipe(Effect.as({ ok: false as const }));
      }),
    );

    if (!result.ok) return "failed" as const;

    yield* fs.makeDirectory(path.dirname(entry.localPath), { recursive: true });
    yield* fs.writeFileString(
      entry.localPath,
      stripOpenApiFence(result.text).text,
    );
    return "saved" as const;
  });

// ============================================================================
// CLI command
// ============================================================================

const downloadApiDocs = Command.make(
  "download-api-docs",
  {
    origin: Flag.String("origin").pipe(
      Flag.withDefault(ORIGIN),
      Flag.withDescription("Docs host to crawl"),
    ),
    out: Flag.String("out").pipe(
      Flag.withDefault("specs/docs"),
      Flag.withDescription(
        "Output directory for downloaded markdown (relative to the whop package root)",
      ),
    ),
    concurrency: Flag.Int("concurrency").pipe(
      Flag.withDefault(12),
      Flag.withDescription("Number of pages to download in parallel"),
    ),
    limit: Flag.Int("limit").pipe(
      Flag.withDefault(0),
      Flag.withDescription(
        "Only download the first N pages (0 = all). For testing.",
      ),
    ),
    force: Flag.Boolean("force").pipe(
      Flag.withDefault(false),
      Flag.withDescription("Re-download pages even if the file already exists"),
    ),
  },
  (config) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      // The whop/ folder is the parent of this scripts/ dir.
      const root = path.resolve(import.meta.dir, "..");
      const outDir = path.resolve(root, config.out);

      yield* Console.log("🛒 Whop docs downloader");
      yield* Console.log(`   Source: ${config.origin}`);
      yield* Console.log(`   Output: ${outDir}`);

      // 1. Fetch both indexes and union them.
      const llmsUrl = `${config.origin}/llms.txt`;
      const sitemapUrl = `${config.origin}/sitemap.xml`;
      yield* Console.log(`\n📥 Fetching ${llmsUrl} and ${sitemapUrl} ...`);

      const [llmsTxt, sitemapXml] = yield* Effect.all(
        [fetchText(llmsUrl), fetchText(sitemapUrl)],
        { concurrency: 2 },
      );

      const fromLlms = new Set(extractFromLlmsTxt(llmsTxt, config.origin));
      const fromSitemap = new Set(
        extractFromSitemap(sitemapXml, config.origin),
      );
      const pagePaths = [...new Set([...fromLlms, ...fromSitemap])].sort();

      const onlyLlms = [...fromLlms].filter((p) => !fromSitemap.has(p)).length;
      const onlySitemap = [...fromSitemap].filter(
        (p) => !fromLlms.has(p),
      ).length;
      yield* Console.log(
        `   llms.txt ${fromLlms.size}, sitemap ${fromSitemap.size} → ` +
          `${pagePaths.length} unique (${onlyLlms} only in llms.txt, ${onlySitemap} only in the sitemap)`,
      );

      // 2. Build the manifest (the URL each page goes to + its markdown twin).
      let entries: PageEntry[] = pagePaths.map((pagePath) => {
        const pageUrl = `${config.origin}${pagePath}`;
        const indexes = [
          ...(fromLlms.has(pagePath) ? ["llms.txt"] : []),
          ...(fromSitemap.has(pagePath) ? ["sitemap"] : []),
        ];
        return {
          pagePath,
          pageUrl,
          markdownUrl: `${pageUrl}.md`,
          localPath: path.join(
            outDir,
            ...`${pagePath.replace(/^\//, "")}.md`.split("/"),
          ),
          indexes,
        };
      });

      if (config.limit > 0) {
        entries = entries.slice(0, config.limit);
        yield* Console.log(
          `   --limit set: only downloading ${entries.length} pages.`,
        );
      }

      yield* fs.makeDirectory(outDir, { recursive: true });
      yield* fs.writeFileString(
        path.join(outDir, "_manifest.json"),
        JSON.stringify(
          {
            sources: [llmsUrl, sitemapUrl],
            count: entries.length,
            pages: entries.map((e) => ({
              page: e.pageUrl,
              markdown: e.markdownUrl,
              file: path.relative(outDir, e.localPath),
              indexes: e.indexes,
            })),
          },
          null,
          2,
        ) + "\n",
      );
      yield* Console.log(
        `   Wrote manifest: ${path.join(outDir, "_manifest.json")}`,
      );

      // 3. Download every markdown page, warning + continuing on failure.
      yield* Console.log(
        `\n⬇️  Downloading ${entries.length} markdown pages (concurrency ${config.concurrency}) ...\n`,
      );

      const results = yield* Effect.forEach(
        entries,
        (entry) => downloadPage(entry, config.force),
        { concurrency: config.concurrency },
      );

      const saved = results.filter((r) => r === "saved").length;
      const skipped = results.filter((r) => r === "skipped").length;
      const failed = results.filter((r) => r === "failed").length;

      yield* Console.log(
        `\n✅ Done. ${saved} downloaded` +
          (skipped > 0 ? `, ${skipped} already present` : "") +
          (failed > 0 ? `, ⚠️  ${failed} failed (see warnings above)` : "") +
          ".",
      );
      yield* Console.log(`   Output saved under: ${outDir}`);
    }),
).pipe(
  Command.withDescription(
    "Crawl docs.whop.com's llms.txt + sitemap and download every page's markdown into ./specs/docs",
  ),
);

// ============================================================================
// Entry point
// ============================================================================

const program = Command.run(downloadApiDocs, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));
