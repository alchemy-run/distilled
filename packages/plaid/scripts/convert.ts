#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Plaid OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-plaid/specs/2020-09-14.yml  (spec submodule —
 *         YAML, parsed with the `yaml` package)
 * Output: .generated-specs/plaid.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Plaid's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Plaid serves its beta endpoints under the `/beta/` path prefix. Each one
 * is marked `smithy.api#unstable`, so generate writes it to `unstable/plaid`
 * and the other operations to the stable `plaid` module.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

/** An endpoint Plaid serves under `/beta/`. */
const isBeta = (_op: Record<string, any>, { path }: { readonly path: string }): boolean =>
  path.startsWith("/beta/");

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "plaid",
      specPath: "specs/spec-mirror-plaid/specs/2020-09-14.yml",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.plaid.api",
    serviceName: "Plaid",
    skipDeprecated: true,
    unstableOperation: isBeta,
  },
});
