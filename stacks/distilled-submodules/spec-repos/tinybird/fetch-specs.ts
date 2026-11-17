#!/usr/bin/env node
/**
 * Fetch every page of the Tinybird API reference as Markdown into ../specs.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Tinybird publishes no machine-readable description of its REST API; the
 * documentation at https://www.tinybird.co/docs/api-reference is the spec.
 * The page list comes from the official docs index, `/docs/llms.txt`: every
 * link under `/docs/api-reference` is a page of the reference.
 *
 * Every page has a Markdown twin at `/docs/md/<path>`. Newer pages carry the
 * whole reference in the twin: one `## METHOD /path` heading per operation,
 * followed by `{% table %}` blocks for its parameters and status codes. Older
 * pages are generated from Sphinx, and their twin holds only an
 * `{% api_reference api="…" /%}` placeholder where the operations should be.
 * The page's HTML has them, one `<div class="body" role="main">` per
 * placeholder, as Sphinx `dl.http` definitions. This script renders each of
 * those divs into the same Markdown the newer pages use and splices it in
 * place of its placeholder ({@link renderReference}), so every file the
 * generator reads has one shape.
 *
 * Files mirror the URL path:
 *   page: https://www.tinybird.co/docs/api-reference/pipe-api/api-endpoints
 *   file: ../specs/api-reference/pipe-api/api-endpoints/index.md
 *
 * `../specs/_manifest.json` records every page URL, its file, and whether its
 * reference was rendered from HTML. The script fails, writing nothing, when a
 * page is missing, when placeholders and rendered blocks do not pair up, or
 * when a page renders no operation.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { parse, type DefaultTreeAdapterMap } from "parse5";

type Node = DefaultTreeAdapterMap["node"];
type Element = DefaultTreeAdapterMap["element"];

const ORIGIN = "https://www.tinybird.co";
const INDEX_URL = `${ORIGIN}/docs/llms.txt`;
const PREFIX = "/docs/api-reference";
const SPECS_DIR = resolve(import.meta.dirname, "..", "specs");

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, { headers: { "user-agent": "spec-mirror-tinybird" } });
  if (!response.ok) throw new Error(`GET ${url} → ${response.status}`);
  return response.text();
};

// ---------------------------------------------------------------------------
// Page list
// ---------------------------------------------------------------------------

/** Every `/docs/api-reference…` path linked from the docs index, sorted. */
const pagePaths = (index: string): string[] => {
  const paths = new Set<string>();
  for (const [, url] of index.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    const path = new URL(url!).pathname.replace(/\/+$/, "");
    if (path === PREFIX || path.startsWith(`${PREFIX}/`)) paths.add(path);
  }
  return [...paths].sort();
};

// ---------------------------------------------------------------------------
// HTML → Markdown
// ---------------------------------------------------------------------------

const isElement = (node: Node): node is Element => "tagName" in node;

const attr = (el: Element, name: string): string | undefined =>
  el.attrs.find((a) => a.name === name)?.value;

const classes = (el: Element): string[] => (attr(el, "class") ?? "").split(/\s+/).filter(Boolean);

const hasClass = (el: Element, name: string): boolean => classes(el).includes(name);

const children = (node: Node): Node[] => ("childNodes" in node ? node.childNodes : []);

const elements = (node: Node): Element[] => children(node).filter(isElement);

/** Depth-first search for every element matching `test`, not descending into matches. */
const findAll = (node: Node, test: (el: Element) => boolean): Element[] => {
  const found: Element[] = [];
  const visit = (n: Node) => {
    for (const child of children(n)) {
      if (!isElement(child)) continue;
      if (test(child)) found.push(child);
      else visit(child);
    }
  };
  visit(node);
  return found;
};

/** Raw text, whitespace preserved (for code blocks). */
const rawText = (node: Node): string => {
  if (node.nodeName === "#text") return (node as DefaultTreeAdapterMap["textNode"]).value;
  if (isElement(node) && node.tagName === "br") return "\n";
  return children(node).map(rawText).join("");
};

const collapse = (text: string): string => text.replace(/\s+/g, " ");

/** Inline Markdown for phrasing content. `<br>` becomes `<br>` so table cells stay on one line. */
const inline = (node: Node): string => {
  if (node.nodeName === "#text") {
    return collapse((node as DefaultTreeAdapterMap["textNode"]).value);
  }
  if (!isElement(node)) return "";
  if (hasClass(node, "headerlink")) return "";
  const inner = () => children(node).map(inline).join("");
  switch (node.tagName) {
    case "br":
      return "<br>";
    case "code":
    case "kbd":
    case "samp": {
      const text = collapse(rawText(node)).trim();
      return text === "" ? "" : `\`${text}\``;
    }
    case "strong":
    case "b": {
      const text = inner().trim();
      return text === "" ? "" : `**${text}**`;
    }
    case "em":
    case "i": {
      const text = inner().trim();
      return text === "" ? "" : `*${text}*`;
    }
    case "a": {
      const text = inner().trim();
      const href = attr(node, "href");
      return href === undefined || text === "" ? text : `[${text}](${href})`;
    }
    default:
      return inner();
  }
};

const tidy = (text: string): string => text.replace(/ +/g, " ").trim();

/** One table as a Markdoc `{% table %}` block, the syntax the twins use. */
const table = (el: Element): string[] => {
  const rows = findAll(el, (e) => e.tagName === "tr");
  const out: string[] = [];
  const caption = findAll(el, (e) => e.tagName === "caption")[0];
  if (caption !== undefined) out.push(`### ${tidy(inline(caption))}`, "");
  out.push("{% table %}");
  rows.forEach((row, i) => {
    if (i > 0) out.push("  ---");
    for (const cell of elements(row).filter((c) => c.tagName === "td" || c.tagName === "th")) {
      out.push(`  * ${tidy(inline(cell))}`);
    }
  });
  out.push("{% /table %}");
  return out;
};

/** A highlighted code block, with its caption as a bold line before it. */
const codeBlock = (pre: Element, language: string, caption: string | undefined): string[] => {
  const out: string[] = [];
  if (caption !== undefined && caption !== "") out.push(`**${caption}**`, "");
  out.push(`\`\`\`${language}`, rawText(pre).replace(/\s+$/, ""), "```");
  return out;
};

const languageOf = (el: Element): string =>
  classes(el)
    .find((c) => c.startsWith("highlight-"))
    ?.slice("highlight-".length)
    .toLowerCase() ?? "";

/** Block Markdown for flow content; returns paragraphs separated by blank lines. */
const blocks = (node: Node): string[][] => {
  const out: string[][] = [];
  let pending = "";
  const flush = () => {
    const text = tidy(pending);
    if (text !== "") out.push([text]);
    pending = "";
  };
  for (const child of children(node)) {
    if (!isElement(child)) {
      pending += inline(child);
      continue;
    }
    const tag = child.tagName;
    if (tag === "dl" && hasClass(child, "http")) {
      flush();
      out.push(...operation(child));
    } else if (/^h[1-6]$/.test(tag)) {
      flush();
      const level = Math.max(Number(tag[1]), 2);
      out.push([`${"#".repeat(level)} ${tidy(inline(child))}`]);
    } else if (tag === "p") {
      flush();
      const text = tidy(inline(child));
      if (text !== "") out.push([text]);
    } else if (tag === "ul" || tag === "ol") {
      flush();
      const items = elements(child).filter((li) => li.tagName === "li");
      out.push(
        items.map((li, i) => {
          const body = blocks(li)
            .map((b) => b.join("\n"))
            .join(" ");
          return `${tag === "ol" ? `${i + 1}.` : "-"} ${tidy(body)}`;
        }),
      );
    } else if (tag === "table") {
      flush();
      out.push(table(child));
    } else if (tag === "pre") {
      flush();
      out.push(codeBlock(child, "", undefined));
    } else if (tag === "div" && hasClass(child, "literal-block-wrapper")) {
      flush();
      const caption = findAll(child, (e) => hasClass(e, "code-block-caption"))[0];
      const highlight = findAll(child, (e) =>
        classes(e).some((c) => c.startsWith("highlight-")),
      )[0];
      const pre = findAll(child, (e) => e.tagName === "pre")[0];
      if (pre !== undefined) {
        out.push(
          codeBlock(
            pre,
            highlight === undefined ? "" : languageOf(highlight),
            caption === undefined ? undefined : tidy(inline(caption)),
          ),
        );
      }
    } else if (tag === "div" && classes(child).some((c) => c.startsWith("highlight-"))) {
      flush();
      const pre = findAll(child, (e) => e.tagName === "pre")[0];
      if (pre !== undefined) out.push(codeBlock(pre, languageOf(child), undefined));
    } else if (tag === "div" && (hasClass(child, "hint") || hasClass(child, "admonition"))) {
      flush();
      const inner = blocks(child).map((b) => b.join("\n"));
      out.push(["{% callout %}", inner.join("\n\n"), "{% /callout %}"]);
    } else if (["div", "section", "blockquote", "article", "span"].includes(tag)) {
      if (tag === "span") {
        pending += inline(child);
      } else {
        flush();
        out.push(...blocks(child));
      }
    } else if (["colgroup", "col", "script", "style", "svg", "button"].includes(tag)) {
      // presentation only
    } else {
      pending += inline(child);
    }
  }
  flush();
  return out;
};

/**
 * One Sphinx `dl.http` definition: `<dt>` holds the method and route in two
 * `sig-name` spans, `<dd>` the description, parameter and status tables, and
 * examples. Rendered as the `## METHOD /path` section the newer pages use.
 */
const operation = (dl: Element): string[][] => {
  const out: string[][] = [];
  for (const child of elements(dl)) {
    if (child.tagName === "dt") {
      const names = findAll(child, (e) => hasClass(e, "sig-name")).map((e) =>
        tidy(collapse(rawText(e))),
      );
      const signature = tidy(names.join(" "));
      if (!/^[A-Z]+ \/\S*$/.test(signature)) {
        throw new Error(`unrecognised Sphinx http signature: ${JSON.stringify(signature)}`);
      }
      out.push([`## ${signature}`]);
    } else if (child.tagName === "dd") {
      out.push(...blocks(child));
    }
  }
  return out;
};

const PLACEHOLDER = /\{%\s*api_reference\b[^%]*\/%\}/g;

/**
 * Replace every `{% api_reference … /%}` placeholder in a twin with the
 * Markdown rendering of the matching `div.body[role=main]` of the page HTML.
 */
const renderReference = (twin: string, html: string, url: string): string => {
  const placeholders = twin.match(PLACEHOLDER) ?? [];
  const bodies = findAll(
    parse(html),
    (e) => e.tagName === "div" && hasClass(e, "body") && attr(e, "role") === "main",
  );
  if (placeholders.length !== bodies.length) {
    throw new Error(
      `${url}: ${placeholders.length} api_reference placeholder(s) but ${bodies.length} rendered reference block(s)`,
    );
  }
  let i = 0;
  return twin.replace(PLACEHOLDER, () => {
    const body = bodies[i++]!;
    return blocks(body)
      .map((b) => b.join("\n"))
      .join("\n\n");
  });
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const OPERATION = /^## [A-Z]+ \/\S*/m;

const index = await fetchText(INDEX_URL);
const paths = pagePaths(index);
if (paths.length === 0) throw new Error(`${INDEX_URL} lists no ${PREFIX} pages`);

interface Page {
  readonly url: string;
  readonly file: string;
  readonly renderedFromHtml: boolean;
  readonly markdown: string;
}

const pages: Page[] = [];
for (const path of paths) {
  const url = `${ORIGIN}${path}`;
  const twin = await fetchText(`${ORIGIN}/docs/md${path.slice("/docs".length)}`);
  if (!twin.startsWith("---")) throw new Error(`${url}: markdown twin has no front matter`);
  const renderedFromHtml = PLACEHOLDER.test(twin);
  PLACEHOLDER.lastIndex = 0;
  const markdown = renderedFromHtml ? renderReference(twin, await fetchText(url), url) : twin;
  if (path !== PREFIX && !OPERATION.test(markdown)) {
    throw new Error(`${url}: no \`## METHOD /path\` operation found`);
  }
  const file = join("api-reference", path.slice(PREFIX.length), "index.md");
  pages.push({ url, file, renderedFromHtml, markdown: `${markdown.replace(/\s+$/, "")}\n` });
}

await rm(join(SPECS_DIR, "api-reference"), { recursive: true, force: true });
for (const page of pages) {
  const target = join(SPECS_DIR, page.file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, page.markdown);
}
const manifest = {
  source: INDEX_URL,
  pages: pages.map(({ url, file, renderedFromHtml }) => ({ url, file, renderedFromHtml })),
};
await writeFile(join(SPECS_DIR, "_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const operations = pages.reduce(
  (n, p) => n + (p.markdown.match(/^## [A-Z]+ \/\S*/gm)?.length ?? 0),
  0,
);
console.log(
  `✅ ${pages.length} pages (${pages.filter((p) => p.renderedFromHtml).length} rendered from HTML), ${operations} operation headings → ${SPECS_DIR}`,
);
