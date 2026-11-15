#!/usr/bin/env node
/**
 * Fetch every page of the Questrade API documentation into ../specs as JSON.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Questrade publishes no machine-readable description of its REST API: no
 * OpenAPI document, no SDK of its own, no schema endpoint. The only
 * description is the documentation at
 * https://www.questrade.com/api/documentation — one server-rendered page per
 * operation, with a request-parameter table, a response-property table
 * (nesting given as "Nested property, level N."), and sample requests and
 * responses. The `@distilled.cloud/questrade` generator reads that.
 *
 * The sidebar of any documentation page links every other page, so one fetch
 * of the getting-started page yields the page list. Each page's article is
 * transcribed block by block — headings, paragraphs, list items, tables and
 * code samples, in page order — with no interpretation: deciding what a table
 * row means is the generator's job, so a reworded page shows up as a diff of
 * that page alone.
 *
 * Files mirror the URL path below /api/documentation/:
 *   page: https://www.questrade.com/api/documentation/rest-operations/account-calls/accounts
 *   file: ../specs/rest-operations/account-calls/accounts.json
 *
 * `../specs/_manifest.json` lists every page in sidebar order with its
 * sidebar group and label (`Account calls`, `GET accounts/:id/orders`).
 *
 * The site sits behind a bot filter that refuses a user agent without a
 * `Mozilla/5.0 (compatible; …)` prefix with a 403, so the script sends one
 * that still names the mirror.
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const ORIGIN = "https://www.questrade.com";
const DOCS_PREFIX = "/api/documentation/";
const INDEX_URL = `${ORIGIN}${DOCS_PREFIX}getting-started`;
const SPECS_DIR = resolve(import.meta.dirname, "..", "specs");
const USER_AGENT =
  "Mozilla/5.0 (compatible; spec-mirror-questrade; +https://github.com/distilled-mirror/spec-mirror-questrade)";

/** A sidebar that lists fewer operation pages than this is a broken page. */
const MIN_OPERATION_PAGES = 15;

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

const fetchHtml = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html" },
  });
  if (!response.ok) {
    throw new Error(`${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
};

// ---------------------------------------------------------------------------
// HTML → text
// ---------------------------------------------------------------------------

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

const decode = (text: string): string =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, entity: string) => {
    if (entity[0] === "#") {
      const code =
        entity[1] === "x" || entity[1] === "X"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[entity.toLowerCase()] ?? whole;
  });

/**
 * Cloudflare's email obfuscation: `/cdn-cgi/l/email-protection#<hex>`, the
 * first byte a key XORed into the rest. Its key changes on every response,
 * so the address is decoded to keep the page stable between fetches.
 */
const EMAIL_PROTECTION =
  /<a\b[^>]*?href="\/cdn-cgi\/l\/email-protection#([0-9a-f]+)"[^>]*>[\s\S]*?<\/a>/gi;

const decodeEmail = (hex: string): string => {
  const key = parseInt(hex.slice(0, 2), 16);
  let email = "";
  for (let i = 2; i < hex.length; i += 2) {
    email += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key);
  }
  return email;
};

/**
 * Inline HTML as Markdown-ish text: links become `[text](href)` so the
 * generator can follow "See [Order Side](…#order-side)" to an enumeration,
 * `<code>` becomes backticks, every other tag is dropped and whitespace is
 * collapsed.
 */
const inline = (html: string): string =>
  decode(
    html
      .replace(EMAIL_PROTECTION, (_, hex: string) => {
        const email = decodeEmail(hex).trim();
        return `<a href="mailto:${email}">${email}</a>`;
      })
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(
        /<a\b[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
        (_, href: string, body: string) => {
          const text = inline(body);
          return text === "" ? "" : `[${text}](${decode(href)})`;
        },
      )
      .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, body: string) => `\`${inline(body)}\``)
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t\r\f\v]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .trim();

// ---------------------------------------------------------------------------
// Page → blocks
// ---------------------------------------------------------------------------

type Row = { readonly cells: readonly string[]; readonly level?: number };

type Block =
  | {
      readonly type: "heading";
      readonly level: number;
      readonly id?: string;
      readonly text: string;
    }
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "listItem"; readonly text: string }
  | {
      readonly type: "table";
      readonly caption?: string;
      readonly columns: readonly string[];
      readonly rows: readonly Row[];
    }
  | { readonly type: "code"; readonly language?: string; readonly text: string };

interface Page {
  readonly url: string;
  readonly title: string;
  readonly summary?: string;
  readonly blocks: readonly Block[];
}

/**
 * One table cell. On narrow screens each cell repeats its column name in a
 * `md:hidden` span, and a nested property row carries a screen-reader prefix
 * ("Nested property, level 3. "); both are lifted out of the text.
 */
const cell = (html: string): { text: string; level?: number } => {
  const withoutLabel = html.replace(
    /<span\b[^>]*class="[^"]*\bmd:hidden\b[^"]*"[^>]*>[\s\S]*?<\/span>/,
    "",
  );
  let level: number | undefined;
  const text = withoutLabel.replace(
    /<span\b[^>]*class="[^"]*\bsr-only\b[^"]*"[^>]*>\s*Nested property, level (\d+)\.\s*<\/span>/i,
    (_, n: string) => {
      level = Number(n);
      return "";
    },
  );
  return { text: inline(text), level };
};

const table = (html: string): Block => {
  const caption = /<caption\b[^>]*>([\s\S]*?)<\/caption>/i.exec(html)?.[1];
  const columns = [...html.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => inline(m[1]!));
  const rows: Row[] = [];
  for (const [, tr] of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...tr!.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => cell(m[1]!));
    if (cells.length === 0) continue; // the header row
    const level = cells.find((c) => c.level !== undefined)?.level;
    rows.push({ cells: cells.map((c) => c.text), ...(level !== undefined ? { level } : {}) });
  }
  return {
    type: "table",
    ...(caption !== undefined ? { caption: inline(caption) } : {}),
    columns,
    rows,
  };
};

/**
 * The page's article: everything after the sidebar `<nav>` inside `<main>`,
 * up to the marketing sections that follow it.
 */
const article = (html: string, url: string): string => {
  const main = /<main\b[\s\S]*?<\/main>/i.exec(html)?.[0];
  if (main === undefined) throw new Error(`${url}: no <main>`);
  const afterNav = main.slice(main.indexOf("</nav>") + "</nav>".length);
  const header = afterNav.search(/<header\b/i);
  if (header === -1) throw new Error(`${url}: no <header> after the sidebar`);
  const body = afterNav.slice(header);
  // The article is the first <section>'s content; the next <section> is the
  // "Create your app" banner.
  const end = body.search(/<\/section>/i);
  return end === -1 ? body : body.slice(0, end);
};

const BLOCK = new RegExp(
  [
    String.raw`<header\b[^>]*>(?<header>[\s\S]*?)<\/header>`,
    String.raw`<h(?<hl>[1-6])\b(?<hattrs>[^>]*)>(?<h>[\s\S]*?)<\/h\k<hl>>`,
    String.raw`<table\b[\s\S]*?<\/table>`,
    String.raw`aria-label="(?<lang>[^"]*?) code sample code, scrollable"[^>]*>\s*<pre\b[^>]*>(?<code>[\s\S]*?)<\/pre>`,
    String.raw`<pre\b[^>]*>(?<pre>[\s\S]*?)<\/pre>`,
    String.raw`<li\b[^>]*>(?<li>[\s\S]*?)<\/li>`,
    String.raw`<p\b[^>]*>(?<p>[\s\S]*?)<\/p>`,
  ].join("|"),
  "gi",
);

/** Text of a `<pre>`: tags dropped, entities decoded, whitespace kept. */
const preText = (html: string): string =>
  decode(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/\s+$/, "");

const parsePage = (html: string, url: string): Page => {
  const body = article(html, url);
  let title: string | undefined;
  let summary: string | undefined;
  const blocks: Block[] = [];
  for (const match of body.matchAll(BLOCK)) {
    const g = match.groups!;
    if (g.header !== undefined) {
      title = inline(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(g.header)?.[1] ?? "");
      const p = /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(g.header)?.[1];
      if (p !== undefined && inline(p) !== "") summary = inline(p);
    } else if (g.hl !== undefined) {
      const id = /\bid="([^"]*)"/.exec(g.hattrs ?? "")?.[1];
      blocks.push({
        type: "heading",
        level: Number(g.hl),
        ...(id !== undefined ? { id } : {}),
        text: inline(g.h!),
      });
    } else if (match[0].toLowerCase().startsWith("<table")) {
      blocks.push(table(match[0]));
    } else if (g.code !== undefined) {
      blocks.push({ type: "code", language: inline(g.lang!), text: preText(g.code) });
    } else if (g.pre !== undefined) {
      blocks.push({ type: "code", text: preText(g.pre) });
    } else if (g.li !== undefined) {
      const text = inline(g.li);
      if (text !== "") blocks.push({ type: "listItem", text });
    } else if (g.p !== undefined) {
      const text = inline(g.p);
      if (text !== "") blocks.push({ type: "paragraph", text });
    }
  }
  if (!title) throw new Error(`${url}: no <h1> title`);
  return { url, title, ...(summary !== undefined ? { summary } : {}), blocks };
};

// ---------------------------------------------------------------------------
// Sidebar → page list
// ---------------------------------------------------------------------------

interface SidebarEntry {
  readonly path: string;
  readonly group?: string;
  readonly label: string;
}

/**
 * Every documentation link in the sidebar `<nav>`, in order. A link inside a
 * collapsible group ("Account calls") records the group's button text.
 */
const sidebar = (html: string): SidebarEntry[] => {
  const nav = /<nav\b[^>]*aria-label="API documentation"[^>]*>([\s\S]*?)<\/nav>/i.exec(html)?.[1];
  if (nav === undefined) throw new Error(`${INDEX_URL}: no API documentation <nav>`);
  const entries: SidebarEntry[] = [];
  const seen = new Set<string>();
  let group: string | undefined;
  const token =
    /<button\b[^>]*>([\s\S]*?)<\/button>|<a\b[^>]*?href="([^"#?]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const [, button, href, text] of nav.matchAll(token)) {
    if (button !== undefined) {
      group = inline(button);
      continue;
    }
    if (!href!.startsWith(DOCS_PREFIX) || seen.has(href!)) continue;
    seen.add(href!);
    const label = inline(text!.replace(/<\/span><span\b/gi, "</span> <span"));
    entries.push({
      path: href!,
      ...(href!.startsWith(`${DOCS_PREFIX}rest-operations/`) && group !== undefined
        ? { group }
        : {}),
      label,
    });
  }
  return entries;
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const fileFor = (path: string): string =>
  join(SPECS_DIR, `${path.slice(DOCS_PREFIX.length).replace(/\/+$/, "")}.json`);

const listJson = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true }).catch(() => []);
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".json"))
    .map((e) => join(e.parentPath, e.name));
};

const entries = sidebar(await fetchHtml(INDEX_URL));
const operations = entries.filter((e) => e.path.includes("/rest-operations/"));
if (operations.length < MIN_OPERATION_PAGES) {
  throw new Error(
    `${INDEX_URL}: the sidebar lists ${operations.length} REST operation page(s), ` +
      `expected at least ${MIN_OPERATION_PAGES} — the page layout changed`,
  );
}

const pages = new Map<string, Page>();
for (const entry of entries) {
  const url = `${ORIGIN}${entry.path}`;
  const page = parsePage(await fetchHtml(url), url);
  if (entry.path.includes("/rest-operations/") && !page.blocks.some((b) => b.type === "table")) {
    throw new Error(`${url}: an operation page with no table — the page layout changed`);
  }
  pages.set(entry.path, page);
  console.log(`  ${entry.path}  (${page.blocks.length} blocks)`);
}

// Pages are written only after every one parsed, so a failed run leaves the
// previous snapshot whole. Files of pages the sidebar no longer links are
// removed: the sidebar is the documentation's own table of contents.
const written = new Set<string>();
for (const [path, page] of pages) {
  const file = fileFor(path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(page, null, 2) + "\n");
  written.add(file);
}
const manifestFile = join(SPECS_DIR, "_manifest.json");
written.add(manifestFile);
await writeFile(
  manifestFile,
  JSON.stringify(
    {
      source: `${ORIGIN}${DOCS_PREFIX}`,
      pages: entries.map((e) => ({ ...e, file: relative(SPECS_DIR, fileFor(e.path)) })),
    },
    null,
    2,
  ) + "\n",
);
for (const file of await listJson(SPECS_DIR)) {
  if (!written.has(file)) {
    await rm(file);
    console.log(`  removed ${relative(SPECS_DIR, file)} (no longer in the sidebar)`);
  }
}

console.log(`Done! ${pages.size} pages (${operations.length} REST operation pages) → ${SPECS_DIR}`);
