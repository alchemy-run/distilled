#!/usr/bin/env node
/**
 * Fetches the OpenSearch OpenAPI spec to ../specs/.
 *
 * The OpenSearch project publishes its API description as many YAML files in
 * opensearch-project/opensearch-api-specification and merges them into one
 * OpenAPI 3.1 document on every push to `main`. The merged document is
 * served from the project's GitHub Pages site; the official clients are
 * generated from the same file. The `main-latest` release asset is not used:
 * it is rebuilt only on a manual release.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved verbatim to:
 *   ../specs/opensearch-openapi.yaml
 */

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

const OPENAPI_SPEC_URL =
  "https://opensearch-project.github.io/opensearch-api-specification/opensearch-openapi.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/opensearch-openapi.yaml`;

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: { "user-agent": "distilled.cloud-opensearch-spec-mirror" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const body = await response.text();
  const spec = YAML.parse(body) as Record<string, unknown> | null;

  // Fail here rather than three steps later in the generator: an error page
  // still parses as YAML, but it is not an OpenAPI document.
  if (spec === null || typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await writeFile(OUTPUT_PATH, body.endsWith("\n") ? body : `${body}\n`);

  console.log(`Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
