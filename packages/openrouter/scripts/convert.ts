#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the OpenRouter OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-openrouter/specs/openapi.json  (spec submodule)
 *         patches/*.json  (RFC-6902 patches — OpenAPI pointers before
 *         conversion, Smithy pointers after)
 * Output: .generated-specs/openrouter.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is OpenRouter's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

/** Retryable (non-throttling) transient failure. */
const retryable = { traits: { "smithy.api#retryable": {} } };

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "openrouter",
      specPath: "specs/spec-mirror-openrouter/specs/openapi.json",
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.openrouter.api",
    serviceName: "OpenRouter",
    skipDeprecated: true,
    // Binary downloads (files, container files, audio speech, video
    // content) return `Uint8Array`; multipart uploads take bytes.
    binaryTypes: true,
    unionCaseTitles: true,
    // Batches, videos, intern provisioning and SCIM sync answer `202
    // Accepted` with a body.
    successStatuses: ["200", "201", "202", "204"],
    // OpenRouter declares nearly every failure status per operation, with
    // the `{ error: { code, message, metadata? } }` envelope, so each one
    // becomes a typed per-op class. Only 500 is left to the shared
    // `InternalServerError`. The same tags are raised for undeclared
    // statuses by the protocol's status map (src/protocol.ts).
    defaultErrorStatuses: ["500"],
    statusToErrorClass: {
      "400": "BadRequest",
      "401": "InvalidApiKey",
      "402": "InsufficientCredits",
      "403": "Forbidden",
      "404": "NotFound",
      "408": "RequestTimeout",
      "409": "Conflict",
      "410": "Gone",
      "413": "PayloadTooLarge",
      "415": "UnsupportedMediaType",
      "422": "UnprocessableEntity",
      "429": "RateLimited",
      "502": "ProviderError",
      "503": "NoAvailableProvider",
      "504": "GatewayTimeout",
      "524": "ProviderTimeout",
      "529": "ProviderOverloaded",
    },
    errorShapes: {
      RequestTimeout: retryable,
      RateLimited: { traits: { "smithy.api#retryable": { throttling: true } } },
      ProviderError: retryable,
      NoAvailableProvider: retryable,
      GatewayTimeout: retryable,
      ProviderTimeout: retryable,
      ProviderOverloaded: retryable,
    },
    operationNames: {
      "GET /keys": "listKeys",
      "POST /keys": "createKey",
      "PATCH /keys/{hash}": "updateKey",
      "DELETE /keys/{hash}": "deleteKey",
      "POST /chat/completions": "createChatCompletion",
      "POST /responses": "createResponse",
      "POST /messages": "createMessage",
      "POST /embeddings": "createEmbeddings",
      "POST /images": "createImage",
      "GET /models": "listModels",
      "GET /models/count": "countModels",
      "GET /models/user": "listUserModels",
      "GET /models/{author}/{slug}/endpoints": "listModelEndpoints",
      "POST /batches": "createBatch",
      "GET /batches/{id}": "getBatch",
      "POST /videos": "createVideo",
      "GET /videos/{jobId}": "getVideo",
      "GET /videos/{jobId}/content": "getVideoContent",
      "GET /videos/models": "listVideoModels",
      "POST /presets/{slug}/chat/completions": "createPresetFromChatCompletion",
      "POST /presets/{slug}/messages": "createPresetFromMessage",
      "POST /presets/{slug}/responses": "createPresetFromResponse",
      "POST /api/alpha/decisions": "createAlphaDecision",
      "POST /systemone": "createSystemOneDecision",
    },
  },
});
