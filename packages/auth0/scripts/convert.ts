#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Auth0 Management API OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/spec-mirror-auth0/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/auth0.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Auth0's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Operations in Early Access (`x-release-lifecycle: "EA"`) are marked
 * `smithy.api#unstable`, so generate writes them to
 * `src/unstable-services/auth0.ts` (`@distilled.cloud/auth0/unstable/auth0`).
 * `GA` stays stable.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/** Auth0's Early Access release lifecycle: not generally available. */
const isEarlyAccess = (op: Record<string, any>): boolean => op["x-release-lifecycle"] === "EA";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "auth0",
      specPath: "specs/spec-mirror-auth0/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.auth0.api",
    serviceName: "Auth0",
    skipDeprecated: true,
    unstableOperation: isEarlyAccess,
  },
});
