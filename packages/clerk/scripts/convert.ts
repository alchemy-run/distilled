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
 *
 * A spec whose `info.version` names a pre-release (`BETA`: the Platform API
 * is in private beta) is marked `smithy.api#unstable` before the patches
 * apply, so generate writes its module to src/unstable-services
 * (`@distilled.cloud/clerk/unstable/<module>`). A patch can remove the mark.
 */
import * as path from "node:path";
import { readModel, writeModel } from "@distilled.cloud/dev/codegen/models";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { markUnstable } from "@distilled.cloud/dev/codegen/stability";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, ".generated-specs");
const MODELS = ["clerk", "platform"];

await runOpenApiConvert({
  root,
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
  // The finalizeConvert below applies the patches.
  patchesDir: false,
  finalize: false,
  options: {
    namespace: "com.clerk.api",
    serviceName: "Clerk",
    skipDeprecated: true,
  },
});

// The service shape's `version` is the spec's `info.version`.
for (const name of MODELS) {
  const modelPath = path.join(outDir, `${name}.json`);
  const model = readModel(modelPath);
  const service = Object.values<any>(model.shapes).find((s) => s?.type === "service");
  if (/alpha|beta|preview/i.test(service?.version ?? "")) {
    markUnstable(model);
    writeModel(modelPath, model);
  }
}

// Patches target upstream Smithy names before deferred operation renaming.
await finalizeConvert({
  root,
  operationNaming: "as-is",
  include: (resource) => MODELS.includes(resource),
});
