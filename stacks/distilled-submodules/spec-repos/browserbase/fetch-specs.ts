#!/usr/bin/env node
/**
 * Fetches the Browserbase API's OpenAPI spec to ../specs/.
 *
 * Browserbase publishes ONE OpenAPI 3.0 document, linked from its API
 * reference (https://docs.browserbase.com/reference/introduction):
 * https://docs.browserbase.com/reference/api/openapi.v1.yaml. There is no
 * git repo and no versioned URL, so the mirror snapshots it verbatim as
 * YAML; `packages/browserbase/scripts/convert.ts` parses it.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.v1.yaml
 */

const OPENAPI_SPEC_URL = "https://docs.browserbase.com/reference/api/openapi.v1.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.v1.yaml`;

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: { "user-agent": "distilled.cloud-browserbase-spec-mirror" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();

  // Fail here rather than three steps later in the generator: a docs page or
  // an error body is still a 200, but it is not an OpenAPI document.
  if (!/^openapi: ['"]?3\./m.test(text) || !/^paths:/m.test(text)) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned a body without top-level \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await writeFile(OUTPUT_PATH, text.endsWith("\n") ? text : `${text}\n`);

  console.log(`Done! ${text.match(/^  \/\S+:$/gm)?.length ?? 0} paths`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
