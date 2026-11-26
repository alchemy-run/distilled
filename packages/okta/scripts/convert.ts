#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Okta Management OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-okta/specs/management.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/okta.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Okta's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Operations in Early Access (`x-okta-lifecycle.lifecycle: "EA"`) are marked
 * `smithy.api#unstable`, so generate writes them to
 * `src/unstable-services/okta.ts` (`@distilled.cloud/okta/unstable/okta`).
 * `GA` and `LIMITED_GA` are generally available and stay stable.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/** Okta's Early Access lifecycle: not generally available. */
const isEarlyAccess = (op: Record<string, any>): boolean =>
  op["x-okta-lifecycle"]?.lifecycle === "EA";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "okta",
      specPath: "specs/spec-mirror-okta/specs/management.json",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.okta.management",
    serviceName: "Okta",
    skipDeprecated: true,
    unstableOperation: isEarlyAccess,
  },
});
