#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the RevenueCat REST API v2 OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/spec-mirror-revenuecat/specs/openapi.yaml  (spec submodule)
 * Output: .generated-specs/revenuecat.json
 */
import * as path from "node:path";
import { SENSITIVE_FIELD_PATTERNS } from "@distilled.cloud/dev/codegen/openapi";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

const SCHEMA_REF = "#/components/schemas/";

const pascal = (id: string) =>
  id
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

/**
 * The list responses are keyed by their operation's name (`list-apps`
 * returns `ListApps`), so the operation shape loses the name and generates as
 * `listApps2`. Re-key each such component under its `title` (`AppList`).
 */
const rekeyOperationNamedSchemas = (spec: any) => {
  const schemas: Record<string, any> = spec.components?.schemas ?? {};
  const operationNames = new Set(
    Object.values<any>(spec.paths ?? {})
      .flatMap((item) => Object.values<any>(item))
      .flatMap((op) => (typeof op?.operationId === "string" ? [pascal(op.operationId)] : [])),
  );
  const renames = new Map(
    Object.entries(schemas)
      .filter(
        ([key, schema]) =>
          operationNames.has(key) &&
          typeof schema?.title === "string" &&
          !(schema.title in schemas),
      )
      .map(([key, schema]) => [key, schema.title as string]),
  );
  for (const [key, title] of renames) {
    schemas[title] = schemas[key];
    delete schemas[key];
  }
  const repoint = (node: unknown): void => {
    if (node === null || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const title =
      typeof obj.$ref === "string" && obj.$ref.startsWith(SCHEMA_REF)
        ? renames.get(obj.$ref.slice(SCHEMA_REF.length))
        : undefined;
    if (title !== undefined) obj.$ref = `${SCHEMA_REF}${title}`;
    Object.values(obj).forEach(repoint);
  };
  repoint(spec);
  return spec;
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "revenuecat",
      specPath: "specs/spec-mirror-revenuecat/specs/openapi.yaml",
    },
  ],
  patchesDir: false,
  parse: (text) => rekeyOperationNamedSchemas(parseYaml(text)),
  options: {
    namespace: "com.revenuecat.api",
    serviceName: "RevenueCat",
    skipDeprecated: true,
    sensitivePatterns: [
      ...SENSITIVE_FIELD_PATTERNS,
      /_api_key$/i,
      /_private_key$/i,
      /_credentials_json$/i,
      /^authorization_header$/i,
    ],
  },
});
