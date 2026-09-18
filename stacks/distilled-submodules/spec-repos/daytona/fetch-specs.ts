#!/usr/bin/env bun
/**
 * Fetches Daytona's three published API descriptions to ../specs/.
 *
 * Daytona documents three APIs, each as a JSON file on the docs site (the
 * same documents the API reference renders):
 *
 *   • Platform  — OpenAPI 3.0  (sandboxes, orgs, snapshots, volumes, …)
 *   • Toolbox   — Swagger 2.0  (in-sandbox fs/git/process/computer-use)
 *   • Analytics — Swagger 2.0  (telemetry + usage)
 *
 * There is no git repo we would want to clone: `daytona/clients` also holds
 * these three files, but the docs URLs are the advertised source. The mirror
 * snapshots them as deterministic JSON.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/toolbox-openapi.json
 *   ../specs/analytics-openapi.json
 */

import { mkdirSync } from "fs";

const SPECS_DIR = "../specs";

interface SpecFile {
  /** Absolute URL to fetch. */
  readonly url: string;
  /** Path within ../specs/ to write. */
  readonly output: string;
}

const FILES: SpecFile[] = [
  {
    url: "https://www.daytona.io/docs/openapi.json",
    output: "openapi.json",
  },
  {
    url: "https://www.daytona.io/docs/toolbox-openapi.json",
    output: "toolbox-openapi.json",
  },
  {
    url: "https://www.daytona.io/docs/analytics-openapi.json",
    output: "analytics-openapi.json",
  },
];

mkdirSync(SPECS_DIR, { recursive: true });

const isOpenApi = (spec: Record<string, unknown>): boolean =>
  (typeof spec.openapi === "string" || typeof spec.swagger === "string") &&
  spec.paths !== undefined &&
  typeof spec.paths === "object" &&
  spec.paths !== null;

async function main() {
  for (const file of FILES) {
    console.log(`Fetching ${file.url}...`);

    const response = await fetch(file.url, {
      headers: {
        accept: "application/json",
        "user-agent": "distilled.cloud-daytona-spec-mirror",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${file.url}: ${response.status} ${response.statusText}`,
      );
    }

    const spec = (await response.json()) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid JSON, but it is not an OpenAPI
    // document. Toolbox and Analytics publish Swagger 2.0 (`swagger`), the
    // platform API publishes OAS 3.0 (`openapi`).
    if (!isOpenApi(spec)) {
      throw new Error(
        `${file.url} returned JSON without \`openapi\`/\`swagger\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    // 2-space indent + trailing newline so a whitespace-only change upstream
    // produces no diff.
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");

    const version =
      typeof spec.openapi === "string" ? spec.openapi : spec.swagger;
    console.log(
      `  ${file.output}: OpenAPI ${version} — ${Object.keys(spec.paths as object).length} paths`,
    );
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
