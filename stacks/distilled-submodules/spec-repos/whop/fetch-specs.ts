#!/usr/bin/env bun
/**
 * Fetches everything `packages/whop` reads out of `specs/` to ../specs/.
 *
 * Whop has no spec repo and no release tag — every artefact is served off the
 * docs host — so this mirror snapshots two things:
 *
 * 1. THE OPENAPI DOCUMENTS. Whop describes ONE HTTP API
 *    (`https://api.whop.com/api/v1`, one bearer key, one error envelope)
 *    through TWO reference surfaces, each with its own OpenAPI 3.1 document:
 *
 *      • VERSIONED — https://docs.whop.com/api-reference/beta/overview
 *        served from `/openapi/api-v1-native.json`
 *      • LEGACY — https://docs.whop.com/developer/api/getting-started
 *        served from `/openapi/api-v1-stable.json`
 *
 *    Neither is a superset of the other, so the generator merges them
 *    (versioned wins every route both describe) and BOTH are mirrored.
 *
 * 2. THE DOCS PAGES AS MARKDOWN. docs.whop.com serves a Markdown twin of
 *    every page — the "Copy as Markdown" button just appends `.md` to the
 *    URL. The prose that exists only there (versioning, idempotency, the
 *    sandbox, webhooks, the OAuth flow) travels with the spec instead of
 *    being a link that rots.
 *
 * The page list is the UNION of two indexes, because neither is complete:
 *   • /llms.txt    — the curated, product-area-grouped index
 *   • /sitemap.xml — the crawler index
 * Each carries pages the other omits (llms.txt misses several webhook-event
 * pages; the sitemap misses a handful of api-reference operations), so taking
 * one alone silently loses documentation.
 *
 * EMBEDDED OPENAPI IS STRIPPED. Every `/api-reference/**` page inlines the
 * whole of `/openapi/api-v1-native.json` or `/openapi/api-v1-stable.json`
 * into a fence — 58 KB of spec per page, ~37 MB across the reference, all of
 * it a duplicate of the documents fetched in step 1. Each fence is replaced
 * with a one-line pointer at the file it came from; the page's own prose is
 * kept verbatim. Guide pages, which carry no such fence, are saved
 * byte-for-byte.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/api-v1-native.json
 *   ../specs/api-v1-stable.json
 *   ../specs/docs/**\/*.md
 *   ../specs/docs/_manifest.json
 */

import { existsSync, mkdirSync } from "fs";
import { mkdir, readdir, rm, writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

const ORIGIN = "https://docs.whop.com";
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const CONCURRENCY = 12;

/**
 * Refuse to prune when more than this fraction of the crawl failed. A docs
 * host having a bad day must not be able to delete the mirrored corpus.
 */
const MAX_FAILURE_RATE_FOR_PRUNE = 0.05;

const DOCUMENTS = [
  {
    surface: "versioned",
    remote: "/openapi/api-v1-native.json",
    file: "api-v1-native.json",
  },
  {
    surface: "legacy",
    remote: "/openapi/api-v1-stable.json",
    file: "api-v1-stable.json",
  },
] as const;

// ============================================================================
// HTTP
// ============================================================================

class FetchError extends Error {
  constructor(
    readonly url: string,
    readonly status?: number,
    readonly reason?: unknown,
  ) {
    super(
      `${url} — ${status !== undefined ? `HTTP ${status}` : `${reason ?? "network error"}`}`,
    );
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch a URL as text. The docs host answers a burst of concurrent requests
 * with the odd 504, so 5xx and network failures are retried; a 404 is
 * genuinely gone (llms.txt keeps a few stale slugs) and retrying it only
 * slows the run down.
 */
async function fetchText(url: string, attempts = 4): Promise<string> {
  let lastError: FetchError | undefined;
  for (let attempt = 0; attempt < attempts; attempt++) {
    let error: FetchError;
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "distilled.cloud-whop-spec-mirror" },
      });
      if (response.ok) return await response.text();
      error = new FetchError(url, response.status);
      if (response.status < 500) throw error;
    } catch (cause) {
      error =
        cause instanceof FetchError
          ? cause
          : new FetchError(url, undefined, cause);
      if (error.status !== undefined && error.status < 500) throw error;
    }
    lastError = error;
    if (attempt < attempts - 1) await sleep(500 * 2 ** attempt);
  }
  throw lastError;
}

// ============================================================================
// 1. OpenAPI documents
// ============================================================================

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * A quick count, so a truncated or gutted upstream response is obvious at the
 * point of download rather than three steps later in the generator.
 */
function census(spec: Record<string, any>) {
  const tags = new Set<string>();
  let operations = 0;
  for (const item of Object.values<any>(spec.paths)) {
    for (const method of HTTP_METHODS) {
      const op = item?.[method];
      if (!op) continue;
      operations++;
      tags.add(op.tags?.[0] ?? "(untagged)");
    }
  }
  return {
    paths: Object.keys(spec.paths).length,
    operations,
    tags: tags.size,
    schemas: Object.keys(spec.components?.schemas ?? {}).length,
    webhooks: Object.keys(spec.webhooks ?? {}).length,
  };
}

async function fetchOpenApiDocuments() {
  /** Surface → the `x-api-version-date` its document declares. */
  const versionDates: Record<string, string> = {};

  for (const doc of DOCUMENTS) {
    const url = `${ORIGIN}${doc.remote}`;
    console.log(`Fetching ${doc.surface} spec from ${url}...`);

    const spec = JSON.parse(await fetchText(url)) as Record<string, any>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid JSON, but it is not an OpenAPI
    // document.
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    // The version pin the generated SDK sends on every request is read off
    // this field — a document without one would ship an SDK pinned to nothing.
    const date = spec.info?.["x-api-version-date"];
    if (typeof date !== "string") {
      throw new Error(
        `${url} has no \`info.x-api-version-date\` — nothing to pin the SDK to`,
      );
    }
    versionDates[doc.surface] = date;

    const outputPath = `${SPECS_DIR}/${doc.file}`;
    // 2-space indent + trailing newline, matching the package's own
    // downloader, so a whitespace-only change upstream produces no diff.
    await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");

    const c = census(spec);
    console.log(
      `  ${outputPath} — OpenAPI ${spec.openapi}, api-version-date ${date}, ` +
        `${c.paths} paths, ${c.operations} operations, ${c.tags} tags, ` +
        `${c.schemas} schemas, ${c.webhooks} webhook events`,
    );
  }

  // The merged SDK sends ONE `Api-Version-Date` header for every call,
  // versioned and legacy alike. Upstream has always stamped both documents
  // with the same date; if that stops being true the merge no longer has one
  // pin to send, and the split has to be modeled rather than assumed. Fail
  // the nightly run so it is caught here and not in a mis-decoded response.
  const distinct = new Set(Object.values(versionDates));
  if (distinct.size > 1) {
    throw new Error(
      `The two surfaces no longer share one \`x-api-version-date\`: ` +
        `${JSON.stringify(versionDates)}. A merged client can send only one pin.`,
    );
  }
  console.log(`  Both surfaces at api-version-date ${[...distinct][0]}`);
}

// ============================================================================
// 2. Docs pages
// ============================================================================

/**
 * Normalize a docs URL to a page path: drop the origin, the `.md` suffix
 * llms.txt links with, any query/hash, and a trailing slash. Returns
 * undefined for anything not a docs page (external links, the dashboard,
 * npm/github references — llms.txt is full of them).
 */
function toPagePath(raw: string): string | undefined {
  if (!raw.startsWith(`${ORIGIN}/`)) return undefined;
  let path = raw.slice(ORIGIN.length).replace(/[?#].*$/, "");
  if (path.endsWith(".md")) path = path.slice(0, -3);
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  // The index files themselves, and anything still carrying an extension
  // (sitemap.xml, favicon.svg), are not pages.
  if (path === "" || path === "/") return undefined;
  const lastSegment = path.split("/").pop() ?? "";
  if (lastSegment.includes(".")) return undefined;
  return path;
}

/**
 * Every docs page llms.txt links to (markdown links + bare URLs).
 *
 * llms.txt is prose, so a URL runs up against whatever punctuation ended the
 * sentence or closed the code span it sat in (`…/mcp\``, `…/start.md):`).
 * Trailing punctuation is trimmed before the URL is read — a backtick left on
 * the end is a guaranteed 404.
 */
function extractFromLlmsTxt(text: string): string[] {
  const out: string[] = [];
  for (const match of text.matchAll(/https?:\/\/[^\s)<>"']+/g)) {
    const path = toPagePath(match[0].replace(/[.,;:`'"*_\]]+$/, ""));
    if (path) out.push(path);
  }
  return out;
}

/** Every docs page the sitemap lists. */
function extractFromSitemap(xml: string): string[] {
  const out: string[] = [];
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const path = toPagePath(match[1].trim());
    if (path) out.push(path);
  }
  return out;
}

/**
 * Mintlify renders an api-reference page from an OpenAPI operation and, in the
 * Markdown twin, inlines the ENTIRE source document under a fence headed
 * ` ```` yaml /openapi/<file> <method> <path> `. Replace the body with a
 * pointer; keep the heading line's method/path, which is the one piece of
 * information the prose doesn't otherwise carry.
 *
 * The fence uses FOUR backticks (its payload contains three-backtick
 * examples), and is always the last block on the page.
 */
const OPENAPI_FENCE =
  /^````yaml (\/openapi\/(\S+))((?: \S+)*)\n[\s\S]*?^````[ \t]*$/gm;

function stripOpenApiFence(markdown: string): string {
  return markdown.replace(
    OPENAPI_FENCE,
    (_all, _ref: string, file: string, route: string) => {
      const where = route.trim() ? `\`${route.trim()}\` in ` : "";
      return `<!-- OpenAPI source: ${where}specs/${file} (inlined by docs.whop.com; stripped on download) -->`;
    },
  );
}

interface PageEntry {
  readonly pagePath: string; // e.g. /developer/api/versioning
  readonly pageUrl: string; // full page URL
  readonly markdownUrl: string; // page URL + .md
  readonly localPath: string; // path of the saved .md file
  readonly indexes: readonly string[]; // which index(es) listed it
}

/** Run `worker` over `items`, at most `limit` at a time, in order. */
async function mapConcurrent<T, R>(
  items: readonly T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = Array.from<R>({ length: items.length });
  let next = 0;
  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (true) {
        const index = next++;
        if (index >= items.length) return;
        results[index] = await worker(items[index]!);
      }
    },
  );
  await Promise.all(runners);
  return results;
}

/**
 * Delete mirrored markdown that upstream no longer lists. `git add -A` in the
 * update workflow turns that into a real deletion, so a page removed from the
 * docs site does not linger here forever.
 */
async function prune(keep: ReadonlySet<string>) {
  const stale: string[] = [];
  const walk = async (dir: string): Promise<void> => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name.endsWith(".md") && !keep.has(full)) {
        stale.push(full);
      }
    }
  };
  await walk(DOCS_DIR);

  for (const file of stale) await rm(file);
  if (stale.length > 0) {
    console.log(`  Pruned ${stale.length} page(s) no longer listed upstream`);
  }
}

async function fetchDocs() {
  const llmsUrl = `${ORIGIN}/llms.txt`;
  const sitemapUrl = `${ORIGIN}/sitemap.xml`;
  console.log(`\nFetching ${llmsUrl} and ${sitemapUrl}...`);

  const [llmsTxt, sitemapXml] = await Promise.all([
    fetchText(llmsUrl),
    fetchText(sitemapUrl),
  ]);

  const fromLlms = new Set(extractFromLlmsTxt(llmsTxt));
  const fromSitemap = new Set(extractFromSitemap(sitemapXml));
  const pagePaths = [...new Set([...fromLlms, ...fromSitemap])].sort();

  const onlyLlms = [...fromLlms].filter((p) => !fromSitemap.has(p)).length;
  const onlySitemap = [...fromSitemap].filter((p) => !fromLlms.has(p)).length;
  console.log(
    `  llms.txt ${fromLlms.size}, sitemap ${fromSitemap.size} → ` +
      `${pagePaths.length} unique (${onlyLlms} only in llms.txt, ${onlySitemap} only in the sitemap)`,
  );

  // An empty index means upstream is broken or has moved, not that the docs
  // are gone. Stop before the prune below deletes the whole corpus.
  if (pagePaths.length === 0) {
    throw new Error(
      `Neither ${llmsUrl} nor ${sitemapUrl} listed a single docs page — refusing to continue`,
    );
  }

  const entries: PageEntry[] = pagePaths.map((pagePath) => {
    const pageUrl = `${ORIGIN}${pagePath}`;
    return {
      pagePath,
      pageUrl,
      markdownUrl: `${pageUrl}.md`,
      localPath: join(
        DOCS_DIR,
        ...`${pagePath.replace(/^\//, "")}.md`.split("/"),
      ),
      indexes: [
        ...(fromLlms.has(pagePath) ? ["llms.txt"] : []),
        ...(fromSitemap.has(pagePath) ? ["sitemap"] : []),
      ],
    };
  });

  await mkdir(DOCS_DIR, { recursive: true });
  await writeFile(
    join(DOCS_DIR, "_manifest.json"),
    JSON.stringify(
      {
        sources: [llmsUrl, sitemapUrl],
        count: entries.length,
        pages: entries.map((e) => ({
          page: e.pageUrl,
          markdown: e.markdownUrl,
          file: relative(DOCS_DIR, e.localPath),
          indexes: e.indexes,
        })),
      },
      null,
      2,
    ) + "\n",
  );

  console.log(
    `\nDownloading ${entries.length} markdown pages (concurrency ${CONCURRENCY})...`,
  );

  // A page that fails is warned about and skipped: llms.txt keeps a few stale
  // slugs, and one dead link must not fail the whole nightly refresh.
  const saved = await mapConcurrent(entries, CONCURRENCY, async (entry) => {
    let markdown: string;
    try {
      markdown = await fetchText(entry.markdownUrl);
    } catch (cause) {
      console.warn(
        `  Failed to download ${entry.markdownUrl} (${cause}) — skipping`,
      );
      return undefined;
    }
    await mkdir(dirname(entry.localPath), { recursive: true });
    await writeFile(entry.localPath, stripOpenApiFence(markdown));
    return entry.localPath;
  });

  const kept = saved.filter((path): path is string => path !== undefined);
  const failed = entries.length - kept.length;
  console.log(
    `  ${kept.length} downloaded` + (failed > 0 ? `, ${failed} failed` : ""),
  );

  // Only the pages that actually came down this run are kept. Pruning against
  // a partial crawl would delete pages that are merely unreachable today, so
  // a run that lost more than a sliver keeps everything and warns instead.
  if (failed / entries.length > MAX_FAILURE_RATE_FOR_PRUNE) {
    console.warn(
      `  ${failed}/${entries.length} pages failed — skipping the prune this run`,
    );
    return;
  }
  await prune(new Set(kept));
}

// ============================================================================
// Entry point
// ============================================================================

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  await fetchOpenApiDocuments();
  await fetchDocs();
  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
