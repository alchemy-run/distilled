#!/usr/bin/env -S node --conditions=bun
/**
 * convert: the structure of Proxmox's API schema -> Smithy JSON models in
 * .generated-specs, one model per API area (see `./schema.ts`), then the
 * patches in `patches/<area>/`.
 *
 * The mirror's `api-structure.json` is the schema from the API viewer's
 * `apidoc.js` with its documentation text removed.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { convert, isApiTree } from "./schema.ts";

const root = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(root, "specs/spec-mirror-proxmox/specs/api-structure.json");
const outDir = path.join(root, ".generated-specs");

const tree: unknown = JSON.parse(await fs.readFile(specPath, "utf8"));
if (!isApiTree(tree)) throw new Error(`${specPath} is not a Proxmox API schema tree`);

const { models, count } = convert(tree);
clearModels(outDir);
for (const [area, model] of Object.entries(models)) {
  writeModel(path.join(outDir, `${area}.json`), model);
}
console.log(`✅ ${Object.keys(models).length} Smithy models (${count} operations) → ${outDir}`);

// Operation names are already verb-first (`getNodesByNodeLxcByVmidConfig`).
await finalizeConvert({ root, operationNaming: "as-is" });
