#!/usr/bin/env bun
/**
 * Mirrors the subset of Azure/azure-rest-api-specs the distilled azure
 * generator reads into ../specs/.
 *
 * A full checkout of azure-rest-api-specs is tens of gigabytes: every ARM and
 * data-plane service, every preview and stable api-version, plus an example
 * payload for every operation. The generator reads a small fraction of it —
 * for each `Microsoft.*` resource provider, the `*.json` swagger documents in
 * the LATEST stable api-version directory:
 *
 *   specification/<service>/resource-manager/<Microsoft.Provider>/stable/<version>/*.json
 *   specification/<service>/resource-manager/<Microsoft.Provider>/<sub>/stable/<version>/*.json
 *
 * Those documents `$ref` other documents (`common-types`, siblings, other
 * providers), and the converter resolves those refs off disk, so the mirror
 * also has to be `$ref`-closed. This script therefore:
 *
 *   1. clones blobless and WITHOUT a checkout, so it gets the commit and its
 *      trees but not a single file's content;
 *   2. lists the tree to pick the exact paths to keep — no blob is downloaded
 *      to make that decision;
 *   3. narrows the sparse checkout to those paths and checks out, which is
 *      the first and only point blobs are fetched;
 *   4. follows external `$ref`s in what it just checked out and repeats until
 *      the set is closed.
 *
 * Preview api-versions, data-plane specs, `x-ms-examples` payloads and every
 * superseded stable version are never transferred.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/specification/...  (upstream layout preserved, so $refs resolve)
 */

import { mkdtempSync, rmSync } from "fs";
import { cp, mkdir, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join, posix } from "path";

const REPO = "https://github.com/Azure/azure-rest-api-specs.git";
const REF = "main";

/** Everything the generator looks at lives under this prefix. */
const ROOT = "specification";

/**
 * Shared type documents every ARM spec `$ref`s. Mirrored wholesale rather
 * than discovered through refs: it is small, and it makes step 4 converge in
 * one or two passes instead of many.
 */
const COMMON_TYPES = `${ROOT}/common-types/`;

const SPECS_DIR = "../specs";

const git = async (cwd: string, args: string[], stdin?: string) => {
  const proc = Bun.spawn(["git", ...args], {
    cwd,
    stdin: stdin === undefined ? "ignore" : new TextEncoder().encode(stdin),
    stdout: "pipe",
    stderr: "inherit",
  });
  const stdout = await new Response(proc.stdout).text();
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`git ${args.join(" ")} failed with exit code ${code}`);
  }
  return stdout;
};

/** `YYYY-MM-DD[suffix]` — the api-version directory names ARM uses. */
const API_VERSION = /^\d{4}-\d{2}-\d{2}/;

/**
 * The swagger documents to keep, chosen from the repository's file list
 * alone. Mirrors `discoverSpecs`/`findLatestStableSpecs` in the distilled
 * azure converter — keep the two in step.
 */
function selectSpecs(allPaths: string[]): Set<string> {
  const wanted = new Set<string>();

  // stable-directory prefix -> version -> files directly inside it
  const stables = new Map<string, Map<string, string[]>>();

  for (const path of allPaths) {
    if (!path.startsWith(`${ROOT}/`)) continue;

    if (path.startsWith(COMMON_TYPES)) {
      if (path.endsWith(".json")) wanted.add(path);
      continue;
    }

    // Examples are payload samples, never read by the converter.
    if (path.includes("/examples/")) continue;
    if (!path.endsWith(".json")) continue;

    const segments = path.split("/");
    // specification/<service>/resource-manager/<provider>/[<sub>/]stable/<version>/<file>
    if (segments[2] !== "resource-manager") continue;

    const provider = segments[3];
    if (provider === undefined) continue;
    if (
      !provider.startsWith("Microsoft.") &&
      !provider.startsWith("microsoft.")
    ) {
      continue;
    }

    // The file must sit DIRECTLY in a `stable/<version>/` directory, either
    // flat under the provider or one sub-service level down.
    const depth = segments.length;
    const stableAt = depth - 3;
    if (segments[stableAt] !== "stable") continue;
    if (stableAt !== 4 && stableAt !== 5) continue;

    const version = segments[depth - 2]!;
    if (!API_VERSION.test(version)) continue;

    const file = segments[depth - 1]!;
    if (file.startsWith("examples")) continue;

    const stableDir = segments.slice(0, stableAt + 1).join("/");
    const versions = stables.get(stableDir) ?? new Map<string, string[]>();
    stables.set(stableDir, versions);
    versions.set(version, [...(versions.get(version) ?? []), path]);
  }

  for (const versions of stables.values()) {
    // Same ordering as the converter: plain lexicographic, last wins.
    const latest = [...versions.keys()]
      .sort((a, b) => a.localeCompare(b))
      .at(-1)!;
    for (const path of versions.get(latest)!) wanted.add(path);
  }

  return wanted;
}

/**
 * External (cross-document) `$ref` targets in a parsed swagger document.
 *
 * `x-ms-examples` is skipped. It is the only thing in these documents that
 * points at `examples/`, and following it would drag in ~16k example payloads
 * (about 40 MB) for nothing: the distilled azure converter has no handling for
 * any `x-ms-*` extension, so an inlined example is dropped again on the way to
 * Smithy. Everything else — `common-types`, sibling documents, other
 * providers — is followed.
 */
function externalRefs(node: unknown, out: Set<string>) {
  if (Array.isArray(node)) {
    for (const item of node) externalRefs(item, out);
    return;
  }
  if (typeof node !== "object" || node === null) return;
  for (const [key, value] of Object.entries(node)) {
    if (key === "x-ms-examples") continue;
    if (key === "$ref" && typeof value === "string" && !value.startsWith("#")) {
      const target = value.split("#")[0]!;
      if (target !== "" && !target.includes("examples/")) out.add(target);
    } else {
      externalRefs(value, out);
    }
  }
}

const setSparse = (repo: string, paths: Iterable<string>) =>
  git(
    repo,
    ["sparse-checkout", "set", "--no-cone", "--stdin"],
    [...paths].map((p) => `/${p}`).join("\n") + "\n",
  );

async function main() {
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-azure-"));
  try {
    console.log(`Cloning ${REPO} (blobless, no checkout, depth 1)...`);
    await git(workdir, [
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      "--sparse",
      "--depth=1",
      "--branch",
      REF,
      REPO,
      "repo",
    ]);
    const repo = join(workdir, "repo");

    console.log("Listing the tree (no blobs fetched)...");
    const allPaths = (await git(repo, ["ls-tree", "-r", "HEAD", "--name-only"]))
      .split("\n")
      .filter((line) => line !== "");
    const known = new Set(allPaths);
    console.log(`  ${allPaths.length} paths upstream.`);

    const wanted = selectSpecs(allPaths);
    console.log(`  ${wanted.size} selected (latest stable + common-types).`);

    console.log("Checking out the selection...");
    await setSparse(repo, wanted);
    await git(repo, ["checkout", REF]);

    // Close the selection over external $refs. Each pass only reads the
    // documents added by the previous one.
    let frontier = [...wanted];
    for (let pass = 1; frontier.length > 0; pass++) {
      const added = new Set<string>();
      for (const path of frontier) {
        let doc: unknown;
        try {
          doc = JSON.parse(await readFile(join(repo, path), "utf-8"));
        } catch {
          continue; // not JSON, or not a document we can follow
        }
        const refs = new Set<string>();
        externalRefs(doc, refs);
        for (const ref of refs) {
          const resolved = posix.normalize(posix.join(dirname(path), ref));
          if (known.has(resolved) && !wanted.has(resolved)) {
            wanted.add(resolved);
            added.add(resolved);
          }
        }
      }
      if (added.size === 0) break;
      console.log(`  pass ${pass}: +${added.size} referenced documents.`);
      await setSparse(repo, wanted);
      await git(repo, ["checkout", REF]);
      frontier = [...added];
    }

    console.log(`  ${wanted.size} documents in the closed set.`);

    const dest = `${SPECS_DIR}/${ROOT}`;
    console.log(`Writing ${dest}/...`);
    // Replace rather than merge, so a spec that dropped out of the selection
    // (a new stable api-version superseding an old one) also leaves the mirror.
    await rm(dest, { recursive: true, force: true });
    await mkdir(SPECS_DIR, { recursive: true });
    await cp(join(repo, ROOT), dest, { recursive: true });
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
