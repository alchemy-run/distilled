#!/usr/bin/env node
/**
 * Mirrors NetBird's management API spec into ../specs/.
 *
 * Only the 1 file the distilled netbird generator reads is downloaded, straight
 * from raw.githubusercontent.com — the upstream repository is never cloned.
 *
 * The spec is pinned to a release tag. NetBird's `main` branch carries API
 * changes that no released management server has yet, and the document's own
 * `info.version` is always `0.0.1`, so the tag is the only version there is.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.yml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "netbirdio/netbird";
/** Release tag to mirror. */
const REF = "v0.82.0";
/** Path within {@link REPO}. */
const PATH = "shared/management/http/api/openapi.yml";

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  const url = `https://raw.githubusercontent.com/${REPO}/${REF}/${PATH}`;
  console.log(`Fetching ${url}...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  // The spec is YAML and is mirrored as published; the generator parses it.
  // A rate-limit page or a moved file is still text, so check the shape.
  const text = await response.text();
  if (!/^openapi: 3\./m.test(text) || !/^paths:$/m.test(text)) {
    throw new Error(`${url} is not an OpenAPI 3 document`);
  }

  const outputPath = `${SPECS_DIR}/openapi.yml`;
  console.log(`Writing ${outputPath}...`);
  await writeFile(outputPath, text);

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
