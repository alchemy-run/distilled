#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Polymarket's REST OpenAPI documents into Smithy 2.0 JSON
 * models, one per API.
 *
 * Input:  specs/spec-mirror-polymarket/specs/{gamma,clob,relayer,bridge,combos-rfq}.yaml
 *         specs/spec-mirror-polymarket/specs/{data,perps}.json
 * Output: .generated-specs/<api>.json
 *
 * Each API has its own host, so each model becomes its own service module
 * with its own protocol (see src/protocol.ts). Failures are dispatched by
 * HTTP status in the protocol (`statusToErrorClass: {}`): the documents
 * type error bodies only as a status list over a shared `{ error }` shape.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

const spec = (
  name: string,
  file: string,
  serviceName: string,
  options: { readonly operationNames?: Readonly<Record<string, string>> } = {},
) => ({
  name,
  specPath: `specs/spec-mirror-polymarket/specs/${file}`,
  options: {
    namespace: `com.polymarket.${name.replace(/-/g, "")}`,
    serviceName,
    ...options,
  },
});

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    spec("gamma", "gamma.yaml", "Gamma"),
    // `postOrder` and `postOrders` both read as `createOrder`.
    spec("clob", "clob.yaml", "Clob", { operationNames: { "POST /orders": "createOrders" } }),
    spec("data", "data.json", "Data"),
    spec("relayer", "relayer.yaml", "Relayer"),
    spec("bridge", "bridge.yaml", "Bridge"),
    spec("combos-rfq", "combos-rfq.yaml", "CombosRfq"),
    spec("perps", "perps.json", "Perps"),
  ],
  parse: (text, specPath) => (specPath.endsWith(".json") ? JSON.parse(text) : parseYaml(text)),
  options: {
    namespace: "com.polymarket",
    serviceName: "Polymarket",
    skipDeprecated: true,
    statusToErrorClass: {},
  },
});
