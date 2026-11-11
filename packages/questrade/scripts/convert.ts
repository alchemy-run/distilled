#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Questrade API documentation → one Smithy JSON model in
 * .generated-specs.
 *
 * Input:  specs/spec-mirror-questrade/specs/_manifest.json  (+ one JSON
 *         file per documentation page beside it)
 *         patches/*.json  (RFC-6902 patches to the Smithy model)
 * Output: .generated-specs/questrade.json
 *
 * Questrade publishes no OpenAPI document. The spec mirror transcribes its
 * documentation pages, and `docs-to-openapi.ts` reads them into one OpenAPI
 * document (see that file for how each table and sample is read); the shared
 * OpenAPI → Smithy conversion takes it from there. Where the documentation
 * contradicts itself, the fix is a patch in patches/.
 *
 * Every operation sits under `/v1` on the API server the OAuth token
 * exchange names (`api_server`), so the model carries no base URL; the
 * protocol takes it from the credentials.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { docsToOpenApi } from "./docs-to-openapi.ts";

const root = path.resolve(import.meta.dirname, "..");
const MANIFEST = "specs/spec-mirror-questrade/specs/_manifest.json";

/**
 * Operation names by route. The documentation has no operation ids, and
 * names derived from the route alone come out wrong for most of these:
 * `POST …/orders/impact` estimates an order, `POST /v1/markets/quotes/options`
 * reads quotes, and `{id}` is an account on some routes and a symbol on
 * others.
 */
const OPERATION_NAMES: Record<string, string> = {
  "GET /v1/time": "getTime",
  "GET /v1/accounts/{id}/orders/{orderId}": "getOrder",
  "GET /v1/accounts/{id}/orders": "listOrders",
  "GET /v1/accounts/{id}/activities": "listActivities",
  "GET /v1/accounts/{id}/executions": "listExecutions",
  "GET /v1/accounts/{id}/balances": "getBalances",
  "GET /v1/accounts/{id}/positions": "listPositions",
  "GET /v1/markets/candles/{id}": "listCandles",
  "GET /v1/markets/quotes/{id}": "getQuote",
  "GET /v1/markets/quotes": "listQuotes",
  "POST /v1/markets/quotes/options": "getOptionQuotes",
  "POST /v1/markets/quotes/strategies": "getStrategyQuotes",
  "GET /v1/symbols/{id}": "getSymbol",
  "GET /v1/symbols": "listSymbols",
  "GET /v1/symbols/{id}/options": "getOptionChain",
  "GET /v1/symbols/search": "searchSymbols",
  "POST /v1/accounts/{id}/orders": "placeOrder",
  "POST /v1/accounts/{id}/orders/impact": "getOrderImpact",
  "DELETE /v1/accounts/{id}/orders/{orderId}": "cancelOrder",
  "POST /v1/accounts/{id}/orders/bracket": "placeBracketOrder",
  "POST /v1/accounts/{id}/orders/bracket/impact": "getBracketOrderImpact",
  "POST /v1/accounts/{id}/orders/strategy": "placeStrategyOrder",
  "POST /v1/accounts/{id}/orders/strategy/impact": "getStrategyOrderImpact",
};

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "questrade",
      specPath: MANIFEST,
      // The manifest only lists the pages; read them from the same directory.
      preprocess: () => {
        const { spec, warnings } = docsToOpenApi(path.dirname(resolveSpecPath(root, MANIFEST)));
        for (const warning of warnings) console.log(`   ⚠️  ${warning}`);
        return spec;
      },
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.questrade.api",
    serviceName: "Questrade",
    // The documentation lists no error per operation: every call answers a
    // failure with `{ code, message }` and the status the error-handling
    // page gives the code, which the protocol maps through core's shared
    // status classes.
    statusToErrorClass: {},
    operationNames: OPERATION_NAMES,
  },
});
