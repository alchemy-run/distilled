/**
 * Proxmox API schema tree -> Smithy models (dev-time only).
 *
 * Proxmox describes its API as a tree of path nodes. Each node carries its
 * operations under `info.<METHOD>` and its subpaths under `children`, with
 * JSON Schema for parameters and returns. `convert` turns the tree into one
 * Smithy model per API area (`nodes_lxc`, `nodes_qemu`, `cluster`, ...).
 *
 * The spec mirror already stores only the structure of the schema. The
 * converter applies the same keyword allowlist again, so documentation text
 * cannot reach a model even from a schema that still has it.
 */

export interface JsonSchema {
  readonly type?: string;
  readonly optional?: number | boolean;
  readonly properties?: Readonly<Record<string, JsonSchema>>;
  readonly items?: JsonSchema;
  readonly enum?: ReadonlyArray<string | number>;
  readonly format?: unknown;
  readonly [key: string]: unknown;
}

export interface ApiOperation {
  readonly name: string;
  readonly parameters?: JsonSchema;
  readonly returns?: JsonSchema;
  readonly allowtoken?: number;
  readonly protected?: number;
  readonly [key: string]: unknown;
}

export interface ApiNode {
  readonly path: string;
  readonly children?: ReadonlyArray<ApiNode>;
  readonly info?: Readonly<Record<string, ApiOperation>>;
}

export interface Member {
  readonly target: string;
  readonly traits?: Record<string, unknown>;
}

export interface Shape {
  readonly type: string;
  readonly traits?: Record<string, unknown>;
  readonly members?: Record<string, Member>;
  readonly member?: Member;
  readonly key?: Member;
  readonly value?: Member;
  readonly input?: Member;
  readonly output?: Member;
  readonly version?: string;
  readonly operations?: Member[];
}

export interface Model {
  readonly smithy: string;
  readonly metadata: Record<string, unknown>;
  readonly shapes: Record<string, Shape>;
}

/** The pinned `pve-docs` release the mirror extracts. */
export const SOURCE_VERSION = "9.2.4";
/** Operations in that release. Convert fails on any other count. */
export const OPERATION_COUNT = 678;

/** A property-string format: an inline sub-schema or the name of a format. */
export const FORMAT = "proxmox.api#format";
/** An indexed member family such as `net[n]` (`net0`, `net1`, ...). */
export const FAMILY = "proxmox.api#family";

/**
 * The only keywords a model keeps from a schema. Descriptions, type texts,
 * titles and permission texts are documentation, so they never reach a
 * generated file.
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

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const structuralMap = (schemas: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(schemas).map(([key, value]) => [
      key,
      isObject(value) ? structural(value) : value,
    ]),
  );

/** Copies a schema with structural keywords only, recursing into nested schemas. */
export function structural(schema: Record<string, unknown>): Record<string, unknown> {
  const copy: Record<string, unknown> = {};
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

/** Checks the shape `convert` walks; the schemas inside are read defensively. */
export const isApiTree = (value: unknown): value is ApiNode[] =>
  Array.isArray(value) &&
  value.every(
    (node) =>
      isObject(node) &&
      typeof node.path === "string" &&
      (node.info === undefined || isObject(node.info)) &&
      (node.children === undefined || isApiTree(node.children)),
  );

const pascal = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join("");

const PRELUDE: Record<string, string> = {
  string: "smithy.api#String",
  integer: "smithy.api#Integer",
  number: "smithy.api#Double",
  boolean: "smithy.api#Boolean",
  null: "smithy.api#Unit",
};

export function convert(tree: ReadonlyArray<ApiNode>) {
  const models: Record<string, Model> = {};
  let count = 0;
  function visit(node: ApiNode) {
    const parts = node.path.split("/").filter((p) => p && !p.startsWith("{"));
    const area =
      parts[0] === "nodes" && parts[1] ? `nodes_${parts[1].replaceAll("-", "_")}` : parts[0]!;
    for (const [method, operation] of Object.entries(node.info ?? {})) {
      const model = (models[area] ??= {
        smithy: "2.0",
        metadata: { source: `pve-docs ${SOURCE_VERSION}` },
        shapes: {},
      });
      const ns = `proxmox.${area}#`;
      // Path labels keep collection and item operations apart: Proxmox reuses
      // the same operation names across paths.
      const name = pascal(method.toLowerCase() + " " + node.path.replace(/\{([^}]+)\}/g, "by $1"));
      const id = ns + name;
      if (model.shapes[id]) throw new Error(`Duplicate operation ${id}`);
      const shape = (schema: JsonSchema, local: string): string => {
        const target = ns + local;
        if (schema.type === "object" || schema.properties) {
          model.shapes[target] =
            !schema.properties || Object.keys(schema.properties).length === 0
              ? {
                  type: "map",
                  key: { target: "smithy.api#String" },
                  value: { target: "smithy.api#Document" },
                }
              : { type: "structure", members: members(schema, local) };
        } else if (schema.type === "array") {
          model.shapes[target] = {
            type: "list",
            member: { target: shape(schema.items ?? {}, local + "Item") },
          };
        } else if (schema.enum && schema.type === "string") {
          model.shapes[target] = {
            type: "enum",
            members: Object.fromEntries(
              schema.enum.map((value, i) => [
                `Value${i}`,
                { target: "smithy.api#Unit", traits: { "smithy.api#enumValue": value } },
              ]),
            ),
          };
        } else {
          return PRELUDE[schema.type ?? ""] ?? "smithy.api#Document";
        }
        return target;
      };
      const members = (schema: JsonSchema, local: string, input = false): Record<string, Member> =>
        Object.fromEntries(
          Object.entries(schema.properties ?? {}).map(([key, value]) => {
            const family = key.includes("[n]");
            const traits: Record<string, unknown> = {};
            if (!value.optional && !family) traits["smithy.api#required"] = {};
            if (value.format !== undefined)
              traits[FORMAT] = isObject(value.format) ? structuralMap(value.format) : value.format;
            if (family) traits[FAMILY] = { pattern: key, schema: structural(value) };
            if (input) {
              if (node.path.includes(`{${key}}`)) traits["smithy.api#httpLabel"] = {};
              else if (method === "GET" || method === "DELETE")
                traits["smithy.api#httpQuery"] = key;
            }
            return [key, { target: shape(value, local + pascal(key)), traits }];
          }),
        );
      model.shapes[id + "Request"] = {
        type: "structure",
        members: members(operation.parameters ?? {}, name + "Request", true),
      };
      const output = shape(operation.returns ?? {}, name + "Result");
      model.shapes[id + "Response"] = {
        type: "structure",
        members: {
          data: {
            target: output,
            traits: { "smithy.api#required": {}, "com.distilled.openapi#rawResponse": {} },
          },
        },
      };
      model.shapes[id] = {
        type: "operation",
        input: { target: id + "Request" },
        output: { target: id + "Response" },
        traits: {
          "smithy.api#http": { method, uri: node.path, code: 200 },
          // A structural summary of our own instead of Proxmox's description.
          "smithy.api#documentation": `${method} ${node.path}`,
          "proxmox.api#access": {
            allowtoken: operation.allowtoken,
            protected: operation.protected,
          },
          "proxmox.api#upstreamName": operation.name,
        },
      };
      const service = (model.shapes[ns + pascal(area)] ??= {
        type: "service",
        version: SOURCE_VERSION,
        operations: [],
      });
      service.operations!.push({ target: id });
      count++;
    }
    node.children?.forEach(visit);
  }
  tree.forEach(visit);
  return { models, count };
}
