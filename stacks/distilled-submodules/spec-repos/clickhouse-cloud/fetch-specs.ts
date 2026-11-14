#!/usr/bin/env node
/**
 * Fetches the ClickHouse Cloud OpenAPI spec to ../specs/.
 *
 * ClickHouse Cloud serves ONE OpenAPI 3.1 document from the API itself, at
 * `https://api.clickhouse.cloud/v1` (unauthenticated GET). The docs site
 * republishes a copy at `https://clickhouse.com/docs/_specs/cloud-openapi.json`,
 * but that copy is a build artifact of the docs: it lags the API (fields the
 * API already serves are missing), drops the per-operation `security`
 * permission scopes, and adds docs-renderer `x-mint` keys. The API's own
 * document is the source of truth, so the mirror snapshots that one.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://api.clickhouse.cloud/v1";
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
      "user-agent": "distilled.cloud-clickhouse-cloud-spec-mirror",
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
