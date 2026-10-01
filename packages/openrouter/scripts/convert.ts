#!/usr/bin/env bun
/**
 * convert — turn the OpenRouter OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-openrouter/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/openrouter.json
 *
 * OpenRouter publishes ONE OpenAPI 3.1 document with an `operationId` on
 * every operation, so this is a single `runOpenApiConvert` call — no id
 * synthesis and no tag split; every operation lands on the package root.
 * `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "openrouter",
      specPath: "specs/spec-mirror-openrouter/specs/openapi.json",
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "ai.openrouter.api",
    serviceName: "OpenRouter",
    skipDeprecated: true,
    // Batches, generation feedback and a few key operations answer
    // `202 Accepted` with a body.
    successStatuses: ["200", "201", "202", "204"],
    statusToErrorClass: {
      "400": "BadRequest",
      // Out of credit (account or key limit): actionable, not transient.
      "402": "PaymentRequired",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
    },
    // 401/429/5xx stay on the converter's default set: OpenRouterProtocol
    // dispatches them from the status through core's shared map, so they ride
    // the common error channel instead of every operation's own union.
    //
    // Upstream's ids read well except on the key and batch resources, where
    // they are plural for a single item and `GET /keys` is a bare `list`.
    operationNames: {
      "GET /keys": "listKeys",
      "POST /keys": "createKey",
      "PATCH /keys/{hash}": "updateKey",
      "DELETE /keys/{hash}": "deleteKey",
      "POST /batches": "createBatch",
      "GET /batches/{id}": "getBatch",
    },
  },
});
