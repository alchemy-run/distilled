#!/usr/bin/env node
/**
 * Mirrors the Convex API specs into ../specs/.
 *
 * Only the 3 files the distilled convex generator actually reads are
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * specs themselves.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/management-openapi.json
 *   ../specs/deployment-openapi.json
 *   ../specs/public-deployment-openapi.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "convex/convex-backend";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** Directory within {@link REPO} holding the specs. */
const DIR = "npm-packages/@convex-dev/platform";

interface SpecFile {
  /** File name within {@link DIR}, and within ../specs/. */
  name: string;
  /** Fewest operations a real copy of this document can hold. */
  minOperations: number;
}

const FILES: SpecFile[] = [
  { name: "management-openapi.json", minOperations: 40 },
  { name: "deployment-openapi.json", minOperations: 20 },
  { name: "public-deployment-openapi.json", minOperations: 5 },
];

const SPECS_DIR = "../specs";
const METHODS = ["get", "post", "put", "patch", "delete"];

mkdirSync(SPECS_DIR, { recursive: true });

const rawUrl = (name: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${DIR}/${name}`
    .split("/")
    .map((segment, index) => (index < 3 ? segment : encodeURIComponent(segment)))
    .join("/");

const countOperations = (spec: any): number =>
  Object.values<any>(spec.paths).reduce(
    (total, item) => total + METHODS.filter((method) => item[method] !== undefined).length,
    0,
  );

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file.name);
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const spec = (await response.json()) as any;
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(`${url} is not an OpenAPI document`);
    }
    const operations = countOperations(spec);
    if (operations < file.minOperations) {
      throw new Error(`${url} has ${operations} operations, expected ${file.minOperations}+`);
    }

    const outputPath = `${SPECS_DIR}/${file.name}`;
    console.log(`Writing ${outputPath} (${operations} operations)...`);
    await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
