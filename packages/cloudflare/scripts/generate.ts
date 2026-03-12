#!/usr/bin/env bun
/**
 * Generate Effect SDK clients from Cloudflare TypeScript SDK source.
 *
 * Usage:
 *   bun scripts/generate.ts                    # Generate all services
 *   bun scripts/generate.ts --service r2       # Generate single service
 *
 * The generator:
 * 1. Walks the cloudflare-typescript/src/resources directory
 * 2. Parses TypeScript AST to extract operations from APIResource classes
 * 3. Extracts JSDoc annotations for parameter locations (path/query/body/header)
 * 4. Generates Effect Schema types with trait annotations
 * 5. Outputs to src/services/{service}.ts
 */

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Effect, FileSystem } from "effect";
import * as path from "node:path";
import {
  type ParsedOperation,
  type ServiceInfo,
  type TypeInfo,
  resolveTypeInfoDeep,
  singularize,
  toCamelCase,
  toPascalCase,
} from "./model.ts";
import { parseCode } from "./parse.ts";

/**
 * Field name patterns that indicate sensitive data.
 */
const SENSITIVE_FIELD_PATTERNS: RegExp[] = [
  /password/i,
  /^secret$/i,
  /secret[-_]?key/i,
  /[-_]secret$/i,
  /^client[-_]?secret$/i,
  /^access[-_]?token$/i,
  /^refresh[-_]?token$/i,
  /^api[-_]?key$/i,
  /^api[-_]?key[-_]?secret$/i,
  /^api[-_]?token$/i,
  /^private[-_]?key$/i,
  /^secret[-_]?access[-_]?key$/i,
  /^session[-_]?token$/i,
  /^access[-_]?key[-_]?id$/i,
  /^one[-_]?time[-_]?password$/i,
  /^connection[-_]?string$/i,
  /^connection[-_]?uri$/i,
  /^plain[-_]?text$/i,
  /^plain[-_]?text[-_]?refresh[-_]?token$/i,
];

function isSensitiveFieldName(name: string): boolean {
  return SENSITIVE_FIELD_PATTERNS.some((pattern) => pattern.test(name));
}

/** Returns true if the string is a valid JavaScript identifier (no quoting needed). */
function isValidIdentifier(name: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
}

/** Quote a property name for use as an object key if it contains special characters. */
function quotePropKey(name: string): string {
  return isValidIdentifier(name) ? name : `"${name}"`;
}

/** Ensure local relative module specifiers always include a `.ts` suffix. */
function withTsExtension(specifier: string): string {
  if (!specifier.startsWith(".") || /\.[^/]+$/.test(specifier)) {
    return specifier;
  }
  return `${specifier}.ts`;
}

/**
 * Patch file structure (mirrors src/expr.ts OperationPatch).
 * Defined here to avoid cross-project imports.
 */
interface PropertyPatch {
  /** Make the field accept null in addition to its current type */
  nullable?: boolean;
  /** Make the field optional (not required) */
  optional?: boolean;
  /** Replace the field type entirely */
  type?: "string" | "number" | "boolean" | "unknown";
  /** Add literal values to an existing enum */
  addValues?: string[];
}

interface ResponsePatch {
  /** Map of property paths (dot-notation) to their patches */
  properties: Record<string, PropertyPatch>;
}

interface OperationPatch {
  errors: Record<
    string,
    Array<{
      code: number;
      status?: number;
      message?: { includes?: string; matches?: string };
    }>
  >;
  /**
   * Override the response type shape when the SDK type is incorrect.
   * - "array": wraps the SDK response type in an array (e.g., when `list` returns an array
   *   of items but the SDK declares the response type as a single object)
   * - "object": prevents the auto-wrapping in an array for paginated operations where
   *   `result` is a single object (e.g., `listAbuseReports` returns `{ reports: [...] }`)
   */
  responseType?: "array" | "object";
  /**
   * Decode the response from a nested property path in the raw HTTP body.
   * This mirrors upstream methods that explicitly unwrap envelopes via
   * `_thenUnwrap((obj) => obj.result)`.
   */
  responsePath?: string;
  /** Request schema modifications */
  request?: ResponsePatch;
  /** Response schema modifications */
  response?: ResponsePatch;
}

const SDK_PATH = "./specs/cloudflare-typescript/src/resources";
const OUTPUT_PATH = "./src/services";
const PATCH_PATH = "./patches";

/**
 * Load a patch file for an operation if it exists.
 * Returns undefined if no patch file exists.
 */
const loadOperationPatch = (
  serviceName: string,
  operationName: string,
): Effect.Effect<OperationPatch | undefined, never, FileSystem.FileSystem> =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const patchFile = path.join(
      PATCH_PATH,
      serviceName,
      `${operationName}.json`,
    );

    const exists = yield* fs
      .exists(patchFile)
      .pipe(Effect.catch(() => Effect.succeed(false)));
    if (!exists) {
      return undefined;
    }

    const content = yield* fs
      .readFileString(patchFile)
      .pipe(Effect.catch(() => Effect.succeed(undefined)));
    if (!content) {
      return undefined;
    }

    try {
      return JSON.parse(content) as OperationPatch;
    } catch {
      yield* Console.warn(`Failed to parse patch file: ${patchFile}`);
      return undefined;
    }
  });

/**
 * Load all patches for a service.
 * Returns a map from operation name to patch.
 */
const loadServicePatches = (
  serviceName: string,
  operations: ParsedOperation[],
): Effect.Effect<Map<string, OperationPatch>, never, FileSystem.FileSystem> =>
  Effect.gen(function* () {
    const patches = new Map<string, OperationPatch>();

    for (const op of operations) {
      const patch = yield* loadOperationPatch(serviceName, op.operationName);
      if (patch) {
        patches.set(op.operationName, patch);
      }
    }

    return patches;
  });

/**
 * A single merged error definition: tag name → deduplicated matchers.
 */
type MergedErrorDef = {
  tag: string;
  matchers: OperationPatch["errors"][string];
};

/**
 * Merge all error definitions across every operation patch in a service.
 *
 * When two patch files both define the same error tag (e.g. "NamespaceNotFound"),
 * their matcher arrays are merged and deduplicated so the error class is only
 * emitted once in the generated service file.
 */
function mergeServiceErrors(
  patches: Map<string, OperationPatch>,
): MergedErrorDef[] {
  const merged = new Map<string, OperationPatch["errors"][string]>();

  for (const patch of patches.values()) {
    for (const [tag, matchers] of Object.entries(patch.errors)) {
      const existing = merged.get(tag);
      if (!existing) {
        merged.set(tag, [...matchers]);
      } else {
        // Merge matchers, deduplicating by JSON equality
        const existingKeys = new Set(existing.map((m) => JSON.stringify(m)));
        for (const m of matchers) {
          const key = JSON.stringify(m);
          if (!existingKeys.has(key)) {
            existing.push(m);
            existingKeys.add(key);
          }
        }
      }
    }
  }

  // Return sorted by tag name for stable output
  return [...merged.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, matchers]) => ({ tag, matchers }));
}

// Parse CLI args manually
const parseArgs = (): { service: string | undefined; debug: boolean } => {
  const args = process.argv.slice(2);
  let service: string | undefined;
  let debug = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--service" && args[i + 1]) {
      service = args[i + 1];
      i++;
    } else if (args[i] === "--debug") {
      debug = true;
    }
  }

  return { service, debug };
};

/**
 * Apply a response patch to a resolved TypeInfo tree.
 *
 * Patches use dot-notation paths to target nested properties:
 * - "location" → top-level field
 * - "settings.abuse_contact_email" → nested field inside settings
 * - "buckets[].location" → field inside array elements
 *
 * Supported patch operations:
 * - nullable: wrap type in union with null
 * - optional: make field not required
 * - type: replace type entirely
 * - addValues: add literal values to existing enum
 */
function applyResponsePatch(
  typeInfo: TypeInfo,
  patch: ResponsePatch,
): TypeInfo {
  // Deep clone to avoid mutating the original
  const cloned = JSON.parse(JSON.stringify(typeInfo)) as TypeInfo;

  for (const [path, propPatch] of Object.entries(patch.properties)) {
    applyPropertyPatch(cloned, path.split("."), propPatch);
  }

  return cloned;
}

/**
 * Recursively navigate into TypeInfo to find and patch a property.
 */
function applyPropertyPatch(
  typeInfo: TypeInfo,
  pathSegments: string[],
  patch: PropertyPatch,
): void {
  if (pathSegments.length === 0) return;

  const [current, ...rest] = pathSegments;

  // Handle array element access: "buckets[]" means descend into array element type
  if (current.endsWith("[]")) {
    const fieldName = current.slice(0, -2);

    if (fieldName === "") {
      // Just "[]" on the current type — descend into array element
      if (typeInfo.kind === "array" && typeInfo.elementType) {
        if (rest.length === 0) {
          // Patch the element type itself (unusual but supported)
          applyPatchToTypeInfo(typeInfo.elementType, patch);
        } else {
          applyPropertyPatch(typeInfo.elementType, rest, patch);
        }
      }
      return;
    }

    // Find the property and descend into its array element
    const prop = typeInfo.properties?.find((p) => p.name === fieldName);
    if (!prop) return;

    // Unwrap the property type to find the array
    const arrayType = unwrapToArray(prop.type);
    if (arrayType?.elementType) {
      if (rest.length === 0) {
        applyPatchToTypeInfo(arrayType.elementType, patch);
      } else {
        applyPropertyPatch(arrayType.elementType, rest, patch);
      }
    }
    return;
  }

  // Regular field access
  if (typeInfo.kind !== "object" || !typeInfo.properties) return;

  const prop = typeInfo.properties.find((p) => p.name === current);
  if (!prop) return;

  if (rest.length === 0) {
    // This is the target property — apply the patch
    if (patch.optional) {
      prop.required = false;
    }
    applyPatchToTypeInfo(prop.type, patch);
  } else {
    // Need to descend further — unwrap the property type
    let targetType = prop.type;

    // Unwrap through optionals/unions to find the object
    if (targetType.kind === "union" && targetType.values) {
      // Find the non-null variant
      const objectType = targetType.values.find(
        (v) => v.kind === "object" && v.properties,
      );
      if (objectType) {
        applyPropertyPatch(objectType, rest, patch);
        return;
      }
    }

    applyPropertyPatch(targetType, rest, patch);
  }
}

/**
 * Apply a property patch to a TypeInfo value.
 */
function applyPatchToTypeInfo(typeInfo: TypeInfo, patch: PropertyPatch): void {
  // Replace type entirely
  if (patch.type) {
    typeInfo.kind = "primitive";
    typeInfo.value = patch.type === "unknown" ? undefined : patch.type;
    if (patch.type === "unknown") typeInfo.kind = "unknown";
    delete typeInfo.values;
    delete typeInfo.elementType;
    delete typeInfo.properties;
    delete typeInfo.name;
  }

  // Add enum values to existing literal/union
  if (patch.addValues && patch.addValues.length > 0) {
    if (typeInfo.kind === "literal" && typeInfo.value) {
      // Single literal → convert to union with additional values
      const existingValues: TypeInfo[] = [
        { kind: "literal", value: typeInfo.value },
      ];
      for (const v of patch.addValues) {
        existingValues.push({ kind: "literal", value: v });
      }
      typeInfo.kind = "union";
      typeInfo.values = existingValues;
      delete typeInfo.value;
    } else if (typeInfo.kind === "union" && typeInfo.values) {
      // Add to existing union, collecting existing literal values for dedup
      const existingLiterals = new Set(
        typeInfo.values.filter((v) => v.kind === "literal").map((v) => v.value),
      );
      for (const v of patch.addValues) {
        if (!existingLiterals.has(v)) {
          typeInfo.values.push({ kind: "literal", value: v });
          existingLiterals.add(v);
        }
      }
    }
  }

  // Wrap with nullable (add null to union)
  if (patch.nullable) {
    if (typeInfo.kind === "union" && typeInfo.values) {
      // Check if already has null
      const hasNull = typeInfo.values.some((v) => v.kind === "null");
      if (!hasNull) {
        typeInfo.values.push({ kind: "null" });
      }
    } else if (typeInfo.kind !== "null") {
      // Wrap current type in a union with null
      const currentCopy = JSON.parse(JSON.stringify(typeInfo)) as TypeInfo;
      typeInfo.kind = "union";
      typeInfo.values = [currentCopy, { kind: "null" }];
      delete typeInfo.value;
      delete typeInfo.elementType;
      delete typeInfo.properties;
      delete typeInfo.name;
    }
  }
}

/**
 * Unwrap a TypeInfo to find an array type (looking through unions, etc.)
 */
function unwrapToArray(typeInfo: TypeInfo): TypeInfo | undefined {
  if (typeInfo.kind === "array") return typeInfo;
  if (typeInfo.kind === "union" && typeInfo.values) {
    return typeInfo.values.find((v) => v.kind === "array");
  }
  return undefined;
}

function buildPaginatedResponseType(
  itemType: TypeInfo,
  paginationClassName: string,
): TypeInfo {
  const paginationKind = paginationClassName.includes("V4PagePaginationArray")
    ? "V4PagePaginationArray"
    : paginationClassName.includes("V4PagePagination")
      ? "V4PagePagination"
      : paginationClassName.includes("CursorPaginationAfter")
        ? "CursorPaginationAfter"
        : paginationClassName.includes("CursorLimitPagination")
          ? "CursorLimitPagination"
          : paginationClassName.includes("CursorPagination")
            ? "CursorPagination"
            : paginationClassName.includes("SinglePage")
              ? "SinglePage"
              : paginationClassName;
  const arrayOfItems: TypeInfo = {
    kind: "array",
    elementType: JSON.parse(JSON.stringify(itemType)) as TypeInfo,
  };

  switch (paginationKind) {
    case "V4PagePagination":
      return {
        kind: "object",
        properties: [
          {
            name: "result",
            required: true,
            type: {
              kind: "object",
              properties: [
                { name: "items", required: false, type: arrayOfItems },
              ],
            },
          },
          {
            name: "result_info",
            required: true,
            type: {
              kind: "object",
              properties: [
                {
                  name: "count",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "page",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "per_page",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "total_count",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
              ],
            },
          },
        ],
      };
    case "V4PagePaginationArray":
      return {
        kind: "object",
        properties: [
          { name: "result", required: true, type: arrayOfItems },
          {
            name: "result_info",
            required: true,
            type: {
              kind: "object",
              properties: [
                {
                  name: "count",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "page",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "per_page",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "total_count",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
              ],
            },
          },
        ],
      };
    case "CursorPagination":
    case "CursorLimitPagination":
      return {
        kind: "object",
        properties: [
          { name: "result", required: true, type: arrayOfItems },
          {
            name: "result_info",
            required: true,
            type: {
              kind: "object",
              properties: [
                {
                  name: "count",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
                {
                  name: "cursor",
                  required: false,
                  type: { kind: "primitive", value: "string" },
                },
                {
                  name: "per_page",
                  required: false,
                  type: { kind: "primitive", value: "number" },
                },
              ],
            },
          },
        ],
      };
    case "CursorPaginationAfter":
      return {
        kind: "object",
        properties: [
          { name: "result", required: true, type: arrayOfItems },
          {
            name: "result_info",
            required: true,
            type: {
              kind: "object",
              properties: [
                {
                  name: "cursors",
                  required: false,
                  type: {
                    kind: "object",
                    properties: [
                      {
                        name: "after",
                        required: false,
                        type: { kind: "primitive", value: "string" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      };
    case "SinglePage":
    default:
      return {
        kind: "object",
        properties: [{ name: "result", required: true, type: arrayOfItems }],
      };
  }
}

function getPaginationTrait(
  paginationClassName: string,
): {
  mode: "page" | "cursor" | "single";
  inputToken?: string;
  outputToken?: string;
  items: string;
  pageSize?: string;
} {
  const paginationKind = paginationClassName.includes("V4PagePaginationArray")
    ? "V4PagePaginationArray"
    : paginationClassName.includes("V4PagePagination")
      ? "V4PagePagination"
      : paginationClassName.includes("CursorPaginationAfter")
        ? "CursorPaginationAfter"
        : paginationClassName.includes("CursorLimitPagination")
          ? "CursorLimitPagination"
          : paginationClassName.includes("CursorPagination")
            ? "CursorPagination"
            : paginationClassName.includes("SinglePage")
              ? "SinglePage"
              : paginationClassName;

  switch (paginationKind) {
    case "V4PagePagination":
      return {
        mode: "page",
        inputToken: "page",
        outputToken: "resultInfo.page",
        items: "result.items",
        pageSize: "perPage",
      };
    case "V4PagePaginationArray":
      return {
        mode: "page",
        inputToken: "page",
        outputToken: "resultInfo.page",
        items: "result",
        pageSize: "perPage",
      };
    case "CursorPagination":
      return {
        mode: "cursor",
        inputToken: "cursor",
        outputToken: "resultInfo.cursor",
        items: "result",
        pageSize: "perPage",
      };
    case "CursorPaginationAfter":
      return {
        mode: "cursor",
        inputToken: "cursor",
        outputToken: "resultInfo.cursors.after",
        items: "result",
      };
    case "CursorLimitPagination":
      return {
        mode: "cursor",
        inputToken: "cursor",
        outputToken: "resultInfo.cursor",
        items: "result",
        pageSize: "limit",
      };
    case "SinglePage":
    default:
      return { mode: "single", items: "result" };
  }
}

/**
 * Convert TypeInfo to Effect Schema code.
 * This is used for response schemas where the API may omit "required" fields.
 */
function typeInfoToSchema(
  type: TypeInfo,
  indent: string = "",
  depth: number = 0,
  optionalObjectPropsNullable: boolean = false,
): string {
  // Prevent infinite recursion
  if (depth > 10) {
    return "Schema.Unknown";
  }

  switch (type.kind) {
    case "primitive":
      switch (type.value) {
        case "string":
          return "Schema.String";
        case "number":
          return "Schema.Number";
        case "boolean":
          return "Schema.Boolean";
        default:
          return "Schema.Unknown";
      }

    case "literal":
      if (type.value === "true" || type.value === "false") {
        return `Schema.Literal(${type.value})`;
      }
      // String literal
      return `Schema.Literal("${type.value}")`;

    case "null":
      return "Schema.Null";

    case "union":
      if (!type.values || type.values.length === 0) {
        return "Schema.Unknown";
      }
      // Collapse all-unknown unions to single unknown
      if (type.values.every((v) => v.kind === "unknown")) {
        return "Schema.Unknown";
      }
      // Check if all values are literals - v4 uses Schema.Literals([...]) for multiple
      const allLiterals = type.values.every((v) => v.kind === "literal");
      if (allLiterals) {
        const literalSet = new Set<string>();
        for (const v of type.values) {
          if (v.value === "true" || v.value === "false") {
            literalSet.add(v.value);
          } else {
            literalSet.add(`"${v.value}"`);
          }
        }
        return `Schema.Literals([${[...literalSet].join(", ")}])`;
      }
      // General union - de-duplicate and filter unknowns
      const unionParts = type.values
        .filter((v) => v.kind !== "unknown")
        .map((v) =>
          typeInfoToSchema(v, indent, depth + 1, optionalObjectPropsNullable),
        );
      const uniqueUnionParts = [...new Set(unionParts)];
      if (uniqueUnionParts.length === 0) {
        return "Schema.Unknown";
      }
      if (uniqueUnionParts.length === 1) {
        return uniqueUnionParts[0];
      }
      return `Schema.Union([${uniqueUnionParts.join(", ")}])`;

    case "array":
      if (!type.elementType) {
        return "Schema.Array(Schema.Unknown)";
      }
      const elementSchema = typeInfoToSchema(
        type.elementType,
        indent,
        depth + 1,
        optionalObjectPropsNullable,
      );
      return `Schema.Array(${elementSchema})`;

    case "object":
      // If it has a name but no resolved properties, use Unknown
      if (type.name && (!type.properties || type.properties.length === 0)) {
        return "Schema.Unknown";
      }
      if (type.properties && type.properties.length > 0) {
        const encodeKeysMap: Record<string, string> = {};
        let hasRenamedKey = false;
        const props = type.properties
          .map((p) => {
            const wireName = p.name;
            const propName = toCamelCase(wireName);
            // Auto-detect sensitive fields by name pattern
            const isSensitiveByName =
              p.type.kind === "primitive" &&
              p.type.value === "string" &&
              isSensitiveFieldName(wireName);
            let propSchema: string;
            if (isSensitiveByName) {
              propSchema = "SensitiveString";
            } else {
              propSchema = typeInfoToSchema(
                p.type,
                indent + "  ",
                depth + 1,
                optionalObjectPropsNullable,
              );
            }
            if (!p.required) {
              if (optionalObjectPropsNullable && !typeIncludesNull(p.type)) {
                propSchema = `Schema.Union([${propSchema}, Schema.Null])`;
              }
              propSchema = `Schema.optional(${propSchema})`;
            }
            // Always collect mapping for encodeKeys
            encodeKeysMap[propName] = wireName;
            if (propName !== wireName) {
              hasRenamedKey = true;
            }
            return `${indent}  ${quotePropKey(propName)}: ${propSchema}`;
          })
          .join(",\n");
        // Build encodeKeys pipe if there are any key mappings
        // Include ALL properties (even identity mappings) to fix nested encodeKeys decode
        const encodeKeysPipe = hasRenamedKey
          ? `.pipe(Schema.encodeKeys({ ${Object.entries(encodeKeysMap)
              .map(([k, v]) => `${quotePropKey(k)}: "${v}"`)
              .join(", ")} }))`
          : "";
        return `Schema.Struct({\n${props}\n${indent}})${encodeKeysPipe}`;
      }
      return "Schema.Struct({})";

    case "file":
      // File upload schema with trait annotation
      return "UploadableSchema.pipe(T.HttpFormDataFile())";

    case "unknown":
    default:
      return "Schema.Unknown";
  }
}

/**
 * Convert TypeInfo to TypeScript type string for interfaces.
 */
function typeInfoToTsType(
  type: TypeInfo,
  depth: number = 0,
  optionalObjectPropsNullable: boolean = false,
): string {
  // Prevent infinite recursion
  if (depth > 10) {
    return "unknown";
  }

  switch (type.kind) {
    case "primitive":
      return type.value || "unknown";

    case "literal":
      if (type.value === "true" || type.value === "false") {
        return type.value;
      }
      return `"${type.value}"`;

    case "null":
      return "null";

    case "union":
      if (!type.values || type.values.length === 0) {
        return "unknown";
      }
      // Collapse all-unknown unions to single unknown
      if (type.values.every((v) => v.kind === "unknown")) {
        return "unknown";
      }
      // De-duplicate and filter unknowns, adding case variants for string literals
      const values = type.values;
      const tsTypeSet = new Set<string>();
      for (const v of values) {
        if (
          v.kind === "unknown" &&
          !values.every((t) => t.kind === "unknown")
        ) {
          continue;
        }
        const t = typeInfoToTsType(v, depth + 1, optionalObjectPropsNullable);
        tsTypeSet.add(t);
      }
      const uniqueTsTypes = [...tsTypeSet];
      if (uniqueTsTypes.length === 1) {
        return uniqueTsTypes[0];
      }
      return uniqueTsTypes.join(" | ");

    case "array":
      if (!type.elementType) {
        return "unknown[]";
      }
      const elementType = typeInfoToTsType(
        type.elementType,
        depth + 1,
        optionalObjectPropsNullable,
      );
      // Wrap union types in parentheses
      if (elementType.includes("|")) {
        return `(${elementType})[]`;
      }
      return `${elementType}[]`;

    case "object":
      // If it has a name but no properties, it wasn't resolved - use unknown
      if (type.name && (!type.properties || type.properties.length === 0)) {
        return "unknown";
      }
      if (type.properties && type.properties.length > 0) {
        const props = type.properties
          .map((p) => {
            const propName = toCamelCase(p.name);
            const optMark = !p.required ? "?" : "";
            const propType = typeInfoToTsType(
              p.type,
              depth + 1,
              optionalObjectPropsNullable,
            );
            return `${quotePropKey(propName)}${optMark}: ${
              !p.required &&
              optionalObjectPropsNullable &&
              !typeIncludesNull(p.type)
                ? `${propType} | null`
                : propType
            }`;
          })
          .join("; ");
        return `{ ${props} }`;
      }
      return "Record<string, unknown>";

    case "file":
      return "File | Blob";

    case "unknown":
    default:
      return "unknown";
  }
}

/**
 * Check if a TypeInfo already includes null in its type.
 * Used to avoid double-wrapping types that are already nullable.
 */
function typeIncludesNull(type: TypeInfo): boolean {
  if (type.kind === "null") {
    return true;
  }
  return type.kind === "union" && !!type.values?.some(typeIncludesNull);
}

/**
 * Generate Effect Schema code for an operation.
 * Error classes are NOT emitted here — they are emitted once at the service
 * level by generateServiceFile. This function only references the error tag
 * names from the patch in the operation's type signature and errors array.
 */
function generateOperationSchema(
  op: ParsedOperation,
  patch?: OperationPatch,
): string {
  // Use pre-computed operation name from the model
  const normalizedOpName = op.operationName;
  const pascalOpName = toPascalCase(normalizedOpName);
  const requestTypeName = pascalOpName + "Request";
  const responseTypeName = pascalOpName + "Response";

  const lines: string[] = [];

  // Collect error tag names from patch (classes are emitted at the service level)
  const errorClassNames: string[] = [];
  if (patch?.errors) {
    for (const errorTag of Object.keys(patch.errors)) {
      errorClassNames.push(errorTag);
    }
  }

  // Collect property names from path/query/header params to avoid duplicates with body params
  const nonBodyParamNames = new Set([
    ...op.pathParams.map((p) => toCamelCase(p.name)),
    ...op.queryParams.map((p) => toCamelCase(p.name)),
    ...op.headerParams.map((p) => toCamelCase(p.name)),
  ]);

  // Filter body params to exclude those that conflict with path/query/header params
  const filteredBodyParams = op.bodyParams.filter(
    (p) => !nonBodyParamNames.has(toCamelCase(p.name)),
  );

  // Collect all params and resolve their types
  const allParams = [
    ...op.pathParams,
    ...op.queryParams,
    ...op.headerParams,
    ...filteredBodyParams,
  ].map((param) => ({
    ...param,
    type: resolveTypeInfoDeep(param.type, op.registry),
  }));

  // Also create resolved versions for each param category
  const resolvedPathParams = op.pathParams.map((p) => ({
    ...p,
    type: resolveTypeInfoDeep(p.type, op.registry),
  }));
  const resolvedQueryParams = op.queryParams.map((p) => ({
    ...p,
    type: resolveTypeInfoDeep(p.type, op.registry),
  }));
  const resolvedHeaderParams = op.headerParams.map((p) => ({
    ...p,
    type: resolveTypeInfoDeep(p.type, op.registry),
  }));
  const resolvedBodyParams = filteredBodyParams.map((p) => ({
    ...p,
    type: resolveTypeInfoDeep(p.type, op.registry),
  }));

  // Apply request property patches (optional, nullable, addValues, type overrides)
  if (patch?.request) {
    // Build a synthetic TypeInfo object from allParams so we can reuse applyResponsePatch
    const syntheticRequest: TypeInfo = {
      kind: "object",
      properties: allParams.map((p) => ({
        name: toCamelCase(p.name),
        type: p.type,
        required: p.required,
      })),
    };
    const patched = applyResponsePatch(syntheticRequest, patch.request);
    // Propagate patched required/type back to allParams and per-category arrays
    if (patched.properties) {
      for (const patchedProp of patched.properties) {
        // Update allParams
        const param = allParams.find(
          (p) => toCamelCase(p.name) === patchedProp.name,
        );
        if (param) {
          param.type = patchedProp.type;
          param.required = patchedProp.required;
        }
        // Update per-category arrays
        for (const arr of [
          resolvedPathParams,
          resolvedQueryParams,
          resolvedHeaderParams,
          resolvedBodyParams,
        ]) {
          const catParam = arr.find(
            (p) => toCamelCase(p.name) === patchedProp.name,
          );
          if (catParam) {
            catParam.type = patchedProp.type;
            catParam.required = patchedProp.required;
          }
        }
      }
    }
  }

  // Generate request interface
  lines.push(`export interface ${requestTypeName} {`);
  for (const param of allParams) {
    const propName = toCamelCase(param.name); // Use camelCase in interface
    const tsType = typeInfoToTsType(param.type);
    const optMark = param.required ? "" : "?";
    if (param.description) {
      lines.push(
        `  /** ${param.description.replace(/\n/g, " ").slice(0, 200)} */`,
      );
    }
    lines.push(`  ${quotePropKey(propName)}${optMark}: ${tsType};`);
  }
  lines.push(`}`);
  lines.push("");

  // Generate request schema
  const requestProps: string[] = [];

  // Add path params
  for (const param of resolvedPathParams) {
    const propName = toCamelCase(param.name);
    const wireName = param.name;
    const schema = typeInfoToSchema(param.type);
    requestProps.push(
      `  ${quotePropKey(propName)}: ${schema}.pipe(T.HttpPath("${wireName}"))`,
    );
  }

  // Add query params
  for (const param of resolvedQueryParams) {
    const propName = toCamelCase(param.name);
    const wireName = param.name;
    let schema = typeInfoToSchema(param.type);
    if (!param.required) {
      schema = `Schema.optional(${schema})`;
    }
    requestProps.push(
      `  ${quotePropKey(propName)}: ${schema}.pipe(T.HttpQuery("${wireName}"))`,
    );
  }

  // Add header params
  for (const param of resolvedHeaderParams) {
    const propName = toCamelCase(param.name);
    let schema = typeInfoToSchema(param.type);
    if (!param.required) {
      schema = `Schema.optional(${schema})`;
    }
    const headerName = param.headerName || param.name;
    requestProps.push(
      `  ${quotePropKey(propName)}: ${schema}.pipe(T.HttpHeader("${headerName}"))`,
    );
  }

  // Add body params and collect encodeKeys mappings
  const encodeKeysMap: Record<string, string> = {};
  let hasRenamedBodyKey = false;
  for (const param of resolvedBodyParams) {
    const propName = toCamelCase(param.name);
    const wireName = param.name;
    let schema = typeInfoToSchema(param.type);
    if (!param.required) {
      schema = `Schema.optional(${schema})`;
    }
    // If param is named "body", it IS the entire HTTP body (e.g. raw array),
    // not a named field within a JSON object
    if (wireName === "body") {
      requestProps.push(
        `  ${quotePropKey(propName)}: ${schema}.pipe(T.HttpBody())`,
      );
    } else {
      // Always collect mapping for encodeKeys
      encodeKeysMap[propName] = wireName;
      if (propName !== wireName) {
        hasRenamedBodyKey = true;
      }
      requestProps.push(`  ${quotePropKey(propName)}: ${schema}`);
    }
  }

  // Convert URL template to OpenAPI style
  const openApiPath = op.urlTemplate.replace(/\{(\w+)\}/g, "{$1}");

  lines.push(
    `export const ${requestTypeName} = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({`,
  );
  if (requestProps.length > 0) {
    lines.push(requestProps.join(",\n"));
  }
  lines.push(`})`);

  // Build pipes: encodeKeys for body param renaming, then Http trait
  // Include ALL body properties (even identity mappings) to fix nested encodeKeys decode
  const pipes: string[] = [];
  if (hasRenamedBodyKey) {
    const encodeKeysEntries = Object.entries(encodeKeysMap)
      .map(([k, v]) => `${quotePropKey(k)}: "${v}"`)
      .join(", ");
    pipes.push(`Schema.encodeKeys({ ${encodeKeysEntries} })`);
  }
  // Add contentType: "multipart" when operation has file uploads or uses multipartFormRequestOptions
  const hasFiles = operationHasFiles(op);
  const isMultipart = hasFiles || op.isMultipart;
  const httpTrait = isMultipart
    ? `T.Http({ method: "${op.httpMethod}", path: "${openApiPath}", contentType: "multipart" })`
    : `T.Http({ method: "${op.httpMethod}", path: "${openApiPath}" })`;
  pipes.push(httpTrait);

  lines.push(
    `  .pipe(${pipes.join(", ")}) as unknown as Schema.Schema<${requestTypeName}>;`,
  );
  lines.push("");

  // Generate response interface and schema
  // Try to resolve the response type from the SDK registry
  let resolvedResponseType: TypeInfo | undefined;
  let paginatedItemType: TypeInfo | undefined;
  let isTypeAlias = false;
  const responsePath = op.responsePath ?? patch?.responsePath;

  if (op.responseTypeName) {
    // First check interfaces
    const responseInterface = op.registry.types.get(op.responseTypeName);
    if (responseInterface) {
      resolvedResponseType = resolveTypeInfoDeep(
        { kind: "object", properties: responseInterface.properties },
        op.registry,
      );
    } else {
      // Check type aliases
      const typeAlias = op.registry.typeAliases.get(op.responseTypeName);
      if (typeAlias) {
        // Resolve nested types in the type alias
        resolvedResponseType = resolveTypeInfoDeep(typeAlias, op.registry);
        isTypeAlias = true;
      }
    }
  }

  // Apply responseType override from patch (e.g., wrap in array when SDK type is wrong)
  if (patch?.responseType === "array" && resolvedResponseType) {
    resolvedResponseType = {
      kind: "array",
      elementType: resolvedResponseType,
    };
    // Array responses are always emitted as type aliases, not interfaces
    isTypeAlias = true;
  }

  if (op.paginationClassName && resolvedResponseType) {
    paginatedItemType = JSON.parse(
      JSON.stringify(resolvedResponseType),
    ) as TypeInfo;
    resolvedResponseType = buildPaginatedResponseType(
      resolvedResponseType,
      op.paginationClassName,
    );
    isTypeAlias = false;
  }

  // Apply response property patches (nullable, optional, addValues, type overrides)
  if (patch?.response && resolvedResponseType) {
    resolvedResponseType = applyResponsePatch(
      resolvedResponseType,
      patch.response,
    );
  }

  if (isTypeAlias && resolvedResponseType) {
    // Type alias response (e.g., `type Response = string` or `type Response = unknown`)
    const tsType = typeInfoToTsType(resolvedResponseType, 0, true);
    const schema = typeInfoToSchema(resolvedResponseType, "", 0, true);
    const responsePathPipe = responsePath
      ? `.pipe(T.ResponsePath("${responsePath}"))`
      : "";

    lines.push(`export type ${responseTypeName} = ${tsType};`);
    lines.push("");
    lines.push(
      `export const ${responseTypeName} = /*@__PURE__*/ /*#__PURE__*/ ${schema}${responsePathPipe} as unknown as Schema.Schema<${responseTypeName}>;`,
    );
    lines.push("");
  } else if (
    resolvedResponseType &&
    resolvedResponseType.kind === "object" &&
    resolvedResponseType.properties
  ) {
    // Generate interface with resolved types
    lines.push(`export interface ${responseTypeName} {`);
    for (const prop of resolvedResponseType.properties) {
      const propName = toCamelCase(prop.name);
      const tsType = typeInfoToTsType(prop.type, 0, true);
      const optMark = prop.required ? "" : "?";
      const nullableSuffix =
        !prop.required && !typeIncludesNull(prop.type) ? " | null" : "";
      if (prop.description) {
        lines.push(
          `  /** ${prop.description.replace(/\n/g, " ").slice(0, 200)} */`,
        );
      }
      lines.push(
        `  ${quotePropKey(propName)}${optMark}: ${tsType}${nullableSuffix};`,
      );
    }
    lines.push(`}`);
    lines.push("");

    // Generate schema with resolved types and collect encodeKeys mappings
    // Note: nested object fields may be treated as optional — Cloudflare APIs
    // often omit "required" fields in nested objects (e.g. lifecycle conditions.prefix)
    const responseEncodeKeysMap: Record<string, string> = {};
    let hasRenamedResponseKey = false;
    const responseProps = resolvedResponseType.properties.map((prop) => {
      const wireName = prop.name;
      const propName = toCamelCase(wireName);
      let schema = typeInfoToSchema(prop.type, "", 0, true);
      if (!prop.required) {
        if (!typeIncludesNull(prop.type)) {
          schema = `Schema.Union([${schema}, Schema.Null])`;
        }
        schema = `Schema.optional(${schema})`;
      }
      // Always collect mapping for encodeKeys
      responseEncodeKeysMap[propName] = wireName;
      if (propName !== wireName) {
        hasRenamedResponseKey = true;
      }
      return `  ${quotePropKey(propName)}: ${schema}`;
    });

    // Build encodeKeys pipe if there are any key mappings
    // Include ALL properties (even identity mappings) to fix nested encodeKeys decode
    const responseEncodeKeysPipe = hasRenamedResponseKey
      ? `.pipe(Schema.encodeKeys({ ${Object.entries(responseEncodeKeysMap)
          .map(([k, v]) => `${quotePropKey(k)}: "${v}"`)
          .join(", ")} }))`
      : "";
    const responsePathPipe = responsePath
      ? `.pipe(T.ResponsePath("${responsePath}"))`
      : "";

    lines.push(
      `export const ${responseTypeName} = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({`,
    );
    if (responseProps.length > 0) {
      lines.push(responseProps.join(",\n"));
    }
    lines.push(
      `})${responseEncodeKeysPipe}${responsePathPipe} as unknown as Schema.Schema<${responseTypeName}>;`,
    );
    lines.push("");
  } else {
    // Fallback to unknown if we can't resolve the response type
    lines.push(`export type ${responseTypeName} = unknown;`);
    lines.push("");
    lines.push(
      `export const ${responseTypeName} = /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<${responseTypeName}>;`,
    );
    lines.push("");
  }

  // Generate error type alias and explicitly typed API function
  const errorsArray =
    errorClassNames.length > 0 ? `[${errorClassNames.join(", ")}]` : "[]";
  const errorTypeName = `${pascalOpName}Error`;
  const errorUnionMembers =
    errorClassNames.length > 0
      ? ["DefaultErrors", ...errorClassNames]
      : ["DefaultErrors"];
  lines.push(
    `export type ${errorTypeName} =\n  | ${errorUnionMembers.join("\n  | ")};\n`,
  );

  if (op.paginationClassName && paginatedItemType) {
    const pagination = getPaginationTrait(op.paginationClassName);
    const itemTypeName = typeInfoToTsType(paginatedItemType, 0, true);
    lines.push(`export const ${normalizedOpName}: API.PaginatedOperationMethod<`);
    lines.push(`  ${requestTypeName},`);
    lines.push(`  ${responseTypeName},`);
    lines.push(`  ${errorTypeName},`);
    lines.push(`  Credentials | HttpClient.HttpClient`);
    lines.push(`> & {`);
    lines.push(`  pages: (`);
    lines.push(`    input: ${requestTypeName},`);
    lines.push(`  ) => stream.Stream<`);
    lines.push(`    ${responseTypeName},`);
    lines.push(`    ${errorTypeName},`);
    lines.push(`    Credentials | HttpClient.HttpClient`);
    lines.push(`  >;`);
    lines.push(`  items: (`);
    lines.push(`    input: ${requestTypeName},`);
    lines.push(`  ) => stream.Stream<`);
    lines.push(`    ${itemTypeName},`);
    lines.push(`    ${errorTypeName},`);
    lines.push(`    Credentials | HttpClient.HttpClient`);
    lines.push(`  >;`);
    lines.push(`} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({`);
    lines.push(`  input: ${requestTypeName},`);
    lines.push(`  output: ${responseTypeName},`);
    lines.push(`  errors: ${errorsArray},`);
    lines.push(`  pagination: {`);
    lines.push(`    mode: "${pagination.mode}",`);
    if (pagination.inputToken) {
      lines.push(`    inputToken: "${pagination.inputToken}",`);
    }
    if (pagination.outputToken) {
      lines.push(`    outputToken: "${pagination.outputToken}",`);
    }
    lines.push(`    items: "${pagination.items}",`);
    if (pagination.pageSize) {
      lines.push(`    pageSize: "${pagination.pageSize}",`);
    }
    lines.push(`  } as const,`);
    lines.push(`}));`);
  } else {
    lines.push(`export const ${normalizedOpName}: API.OperationMethod<`);
    lines.push(`  ${requestTypeName},`);
    lines.push(`  ${responseTypeName},`);
    lines.push(`  ${errorTypeName},`);
    lines.push(`  Credentials | HttpClient.HttpClient`);
    lines.push(`> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({`);
    lines.push(`  input: ${requestTypeName},`);
    lines.push(`  output: ${responseTypeName},`);
    lines.push(`  errors: ${errorsArray},`);
    lines.push(`}));`);
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * Extract the resource name from an operation name by stripping verb prefixes.
 * Uses camelCase boundary detection - the resource starts at the first uppercase letter
 * after the verb prefix.
 * Returns singularized resource name for grouping.
 */
function extractResourceFromOperationName(operationName: string): string {
  // Bulk verbs need special handling (compound verbs like bulkDelete)
  const bulkVerbs = [
    "bulkCreate",
    "bulkUpdate",
    "bulkDelete",
    "bulkPatch",
    "bulkGet",
    "bulkPush",
    "bulk",
  ];

  for (const verb of bulkVerbs) {
    if (operationName.startsWith(verb) && operationName.length > verb.length) {
      const resource = operationName.slice(verb.length);
      return singularize(resource);
    }
  }

  // For non-bulk operations, find the first uppercase letter after position 0
  // This handles any verb: get, list, create, ack, pull, push, start, status, etc.
  for (let i = 1; i < operationName.length; i++) {
    const char = operationName[i];
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      const resource = operationName.slice(i);
      return singularize(resource);
    }
  }

  // No uppercase found, return the whole thing singularized
  return singularize(operationName);
}

/**
 * Extract the verb from an operation name.
 */
function extractVerbFromOperationName(operationName: string): string {
  // Check bulk verbs first
  const bulkVerbs = [
    "bulkCreate",
    "bulkUpdate",
    "bulkDelete",
    "bulkPatch",
    "bulkGet",
    "bulkPush",
    "bulk",
  ];
  for (const verb of bulkVerbs) {
    if (operationName.startsWith(verb) && operationName.length > verb.length) {
      const nextChar = operationName[verb.length];
      if (
        nextChar === nextChar.toUpperCase() &&
        nextChar !== nextChar.toLowerCase()
      ) {
        return verb;
      }
    }
  }

  // For non-bulk, extract everything before the first uppercase letter
  for (let i = 1; i < operationName.length; i++) {
    const char = operationName[i];
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      return operationName.slice(0, i);
    }
  }

  return operationName;
}

/**
 * Get the sort order for a verb within a resource group.
 * Lower number = comes first.
 */
function getVerbSortOrder(operationName: string): number {
  const verb = extractVerbFromOperationName(operationName);

  const order: Record<string, number> = {
    // Read operations first
    get: 1,
    list: 2,
    // Create/write operations
    create: 3,
    put: 4, // put = create-or-update (used when no separate create exists)
    update: 5,
    patch: 6,
    // Delete
    delete: 7,
    // Bulk operations (in same order as single operations)
    bulkGet: 10,
    bulkCreate: 11,
    bulkPut: 12,
    bulkUpdate: 13,
    bulkPatch: 14,
    bulkDelete: 15,
    bulkPush: 16,
    bulk: 17,
    // Other common operations
    pull: 20,
    push: 21,
    ack: 22,
    start: 23,
    status: 24,
    stop: 25,
    enable: 26,
    disable: 27,
    verify: 28,
    download: 29,
    upload: 30,
  };

  return order[verb] ?? 100;
}

/**
 * Sort operations by resource name, then by verb order within each resource.
 */
function sortOperations(operations: ParsedOperation[]): ParsedOperation[] {
  return [...operations].sort((a, b) => {
    const resourceA = extractResourceFromOperationName(a.operationName);
    const resourceB = extractResourceFromOperationName(b.operationName);

    // First, sort by resource name (case-insensitive)
    const resourceCompare = resourceA
      .toLowerCase()
      .localeCompare(resourceB.toLowerCase());
    if (resourceCompare !== 0) {
      return resourceCompare;
    }

    // Within the same resource, sort by verb order
    const orderA = getVerbSortOrder(a.operationName);
    const orderB = getVerbSortOrder(b.operationName);
    return orderA - orderB;
  });
}

/**
 * Generate a complete service file
 */
/**
 * Check if a TypeInfo contains file types (recursively)
 */
function hasFileType(type: TypeInfo): boolean {
  if (type.kind === "file") return true;
  if (type.kind === "array" && type.elementType) {
    return hasFileType(type.elementType);
  }
  if (type.kind === "union" && type.values) {
    return type.values.some(hasFileType);
  }
  if (type.kind === "object" && type.properties) {
    return type.properties.some((p) => hasFileType(p.type));
  }
  return false;
}

/**
 * Check if an operation has file parameters
 */
function operationHasFiles(op: ParsedOperation): boolean {
  return op.bodyParams.some((p) => hasFileType(p.type));
}

function generateServiceFile(
  service: ServiceInfo,
  patches: Map<string, OperationPatch>,
): string {
  const lines: string[] = [];

  // Check if any operation has file uploads
  const hasFileUploads = service.operations.some(operationHasFiles);

  // Header
  lines.push(`/**`);
  lines.push(` * Cloudflare ${service.name.toUpperCase()} API`);
  lines.push(` *`);
  lines.push(` * Generated from Cloudflare TypeScript SDK.`);
  lines.push(
    ` * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service ${service.name}`,
  );
  lines.push(` */`);
  lines.push("");

  // Imports (Effect/Stream are conditionally included via placeholders)
  lines.push(`__EFFECT_IMPORT__`);
  lines.push(`__STREAM_IMPORT__`);
  lines.push(`import * as Schema from "effect/Schema";`);
  lines.push(
    `import type * as HttpClient from "effect/unstable/http/HttpClient";`,
  );
  lines.push(`import * as API from "${withTsExtension("../client/api")}";`);
  lines.push(`import * as T from "${withTsExtension("../traits")}";`);
  lines.push(
    `import type { Credentials } from "${withTsExtension("../credentials")}";`,
  );
  lines.push(`import {`);
  lines.push(`  type DefaultErrors,`);
  lines.push(`} from "${withTsExtension("../errors")}";`);
  // Conditionally import UploadableSchema for file uploads
  if (hasFileUploads) {
    lines.push(
      `import { UploadableSchema } from "${withTsExtension("../schemas")}";`,
    );
  }
  lines.push(`__SENSITIVE_IMPORT__`);
  lines.push("");

  // Merge all error definitions across patches and emit each class once
  const mergedErrors = mergeServiceErrors(patches);
  if (mergedErrors.length > 0) {
    lines.push(`// ${"=".repeat(77)}`);
    lines.push(`// Errors`);
    lines.push(`// ${"=".repeat(77)}`);
    lines.push("");
    for (const { tag, matchers } of mergedErrors) {
      lines.push(`export class ${tag} extends Schema.TaggedErrorClass<${tag}>()(
  "${tag}",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(${tag}, ${JSON.stringify(matchers)});`);
      lines.push("");
    }
  }

  // Operations are already normalized by parse.ts (update -> put renaming, etc.)
  // Sort operations by resource, then by verb order
  const sortedOperations = sortOperations(service.operations);

  // Generate each operation with inlined types, adding resource group separators
  let currentResource: string | null = null;
  for (const op of sortedOperations) {
    const resource = extractResourceFromOperationName(op.operationName);

    // Add separator comment when resource changes
    if (resource !== currentResource) {
      if (currentResource !== null) {
        lines.push(""); // Extra blank line between groups
      }
      lines.push(`// ${"=".repeat(77)}`);
      lines.push(`// ${resource}`);
      lines.push(`// ${"=".repeat(77)}`);
      lines.push("");
      currentResource = resource;
    }

    // Get patch for this operation
    const patch = patches.get(op.operationName);
    lines.push(generateOperationSchema(op, patch));
  }

  let code = lines.join("\n");
  // Only include the Effect import if it's actually used in the generated code
  if (code.includes("Effect.")) {
    code = code.replace(
      "__EFFECT_IMPORT__",
      'import * as Effect from "effect/Effect";',
    );
  } else {
    code = code.replace("__EFFECT_IMPORT__\n", "");
  }
  if (code.includes("stream.Stream<")) {
    code = code.replace(
      "__STREAM_IMPORT__",
      'import * as stream from "effect/Stream";',
    );
  } else {
    code = code.replace("__STREAM_IMPORT__\n", "");
  }
  // Only include the SensitiveString import if it's actually used in the generated code
  if (code.includes("SensitiveString")) {
    code = code.replace(
      "__SENSITIVE_IMPORT__",
      `import { SensitiveString } from "${withTsExtension("../sensitive")}";`,
    );
  } else {
    code = code.replace("__SENSITIVE_IMPORT__\n", "");
  }
  return code;
}

interface GenerateOptions {
  outputPath: string;
  debug?: boolean;
}

const generateCode = (services: ServiceInfo[], options: GenerateOptions) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const { outputPath } = options;
    // Create output directory
    yield* fs.makeDirectory(outputPath, { recursive: true });

    // Generate files
    for (const svc of services) {
      if (svc.operations.length === 0) {
        continue;
      }

      // Load patches for this service
      const patches = yield* loadServicePatches(svc.name, svc.operations);

      const code = generateServiceFile(svc, patches);
      const outputFile = path.join(outputPath, `${svc.name}.ts`);

      yield* fs.writeFileString(outputFile, code);
      yield* Console.log(`✅ ${svc.name}`);
    }
  });

const main = Effect.gen(function* () {
  const { service, debug } = parseArgs();
  const basePath = path.resolve(SDK_PATH);

  if (service) {
    yield* Console.log(`Filtering to service: ${service}`);
  }

  // Parse all services
  const services = yield* parseCode({
    basePath,
    serviceFilter: service,
  });

  const outputPath = path.resolve(OUTPUT_PATH);
  yield* generateCode(services, { outputPath, debug });
});

main.pipe(Effect.provide(NodeServices.layer), NodeRuntime.runMain);
