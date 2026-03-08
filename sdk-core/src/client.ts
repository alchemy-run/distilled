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
import * as Category from "./category.ts";
import * as Traits from "./traits.ts";
import { getPath } from "./traits.ts";
import type { PaginatedTrait } from "./pagination.ts";

// ============================================================================
// Client Types
// ============================================================================

/**
 * An operation that can be used in two ways:
 * 1. Direct call: `yield* operation(input)` - returns Effect with requirements
 * 2. Yield first: `const fn = yield* operation` - captures services, returns requirement-free function
 */
export type OperationMethod<I, A, E, R> = Effect.Effect<
  (input: I) => Effect.Effect<A, E, never>,
  never,
  R
> &
  ((input: I) => Effect.Effect<A, E, R>);

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
   */
  matchError: (status: number, body: unknown) => Effect.Effect<never, unknown>;

  /** Parse error class for schema decode failures */
  ParseError: new (props: { body: unknown; cause: unknown }) => unknown;
}

/**
 * Base API error type - any error class with a message field.
 */
export type ApiErrorClass = {
  new (props: { message: string }): {
    readonly _tag: string;
    readonly message: string;
  };
};

/**
 * Operation configuration with optional operation-specific errors.
 */
export interface OperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> {
  inputSchema: I;
  outputSchema: O;
  errors?: E;
}

/**
 * Paginated operation configuration.
 */
export interface PaginatedOperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> extends OperationConfig<I, O, E> {
  pagination?: PaginatedTrait;
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
export const makeAPI = <Creds>(config: ClientConfig<Creds>) => {
  type Context = Creds | HttpClient.HttpClient;
  type ClientErrors = HttpClientError.HttpClientError | HttpBody.HttpBodyError;

  return {
    make: <
      I extends Schema.Top,
      O extends Schema.Top,
      const E extends readonly ApiErrorClass[] = readonly [],
    >(
      configFn: () => OperationConfig<I, O, E>,
    ) => {
      const opConfig = configFn();
      type Input = Schema.Schema.Type<I>;
      type Output = Schema.Schema.Type<O>;
      type Errors = InstanceType<E[number]> | ClientErrors;

      // Read HTTP trait from input schema annotations
      const httpTrait = Traits.getHttpTrait(opConfig.inputSchema.ast);

      if (!httpTrait) {
        throw new Error("Input schema must have Http trait");
      }

      const method = httpTrait.method;
      const pathTemplate = httpTrait.path;
      const pathParams = Traits.getPathParams(opConfig.inputSchema.ast);

      // Build path function from template
      const buildPathFn = (input: Input) =>
        Traits.buildPath(pathTemplate, input as Record<string, unknown>);

      // Helper to extract query params (non-path params) for GET requests
      const getQueryParams = (
        input: Input,
      ): Record<string, string> | undefined => {
        if (method !== "GET") return undefined;
        const pathParamSet = new Set(pathParams);
        const query: Record<string, string> = {};
        for (const [key, value] of Object.entries(
          input as Record<string, unknown>,
        )) {
          if (!pathParamSet.has(key) && value !== undefined) {
            query[key] = String(value);
          }
        }
        return Object.keys(query).length > 0 ? query : undefined;
      };

      // Helper to extract body params (non-path params) for non-GET requests
      const getBodyParams = (
        input: Input,
      ): Record<string, unknown> | undefined => {
        if (method === "GET") return undefined;
        const pathParamSet = new Set(pathParams);
        const body: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(
          input as Record<string, unknown>,
        )) {
          if (!pathParamSet.has(key) && value !== undefined) {
            body[key] = value;
          }
        }
        return Object.keys(body).length > 0 ? body : undefined;
      };

      const fn = (input: Input): Effect.Effect<Output, any, any> =>
        Effect.gen(function* () {
          const creds = yield* config.credentials as any;
          const client = yield* HttpClient.HttpClient;

          const baseUrl = config.getBaseUrl(creds as Creds);
          const authHeaders = config.getAuthHeaders(creds as Creds);

          const queryParams = getQueryParams(input);
          const requestBody = getBodyParams(input);

          let request = HttpClientRequest.make(method)(
            baseUrl + buildPathFn(input),
          ).pipe(
            HttpClientRequest.setHeaders(authHeaders),
            HttpClientRequest.setHeader("Content-Type", "application/json"),
            HttpClientRequest.setHeader("Accept", "application/json"),
          );

          if (queryParams) {
            request = HttpClientRequest.setUrlParams(request, queryParams);
          }
          if (requestBody) {
            request = yield* HttpClientRequest.bodyJson(requestBody)(request);
          }

          const response = yield* client.execute(request).pipe(Effect.scoped);

          if (response.status >= 400) {
            const errorBody = yield* response.json;
            return yield* config.matchError(
              response.status,
              errorBody,
            ) as Effect.Effect<never, Errors>;
          }

          // For void-returning operations (e.g. DELETE 204 No Content)
          if (
            response.status === 204 ||
            AST.isVoid(opConfig.outputSchema.ast)
          ) {
            return undefined as Output;
          }

          const responseBody = yield* response.json;
          return yield* Schema.decodeUnknownEffect(opConfig.outputSchema)(
            responseBody,
          ).pipe(
            Effect.catchTag("SchemaError", (cause) =>
              Effect.fail(new config.ParseError({ body: responseBody, cause })),
            ),
          ) as Effect.Effect<Output, Errors>;
        });

      const Proto = {
        [Symbol.iterator]() {
          return new SingleShotGen(this);
        },
        pipe() {
          return pipeArguments(this.asEffect(), arguments);
        },
        asEffect() {
          return Effect.map(
            Effect.services(),
            (sm) => (input: Input) => fn(input).pipe(Effect.provide(sm)),
          );
        },
      };

      return Object.assign(fn, Proto);
    },

    makePaginated: <
      I extends Schema.Top,
      O extends Schema.Top,
      const E extends readonly ApiErrorClass[] = readonly [],
    >(
      configFn: () => PaginatedOperationConfig<I, O, E>,
      paginateFn: (
        baseFn: (input: any) => Effect.Effect<any, any, any>,
        input: any,
        pagination: PaginatedTrait,
      ) => Stream.Stream<any, any, any>,
    ) => {
      const opConfig = configFn();
      const pagination = opConfig.pagination!;

      // Create the base operation
      const baseFn = makeAPI(config).make(() => ({
        inputSchema: opConfig.inputSchema,
        outputSchema: opConfig.outputSchema,
        errors: opConfig.errors,
      }));

      type Input = Schema.Schema.Type<I>;
      type Output = Schema.Schema.Type<O>;
      type Errors = InstanceType<E[number]> | ClientErrors;

      // Stream all pages
      const pagesFn = (input: Omit<Input, string>) =>
        paginateFn(baseFn, input, pagination);

      // Stream individual items
      const itemsFn = (input: Omit<Input, string>) =>
        pagesFn(input).pipe(
          Stream.flatMap((page) => {
            const items = getPath(page, pagination.items) as
              | readonly unknown[]
              | undefined;
            return Stream.fromIterable(items ?? []);
          }),
        );

      const result = baseFn as typeof baseFn & {
        pages: typeof pagesFn;
        items: typeof itemsFn;
      };

      result.pages = pagesFn;
      result.items = itemsFn;

      return result;
    },
  };
};
