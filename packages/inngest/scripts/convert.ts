#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Inngest OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-inngest/specs/v2.json  (spec submodule)
 *         specs/spec-mirror-inngest/specs/v1.json  (webhooks, events, runs)
 *         patches/<spec>/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/inngest.json + .generated-specs/v1.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Inngest's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "inngest",
      specPath: "specs/spec-mirror-inngest/specs/v2.json",
    },
    {
      name: "v1",
      specPath: "specs/spec-mirror-inngest/specs/v1.json",
      options: {
        namespace: "com.inngest.v1",
        serviceName: "InngestV1",
      },
    },
  ],
  // OpenAPI-document patches (patches/<spec>/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.inngest.api",
    serviceName: "Inngest",
    skipDeprecated: true,
  },
});
