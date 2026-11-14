#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn HydraDB's v2 OpenAPI description into a Smithy 2.0 model.
 *
 * Input:  specs/spec-mirror-hydradb/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the Smithy model)
 * Output: .generated-specs/hydradb.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is HydraDB's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Most success bodies are the `{ success, data, error, meta }` envelope and
 * the payload is `data`; HydraDBProtocol returns that `data`, so the
 * operation's output schema is the `data` schema (see {@link unwrapEnvelopes}).
 * The connector endpoints and `PATCH /databases/{database}/metadata-schema`
 * answer with the payload itself and keep their schema.
 *
 * Every failure is the shared `{ success, data, error: { code, message },
 * detail, meta }` envelope, so the HTTP status picks the class
 * (HydraDBProtocol, core's `HTTP_STATUS_MAP`). The two statuses the spec
 * documents beyond that map, `413` and `415` on `POST /context/ingest`, get
 * their own classes; error codes a caller acts on are patches in
 * `patches/`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** The members of the success envelope, exactly. */
const ENVELOPE_KEYS = ["data", "error", "meta", "success"].join(",");

/**
 * Re-point every 2xx JSON response whose schema is the success envelope
 * (properties exactly `data`, `error`, `meta`, `success`) at its `data`
 * schema. HydraDBProtocol applies the same rule to the body at run time.
 */
const unwrapEnvelopes = (spec: any): void => {
  const schemas: Record<string, any> = spec.components?.schemas ?? {};
  const resolve = (schema: any): any => {
    let current = schema;
    for (let hops = 0; current?.$ref !== undefined; hops++) {
      if (hops > 8) throw new Error(`${schema.$ref}: $ref chain too deep`);
      current = schemas[String(current.$ref).replace("#/components/schemas/", "")];
    }
    return current;
  };
  let unwrapped = 0;
  for (const [route, pathItem] of Object.entries<Record<string, any>>(spec.paths)) {
    for (const method of HTTP_METHODS) {
      for (const [status, response] of Object.entries<any>(pathItem[method]?.responses ?? {})) {
        const media = status.startsWith("2") ? response?.content?.["application/json"] : undefined;
        const schema = resolve(media?.schema);
        const keys = Object.keys(schema?.properties ?? {})
          .sort()
          .join(",");
        if (keys !== ENVELOPE_KEYS) continue;
        const { example: _example, ...data } = schema.properties.data;
        if (Object.keys(data).length === 0) {
          throw new Error(
            `${method.toUpperCase()} ${route} ${status}: envelope without a data schema`,
          );
        }
        media.schema = data;
        unwrapped++;
      }
    }
  }
  console.log(`🔧 ${unwrapped} response envelope(s) unwrapped to their \`data\``);
};

/**
 * Operation names. The spec has no operationIds, so every name would be
 * derived from its route; these follow the official SDK's method names
 * (`x-fern-sdk-group-name` + `x-fern-sdk-method-name`) as verbNoun.
 */
const OPERATION_NAMES: Record<string, string> = {
  // connectors
  "GET /connectors": "listConnectors",
  "POST /connectors": "createConnector",
  "GET /connectors/providers": "listConnectorProviders",
  "DELETE /connectors/{id}": "deleteConnector",
  "GET /connectors/{id}": "getConnector",
  "PATCH /connectors/{id}": "updateConnector",
  "POST /connectors/{id}/configure": "configureConnector",
  "GET /connectors/{id}/discover": "discoverConnectorResources",
  "POST /connectors/{id}/pause": "pauseConnector",
  "GET /connectors/{id}/resources": "listConnectorResources",
  "POST /connectors/{id}/resources": "createConnectorResource",
  "DELETE /connectors/{id}/resources/{resource_id}": "deleteConnectorResource",
  "PATCH /connectors/{id}/resources/{resource_id}": "updateConnectorResource",
  "POST /connectors/{id}/resume": "resumeConnector",
  "GET /connectors/{id}/status": "getConnectorStatus",
  "POST /connectors/{id}/sync": "syncConnector",
  // context
  "DELETE /context": "deleteContext",
  "POST /context/ingest": "ingestContext",
  "GET /context/inspect": "inspectContext",
  "POST /context/list": "listContext",
  "GET /context/relations": "listContextRelations",
  "GET /context/status": "getContextStatus",
  "GET /context/subgraph": "getContextSubgraph",
  "PATCH /context/{id}/metadata": "updateContextMetadata",
  "GET /context/{id}/subgraph": "getContextSubgraphById",
  // databases
  "DELETE /databases": "deleteDatabase",
  "GET /databases": "listDatabases",
  "POST /databases": "createDatabase",
  "DELETE /databases/collections": "deleteCollection",
  "GET /databases/collections": "listCollections",
  "GET /databases/stats": "getDatabaseStats",
  "GET /databases/status": "getDatabaseStatus",
  "GET /databases/{database}/metadata-schema": "getMetadataSchema",
  "PATCH /databases/{database}/metadata-schema": "updateMetadataSchema",
  // feedback and query
  "POST /feedback": "submitFeedback",
  "POST /query": "query",
  // webhooks
  "DELETE /webhooks/indexing": "deleteWebhook",
  "GET /webhooks/indexing": "getWebhook",
  "POST /webhooks/indexing": "registerWebhook",
  "GET /webhooks/indexing/deliveries": "listWebhookDeliveries",
  "GET /webhooks/indexing/deliveries/{delivery_id}": "getWebhookDelivery",
  "POST /webhooks/indexing/deliveries/{delivery_id}/retry": "retryWebhookDelivery",
  "DELETE /webhooks/indexing/signing-secret": "clearWebhookSigningSecret",
  "POST /webhooks/indexing/signing-secret": "setWebhookSigningSecret",
  "POST /webhooks/indexing/test": "testWebhook",
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "hydradb",
      specPath: "specs/spec-mirror-hydradb/specs/openapi.json",
      preprocess: (spec: any) => {
        // A name for a route the spec no longer has silently stops applying;
        // fail so the table is pruned with the spec.
        const routes = new Set<string>();
        for (const [route, pathItem] of Object.entries<Record<string, any>>(spec.paths)) {
          for (const method of HTTP_METHODS) {
            if (pathItem[method]) routes.add(`${method.toUpperCase()} ${route}`);
          }
        }
        const stale = Object.keys(OPERATION_NAMES).filter((key) => !routes.has(key));
        const unnamed = [...routes].filter((key) => !(key in OPERATION_NAMES));
        if (stale.length || unnamed.length) {
          throw new Error(
            `OPERATION_NAMES out of date — not in the spec: ${stale.join(", ") || "none"}; ` +
              `unnamed: ${unnamed.join(", ") || "none"}`,
          );
        }
        unwrapEnvelopes(spec);
      },
    },
  ],
  // Patches target upstream Smithy names before deferred operation renaming.
  patchesDir: "patches",
  options: {
    namespace: "com.hydradb.api",
    serviceName: "HydraDB",
    // `documents` on POST /context/ingest are `format: binary` file parts.
    binaryTypes: true,
    // DELETE /context takes `X-HydraDB-Delete-Status: strict` per call.
    headerParams: true,
    // Ingest (202) and connector sync (202) answer with a body.
    successStatuses: ["200", "201", "202"],
    // One failure envelope for every status: the protocol maps the status
    // (core's HTTP_STATUS_MAP). Only the two statuses that map has no class
    // for get one, on the operations that document them.
    statusToErrorClass: { "413": "ContentTooLarge", "415": "UnsupportedMediaType" },
    operationNames: OPERATION_NAMES,
  },
});
