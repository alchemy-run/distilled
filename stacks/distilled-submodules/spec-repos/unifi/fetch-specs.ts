#!/usr/bin/env node
/**
 * Fetches the UniFi OpenAPI specs to ../specs/.
 *
 * developer.ui.com publishes one OpenAPI document per API, per release, at
 * `https://developer.ui.com/<api>/v<version>/openapi.json`. There is no
 * "latest" alias, so the mirror pins a release per API; bump `APIS` when a
 * newer one ships (the version is the first path segment's link on
 * `https://developer.ui.com/<api>`).
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/<api>.json
 */

const APIS = [
  { name: "network", version: "11.0.97" },
  { name: "protect", version: "7.4.102" },
  { name: "innerspace", version: "1.3.23" },
  { name: "mobility", version: "1.0.0" },
  { name: "site-manager", version: "1.0.0" },
  { name: "carrier-fabric", version: "1.0.0" },
] as const;
const SPECS_DIR = "../specs";

import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function fetchSpec({ name, version }: (typeof APIS)[number]) {
  const url = `https://developer.ui.com/${name}/v${version}/openapi.json`;
  const outputPath = `${SPECS_DIR}/${name}.json`;
  console.log(`Fetching ${name} OpenAPI spec from ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-unifi-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(`${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`);
  }

  // 2-space indent + trailing newline, so a whitespace-only change upstream
  // produces no diff.
  await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `Wrote ${outputPath}: OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function main() {
  for (const api of APIS) await fetchSpec(api);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
