#!/usr/bin/env node
/**
 * Mirrors Starburst Galaxy's public OpenAPI specs into ../specs/.
 *
 * Starburst publishes the Galaxy REST API as OpenAPI 3.0 documents served by
 * the Galaxy control plane itself (the documents its API reference at
 * https://docs.starburst.io/starburst-galaxy/developer-tools/api renders).
 * There is no git repo, so the mirror snapshots them:
 *
 *   • `v1` — "Starburst Public API": clusters, catalogs, roles, privileges,
 *     service accounts, tags, policies, data quality, ingest, ….
 *   • `v2` — "Starburst Galaxy Public API": Data Products, whose `v1`
 *     operations are deprecated in favour of these.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/v1.json
 *   ../specs/v2.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const BASE = "https://galaxy.starburst.io/public/openapi";

/** Version → a path the document must contain (guards against a wrong or gutted body). */
const DOCUMENTS = {
  v1: "/public/api/v1/cluster",
  v2: "/public/api/v2/dataProduct",
} as const;

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  for (const [version, requiredPath] of Object.entries(DOCUMENTS)) {
    const url = `${BASE}/${version}/json`;
    console.log(`Fetching ${url}...`);
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": "distilled.cloud-starburst-galaxy-spec-mirror",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const spec = (await response.json()) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid JSON, but it is not an OpenAPI
    // document.
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }
    if (!Object.keys(spec.paths as object).includes(requiredPath)) {
      throw new Error(`${url} has no ${requiredPath} path — not the Galaxy ${version} API`);
    }

    const outputPath = `${SPECS_DIR}/${version}.json`;
    console.log(
      `Writing ${outputPath} (OpenAPI ${spec.openapi}, ${Object.keys(spec.paths as object).length} paths)...`,
    );
    // 2-space indent + trailing newline so a whitespace-only change upstream
    // produces no diff.
    await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
