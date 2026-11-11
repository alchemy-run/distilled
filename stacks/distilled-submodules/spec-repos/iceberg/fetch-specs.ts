#!/usr/bin/env node
/**
 * Mirrors the Apache Iceberg REST Catalog API spec into ../specs/.
 *
 * Only the 1 file the distilled iceberg generator actually reads
 * is downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/rest-catalog-open-api.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "apache/iceberg";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [
  { path: "open-api/rest-catalog-open-api.yaml", output: "rest-catalog-open-api.yaml" },
];

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * The raw URL for a path in {@link REPO}. Each segment is encoded
 * individually so paths containing characters like `(` survive the round
 * trip while the separators do not.
 */
const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

/**
 * The document is YAML and mirrored verbatim (the package's convert.ts
 * parses it). This is a cheap shape check that rejects an HTML error page
 * or a truncated body before it reaches the mirror.
 */
const looksLikeTheSpec = (text: string) =>
  /^openapi: 3\./m.test(text) && /^paths:/m.test(text) && /\/v1\/config:/.test(text);

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file.path);
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!looksLikeTheSpec(text)) {
      throw new Error(`${url} did not return the Iceberg REST Catalog OpenAPI document`);
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, text);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
