#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Elasticsearch OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-elasticsearch/specs/elasticsearch-openapi.json
 *         (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/elasticsearch.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Elasticsearch's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Every operation carries `x-state`: its availability, then optionally
 * "; Added in <version>". Operations Elastic calls Beta, Experimental or
 * Technical preview are marked `smithy.api#unstable`, so generate writes them
 * to `src/unstable-services/elasticsearch.ts`
 * (`@distilled.cloud/elasticsearch/unstable/elasticsearch`). "Generally
 * available" stays stable.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const PRE_GA_STATES = new Set(["beta", "experimental", "technical preview", "preview"]);

/** Not generally available: the availability before `;` in `x-state`. */
const isUnstable = (op: Record<string, any>): boolean => {
  const state = op["x-state"];
  return (
    typeof state === "string" && PRE_GA_STATES.has(state.replace(/;.*$/s, "").trim().toLowerCase())
  );
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "elasticsearch",
      specPath: "specs/spec-mirror-elasticsearch/specs/elasticsearch-openapi.json",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.elasticsearch.api",
    serviceName: "Elasticsearch",
    skipDeprecated: true,
    unstableOperation: isUnstable,
  },
});
