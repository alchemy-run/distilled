#!/usr/bin/env node
/**
 * Fetches the Dokploy OpenAPI spec to ../specs/.
 *
 * Every Dokploy instance serves its OpenAPI document at
 * `/api/settings.getOpenApiDocument`, but only to a signed-in caller. Dokploy's
 * own CI (`.github/workflows/sync-openapi-docs.yml` in Dokploy/dokploy)
 * generates the same document on every push to `canary`/`main` and commits it
 * as `openapi.json` to Dokploy/sdk, the official SDK repository. The mirror
 * downloads that one file from raw.githubusercontent.com; the repository is
 * never cloned.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "Dokploy/sdk";
/** Branch to mirror. */
const REF = "main";
/** Path of the OpenAPI document within {@link REPO}. */
const OPENAPI_PATH = "openapi.json";

const OPENAPI_SPEC_URL = `https://raw.githubusercontent.com/${REPO}/${REF}/${OPENAPI_PATH}`;
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
      "user-agent": "distilled.cloud-dokploy-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: an error page or
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
