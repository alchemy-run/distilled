#!/usr/bin/env node
/**
 * Mirrors the Sproutboat Cloud API's OpenAPI spec into ../specs/.
 *
 * Sproutboat publishes ONE OpenAPI 3.1 document, as YAML, at
 * https://sproutboat.com/docs/openapi.yaml (the source of its API reference
 * at https://sproutboat.com/docs/api/reference). There is no git repo, so the
 * mirror snapshots that file verbatim; `packages/sproutboat/scripts/convert.ts`
 * parses it.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const OPENAPI_SPEC_URL = "https://sproutboat.com/docs/openapi.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.yaml`;

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  console.log(`Fetching ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: { "user-agent": "distilled.cloud-sproutboat-spec-mirror" },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${OPENAPI_SPEC_URL}: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();

  // Fail here rather than three steps later in the generator: an error page
  // is still a body, but it is not an OpenAPI document.
  if (!/^openapi: ['"]?3\./m.test(text) || !/^paths:/m.test(text)) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned a body without top-level \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
  await writeFile(OUTPUT_PATH, text.endsWith("\n") ? text : `${text}\n`);

  console.log(`Done! ${text.match(/^  \/\S+:$/gm)?.length ?? 0} paths`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
