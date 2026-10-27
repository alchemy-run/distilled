#!/usr/bin/env -S node --conditions=bun
/**
 * convert: the structure of Proxmox's API schema -> Smithy JSON models in
 * .generated-specs, one model per API area (see `./schema.ts`).
 *
 * The mirror's `api-structure.json` is the `pve-docs` schema with its
 * documentation text removed; `provenance.json` next to it records the
 * package it came from and the SHA256 of the structure, which is checked
 * here so a partial or hand-edited copy fails instead of generating.
 */
import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { convert, isApiTree, OPERATION_COUNT } from "./schema.ts";

const root = path.resolve(import.meta.dirname, "..");
const specs = resolveSpecPath(root, "specs/spec-mirror-proxmox/specs");
const outDir = path.join(root, ".generated-specs");

const text = await fs.readFile(path.join(specs, "api-structure.json"), "utf8");
const provenance: unknown = JSON.parse(
  await fs.readFile(path.join(specs, "provenance.json"), "utf8"),
);
const expected =
  typeof provenance === "object" &&
  provenance !== null &&
  "structure" in provenance &&
  typeof provenance.structure === "object" &&
  provenance.structure !== null &&
  "sha256" in provenance.structure
    ? provenance.structure.sha256
    : undefined;
if (createHash("sha256").update(text).digest("hex") !== expected) {
  throw new Error("api-structure.json does not match structure.sha256 in provenance.json");
}
const tree: unknown = JSON.parse(text);
if (!isApiTree(tree)) throw new Error("api-structure.json is not a Proxmox API schema tree");

const { models, count } = convert(tree);
if (count !== OPERATION_COUNT) {
  throw new Error(`Expected ${OPERATION_COUNT} operations, got ${count}`);
}
clearModels(outDir);
for (const [area, model] of Object.entries(models)) {
  writeModel(path.join(outDir, `${area}.json`), model);
}
console.log(`✅ ${Object.keys(models).length} Smithy models (${count} operations) → ${outDir}`);

// Operation names are already verb-first (`getNodesByNodeLxcByVmidConfig`).
await finalizeConvert({ root, patchesDir: false, operationNaming: "as-is" });
