#!/usr/bin/env node
/**
 * Fetches the Bitbucket Cloud REST API OpenAPI spec to ../specs/.
 *
 * Atlassian publishes ONE OpenAPI 3 document for the Bitbucket Cloud REST
 * API (`https://api.bitbucket.org/2.0`): the file its developer site
 * (https://developer.atlassian.com/cloud/bitbucket/rest/) renders and offers
 * for download. The same API is also served as Swagger 2.0 at
 * https://api.bitbucket.org/swagger.json; the OpenAPI 3 form is the one
 * mirrored. There is no git repo and no versioned URL, so the mirror simply
 * snapshots it.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://dac-static.atlassian.com/cloud/bitbucket/swagger.v3.json";
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
      "user-agent": "distilled.cloud-bitbucket-spec-mirror",
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
