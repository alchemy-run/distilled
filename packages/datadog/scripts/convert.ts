#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Datadog's OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-datadog/specs/{v1,v2}.json  (spec submodule)
 *         patches/{v1,v2}/*.patch.json  (RFC-6902 patches to the OpenAPI
 *         document)
 * Output: .generated-specs/{v1,v2}.json
 *
 * Datadog publishes two OpenAPI 3.0.0 documents (v1 and v2) in
 * DataDog/datadog-api-client-python — the same files its official clients
 * and https://docs.datadoghq.com/api/latest/ are generated from. Each file
 * becomes one service module. `scripts/generate.ts` compiles the models
 * into src/services.
 *
 * Datadog's clients gate every operation that carries `x-unstable` (a note
 * such as "This endpoint is in Preview") behind an opt-in. Those operations,
 * and every path under `/api/unstable/`, are marked `smithy.api#unstable`, so
 * generate writes them to `src/unstable-services/<module>.ts`
 * (`@distilled.cloud/datadog/unstable/v2`). A note that says the operation is
 * deprecated, or planned for deprecation, is not a preview: it stays stable.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/** Not generally available: an `x-unstable` preview note, or an `/api/unstable/` path. */
const isUnstable = (op: Record<string, any>, { path }: { readonly path: string }): boolean =>
  path.startsWith("/api/unstable/") ||
  (op["x-unstable"] !== undefined && !/deprecat/i.test(String(op["x-unstable"])));

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "v1",
      specPath: "specs/spec-mirror-datadog/specs/v1.json",
      options: {
        namespace: "com.datadog.v1",
        serviceName: "DatadogV1",
      },
    },
    {
      name: "v2",
      specPath: "specs/spec-mirror-datadog/specs/v2.json",
      options: {
        namespace: "com.datadog.v2",
        serviceName: "DatadogV2",
      },
    },
  ],
  // OpenAPI-document patches: patches/<name>/*.patch.json. The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.datadog.api",
    serviceName: "Datadog",
    skipDeprecated: true,
    unstableOperation: isUnstable,
  },
});
