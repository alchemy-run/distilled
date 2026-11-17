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

// DigitalOcean Functions run on Apache OpenWhisk: each namespace serves the
// OpenWhisk REST API at its own `api_host`. The mirror carries Apache's spec
// (core/controller/src/main/resources/apiv1swagger.json).
await runOpenApiConvert({
  root,
  specs: [
    {
      name: "functions",
      specPath: "specs/spec-mirror-digitalocean/specs/openwhisk.json",
      // Swagger 2.0 keeps the `/api/v1` prefix in `basePath`, which the
      // converter does not read; fold it into each route.
      preprocess: (spec) => {
        const basePath = String(spec.basePath ?? "").replace(/\/+$/, "");
        if (basePath === "") return;
        spec.paths = Object.fromEntries(
          Object.entries(spec.paths).map(([route, item]) => [`${basePath}${route}`, item]),
        );
        delete spec.basePath;
      },
    },
  ],
  // patches/functions/*.patch.json (the main spec reads the flat patches/).
  patchesDir: "patches",
  options: {
    namespace: "com.digitalocean.functions",
    serviceName: "DigitalOceanFunctions",
    successStatuses: ["200", "202"],
  },
});
