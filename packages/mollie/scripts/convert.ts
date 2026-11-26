#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Mollie API's OpenAPI description → a Smithy JSON model in
 * .generated-specs.
 *
 * Mollie publishes ONE OpenAPI 3.1 document, as YAML (mirrored verbatim at
 * `specs/spec-mirror-mollie/specs/specs.yaml`). Its tags split the API into
 * reference pages, not services: every route shares one host, one auth
 * scheme and one error format. So the whole API is one model and one
 * service module, re-exported at the package root (`Mollie.createPayment`).
 *
 * Every operation declares its non-2xx statuses, so they are typed per
 * operation: the converter's default status → class map, plus 410, which
 * Mollie answers for a resource that no longer exists (a revoked pairing
 * code, a deleted webhook). Core has no class for it.
 *
 * Mollie answers HAL: every response body is documented as
 * `application/hal+json`, which is JSON with `_links` and `_embedded`
 * members. The converter reads success bodies from `application/json`
 * only, so {@link halAsJson} gives each response an `application/json`
 * entry with the same schema (as mongodb-atlas does for its vendor types).
 *
 * Pagination, sensitive members and the routes the shared REST protocol
 * can't call are patches in `patches/`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

const HAL_JSON = "application/hal+json";

/** Copy every response's `application/hal+json` media entry to `application/json`. */
const halAsJson = (spec: any): void => {
  const responses = [
    ...Object.values<any>(spec.components?.responses ?? {}),
    ...Object.values<any>(spec.paths ?? {}).flatMap((item) =>
      Object.values<any>(item ?? {}).flatMap((op) =>
        op && typeof op === "object" && op.responses ? Object.values<any>(op.responses) : [],
      ),
    ),
  ];
  for (const response of responses) {
    const content = response?.content;
    if (content?.[HAL_JSON] !== undefined && content["application/json"] === undefined) {
      content["application/json"] = content[HAL_JSON];
    }
  }
};

const SCHEMA_REF = "#/components/schemas/";

const pascal = (id: string) =>
  id
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

/**
 * A schema component named like an operation (`create-webhook`, the
 * response of the `create-webhook` operation) takes the operation's shape
 * name, so the operation generates as `createWebhook2`. Re-key each such
 * component with a `-response` suffix and repoint its refs (as revenuecat
 * does with titles; Mollie's components have none).
 */
const rekeyOperationNamedSchemas = (spec: any): void => {
  const schemas: Record<string, any> = spec.components?.schemas ?? {};
  const operationNames = new Set(
    Object.values<any>(spec.paths ?? {})
      .flatMap((item) => Object.values<any>(item ?? {}))
      .flatMap((op) => (typeof op?.operationId === "string" ? [pascal(op.operationId)] : [])),
  );
  const renames = new Map<string, string>();
  for (const key of Object.keys(schemas)) {
    const renamed = `${key}-response`;
    if (operationNames.has(pascal(key)) && !(renamed in schemas)) renames.set(key, renamed);
  }
  for (const [key, renamed] of renames) {
    schemas[renamed] = schemas[key];
    delete schemas[key];
  }
  const repoint = (node: unknown): void => {
    if (node === null || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const renamed =
      typeof obj.$ref === "string" && obj.$ref.startsWith(SCHEMA_REF)
        ? renames.get(obj.$ref.slice(SCHEMA_REF.length))
        : undefined;
    if (renamed !== undefined) obj.$ref = `${SCHEMA_REF}${renamed}`;
    Object.values(obj).forEach(repoint);
  };
  repoint(spec);
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "mollie",
      specPath: "specs/spec-mirror-mollie/specs/specs.yaml",
      preprocess: (spec) => {
        halAsJson(spec);
        rekeyOperationNamedSchemas(spec);
      },
    },
  ],
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.mollie",
    serviceName: "Mollie",
    // The header parameters are per-call inputs: `idempotency-key` (retry a
    // create without making a second payment) and the request-signing pair
    // `X-Client-Signature` / `X-Client-Signed-At`. The only others,
    // `Authorization` and `Content-Type`, sit on the OAuth token routes
    // that `patches/oauth-tokens.json` removes.
    headerParams: true,
    // Irregular names, keyed by `METHOD path`; the rest are verbNoun.
    operationNames: {
      "GET /v2/payment-links/{paymentLinkId}/payments": "listPaymentLinkPayments",
      "GET /v2/payments/{paymentId}/routes": "listPaymentRoutes",
      "POST /v2/payments/{paymentId}/routes": "createPaymentRoute",
      "GET /v2/payments/{paymentId}/routes/{routeId}": "getPaymentRoute",
      "GET /v2/terminals/pairing-codes": "listTerminalPairingCodes",
      "POST /v2/terminals/pairing-codes": "requestTerminalPairingCode",
      "GET /v2/terminals/pairing-codes/{pairingCodeId}": "getTerminalPairingCode",
      "DELETE /v2/terminals/pairing-codes/{pairingCodeId}": "revokeTerminalPairingCode",
      "POST /v2/unmatched-credit-transfers/{unmatchedCreditTransferId}/match":
        "matchUnmatchedCreditTransfer",
      "POST /v2/unmatched-credit-transfers/{unmatchedCreditTransferId}/return":
        "returnUnmatchedCreditTransfer",
    },
    statusToErrorClass: {
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "410": "Gone",
      "422": "UnprocessableEntity",
    },
  },
});
