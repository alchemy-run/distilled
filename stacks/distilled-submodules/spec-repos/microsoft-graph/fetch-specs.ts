#!/usr/bin/env node
/**
 * Mirrors the Microsoft Graph v1.0 API spec into ../specs/.
 *
 * Only the 1 file the distilled microsoft-graph generator actually reads
 * is downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself.
 *
 * The document is YAML (~44 MB); it is mirrored verbatim and parsed by the
 * package's convert script.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "microsoftgraph/msgraph-metadata";
/** Branch (or tag/commit) to mirror. */
const REF = "master";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [{ path: "openapi/v1.0/openapi.yaml", output: "openapi.yaml" }];

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

/**
 * A rate-limit page or a truncated body is still text: check that this is an
 * OpenAPI 3 YAML document with a `paths` section before writing it.
 */
const validate = (url: string, text: string) => {
  if (!/^openapi: ['"]?3\./m.test(text.slice(0, 1024))) {
    throw new Error(`${url} is not an OpenAPI 3 YAML document`);
  }
  if (!/^paths:\s*$/m.test(text) || !/^components:\s*$/m.test(text)) {
    throw new Error(`${url} has no top-level paths or components section`);
  }
};

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file.path);
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    validate(url, text);

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
