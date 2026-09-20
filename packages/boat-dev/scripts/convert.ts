#!/usr/bin/env bun
/**
 * convert — turn the Boat Public API v1 OpenAPI spec into a Smithy 2.0 JSON
 * model.
 *
 * Input:  specs/spec-mirror-boat-dev/specs/openapi.json  (spec submodule)
 * Output: .generated-specs/boat.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Boat's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Boat's operationIds are already camelCase but several are a bare verb
 * (`create`, `get`, `stop`) or a noun (`sandboxes`, `apiKeys`) that would
 * collide or read poorly on a single service module — those are renamed
 * here via `operationNames` (lookup by `"METHOD path"`).
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "boat",
      specPath: "specs/spec-mirror-boat-dev/specs/openapi.json",
    },
  ],
  patchesDir: false,
  options: {
    namespace: "com.boat.api",
    serviceName: "Boat",
    skipDeprecated: true,
    // Create / stop / resume / fork / prompt / delete answer 202 with a
    // JSON body; without 202 those ops would generate as void.
    successStatuses: ["200", "201", "202", "204"],
    // Idempotency-Key (create/fork), X-Ascii-Confirm-Delete (permanent
    // deletes), and X-Boat-Org are real per-call inputs, not protocol
    // headers.
    headerParams: true,
    operationNames: {
      "GET /me": "getCurrentUser",
      "GET /limits": "getLimits",
      "GET /repos": "listRepos",
      "GET /api-keys": "listApiKeys",
      "GET /api-keys/{apiKeyId}/usage": "getApiKeyUsage",
      "GET /secrets": "getSecrets",
      "GET /environments": "listEnvironments",
      "GET /sandboxes": "listSandboxes",
      "POST /sandboxes": "createSandbox",
      "GET /sandboxes/{sandboxId}": "getSandbox",
      "PATCH /sandboxes/{sandboxId}": "updateSandbox",
      "POST /sandboxes/{sandboxId}/stop": "stopSandbox",
      "POST /sandboxes/{sandboxId}/resume": "resumeSandbox",
      "POST /sandboxes/{sandboxId}/fork": "forkSandbox",
      "POST /sandboxes/{sandboxId}/prompt": "promptSandbox",
      "GET /sandboxes/{sandboxId}/events": "listSandboxEvents",
      "GET /sandboxes/{sandboxId}/conversations": "listSandboxConversations",
      "GET /sandboxes/{sandboxId}/prompts/{promptId}": "getPromptRunStatus",
      "GET /sandboxes/{sandboxId}/files": "readSandboxFile",
      "PUT /sandboxes/{sandboxId}/files": "writeSandboxFile",
      "POST /sandboxes/{sandboxId}/commands": "executeSandboxCommand",
      "GET /sandboxes/{sandboxId}/commands/{processId}": "getCommandStatus",
      "GET /sandboxes/{sandboxId}/artifacts": "downloadSandboxArtifact",
      "POST /sandboxes/{sandboxId}/steer": "steerSandbox",
      "POST /sandboxes/{sandboxId}/interrupt": "interruptSandbox",
      "POST /sandboxes/{sandboxId}/desktop": "getDesktopStreamingUrl",
      "POST /sandboxes/{sandboxId}/sshkey": "configureSshKey",
      "GET /sandboxes/{sandboxId}/usage": "getSandboxUsage",
    },
  },
});
