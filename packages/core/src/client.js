/**
 * REST API Client
 *
 * Provides the core API.make() factory for building typed Effect-based API operations.
 * This is the shared client for REST/OpenAPI-style SDKs (PlanetScale, Neon, GCP).
 *
 * AWS and Cloudflare have their own more specialized client implementations,
 * but they share the same OperationMethod pattern.
 *
 * @example
 * ```ts
 * import { API } from "@distilled.cloud/sdk-core/client";
 *
 * const listDatabases = API.make(() => ({
 *   inputSchema: ListDatabasesInput,
 *   outputSchema: ListDatabasesOutput,
 *   errors: [NotFound, Forbidden] as const,
 * }));
 *
 * // Direct call
 * const result = yield* listDatabases({ organization: "my-org" });
 *
 * // Yield first for requirement-free function
 * const fn = yield* listDatabases;
 * const result = yield* fn({ organization: "my-org" });
 * ```
 */
import * as Effect from "effect/Effect";
import { pipeArguments } from "effect/Pipeable";
import * as Schema from "effect/Schema";
import * as AST from "effect/SchemaAST";
import * as Stream from "effect/Stream";
import * as HttpBody from "effect/unstable/http/HttpBody";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import { SingleShotGen } from "effect/Utils";
import * as Traits from "./traits.js";
import { getPath } from "./traits.js";
// ============================================================================
// AST Helpers
// ============================================================================
/**
 * Check if a schema AST represents an array type.
 * Follows encoding chains and Suspend wrappers.
 */
function isArrayAST(ast) {
    if (ast._tag === "Arrays")
        return true;
    if (ast._tag === "Suspend")
        return isArrayAST(ast.thunk());
    if (ast.encoding && ast.encoding.length > 0)
        return isArrayAST(ast.encoding[0].to);
    return false;
}
// ============================================================================
// Multipart FormData Builder
// ============================================================================
/**
 * Check if a value is a File or Blob.
 */
function isFileOrBlob(value) {
    return ((typeof File !== "undefined" && value instanceof File) ||
        (typeof Blob !== "undefined" && value instanceof Blob));
}
/**
 * Build a FormData from a record of body properties.
 * Handles files/blobs, arrays of files, objects (as JSON blobs), and primitives.
 *
 * This is used for multipart operations (e.g., Cloudflare Workers script uploads)
 * where the body contains a mix of metadata objects and file uploads.
 */
function buildFormData(body) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
        if (value === undefined || value === null)
            continue;
        if (isFileOrBlob(value)) {
            // Single file/blob
            formData.append(key, value, value instanceof File ? value.name : key);
        }
        else if (Array.isArray(value) &&
            value.length > 0 &&
            isFileOrBlob(value[0])) {
            // Array of files/blobs — append each individually
            for (const file of value) {
                if (isFileOrBlob(file)) {
                    formData.append(file instanceof File ? file.name : key, file, file instanceof File ? file.name : undefined);
                }
            }
        }
        else if (typeof value === "object" && value !== null) {
            // Object → append as JSON blob
            formData.append(key, new Blob([JSON.stringify(value)], { type: "application/json" }), key);
        }
        else {
            // Primitive → append as string
            formData.append(key, String(value));
        }
    }
    return formData;
}
// ============================================================================
// API Client Factory
// ============================================================================
/**
 * Creates an API namespace bound to a specific SDK's client configuration.
 *
 * @example
 * ```ts
 * // In planetscale-sdk/src/client.ts
 * export const API = makeAPI({
 *   credentials: Credentials,
 *   getBaseUrl: (c) => c.apiBaseUrl,
 *   getAuthHeaders: (c) => ({ Authorization: c.token }),
 *   matchError: matchPlanetScaleError,
 *   ParseError: PlanetScaleParseError,
 * });
 * ```
 */
export const makeAPI = (config) => {
    return {
        make: (configFn) => {
            const opConfig = configFn();
            // Support both input/output and inputSchema/outputSchema aliases
            const inputSchema = (opConfig.inputSchema ?? opConfig.input);
            const outputSchema = (opConfig.outputSchema ?? opConfig.output);
            // Read HTTP trait from input schema annotations
            const httpTrait = Traits.getHttpTrait(inputSchema.ast);
            if (!httpTrait) {
                throw new Error("Input schema must have Http trait");
            }
            const method = httpTrait.method;
            const fn = (input) => Effect.gen(function* () {
                const creds = yield* config.credentials;
                const client = yield* HttpClient.HttpClient;
                const baseUrl = config.getBaseUrl(creds);
                const authHeaders = config.getAuthHeaders(creds);
                // Use schema-aware request builder for proper camelCase → wire_name mapping
                const parts = Traits.buildRequestParts(inputSchema.ast, httpTrait, input, inputSchema);
                let request = HttpClientRequest.make(method)(baseUrl + parts.path).pipe(HttpClientRequest.setHeaders(authHeaders), HttpClientRequest.setHeaders(parts.headers), HttpClientRequest.setHeader("Accept", "application/json"));
                // Set Content-Type based on body type (skip for FormData — browser sets boundary)
                if (!parts.isMultipart) {
                    request = HttpClientRequest.setHeader("Content-Type", "application/json")(request);
                }
                if (Object.keys(parts.query).length > 0) {
                    request = HttpClientRequest.setUrlParams(request, parts.query);
                }
                if (method !== "GET" && parts.body !== undefined) {
                    if (parts.isMultipart) {
                        // Build FormData from body properties for multipart operations
                        const formData = buildFormData(parts.body);
                        request = HttpClientRequest.setBody(HttpBody.formData(formData))(request);
                    }
                    else {
                        request = yield* HttpClientRequest.bodyJson(parts.body)(request);
                    }
                }
                else if (method === "GET" && parts.body !== undefined) {
                    // For GET requests, remaining non-annotated fields go as query params
                    const extraQuery = {};
                    for (const [key, value] of Object.entries(parts.body)) {
                        if (value !== undefined) {
                            extraQuery[key] = String(value);
                        }
                    }
                    if (Object.keys(extraQuery).length > 0) {
                        request = HttpClientRequest.setUrlParams(request, extraQuery);
                    }
                }
                const response = yield* client.execute(request).pipe(Effect.scoped);
                if (response.status >= 400) {
                    // Try to parse error body as JSON; fall back to text if not JSON
                    const errorBody = yield* response.json.pipe(Effect.catchIf(() => true, () => response.text.pipe(Effect.map((text) => ({ _nonJsonError: true, body: text })), Effect.catchIf(() => true, () => Effect.succeed({
                        _nonJsonError: true,
                        body: `HTTP ${response.status}`,
                    })))));
                    return yield* config.matchError(response.status, errorBody, opConfig.errors);
                }
                // For void-returning operations (e.g. DELETE 204 No Content)
                if (AST.isVoid(outputSchema.ast)) {
                    return undefined;
                }
                // For 204 No Content: if schema is not Unknown, return undefined.
                // If schema IS Unknown, return empty string (so callers get a defined value).
                if (response.status === 204) {
                    if (outputSchema.ast._tag === "Unknown") {
                        return "";
                    }
                    return undefined;
                }
                // Try to parse response as JSON; fall back to text for non-JSON responses
                // (e.g., multipart/form-data worker scripts, raw KV values)
                const rawBody = yield* response.json.pipe(Effect.catchIf(() => true, () => response.text.pipe(Effect.map((text) => text))));
                let responseBody = config.transformResponse
                    ? config.transformResponse(rawBody)
                    : rawBody;
                // Handle Cloudflare-style paginated responses where result is
                // { items: [...] } but the schema expects an array
                if (isArrayAST(outputSchema.ast) &&
                    !Array.isArray(responseBody) &&
                    typeof responseBody === "object" &&
                    responseBody !== null &&
                    "items" in responseBody &&
                    Array.isArray(responseBody.items)) {
                    responseBody = responseBody.items;
                }
                return yield* Schema.decodeUnknownEffect(outputSchema)(responseBody).pipe(Effect.catchTag("SchemaError", (cause) => Effect.fail(new config.ParseError({ body: rawBody, cause }))));
            });
            const Proto = {
                [Symbol.iterator]() {
                    return new SingleShotGen(this);
                },
                pipe() {
                    return pipeArguments(this.asEffect(), arguments);
                },
                asEffect() {
                    return Effect.map(Effect.services(), (sm) => (input) => fn(input).pipe(Effect.provide(sm)));
                },
            };
            return Object.assign(fn, Proto);
        },
        makePaginated: (configFn, paginateFn) => {
            const opConfig = configFn();
            const pagination = opConfig.pagination;
            // Create the base operation
            const baseFn = makeAPI(config).make(() => ({
                inputSchema: opConfig.inputSchema ?? opConfig.input,
                outputSchema: opConfig.outputSchema ?? opConfig.output,
                errors: opConfig.errors,
            }));
            // Default pagination: token-based (works for Cloudflare/GCP style)
            const defaultPaginateFn = (op, input, pag) => {
                return Stream.unfold({ token: undefined, done: false }, (state) => Effect.gen(function* () {
                    if (state.done)
                        return undefined;
                    const requestPayload = state.token !== undefined
                        ? { ...input, [pag.inputToken]: state.token }
                        : input;
                    const response = yield* op(requestPayload);
                    const nextToken = getPath(response, pag.outputToken);
                    return [
                        response,
                        {
                            token: nextToken,
                            done: nextToken === undefined || nextToken === null,
                        },
                    ];
                }));
            };
            const paginate = paginateFn ?? defaultPaginateFn;
            // Stream all pages
            const pagesFn = (input) => paginate(baseFn, input, pagination);
            // Stream individual items
            const itemsFn = (input) => pagesFn(input).pipe(Stream.flatMap((page) => {
                if (!pagination.items)
                    return Stream.make(page);
                const items = getPath(page, pagination.items);
                return Stream.fromIterable(items ?? []);
            }));
            const result = baseFn;
            result.pages = pagesFn;
            result.items = itemsFn;
            return result;
        },
    };
};
//# sourceMappingURL=client.js.map