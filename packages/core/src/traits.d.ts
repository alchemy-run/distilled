import * as AST from "effect/SchemaAST";
/**
 * Internal symbol for annotation metadata storage.
 */
declare const annotationMetaSymbol: unique symbol;
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
    readonly [annotationMetaSymbol]: Array<{
        symbol: symbol;
        value: unknown;
    }>;
    readonly [key: symbol]: unknown;
    readonly [key: string]: unknown;
}
/**
 * Create an annotation builder for a given symbol and value.
 * This is the core primitive used to build all trait annotations.
 */
export declare function makeAnnotation<T>(sym: symbol, value: T): Annotation;
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
export declare function all(...annotations: Annotation[]): Annotation;
/** Symbol for HTTP operation metadata (method + path template) */
export declare const httpSymbol: unique symbol;
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
export declare const Http: (trait: HttpTrait) => Annotation;
/** Symbol for path parameter annotation */
export declare const pathParamSymbol: unique symbol;
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
export declare const PathParam: () => Annotation;
/** Symbol for query parameter annotation */
export declare const queryParamSymbol: unique symbol;
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
export declare const QueryParam: (name?: string | undefined) => Annotation;
/** Symbol for header parameter annotation */
export declare const headerParamSymbol: unique symbol;
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
export declare const HeaderParam: (name: string) => Annotation;
/**
 * HttpPath - alias for PathParam that also carries the wire name.
 * Used in generated code: `Schema.String.pipe(T.HttpPath("account_id"))`
 */
export declare const HttpPath: (name: string) => Annotation;
/**
 * HttpQuery - alias for QueryParam with an explicit wire name.
 * Used in generated code: `Schema.optional(Schema.String).pipe(T.HttpQuery("per_page"))`
 */
export declare const HttpQuery: (name: string) => Annotation;
/**
 * HttpHeader - alias for HeaderParam.
 * Used in generated code: `Schema.String.pipe(T.HttpHeader("X-Custom-Header"))`
 */
export declare const HttpHeader: (name: string) => Annotation;
/** Symbol for HTTP body annotation */
export declare const httpBodySymbol: unique symbol;
/**
 * HttpBody - marks a field as the raw HTTP body.
 * Used for operations where a field IS the entire request body
 * (not a named field within a JSON body).
 */
export declare const HttpBody: () => Annotation;
/** Symbol for form data file annotation */
export declare const httpFormDataFileSymbol: unique symbol;
/**
 * HttpFormDataFile - marks a field as a file upload in multipart form data.
 */
export declare const HttpFormDataFile: () => Annotation;
/** Symbol for API error code mapping */
export declare const apiErrorCodeSymbol: unique symbol;
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
export declare const ApiErrorCode: (code: string) => Annotation;
/** Symbol for service metadata */
export declare const serviceSymbol: unique symbol;
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
export declare const Service: (trait: ServiceTrait) => Annotation;
/**
 * Get annotation value from an AST node, following encoding chain if needed.
 */
export declare const getAnnotation: <T>(ast: AST.AST, symbol: symbol) => T | undefined;
/**
 * Get HTTP trait from a schema's AST.
 */
export declare const getHttpTrait: (ast: AST.AST) => HttpTrait | undefined;
/**
 * Check if a PropertySignature has the pathParam annotation.
 * Works for both PathParam() (annotation value = true) and HttpPath("wire_name") (annotation value = string).
 */
export declare const isPathParam: (prop: AST.PropertySignature) => boolean;
/**
 * Get query param name from a PropertySignature (returns true if unnamed, string if named).
 */
export declare const getQueryParam: (prop: AST.PropertySignature) => string | boolean | undefined;
/**
 * Get header param name from a PropertySignature.
 */
export declare const getHeaderParam: (prop: AST.PropertySignature) => string | undefined;
/**
 * Get API error code from an error class AST.
 */
export declare const getApiErrorCode: (ast: AST.AST) => string | undefined;
/**
 * Get service metadata from a schema's AST.
 */
export declare const getServiceTrait: (ast: AST.AST) => ServiceTrait | undefined;
/**
 * Extract path parameters from a schema's struct properties.
 * Returns an array of field names that have the PathParam annotation.
 */
export declare const getPathParams: (ast: AST.AST) => string[];
/**
 * Build the request path by substituting path parameters into the template.
 * Simple version that assumes input keys match template placeholders.
 * For schema-aware path building (with camelCase → wire_name mapping), use buildPathFromSchema.
 */
export declare const buildPath: (template: string, input: Record<string, unknown>) => string;
/**
 * Extract AST property signatures from a schema AST, following encoding chain and suspends.
 */
export declare const getStructProps: (ast: AST.AST) => AST.PropertySignature[];
/**
 * Get the path parameter wire name from a PropertySignature.
 * - For HttpPath("wire_name"), returns the wire name string.
 * - For PathParam(), returns the property name (since annotation is `true`).
 * - Returns undefined if not a path param.
 */
export declare const getPathParamWireName: (prop: AST.PropertySignature) => string | undefined;
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
export declare const buildRequestParts: (ast: AST.AST, httpTrait: HttpTrait, input: Record<string, unknown>, inputSchema?: any) => RequestParts;
/**
 * Helper to get a value from an object using a dot-separated path.
 * Used for pagination traits and nested property access.
 */
export declare const getPath: (obj: unknown, path: string) => unknown;
export {};
//# sourceMappingURL=traits.d.ts.map