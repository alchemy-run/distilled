#!/usr/bin/env bun
/**
 * Mirrors Modal's public gRPC protobufs into ../specs/.
 *
 * Modal does not publish OpenAPI. The machine-readable API description is
 * the proto3 sources in modal-labs/modal-client (`modal_proto/*.proto`).
 * Only those two files are downloaded, straight from
 * raw.githubusercontent.com — the upstream repository is never cloned.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/api.proto
 *   ../specs/task_command_router.proto
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "modal-labs/modal-client";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [
  { path: "modal_proto/api.proto", output: "api.proto" },
  {
    path: "modal_proto/task_command_router.proto",
    output: "task_command_router.proto",
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

const isProto3 = (text: string): boolean =>
  /syntax\s*=\s*"proto3"\s*;/.test(text) && /\bservice\s+\w+/.test(text);

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

    const text = await response.text();
    if (!isProto3(text)) {
      throw new Error(
        `${url} is not a proto3 service definition ` +
          `(missing \`syntax = "proto3"\` or a \`service\` block) — ` +
          `refusing to write a gutted/non-proto body`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    const body = text.endsWith("\n") ? text : `${text}\n`;
    await Bun.write(outputPath, body);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
