#!/usr/bin/env node
/**
 * Mirrors E2B's API descriptions into ../specs/.
 *
 * E2B publishes its control plane, its volume-content API and the in-sandbox
 * daemon (envd) in `e2b-dev/E2B/spec`. Only the five files the distilled e2b
 * generator reads are downloaded, straight from raw.githubusercontent.com —
 * the upstream repository is never cloned.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.yml               control plane (api.e2b.app)
 *   ../specs/openapi-volumecontent.yml volume files (api.e2b.app, volume token)
 *   ../specs/envd.yaml                 envd HTTP API (sandbox.e2b.app)
 *   ../specs/process.proto             envd Connect process service
 *   ../specs/filesystem.proto          envd Connect filesystem service
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "e2b-dev/E2B";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
  /** Rejects a body that is not the expected document. */
  validate: (text: string) => boolean;
}

const isOpenApi = (text: string): boolean => /^openapi:\s*3\./m.test(text) && /^paths:/m.test(text);
const isProto3 = (text: string): boolean =>
  /syntax\s*=\s*"proto3"\s*;/.test(text) && /\bservice\s+\w+/.test(text);

const FILES: SpecFile[] = [
  { path: "spec/openapi.yml", output: "openapi.yml", validate: isOpenApi },
  {
    path: "spec/openapi-volumecontent.yml",
    output: "openapi-volumecontent.yml",
    validate: isOpenApi,
  },
  { path: "spec/envd/envd.yaml", output: "envd.yaml", validate: isOpenApi },
  { path: "spec/envd/process/process.proto", output: "process.proto", validate: isProto3 },
  { path: "spec/envd/filesystem/filesystem.proto", output: "filesystem.proto", validate: isProto3 },
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
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    if (!file.validate(text)) {
      throw new Error(`${url} is not the expected spec document`);
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, text);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
