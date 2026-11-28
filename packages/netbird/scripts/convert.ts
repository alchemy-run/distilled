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
 *
 * NetBird marks experimental APIs `x-experimental: true`, on an operation or
 * on a tag. An operation with the mark, or with a tag that has it, is marked
 * `smithy.api#unstable`, so generate writes it to `unstable/netbird`.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

/** Names of the tags the spec marks `x-experimental: true`. */
let experimentalTags = new Set<string>();

const isExperimental = (op: Record<string, any>): boolean =>
  op["x-experimental"] === true ||
  (Array.isArray(op.tags) && op.tags.some((tag: string) => experimentalTags.has(tag)));

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "netbird",
      specPath: "specs/spec-mirror-netbird/specs/openapi.yml",
      preprocess: (spec) => {
        experimentalTags = new Set(
          (spec.tags ?? [])
            .filter((tag: any) => tag?.["x-experimental"] === true)
            .map((tag: any) => tag.name),
        );
      },
    },
  ],
  parse: (text) => parseYaml(text),
  patchesDir: "patches",
  options: {
    namespace: "io.netbird.api",
    serviceName: "NetBird",
    skipDeprecated: true,
    unstableOperation: isExperimental,
  },
});
