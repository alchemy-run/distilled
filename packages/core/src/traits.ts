/**
 * Annotation-based traits for declarative operation definitions.
 *
 * This module provides a type-safe annotation system for defining HTTP operations
 * using Schema annotations. Traits can be applied via `.pipe()` or composed with `all()`.
 *
 * The annotation system is shared across all SDKs. Individual SDKs can extend it
 * with provider-specific traits (e.g., AWS Smithy traits, Cloudflare-specific traits).
 *
 * @example
 * ```ts
 * import * as T from "@distilled.cloud/core/traits";
 *
 * const GetDatabaseInput = Schema.Struct({
 *   organization: Schema.String.pipe(T.PathParam()),
 *   database: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/organizations/{organization}/databases/{database}" })
 * );
 * ```
 */
import * as Schema from "effect/Schema";
import * as AST from "effect/SchemaAST";

// ============================================================================
// Annotation Primitives
// ============================================================================

/**
 * Internal symbol for annotation metadata storage.
 */
const annotationMetaSymbol = Symbol.for("@distilled.cloud/annotation-meta");

/**
 * Any type that has an .annotate() method returning itself.
 * This includes Schema.Schema and Schema.PropertySignature.
 */
type Annotatable = {
  annotate(annotations: unknown): Annotatable;
};

/**
 * An Annotation is a callable that can be used with .pipe() AND
 * has symbol properties so it works directly with Schema.Struct/Class.
 *
 * The index signatures allow TypeScript to accept this as a valid annotations object.
 */
export interface Annotation {
  <A extends Annotatable>(schema: A): A;
  readonly [annotationMetaSymbol]: Array<{ symbol: symbol; value: unknown }>;
  // Index signatures for compatibility with Schema.Annotations
  readonly [key: symbol]: unknown;
  readonly [key: string]: unknown;
}

/**
 * Create an annotation builder for a given symbol and value.
 * This is the core primitive used to build all trait annotations.
 */
export function makeAnnotation<T>(sym: symbol, value: T): Annotation {
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({ [sym]: value }) as A;

  (fn as any)[annotationMetaSymbol] = [{ symbol: sym, value }];
  (fn as any)[sym] = value;

  return fn as Annotation;
}

/**
 * Combine multiple annotations into one.
 * Use when you need multiple annotations on the same schema.
 *
 * @example
 * ```ts
 * const MyInput = Schema.Struct({
 *   id: Schema.String.pipe(T.all(T.PathParam(), T.Required())),
 * });
 * ```
 */
export function all(...annotations: Annotation[]): Annotation {
  const entries: Array<{ symbol: symbol; value: unknown }> = [];
  const raw: Record<symbol, unknown> = {};

  for (const a of annotations) {
    for (const entry of a[annotationMetaSymbol]) {
      entries.push(entry);
      raw[entry.symbol] = entry.value;
    }
  }

  const fn = <A extends Annotatable>(schema: A): A => schema.annotate(raw) as A;

  (fn as any)[annotationMetaSymbol] = entries;

  for (const { symbol, value } of entries) {
    (fn as any)[symbol] = value;
  }

  return fn as Annotation;
}

// =============================================================================
// HTTP Operation Traits
// =============================================================================

/** Symbol for HTTP operation metadata (method + path template) */
export const httpSymbol = Symbol.for("@distilled.cloud/http");

/** HTTP method type */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

/** HTTP trait configuration */
export interface HttpTrait {
  /** HTTP method */
  method: HttpMethod;
  /** Path template with {param} placeholders */
  path: string;
  /** Content type override (e.g., "multipart") */
  contentType?: string;
  /** Whether the request has a body (used by GCP generator) */
  hasBody?: boolean;
}

/**
 * Http trait - defines the HTTP method and path template for an operation.
 * Path parameters are specified using {paramName} syntax.
 *
 * @example
 * ```ts
 * const GetDatabaseInput = Schema.Struct({
 *   organization: Schema.String.pipe(T.PathParam()),
 *   database: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/organizations/{organization}/databases/{database}" })
 * );
 * ```
 */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);

// =============================================================================
// Path Parameter Traits
// =============================================================================

/** Symbol for path parameter annotation */
export const pathParamSymbol = Symbol.for("@distilled.cloud/path-param");

/**
 * PathParam trait - marks a field as a path parameter.
 * The field name is used as the placeholder name in the path template.
 *
 * @example
 * ```ts
 * const Input = Schema.Struct({
 *   organization: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/organizations/{organization}" })
 * );
 * ```
 */
export const PathParam = () => makeAnnotation(pathParamSymbol, true);

// =============================================================================
// Query Parameter Traits
// =============================================================================

/** Symbol for query parameter annotation */
export const queryParamSymbol = Symbol.for("@distilled.cloud/query-param");

/**
 * QueryParam trait - marks a field as a query parameter.
 * Optionally specify a different wire name.
 *
 * @example
 * ```ts
 * const Input = Schema.Struct({
 *   perPage: Schema.optional(Schema.Number).pipe(T.QueryParam("per_page")),
 * });
 * ```
 */
export const QueryParam = (name?: string) =>
  makeAnnotation(queryParamSymbol, name ?? true);

// =============================================================================
// Header Parameter Traits
// =============================================================================

/** Symbol for header parameter annotation */
export const headerParamSymbol = Symbol.for("@distilled.cloud/header-param");

/**
 * HeaderParam trait - marks a field as a header parameter.
 * Specify the header name.
 *
 * @example
 * ```ts
 * const Input = Schema.Struct({
 *   apiToken: Schema.String.pipe(T.HeaderParam("X-API-Token")),
 * });
 * ```
 */
export const HeaderParam = (name: string) =>
  makeAnnotation(headerParamSymbol, name);

// =============================================================================
// Convenience Aliases (used by Cloudflare/GCP generators)
// =============================================================================

/**
 * HttpPath - alias for PathParam that also carries the wire name.
 * Used in generated code: `Schema.String.pipe(T.HttpPath("account_id"))`
 */
export const HttpPath = (name: string) => makeAnnotation(pathParamSymbol, name);

/**
 * HttpQuery - alias for QueryParam with an explicit wire name.
 * Used in generated code: `Schema.optional(Schema.String).pipe(T.HttpQuery("per_page"))`
 */
export const HttpQuery = (name: string) =>
  makeAnnotation(queryParamSymbol, name);

/**
 * HttpHeader - alias for HeaderParam.
 * Used in generated code: `Schema.String.pipe(T.HttpHeader("X-Custom-Header"))`
 */
export const HttpHeader = (name: string) =>
  makeAnnotation(headerParamSymbol, name);

/** Symbol for HTTP body annotation */
export const httpBodySymbol = Symbol.for("@distilled.cloud/http-body");

/**
 * HttpBody - marks a field as the raw HTTP body.
 * Used for operations where a field IS the entire request body
 * (not a named field within a JSON body).
 */
export const HttpBody = () => makeAnnotation(httpBodySymbol, true);

/** Symbol for form data file annotation */
export const httpFormDataFileSymbol = Symbol.for(
  "@distilled.cloud/http-form-data-file",
);

/**
 * HttpFormDataFile - marks a field as a file upload in multipart form data.
 */
export const HttpFormDataFile = () =>
  makeAnnotation(httpFormDataFileSymbol, true);

// =============================================================================
// API Error Code Trait
// =============================================================================

/** Symbol for API error code mapping */
export const apiErrorCodeSymbol = Symbol.for("@distilled.cloud/api-error-code");

/**
 * ApiErrorCode trait - maps an error class to an API error code.
 * Used to match API error responses to typed error classes.
 *
 * @example
 * ```ts
 * class NotFoundError extends Schema.TaggedErrorClass<NotFoundError>()(
 *   "NotFoundError",
 *   { message: Schema.String },
 * ).pipe(T.ApiErrorCode("not_found")) {}
 * ```
 */
export const ApiErrorCode = (code: string) =>
  makeAnnotation(apiErrorCodeSymbol, code);

// =============================================================================
// Service Metadata Trait
// =============================================================================

/** Symbol for service metadata */
export const serviceSymbol = Symbol.for("@distilled.cloud/service");

/** Service metadata */
export interface ServiceTrait {
  name: string;
  version?: string;
  baseUrl?: string;
  /** GCP-specific: Root URL for the service */
  rootUrl?: string;
  /** GCP-specific: Service path appended to root URL */
  servicePath?: string;
  /** Allow additional properties for provider-specific metadata */
  [key: string]: unknown;
}

/**
 * Service trait - attaches service metadata to a schema.
 */
export const Service = (trait: ServiceTrait) =>
  makeAnnotation(serviceSymbol, trait);

// =============================================================================
// Annotation Retrieval Helpers
// =============================================================================

/**
 * Get annotation value from an AST node, following encoding chain if needed.
 */
export const getAnnotation = <T>(
  ast: AST.AST,
  symbol: symbol,
): T | undefined => {
  // Direct annotation
  const annotations = ast.annotations as Record<symbol, unknown> | undefined;
  const direct = annotations?.[symbol] as T | undefined;
  if (direct !== undefined) return direct;

  // Follow encoding chain (replaces v3 Transformation handling)
  if (ast.encoding && ast.encoding.length > 0) {
    return getAnnotation<T>(ast.encoding[0].to, symbol);
  }

  return undefined;
};

/**
 * Get HTTP trait from a schema's AST.
 */
export const getHttpTrait = (ast: AST.AST): HttpTrait | undefined =>
  getAnnotation<HttpTrait>(ast, httpSymbol);

/**
 * Check if a PropertySignature has the pathParam annotation.
 * Works for both PathParam() (annotation value = true) and HttpPath("wire_name") (annotation value = string).
 */
export const isPathParam = (prop: AST.PropertySignature): boolean => {
  const value = getAnnotation<string | boolean>(prop.type, pathParamSymbol);
  return value !== undefined;
};

/**
 * Get query param name from a PropertySignature (returns true if unnamed, string if named).
 */
export const getQueryParam = (
  prop: AST.PropertySignature,
): string | boolean | undefined => {
  return getAnnotation<string | boolean>(prop.type, queryParamSymbol);
};

/**
 * Get header param name from a PropertySignature.
 */
export const getHeaderParam = (
  prop: AST.PropertySignature,
): string | undefined => {
  return getAnnotation<string>(prop.type, headerParamSymbol);
};

/**
 * Get API error code from an error class AST.
 */
export const getApiErrorCode = (ast: AST.AST): string | undefined =>
  getAnnotation<string>(ast, apiErrorCodeSymbol);

/**
 * Get service metadata from a schema's AST.
 */
export const getServiceTrait = (ast: AST.AST): ServiceTrait | undefined =>
  getAnnotation<ServiceTrait>(ast, serviceSymbol);

/**
 * Extract path parameters from a schema's struct properties.
 * Returns an array of field names that have the PathParam annotation.
 */
export const getPathParams = (ast: AST.AST): string[] => {
  // Handle Objects (struct) - v4 renamed from TypeLiteral
  if (ast._tag === "Objects") {
    return ast.propertySignatures
      .filter((prop) => isPathParam(prop))
      .map((prop) => String(prop.name));
  }

  // Follow encoding chain (replaces v3 Transformation handling)
  if (ast.encoding && ast.encoding.length > 0) {
    return getPathParams(ast.encoding[0].to);
  }

  return [];
};

/**
 * Build the request path by substituting path parameters into the template.
 * Simple version that assumes input keys match template placeholders.
 * For schema-aware path building (with camelCase → wire_name mapping), use buildPathFromSchema.
 */
export const buildPath = (
  template: string,
  input: Record<string, unknown>,
): string => {
  return template.replace(/\{(\w+)\}/g, (_, name) => {
    const value = input[name];
    if (value === undefined || value === null) {
      throw new Error(`Missing path parameter: ${name}`);
    }
    return encodeURIComponent(String(value));
  });
};

/**
 * Extract AST property signatures from a schema AST, following encoding chain and suspends.
 */
export const getStructProps = (ast: AST.AST): AST.PropertySignature[] => {
  if (ast.encoding && ast.encoding.length > 0) {
    return getStructProps(ast.encoding[0].to);
  }
  if (ast._tag === "Suspend") {
    return getStructProps(ast.thunk());
  }
  if (ast._tag === "Objects") {
    return [...ast.propertySignatures];
  }
  return [];
};

/**
 * Get the path parameter wire name from a PropertySignature.
 * - For HttpPath("wire_name"), returns the wire name string.
 * - For PathParam(), returns the property name (since annotation is `true`).
 * - Returns undefined if not a path param.
 */
export const getPathParamWireName = (
  prop: AST.PropertySignature,
): string | undefined => {
  const value = getAnnotation<string | boolean>(prop.type, pathParamSymbol);
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  // PathParam() stores `true` — use property name as wire name
  return String(prop.name);
};

/**
 * Result of categorizing a schema's input properties by their HTTP binding.
 */
export interface RequestParts {
  /** Resolved path with all parameters substituted */
  path: string;
  /** Query parameters: wire_name → string value */
  query: Record<string, string | string[]>;
  /** Header parameters: header-name → string value */
  headers: Record<string, string>;
  /** Body: remaining non-path/query/header properties, with wire-name keys where applicable */
  body: Record<string, unknown> | undefined;
  /** Whether the body should use multipart/form-data */
  isMultipart: boolean;
}

/**
 * Schema-aware request builder. Categorizes input properties into path, query, header,
 * and body parts using annotations on the schema AST.
 *
 * Handles camelCase → wire_name mapping for path params (HttpPath), query params (HttpQuery),
 * and header params (HttpHeader).
 *
 * When `inputSchema` is provided, uses `Schema.encodeSync` to encode the input through the
 * schema's encoding pipeline (e.g., `encodeKeys` for camelCase → snake_case mapping).
 * The encoded output is used for body construction, ensuring wire-format key names.
 */
export const buildRequestParts = (
  ast: AST.AST,
  httpTrait: HttpTrait,
  input: Record<string, unknown>,
  // biome-ignore lint: using any for generic schema parameter
  inputSchema?: any,
): RequestParts => {
  let path = httpTrait.path;
  const query: Record<string, string | string[]> = {};
  const headers: Record<string, string> = {};
  let rawBody: unknown = undefined;
  let hasRawBody = false;
  const isMultipart = httpTrait.contentType === "multipart";

  // Track which TS property names are path/query/header params (not body)
  const nonBodyKeys = new Set<string>();

  const props = getStructProps(ast);

  for (const prop of props) {
    const tsName = String(prop.name);
    const value = input[tsName];

    if (value === undefined || value === null) {
      continue;
    }

    // Path parameter
    const pathWireName = getPathParamWireName(prop);
    if (pathWireName !== undefined) {
      nonBodyKeys.add(tsName);
      path = path.replace(
        `{${pathWireName}}`,
        encodeURIComponent(String(value)),
      );
      continue;
    }

    // Query parameter
    const queryParam = getQueryParam(prop);
    if (queryParam !== undefined) {
      nonBodyKeys.add(tsName);
      const wireName = typeof queryParam === "string" ? queryParam : tsName;
      if (Array.isArray(value)) {
        query[wireName] = value.map(String);
      } else {
        query[wireName] = String(value);
      }
      continue;
    }

    // Header parameter
    const headerParam = getHeaderParam(prop);
    if (headerParam !== undefined) {
      nonBodyKeys.add(tsName);
      headers[headerParam] = String(value);
      continue;
    }

    // Body field (HttpBody annotation means this IS the entire body)
    const isBodyField = getAnnotation<boolean>(prop.type, httpBodySymbol);
    if (isBodyField) {
      rawBody = value;
      hasRawBody = true;
      nonBodyKeys.add(tsName);
      continue;
    }
  }

  // Build body from remaining (non-path/query/header) properties
  let finalBody: Record<string, unknown> | undefined;

  if (hasRawBody) {
    // For HttpBody fields, encode through the schema to get wire-format keys
    // (e.g., camelCase → snake_case via encodeKeys on nested schemas)
    if (inputSchema) {
      const encoded = Schema.encodeSync(inputSchema)(input);
      const encodedRecord = encoded as Record<string, unknown>;
      // Find the body field name in the encoded output
      for (const prop of props) {
        const tsName = String(prop.name);
        const isBody = getAnnotation<boolean>(prop.type, httpBodySymbol);
        if (isBody && encodedRecord[tsName] !== undefined) {
          finalBody = encodedRecord[tsName] as Record<string, unknown>;
          break;
        }
      }
      // Fallback to raw body if encoding didn't produce it
      if (finalBody === undefined) {
        finalBody = rawBody as Record<string, unknown> | undefined;
      }
    } else {
      finalBody = rawBody as Record<string, unknown> | undefined;
    }
  } else {
    // Encode the input through the schema to get wire-format keys
    // This handles encodeKeys (camelCase → snake_case) and any other encoding transforms
    if (inputSchema) {
      const encoded = Schema.encodeSync(inputSchema)(input);
      const encodedRecord = encoded as Record<string, unknown>;

      // Build a mapping from tsName → encoded key name
      // by encoding a minimal test object to discover key mappings
      const bodyFromEncoded: Record<string, unknown> = {};
      let hasBodyFields = false;

      for (const [key, value] of Object.entries(encodedRecord)) {
        // Check if this encoded key corresponds to a non-body TS property
        // by seeing if any non-body prop encodes to this key
        let isNonBody = false;
        for (const nbKey of nonBodyKeys) {
          // Simple heuristic: if the encoded key matches the non-body key or its encoding
          if (key === nbKey) {
            isNonBody = true;
            break;
          }
        }
        if (!isNonBody && value !== undefined) {
          bodyFromEncoded[key] = value;
          hasBodyFields = true;
        }
      }

      finalBody = hasBodyFields ? bodyFromEncoded : undefined;
    } else {
      // Fallback: no schema encoding, use TS property names as-is (for backwards compat)
      const body: Record<string, unknown> = {};
      let hasBody = false;
      for (const prop of props) {
        const tsName = String(prop.name);
        if (nonBodyKeys.has(tsName)) continue;
        const value = input[tsName];
        if (value === undefined || value === null) continue;
        body[tsName] = value;
        hasBody = true;
      }
      finalBody = hasBody ? body : undefined;
    }
  }

  return {
    path,
    query,
    headers,
    body: finalBody,
    isMultipart,
  };
};

/**
 * Helper to get a value from an object using a dot-separated path.
 * Used for pagination traits and nested property access.
 */
export const getPath = (obj: unknown, path: string): unknown => {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};
