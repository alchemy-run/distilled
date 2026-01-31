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
 * const GetOrganizationInput = Schema.Struct({
 *   organization: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/organizations/{organization}" })
 * );
 * ```
 */

/**
 * Internal symbol for annotation metadata storage
 */
const annotationMetaSymbol = Symbol.for("planetscale/annotation-meta");

/**
 * Any type that has an .annotations() method returning itself.
 * This includes Schema.Schema and Schema.PropertySignature.
 */
type Annotatable = {
  annotations(annotations: unknown): Annotatable;
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
    schema.annotations({ [sym]: value }) as A;

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

  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotations(raw) as A;

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
export const httpSymbol = Symbol.for("planetscale/http");

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
export const pathParamSymbol = Symbol.for("planetscale/path-param");

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
export const queryParamSymbol = Symbol.for("planetscale/query-param");

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
export const apiErrorCodeSymbol = Symbol.for("planetscale/ApiErrorCode");

/**
 * ApiErrorCode trait - maps an error class to an API error code.
 * Used to match API error responses to typed error classes.
 *
 * @example
 * ```ts
 * class NotFoundError extends Schema.TaggedError<NotFoundError>()(
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
 * Get annotation value from an AST node, unwrapping Transformation if needed.
 */
export const getAnnotation = <T>(
  ast: AST.AST,
  symbol: symbol,
): T | undefined => {
  // Direct annotation
  const direct = ast.annotations?.[symbol] as T | undefined;
  if (direct !== undefined) return direct;

  // Handle Transformation (e.g., from TaggedError)
  if (ast._tag === "Transformation") {
    const toValue = ast.to?.annotations?.[symbol] as T | undefined;
    if (toValue !== undefined) return toValue;
    const fromValue = ast.from?.annotations?.[symbol] as T | undefined;
    if (fromValue !== undefined) return fromValue;
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
  // Check on the property itself
  if (prop.annotations?.[pathParamSymbol]) return true;
  // Check on the property type
  return getAnnotation<boolean>(prop.type, pathParamSymbol) === true;
};

/**
 * Get query param name from a PropertySignature (returns true if unnamed, string if named).
 */
export const getQueryParam = (
  prop: AST.PropertySignature,
): string | boolean | undefined => {
  // Check on the property itself
  const propAnnot = prop.annotations?.[queryParamSymbol] as
    | string
    | boolean
    | undefined;
  if (propAnnot !== undefined) return propAnnot;
  // Check on the property type
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
  // Handle TypeLiteral (struct)
  if (ast._tag === "TypeLiteral") {
    return ast.propertySignatures
      .filter((prop) => isPathParam(prop))
      .map((prop) => String(prop.name));
  }

  // Handle Transformation (wraps TypeLiteral)
  if (ast._tag === "Transformation") {
    return getPathParams(ast.from);
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
