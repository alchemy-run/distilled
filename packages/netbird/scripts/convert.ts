#!/usr/bin/env -S node --conditions=bun
/**
 * convert — NetBird's management API spec → the Smithy model in
 * .generated-specs/netbird.json.
 *
 * NetBird publishes ONE OpenAPI 3.1 document in YAML (mirrored at
 * `specs/spec-mirror-netbird/specs/openapi.yml`, pinned to a release tag),
 * covering ~230 operations under one `/api` root. It converts into a single
 * service module. Only 54 operations carry an operationId; the converter names
 * the rest verbNoun from method and path (`getPolicy`, `listPeers`).
 *
 * `patches/*.json` correct the model where NetBird's servers disagree with
 * the spec (lists sent as `null`, credentials not marked sensitive).
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "netbird",
      specPath: "specs/spec-mirror-netbird/specs/openapi.yml",
    },
  ],
  parse: (text) => parseYaml(text),
  patchesDir: "patches",
  options: {
    namespace: "io.netbird.api",
    serviceName: "NetBird",
    skipDeprecated: true,
  },
});
