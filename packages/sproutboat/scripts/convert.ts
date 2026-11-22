#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Sproutboat Cloud API's OpenAPI description → a Smithy JSON
 * model in .generated-specs.
 *
 * Sproutboat publishes ONE OpenAPI 3.1 document, as YAML (mirrored verbatim
 * at `specs/spec-mirror-sproutboat/specs/openapi.yaml`). Its tags split the
 * API into reference pages, not services: every route shares one host, one
 * auth scheme and one error format. So the whole API is one model and one
 * service module, re-exported at the package root (`Sproutboat.getApp`).
 *
 * Every operation declares its non-2xx statuses, so they are typed per
 * operation: the converter's default status → class map, plus 413, which
 * Sproutboat answers for an upload over the route's limit. Core has no class
 * for it.
 *
 * Source, asset and R2 object bodies are bytes, so binary types are on.
 * The routes the converter can't read as declared (octet-stream uploads, the
 * multi-segment R2 key, the build log's event stream), typed errors and
 * sensitive members are patches in `patches/`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "sproutboat",
      specPath: "specs/spec-mirror-sproutboat/specs/openapi.yaml",
    },
  ],
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.sproutboat",
    serviceName: "Sproutboat",
    binaryTypes: true,
    // Irregular names, keyed by `METHOD path`; the rest are verbNoun.
    operationNames: {
      "POST /v1/sources/missing": "findMissingSources",
      "POST /v1/assets/missing": "findMissingAssets",
    },
    statusToErrorClass: {
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "413": "PayloadTooLarge",
      "422": "UnprocessableEntity",
    },
  },
});
