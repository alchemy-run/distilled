#!/usr/bin/env node
/**
 * Fetch every page of the Twitch API reference as Markdown into ../specs.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Twitch publishes no machine-readable description of the Helix API; the
 * reference at https://dev.twitch.tv/docs/api/reference/ is the spec. Every
 * docs page has a Markdown twin, `<page>.md`. The twin of the reference index,
 * https://dev.twitch.tv/docs/api/reference.md, links every resource page
 * (`/docs/api/reference/<resource>.md#<operation>`), and each resource page
 * documents its operations in one fixed shape:
 *
 *   ## <Operation name> {#<anchor>}
 *   ### Endpoint        `METHOD https://api.twitch.tv/helix/<path>`
 *   ### Authorization   the token type and scopes
 *   ### Query Parameters / Request Body / Response Body
 *                       `- \`name\` — Type[, **Required**][, Nullable]. Description`
 *   ### Response Codes  `- **200 OK** — ...`
 *
 * Files mirror the URL path:
 *   page: https://dev.twitch.tv/docs/api/reference/chat.md
 *   file: ../specs/api/reference/chat.md
 *
 * `../specs/_manifest.json` records the index and every page URL with its file.
 * The script fails, writing nothing, when the index links no page, a page is
 * missing, or a page has no `### Endpoint` section.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const ORIGIN = "https://dev.twitch.tv";
const INDEX_URL = `${ORIGIN}/docs/api/reference.md`;
const PAGE = /https:\/\/dev\.twitch\.tv(\/docs\/api\/reference\/[a-z0-9-]+\.md)/g;
const SPECS_DIR = resolve(import.meta.dirname, "..", "specs");

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, { headers: { "user-agent": "spec-mirror-twitch" } });
  if (!response.ok) throw new Error(`GET ${url} -> ${response.status}`);
  return response.text();
};

interface Page {
  readonly url: string;
  readonly file: string;
  readonly markdown: string;
}

const index = await fetchText(INDEX_URL);
if (!index.startsWith("# API Reference")) {
  throw new Error(`${INDEX_URL}: not the API reference index`);
}
const paths = [...new Set([...index.matchAll(PAGE)].map((m) => m[1]!))].sort();
if (paths.length === 0) throw new Error(`${INDEX_URL} links no reference page`);

const pages: Page[] = [];
for (const path of paths) {
  const url = `${ORIGIN}${path}`;
  const markdown = await fetchText(url);
  const operations = markdown.match(/^### Endpoint$/gm)?.length ?? 0;
  if (operations === 0) throw new Error(`${url}: no \`### Endpoint\` section`);
  const file = join("api", path.slice("/docs/api/".length));
  pages.push({ url, file, markdown: `${markdown.replace(/\s+$/, "")}\n` });
}

await rm(join(SPECS_DIR, "api"), { recursive: true, force: true });
await mkdir(join(SPECS_DIR, "api"), { recursive: true });
await writeFile(join(SPECS_DIR, "api", "reference.md"), `${index.replace(/\s+$/, "")}\n`);
for (const page of pages) {
  const target = join(SPECS_DIR, page.file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, page.markdown);
}
const manifest = {
  source: INDEX_URL,
  pages: pages.map(({ url, file }) => ({ url, file })),
};
await writeFile(join(SPECS_DIR, "_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const operations = pages.reduce(
  (n, p) => n + (p.markdown.match(/^### Endpoint$/gm)?.length ?? 0),
  0,
);
console.log(`ok: ${pages.length} pages, ${operations} operations -> ${SPECS_DIR}`);
