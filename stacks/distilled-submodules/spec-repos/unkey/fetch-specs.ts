#!/usr/bin/env node
/**
 * Mirrors Unkey's OpenAPI spec and vendor API docs into ../specs/.
 *
 * The Unkey API serves its bundled OpenAPI 3.1 document at
 * https://api.unkey.com/openapi.yaml. Unkey's own SDKs (`unkeyed/sdks`,
 * `.speakeasy/workflow.yaml`) generate from the same URL. The `unkeyed/unkey`
 * repository that used to hold this file is no longer public.
 * YAML is parsed and rewritten as deterministic JSON so a whitespace-only
 * change upstream produces no mirror diff.
 *
 * API-reference docs are snapshotted as markdown next to the spec so generate
 * never crawls the live docs site.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/docs/llms.txt
 *   ../specs/docs/api-reference/*.md
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

/** The bundled OpenAPI document, as served by the Unkey API. */
const SPEC_URL = "https://api.unkey.com/openapi.yaml";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

const DOCS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://www.unkey.com/docs/llms.txt",
    output: "docs/llms.txt",
  },
  {
    url: "https://www.unkey.com/docs/api-reference/overview.md",
    output: "docs/api-reference/overview.md",
  },
  {
    url: "https://www.unkey.com/docs/api-reference/auth.md",
    output: "docs/api-reference/auth.md",
  },
  {
    url: "https://www.unkey.com/docs/api-reference/errors.md",
    output: "docs/api-reference/errors.md",
  },
  {
    url: "https://www.unkey.com/docs/api-reference/rpc.md",
    output: "docs/api-reference/rpc.md",
  },
];

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(`${SPECS_DIR}/docs/api-reference`, { recursive: true });

const headers = {
  accept: "text/yaml, application/yaml, text/plain, text/markdown, */*",
  "user-agent": "distilled.cloud-unkey-spec-mirror",
};

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

async function main() {
  const url = SPEC_URL;
  console.log(`Fetching OpenAPI spec from ${url}...`);

  const yaml = await fetchText(url);
  const spec = YAML.parse(yaml) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page
  // or a gutted response is still valid YAML, but it is not an OpenAPI
  // document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(`${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`);
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const body = await fetchText(doc.url);
    if (body.trim().length === 0 || /^\s*<(!DOCTYPE|html)/i.test(body)) {
      throw new Error(`${doc.url} returned an empty or HTML body — not vendor docs`);
    }
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, body.endsWith("\n") ? body : body + "\n");
  }

  console.log(`Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
