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
 * import * as T from "@distilled.cloud/sdk-core/traits";
 *
 * const GetDatabaseInput = Schema.Struct({
 *   organization: Schema.String.pipe(T.PathParam()),
 *   database: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/organizations/{organization}/databases/{database}" })
 * );
 * ```
 */
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
 */
export const isPathParam = (prop: AST.PropertySignature): boolean => {
  return getAnnotation<boolean>(prop.type, pathParamSymbol) === true;
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
