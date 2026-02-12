import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "./apply-patches";

// ============================================================================
// Types for OpenAPI 3.0 Spec
// ============================================================================

interface OpenAPISpec {
  openapi: string;
  info: { title: string; version: string };
  servers: Array<{ url: string }>;
  paths: Record<string, PathItem>;
  components: {
    schemas: Record<string, SchemaObject>;
    responses?: Record<string, ResponseObject>;
    parameters?: Record<string, ParameterObject>;
  };
}

interface PathItem {
  get?: Operation;
  post?: Operation;
  put?: Operation;
  patch?: Operation;
  delete?: Operation;
  parameters?: ParameterObject[];
}

interface Operation {
  operationId: string;
  summary: string;
  description?: string;
  tags?: string[];
  parameters?: ParameterObject[];
  requestBody?: RequestBody;
  responses: Record<string, ResponseObject>;
  deprecated?: boolean;
}

interface ParameterObject {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  required?: boolean;
  description?: string;
  schema?: SchemaObject;
  $ref?: string;
}

interface RequestBody {
  required?: boolean;
  content: Record<string, MediaType>;
}

interface ResponseObject {
  description: string;
  content?: Record<string, MediaType>;
  $ref?: string;
}

interface MediaType {
  schema?: SchemaObject;
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
  nullable?: boolean;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  format?: string;
  minimum?: number;
  maximum?: number;
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
  const refPath = ref.replace("#/components/schemas/", "");
  const schema = spec.components.schemas[refPath];
  if (!schema) {
    throw new Error(`Could not resolve ref: ${ref}`);
  }
  return schema;
}

function resolveParameterRef(spec: OpenAPISpec, ref: string): ParameterObject {
  const refPath = ref.replace("#/components/parameters/", "");
  const param = spec.components.parameters?.[refPath];
  if (!param) {
    throw new Error(`Could not resolve parameter ref: ${ref}`);
  }
  return param;
}

function resolveResponseRef(spec: OpenAPISpec, ref: string): ResponseObject {
  const refPath = ref.replace("#/components/responses/", "");
  const response = spec.components.responses?.[refPath];
  if (!response) {
    throw new Error(`Could not resolve response ref: ${ref}`);
  }
  return response;
}

function getSchemaFromResponse(
  spec: OpenAPISpec,
  response: ResponseObject | undefined,
): SchemaObject | null {
  if (!response) return null;

  // Handle $ref
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

  // Handle allOf - merge all schemas
  if (prop.allOf && prop.allOf.length > 0) {
    // Collect all properties from allOf schemas
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

  // Handle oneOf/anyOf - use Unknown for now (could be Union later)
  if (prop.oneOf || prop.anyOf) {
    return "Schema.Unknown";
  }

  // Handle enum
  if (prop.enum && prop.enum.length > 0) {
    const literals = prop.enum.map((v) => `"${v}"`).join(", ");
    const baseSchema = `Schema.Literal(${literals})`;
    return prop.nullable ? `Schema.NullOr(${baseSchema})` : baseSchema;
  }

  // Handle type
  let baseSchema: string;
  switch (prop.type) {
    case "string":
      // Check for sensitive annotation
      if (prop["x-sensitive"]) {
        if (ctx) {
          if (prop.nullable) {
            ctx.usesSensitiveNullableString = true;
          } else {
            ctx.usesSensitiveString = true;
          }
        }
        baseSchema = prop.nullable ? "SensitiveNullableString" : "SensitiveString";
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
        const itemSchema = openApiTypeToEffectSchema(prop.items, spec, indent, seenRefs, ctx);
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
          baseSchema = "Schema.Record({ key: Schema.String, value: Schema.Unknown })";
        } else {
          const valueSchema = openApiTypeToEffectSchema(
            prop.additionalProperties,
            spec,
            indent,
            seenRefs,
            ctx,
          );
          baseSchema = `Schema.Record({ key: Schema.String, value: ${valueSchema} })`;
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

  // Wrap with NullOr if nullable is true
  return prop.nullable ? `Schema.NullOr(${baseSchema})` : baseSchema;
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
    const fieldSchema = openApiTypeToEffectSchema(value, spec, indent + "  ", seenRefs, ctx);
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
  parameters: ParameterObject[],
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
  const documentedParams = parameters.filter((p) => p.description);
  if (documentedParams.length > 0) {
    lines.push(" *");
    for (const param of documentedParams) {
      const desc = escapeJsDoc(param.description || "");
      lines.push(` * @param ${param.name} - ${desc}`);
    }
  }

  lines.push(" */");

  // Don't generate empty JSDoc
  if (lines.length === 2) {
    return "";
  }

  return lines.join("\n");
}

function resolveParameters(
  spec: OpenAPISpec,
  pathParams: ParameterObject[] | undefined,
  operationParams: ParameterObject[] | undefined,
): ParameterObject[] {
  const params: ParameterObject[] = [];

  // Add path-level parameters
  if (pathParams) {
    for (const param of pathParams) {
      if (param.$ref) {
        params.push(resolveParameterRef(spec, param.$ref));
      } else {
        params.push(param);
      }
    }
  }

  // Add operation-level parameters (override path-level)
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

function generateInputSchema(
  operationId: string,
  method: string,
  pathTemplate: string,
  parameters: ParameterObject[],
  requestBody: RequestBody | undefined,
  spec: OpenAPISpec,
): {
  inputSchemaCode: string;
  inputSchemaName: string;
} {
  const inputSchemaName = `${toPascalCase(operationId)}Input`;
  const pathParams = parameters.filter((p) => p.in === "path");
  const queryParams = parameters.filter((p) => p.in === "query");

  const fields: string[] = [];
  const usedNames = new Set<string>();

  // Path parameters (always required) - with T.PathParam() trait
  for (const param of pathParams) {
    if (usedNames.has(param.name)) continue;
    usedNames.add(param.name);
    const schema = param.schema;
    const baseSchema =
      schema?.enum && schema.enum.length > 0
        ? `Schema.Literal(${schema.enum.map((v) => `"${v}"`).join(", ")})`
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
            ? `Schema.Literal(${schema.enum.map((v) => `"${v}"`).join(", ")})`
            : "Schema.String";

    if (!param.required) {
      schemaStr = `Schema.optional(${schemaStr})`;
    }
    fields.push(`  ${param.name}: ${schemaStr},`);
  }

  // Request body parameters
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
          if (usedNames.has(key)) continue; // Skip duplicate fields (query param takes precedence)
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
): { outputSchemaCode: string; outputSchemaName: string; sensitiveImports: SensitiveImports } {
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
      sensitiveImports: { usesSensitiveString: false, usesSensitiveNullableString: false },
    };
  }

  // Handle array responses
  if (responseSchema.type === "array" && responseSchema.items) {
    const itemSchema = openApiTypeToEffectSchema(responseSchema.items, spec, "", new Set(), ctx);
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
  const schemaCode = openApiTypeToEffectSchema(responseSchema, spec, "", new Set(), ctx);
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

function generateOperation(
  spec: OpenAPISpec,
  pathTemplate: string,
  method: string,
  operation: Operation,
  pathLevelParams: ParameterObject[] | undefined,
): GeneratedOperation {
  const operationId = operation.operationId;
  const functionName = operationIdToFunctionName(operationId);

  // Resolve all parameters (path-level + operation-level)
  const parameters = resolveParameters(spec, pathLevelParams, operation.parameters);

  // Generate JSDoc from OpenAPI documentation
  const jsDoc = generateJsDoc(operation.summary, operation.description, parameters);

  // Generate input schema
  const { inputSchemaCode, inputSchemaName } = generateInputSchema(
    operationId,
    method,
    pathTemplate,
    parameters,
    operation.requestBody,
    spec,
  );

  // Get success response (200, 201, or 204)
  const successResponse =
    operation.responses["200"] || operation.responses["201"] || operation.responses["204"];
  const responseSchema = getSchemaFromResponse(spec, successResponse);

  // Generate output schema
  const { outputSchemaCode, outputSchemaName, sensitiveImports } = generateOutputSchema(
    operationId,
    responseSchema,
    spec,
  );

  // Generate the operation function (errors are handled globally by the client)
  const operationCodeWithJsDoc = jsDoc
    ? `${jsDoc}
export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},
}));`
    : `export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},
}));`;

  // Combine all code
  let imports = `import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";`;

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
    const pathLevelParams = pathItem.parameters;

    for (const method of ["get", "post", "put", "patch", "delete"] as const) {
      const operation = pathItem[method];
      if (!operation) continue;

      // Skip deprecated operations
      if (operation.deprecated) {
        console.log(`Skipping deprecated ${method.toUpperCase()} ${pathTemplate}`);
        continue;
      }

      console.log(
        `Generating ${method.toUpperCase()} ${pathTemplate} (${operation.operationId})...`,
      );

      try {
        const generated = generateOperation(spec, pathTemplate, method, operation, pathLevelParams);
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
    operations.map((op) => `export * from "./${op.functionName}";`).join("\n") + "\n";
  fs.writeFileSync(operationsBarrelPath, operationsBarrelContent);
  console.log(`Written: src/operations/index.ts`);

  console.log(`\nGenerated ${operations.length} operations.`);
  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
