#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Clerk's Backend and Platform OpenAPI descriptions into
 * separate Smithy 2.0 models.
 *
 * Input:  specs/spec-mirror-clerk/specs/{openapi,platform}.json
 *         patches/<model>/*.json  (RFC-6902 patches to the Smithy model)
 * Output: .generated-specs/{clerk,platform}.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Clerk's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "clerk",
      specPath: "specs/spec-mirror-clerk/specs/openapi.json",
    },
    {
      name: "platform",
      specPath: "specs/spec-mirror-clerk/specs/platform.json",
      options: {
        namespace: "com.clerk.platform",
        serviceName: "ClerkPlatform",
        headerParams: true,
        binaryTypes: true,
        operationNames: (operationId) =>
          operationId.startsWith("Platform") ? operationId.slice("Platform".length) : undefined,
      },
    },
  ],
  // Patches target upstream Smithy names before deferred operation renaming.
  patchesDir: "patches",
  options: {
    namespace: "com.clerk.api",
    serviceName: "Clerk",
    skipDeprecated: true,
  },
});
