/**
 * Shared OpenAPI Code Generator
 *
 * Handles OpenAPI 2.0 (Swagger), 3.0, and 3.1 specs.
 * Generates Effect Schema-based TypeScript operation files with:
 * - Input schemas with Http/PathParam/QueryParam traits
 * - Output schemas
 * - Typed error classes per operation
 * - JSDoc from spec descriptions
 *
 * Each SDK configures this generator with its own spec paths, import aliases,
 * and error handling strategy.
 *
 * @example
 * ```ts
 * import { generateFromOpenAPI } from "@distilled.cloud/sdk-core/openapi/generate";
 *
 * generateFromOpenAPI({
 *   specPath: "specs/openapi.json",
 *   patchDir: "patches",
 *   outputDir: "src/operations",
 *   importPrefix: "..",
 * });
 * ```
 */
import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "../src/json-patch.ts";

// ============================================================================
// OpenAPI Types (unified across 2.0, 3.0, 3.1)
// ============================================================================

// --- Swagger 2.0 Types ---
interface Swagger2Spec {
  swagger: string;
  info: { title: string; version: string };
  basePath?: string;
  paths: Record<string, PathItem2>;
  definitions?: Record<string, SchemaObject>;
  "x-error-categories"?: Record<string, unknown>;
  "x-http-status-to-error-code"?: Record<string, string>;
}

interface PathItem2 {
  get?: Operation2;
  post?: Operation2;
  put?: Operation2;
  patch?: Operation2;
  delete?: Operation2;
}

interface Operation2 {
  operationId: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: Parameter2[];
  responses: Record<string, Response2>;
  deprecated?: boolean;
}

interface Parameter2 {
  name: string;
  in: "path" | "query" | "body" | "header";
  type?: string;
  required?: boolean;
  description?: string;
  default?: unknown;
  enum?: string[];
  schema?: SchemaObject;
}

interface Response2 {
  description: string;
  schema?: SchemaObject | { $ref: string };
}

// --- OpenAPI 3.x Types ---
interface OpenAPI3Spec {
  openapi: string;
  info: { title: string; version: string };
  servers?: Array<{ url: string }>;
  paths: Record<string, PathItem3>;
  components?: {
    schemas?: Record<string, SchemaObject>;
    responses?: Record<string, ResponseObject3>;
    parameters?: Record<string, ParameterObject3>;
  };
}

interface PathItem3 {
  get?: Operation3;
  post?: Operation3;
  put?: Operation3;
  patch?: Operation3;
  delete?: Operation3;
  parameters?: ParameterObject3[];
}

interface Operation3 {
  operationId: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: ParameterObject3[];
  requestBody?: RequestBody3;
  responses: Record<string, ResponseObject3>;
  deprecated?: boolean;
}

interface ParameterObject3 {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  required?: boolean;
  description?: string;
  schema?: SchemaObject;
  $ref?: string;
}

interface RequestBody3 {
  required?: boolean;
  content: Record<string, MediaType3>;
}

interface ResponseObject3 {
  description: string;
  content?: Record<string, MediaType3>;
  $ref?: string;
}

interface MediaType3 {
  schema?: SchemaObject;
}

// --- Shared Schema Object ---
interface SchemaObject {
  type?: string | string[]; // string[] for OAS 3.1 nullable syntax
  $ref?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  required?: string[];
  enum?: string[];
  additionalProperties?: boolean | SchemaObject;
  description?: string;
  default?: unknown;
  nullable?: boolean; // OAS 3.0
  "x-nullable"?: boolean; // Swagger 2.0
  "x-sensitive"?: boolean;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  format?: string;
  minimum?: number;
  maximum?: number;
}

// ============================================================================
// Generator Configuration
// ============================================================================

export interface GeneratorConfig {
  /** Path to the OpenAPI spec file */
  specPath: string;
  /** Directory containing *.patch.json files (can be same as spec dir or separate) */
  patchDir: string;
  /** Output directory for generated files */
  outputDir: string;
  /** Import prefix for relative imports (e.g., ".." for operations/ -> src/) */
  importPrefix: string;
  /** Client import path (e.g., "../client") */
  clientImport?: string;
  /** Traits import path (e.g., "../traits" or "@distilled.cloud/sdk-core/traits") */
  traitsImport?: string;
  /** Sensitive import path */
  sensitiveImport?: string;
  /** Errors import path (for operation-specific error imports) */
  errorsImport?: string;
  /** Whether to include operation-specific error imports (default: true for Swagger, false for OAS 3.x) */
  includeOperationErrors?: boolean;
  /** Status codes to error class name mapping (only used when includeOperationErrors=true) */
  statusToErrorClass?: Record<string, string>;
  /** Default error status codes to exclude from operation-specific errors */
  defaultErrorStatuses?: Set<string>;
  /** Whether to skip deprecated operations (default: true) */
  skipDeprecated?: boolean;
}

// ============================================================================
// Utility Functions
// ============================================================================

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toCamelCase(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function toPascalCase(s: string): string {
  return capitalize(toCamelCase(s));
}

function operationIdToFunctionName(operationId: string): string {
  return toCamelCase(operationId);
}

// ============================================================================
// Version Detection
// ============================================================================

type SpecVersion = "2.0" | "3.0" | "3.1";

function detectVersion(spec: any): SpecVersion {
  if (spec.swagger === "2.0") return "2.0";
  if (spec.openapi?.startsWith("3.1")) return "3.1";
  if (spec.openapi?.startsWith("3.0")) return "3.0";
  throw new Error(
    `Unsupported spec version: ${spec.swagger || spec.openapi || "unknown"}`,
  );
}

// ============================================================================
// Schema Resolution (version-aware)
// ============================================================================

function resolveRef(spec: any, ref: string): SchemaObject {
  // OAS 3.x: #/components/schemas/...
  if (ref.startsWith("#/components/schemas/")) {
    const refPath = ref.replace("#/components/schemas/", "");
    const schema = spec.components?.schemas?.[refPath];
    if (!schema) throw new Error(`Could not resolve ref: ${ref}`);
    return schema;
  }
  // Swagger 2.0: #/definitions/...
  if (ref.startsWith("#/definitions/")) {
    const refPath = ref.replace("#/definitions/", "");
    const schema = spec.definitions?.[refPath];
    if (!schema) throw new Error(`Could not resolve ref: ${ref}`);
    return schema;
  }
  throw new Error(`Could not resolve ref: ${ref}`);
}

function resolveParameterRef(spec: any, ref: string): ParameterObject3 {
  const refPath = ref.replace("#/components/parameters/", "");
  const param = spec.components?.parameters?.[refPath];
  if (!param) throw new Error(`Could not resolve parameter ref: ${ref}`);
  return param;
}

function resolveResponseRef(spec: any, ref: string): ResponseObject3 {
  const refPath = ref.replace("#/components/responses/", "");
  const response = spec.components?.responses?.[refPath];
  if (!response) throw new Error(`Could not resolve response ref: ${ref}`);
  return response;
}

function isNullable(prop: SchemaObject): boolean {
  // OAS 3.1: type can be ["string", "null"]
  if (Array.isArray(prop.type) && prop.type.includes("null")) return true;
  // OAS 3.0: nullable: true
  if (prop.nullable) return true;
  // Swagger 2.0: x-nullable: true
  if (prop["x-nullable"]) return true;
  return false;
}

function getBaseType(prop: SchemaObject): string | undefined {
  if (Array.isArray(prop.type)) {
    return prop.type.find((t) => t !== "null");
  }
  return prop.type;
}

// ============================================================================
// Effect Schema Generation
// ============================================================================

interface SchemaGenerationContext {
  usesSensitiveString: boolean;
  usesSensitiveNullableString: boolean;
}

function openApiTypeToEffectSchema(
  prop: SchemaObject,
  spec: any,
  indent: string = "",
  seenRefs: Set<string> = new Set(),
  ctx?: SchemaGenerationContext,
): string {
  // Handle $ref
  if (prop.$ref) {
    if (seenRefs.has(prop.$ref)) {
      return "Schema.Unknown"; // Prevent infinite recursion
    }
    const resolved = resolveRef(spec, prop.$ref);
    return openApiTypeToEffectSchema(
      resolved,
      spec,
      indent,
      new Set([...seenRefs, prop.$ref]),
      ctx,
    );
  }

  // Handle allOf - merge all schemas
  if (prop.allOf && prop.allOf.length > 0) {
    const mergedProps: Record<string, SchemaObject> = {};
    const mergedRequired: string[] = [];

    for (const subSchema of prop.allOf) {
      let resolved = subSchema;
      if (subSchema.$ref) {
        resolved = resolveRef(spec, subSchema.$ref);
      }
      if (resolved.properties) {
        Object.assign(mergedProps, resolved.properties);
      }
      if (resolved.required) {
        mergedRequired.push(...resolved.required);
      }
    }

    const mergedSchema: SchemaObject = {
      type: "object",
      properties: mergedProps,
      required: [...new Set(mergedRequired)],
    };

    return generateStructSchema(mergedSchema, spec, indent, seenRefs, ctx);
  }

  // Handle oneOf/anyOf - use Unknown for now
  if (prop.oneOf || prop.anyOf) {
    return "Schema.Unknown";
  }

  // Handle enum
  if (prop.enum && prop.enum.length > 0) {
    const literals = prop.enum.map((v) => `"${v}"`).join(", ");
    const baseSchema = `Schema.Literals([${literals}])`;
    return isNullable(prop) ? `Schema.NullOr(${baseSchema})` : baseSchema;
  }

  // Handle type
  const baseType = getBaseType(prop);
  let baseSchema: string;

  switch (baseType) {
    case "string":
      // Check for sensitive annotation
      if (prop["x-sensitive"]) {
        if (ctx) {
          if (isNullable(prop)) {
            ctx.usesSensitiveNullableString = true;
          } else {
            ctx.usesSensitiveString = true;
          }
        }
        baseSchema = isNullable(prop)
          ? "SensitiveNullableString"
          : "SensitiveString";
        return baseSchema; // Return early since Sensitive handles null
      }
      baseSchema = "Schema.String";
      break;
    case "integer":
    case "number":
      baseSchema = "Schema.Number";
      break;
    case "boolean":
      baseSchema = "Schema.Boolean";
      break;
    case "array":
      if (prop.items) {
        const itemSchema = openApiTypeToEffectSchema(
          prop.items,
          spec,
          indent,
          seenRefs,
          ctx,
        );
        baseSchema = `Schema.Array(${itemSchema})`;
      } else {
        baseSchema = "Schema.Array(Schema.Unknown)";
      }
      break;
    case "object":
      if (prop.properties) {
        baseSchema = generateStructSchema(prop, spec, indent, seenRefs, ctx);
      } else if (prop.additionalProperties) {
        if (typeof prop.additionalProperties === "boolean") {
          baseSchema = "Schema.Record(Schema.String, Schema.Unknown)";
        } else {
          const valueSchema = openApiTypeToEffectSchema(
            prop.additionalProperties,
            spec,
            indent,
            seenRefs,
            ctx,
          );
          baseSchema = `Schema.Record(Schema.String, ${valueSchema})`;
        }
      } else {
        baseSchema = "Schema.Unknown";
      }
      break;
    default:
      if (prop.properties) {
        baseSchema = generateStructSchema(prop, spec, indent, seenRefs, ctx);
      } else {
        baseSchema = "Schema.Unknown";
      }
      break;
  }

  return isNullable(prop) ? `Schema.NullOr(${baseSchema})` : baseSchema;
}

function generateStructSchema(
  schema: SchemaObject,
  spec: any,
  indent: string = "",
  seenRefs: Set<string> = new Set(),
  ctx?: SchemaGenerationContext,
): string {
  if (!schema.properties) return "Schema.Unknown";

  const required = new Set(schema.required || []);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(schema.properties)) {
    const fieldSchema = openApiTypeToEffectSchema(
      value,
      spec,
      indent + "  ",
      seenRefs,
      ctx,
    );
    const isOptional = !required.has(key);
    if (isOptional) {
      lines.push(`${indent}  ${key}: Schema.optional(${fieldSchema}),`);
    } else {
      lines.push(`${indent}  ${key}: ${fieldSchema},`);
    }
  }

  return `Schema.Struct({\n${lines.join("\n")}\n${indent}})`;
}

// ============================================================================
// JSDoc Generation
// ============================================================================

function escapeJsDoc(text: string): string {
  return text.replace(/\*\//g, "*\\/").replace(/\\/g, "\\\\");
}

function formatDescription(description: string | undefined): string[] {
  if (!description) return [];

  const lines = description.split("\n");
  const result: string[] = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip authorization sections
    if (trimmed.startsWith("### Authorization")) {
      break;
    }

    // Skip markdown table markers
    if (trimmed.startsWith("|") || trimmed.startsWith("| :")) {
      inTable = true;
      continue;
    }

    if (inTable && !trimmed.startsWith("|")) {
      inTable = false;
    }

    if (!inTable && trimmed) {
      result.push(escapeJsDoc(trimmed));
    }
  }

  return result;
}

interface ParameterInfo {
  name: string;
  in: string;
  type?: string;
  required?: boolean;
  description?: string;
  enum?: string[];
  schema?: SchemaObject;
}

function generateJsDoc(
  summary: string | undefined,
  description: string | undefined,
  parameters: ParameterInfo[],
  bodyProperties?: Record<string, SchemaObject>,
): string {
  const lines: string[] = ["/**"];

  if (summary) {
    lines.push(` * ${escapeJsDoc(summary)}`);
  }

  const descLines = formatDescription(description);
  if (descLines.length > 0) {
    const descText = descLines.join(" ");
    if (descText !== summary) {
      if (summary) lines.push(" *");
      for (const line of descLines) {
        lines.push(` * ${line}`);
      }
    }
  }

  const documentedParams = parameters.filter(
    (p) => p.description && p.in !== "body",
  );
  if (documentedParams.length > 0) {
    lines.push(" *");
    for (const param of documentedParams) {
      const desc = escapeJsDoc(param.description || "");
      lines.push(` * @param ${param.name} - ${desc}`);
    }
  }

  // Document body properties
  if (bodyProperties) {
    for (const [key, value] of Object.entries(bodyProperties)) {
      if (value.description) {
        lines.push(` * @param ${key} - ${escapeJsDoc(value.description)}`);
      }
    }
  }

  lines.push(" */");

  if (lines.length === 2) {
    return "";
  }

  return lines.join("\n");
}

// ============================================================================
// Code Generation - Swagger 2.0
// ============================================================================

interface GeneratedOperation {
  fileName: string;
  code: string;
  functionName: string;
  exports: string[];
}

function generateInputSchemaSwagger(
  operationId: string,
  method: string,
  pathTemplate: string,
  parameters: Parameter2[],
  spec: Swagger2Spec,
): { inputSchemaCode: string; inputSchemaName: string } {
  const inputSchemaName = `${toPascalCase(operationId)}Input`;
  const pathParams = parameters.filter((p) => p.in === "path");
  const queryParams = parameters.filter((p) => p.in === "query");
  const bodyParam = parameters.find((p) => p.in === "body");

  const fields: string[] = [];

  // Path parameters
  for (const param of pathParams) {
    const baseSchema = param.enum
      ? `Schema.Literals([${param.enum.map((v) => `"${v}"`).join(", ")}])`
      : param.type === "integer"
        ? "Schema.Number"
        : "Schema.String";
    fields.push(`  ${param.name}: ${baseSchema}.pipe(T.PathParam()),`);
  }

  // Query parameters
  for (const param of queryParams) {
    let schema =
      param.type === "integer" || param.type === "number"
        ? "Schema.Number"
        : param.type === "boolean"
          ? "Schema.Boolean"
          : param.enum
            ? `Schema.Literals([${param.enum.map((v) => `"${v}"`).join(", ")}])`
            : "Schema.String";

    if (!param.required) {
      schema = `Schema.optional(${schema})`;
    }
    fields.push(`  ${param.name}: ${schema},`);
  }

  // Body parameters
  if (bodyParam?.schema) {
    const bodySchema = bodyParam.schema;
    if (bodySchema.properties) {
      const required = new Set(bodySchema.required || []);
      for (const [key, value] of Object.entries(bodySchema.properties)) {
        let fieldSchema = openApiTypeToEffectSchema(value, spec, "  ");
        if (!required.has(key)) {
          fieldSchema = `Schema.optional(${fieldSchema})`;
        }
        fields.push(`  ${key}: ${fieldSchema},`);
      }
    }
  }

  const inputSchemaCode = `export const ${inputSchemaName} = Schema.Struct({
${fields.join("\n")}
}).pipe(T.Http({ method: "${method.toUpperCase()}", path: "${pathTemplate}" }));
export type ${inputSchemaName} = typeof ${inputSchemaName}.Type;`;

  return { inputSchemaCode, inputSchemaName };
}

// ============================================================================
// Code Generation - OpenAPI 3.x
// ============================================================================

function resolveParameters3(
  spec: OpenAPI3Spec,
  pathParams: ParameterObject3[] | undefined,
  operationParams: ParameterObject3[] | undefined,
): ParameterObject3[] {
  const params: ParameterObject3[] = [];

  if (pathParams) {
    for (const param of pathParams) {
      if (param.$ref) {
        params.push(resolveParameterRef(spec, param.$ref));
      } else {
        params.push(param);
      }
    }
  }

  if (operationParams) {
    for (const param of operationParams) {
      if (param.$ref) {
        params.push(resolveParameterRef(spec, param.$ref));
      } else {
        params.push(param);
      }
    }
  }

  return params;
}

function generateInputSchema3(
  operationId: string,
  method: string,
  pathTemplate: string,
  parameters: ParameterObject3[],
  requestBody: RequestBody3 | undefined,
  spec: OpenAPI3Spec,
): { inputSchemaCode: string; inputSchemaName: string } {
  const inputSchemaName = `${toPascalCase(operationId)}Input`;
  const pathParams = parameters.filter((p) => p.in === "path");
  const queryParams = parameters.filter((p) => p.in === "query");

  const fields: string[] = [];
  const usedNames = new Set<string>();

  // Path parameters
  for (const param of pathParams) {
    if (usedNames.has(param.name)) continue;
    usedNames.add(param.name);
    const schema = param.schema;
    const baseSchema =
      schema?.enum && schema.enum.length > 0
        ? `Schema.Literals([${schema.enum.map((v) => `"${v}"`).join(", ")}])`
        : schema?.type === "integer" || schema?.type === "number"
          ? "Schema.Number"
          : "Schema.String";
    fields.push(`  ${param.name}: ${baseSchema}.pipe(T.PathParam()),`);
  }

  // Query parameters
  for (const param of queryParams) {
    if (usedNames.has(param.name)) continue;
    usedNames.add(param.name);
    const schema = param.schema;
    let schemaStr =
      schema?.type === "integer" || schema?.type === "number"
        ? "Schema.Number"
        : schema?.type === "boolean"
          ? "Schema.Boolean"
          : schema?.enum && schema.enum.length > 0
            ? `Schema.Literals([${schema.enum.map((v) => `"${v}"`).join(", ")}])`
            : "Schema.String";

    if (!param.required) {
      schemaStr = `Schema.optional(${schemaStr})`;
    }
    fields.push(`  ${param.name}: ${schemaStr},`);
  }

  // Request body
  if (requestBody?.content) {
    const jsonContent = requestBody.content["application/json"];
    if (jsonContent?.schema) {
      let bodySchema = jsonContent.schema;
      if (bodySchema.$ref) {
        bodySchema = resolveRef(spec, bodySchema.$ref);
      }

      if (bodySchema.properties) {
        const required = new Set(bodySchema.required || []);
        for (const [key, value] of Object.entries(bodySchema.properties)) {
          if (usedNames.has(key)) continue;
          usedNames.add(key);
          let fieldSchema = openApiTypeToEffectSchema(value, spec, "  ");
          if (!required.has(key)) {
            fieldSchema = `Schema.optional(${fieldSchema})`;
          }
          fields.push(`  ${key}: ${fieldSchema},`);
        }
      }
    }
  }

  const inputSchemaCode = `export const ${inputSchemaName} = Schema.Struct({
${fields.join("\n")}
}).pipe(T.Http({ method: "${method.toUpperCase()}", path: "${pathTemplate}" }));
export type ${inputSchemaName} = typeof ${inputSchemaName}.Type;`;

  return { inputSchemaCode, inputSchemaName };
}

// ============================================================================
// Shared Output Schema Generation
// ============================================================================

function getResponseSchema(
  spec: any,
  version: SpecVersion,
  responses: Record<string, any>,
): SchemaObject | null {
  const successResponse =
    responses["200"] || responses["201"] || responses["204"];
  if (!successResponse) return null;

  if (version === "2.0") {
    // Swagger 2.0
    if (!successResponse.schema) return null;
    if (successResponse.schema.$ref) {
      return resolveRef(spec, successResponse.schema.$ref);
    }
    return successResponse.schema;
  } else {
    // OAS 3.x
    let response = successResponse;
    if (response.$ref) {
      response = resolveResponseRef(spec, response.$ref);
    }
    const content = response.content;
    if (!content) return null;
    const jsonContent = content["application/json"];
    if (!jsonContent?.schema) return null;
    if (jsonContent.schema.$ref) {
      return resolveRef(spec, jsonContent.schema.$ref);
    }
    return jsonContent.schema;
  }
}

function generateOutputSchema(
  operationId: string,
  responseSchema: SchemaObject | null,
  spec: any,
): {
  outputSchemaCode: string;
  outputSchemaName: string;
  sensitiveImports: {
    usesSensitiveString: boolean;
    usesSensitiveNullableString: boolean;
  };
} {
  const outputSchemaName = toPascalCase(operationId) + "Output";
  const ctx: SchemaGenerationContext = {
    usesSensitiveString: false,
    usesSensitiveNullableString: false,
  };

  if (!responseSchema) {
    return {
      outputSchemaCode: `export const ${outputSchemaName} = Schema.Void;
export type ${outputSchemaName} = typeof ${outputSchemaName}.Type;`,
      outputSchemaName,
      sensitiveImports: {
        usesSensitiveString: false,
        usesSensitiveNullableString: false,
      },
    };
  }

  // Handle array responses
  if (
    (responseSchema.type === "array" ||
      (Array.isArray(responseSchema.type) &&
        responseSchema.type.includes("array"))) &&
    responseSchema.items
  ) {
    const itemSchema = openApiTypeToEffectSchema(
      responseSchema.items,
      spec,
      "",
      new Set(),
      ctx,
    );
    return {
      outputSchemaCode: `export const ${outputSchemaName} = Schema.Array(${itemSchema});
export type ${outputSchemaName} = typeof ${outputSchemaName}.Type;`,
      outputSchemaName,
      sensitiveImports: {
        usesSensitiveString: ctx.usesSensitiveString,
        usesSensitiveNullableString: ctx.usesSensitiveNullableString,
      },
    };
  }

  const schemaCode = openApiTypeToEffectSchema(
    responseSchema,
    spec,
    "",
    new Set(),
    ctx,
  );
  return {
    outputSchemaCode: `export const ${outputSchemaName} = ${schemaCode};
export type ${outputSchemaName} = typeof ${outputSchemaName}.Type;`,
    outputSchemaName,
    sensitiveImports: {
      usesSensitiveString: ctx.usesSensitiveString,
      usesSensitiveNullableString: ctx.usesSensitiveNullableString,
    },
  };
}

// ============================================================================
// Unified Operation Generation
// ============================================================================

function generateOperationCode(
  functionName: string,
  inputSchemaName: string,
  outputSchemaName: string,
  jsDoc: string,
  operationErrors: string[],
  sensitiveImports: {
    usesSensitiveString: boolean;
    usesSensitiveNullableString: boolean;
  },
  config: GeneratorConfig,
): string {
  const clientImport = config.clientImport ?? `${config.importPrefix}/client`;
  const traitsImport = config.traitsImport ?? `${config.importPrefix}/traits`;
  const sensitiveImportPath =
    config.sensitiveImport ?? `${config.importPrefix}/sensitive`;
  const errorsImportPath =
    config.errorsImport ?? `${config.importPrefix}/errors`;

  const hasErrors = operationErrors.length > 0;
  const errorsLine = hasErrors
    ? `\n  errors: [${operationErrors.join(", ")}] as const,`
    : "";

  const operationCode = jsDoc
    ? `${jsDoc}
export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsLine}
}));`
    : `export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsLine}
}));`;

  let imports = `import * as Schema from "effect/Schema";
import { API } from "${clientImport}";
import * as T from "${traitsImport}";`;

  if (hasErrors) {
    imports += `\nimport { ${operationErrors.join(", ")} } from "${errorsImportPath}";`;
  }

  const sensitiveTypesToImport: string[] = [];
  if (sensitiveImports.usesSensitiveString) {
    sensitiveTypesToImport.push("SensitiveString");
  }
  if (sensitiveImports.usesSensitiveNullableString) {
    sensitiveTypesToImport.push("SensitiveNullableString");
  }
  if (sensitiveTypesToImport.length > 0) {
    imports += `\nimport { ${sensitiveTypesToImport.join(", ")} } from "${sensitiveImportPath}";`;
  }

  return [
    imports,
    "",
    "// Input Schema",
    "", // will be filled by caller
    "",
    "// Output Schema",
    "", // will be filled by caller
    "",
    "// The operation",
    operationCode,
    "",
  ].join("\n");
}

// ============================================================================
// Main Generator
// ============================================================================

export function generateFromOpenAPI(config: GeneratorConfig): void {
  const specPath = path.resolve(config.specPath);
  const patchDir = path.resolve(config.patchDir);
  const outputDir = path.resolve(config.outputDir);

  // Read spec
  console.log("Reading OpenAPI spec...");
  const specContent = fs.readFileSync(specPath, "utf-8");
  const spec = JSON.parse(specContent);

  // Detect version
  const version = detectVersion(spec);
  console.log(`Detected spec version: ${version}`);

  // Apply patches
  console.log("Applying patches...");
  const { applied, errors: patchErrors } = applyAllPatches(spec, patchDir);
  for (const msg of applied) {
    console.log(`  ✓ ${msg}`);
  }
  if (patchErrors.length > 0) {
    console.log("\nPatch errors:");
    for (const msg of patchErrors) {
      console.log(`  ✗ ${msg}`);
    }
    process.exit(1);
  }
  if (applied.length > 0) console.log("");

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Status-to-error-class mapping
  const statusToErrorClass = config.statusToErrorClass ?? {
    "400": "BadRequest",
    "403": "Forbidden",
    "404": "NotFound",
    "409": "Conflict",
    "422": "UnprocessableEntity",
  };
  const defaultErrorStatuses =
    config.defaultErrorStatuses ?? new Set(["401", "429", "500", "503"]);

  const includeOperationErrors =
    config.includeOperationErrors ?? version === "2.0";

  // Collect all operations
  const operations: GeneratedOperation[] = [];

  if (version === "2.0") {
    // Swagger 2.0 codepath
    const swagger = spec as Swagger2Spec;
    for (const [pathTemplate, pathItem] of Object.entries(swagger.paths)) {
      for (const method of ["get", "post", "put", "patch", "delete"] as const) {
        const operation = pathItem[method];
        if (!operation) continue;
        if (config.skipDeprecated !== false && operation.deprecated) {
          console.log(
            `Skipping deprecated ${method.toUpperCase()} ${pathTemplate}`,
          );
          continue;
        }

        console.log(
          `Generating ${method.toUpperCase()} ${pathTemplate} (${operation.operationId})...`,
        );

        try {
          const functionName = operationIdToFunctionName(operation.operationId);
          const parameters = operation.parameters || [];

          const jsDoc = generateJsDoc(
            operation.summary,
            operation.description,
            parameters.map((p) => ({
              name: p.name,
              in: p.in,
              type: p.type,
              required: p.required,
              description: p.description,
              enum: p.enum,
            })),
            parameters.find((p) => p.in === "body")?.schema?.properties,
          );

          const { inputSchemaCode, inputSchemaName } =
            generateInputSchemaSwagger(
              operation.operationId,
              method,
              pathTemplate,
              parameters,
              swagger,
            );

          const responseSchema = getResponseSchema(
            swagger,
            version,
            operation.responses,
          );
          const { outputSchemaCode, outputSchemaName, sensitiveImports } =
            generateOutputSchema(
              operation.operationId,
              responseSchema,
              swagger,
            );

          // Get operation-specific errors
          let operationErrors: string[] = [];
          if (includeOperationErrors) {
            for (const status of Object.keys(operation.responses)) {
              if (status.startsWith("2") || defaultErrorStatuses.has(status))
                continue;
              const errorClass = statusToErrorClass[status];
              if (errorClass) {
                operationErrors.push(errorClass);
              }
            }
          }

          const code = buildOperationFile(
            functionName,
            inputSchemaCode,
            inputSchemaName,
            outputSchemaCode,
            outputSchemaName,
            jsDoc,
            operationErrors,
            sensitiveImports,
            config,
          );

          operations.push({
            fileName: `${functionName}.ts`,
            code,
            functionName,
            exports: [inputSchemaName, outputSchemaName, functionName],
          });
        } catch (error) {
          console.error(`Error generating ${operation.operationId}:`, error);
        }
      }
    }
  } else {
    // OpenAPI 3.x codepath
    const oas = spec as OpenAPI3Spec;
    for (const [pathTemplate, pathItem] of Object.entries(oas.paths)) {
      const pathLevelParams = pathItem.parameters;

      for (const method of ["get", "post", "put", "patch", "delete"] as const) {
        const operation = pathItem[method];
        if (!operation) continue;
        if (config.skipDeprecated !== false && operation.deprecated) {
          console.log(
            `Skipping deprecated ${method.toUpperCase()} ${pathTemplate}`,
          );
          continue;
        }

        console.log(
          `Generating ${method.toUpperCase()} ${pathTemplate} (${operation.operationId})...`,
        );

        try {
          const functionName = operationIdToFunctionName(operation.operationId);
          const parameters = resolveParameters3(
            oas,
            pathLevelParams,
            operation.parameters,
          );

          const jsDoc = generateJsDoc(
            operation.summary,
            operation.description,
            parameters.map((p) => ({
              name: p.name,
              in: p.in,
              required: p.required,
              description: p.description,
            })),
          );

          const { inputSchemaCode, inputSchemaName } = generateInputSchema3(
            operation.operationId,
            method,
            pathTemplate,
            parameters,
            operation.requestBody,
            oas,
          );

          const responseSchema = getResponseSchema(
            oas,
            version,
            operation.responses,
          );
          const { outputSchemaCode, outputSchemaName, sensitiveImports } =
            generateOutputSchema(operation.operationId, responseSchema, oas);

          // Get operation-specific errors
          let operationErrors: string[] = [];
          if (includeOperationErrors) {
            for (const status of Object.keys(operation.responses)) {
              if (status.startsWith("2") || defaultErrorStatuses.has(status))
                continue;
              const errorClass = statusToErrorClass[status];
              if (errorClass) {
                operationErrors.push(errorClass);
              }
            }
          }

          const code = buildOperationFile(
            functionName,
            inputSchemaCode,
            inputSchemaName,
            outputSchemaCode,
            outputSchemaName,
            jsDoc,
            operationErrors,
            sensitiveImports,
            config,
          );

          operations.push({
            fileName: `${functionName}.ts`,
            code,
            functionName,
            exports: [inputSchemaName, outputSchemaName, functionName],
          });
        } catch (error) {
          console.error(`Error generating ${operation.operationId}:`, error);
        }
      }
    }
  }

  // Write all operation files
  for (const op of operations) {
    const filePath = path.join(outputDir, op.fileName);
    fs.writeFileSync(filePath, op.code);
    console.log(`Written: ${op.fileName}`);
  }

  // Write barrel file
  console.log("\nWriting barrel file...");
  const barrelPath = path.join(outputDir, "index.ts");
  const barrelContent =
    operations.map((op) => `export * from "./${op.functionName}";`).join("\n") +
    "\n";
  fs.writeFileSync(barrelPath, barrelContent);
  console.log(`Written: index.ts`);

  console.log(`\nGenerated ${operations.length} operations.`);

  console.log("Done!");
}

// ============================================================================
// Helpers
// ============================================================================

function buildOperationFile(
  functionName: string,
  inputSchemaCode: string,
  inputSchemaName: string,
  outputSchemaCode: string,
  outputSchemaName: string,
  jsDoc: string,
  operationErrors: string[],
  sensitiveImports: {
    usesSensitiveString: boolean;
    usesSensitiveNullableString: boolean;
  },
  config: GeneratorConfig,
): string {
  const clientImport = config.clientImport ?? `${config.importPrefix}/client`;
  const traitsImport = config.traitsImport ?? `${config.importPrefix}/traits`;
  const sensitiveImportPath =
    config.sensitiveImport ?? `${config.importPrefix}/sensitive`;
  const errorsImportPath =
    config.errorsImport ?? `${config.importPrefix}/errors`;

  const hasErrors = operationErrors.length > 0;
  const errorsLine = hasErrors
    ? `\n  errors: [${operationErrors.join(", ")}] as const,`
    : "";

  const operationCode = jsDoc
    ? `${jsDoc}
export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsLine}
}));`
    : `export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsLine}
}));`;

  let imports = `import * as Schema from "effect/Schema";
import { API } from "${clientImport}";
import * as T from "${traitsImport}";`;

  if (hasErrors) {
    imports += `\nimport { ${operationErrors.join(", ")} } from "${errorsImportPath}";`;
  }

  const sensitiveTypesToImport: string[] = [];
  if (sensitiveImports.usesSensitiveString) {
    sensitiveTypesToImport.push("SensitiveString");
  }
  if (sensitiveImports.usesSensitiveNullableString) {
    sensitiveTypesToImport.push("SensitiveNullableString");
  }
  if (sensitiveTypesToImport.length > 0) {
    imports += `\nimport { ${sensitiveTypesToImport.join(", ")} } from "${sensitiveImportPath}";`;
  }

  return [
    imports,
    "",
    "// Input Schema",
    inputSchemaCode,
    "",
    "// Output Schema",
    outputSchemaCode,
    "",
    "// The operation",
    operationCode,
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}
