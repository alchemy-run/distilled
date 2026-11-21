#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the UniFi Network OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-unifi-network/specs/openapi.json  (spec submodule)
 *         patches/*.json  (RFC-6902 patches to the converted Smithy model)
 * Output: .generated-specs/unifiNetwork.json
 *
 * The OpenAPI→Smithy converter lives in `@distilled.cloud/dev/codegen/openapi`;
 * this script is UniFi Network's pipeline config. `scripts/generate.ts`
 * compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "unifiNetwork",
      specPath: "specs/spec-mirror-unifi-network/specs/openapi.json",
    },
  ],
  options: {
    namespace: "com.ui.network",
    serviceName: "UniFiNetwork",
    skipDeprecated: true,
  },
});
