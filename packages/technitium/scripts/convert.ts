#!/usr/bin/env -S node --conditions=bun
/**
 * convert: the structure of Technitium's HTTP API -> Smithy JSON models in
 * .generated-specs, one model per API area (see `./schema.ts`).
 *
 * The mirror's `api-structure.json` holds the structure of Technitium's
 * `APIDOCS.md` and request handlers, without their text; `provenance.json`
 * next to it records the release and the SHA-256 of the structure, which is
 * checked here so a partial or hand-edited copy fails instead of generating.
 */
import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { convert, isApiStructure } from "./schema.ts";

const root = path.resolve(import.meta.dirname, "..");
const specs = resolveSpecPath(root, "specs/spec-mirror-technitium/specs");
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
const tag =
  typeof provenance === "object" && provenance !== null && "tag" in provenance
    ? String(provenance.tag)
    : "unknown";
const structure: unknown = JSON.parse(text);
if (!isApiStructure(structure)) {
  throw new Error("api-structure.json is not a Technitium API structure");
}

const { models, skipped } = convert(structure, `Technitium DNS Server ${tag}`);
clearModels(outDir);
for (const [area, model] of Object.entries(models)) {
  writeModel(path.join(outDir, `${area}.json`), model);
}
const count = Object.values(models).reduce(
  (sum, model) => sum + Object.values(model.shapes).filter((s) => s.type === "operation").length,
  0,
);
console.log(
  `✅ ${Object.keys(models).length} Smithy models (${count} of ${structure.operations.length} operations) → ${outDir}`,
);
console.log(`   not generated: ${skipped.map((s) => `${s.path} (${s.reason})`).join(", ")}`);

// Operation names come from the section headings and are already verb-first
// (`getRecords`, `addRecord`).
await finalizeConvert({ root, operationNaming: "as-is" });
