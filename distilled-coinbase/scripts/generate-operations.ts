import * as fs from "fs";
import * as path from "path";
import { applyAllPatches } from "./apply-patches";

// ============================================================================
// Types for OpenAPI 3.1 Spec
// ============================================================================

interface OpenAPISpec {
  openapi: string;
  info: { title: string; version: string };
  servers?: Array<{ url: string; description?: string }>;
  paths: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, SchemaObject>;
    parameters?: Record<string, ParameterObject>;
    responses?: Record<string, ResponseObject>;
    requestBodies?: Record<string, RequestBodyObject>;
    securitySchemes?: Record<string, unknown>;
  };
}

interface PathItem {
  get?: Operation;
  post?: Operation;
  put?: Operation;
  patch?: Operation;
  delete?: Operation;
  parameters?: Array<ParameterObject | RefObject>;
}

interface Operation {
  operationId: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: Array<ParameterObject | RefObject>;
  requestBody?: RequestBodyObject | RefObject;
  responses: Record<string, ResponseObject | RefObject>;
  security?: Array<Record<string, string[]>>;
}

interface ParameterObject {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  description?: string;
  required?: boolean;
  schema?: SchemaObject;
  example?: unknown;
}

interface RequestBodyObject {
  description?: string;
  content?: Record<string, MediaTypeObject>;
  required?: boolean;
}

interface MediaTypeObject {
  schema?: SchemaObject | RefObject;
}

interface ResponseObject {
  description?: string;
  content?: Record<string, MediaTypeObject>;
}

interface RefObject {
  $ref: string;
}

interface SchemaObject {
  type?: string | string[];
  $ref?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  required?: string[];
  enum?: (string | number | boolean)[];
  additionalProperties?: boolean | SchemaObject;
  description?: string;
  default?: unknown;
  nullable?: boolean;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  format?: string;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  example?: unknown;
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
  return s.replace(/[-_]([a-z])/g, (_, c) => c.toUpperCase());
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

function isRef(obj: unknown): obj is RefObject {
  return typeof obj === "object" && obj !== null && "$ref" in obj;
}

function resolveRef<T>(spec: OpenAPISpec, ref: string): T {
  // Handle refs like #/components/schemas/Foo, #/components/parameters/Foo, etc.
  const parts = ref.replace("#/", "").split("/");
  let current: unknown = spec;
  for (const part of parts) {
    if (current === null || typeof current !== "object") {
      throw new Error(`Could not resolve ref: ${ref}`);
    }
    current = (current as Record<string, unknown>)[part];
  }
  if (current === undefined) {
    throw new Error(`Could not resolve ref: ${ref}`);
  }
  return current as T;
}

function resolveSchema(spec: OpenAPISpec, schema: SchemaObject): SchemaObject {
  if (schema.$ref) {
    return resolveRef<SchemaObject>(spec, schema.$ref);
  }
  return schema;
}

function resolveParameter(
  spec: OpenAPISpec,
  param: ParameterObject | RefObject,
): ParameterObject {
  if (isRef(param)) {
    return resolveRef<ParameterObject>(spec, param.$ref);
  }
  return param;
}

function resolveResponse(
  spec: OpenAPISpec,
  response: ResponseObject | RefObject,
): ResponseObject {
  if (isRef(response)) {
    return resolveRef<ResponseObject>(spec, response.$ref);
  }
  return response;
}

function resolveRequestBody(
  spec: OpenAPISpec,
  body: RequestBodyObject | RefObject,
): RequestBodyObject {
  if (isRef(body)) {
    return resolveRef<RequestBodyObject>(spec, body.$ref);
  }
  return body;
}

// ============================================================================
// OpenAPI 3.1 Type Handling
// ============================================================================

/**
 * In OAS 3.1, nullable types use type arrays: ["string", "null"]
 * This function normalizes the type field.
 */
function getSchemaType(schema: SchemaObject): {
  type: string | undefined;
  nullable: boolean;
} {
  if (Array.isArray(schema.type)) {
    const types = schema.type.filter((t) => t !== "null");
    const nullable = schema.type.includes("null");
    return { type: types[0], nullable };
  }
  return {
    type: schema.type as string | undefined,
    nullable: schema.nullable ?? schema["x-nullable"] ?? false,
  };
}

// ============================================================================
// Effect Schema Generation
// ============================================================================

interface SchemaGenerationContext {
  usesSensitiveString: boolean;
  usesSensitiveNullableString: boolean;
}

const MAX_SCHEMA_DEPTH = 15;

function openApiTypeToEffectSchema(
  prop: SchemaObject,
  spec: OpenAPISpec,
  indent: string = "",
  seenRefs: Set<string> = new Set(),
  ctx?: SchemaGenerationContext,
  depth: number = 0,
): string {
  // Bail out if we're too deep
  if (depth > MAX_SCHEMA_DEPTH) {
    return "Schema.Unknown";
  }

  // Handle $ref
  if (prop.$ref) {
    if (seenRefs.has(prop.$ref)) {
      return "Schema.Unknown"; // Prevent infinite recursion
    }
    const resolved = resolveRef<SchemaObject>(spec, prop.$ref);
    return openApiTypeToEffectSchema(
      resolved,
      spec,
      indent,
      new Set([...seenRefs, prop.$ref]),
      ctx,
      depth + 1,
    );
  }

  // Handle allOf (merge all schemas)
  if (prop.allOf && prop.allOf.length > 0) {
    const merged = mergeAllOf(prop.allOf, spec, seenRefs);
    return openApiTypeToEffectSchema(merged, spec, indent, seenRefs, ctx, depth + 1);
  }

  // Handle oneOf / anyOf as Schema.Union
  if (prop.oneOf && prop.oneOf.length > 0) {
    const variants = prop.oneOf.map((v) =>
      openApiTypeToEffectSchema(v, spec, indent, seenRefs, ctx, depth + 1),
    );
    if (variants.length === 1) return variants[0]!;
    return `Schema.Union(${variants.join(", ")})`;
  }
  if (prop.anyOf && prop.anyOf.length > 0) {
    const variants = prop.anyOf.map((v) =>
      openApiTypeToEffectSchema(v, spec, indent, seenRefs, ctx, depth + 1),
    );
    if (variants.length === 1) return variants[0]!;
    return `Schema.Union(${variants.join(", ")})`;
  }

  // Handle enum
  if (prop.enum && prop.enum.length > 0) {
    const literals = prop.enum
      .map((v) => (typeof v === "string" ? `"${v}"` : String(v)))
      .join(", ");
    const baseSchema = `Schema.Literal(${literals})`;
    const { nullable } = getSchemaType(prop);
    return nullable ? `Schema.NullOr(${baseSchema})` : baseSchema;
  }

  const { type, nullable } = getSchemaType(prop);

  // Handle sensitive fields
  if (prop["x-sensitive"] && type === "string") {
    if (ctx) {
      if (nullable) {
        ctx.usesSensitiveNullableString = true;
      } else {
        ctx.usesSensitiveString = true;
      }
    }
    return nullable ? "SensitiveNullableString" : "SensitiveString";
  }

  let baseSchema: string;
  switch (type) {
    case "string":
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
          resolveSchema(spec, prop.items),
          spec,
          indent,
          seenRefs,
          ctx,
          depth + 1,
        );
        baseSchema = `Schema.Array(${itemSchema})`;
      } else {
        baseSchema = "Schema.Array(Schema.Unknown)";
      }
      break;
    case "object":
      if (prop.properties) {
        baseSchema = generateStructSchema(prop, spec, indent, seenRefs, ctx, depth);
      } else if (
        prop.additionalProperties &&
        typeof prop.additionalProperties === "object"
      ) {
        const valueSchema = openApiTypeToEffectSchema(
          prop.additionalProperties,
          spec,
          indent,
          seenRefs,
          ctx,
          depth + 1,
        );
        baseSchema = `Schema.Record({ key: Schema.String, value: ${valueSchema} })`;
      } else {
        baseSchema = "Schema.Unknown";
      }
      break;
    default:
      if (prop.properties) {
        baseSchema = generateStructSchema(prop, spec, indent, seenRefs, ctx, depth);
      } else {
        baseSchema = "Schema.Unknown";
      }
      break;
  }

  return nullable ? `Schema.NullOr(${baseSchema})` : baseSchema;
}

function mergeAllOf(
  schemas: SchemaObject[],
  spec: OpenAPISpec,
  seenRefs: Set<string>,
): SchemaObject {
  const merged: SchemaObject = {
    type: "object",
    properties: {},
    required: [],
  };

  for (let schema of schemas) {
    schema = resolveSchema(spec, schema);

    if (schema.properties) {
      Object.assign(merged.properties!, schema.properties);
    }
    if (schema.required) {
      merged.required!.push(...schema.required);
    }
    // Inherit type if set
    if (schema.type && !Array.isArray(schema.type)) {
      merged.type = schema.type;
    }
  }

  // Deduplicate required
  merged.required = [...new Set(merged.required)];

  return merged;
}

function generateStructSchema(
  schema: SchemaObject,
  spec: OpenAPISpec,
  indent: string = "",
  seenRefs: Set<string> = new Set(),
  ctx?: SchemaGenerationContext,
  depth: number = 0,
): string {
  if (!schema.properties) return "Schema.Unknown";

  const required = new Set(schema.required || []);
  const lines: string[] = [];

  for (const [key, value] of Object.entries(schema.properties)) {
    const resolvedValue = resolveSchema(spec, value);
    const fieldSchema = openApiTypeToEffectSchema(
      resolvedValue,
      spec,
      indent + "  ",
      seenRefs,
      ctx,
      depth + 1,
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
// Error Extraction from OpenAPI Responses
// ============================================================================

/**
 * Map from Coinbase API `errorType` strings to the TypeScript error class name
 * in `src/errors.ts`. Must be kept in sync with ERROR_CODE_MAP.
 */
const ERROR_TYPE_TO_CLASS: Record<string, string> = {
  unauthorized: "Unauthorized",
  forbidden: "Forbidden",
  not_found: "NotFound",
  already_exists: "AlreadyExists",
  invalid_request: "InvalidRequest",
  invalid_signature: "InvalidSignature",
  malformed_transaction: "MalformedTransaction",
  invalid_sql_query: "InvalidSqlQuery",
  idempotency_error: "IdempotencyError",
  payment_method_required: "PaymentMethodRequired",
  rate_limit_exceeded: "RateLimitExceeded",
  faucet_limit_exceeded: "FaucetLimitExceeded",
  account_limit_exceeded: "AccountLimitExceeded",
  internal_server_error: "InternalServerError",
  bad_gateway: "BadGateway",
  service_unavailable: "ServiceUnavailable",
  timed_out: "TimedOut",
  request_canceled: "RequestCanceled",
  policy_violation: "PolicyViolation",
  policy_in_use: "PolicyInUse",
  network_not_tradable: "NetworkNotTradable",
  guest_permission_denied: "GuestPermissionDenied",
  guest_region_forbidden: "GuestRegionForbidden",
  guest_transaction_limit: "GuestTransactionLimit",
  guest_transaction_count: "GuestTransactionCount",
  phone_number_verification_expired: "PhoneNumberVerificationExpired",
  document_verification_failed: "DocumentVerificationFailed",
  recipient_allowlist_violation: "RecipientAllowlistViolation",
  recipient_allowlist_pending: "RecipientAllowlistPending",
  travel_rules_recipient_violation: "TravelRulesRecipientViolation",
  transfer_amount_out_of_bounds: "TransferAmountOutOfBounds",
  transfer_recipient_address_invalid: "TransferRecipientAddressInvalid",
  transfer_quote_expired: "TransferQuoteExpired",
  mfa_already_enrolled: "MfaAlreadyEnrolled",
  mfa_invalid_code: "MfaInvalidCode",
  mfa_flow_expired: "MfaFlowExpired",
  mfa_required: "MfaRequired",
  mfa_not_enrolled: "MfaNotEnrolled",
};

/**
 * Fallback: map HTTP status codes to errorType strings when no example is available.
 */
const STATUS_TO_ERROR_TYPE: Record<string, string> = {
  "400": "invalid_request",
  "401": "unauthorized",
  "402": "payment_method_required",
  "403": "forbidden",
  "404": "not_found",
  "409": "already_exists",
  "422": "idempotency_error",
  "429": "rate_limit_exceeded",
  "500": "internal_server_error",
  "502": "bad_gateway",
  "503": "service_unavailable",
};

/**
 * Default error types that are included for ALL operations automatically.
 * These should NOT appear in the per-operation `errors` tuple.
 */
const DEFAULT_ERROR_TYPES = new Set([
  "unauthorized",
  "rate_limit_exceeded",
  "internal_server_error",
  "bad_gateway",
  "service_unavailable",
]);

/**
 * Extract operation-specific error class names from the OpenAPI responses.
 *
 * Strategy:
 * 1. Iterate over non-2xx response codes
 * 2. For each, look at the example `errorType` values in the response
 * 3. Fall back to status code → errorType mapping when no examples exist
 * 4. Filter out default errors (they're always included)
 * 5. Return deduplicated, sorted array of TypeScript error class names
 */
function getOperationErrors(
  spec: OpenAPISpec,
  operation: Operation,
): string[] {
  const errorTypes = new Set<string>();

  for (const [statusCode, responseRef] of Object.entries(operation.responses)) {
    // Skip success responses
    if (statusCode.startsWith("2")) continue;

    const response = resolveResponse(spec, responseRef);

    // Try to extract errorType from response examples
    const jsonContent = response.content?.["application/json"];
    let foundFromExamples = false;

    if (jsonContent) {
      // Check examples (plural) - Coinbase uses this format
      const examples = (jsonContent as unknown as { examples?: Record<string, { value?: { errorType?: string } }> }).examples;
      if (examples) {
        for (const example of Object.values(examples)) {
          if (example.value?.errorType) {
            errorTypes.add(example.value.errorType);
            foundFromExamples = true;
          }
        }
      }

      // Check single example
      const example = (jsonContent as unknown as { example?: { errorType?: string } }).example;
      if (example?.errorType) {
        errorTypes.add(example.errorType);
        foundFromExamples = true;
      }
    }

    // Fall back to status code mapping if no examples found
    if (!foundFromExamples) {
      const fallback = STATUS_TO_ERROR_TYPE[statusCode];
      if (fallback) {
        errorTypes.add(fallback);
      }
    }
  }

  // Filter out default errors and map to class names
  const operationSpecificErrors: string[] = [];
  for (const errorType of errorTypes) {
    if (DEFAULT_ERROR_TYPES.has(errorType)) continue;
    const className = ERROR_TYPE_TO_CLASS[errorType];
    if (className) {
      operationSpecificErrors.push(className);
    }
  }

  // Sort for deterministic output
  return operationSpecificErrors.sort();
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
  return text.replace(/\*\//g, "*\\/").replace(/\\/g, "\\\\");
}

function formatDescription(description: string | undefined): string[] {
  if (!description) return [];

  const lines = description.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip markdown headers about authentication
    if (trimmed.startsWith("## Authentication")) break;
    if (trimmed.startsWith("### Authorization")) break;

    // Skip markdown table markers
    if (trimmed.startsWith("|") || trimmed.startsWith("| :")) continue;

    // Skip HTML-like tags
    if (trimmed.startsWith("<Tip>") || trimmed.startsWith("</Tip>")) continue;

    if (trimmed) {
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
    (p) => p.description && p.in !== "header",
  );
  if (documentedParams.length > 0) {
    lines.push(" *");
    for (const param of documentedParams) {
      const desc = escapeJsDoc(param.description || "");
      lines.push(` * @param ${param.name} - ${desc}`);
    }
  }

  lines.push(" */");

  if (lines.length === 2) return "";

  return lines.join("\n");
}

// ============================================================================
// Input/Output Schema Generation
// ============================================================================

function generateInputSchema(
  operationId: string,
  method: string,
  pathTemplate: string,
  parameters: ParameterObject[],
  requestBody: RequestBodyObject | undefined,
  spec: OpenAPISpec,
  requiresWalletAuth: boolean,
): {
  inputSchemaCode: string;
  inputSchemaName: string;
} {
  const inputSchemaName = `${toPascalCase(operationId)}Input`;
  const pathParams = parameters.filter((p) => p.in === "path");
  const queryParams = parameters.filter((p) => p.in === "query");

  const fields: string[] = [];

  // Path parameters (always required) - with T.PathParam() trait
  for (const param of pathParams) {
    const paramSchema = param.schema
      ? resolveSchema(spec, param.schema)
      : undefined;
    let baseSchema = "Schema.String";

    if (paramSchema) {
      if (paramSchema.enum) {
        baseSchema = `Schema.Literal(${paramSchema.enum.map((v) => `"${v}"`).join(", ")})`;
      } else {
        const { type } = getSchemaType(paramSchema);
        if (type === "integer" || type === "number") {
          baseSchema = "Schema.Number";
        }
      }
    }

    fields.push(`  ${param.name}: ${baseSchema}.pipe(T.PathParam()),`);
  }

  // Query parameters
  for (const param of queryParams) {
    const paramSchema = param.schema
      ? resolveSchema(spec, param.schema)
      : undefined;
    let schema = "Schema.String";

    if (paramSchema) {
      const { type } = getSchemaType(paramSchema);
      if (type === "integer" || type === "number") {
        schema = "Schema.Number";
      } else if (type === "boolean") {
        schema = "Schema.Boolean";
      } else if (paramSchema.enum) {
        schema = `Schema.Literal(${paramSchema.enum.map((v) => `"${v}"`).join(", ")})`;
      }
    }

    if (!param.required) {
      schema = `Schema.optional(${schema})`;
    }
    fields.push(`  ${param.name}: ${schema},`);
  }

  // Request body parameters
  if (requestBody?.content) {
    const jsonContent =
      requestBody.content["application/json"] ??
      requestBody.content["multipart/form-data"];
    if (jsonContent?.schema) {
      const bodySchema = resolveSchema(
        spec,
        jsonContent.schema as SchemaObject,
      );
      if (bodySchema.properties) {
        const required = new Set(bodySchema.required || []);
        for (const [key, value] of Object.entries(bodySchema.properties)) {
          const resolvedValue = resolveSchema(spec, value);
          let fieldSchema = openApiTypeToEffectSchema(resolvedValue, spec, "  ");
          if (!required.has(key)) {
            fieldSchema = `Schema.optional(${fieldSchema})`;
          }
          fields.push(`  ${key}: ${fieldSchema},`);
        }
      }
    }
  }

  // Build the schema
  const httpPath = pathTemplate;
  let pipeAnnotations = `T.Http({ method: "${method.toUpperCase()}", path: "${httpPath}" })`;
  if (requiresWalletAuth) {
    pipeAnnotations += `, T.WalletAuth()`;
  }

  const inputSchemaCode = `export const ${inputSchemaName} = Schema.Struct({
${fields.join("\n")}
}).pipe(${pipeAnnotations});
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
  if (
    !Array.isArray(responseSchema.type) &&
    responseSchema.type === "array" &&
    responseSchema.items
  ) {
    const itemSchema = openApiTypeToEffectSchema(
      resolveSchema(spec, responseSchema.items),
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

function getResponseSchema(
  spec: OpenAPISpec,
  operation: Operation,
): SchemaObject | null {
  // Look for 200, 201, 202, 204 responses in order
  for (const code of ["200", "201", "202"]) {
    const response = operation.responses[code];
    if (!response) continue;

    const resolved = resolveResponse(spec, response);
    if (!resolved.content) continue;

    const jsonContent = resolved.content["application/json"];
    if (!jsonContent?.schema) continue;

    return resolveSchema(spec, jsonContent.schema as SchemaObject);
  }

  // Check for 204 (no content)
  if (operation.responses["204"]) {
    return null;
  }

  return null;
}

/**
 * Check if an operation requires wallet auth by looking at security requirements
 * or X-Wallet-Auth parameter.
 */
function operationRequiresWalletAuth(
  operation: Operation,
  spec: OpenAPISpec,
): boolean {
  if (!operation.parameters) return false;
  for (const param of operation.parameters) {
    const resolved = resolveParameter(spec, param);
    if (resolved.name === "X-Wallet-Auth") {
      return true;
    }
  }
  return false;
}

function generateOperation(
  spec: OpenAPISpec,
  pathTemplate: string,
  method: string,
  operation: Operation,
): GeneratedOperation {
  const operationId = operation.operationId;
  const functionName = operationIdToFunctionName(operationId);

  // Resolve all parameters (including path-level params)
  const allParams: ParameterObject[] = [];
  if (operation.parameters) {
    for (const param of operation.parameters) {
      const resolved = resolveParameter(spec, param);
      // Skip header params like X-Wallet-Auth, X-Idempotency-Key (handled by client)
      if (resolved.in === "header") continue;
      allParams.push(resolved);
    }
  }

  const requiresWalletAuth = operationRequiresWalletAuth(operation, spec);

  // Resolve request body
  let requestBody: RequestBodyObject | undefined;
  if (operation.requestBody) {
    requestBody = resolveRequestBody(spec, operation.requestBody);
  }

  // Generate JSDoc
  const jsDoc = generateJsDoc(
    operation.summary,
    operation.description,
    allParams,
  );

  // Generate input schema
  const { inputSchemaCode, inputSchemaName } = generateInputSchema(
    operationId,
    method,
    pathTemplate,
    allParams,
    requestBody,
    spec,
    requiresWalletAuth,
  );

  // Get success response schema
  const responseSchema = getResponseSchema(spec, operation);

  // Generate output schema
  const { outputSchemaCode, outputSchemaName, sensitiveImports } =
    generateOutputSchema(operationId, responseSchema, spec);

  // Extract operation-specific errors
  const errorClassNames = getOperationErrors(spec, operation);

  // Generate the operation function
  const walletAuthOption = requiresWalletAuth ? "\n  walletAuth: true," : "";
  const errorsOption = errorClassNames.length > 0
    ? `\n  errors: [${errorClassNames.join(", ")}],`
    : "";
  const operationCodeWithJsDoc = jsDoc
    ? `${jsDoc}
export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsOption}${walletAuthOption}
}));`
    : `export const ${functionName} = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ${inputSchemaName},
  outputSchema: ${outputSchemaName},${errorsOption}${walletAuthOption}
}));`;

  // Build imports
  let imports = `import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";`;

  // Add error imports if needed
  if (errorClassNames.length > 0) {
    imports += `\nimport { ${errorClassNames.join(", ")} } from "../errors";`;
  }

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
  const specDir = path.join(process.cwd(), "spec");
  const specPath = path.join(specDir, "openapi.json");
  const operationsDir = path.join(process.cwd(), "src/operations");

  // Read the OpenAPI spec
  console.log("Reading OpenAPI spec...");
  let specContent = fs.readFileSync(specPath, "utf-8");
  // Strip BOM if present
  if (specContent.charCodeAt(0) === 0xfeff) {
    specContent = specContent.slice(1);
  }
  const spec: OpenAPISpec = JSON.parse(specContent);

  // Apply patches
  console.log("Applying patches...");
  const { applied, errors } = applyAllPatches(spec, specDir);
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

      if (!operation.operationId) {
        console.warn(
          `Skipping ${method.toUpperCase()} ${pathTemplate} - no operationId`,
        );
        continue;
      }

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
  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
