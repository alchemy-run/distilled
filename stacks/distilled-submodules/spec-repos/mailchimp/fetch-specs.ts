#!/usr/bin/env bun
/**
 * Mirrors Mailchimp's API documents into ../specs/.
 *
 * Mailchimp publishes the Swagger 2.0 documents its own client libraries are
 * generated from in mailchimp/mailchimp-client-lib-codegen. Only those files
 * are downloaded, straight from raw.githubusercontent.com — the repository
 * is never cloned.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/marketing.json               Marketing API (v3.0), Swagger 2.0
 *   ../specs/transactional.json           Transactional API (formerly
 *   ../specs/transactional.openapi.json   Mandrill), Swagger 2.0 + OpenAPI 3.1
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "mailchimp/mailchimp-client-lib-codegen";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

const SPECS_DIR = "../specs";

interface SpecFile {
  /** Path within the upstream repository. */
  readonly source: string;
  /** Path within ../specs/ to write. */
  readonly output: string;
}

// The two Transactional documents describe the same 99 routes. The Swagger
// one carries the vendor's method names and the request/response shapes the
// generator reads; the OpenAPI 3.1 one is the only place the per-route error
// responses are declared.
const FILES: readonly SpecFile[] = [
  { source: "spec/marketing.json", output: "marketing.json" },
  { source: "spec/transactional.json", output: "transactional.json" },
  {
    source: "spec/transactional.openapi.json",
    output: "transactional.openapi.json",
  },
];

const isApiDocument = (spec: Record<string, unknown>): boolean =>
  (spec.swagger === "2.0" || typeof spec.openapi === "string") &&
  typeof spec.paths === "object" &&
  spec.paths !== null;

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  for (const file of FILES) {
    const url = `https://raw.githubusercontent.com/${REPO}/${REF}/${file.source}`;
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    }

    const spec = (await response.json()) as Record<string, unknown>;

    // A rate-limit body or a gutted response is still valid JSON.
    if (!isApiDocument(spec)) {
      throw new Error(
        `${url} returned JSON without \`swagger\`/\`openapi\` and \`paths\` — not a Mailchimp API document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    // 2-space indent + trailing newline, so a whitespace-only change upstream
    // produces no diff.
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");

    const version =
      typeof spec.openapi === "string"
        ? `OpenAPI ${spec.openapi}`
        : `Swagger ${spec.swagger}`;
    console.log(
      `  ${file.output}: ${version} — ${Object.keys(spec.paths as object).length} paths`,
    );
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
