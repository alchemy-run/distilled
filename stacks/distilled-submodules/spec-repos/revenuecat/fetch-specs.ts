#!/usr/bin/env node
/**
 * Mirrors the RevenueCat REST API v2 OpenAPI document into ../specs/.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved verbatim to:
 *   ../specs/openapi.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

// `openapi-v2.yaml` is the docs landing page and ships `paths: {}`; the
// per-resource files each hold a slice. `openapi-v2-beta.yaml` is the only
// document with every v2 operation, the beta ones marked `x-release-status`.
const OPENAPI_SPEC_URL = "https://www.revenuecat.com/docs/redocusaurus/openapi-v2-beta.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.yaml`;

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: { "user-agent": "distilled.cloud-revenuecat-spec-mirror" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const body = await response.text();
  const spec = YAML.parse(body) as Record<string, unknown> | null;
  const paths = spec?.paths as Record<string, unknown> | undefined;

  if (typeof spec?.openapi !== "string" || paths === undefined || Object.keys(paths).length === 0) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned YAML without \`openapi\`/\`paths\` — not the full v2 document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await writeFile(OUTPUT_PATH, body);

  console.log(`Done! OpenAPI ${spec.openapi} — ${Object.keys(paths).length} paths`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
