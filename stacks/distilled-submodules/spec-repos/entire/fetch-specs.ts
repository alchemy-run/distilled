#!/usr/bin/env node
/**
 * Fetches the Entire OpenAPI specs to ../specs/.
 *
 * Entire serves two OpenAPI 3.1 documents, one per plane:
 *
 * - `core.json` — the Core control plane (identity, orgs, projects, repos,
 *   mirrors, service accounts), served by every home-region console.
 * - `cell.json` — the cell data plane (trails, sessions, checkpoints, search,
 *   environments, agents), served by every regional cell.
 *
 * Both are snapshotted from the US region. A third document at
 * `https://entire.com/api/openapi.json` describes the web app's own backend
 * and duplicates these two, so it is not mirrored.
 *
 * Usage:
 *   node fetch-specs.ts
 */
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

const SPECS_DIR = "../specs";

const SPECS = [
  { file: "core.json", url: "https://us.console.entire.io/api/v1/openapi.json" },
  { file: "cell.json", url: "https://aws-us-east-2.api.entire.io/api/v1/openapi.json" },
] as const;

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function fetchSpec(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-entire-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const spec = (await response.json()) as Record<string, unknown>;
  // A login page or a gutted response is still valid JSON, but it is not an
  // OpenAPI document — fail here rather than in the generator.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(`${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`);
  }
  return spec;
}

async function main() {
  for (const { file, url } of SPECS) {
    console.log(`Fetching ${url}...`);
    const spec = await fetchSpec(url);
    const output = `${SPECS_DIR}/${file}`;
    // 2-space indent + trailing newline so a whitespace-only change upstream
    // produces no diff.
    await writeFile(output, JSON.stringify(spec, null, 2) + "\n");
    console.log(
      `Wrote ${output}: OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
    );
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
