#!/usr/bin/env node
/**
 * Mirrors Clerk's Backend API and Platform API OpenAPI specs into ../specs/.
 *
 * Only the files the distilled clerk generator reads are downloaded,
 * straight from raw.githubusercontent.com — the upstream repository is
 * never cloned, so the mirror stays exactly as large as the spec itself.
 *
 * Clerk publishes dated Backend API snapshots under `bapi/` and the Platform
 * API under `platform/` in clerk/openapi-specs. This script pins the latest
 * dated Backend API version plus the Platform API and writes each as
 * deterministic JSON.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json   (Backend API)
 *   ../specs/platform.json  (Platform API)
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import YAML from "yaml";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "clerk/openapi-specs";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

const SPECS_DIR = "../specs";

/** Documents to mirror: `src` within {@link REPO}, `out` within {@link SPECS_DIR}. */
const SPECS: ReadonlyArray<{ readonly src: string; readonly out: string }> = [
  // Dated Backend API snapshot.
  { src: "bapi/2026-05-12.yml", out: "openapi.json" },
  // Platform API (workspace-key authenticated).
  { src: "platform/beta.yml", out: "platform.json" },
];

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * The raw URL for a path in {@link REPO}. Each segment is encoded
 * individually so paths containing characters like `(` survive the round
 * trip while the separators do not.
 */
const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

async function fetchSpec(src: string, out: string) {
  const url = rawUrl(src);
  console.log(`Fetching ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/yaml, text/yaml, application/json, text/plain",
      "user-agent": "distilled.cloud-clerk-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  const spec = YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still parseable YAML, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(`${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`);
  }

  const outputPath = `${SPECS_DIR}/${out}`;
  console.log(`Writing ${outputPath}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff. YAML dates stringify as ISO strings, which is stable.
  await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! ${out}: OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function main() {
  for (const { src, out } of SPECS) {
    await fetchSpec(src, out);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
