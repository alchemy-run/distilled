#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Jira Cloud platform REST API v3's OpenAPI description → a
 * Smithy JSON model in .generated-specs.
 *
 * Atlassian publishes ONE OpenAPI 3 document for the Jira Cloud platform REST
 * API v3 (mirrored at `specs/spec-mirror-jira/specs/openapi.json`). Its tags
 * split the API into reference pages, not services: every route shares one
 * host, one auth scheme and one error format. So the whole API is one model
 * and one service module, re-exported at the package root
 * (`Jira.getIssue`).
 *
 * Operations the spec marks `deprecated` are left out. The Atlassian Connect
 * routes, whose `operationId`s are Java resource methods, are named in
 * `scripts/operation-names.ts`.
 *
 * Operations the spec marks `x-experimental: true` are marked
 * `smithy.api#unstable`, so generate writes them to
 * `src/unstable-services/jira.ts` (`@distilled.cloud/jira/unstable/jira`).
 *
 * Pagination and sensitive members are patches in `patches/`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { operationNames } from "./operation-names.ts";

/** Atlassian's experimental flag: not generally available. */
const isExperimental = (op: Record<string, any>): boolean => op["x-experimental"] === true;

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "jira",
      specPath: "specs/spec-mirror-jira/specs/openapi.json",
    },
  ],
  options: {
    namespace: "com.atlassian.jira",
    serviceName: "Jira",
    skipDeprecated: true,
    operationNames,
    unstableOperation: isExperimental,
  },
});
