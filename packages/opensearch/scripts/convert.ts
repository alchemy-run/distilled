#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the OpenSearch OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-opensearch/specs/opensearch-openapi.yaml
 *         (spec submodule — the merged single-file spec the OpenSearch
 *         project publishes; YAML, parsed with the `yaml` package)
 *         patches/*.json  (RFC-6902 patches to the Smithy model)
 * Output: .generated-specs/opensearch.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is OpenSearch's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 *
 * The spec models one API call as an operation group
 * (`x-operation-group: search`) with one operation per method and path
 * (`search.0` is `GET /_search`, `search.3` is `POST /{index}/_search`).
 * The official clients expose the group as one method that picks the path.
 * Two steps, both derived from the spec, give each variant a usable name:
 *
 *   1. Method aliases are dropped. Where a group offers one path under
 *      several methods (GET + POST for `search`, POST + PUT for `bulk`),
 *      the server treats them alike; only POST (else PUT) is kept. GET with
 *      a body is also the variant `fetch` refuses to send.
 *   2. Each remaining variant is named after its group (`indices.put_mapping`
 *      → `indicesPutMapping`, as in the official clients), plus `By<Label>`
 *      for each path label that not every variant of the group has:
 *      `search` (`/_search`) and `searchByIndex` (`/{index}/_search`).
 *
 * HEAD operations are converted too: `exists`, `indices.exists` and `ping`
 * answer with a status and no body.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

const METHODS = ["post", "put", "get", "delete", "head", "patch"] as const;

/** `node_id` → `NodeId`, `indices.put_mapping` → `IndicesPutMapping`. */
const pascal = (raw: string): string =>
  raw
    .split(/[._-]/)
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const labelsOf = (route: string): string[] =>
  [...route.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]!);

/** Operation name by upstream operationId, filled by {@link nameVariants}. */
const names = new Map<string, string>();

/** Step 1: keep one method per group and path (POST, else PUT, ...). */
const dropMethodAliases = (spec: any): void => {
  for (const item of Object.values<any>(spec.paths)) {
    const byGroup = new Map<string, string[]>();
    for (const method of METHODS) {
      const op = item[method];
      if (op === undefined || op.deprecated === true) continue;
      const group = op["x-operation-group"] ?? op.operationId;
      byGroup.set(group, [...(byGroup.get(group) ?? []), method]);
    }
    for (const methods of byGroup.values()) {
      for (const method of methods.slice(1)) delete item[method];
    }
  }
};

/** Step 2: `<group>` plus `By<Label>` for the labels that tell variants apart. */
const nameVariants = (spec: any): void => {
  const groups = new Map<string, { operationId: string; labels: string[] }[]>();
  for (const [route, item] of Object.entries<any>(spec.paths)) {
    for (const method of METHODS) {
      const op = item[method];
      if (op === undefined || op.deprecated === true) continue;
      const group = op["x-operation-group"] ?? op.operationId;
      groups.set(group, [
        ...(groups.get(group) ?? []),
        { operationId: op.operationId, labels: labelsOf(route) },
      ]);
    }
  }
  for (const [group, variants] of groups) {
    const shared = variants[0]!.labels.filter((label) =>
      variants.every((variant) => variant.labels.includes(label)),
    );
    const base = pascal(group);
    const seen = new Map<string, string>();
    for (const variant of variants) {
      const extra = variant.labels.filter((label) => !shared.includes(label));
      const name = extra.length === 0 ? base : `${base}By${extra.map(pascal).join("And")}`;
      const clash = seen.get(name);
      if (clash !== undefined) {
        throw new Error(
          `opensearch convert: ${clash} and ${variant.operationId} would both be named ${name}`,
        );
      }
      seen.set(name, variant.operationId);
      names.set(variant.operationId, name.charAt(0).toLowerCase() + name.slice(1));
    }
  }
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "opensearch",
      specPath: "specs/spec-mirror-opensearch/specs/opensearch-openapi.yaml",
      preprocess: (spec) => {
        dropMethodAliases(spec);
        nameVariants(spec);
      },
    },
  ],
  patchesDir: "patches",
  parse: (text) => parseYaml(text),
  options: {
    namespace: "org.opensearch.api",
    serviceName: "OpenSearch",
    skipDeprecated: true,
    extraHttpMethods: ["head"],
    operationNames: (operationId) => names.get(operationId),
  },
});
