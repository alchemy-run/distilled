#!/usr/bin/env bun
/**
 * Mirrors the GitHub API specs into ../specs/.
 *
 * Only the 2 files the distilled github generators actually read are
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repositories are never cloned, so the mirror stays exactly as large as the
 * specs themselves.
 *
 * The GraphQL schema is the SDL GitHub publishes for its docs site rather
 * than an introspection result: introspecting api.github.com needs a token,
 * the SDL does not, and the two describe the same public schema.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/api.github.com.json
 *   ../specs/schema.docs.graphql
 */

import { mkdirSync } from "fs";

interface SpecFile {
  /** Upstream repository, as `<owner>/<repo>`. */
  repo: string;
  /** Branch (or tag/commit) to mirror. */
  ref: string;
  /** Path within {@link repo}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [
  {
    repo: "github/rest-api-description",
    ref: "main",
    path: "descriptions/api.github.com/api.github.com.json",
    output: "api.github.com.json",
  },
  {
    repo: "github/docs",
    ref: "main",
    path: "src/graphql/data/fpt/schema.docs.graphql",
    output: "schema.docs.graphql",
  },
];

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * The raw URL for a mirrored file. Each path segment is encoded individually
 * so paths containing characters like `(` survive the round trip while the
 * separators do not.
 */
const rawUrl = (file: SpecFile) =>
  `https://raw.githubusercontent.com/${file.repo}/${file.ref}/${file.path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file);
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
