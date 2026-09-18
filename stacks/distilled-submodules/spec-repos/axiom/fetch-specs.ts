#!/usr/bin/env bun
/**
 * Mirrors the Axiom API spec into ../specs/.
 *
 * Only the 3 files the distilled axiom generator actually reads
 * are downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/restapi/versions/v2.json
 *   ../specs/restapi/versions/v1-edge-ingest.json
 *   ../specs/restapi/versions/v1-edge-query.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "axiomhq/docs";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [
  {
    path: "content/docs/(api-reference)/restapi/versions/v2.json",
    output: "restapi/versions/v2.json",
  },
  {
    path: "content/docs/(api-reference)/restapi/versions/v1-edge-ingest.json",
    output: "restapi/versions/v1-edge-ingest.json",
  },
  {
    path: "content/docs/(api-reference)/restapi/versions/v1-edge-query.json",
    output: "restapi/versions/v1-edge-query.json",
  },
];

const SPECS_DIR = "../specs";

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

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file.path);
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, await response.arrayBuffer());
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
