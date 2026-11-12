#!/usr/bin/env node
/**
 * Fetches the structure of the Proxmox VE API schema to ../specs/.
 *
 * Proxmox publishes its API as JSON Schema inside the API viewer's
 * `apidoc.js` (`const apiSchema = [...]`), served with the documentation of
 * the current release. This script downloads that file, reads the array
 * literal as JSON without running any JavaScript, and keeps only its
 * structure.
 *
 * The schema mixes interface structure (paths, methods, parameter names,
 * types, formats, enums, constraints, flags) with documentation text
 * (descriptions, type texts, titles, permission texts). The mirror stores
 * the structure and none of the text.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Output:
 *   ../specs/api-structure.json   the structural schema
 */
import { mkdir, writeFile } from "node:fs/promises";

const APIDOC_URL = "https://pve.proxmox.com/pve-docs/api-viewer/apidoc.js";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/api-structure.json`;

/**
 * Keywords kept from every parameter and return schema. Anything else
 * (`description`, `verbose_description`, `format_description`, `typetext`,
 * `title`, `renderer`, `links`, ...) is dropped. The package converter
 * applies the same list again.
 */
const KEYWORDS = new Set([
  "type",
  "properties",
  "items",
  "optional",
  "enum",
  "default",
  "default_key",
  "alias",
  "keyAlias",
  "format",
  "pattern",
  "requires",
  "minimum",
  "maximum",
  "min",
  "max",
  "minLength",
  "maxLength",
  "additionalProperties",
]);

/** Operation fields kept. Permissions are dropped; the token and protection flags remain. */
const OPERATION_FIELDS = ["name", "allowtoken", "protected"] as const;

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const isObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Copies a schema with the structural keywords only, recursing into nested schemas. */
function structural(schema: JsonObject): JsonObject {
  const copy: JsonObject = {};
  for (const [key, value] of Object.entries(schema)) {
    if (!KEYWORDS.has(key)) continue;
    // Some defaults describe computed behavior in words instead of giving a value.
    if (key === "default" && typeof value === "string" && /\s/.test(value)) continue;
    if (!isObject(value)) copy[key] = value;
    else if (key === "properties" || key === "format") copy[key] = structuralMap(value);
    else if (key === "items" || key === "additionalProperties") copy[key] = structural(value);
    else copy[key] = value;
  }
  return copy;
}

const structuralMap = (schemas: JsonObject): JsonObject =>
  Object.fromEntries(
    Object.entries(schemas).map(([key, value]) => [
      key,
      isObject(value) ? structural(value) : value,
    ]),
  );

/** One tree node with its operations reduced to structure. Counts operations on the way. */
function stripNode(node: unknown, counter: { operations: number }): JsonObject {
  if (!isObject(node) || typeof node.path !== "string") throw new Error("Invalid schema tree node");
  const info = node.info ?? {};
  const children = node.children ?? [];
  if (!isObject(info) || !Array.isArray(children)) throw new Error("Invalid schema tree structure");
  const out: JsonObject = { path: node.path };
  const operations = Object.entries(info);
  if (operations.length > 0) {
    out.info = Object.fromEntries(
      operations.map(([method, operation]) => {
        if (!/^(?:GET|POST|PUT|DELETE)$/.test(method) || !isObject(operation))
          throw new Error(`Invalid operation ${method} ${node.path}`);
        counter.operations++;
        const kept: JsonObject = {};
        for (const field of OPERATION_FIELDS) {
          const value = operation[field];
          if (value !== undefined) kept[field] = value;
        }
        if (isObject(operation.parameters)) kept.parameters = structural(operation.parameters);
        if (isObject(operation.returns)) kept.returns = structural(operation.returns);
        return [method, kept];
      }),
    );
  }
  if (children.length > 0) out.children = children.map((child) => stripNode(child, counter));
  return out;
}

/**
 * A second guard behind the allowlist: names and values are identifiers, so a
 * string with whitespace outside a regular expression is text that slipped
 * through.
 */
function assertNoText(value: Json, key = ""): void {
  if (typeof value === "string") {
    if (key !== "pattern" && /\s/.test(value))
      throw new Error(`Text left in a "${key}" value after stripping`);
  } else if (Array.isArray(value)) {
    for (const item of value) assertNoText(item, key);
  } else if (isObject(value)) {
    for (const [name, item] of Object.entries(value)) {
      if (/\s/.test(name)) throw new Error("Text left in a key after stripping");
      assertNoText(item, name);
    }
  }
}

async function main() {
  console.log(`Fetching ${APIDOC_URL}...`);
  const response = await fetch(APIDOC_URL, {
    headers: { "user-agent": "distilled.cloud-proxmox-spec-mirror" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${APIDOC_URL}: ${response.status} ${response.statusText}`);
  }
  const apidoc = await response.text();

  // Read the array literal as JSON. The script itself is never evaluated.
  const literal = apidoc.match(/^const apiSchema = (\[[\s\S]*?^\])/m)?.[1];
  if (!literal) throw new Error(`${APIDOC_URL} has no apiSchema array`);
  const schema: unknown = JSON.parse(literal);
  if (!Array.isArray(schema) || schema.length === 0) throw new Error("The schema is empty");

  const counter = { operations: 0 };
  const structure = schema.map((node) => stripNode(node, counter));
  // A gutted or truncated download still parses; the API has hundreds of operations.
  if (counter.operations < 100) {
    throw new Error(`Only ${counter.operations} operations in ${APIDOC_URL}`);
  }
  assertNoText(structure);

  await mkdir(SPECS_DIR, { recursive: true });
  // 2-space indent + trailing newline, so an unchanged schema writes the same bytes.
  await writeFile(OUTPUT_PATH, JSON.stringify(structure, null, 2) + "\n");
  console.log(`Done! ${counter.operations} operations`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
