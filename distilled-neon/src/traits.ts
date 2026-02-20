/**
 * Annotation-based traits for declarative operation definitions.
 *
 * This module provides a type-safe annotation system for defining HTTP operations
 * using Schema annotations. Traits can be applied via `.pipe()` or composed with `all()`.
 *
 * @example
 * ```ts
 * import { Schema } from "effect";
 * import * as T from "./traits";
 *
 * const GetProjectInput = Schema.Struct({
 *   project_id: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/projects/{project_id}" })
 * );
 * ```
 */

/**
 * Internal symbol for annotation metadata storage
 */
const annotationMetaSymbol = Symbol.for("neon/annotation-meta");

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
 * Create an annotation builder for a given symbol and value
 */
function makeAnnotation<T>(sym: symbol, value: T): Annotation {
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({ [sym]: value }) as A;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn as any)[annotationMetaSymbol] = [{ symbol: sym, value }];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn as any)[sym] = value;

  return fn as Annotation;
}

/**
 * Combine multiple annotations into one.
 * Use when you need multiple annotations on the same schema:
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn as any)[annotationMetaSymbol] = entries;

  for (const { symbol, value } of entries) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fn as any)[symbol] = value;
  }

  return fn as Annotation;
}

// =============================================================================
// HTTP Operation Traits
// =============================================================================

/** Symbol for HTTP operation metadata (method + path template) */
export const httpSymbol = Symbol.for("neon/http");

/** HTTP method type */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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
 * const GetProjectInput = Schema.Struct({
 *   project_id: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/projects/{project_id}" })
 * );
 * ```
 */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);

// =============================================================================
// Path Parameter Traits
// =============================================================================

/** Symbol for path parameter annotation */
export const pathParamSymbol = Symbol.for("neon/path-param");

/**
 * PathParam trait - marks a field as a path parameter.
 * The field name is used as the placeholder name in the path template.
 *
 * @example
 * ```ts
 * const Input = Schema.Struct({
 *   project_id: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/projects/{project_id}" })
 * );
 * ```
 */
export const PathParam = () => makeAnnotation(pathParamSymbol, true);

// =============================================================================
// Query Parameter Traits
// =============================================================================

/** Symbol for query parameter annotation */
export const queryParamSymbol = Symbol.for("neon/query-param");

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
// API Error Code Trait
// =============================================================================

/** Symbol for API error code mapping */
export const apiErrorCodeSymbol = Symbol.for("neon/ApiErrorCode");

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
// Annotation Retrieval Helpers
// =============================================================================

import * as AST from "effect/SchemaAST";

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
  // Check on the property type (v4 - annotations are on the type AST)
  return getAnnotation<boolean>(prop.type, pathParamSymbol) === true;
};

/**
 * Get query param name from a PropertySignature (returns true if unnamed, string if named).
 */
export const getQueryParam = (
  prop: AST.PropertySignature,
): string | boolean | undefined => {
  // Check on the property type (v4 - annotations are on the type AST)
  return getAnnotation<string | boolean>(prop.type, queryParamSymbol);
};

/**
 * Get API error code from an error class AST.
 */
export const getApiErrorCode = (ast: AST.AST): string | undefined =>
  getAnnotation<string>(ast, apiErrorCodeSymbol);

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
