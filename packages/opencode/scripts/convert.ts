#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the OpenCode OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-opencode/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/opencode.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is OpenCode's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * OpenCode serves its experimental routes under `/api/experimental/` (some
 * also carry the `experimental` tag). Each one is marked
 * `smithy.api#unstable`, so generate writes it to `unstable/opencode` and
 * the other operations to the stable `opencode` module.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/** An operation OpenCode serves as experimental: by path prefix or tag. */
const isExperimental = (op: Record<string, any>, { path }: { readonly path: string }): boolean =>
  path.startsWith("/api/experimental/") ||
  (Array.isArray(op.tags) && op.tags.includes("experimental"));

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "opencode",
      specPath: "specs/spec-mirror-opencode/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.opencode.api",
    serviceName: "Opencode",
    skipDeprecated: true,
    unstableOperation: isExperimental,
    operationNames: {
      // `provider.auth` would emit a `ProviderAuthError` union alias that
      // collides with the spec's own ProviderAuthError schema.
      "GET /provider/auth": "listProviderAuthMethods",
    },
  },
});
