#!/usr/bin/env node
/**
 * Fetches the Coinflow OpenAPI spec to ../specs/.
 *
 * Coinflow publishes ONE OpenAPI 3.1 document — the same file its API
 * reference (https://docs.coinflow.cash/api-reference) renders. There is no
 * git repo and no versioned URL, so the mirror simply snapshots it.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://docs.coinflow.cash/openapi.json";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-coinflow-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // A login page or a gutted response is still valid JSON, but it is not an
  // OpenAPI document.
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
