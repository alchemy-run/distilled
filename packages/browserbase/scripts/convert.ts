#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Browserbase API's OpenAPI description → a Smithy JSON model
 * in .generated-specs.
 *
 * Browserbase publishes ONE OpenAPI 3.0 document, as YAML (mirrored verbatim
 * at `specs/spec-mirror-browserbase/specs/openapi.v1.yaml`). Its operations
 * carry no tags, so the whole API is one model and one service module,
 * re-exported at the package root (`Browserbase.createSession`).
 *
 * Every operation declares its non-2xx statuses, so they are typed per
 * operation: the converter's default status → class map, plus the two client
 * statuses Browserbase declares that core has no class for — 402 when the
 * plan's quota is exhausted (`createSession`) and 410 for an expired run or
 * replay. Without a class those fall to `UnknownBrowserbaseError`.
 *
 * Uploads (session files, extensions, certificates) are multipart, so binary
 * types are on. Pagination and sensitive members are patches in `patches/`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "browserbase",
      specPath: "specs/spec-mirror-browserbase/specs/openapi.v1.yaml",
    },
  ],
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.browserbase",
    serviceName: "Browserbase",
    binaryTypes: true,
    // Irregular names, keyed by `METHOD path`; the rest are verbNoun.
    operationNames: {
      "GET /v1/agents/runs/{runId}/messages": "listAgentRunMessages",
      "POST /v1/fetch": "fetchPage",
      "GET /v1/projects/{id}/usage": "getProjectUsage",
    },
    statusToErrorClass: {
      "400": "BadRequest",
      "402": "PaymentRequired",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "410": "Gone",
      "422": "UnprocessableEntity",
    },
  },
});
