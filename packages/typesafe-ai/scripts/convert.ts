#!/usr/bin/env bun
/**
 * convert — turn the TypeSafe AI OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-typesafe-ai/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/typesafe-ai.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is TypeSafe AI's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 *
 * FastAPI's mechanical operationIds (`systemone_v1_systemone_post`) restated
 * the route; `operationNames` pins the two operations to the names the
 * official SDK uses (`systemOne`) and a verbNoun list (`listModels`).
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "typesafe-ai",
      specPath: "specs/spec-mirror-typesafe-ai/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.typesafe.ai",
    serviceName: "TypesafeAi",
    skipDeprecated: true,
    operationNames: {
      "POST /v1/systemone": "systemOne",
      "GET /v1/models": "listModels",
    },
  },
});
