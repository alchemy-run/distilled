#!/usr/bin/env bun
/**
 * Mirrors the AWS Smithy service models into ../specs/.
 *
 * The distilled aws generator reads exactly two things:
 *
 *   - `models/<service>/service/<version>/<service>-<version>.json` — one
 *     Smithy model per AWS service, from aws/api-models-aws
 *   - `partitions.json` — the endpoint rules engine's region → partition
 *     table, from smithy-lang/smithy
 *
 * The models are pulled with a blobless, sparse, depth-1 clone: git downloads
 * the commit and its trees, we narrow the working tree to `models/` BEFORE
 * any checkout happens, and only then are blobs fetched. The gradle build,
 * the docs and the entire history are never transferred. `partitions.json` is
 * a single file, so it is fetched straight from raw.githubusercontent.com.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/models/<service>/service/<version>/<service>-<version>.json
 *   ../specs/partitions.json
 */

import { mkdtempSync, rmSync } from "fs";
import { cp, mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const MODELS_REPO = "https://github.com/aws/api-models-aws.git";
const MODELS_REF = "main";

/** The one directory of {@link MODELS_REPO} the generator reads. */
const MODELS_DIR = "models";

const PARTITIONS_URL =
  "https://raw.githubusercontent.com/smithy-lang/smithy/main/smithy-aws-endpoints/src/main/resources/software/amazon/smithy/rulesengine/aws/language/functions/partition/partitions.json";

const SPECS_DIR = "../specs";

const git = async (cwd: string, ...args: string[]) => {
  const proc = Bun.spawn(["git", ...args], {
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`git ${args.join(" ")} failed with exit code ${code}`);
  }
};

async function fetchModels() {
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-aws-"));
  try {
    console.log(`Cloning ${MODELS_REPO} (blobless, sparse, depth 1)...`);
    // --no-checkout + --sparse: nothing lands in the working tree until the
    // sparse patterns below are set, so the blobs outside models/ are never
    // fetched at all.
    await git(
      workdir,
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      "--sparse",
      "--depth=1",
      "--branch",
      MODELS_REF,
      MODELS_REPO,
      "repo",
    );

    const repo = join(workdir, "repo");
    console.log(`Narrowing the checkout to ${MODELS_DIR}/...`);
    await git(repo, "sparse-checkout", "set", "--cone", MODELS_DIR);
    await git(repo, "checkout", MODELS_REF);

    const dest = `${SPECS_DIR}/${MODELS_DIR}`;
    console.log(`Writing ${dest}/...`);
    // Replace rather than merge, so a service Amazon removed upstream also
    // disappears from the mirror.
    await rm(dest, { recursive: true, force: true });
    await mkdir(SPECS_DIR, { recursive: true });
    await cp(join(repo, MODELS_DIR), dest, { recursive: true });
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

async function fetchPartitions() {
  console.log(`Fetching ${PARTITIONS_URL}...`);
  const response = await fetch(PARTITIONS_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${PARTITIONS_URL}: ${response.status} ${response.statusText}`,
    );
  }
  const outputPath = `${SPECS_DIR}/partitions.json`;
  console.log(`Writing ${outputPath}...`);
  await Bun.write(outputPath, await response.arrayBuffer());
}

async function main() {
  await fetchModels();
  await fetchPartitions();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
