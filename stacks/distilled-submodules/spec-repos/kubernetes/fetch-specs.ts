#!/usr/bin/env node
/**
 * Mirrors the Kubernetes API spec, and the CustomResourceDefinition
 * manifests the generator converts alongside it, into ../specs/.
 *
 * Only the files the distilled kubernetes generator actually reads are
 * downloaded, straight from raw.githubusercontent.com — no upstream
 * repository is ever cloned, so the mirror stays exactly as large as the
 * specs themselves. CRDs are pinned to a release tag: their schema is
 * versioned with the controller that serves them.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/swagger.json
 *   ../specs/crds/<group>_<plural>.yaml
 */

import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

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

/** external-snapshotter's VolumeSnapshot CRDs (snapshot.storage.k8s.io/v1). */
const SNAPSHOT_CRDS: SpecFile[] = [
  "snapshot.storage.k8s.io_volumesnapshotclasses.yaml",
  "snapshot.storage.k8s.io_volumesnapshotcontents.yaml",
  "snapshot.storage.k8s.io_volumesnapshots.yaml",
].map((file) => ({
  repo: "kubernetes-csi/external-snapshotter",
  ref: "v8.7.0",
  path: `client/config/crd/${file}`,
  output: `crds/${file}`,
}));

const FILES: SpecFile[] = [
  {
    repo: "kubernetes/kubernetes",
    ref: "master",
    path: "api/openapi-spec/swagger.json",
    output: "swagger.json",
  },
  ...SNAPSHOT_CRDS,
];

const SPECS_DIR = "../specs";

mkdirSync(`${SPECS_DIR}/crds`, { recursive: true });

/**
 * The raw URL for a file. Each path segment is encoded individually so
 * paths containing characters like `(` survive the round trip while the
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
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    // A CRD manifest names its kind near the top; anything else (an error
    // page, a moved file) must not reach the mirror.
    if (
      file.output.startsWith("crds/") &&
      !/^kind: CustomResourceDefinition$/m.test(new TextDecoder().decode(bytes))
    ) {
      throw new Error(`${url} is not a CustomResourceDefinition manifest`);
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, bytes);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
