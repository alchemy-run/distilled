#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the LaunchDarkly OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-launchdarkly/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/launchdarkly.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is LaunchDarkly's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 *
 * LaunchDarkly's beta resources carry a tag ending in "(beta)", and some
 * also require the `LD-API-Version: beta` header (a parameter whose only
 * value is `beta`). Either one marks the operation `smithy.api#unstable`, so
 * generate writes it to src/unstable-services
 * (`@distilled.cloud/launchdarkly/unstable/launchdarkly`) and the rest to
 * src/services. A patch can remove the mark from one operation.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const isBeta = (op: Record<string, any>): boolean =>
  (Array.isArray(op.tags) && op.tags.some((tag: unknown) => /\(beta\)\s*$/i.test(String(tag)))) ||
  (Array.isArray(op.parameters) &&
    op.parameters.some(
      (param: any) =>
        param?.in === "header" &&
        param.name === "LD-API-Version" &&
        Array.isArray(param.schema?.enum) &&
        param.schema.enum.length === 1 &&
        param.schema.enum[0] === "beta",
    ));

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "launchdarkly",
      specPath: "specs/spec-mirror-launchdarkly/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.launchdarkly.api",
    serviceName: "LaunchDarkly",
    skipDeprecated: true,
    unstableOperation: isBeta,
  },
});
