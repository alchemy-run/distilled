#!/usr/bin/env node
/**
 * Fetches the HydraDB v2 OpenAPI spec to ../specs/.
 *
 * HydraDB publishes ONE OpenAPI 3.1 document for its v2 API, the file its
 * API reference (`https://docs.hydradb.com/api-reference/v2`) renders and
 * the official Fern SDKs (`@hydradb/sdk`, `hydra-db`) are generated from
 * (it carries their `x-fern-*` extensions). There is no git repo and no
 * versioned URL, so the mirror simply snapshots it.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://docs.hydradb.com/api-reference/v2/openapi.json";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-hydradb-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a rate-limit
  // body or a gutted response is still valid JSON, but it is not an OpenAPI
  // document.
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
