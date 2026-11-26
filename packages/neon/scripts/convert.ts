#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Neon OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-neon/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document —
 *         ported verbatim from distilled v0; they add observed error
 *         responses that feed the per-op typed error unions)
 * Output: .generated-specs/neon.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Neon's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Operations the spec marks `x-stability-level: beta` or `alpha` are marked
 * `smithy.api#unstable`, so generate writes them to src/unstable-services
 * (`@distilled.cloud/neon/unstable/neon`) and the rest to src/services. A
 * patch can remove the mark from one operation.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/** Neon's pre-GA stability levels; an operation without the field is GA. */
const UNSTABLE_LEVELS = new Set(["alpha", "beta"]);

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "neon",
      specPath: "specs/spec-mirror-neon/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.neon.api",
    serviceName: "Neon",
    binaryTypes: true,
    // v0 parity: includeOperationErrors=true with the default status→class
    // map and default error statuses (401/429/500/503 covered globally).
    skipDeprecated: true,
    unstableOperation: (op) => UNSTABLE_LEVELS.has(op["x-stability-level"]),
  },
});
