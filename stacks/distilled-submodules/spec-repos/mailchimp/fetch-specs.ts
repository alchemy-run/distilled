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
 *   ../specs/marketing.json       Marketing API (v3.0)
 *   ../specs/transactional.json   Transactional API (formerly Mandrill)
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

// `spec/transactional.openapi.json` is the same 99 routes as OpenAPI 3.1; the
// Swagger document is the one that carries the vendor's method names.
const FILES: readonly SpecFile[] = [
  { source: "spec/marketing.json", output: "marketing.json" },
  { source: "spec/transactional.json", output: "transactional.json" },
];

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
    if (spec.swagger !== "2.0" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`swagger: "2.0"\`/\`paths\` — not a Mailchimp API document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    // 2-space indent + trailing newline, so a whitespace-only change upstream
    // produces no diff.
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");

    console.log(
      `  ${file.output}: Swagger ${spec.swagger} — ${Object.keys(spec.paths as object).length} paths`,
    );
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
