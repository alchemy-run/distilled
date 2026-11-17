#!/usr/bin/env node
/**
 * Fetches the Mux API OpenAPI spec to ../specs/.
 *
 * Mux publishes its REST API (api.mux.com — Video, Data, System and Robots)
 * as ONE OpenAPI 3.1 document, the same file its API reference renders and
 * its official SDKs are generated from. There is no git repo and no
 * versioned URL, so the mirror simply snapshots it.
 *
 * Mux also publishes `full-combined-spec.json` (this document plus the
 * image.mux.com and stream.mux.com delivery URLs), `image-spec.json`,
 * `stream-spec.json` and the AsyncAPI `webhook-spec.json`. The generator
 * reads only the REST API, so only that document is mirrored.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/api-spec.json
 */

const OPENAPI_SPEC_URL = "https://www.mux.com/api-spec.json";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/api-spec.json`;

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-mux-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline, so a whitespace-only change upstream
  // produces no diff.
  await writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(`Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
