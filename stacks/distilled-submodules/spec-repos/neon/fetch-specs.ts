#!/usr/bin/env bun
/**
 * Fetches the Neon OpenAPI spec to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://neon.com/api_spec/release/v2.json";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

import { existsSync, mkdirSync } from "fs";

export function serializeSpec(spec: unknown): string {
  if (
    spec === null ||
    typeof spec !== "object" ||
    !("openapi" in spec) ||
    typeof spec.openapi !== "string" ||
    !("paths" in spec) ||
    spec.paths === null ||
    typeof spec.paths !== "object" ||
    Array.isArray(spec.paths) ||
    Object.keys(spec.paths).length === 0
  ) {
    throw new Error("Neon response is not a nonempty OpenAPI document");
  }
  return JSON.stringify(spec, null, 2) + "\n";
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
  }

  const serialized = serializeSpec(await response.json());
  if (!existsSync(SPECS_DIR)) {
    mkdirSync(SPECS_DIR, { recursive: true });
  }
  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, serialized);

  console.log("Done!");
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
