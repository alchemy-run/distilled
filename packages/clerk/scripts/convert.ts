#!/usr/bin/env bun
/**
 * convert — turn Clerk's Backend API and Platform API OpenAPI specs into
 * Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-clerk/specs/openapi.json   (Backend API)
 *         specs/spec-mirror-clerk/specs/platform.json  (Platform API)
 *         patches/<name>/*.patch.json  (RFC-6902 patches, one directory
 *         per model: patches/clerk/, patches/platform/)
 * Output: .generated-specs/clerk.json + .generated-specs/platform.json
 *
 * The Platform API is a separate model with its own namespace: `User`,
 * `Organization`, `JWTTemplate`, `RedirectURL` and `EmailAddress` exist in
 * both specs with different shapes.
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Clerk's pipeline
 * config. `scripts/generate.ts` compiles the models into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

/**
 * Every Platform operation id carries a `Platform` prefix
 * (`PlatformListApplications`). The ops already live in their own
 * `Platform` namespace, so strip it before verbNoun naming —
 * `listApplications`, not `platformListApplications`. Done as convert
 * policy rather than per-op patches so new upstream operations are named
 * correctly without a patch.
 */
const stripPlatformPrefix = (spec: any): void => {
  for (const item of Object.values<any>(spec.paths ?? {})) {
    for (const op of Object.values<any>(item ?? {})) {
      if (
        op !== null &&
        typeof op === "object" &&
        typeof op.operationId === "string" &&
        /^Platform[A-Z]/.test(op.operationId)
      ) {
        op.operationId = op.operationId.slice("Platform".length);
      }
    }
  }
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "clerk",
      specPath: "specs/spec-mirror-clerk/specs/openapi.json",
    },
    {
      name: "platform",
      specPath: "specs/spec-mirror-clerk/specs/platform.json",
      preprocess: stripPlatformPrefix,
      options: {
        namespace: "com.clerk.platform",
        serviceName: "ClerkPlatform",
        // The Platform spec's only header parameters are real per-call
        // inputs: `If-Match` (config version on config writes) and
        // `Idempotency-Key` (native application creates).
        headerParams: true,
      },
    },
  ],
  // OpenAPI-document patches, per-spec layout: patches/<name>/*.patch.json.
  // The smithy-model patch chain in generate.ts is disabled
  // (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.clerk.api",
    serviceName: "Clerk",
    skipDeprecated: true,
  },
});
