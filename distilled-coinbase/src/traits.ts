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
 * const GetEvmAccountInput = Schema.Struct({
 *   address: Schema.String.pipe(T.PathParam()),
 * }).pipe(
 *   T.Http({ method: "GET", path: "/v2/evm/accounts/{address}" })
 * );
 * ```
 */

/**
 * Internal symbol for annotation metadata storage
 */
const annotationMetaSymbol = Symbol.for("coinbase/annotation-meta");

/**
 * Any type that has an .annotate() method returning itself.
 * This includes Schema.Schema and Schema.PropertySignature.
 */
type Annotatable = {
  annotations(annotations: unknown): Annotatable;
};

/**
 * An Annotation is a callable that can be used with .pipe() AND
 * has symbol properties so it works directly with Schema.Struct/Class.
 */
export interface Annotation {
  <A extends Annotatable>(schema: A): A;
  readonly [annotationMetaSymbol]: Array<{ symbol: symbol; value: unknown }>;
  readonly [key: symbol]: unknown;
  readonly [key: string]: unknown;
}

/**
 * Create an annotation builder for a given symbol and value
 */
function makeAnnotation<T>(sym: symbol, value: T): Annotation {
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({ [sym]: value }) as A;

  (fn as any)[annotationMetaSymbol] = [{ symbol: sym, value }];
  (fn as any)[sym] = value;

  return fn as Annotation;
}

/**
 * Combine multiple annotations into one.
 */
export function all(...annotate: Annotation[]): Annotation {
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
export const httpSymbol = Symbol.for("coinbase/http");

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
 */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);

// =============================================================================
// Path Parameter Traits
// =============================================================================

/** Symbol for path parameter annotation */
export const pathParamSymbol = Symbol.for("coinbase/path-param");

/**
 * PathParam trait - marks a field as a path parameter.
 */
export const PathParam = () => makeAnnotation(pathParamSymbol, true);

// =============================================================================
// Query Parameter Traits
// =============================================================================

/** Symbol for query parameter annotation */
export const queryParamSymbol = Symbol.for("coinbase/query-param");

/**
 * QueryParam trait - marks a field as a query parameter.
 * Optionally specify a different wire name.
 */
export const QueryParam = (name?: string) =>
  makeAnnotation(queryParamSymbol, name ?? true);

// =============================================================================
// Header Parameter Traits
// =============================================================================

/** Symbol for header parameter annotation */
export const headerParamSymbol = Symbol.for("coinbase/header-param");

/**
 * HeaderParam trait - marks a field as a header parameter.
 * The value is the header name.
 */
export const HeaderParam = (name: string) =>
  makeAnnotation(headerParamSymbol, name);

// =============================================================================
// Wallet Auth Trait
// =============================================================================

/** Symbol for requiring wallet auth */
export const walletAuthSymbol = Symbol.for("coinbase/wallet-auth");

/**
 * WalletAuth trait - marks an operation as requiring X-Wallet-Auth header.
 */
export const WalletAuth = () => makeAnnotation(walletAuthSymbol, true);

// =============================================================================
// API Error Code Trait
// =============================================================================

/** Symbol for API error code mapping */
export const apiErrorCodeSymbol = Symbol.for("coinbase/ApiErrorCode");

/**
 * ApiErrorCode trait - maps an error class to an API error code.
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
  const direct = ast.annotate?.[symbol] as T | undefined;
  if (direct !== undefined) return direct;

  if (ast._tag === "Transformation") {
    const toValue = ast.to?.annotate?.[symbol] as T | undefined;
    if (toValue !== undefined) return toValue;
    const fromValue = ast.from?.annotate?.[symbol] as T | undefined;
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
  if (prop.annotate?.[pathParamSymbol]) return true;
  return getAnnotation<boolean>(prop.type, pathParamSymbol) === true;
};

/**
 * Get query param name from a PropertySignature.
 */
export const getQueryParam = (
  prop: AST.PropertySignature,
): string | boolean | undefined => {
  const propAnnot = prop.annotate?.[queryParamSymbol] as
    | string
    | boolean
    | undefined;
  if (propAnnot !== undefined) return propAnnot;
  return getAnnotation<string | boolean>(prop.type, queryParamSymbol);
};

/**
 * Get header param name from a PropertySignature.
 */
export const getHeaderParam = (
  prop: AST.PropertySignature,
): string | undefined => {
  const propAnnot = prop.annotate?.[headerParamSymbol] as string | undefined;
  if (propAnnot !== undefined) return propAnnot;
  return getAnnotation<string>(prop.type, headerParamSymbol);
};

/**
 * Check if an operation requires wallet auth.
 */
export const requiresWalletAuth = (ast: AST.AST): boolean =>
  getAnnotation<boolean>(ast, walletAuthSymbol) === true;

/**
 * Get API error code from an error class AST.
 */
export const getApiErrorCode = (ast: AST.AST): string | undefined =>
  getAnnotation<string>(ast, apiErrorCodeSymbol);

/**
 * Extract path parameters from a schema's struct properties.
 */
export const getPathParams = (ast: AST.AST): string[] => {
  if (ast._tag === "TypeLiteral") {
    return ast.propertySignatures
      .filter((prop) => isPathParam(prop))
      .map((prop) => String(prop.name));
  }

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
