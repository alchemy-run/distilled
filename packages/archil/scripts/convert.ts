#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Archil OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-archil/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/archil.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Archil's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const root = path.resolve(import.meta.dirname, "..");

/**
 * Merge `manual-specs/*.openapi.json` (operations the official SDK calls but
 * the published document omits) into the spec. A path or schema the
 * published spec already has wins, so an upstream fix supersedes the manual
 * copy without an edit here.
 */
const mergeManualSpecs = async (spec: any) => {
  const dir = path.join(root, "manual-specs");
  for (const file of (await fs.readdir(dir)).filter((f) => f.endsWith(".openapi.json")).sort()) {
    const manual = JSON.parse(await fs.readFile(path.join(dir, file), "utf8"));
    for (const [p, item] of Object.entries(manual.paths ?? {})) {
      spec.paths[p] ??= item;
    }
    for (const [name, schema] of Object.entries(manual.schemas ?? {})) {
      spec.components.schemas[name] ??= schema;
    }
  }
};

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "archil",
      specPath: "specs/spec-mirror-archil/specs/openapi.json",
      preprocess: mergeManualSpecs,
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.archil.api",
    serviceName: "Archil",
    skipDeprecated: true,
  },
});
