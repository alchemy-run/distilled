#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Bitbucket Cloud REST API's OpenAPI description → a Smithy
 * JSON model in .generated-specs.
 *
 * Atlassian publishes ONE OpenAPI 3 document for `https://api.bitbucket.org/2.0`
 * (mirrored at `specs/spec-mirror-bitbucket/specs/openapi.json`). Its tags
 * split the API into reference pages, not services: every route shares one
 * host, one auth scheme and one error format. So the whole API is one model
 * and one service module, re-exported at the package root
 * (`Bitbucket.getRepository`).
 *
 * Operations the spec marks `deprecated` are left out: the cross-workspace
 * `teams/*` and `users/*` pipeline variables, the `*\/search/code` routes and
 * the app-hosted `properties` routes.
 *
 * Most operations have no `operationId`; `scripts/operation-names.ts` names
 * them after their spec `summary`, because their routes alone name them
 * badly.
 *
 * Pagination, the `page` / `pagelen` query members it needs, and sensitive
 * members are patches in `patches/`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { operationNames } from "./operation-names.ts";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "bitbucket",
      specPath: "specs/spec-mirror-bitbucket/specs/openapi.json",
    },
  ],
  options: {
    namespace: "org.bitbucket",
    serviceName: "Bitbucket",
    skipDeprecated: true,
    operationNames,
    statusToErrorClass: {
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "410": "Gone",
    },
  },
});
