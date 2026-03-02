/**
 * Effect Schema annotations for HTTP binding traits.
 *
 * These traits are applied to schema properties to specify how they map
 * to HTTP request/response components (path, query, headers, body).
 *
 * GCP uses REST JSON protocol exclusively, similar to Cloudflare.
 */

import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";

// =============================================================================
// Annotation Infrastructure
// =============================================================================

const annotationMetaSymbol = Symbol.for("distilled-gcp/annotation-meta");

type Annotatable = {
  annotate(annotations: Record<symbol, unknown>): Annotatable;
};

export interface Annotation {
  <A extends Annotatable>(schema: A): A;
  readonly [annotationMetaSymbol]: Array<{ symbol: symbol; value: unknown }>;
  readonly [key: symbol]: unknown;
}

function makeAnnotation<T>(sym: symbol, value: T): Annotation {
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({ [sym]: value }) as A;

  Object.defineProperty(fn, annotationMetaSymbol, {
    value: [{ symbol: sym, value }],
    writable: false,
    enumerable: false,
  });
  Object.defineProperty(fn, sym, {
    value,
    writable: false,
    enumerable: false,
  });

  return fn as Annotation;
}

/**
 * Combine multiple annotations into one.
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
    schema.annotate(raw) as A;

  Object.defineProperty(fn, annotationMetaSymbol, {
    value: entries,
    writable: false,
    enumerable: false,
  });

  for (const { symbol, value } of entries) {
    Object.defineProperty(fn, symbol, {
      value,
      writable: false,
      enumerable: false,
    });
  }

  return fn as Annotation;
}

// =============================================================================
// HTTP Binding Traits
// =============================================================================

/** Bind member to a URL path parameter (URI template variable) */
export const httpPathSymbol = Symbol.for("distilled-gcp/http-path");
export const HttpPath = (name: string) => makeAnnotation(httpPathSymbol, name);

/** Bind member to a query string parameter */
export const httpQuerySymbol = Symbol.for("distilled-gcp/http-query");
export const HttpQuery = (name: string) =>
  makeAnnotation(httpQuerySymbol, name);

/** Bind member to an HTTP header */
export const httpHeaderSymbol = Symbol.for("distilled-gcp/http-header");
export const HttpHeader = (name: string) =>
  makeAnnotation(httpHeaderSymbol, name);

/** Bind member to the request/response body */
export const httpBodySymbol = Symbol.for("distilled-gcp/http-body");
export const HttpBody = () => makeAnnotation(httpBodySymbol, true);

/** JSON wire name for a property (maps camelCase to wire name) */
export const httpJsonNameSymbol = Symbol.for("distilled-gcp/http-json-name");
export const JsonName = (name: string) =>
  makeAnnotation(httpJsonNameSymbol, name);

export const getJsonName = (prop: AST.PropertySignature): string | undefined =>
  getPropAnnotation<string>(prop, httpJsonNameSymbol);

// =============================================================================
// Operation-Level Traits
// =============================================================================

export const httpOperationSymbol = Symbol.for("distilled-gcp/http-operation");

export interface HttpOperationTrait {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  path: string;
  /** Whether request body is expected */
  hasBody?: boolean;
}

export const Http = (trait: HttpOperationTrait) =>
  makeAnnotation(httpOperationSymbol, trait);

// =============================================================================
// Service-Level Traits
// =============================================================================

export const serviceSymbol = Symbol.for("distilled-gcp/service");

export interface ServiceTrait {
  name: string;
  version: string;
  rootUrl: string;
  servicePath: string;
}

export const Service = (trait: ServiceTrait) =>
  makeAnnotation(serviceSymbol, trait);

// =============================================================================
// Pagination Trait
// =============================================================================

export const paginationSymbol = Symbol.for("distilled-gcp/pagination");

export interface PaginationTrait {
  inputToken: string;
  outputToken: string;
  items?: string;
  pageSize?: string;
}

export const Pagination = (trait: PaginationTrait) =>
  makeAnnotation(paginationSymbol, trait);

// =============================================================================
// Media Upload Trait
// =============================================================================

export const mediaUploadSymbol = Symbol.for("distilled-gcp/media-upload");

export interface MediaUploadTrait {
  accept: string[];
  maxSize?: string;
  protocols: {
    simple?: { multipart: boolean; path: string };
    resumable?: { multipart: boolean; path: string };
  };
}

export const MediaUpload = (trait: MediaUploadTrait) =>
  makeAnnotation(mediaUploadSymbol, trait);

// =============================================================================
// Error Matching Traits
// =============================================================================

/** Expression-based error matchers from patch files */
export const httpErrorMatchersSymbol = Symbol.for(
  "distilled-gcp/http-error-matchers",
);

/**
 * Matcher structure for GCP errors.
 * GCP errors are identified by HTTP status, gRPC status code, and/or reason.
 */
export interface ErrorMatcherAnnotation {
  /** HTTP status code (e.g., 404, 403, 409) */
  httpStatus?: number;
  /** gRPC status name (e.g., "NOT_FOUND", "PERMISSION_DENIED") */
  status?: string;
  /** Error reason from detailed errors (e.g., "notFound", "forbidden") */
  reason?: string;
  /** Error domain (e.g., "global", "storage") */
  domain?: string;
  /** Message matcher */
  message?: { includes?: string; matches?: string };
}

export const HttpErrorMatchers = (matchers: ErrorMatcherAnnotation[]) =>
  makeAnnotation(httpErrorMatchersSymbol, matchers);

/**
 * Apply error matchers directly to a class's AST annotations.
 * Used for TaggedErrorClass in Effect v4 where .pipe() on a class
 * returns a schema (not a class), breaking `extends ... .pipe(...)`.
 */
export const applyErrorMatchers = (
  cls: { ast: AST.AST },
  matchers: ErrorMatcherAnnotation[],
): void => {
  const annotations = cls.ast.annotations as Record<symbol, unknown>;
  annotations[httpErrorMatchersSymbol] = matchers;
};

// =============================================================================
// Annotation Retrieval Helpers
// =============================================================================

export const getAnnotation = <T>(
  ast: AST.AST,
  symbol: symbol,
): T | undefined => {
  const annotations = ast.annotations as Record<symbol, unknown> | undefined;
  return annotations?.[symbol] as T | undefined;
};

export const getPropAnnotation = <T>(
  prop: AST.PropertySignature,
  symbol: symbol,
): T | undefined => {
  return getAnnotationUnwrap(prop.type, symbol);
};

export const hasPropAnnotation = (
  prop: AST.PropertySignature,
  symbol: symbol,
): boolean => {
  return hasAnnotation(prop.type, symbol);
};

export const hasAnnotation = (ast: AST.AST, symbol: symbol): boolean => {
  const annotations = ast.annotations as Record<symbol, unknown> | undefined;
  if (annotations?.[symbol] !== undefined) return true;

  if (ast._tag === "Suspend") {
    return hasAnnotation(ast.thunk(), symbol);
  }

  if (ast._tag === "Union") {
    const nonNullishTypes = ast.types.filter(
      (t: AST.AST) =>
        t._tag !== "Undefined" &&
        !(t._tag === "Literal" && t.literal === null),
    );
    return nonNullishTypes.some((t: AST.AST) => hasAnnotation(t, symbol));
  }

  if (ast.encoding && ast.encoding.length > 0) {
    return hasAnnotation(ast.encoding[0].to, symbol);
  }

  return false;
};

export const getAnnotationUnwrap = <T>(
  ast: AST.AST,
  symbol: symbol,
): T | undefined => {
  const annotations = ast.annotations as Record<symbol, unknown> | undefined;
  const direct = annotations?.[symbol] as T | undefined;
  if (direct !== undefined) return direct;

  if (ast._tag === "Suspend") {
    return getAnnotationUnwrap(ast.thunk(), symbol);
  }

  if (ast.encoding && ast.encoding.length > 0) {
    return getAnnotationUnwrap(ast.encoding[0].to, symbol);
  }

  if (ast._tag === "Union") {
    const nonNullishTypes = ast.types.filter(
      (t) =>
        t._tag !== "Undefined" &&
        !(t._tag === "Literal" && t.literal === null),
    );
    if (nonNullishTypes.length === 1) {
      return getAnnotationUnwrap(nonNullishTypes[0]!, symbol);
    }
  }

  return undefined;
};

// =============================================================================
// Property Annotation Helpers
// =============================================================================

export const getHttpPath = (prop: AST.PropertySignature): string | undefined =>
  getPropAnnotation<string>(prop, httpPathSymbol);

export const getHttpQuery = (prop: AST.PropertySignature): string | undefined =>
  getPropAnnotation<string>(prop, httpQuerySymbol);

export const getHttpHeader = (
  prop: AST.PropertySignature,
): string | undefined => getPropAnnotation<string>(prop, httpHeaderSymbol);

export const hasHttpBody = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, httpBodySymbol);

// =============================================================================
// Operation Trait Helpers
// =============================================================================

export const getHttpOperation = (
  ast: AST.AST,
): HttpOperationTrait | undefined =>
  getAnnotationUnwrap<HttpOperationTrait>(ast, httpOperationSymbol);

export const getService = (ast: AST.AST): ServiceTrait | undefined =>
  getAnnotationUnwrap<ServiceTrait>(ast, serviceSymbol);

export const getPagination = (ast: AST.AST): PaginationTrait | undefined =>
  getAnnotationUnwrap<PaginationTrait>(ast, paginationSymbol);

export const getMediaUpload = (ast: AST.AST): MediaUploadTrait | undefined =>
  getAnnotationUnwrap<MediaUploadTrait>(ast, mediaUploadSymbol);

export const getHttpErrorMatchers = (
  ast: AST.AST,
): ErrorMatcherAnnotation[] | undefined =>
  getAnnotationUnwrap<ErrorMatcherAnnotation[]>(ast, httpErrorMatchersSymbol);
