#!/usr/bin/env node
/**
 * Fetches the Slack Web API reference as JSON to ../specs/.
 *
 * Slack has no published OpenAPI document (github.com/slackapi/slack-api-specs
 * froze in 2020), but docs.slack.dev serves a JSON twin of most reference
 * pages at the page URL plus `.json`:
 *
 *   index:  https://docs.slack.dev/reference/methods.json
 *   method: https://docs.slack.dev/reference/methods/<name>.json
 *
 * This mirror snapshots the method index, every method's twin, and the
 * site-level scope, type and object lists:
 *
 *   ../specs/methods.json            the method index
 *   ../specs/methods/<name>.json     one file per method
 *   ../specs/scopes.json             OAuth scope reference
 *   ../specs/types.json              workflow-token type reference
 *   ../specs/objects.json            object reference index
 *   ../specs/_manifest.json          every page URL → file
 *
 * Every file is re-serialized with a 2-space indent and a trailing newline,
 * so whitespace-only upstream changes produce no commit. Method pages drop
 * their `examples` block: the generator never reads it, and some examples
 * embed realistic third-party credentials that GitHub push protection
 * rejects. A method page that fails to download is skipped with a warning,
 * keeping its previous copy; the run fails if more than 5% fail.
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { mkdirSync, readdirSync, rmSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

const ORIGIN = "https://docs.slack.dev";
const SPECS_DIR = "../specs";
const METHODS_DIR = join(SPECS_DIR, "methods");
const CONCURRENCY = 12;
const MAX_FAILURE_RATIO = 0.05;

async function fetchJson(url: string): Promise<unknown> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "distilled.cloud-slack-spec-mirror",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return JSON.parse(await res.text());
    } catch (e) {
      if (attempt >= 3) throw new Error(`Failed to fetch ${url}: ${(e as Error).message}`);
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

const save = (file: string, json: unknown) => writeFile(file, JSON.stringify(json, null, 2) + "\n");

async function main() {
  mkdirSync(METHODS_DIR, { recursive: true });

  const indexUrl = `${ORIGIN}/reference/methods.json`;
  console.log(`Fetching method index from ${indexUrl}...`);
  const index = await fetchJson(indexUrl);
  if (!Array.isArray(index) || index.length === 0) {
    throw new Error(`${indexUrl} did not return a non-empty JSON array`);
  }
  const names = (index as Array<{ name: string }>).map((m) => m.name);
  console.log(`  ${names.length} methods`);

  const siteLists = [
    { url: `${ORIGIN}/reference/scopes.json`, file: "scopes.json" },
    { url: `${ORIGIN}/types.json`, file: "types.json" },
    { url: `${ORIGIN}/objects.json`, file: "objects.json" },
  ];
  const methodPages = names.map((name) => ({
    url: `${ORIGIN}/reference/methods/${name}.json`,
    file: `methods/${name}.json`,
  }));
  const pages = [...siteLists, ...methodPages];

  let failed = 0;
  let next = 0;
  const worker = async () => {
    while (next < pages.length) {
      const page = pages[next++]!;
      try {
        const json = await fetchJson(page.url);
        if (json !== null && typeof json === "object" && !Array.isArray(json)) {
          delete (json as Record<string, unknown>).examples;
        }
        await save(join(SPECS_DIR, page.file), json);
      } catch (e) {
        failed++;
        console.warn(`  ⚠️  ${(e as Error).message} — keeping the previous copy`);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  if (failed / pages.length > MAX_FAILURE_RATIO) {
    throw new Error(`${failed} of ${pages.length} pages failed — refusing to commit`);
  }

  // Methods Slack removed from the index.
  const keep = new Set(names.map((n) => `${n}.json`));
  for (const f of readdirSync(METHODS_DIR)) {
    if (!keep.has(f)) rmSync(join(METHODS_DIR, f));
  }

  await save(join(SPECS_DIR, "methods.json"), index);
  await save(join(SPECS_DIR, "_manifest.json"), {
    source: ORIGIN,
    count: pages.length,
    pages: pages.map((p) => ({ url: p.url, file: p.file })),
  });
  console.log(`Done: ${pages.length - failed} saved, ${failed} failed.`);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
