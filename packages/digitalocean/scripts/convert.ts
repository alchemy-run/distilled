#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the DigitalOcean OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-digitalocean/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/digitalocean.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is DigitalOcean's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const root = path.resolve(import.meta.dirname, "..");

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "digitalocean",
      specPath: "specs/spec-mirror-digitalocean/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.digitalocean.api",
    serviceName: "DigitalOcean",
    skipDeprecated: true,
    // Async-accept endpoints (droplet create, firewall create, droplet and
    // firewall actions) answer 202 with the created resource in the body.
    // Without it the converter finds no success schema and emits an empty
    // response struct, so the created id is unreachable.
    successStatuses: ["200", "201", "202", "204"],
    // Header parameters carry required acknowledgements (`X-Dangerous` on
    // the destroy-with-resources endpoints) and Action Gateway identity
    // (`X-Actor-Id`, `X-Session-Id`, `X-Endpoint-Id`).
    headerParams: true,
    // Operations the spec serves from another host. The protocol maps each
    // name to a base URL from the credentials (src/protocol.ts `baseUrlFor`).
    servers: {
      "https://inference.do-ai.run": "inference",
      "https://actions.do-ai.run": "actions",
      // An agent's own endpoint and a presigned batch upload URL: only the
      // caller knows these hosts, so the operations keep the API host as on
      // main (where they cannot succeed).
      "https://{agent_url}": null,
      "https://": null,
    },
  },
});

// DigitalOcean Functions run on OpenWhisk: each namespace serves the
// OpenWhisk REST API at its own `api_host`, which no published spec covers.
// manual-specs/functions.openapi.json models the part a runtime and a
// deploy need (actions and activations); it has no patches.
await runOpenApiConvert({
  root,
  specs: [{ name: "functions", specPath: "manual-specs/functions.openapi.json" }],
  patchesDir: false,
  options: {
    namespace: "com.digitalocean.functions",
    serviceName: "DigitalOceanFunctions",
    successStatuses: ["200", "202"],
  },
});
