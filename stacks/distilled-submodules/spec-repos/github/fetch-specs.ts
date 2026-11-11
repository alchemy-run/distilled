#!/usr/bin/env node
/**
 * Mirrors the GitHub API specs into ../specs/.
 *
 * Only the files the distilled github generator actually reads are
 * downloaded — the upstream repository is never cloned, so the mirror stays
 * exactly as large as the specs themselves.
 *
 * - The REST description, straight from raw.githubusercontent.com.
 * - The GraphQL schema GitHub publishes for github.com (SDL), converted to
 *   the introspection JSON the generator reads. Introspecting
 *   api.github.com/graphql directly would need a token.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/api.github.com.json
 *   ../specs/graphql.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { buildSchema, introspectionFromSchema } from "graphql";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "github/rest-api-description";
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
    path: "descriptions/api.github.com/api.github.com.json",
    output: "api.github.com.json",
  },
];

/** GitHub's public GraphQL schema for github.com (Free, Pro and Team). */
const GRAPHQL_SCHEMA_URL = "https://docs.github.com/public/fpt/schema.docs.graphql";

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
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, new Uint8Array(await response.arrayBuffer()));
  }

  console.log(`Fetching ${GRAPHQL_SCHEMA_URL}...`);
  const response = await fetch(GRAPHQL_SCHEMA_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${GRAPHQL_SCHEMA_URL}: ${response.status} ${response.statusText}`,
    );
  }
  const introspection = introspectionFromSchema(buildSchema(await response.text()));
  console.log(`Writing ${SPECS_DIR}/graphql.json...`);
  await writeFile(`${SPECS_DIR}/graphql.json`, JSON.stringify(introspection, null, 2));

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
