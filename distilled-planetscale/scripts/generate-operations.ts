import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "./apply-patches";

// ============================================================================
// Types for OpenAPI Spec
// ============================================================================

interface ErrorCategoryInfo {
  category: string;
  decorator: string;
  description: string;
}

interface OpenAPISpec {
  swagger: string;
  info: { title: string; version: string };
  basePath: string;
  paths: Record<string, PathItem>;
  definitions: Record<string, SchemaObject>;
  "x-error-categories"?: Record<string, ErrorCategoryInfo>;
  "x-http-status-to-error-code"?: Record<string, string>;
}

interface PathItem {
  get?: Operation;
  post?: Operation;
  put?: Operation;
  patch?: Operation;
  delete?: Operation;
}

interface Operation {
  operationId: string;
  summary: string;
  description?: string;
  tags?: string[];
  parameters?: Parameter[];
  responses: Record<string, Response>;
}

interface Parameter {
  name: string;
  in: "path" | "query" | "body" | "header";
  type?: string;
  required?: boolean;
  description?: string;
  default?: unknown;
  enum?: string[];
  schema?: SchemaObject;
}

interface Response {
  description: string;
  schema?: SchemaObject | { $ref: string };
}

interface SchemaObject {
  type?: string;
  $ref?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  required?: string[];
  enum?: string[];
  additionalProperties?: boolean | SchemaObject;
  description?: string;
  default?: unknown;
  "x-nullable"?: boolean;
  "x-sensitive"?: boolean;
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
// Schema Resolution
// ============================================================================

function resolveRef(spec: OpenAPISpec, ref: string): SchemaObject {
  const refPath = ref.replace("#/definitions/", "");
  const schema = spec.definitions[refPath];
  if (!schema) {
    throw new Error(`Could not resolve ref: ${ref}`);
  }
  return schema;
}

function getSchemaFromResponse(
  spec: OpenAPISpec,
  response: Response | undefined,
): SchemaObject | null {
  if (!response?.schema) return null;
  if ("$ref" in response.schema && response.schema.$ref) {
    return resolveRef(spec, response.schema.$ref);
  }
  return response.schema as SchemaObject;
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
  spec: OpenAPISpec,
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

  // Handle enum - v4 uses Schema.Literals([...]) for multiple values
  if (prop.enum && prop.enum.length > 0) {
    const literals = prop.enum.map((v) => `"${v}"`).join(", ");
    const baseSchema = `Schema.Literals([${literals}])`;
    return prop["x-nullable"] ? `Schema.NullOr(${baseSchema})` : baseSchema;
  }

  // Handle type
  let baseSchema: string;
  switch (prop.type) {
    case "string":
      // Check for sensitive annotation
      if (prop["x-sensitive"]) {
        if (ctx) {
          if (prop["x-nullable"]) {
            ctx.usesSensitiveNullableString = true;
          } else {
            ctx.usesSensitiveString = true;
          }
        }
        baseSchema = prop["x-nullable"]
          ? "SensitiveNullableString"
          : "SensitiveString";
        // Return early since SensitiveNullableString already handles null
        return baseSchema;
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

  // Wrap with NullOr if x-nullable is true
  return prop["x-nullable"] ? `Schema.NullOr(${baseSchema})` : baseSchema;
}

function generateStructSchema(
  schema: SchemaObject,
  spec: OpenAPISpec,
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
// Code Generation
// ============================================================================

interface GeneratedOperation {
  fileName: string;
  code: string;
  functionName: string;
  exports: string[];
}

// ============================================================================
// JSDoc Generation
// ============================================================================

function escapeJsDoc(text: string): string {
  // Escape characters that could break JSDoc comments
  return text.replace(/\*\//g, "*\\/").replace(/\\/g, "\\\\");
}

function formatDescription(description: string | undefined): string[] {
  if (!description) return [];

  // Clean up the description - remove markdown tables and authorization sections
  // for cleaner JSDoc output
  const lines = description.split("\n");
  const result: string[] = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip authorization sections (markdown headers starting with ###)
    if (trimmed.startsWith("### Authorization")) {
      break; // Stop processing after Authorization header
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

function generateJsDoc(
  summary: string | undefined,
  description: string | undefined,
  parameters: Parameter[],
): string {
  const lines: string[] = ["/**"];

  // Add summary as the first line
  if (summary) {
    lines.push(` * ${escapeJsDoc(summary)}`);
  }

  // Add description if different from summary
  const descLines = formatDescription(description);
  if (descLines.length > 0) {
    // Only add description if it's different from summary
    const descText = descLines.join(" ");
    if (descText !== summary) {
      if (summary) lines.push(" *");
      for (const line of descLines) {
        lines.push(` * ${line}`);
      }
    }
  }

  // Add @param tags for parameters with descriptions
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

  // Add body parameter properties if present
  const bodyParam = parameters.find((p) => p.in === "body");
  if (bodyParam?.schema?.properties) {
    for (const [key, value] of Object.entries(bodyParam.schema.properties)) {
      if (value.description) {
        lines.push(` * @param ${key} - ${escapeJsDoc(value.description)}`);
      }
    }
  }

  lines.push(" */");

  // Don't generate empty JSDoc
  if (lines.length === 2) {
    return "";
  }

  return lines.join("\n");
}

function generateInputSchema(
  operationId: string,
  method: string,
  pathTemplate: string,
  parameters: Parameter[],
  spec: OpenAPISpec,
): {
  inputSchemaCode: string;
  inputSchemaName: string;
} {
  const inputSchemaName = `${toPascalCase(operationId)}Input`;
  const pathParams = parameters.filter((p) => p.in === "path");
  const queryParams = parameters.filter((p) => p.in === "query");
  const bodyParam = parameters.find((p) => p.in === "body");

  const fields: string[] = [];

  // Path parameters (always required) - with T.PathParam() trait
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

  // Build HTTP trait path template (use {param} syntax)
  const httpPath = pathTemplate;

  const inputSchemaCode = `export const ${inputSchemaName} = Schema.Struct({
${fields.join("\n")}
}).pipe(T.Http({ method: "${method.toUpperCase()}", path: "${httpPath}" }));
export type ${inputSchemaName} = typeof ${inputSchemaName}.Type;`;

  return { inputSchemaCode, inputSchemaName };
}

interface SensitiveImports {
  usesSensitiveString: boolean;
  usesSensitiveNullableString: boolean;
}

function generateOutputSchema(
  operationId: string,
  responseSchema: SchemaObject | null,
  spec: OpenAPISpec,
): {
  outputSchemaCode: string;
  outputSchemaName: string;
  sensitiveImports: SensitiveImports;
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
  if (responseSchema.type === "array" && responseSchema.items) {
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

  // Handle object responses
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

// Error classes are now global - see src/errors.ts
// Map HTTP status codes to error class names for operation-specific errors
const STATUS_TO_ERROR_CLASS: Record<string, string> = {
  "400": "BadRequest",
  "403": "Forbidden",
  "404": "NotFound",
  "409": "Conflict",
  "422": "UnprocessableEntity",
};

// Default error status codes that are handled globally (not operation-specific)
const DEFAULT_ERROR_STATUSES = new Set(["401", "429", "500", "503"]);

/**
 * Extract operation-specific error classes from OpenAPI response codes.
 * Excludes default errors (401, 429, 500, 503) and success codes.
 */
function getOperationErrors(responses: Record<string, Response>): string[] {
  const errors: string[] = [];
  for (const status of Object.keys(responses)) {
    // Skip success codes and default error codes
    if (status.startsWith("2") || DEFAULT_ERROR_STATUSES.has(status)) continue;
    const errorClass = STATUS_TO_ERROR_CLASS[status];
    if (errorClass) {
      errors.push(errorClass);
    }
  }
  return errors;
}

function generateOperation(
  spec: OpenAPISpec,
  pathTemplate: string,
  method: string,
  operation: Operation,
): GeneratedOperation {
  const operationId = operation.operationId;
  const functionName = operationIdToFunctionName(operationId);
  const parameters = operation.parameters || [];

  // Generate JSDoc from OpenAPI documentation
  const jsDoc = generateJsDoc(
    operation.summary,
    operation.description,
    parameters,
  );

  // Generate input schema
  const { inputSchemaCode, inputSchemaName } = generateInputSchema(
    operationId,
    method,
    pathTemplate,
    parameters,
    spec,
  );

  // Get success response (200 or 201)
  const successResponse =
    operation.responses["200"] ||
    operation.responses["201"] ||
    operation.responses["204"];
  const responseSchema = getSchemaFromResponse(spec, successResponse);

  // Generate output schema
  const { outputSchemaCode, outputSchemaName, sensitiveImports } =
    generateOutputSchema(operationId, responseSchema, spec);

  // Extract operation-specific errors from response codes
  const operationErrors = getOperationErrors(operation.responses);

  // Generate the operation function
  const hasErrors = operationErrors.length > 0;
  const errorsLine = hasErrors
    ? `\n  errors: [${operationErrors.join(", ")}] as const,`
    : "";

  const operationCodeWithJsDoc = jsDoc
    ? `${jsDoc}
export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsLine}
}));`
    : `export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsLine}
}));`;

  // Combine all code
  let imports = `import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";`;

  // Add error imports if needed
  if (hasErrors) {
    imports += `\nimport { ${operationErrors.join(", ")} } from "../errors";`;
  }

  // Add sensitive imports only for the types actually used
  const sensitiveTypesToImport: string[] = [];
  if (sensitiveImports.usesSensitiveString) {
    sensitiveTypesToImport.push("SensitiveString");
  }
  if (sensitiveImports.usesSensitiveNullableString) {
    sensitiveTypesToImport.push("SensitiveNullableString");
  }
  if (sensitiveTypesToImport.length > 0) {
    imports += `\nimport { ${sensitiveTypesToImport.join(", ")} } from "../sensitive";`;
  }

  const code = [
    imports,
    "",
    "// Input Schema",
    inputSchemaCode,
    "",
    "// Output Schema",
    outputSchemaCode,
    "",
    "// The operation",
    operationCodeWithJsDoc,
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const exports = [inputSchemaName, outputSchemaName, functionName];

  return {
    fileName: `${functionName}.ts`,
    code,
    functionName,
    exports,
  };
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const specsDir = path.join(process.cwd(), "specs");
  const specPath = path.join(specsDir, "openapi.json");
  const operationsDir = path.join(process.cwd(), "src/operations");

  // Read the OpenAPI spec
  console.log("Reading OpenAPI spec...");
  const specContent = fs.readFileSync(specPath, "utf-8");
  const spec: OpenAPISpec = JSON.parse(specContent);

  // Apply patches
  console.log("Applying patches...");
  const { applied, errors } = applyAllPatches(spec, specsDir);
  for (const msg of applied) {
    console.log(`  ✓ ${msg}`);
  }
  if (errors.length > 0) {
    console.log("\nPatch errors:");
    for (const msg of errors) {
      console.log(`  ✗ ${msg}`);
    }
    process.exit(1);
  }
  console.log("");

  // Create operations directory if it doesn't exist
  if (!fs.existsSync(operationsDir)) {
    fs.mkdirSync(operationsDir, { recursive: true });
  }

  // Collect all operations
  const operations: GeneratedOperation[] = [];

  for (const [pathTemplate, pathItem] of Object.entries(spec.paths)) {
    for (const method of ["get", "post", "put", "patch", "delete"] as const) {
      const operation = pathItem[method];
      if (!operation) continue;

      console.log(
        `Generating ${method.toUpperCase()} ${pathTemplate} (${operation.operationId})...`,
      );

      try {
        const generated = generateOperation(
          spec,
          pathTemplate,
          method,
          operation,
        );
        operations.push(generated);
      } catch (error) {
        console.error(`Error generating ${operation.operationId}:`, error);
      }
    }
  }

  // Write all operation files
  for (const op of operations) {
    const filePath = path.join(operationsDir, op.fileName);
    fs.writeFileSync(filePath, op.code);
    console.log(`Written: ${op.fileName}`);
  }

  // Write operations barrel file (src/operations/index.ts)
  console.log("\nWriting operations barrel file...");
  const operationsBarrelPath = path.join(operationsDir, "index.ts");
  const operationsBarrelContent =
    operations.map((op) => `export * from "./${op.functionName}";`).join("\n") +
    "\n";
  fs.writeFileSync(operationsBarrelPath, operationsBarrelContent);
  console.log(`Written: src/operations/index.ts`);

  console.log(`\nGenerated ${operations.length} operations.`);

  // Format generated files
  console.log("Formatting generated files...");
  execSync("bun format", { stdio: "inherit" });

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
