#!/usr/bin/env node
/**
 * Mirrors the Mollie API's OpenAPI spec into ../specs/.
 *
 * Mollie publishes ONE OpenAPI 3.1 document for its public API, `specs.yaml`
 * in https://github.com/mollie/openapi. Only that file is downloaded,
 * straight from raw.githubusercontent.com, and committed verbatim as YAML;
 * `packages/mollie/scripts/convert.ts` parses it.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/specs.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "mollie/openapi";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** Path within {@link REPO}, and within ../specs/. */
const FILE = "specs.yaml";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/${FILE}`;

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  const url = `https://raw.githubusercontent.com/${REPO}/${REF}/${FILE}`;
  console.log(`Fetching ${url}...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();

  // Fail here rather than three steps later in the generator: an error page
  // is still a body, but it is not an OpenAPI document.
  if (!/^openapi: ['"]?3\./m.test(text) || !/^paths:/m.test(text)) {
    throw new Error(
      `${url} returned a body without top-level \`openapi\`/\`paths\` — not an OpenAPI document`,
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
