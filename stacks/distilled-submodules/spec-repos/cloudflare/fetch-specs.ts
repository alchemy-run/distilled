#!/usr/bin/env bun
/**
 * Fetch every Cloudflare API doc page as Markdown into ../specs.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *   bun run fetch-specs.ts --concurrency 16
 *   bun run fetch-specs.ts --limit 20            # smoke test
 *
 * Cloudflare publishes no machine-readable description of this surface that
 * the `@distilled.cloud/cloudflare` generator can read; it reads the docs.
 * Every page of https://developers.cloudflare.com/api/ has a Markdown twin at
 * `<page>/index.md`, and the whole navigation tree — resources, subresources,
 * methods — is server-rendered into the single index page, so one fetch of the
 * index yields every page URL.
 *
 * Files mirror the URL path:
 *   page: https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/list
 *   file: ../specs/api/resources/ai/subresources/finetunes/methods/list/index.md
 *
 * Two upstream quirks shape the rest of this script:
 *
 *   - The Markdown endpoint truncates the largest pages mid-stream (the Access
 *     application schemas, for one): the response ends early with `<details>`
 *     elements left unclosed. The page's HTML is served complete, so such a
 *     page falls back to rendering the HTML as the same Markdown
 *     ({@link pageHtmlToMarkdown}).
 *   - Some pages the sidebar links 404 altogether. A failed page is reported
 *     and any previously fetched copy is left in place — a page that vanishes
 *     from the docs is not evidence that its API is gone. Local pages the
 *     sidebar no longer lists are kept for the same reason.
 *
 * `../specs/_manifest.json` records every page URL, its Markdown twin, the
 * pages that fell back to HTML, the ones missing upstream and the ones only
 * present locally.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const ORIGIN = "https://developers.cloudflare.com";
const INDEX_URL = `${ORIGIN}/api/`;
const SPECS_DIR = resolve(import.meta.dir, "..", "specs");

/** `--name value`, absent means the default. */
const flag = (name: string, fallback: number): number => {
  const at = process.argv.indexOf(`--${name}`);
  if (at === -1) return fallback;
  const value = Number(process.argv[at + 1]);
  if (!Number.isFinite(value)) {
    throw new Error(`--${name} needs a number`);
  }
  return value;
};

const CONCURRENCY = flag("concurrency", 12);
/** Only fetch the first N pages. For smoke tests; 0 fetches all of them. */
const LIMIT = flag("limit", 0);

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

type Fetched =
  | { readonly ok: true; readonly text: string }
  | { readonly ok: false; readonly status?: number; readonly cause?: unknown };

const fetchText = async (url: string): Promise<Fetched> => {
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "spec-mirror-cloudflare" },
    });
    if (!response.ok) return { ok: false, status: response.status };
    return { ok: true, text: await response.text() };
  } catch (cause) {
    return { ok: false, cause };
  }
};

const describe = (failure: { status?: number; cause?: unknown }): string =>
  failure.status !== undefined ? `HTTP ${failure.status}` : `${failure.cause ?? "network error"}`;

/** Run `f` over `items`, at most `limit` at a time, results in input order. */
const mapConcurrent = async <T, R>(
  items: readonly T[],
  limit: number,
  f: (item: T) => Promise<R>,
): Promise<R[]> => {
  const results = Array.from({ length: items.length }) as R[];
  let next = 0;
  const worker = async () => {
    for (let i = next++; i < items.length; i = next++) {
      results[i] = await f(items[i]!);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker));
  return results;
};

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

/**
 * Every API resource doc page path in the rendered sidebar HTML.
 *
 * The sidebar lists pages as `href="/api/..."`. Only resource pages
 * (`/api/resources/...`) are kept — the actual API surface — so the language /
 * SDK landing tabs (go, node, python, terraform, overview) are skipped, along
 * with Astro build assets and any href whose last segment carries a file
 * extension.
 */
const extractPagePaths = (html: string): string[] => {
  const seen = new Set<string>();
  const re = /href="(\/api\/resources\/[^"#?]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    let path = match[1]!;
    if (path.includes("/_astro/")) continue;
    const lastSegment = path.split("/").pop() ?? "";
    if (lastSegment.includes(".")) continue;
    if (path.length > "/api".length && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    seen.add(path);
  }
  return Array.from(seen).sort();
};

// ---------------------------------------------------------------------------
// HTML → Markdown
// ---------------------------------------------------------------------------

/**
 * Render a Cloudflare API page's HTML as the Markdown its `/index.md` twin
 * serves.
 *
 * The docs site streams `/index.md` out of the same html→markdown pass, and
 * cuts it off part-way through very large pages. The HTML for those pages
 * arrives complete, so this is the fallback.
 *
 * Only the containers the spec converter reads are emitted — title, route,
 * description, parameter groups, returns and the shared-model list. Everything
 * else on the page (navigation, security blurbs, per-language samples) is
 * chrome the converter discards anyway.
 */

/** Containers whose text becomes markdown; everything else is chrome. */
const CAPTURE_CLASSES = [
  "stldocs-method-title",
  "stldocs-method-route",
  "stldocs-method-description",
  "stldocs-method-parameters",
  "stldocs-method-returns",
];

/** Subtrees with no textual content of their own. */
const SKIP_TAGS = new Set(["svg", "script", "style", "noscript", "template"]);

/** The expander toggle renders as the words `Expand` / `Collapse`. */
const SKIP_CLASSES = ["stldocs-expand-toggle"];

/**
 * Section headings by `data-stldocs-property-group`. The heading element sits
 * outside the container it labels (and not always before it), so the section a
 * property list belongs to is read off the container instead.
 *
 * `models` is the shared-model list a resource index page carries; a method
 * page's type reference is only a name plus a key preview, and the model list
 * is where its fields are written out in full.
 */
const GROUP_HEADINGS: Record<string, string> = {
  p: "Path Parameters",
  h: "Header Parameters",
  q: "Query Parameters",
  body: "Body Parameters",
  returns: "Returns",
  models: "Models",
};

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/** Elements that start and end a markdown block. */
const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "details",
  "div",
  "dl",
  "dd",
  "dt",
  "fieldset",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "summary",
  "table",
  "tr",
  "ul",
]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "\u2019",
  lsquo: "\u2018",
  ldquo: "\u201c",
  rdquo: "\u201d",
};

const decodeEntities = (s: string): string =>
  s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, body: string) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      return String.fromCodePoint(Number.parseInt(body.slice(2), 16));
    }
    if (body.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(body.slice(1), 10));
    }
    return NAMED_ENTITIES[body] ?? match;
  });

const attr = (attrs: string, name: string): string | undefined => {
  const m = attrs.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return m ? decodeEntities(m[1]!) : undefined;
};

const classList = (attrs: string): string[] =>
  (attr(attrs, "class") ?? "").split(/\s+/).filter(Boolean);

interface Frame {
  readonly tag: string;
  readonly classes: string[];
  /** Buffer offset an `<a>` opened at, so its close can wrap the text. */
  readonly linkAt?: number;
  readonly href?: string;
}

const TOKEN =
  /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!DOCTYPE[^>]*>|<\/([a-zA-Z][a-zA-Z0-9-]*)\s*>|<([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;

/**
 * The page's method and model panes as markdown blocks.
 *
 * Returns undefined when the HTML holds neither (a 404 body).
 */
const pageHtmlToMarkdown = (html: string): string | undefined => {
  const blocks: string[] = [];
  const stack: Frame[] = [];
  let buf = "";
  let captureDepth = -1;
  let skipDepth = -1;
  let preDepth = -1;
  let sawContent = false;
  let inPropertyList = false;

  const flush = () => {
    const text = preDepth >= 0 ? buf.replace(/\s+$/, "") : buf.replace(/\s+/g, " ").trim();
    if (text.trim()) blocks.push(text);
    buf = "";
  };

  const write = (text: string) => {
    if (captureDepth < 0 || skipDepth >= 0) return;
    buf += text;
  };

  const open = (tag: string, attrs: string) => {
    const classes = classList(attrs);
    const frame: Frame = { tag, classes };

    if (skipDepth < 0) {
      const group = attr(attrs, "data-stldocs-property-group");
      const heading = group ? GROUP_HEADINGS[group] : undefined;
      if (SKIP_TAGS.has(tag) || classes.some((c) => SKIP_CLASSES.includes(c))) {
        skipDepth = stack.length;
      } else if (
        captureDepth < 0 &&
        (classes.some((c) => CAPTURE_CLASSES.includes(c)) || group === "models")
      ) {
        captureDepth = stack.length;
        sawContent = true;
        if (heading) blocks.push(`##### ${heading}`);
        inPropertyList = heading !== undefined;
      }
    }

    if (captureDepth >= 0 && skipDepth < 0) {
      if (BLOCK_TAGS.has(tag)) flush();
      if (tag === "details" || tag === "summary") {
        blocks.push(`<${tag}>`);
      } else if (tag === "pre") {
        preDepth = stack.length;
        buf = "```\n";
      } else if (/^h[1-6]$/.test(tag)) {
        // A heading inside a property list repeats the synthesized one.
        if (inPropertyList) skipDepth = stack.length;
        else buf = `${"#".repeat(Number(tag[1]))} `;
      } else if (tag === "code" && preDepth < 0) {
        buf += "`";
      } else if (tag === "br") {
        buf += " ";
      } else if (tag === "a") {
        // The deep-link button is a bare icon; its href repeats the property's
        // full path and is worth kilobytes a page, so only the marker is kept.
        if (classes.includes("stldocs-deep-link-button")) {
          flush();
          blocks.push("[Link to this property](#)");
          skipDepth = stack.length;
        } else {
          stack.push({
            ...frame,
            linkAt: buf.length,
            href: attr(attrs, "href"),
          });
          return;
        }
      }
    }

    if (!VOID_TAGS.has(tag)) stack.push(frame);
  };

  const close = (tag: string) => {
    let at = -1;
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i]!.tag === tag) {
        at = i;
        break;
      }
    }
    if (at < 0) return;
    const frame = stack[at]!;
    stack.length = at;

    if (skipDepth >= 0) {
      if (stack.length <= skipDepth) skipDepth = -1;
      return;
    }
    if (captureDepth < 0) return;

    if (tag === "pre") {
      buf += "\n```";
      flush();
      preDepth = -1;
    } else if (tag === "code" && preDepth < 0) {
      buf += "`";
    } else if (tag === "a" && frame.linkAt !== undefined) {
      const text = buf.slice(frame.linkAt).trim();
      buf = buf.slice(0, frame.linkAt);
      // An autolinked URL prints as itself, the way the markdown twin has it.
      if (frame.href && text && frame.href !== text) {
        buf += `[${text}](${frame.href})`;
      } else buf += text;
    } else if (tag === "details" || tag === "summary") {
      flush();
      blocks.push(`</${tag}>`);
    } else if (BLOCK_TAGS.has(tag)) {
      flush();
    }

    if (stack.length <= captureDepth) {
      flush();
      captureDepth = -1;
      inPropertyList = false;
    }
  };

  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(html)) !== null) {
    if (match.index > last) {
      write(decodeEntities(html.slice(last, match.index)));
    }
    last = TOKEN.lastIndex;
    const closing = match[1];
    const opening = match[2];
    if (closing) close(closing.toLowerCase());
    else if (opening) open(opening.toLowerCase(), match[3] ?? "");
  }
  flush();

  if (!sawContent) return undefined;
  return `${blocks.join("\n\n")}\n`;
};

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

interface PageEntry {
  readonly pagePath: string;
  readonly pageUrl: string;
  readonly markdownUrl: string;
  readonly localPath: string;
}

/**
 * Every property carries a deep-link whose href repeats the property's full
 * path through the schema; on a large page those hrefs are most of the bytes
 * and none of the API. The marker itself stays — it is what delimits one
 * property from the next.
 */
const compactDeepLinks = (markdown: string): string =>
  markdown
    .replace(/\[Link to this property\]\(<?#[^\n]*?>?\)/g, "[Link to this property](#)")
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

type Outcome = "downloaded" | "fallback" | "missing" | "failed";

/** Render the page's HTML as markdown, for a markdown twin that came up short. */
const fromPageHtml = async (entry: PageEntry, reason: string): Promise<string | undefined> => {
  const page = await fetchText(entry.pageUrl);
  if (!page.ok) {
    console.warn(`⚠️  ${entry.pageUrl} (${reason}) also failed as HTML (${describe(page)})`);
    return undefined;
  }
  const markdown = pageHtmlToMarkdown(page.text);
  if (markdown) console.log(`   ↩︎  ${entry.pagePath}: ${reason}; used the page HTML`);
  else {
    console.warn(`⚠️  ${entry.pageUrl} has no method pane (${reason}) — keeping any existing copy`);
  }
  return markdown;
};

const fetchPage = async (entry: PageEntry): Promise<Outcome> => {
  const attempt = await fetchText(entry.markdownUrl);

  let markdown: string;
  let outcome: Outcome;

  if (!attempt.ok) {
    // A 404 on the markdown twin means the page itself is gone rather than
    // the markdown pass having failed; the HTML request below tells which.
    if (attempt.status !== 404) {
      console.warn(`⚠️  ${entry.markdownUrl} (${describe(attempt)})`);
    }
    const rendered = await fromPageHtml(entry, describe(attempt));
    if (rendered === undefined) {
      return attempt.status === 404 ? "missing" : "failed";
    }
    markdown = rendered;
    outcome = "fallback";
  } else if (isTruncatedMarkdown(attempt.text)) {
    const rendered = await fromPageHtml(entry, "markdown truncated");
    if (rendered === undefined) {
      console.warn(`⚠️  ${entry.markdownUrl} is truncated — saving as served`);
    }
    markdown = rendered ?? attempt.text;
    outcome = rendered ? "fallback" : "downloaded";
  } else {
    markdown = attempt.text;
    outcome = "downloaded";
  }

  await mkdir(dirname(entry.localPath), { recursive: true });
  await writeFile(entry.localPath, compactDeepLinks(markdown));
  return outcome;
};

// ---------------------------------------------------------------------------

const main = async () => {
  console.log(`🌩️  Cloudflare API docs mirror`);
  console.log(`   Sidebar source: ${INDEX_URL}`);
  console.log(`   Output:         ${SPECS_DIR}`);

  const index = await fetchText(INDEX_URL);
  if (!index.ok) {
    throw new Error(`Could not fetch ${INDEX_URL} (${describe(index)})`);
  }
  const pagePaths = extractPagePaths(index.text);
  if (pagePaths.length === 0) {
    throw new Error(`${INDEX_URL} listed no /api/resources/ pages — the sidebar markup changed`);
  }
  console.log(`   Found ${pagePaths.length} pages in the sidebar.`);

  let entries: PageEntry[] = pagePaths.map((pagePath) => {
    const pageUrl = `${ORIGIN}${pagePath}`;
    return {
      pagePath,
      pageUrl,
      markdownUrl: `${pageUrl}/index.md`,
      localPath: join(SPECS_DIR, ...pagePath.replace(/^\//, "").split("/"), "index.md"),
    };
  });
  if (LIMIT > 0) {
    entries = entries.slice(0, LIMIT);
    console.log(`   --limit set: only fetching ${entries.length} pages.`);
  }

  await mkdir(SPECS_DIR, { recursive: true });
  console.log(`\n⬇️  Fetching ${entries.length} markdown pages (concurrency ${CONCURRENCY}) ...\n`);
  const results = await mapConcurrent(entries, CONCURRENCY, fetchPage);

  const count = (outcome: Outcome) => results.filter((result) => result === outcome).length;
  const pagesWith = (outcome: Outcome) =>
    entries.filter((_, i) => results[i] === outcome).map((e) => e.pageUrl);

  if (count("downloaded") + count("fallback") === 0) {
    throw new Error(
      `None of the ${entries.length} pages could be fetched — refusing to ` +
        `rewrite the manifest over a working mirror`,
    );
  }

  // Pages that exist locally but no longer hang off the sidebar. They are left
  // on disk: a resource dropped from the navigation is not evidence that its
  // API is gone.
  const wanted = new Set(entries.map((e) => e.localPath));
  const onDisk = await readdir(SPECS_DIR, { recursive: true }).catch(() => [] as string[]);
  const unlisted =
    LIMIT > 0
      ? []
      : onDisk
          .filter((name) => name.endsWith("index.md"))
          .map((name) => join(SPECS_DIR, name))
          .filter((file) => !wanted.has(file))
          .map((file) => relative(SPECS_DIR, file))
          .sort();

  await writeFile(
    join(SPECS_DIR, "_manifest.json"),
    `${JSON.stringify(
      {
        source: INDEX_URL,
        count: entries.length,
        pages: entries.map((e) => ({
          page: e.pageUrl,
          markdown: e.markdownUrl,
        })),
        // Served truncated as markdown; rendered from the page HTML.
        htmlFallback: pagesWith("fallback"),
        // 404 upstream; any previously fetched copy was kept.
        missing: pagesWith("missing"),
        // Present locally, absent from the sidebar; kept as well.
        unlisted,
      },
      null,
      2,
    )}\n`,
  );

  const summary = [
    `${count("downloaded")} downloaded`,
    count("fallback") > 0 ? `${count("fallback")} via HTML fallback` : undefined,
    count("missing") > 0 ? `⚠️  ${count("missing")} missing upstream` : undefined,
    count("failed") > 0 ? `⚠️  ${count("failed")} failed` : undefined,
    unlisted.length > 0 ? `${unlisted.length} local pages no longer listed` : undefined,
  ].filter(Boolean);

  console.log(`\n✅ Done. ${summary.join(", ")}.`);
  for (const page of pagesWith("missing")) {
    console.log(`   missing upstream: ${page}`);
  }
};

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
