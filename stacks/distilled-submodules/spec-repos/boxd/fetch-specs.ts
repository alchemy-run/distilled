#!/usr/bin/env node
/**
 * Mirrors boxd's public gRPC protobuf into ../specs/.
 *
 * boxd does not publish OpenAPI. Its official SDKs are generated from one
 * proto3 file, `proto/api.proto` in boxd-sh/sdk (`service BoxdApi`). Only
 * that file is downloaded, straight from raw.githubusercontent.com; the
 * upstream repository is never cloned.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/api.proto
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "boxd-sh/sdk";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [{ path: "proto/api.proto", output: "api.proto" }];

const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

const isProto3 = (text: string): boolean =>
  /syntax\s*=\s*"proto3"\s*;/.test(text) && /\bservice\s+BoxdApi\b/.test(text);

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file.path);
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!isProto3(text)) {
      throw new Error(
        `${url} is not the boxd proto3 service definition ` +
          `(missing \`syntax = "proto3"\` or \`service BoxdApi\`) — ` +
          `refusing to write a gutted/non-proto body`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    const body = text.endsWith("\n") ? text : `${text}\n`;
    await writeFile(outputPath, body);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
