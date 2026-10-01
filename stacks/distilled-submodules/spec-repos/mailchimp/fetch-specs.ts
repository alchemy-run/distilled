#!/usr/bin/env bun
/**
 * Mirrors the Mailchimp Marketing API spec into ../specs/.
 *
 * Mailchimp publishes the Swagger 2.0 document its own client libraries are
 * generated from in mailchimp/mailchimp-client-lib-codegen. Only that one
 * file is downloaded, straight from raw.githubusercontent.com — the
 * repository is never cloned.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/marketing.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "mailchimp/mailchimp-client-lib-codegen";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
const SPEC_PATH = "spec/marketing.json";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/marketing.json`;

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  const url = `https://raw.githubusercontent.com/${REPO}/${REF}/${SPEC_PATH}`;
  console.log(`Fetching ${url}...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // A rate-limit body or a gutted response is still valid JSON.
  if (spec.swagger !== "2.0" || spec.paths === undefined) {
    throw new Error(
      `${url} returned JSON without \`swagger: "2.0"\`/\`paths\` — not the Marketing API document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline, so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! Swagger ${spec.swagger} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
