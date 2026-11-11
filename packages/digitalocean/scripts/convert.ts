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
import * as fs from "node:fs";
import * as path from "node:path";
import { readModel, writeModel } from "@distilled.cloud/dev/codegen/models";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

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

// Data-plane operations declare their own `servers` (Serverless Inference on
// `https://inference.do-ai.run`, the Action Gateway on
// `https://actions.do-ai.run`). Stamp each one onto the operation's
// `smithy.api#http.baseUrl` so the protocol sends it to that host instead of
// the control-plane API. Templated servers (`https://{agent_url}`) name a
// host only the caller knows and keep the default.
const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;
const spec = JSON.parse(
  fs.readFileSync(
    resolveSpecPath(root, "specs/spec-mirror-digitalocean/specs/openapi.json"),
    "utf8",
  ),
);
const defaultServer = String(spec.servers?.[0]?.url ?? "").replace(/\/+$/, "");
const serverByRoute = new Map<string, string>();
for (const [pathTemplate, pathItem] of Object.entries<any>(spec.paths ?? {})) {
  for (const method of HTTP_METHODS) {
    const op = pathItem?.[method];
    if (!op) continue;
    const url = String((op.servers ?? pathItem.servers)?.[0]?.url ?? "").replace(/\/+$/, "");
    if (url === "" || url === defaultServer || /[{}]/.test(url) || !/^https:\/\/[^/]+/.test(url)) {
      continue;
    }
    serverByRoute.set(`${method.toUpperCase()} ${pathTemplate}`, url);
  }
}
const modelPath = path.join(root, ".generated-specs", "digitalocean.json");
const model = readModel(modelPath);
let stamped = 0;
for (const shape of Object.values<any>(model.shapes ?? {})) {
  if (shape?.type !== "operation") continue;
  const http = shape.traits?.["smithy.api#http"];
  if (!http || typeof http !== "object") continue;
  const url = serverByRoute.get(`${http.method} ${http.uri}`);
  if (url === undefined) continue;
  http.baseUrl = url;
  stamped++;
}
writeModel(modelPath, model);
console.log(`   stamped ${stamped} data-plane operation hosts`);
