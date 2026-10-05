#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Typesense OpenAPI spec into a Smithy JSON model.
 *
 * Input:  specs/spec-mirror-typesense/specs/openapi.yml  (OAS 3.0, YAML)
 * Output: .generated-specs/typesense.json       (Smithy 2.0 model)
 *
 * The OpenAPI→Smithy converter and the patch-then-convert pipeline live in
 * `@distilled.cloud/core/codegen`; this script only names the spec file and
 * the YAML parse seam. The RFC-6902 patches in `patches/*.patch.json` are
 * applied to the OpenAPI document before conversion (v0 semantics).
 */
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

await runOpenApiConvert({
  root: `${import.meta.dirname}/..`,
  specs: [
    {
      name: "typesense",
      specPath: "specs/spec-mirror-typesense/specs/openapi.yml",
    },
  ],
  // The Typesense spec is YAML.
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.typesense.api",
    serviceName: "Typesense",
    // v0 parity: default statusToErrorClass / defaultErrorStatuses /
    // skipDeprecated are exactly the distilled v0 generator defaults.
  },
});
