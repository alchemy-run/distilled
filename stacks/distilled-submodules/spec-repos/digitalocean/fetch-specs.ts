#!/usr/bin/env node
/**
 * Fetches DigitalOcean's public OpenAPI spec and the Apache OpenWhisk API
 * spec to ../specs/.
 *
 * DigitalOcean publishes ONE bundled OpenAPI 3.0 document — the same file its
 * documentation site and GitHub README link as the CI artifact. The source
 * tree under digitalocean/openapi is split; this mirror snapshots the
 * bundled YAML, parsed and written as JSON so a whitespace-only change
 * upstream produces no diff.
 *
 * DigitalOcean Functions run on Apache OpenWhisk: each Functions namespace
 * serves the OpenWhisk REST API at its own `api_host`. DigitalOcean does not
 * publish a spec for that API; Apache does, as the Swagger 2.0 document the
 * OpenWhisk controller serves (core/controller/src/main/resources).
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json    (DigitalOcean API)
 *   ../specs/openwhisk.json  (OpenWhisk API, Swagger 2.0)
 */

const SPECS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://api-engineering.nyc3.digitaloceanspaces.com/spec-ci/DigitalOcean-public.v2.yaml",
    output: "openapi.json",
  },
  {
    url: "https://raw.githubusercontent.com/apache/openwhisk/master/core/controller/src/main/resources/apiv1swagger.json",
    output: "openwhisk.json",
  },
];
const SPECS_DIR = "../specs";

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function fetchSpec(url: string, output: string): Promise<void> {
  console.log(`Fetching ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/yaml, text/yaml, application/json, text/plain",
      "user-agent": "distilled.cloud-digitalocean-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  // YAML is a superset of JSON, so one parser reads both documents.
  const spec = YAML.parse(await response.text()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML/JSON, but it is not an API description.
  const version = spec.openapi ?? spec.swagger;
  if (typeof version !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned a document without \`openapi\`/\`swagger\` and \`paths\` — not an API description`,
    );
  }

  const outputPath = `${SPECS_DIR}/${output}`;
  console.log(`Writing ${outputPath}...`);
  await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
  console.log(`  ${version} — ${Object.keys(spec.paths as object).length} paths`);
}

async function main() {
  for (const { url, output } of SPECS) await fetchSpec(url, output);
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
