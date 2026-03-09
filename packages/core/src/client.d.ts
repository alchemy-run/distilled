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
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import type { PaginatedTrait } from "./pagination.ts";
/**
 * An operation that can be used in two ways:
 * 1. Direct call: `yield* operation(input)` - returns Effect with requirements
 * 2. Yield first: `const fn = yield* operation` - captures services, returns requirement-free function
 */
export type OperationMethod<I, A, E, R> = Effect.Effect<(input: I) => Effect.Effect<A, E, never>, never, R> & ((input: I) => Effect.Effect<A, E, R>);
/**
 * A paginated operation that additionally has `.pages()` and `.items()` methods.
 */
export type PaginatedOperationMethod<I, A, E, R> = OperationMethod<I, A, E, R> & {
    pages: (input: I) => Stream.Stream<A, E, R>;
    items: (input: I) => Stream.Stream<unknown, E, R>;
};
/**
 * Configuration for the API client factory.
 * SDKs provide this to customize how errors are matched and credentials are applied.
 */
export interface ClientConfig<Creds> {
    /** The credentials service tag */
    credentials: {
        new (): Creds;
    };
    /** Get the base URL from credentials */
    getBaseUrl: (creds: Creds) => string;
    /** Get authorization header(s) from credentials */
    getAuthHeaders: (creds: Creds) => Record<string, string>;
    /** Match an error response body to a typed error.
     *  Should return Effect.fail(error) for known errors,
     *  or Effect.fail(fallbackError) for unknown errors.
     *  The optional `errors` parameter provides per-operation typed error classes.
     */
    matchError: (status: number, body: unknown, errors?: readonly ApiErrorClass[]) => Effect.Effect<never, unknown>;
    /** Parse error class for schema decode failures */
    ParseError: new (props: {
        body: unknown;
        cause: unknown;
    }) => unknown;
    /**
     * Optional transform applied to the response body before schema decoding.
     * For example, Cloudflare wraps responses in `{ result: <data>, ... }`.
     */
    transformResponse?: (body: unknown) => unknown;
}
/**
 * Base API error type - any error class with at least a _tag and message.
 * Uses `new (...args: any[])` to accommodate error classes with extra fields (e.g. `code`).
 */
export type ApiErrorClass = {
    new (...args: any[]): {
        readonly _tag: string;
        readonly message: string;
    };
};
/**
 * Operation configuration with optional operation-specific errors.
 * Supports both `inputSchema`/`outputSchema` and `input`/`output` aliases.
 */
export interface OperationConfig<I extends Schema.Top, O extends Schema.Top, E extends readonly ApiErrorClass[] = readonly ApiErrorClass[]> {
    inputSchema?: I;
    outputSchema?: O;
    /** Alias for inputSchema (used by Cloudflare/GCP generators) */
    input?: I;
    /** Alias for outputSchema (used by Cloudflare/GCP generators) */
    output?: O;
    errors?: E;
}
/**
 * Paginated operation configuration.
 */
export interface PaginatedOperationConfig<I extends Schema.Top, O extends Schema.Top, E extends readonly ApiErrorClass[] = readonly ApiErrorClass[]> extends OperationConfig<I, O, E> {
    pagination?: PaginatedTrait;
}
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
export declare const makeAPI: <Creds>(config: ClientConfig<Creds>) => {
    make: <I extends Schema.Top, O extends Schema.Top, const E extends readonly ApiErrorClass[] = readonly []>(configFn: () => OperationConfig<I, O, E>) => any;
    makePaginated: <I extends Schema.Top, O extends Schema.Top, const E extends readonly ApiErrorClass[] = readonly []>(configFn: () => PaginatedOperationConfig<I, O, E>, paginateFn?: ((baseFn: (input: any) => Effect.Effect<any, any, any>, input: any, pagination: PaginatedTrait) => Stream.Stream<any, any, any>) | undefined) => any;
};
//# sourceMappingURL=client.d.ts.map