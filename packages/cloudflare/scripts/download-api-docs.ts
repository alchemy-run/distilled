#!/usr/bin/env bun
/**
 * Download every Cloudflare API doc page as Markdown.
 *
 * Walks the full sidebar of https://developers.cloudflare.com/api/ (the entire
 * navigation tree — including deeply nested resources/subresources/methods — is
 * server-rendered into that single page), records every page URL it links to,
 * then for each page fetches its Markdown twin and saves it under ./specs.
 *
 * The Markdown URL for a page is the page URL with `/index.md` appended, e.g.
 *   page: https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/list
 *   md:   https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/list/index.md
 *
 * Files mirror the URL path, so the example above lands at:
 *   specs/api/resources/ai/subresources/finetunes/methods/list/index.md
 *
 * The Markdown endpoint truncates the largest pages mid-stream (the Access
 * application schemas, for one): the response ends early, with `<details>`
 * elements left unclosed. The page's HTML is served complete, so such a page
 * falls back to downloading the HTML and rendering it as the same Markdown
 * (see page-html-to-markdown.ts).
 *
 * A failed download logs a warning and the run continues, leaving any
 * previously downloaded copy of that page in place — a page that 404s upstream
 * is reported, never silently dropped. A manifest of every page URL → markdown
 * URL → local file is written to specs/_manifest.json, together with the pages
 * that fell back to HTML, the ones that are missing upstream, and the local
 * files the sidebar no longer lists.
 *
 * Usage:
 *   bun scripts/download-api-docs.ts
 *   bun scripts/download-api-docs.ts --concurrency 16
 *   bun scripts/download-api-docs.ts --limit 20        # smoke test
 *   bun scripts/download-api-docs.ts --out ./specs --force
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Argument, Command, Flag } from "effect/unstable/cli";
import { pageHtmlToMarkdown } from "./page-html-to-markdown.ts";

const ORIGIN = "https://developers.cloudflare.com";

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
        headers: { "user-agent": "cf-api-docs-downloader" },
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
// Sidebar extraction
// ============================================================================

/**
 * Pull every API resource doc page path out of the rendered sidebar HTML.
 *
 * The sidebar lists pages as `href="/api/..."`. We keep only resource pages
 * (`/api/resources/...`) — the actual API surface — and skip the language /
 * SDK landing tabs (go, node, python, terraform, overview, etc.). We drop file
 * extensions and Astro assets, normalize away trailing slashes, and dedupe. The
 * result is the full resource tree, from top-level resources down to the most
 * deeply nested method pages.
 */
const extractPagePaths = (html: string): string[] => {
  const seen = new Set<string>();
  const re = /href="(\/api\/resources\/[^"#?]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    let path = match[1];
    // Skip Astro build assets (fonts, css, js chunks).
    if (path.includes("/_astro/")) continue;
    // Skip anything with a file extension on its last segment
    // (e.g. .md, .xml, .svg, .css) — those aren't sidebar pages.
    const lastSegment = path.split("/").pop() ?? "";
    if (lastSegment.includes(".")) continue;
    // Normalize: drop a single trailing slash (but keep the root "/api").
    if (path.length > "/api".length && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    seen.add(path);
  }
  return Array.from(seen).sort();
};

interface PageEntry {
  readonly pagePath: string; // e.g. /api/resources/ai/methods/list
  readonly pageUrl: string; // full page URL
  readonly markdownUrl: string; // page URL + /index.md
  readonly localPath: string; // absolute path of the saved .md file
}

// ============================================================================
// Download
// ============================================================================

/**
 * Every property carries a deep-link whose href repeats the property's full
 * path through the schema; on a large page those hrefs are most of the bytes
 * and none of the API. The marker itself stays — it is what delimits one
 * property from the next.
 */
const compactDeepLinks = (markdown: string): string =>
  markdown
    .replace(
      /\[Link to this property\]\(<?#[^\n]*?>?\)/g,
      "[Link to this property](#)",
    )
    .replace(
      /<a\s+href="#[^"]*"([^>]*)>Link to this property<\/a>/g,
      '<a href="#"$1>Link to this property</a>',
    );

/**
 * A truncated response stops mid-page, leaving `<details>` elements unclosed.
 * Both counts match on every complete page.
 */
const isTruncatedMarkdown = (markdown: string): boolean => {
  const opened = markdown.match(/<details\b/g)?.length ?? 0;
  const closed = markdown.match(/<\/details>/g)?.length ?? 0;
  return opened !== closed;
};

const describe = (err: FetchError): string =>
  err.status !== undefined
    ? `HTTP ${err.status}`
    : `${err.cause ?? "network error"}`;

type Outcome = "downloaded" | "fallback" | "skipped" | "missing" | "failed";

/** Render the page's HTML as markdown, for a markdown twin that came up short. */
const fromPageHtml = (entry: PageEntry, reason: string) =>
  fetchText(entry.pageUrl).pipe(
    Effect.map(pageHtmlToMarkdown),
    Effect.tap((markdown) =>
      markdown
        ? Console.log(`   ↩︎  ${entry.pagePath}: ${reason}; used the page HTML`)
        : Console.warn(
            `⚠️  ${entry.pageUrl} has no method pane (${reason}) — keeping any existing copy`,
          ),
    ),
    Effect.catch((err) =>
      Console.warn(
        `⚠️  ${entry.pageUrl} (${reason}) also failed as HTML (${describe(err)})`,
      ).pipe(Effect.as(undefined)),
    ),
  );

const downloadPage = (entry: PageEntry, force: boolean) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    if (!force && (yield* fs.exists(entry.localPath))) {
      return "skipped" as Outcome; // already downloaded
    }

    const attempt = yield* fetchText(entry.markdownUrl).pipe(
      Effect.map((text) => ({ ok: true as const, text })),
      Effect.catch((error) => Effect.succeed({ ok: false as const, error })),
    );

    let markdown: string;
    let outcome: Outcome;

    if (!attempt.ok) {
      // A 404 on the markdown twin means the page itself is gone rather than
      // the markdown pass having failed; the HTML request below tells which.
      if (attempt.error.status !== 404) {
        yield* Console.warn(
          `⚠️  ${entry.markdownUrl} (${describe(attempt.error)})`,
        );
      }
      const rendered = yield* fromPageHtml(entry, describe(attempt.error));
      if (rendered === undefined) {
        return (attempt.error.status === 404 ? "missing" : "failed") as Outcome;
      }
      markdown = rendered;
      outcome = "fallback";
    } else if (isTruncatedMarkdown(attempt.text)) {
      const rendered = yield* fromPageHtml(entry, "markdown truncated");
      if (rendered === undefined) {
        yield* Console.warn(
          `⚠️  ${entry.markdownUrl} is truncated — saving as served`,
        );
      }
      markdown = rendered ?? attempt.text;
      outcome = rendered ? "fallback" : "downloaded";
    } else {
      markdown = attempt.text;
      outcome = "downloaded";
    }

    yield* fs.makeDirectory(path.dirname(entry.localPath), { recursive: true });
    yield* fs.writeFileString(entry.localPath, compactDeepLinks(markdown));
    return outcome;
  });

// ============================================================================
// CLI command
// ============================================================================

const downloadApiDocs = Command.make(
  "download-api-docs",
  {
    indexUrl: Argument.String("index-url").pipe(
      Argument.withDefault(`${ORIGIN}/api/`),
      Argument.withDescription(
        "The API docs page whose sidebar to crawl (default: the Cloudflare API index)",
      ),
    ),
    out: Flag.String("out").pipe(
      Flag.withDefault("specs"),
      Flag.withDescription(
        "Output directory for downloaded markdown (relative to the cloudflare folder)",
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

      // The cloudflare/ folder is the parent of this scripts/ dir.
      const root = path.resolve(import.meta.dir, "..");
      const outDir = path.resolve(root, config.out);

      yield* Console.log(`🌩️  Cloudflare API docs downloader`);
      yield* Console.log(`   Sidebar source: ${config.indexUrl}`);
      yield* Console.log(`   Output:         ${outDir}`);

      // 1. Fetch the index page and extract every sidebar page URL.
      yield* Console.log(`\n📥 Fetching sidebar from ${config.indexUrl} ...`);
      const html = yield* fetchText(config.indexUrl);
      const pagePaths = extractPagePaths(html);
      yield* Console.log(`   Found ${pagePaths.length} pages in the sidebar.`);

      // 2. Build the manifest (the URL each page goes to + its markdown twin).
      let entries: PageEntry[] = pagePaths.map((pagePath) => {
        const pageUrl = `${ORIGIN}${pagePath}`;
        const markdownUrl = `${pageUrl}/index.md`;
        const localPath = path.join(
          outDir,
          ...pagePath.replace(/^\//, "").split("/"),
          "index.md",
        );
        return { pagePath, pageUrl, markdownUrl, localPath };
      });

      if (config.limit > 0) {
        entries = entries.slice(0, config.limit);
        yield* Console.log(
          `   --limit set: only downloading ${entries.length} pages.`,
        );
      }

      yield* fs.makeDirectory(outDir, { recursive: true });

      // 3. Download every markdown page, warning + continuing on failure.
      yield* Console.log(
        `\n⬇️  Downloading ${entries.length} markdown pages (concurrency ${config.concurrency}) ...\n`,
      );

      const results = yield* Effect.forEach(
        entries,
        (entry) => downloadPage(entry, config.force),
        { concurrency: config.concurrency },
      );

      const count = (outcome: Outcome) =>
        results.filter((result) => result === outcome).length;
      const pagesWith = (outcome: Outcome) =>
        entries.filter((_, i) => results[i] === outcome).map((e) => e.pageUrl);

      // 4. Pages that exist locally but no longer hang off the sidebar. They
      //    are left on disk: a resource dropped from the navigation is not
      //    evidence that its API is gone.
      const wanted = new Set(entries.map((e) => e.localPath));
      const onDisk = yield* fs
        .readDirectory(outDir, { recursive: true })
        .pipe(Effect.catch(() => Effect.succeed([] as string[])));
      const orphans =
        config.limit > 0
          ? []
          : onDisk
              .filter((name) => name.endsWith("index.md"))
              .map((name) => path.join(outDir, name))
              .filter((file) => !wanted.has(file))
              .sort();

      yield* fs.writeFileString(
        path.join(outDir, "_manifest.json"),
        `${JSON.stringify(
          {
            source: config.indexUrl,
            count: entries.length,
            pages: entries.map((e) => ({
              page: e.pageUrl,
              markdown: e.markdownUrl,
            })),
            // Served truncated as markdown; rendered from the page HTML.
            htmlFallback: pagesWith("fallback"),
            // 404 upstream; any previously downloaded copy was kept.
            missing: pagesWith("missing"),
            // Present locally, absent from the sidebar; kept as well.
            unlisted: orphans.map((file) => path.relative(outDir, file)),
          },
          null,
          2,
        )}\n`,
      );
      yield* Console.log(
        `   Wrote manifest: ${path.join(outDir, "_manifest.json")}`,
      );

      const summary = [
        `${count("downloaded")} downloaded`,
        count("fallback") > 0
          ? `${count("fallback")} via HTML fallback`
          : undefined,
        count("skipped") > 0
          ? `${count("skipped")} already present`
          : undefined,
        count("missing") > 0
          ? `⚠️  ${count("missing")} missing upstream`
          : undefined,
        count("failed") > 0 ? `⚠️  ${count("failed")} failed` : undefined,
        orphans.length > 0
          ? `${orphans.length} local pages no longer listed`
          : undefined,
      ].filter(Boolean);

      yield* Console.log(`\n✅ Done. ${summary.join(", ")}.`);
      for (const page of pagesWith("missing")) {
        yield* Console.log(`   missing upstream: ${page}`);
      }
      yield* Console.log(`   Output saved under: ${outDir}`);
    }),
).pipe(
  Command.withDescription(
    "Crawl the Cloudflare API sidebar and download every page's markdown into ./specs",
  ),
);

// ============================================================================
// Entry point
// ============================================================================

const program = Command.run(downloadApiDocs, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));
