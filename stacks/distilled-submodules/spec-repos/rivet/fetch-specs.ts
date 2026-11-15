#!/usr/bin/env node
/**
 * Mirrors the Rivet engine's OpenAPI spec into ../specs/.
 *
 * Only the 1 file the distilled rivet generator reads is downloaded, straight
 * from raw.githubusercontent.com — the upstream repository is never cloned.
 *
 * The spec is pinned to a release tag: Rivet's `main` branch still carries the
 * 2.x API, while the 3.0 API (node pools, namespaces) ships on the 3.0 tags.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "rivet-dev/rivet";
/** Release tag to mirror. */
const REF = "v3.0.0-preview.4";
/** Path within {@link REPO}. */
const PATH = "engine/artifacts/openapi.json";

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  const url = `https://raw.githubusercontent.com/${REPO}/${REF}/${PATH}`;
  console.log(`Fetching ${url}...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const spec = (await response.json()) as { openapi?: unknown; paths?: unknown };
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(`${url} is not an OpenAPI document`);
  }

  const outputPath = `${SPECS_DIR}/openapi.json`;
  console.log(`Writing ${outputPath}...`);
  await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
