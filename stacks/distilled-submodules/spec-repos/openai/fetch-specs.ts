#!/usr/bin/env node
/**
 * Mirrors the OpenAI API spec into ../specs/.
 *
 * Only the 1 file the distilled openai generator actually reads is
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository (openai/openai-openapi) is never cloned, so the mirror stays
 * exactly as large as the spec itself. The repository publishes the same
 * document as YAML and JSON; the JSON one is mirrored.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "openai/openai-openapi";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [{ path: "openapi.json", output: "openapi.json" }];

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * The raw URL for a path in {@link REPO}. Each segment is encoded
 * individually so the separators survive.
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

    const spec = (await response.json()) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a rate-limit
    // body or a gutted response is still valid JSON, but it is not an
    // OpenAPI document.
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    // 2-space indent + trailing newline, so a whitespace-only change upstream
    // produces no diff and no daily commit.
    await writeFile(outputPath, JSON.stringify(spec, null, 2) + "\n");
    console.log(`OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
