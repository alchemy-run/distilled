import * as HttpBody from "effect/unstable/http/HttpBody";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as Category from "./category";
import { Credentials } from "./credentials";
import {
  BadRequest,
  Conflict,
  Forbidden,
  HTTP_STATUS_MAP,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
} from "./errors";
import {
  type PaginatedResponse,
  type PaginatedTrait,
  DefaultPaginationTrait,
  getPath,
} from "./pagination";
import * as Traits from "./traits";

// API Error Response Schema - parse just the code and message
const ApiErrorResponse = Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.String,
});

// Re-export traits for convenience (backwards compatibility)
export const ApiErrorCode = Traits.apiErrorCodeSymbol;

// Legacy symbols - deprecated, use traits instead
/** @deprecated Use T.Http({ method, path }) instead */
export const ApiMethod = Symbol.for("neon/ApiMethod");
/** @deprecated Use T.Http({ method, path }) instead */
export const ApiPath = Symbol.for("neon/ApiPath");
/** @deprecated Use T.PathParam() on individual fields instead */
export const ApiPathParams = Symbol.for("neon/ApiPathParams");

// Type for HTTP methods
export type HttpMethod = Traits.HttpMethod;

// Generic API Error - uncategorized fallback for unknown API error codes
export class NeonApiError extends Schema.TaggedErrorClass<NeonApiError>()(
  "NeonApiError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class NeonParseError extends Schema.TaggedErrorClass<NeonParseError>()(
  "NeonParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Match an API error response to the appropriate error class based on HTTP status.
 * Returns the typed error or falls back to NeonApiError.
 */
const matchApiError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<
  never,
  | InstanceType<(typeof HTTP_STATUS_MAP)[keyof typeof HTTP_STATUS_MAP]>
  | NeonApiError
> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
    if (ErrorClass) {
      return Effect.fail(new ErrorClass({ message: parsed.message ?? "" }));
    }
    return Effect.fail(
      new NeonApiError({
        code: parsed.code,
        message: parsed.message,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new NeonApiError({ body: errorBody }));
  }
};

// ============================================================================
// Error Types
// ============================================================================

/**
 * Base API error type - any error class with a message field.
 */
export type ApiErrorClass =
  | typeof Unauthorized
  | typeof Forbidden
  | typeof NotFound
  | typeof Conflict
  | typeof UnprocessableEntity
  | typeof BadRequest
  | typeof TooManyRequests
  | typeof Locked
  | typeof InternalServerError
  | typeof ServiceUnavailable;

/**
 * Default errors that apply to ALL operations.
 * These are infrastructure-level errors that can occur regardless of the operation.
 */
export const DEFAULT_ERRORS = [
  Unauthorized,
  TooManyRequests,
  Locked,
  InternalServerError,
  ServiceUnavailable,
] as const;

export type DefaultErrors = InstanceType<(typeof DEFAULT_ERRORS)[number]>;

/**
 * Client-level errors that can occur for any operation.
 */
export type ClientErrors =
  | NeonApiError
  | NeonParseError
  | HttpClientError.HttpClientError
  | HttpBody.HttpBodyError;

// ============================================================================
// Operation Configuration
// ============================================================================

/**
 * Operation configuration with optional operation-specific errors.
 */
interface OperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> {
  inputSchema: I;
  outputSchema: O;
  /**
   * Operation-specific errors that can be returned by this operation.
   * These are in addition to the default errors (Unauthorized, TooManyRequests, etc.)
   * If not specified, no operation-specific errors are included.
   *
   * @example
   * ```ts
   * errors: [NotFound, Forbidden] as const
   * ```
   */
  errors?: E;
}

/**
 * Paginated operation configuration.
 */
interface PaginatedOperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> extends OperationConfig<I, O, E> {
  /** Pagination trait describing the input/output token fields */
  pagination?: PaginatedTrait;
}

// Helper to get annotation from schema AST (legacy)
const getAnnotationLegacy = <T>(
  schema: Schema.Top,
  key: symbol,
): T | undefined => {
  const annotations = schema.ast.annotations as
    | Record<symbol, unknown>
    | undefined;
  return annotations?.[key] as T | undefined;
};

/**
 * An operation that can be used in two ways:
 * 1. Direct call: `yield* operation(input)` — returns Effect with requirements
 * 2. Yield first: `const fn = yield* operation` — captures services, returns requirement-free function
 */
export type OperationMethod<I, A, E, R> = Effect.Effect<
  (input: I) => Effect.Effect<A, E, never>,
  never,
  R
> &
  ((input: I) => Effect.Effect<A, E, R>);

// API namespace
export const API = {
  make: <
    I extends Schema.Top,
    O extends Schema.Top,
    const E extends readonly ApiErrorClass[] = readonly [],
  >(
    configFn: () => OperationConfig<I, O, E>,
  ) => {
    const config = configFn();
    type Input = Schema.Schema.Type<I>;
    type Output = Schema.Schema.Type<O>;
    type Context = Credentials | HttpClient.HttpClient;
    // Operation-specific errors + default errors + client errors
    type Errors = InstanceType<E[number]> | DefaultErrors | ClientErrors;

    // Read HTTP trait from input schema annotations (new style)
    const httpTrait = Traits.getHttpTrait(config.inputSchema.ast);

    // Fall back to legacy annotations if no Http trait
    const legacyMethod = getAnnotationLegacy<HttpMethod>(
      config.inputSchema,
      ApiMethod,
    );
    const legacyPath = getAnnotationLegacy<(input: Input) => string>(
      config.inputSchema,
      ApiPath,
    );
    const legacyPathParams =
      getAnnotationLegacy<readonly string[]>(
        config.inputSchema,
        ApiPathParams,
      ) ?? [];

    // Determine method, path template, and path params
    const method = httpTrait?.method ?? legacyMethod;
    const pathTemplate = httpTrait?.path;
    const pathParams = httpTrait
      ? Traits.getPathParams(config.inputSchema.ast)
      : legacyPathParams;

    if (!method) {
      throw new Error(
        "Input schema must have Http trait or ApiMethod annotation",
      );
    }
    if (!pathTemplate && !legacyPath) {
      throw new Error(
        "Input schema must have Http trait or ApiPath annotation",
      );
    }

    // Build path function - either from template or legacy function
    const buildPathFn = pathTemplate
      ? (input: Input) =>
          Traits.buildPath(pathTemplate, input as Record<string, unknown>)
      : legacyPath!;

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

    const fn = (input: Input): Effect.Effect<Output, Errors, Context> =>
      Effect.gen(function* () {
        const { apiKey, apiBaseUrl } = yield* Credentials;
        const client = yield* HttpClient.HttpClient;

        const queryParams = getQueryParams(input);
        const requestBody = getBodyParams(input);
        let request = HttpClientRequest.make(method)(
          apiBaseUrl + buildPathFn(input),
        ).pipe(
          HttpClientRequest.setHeader("Authorization", `Bearer ${apiKey}`),
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
          return yield* matchApiError(
            response.status,
            errorBody,
          ) as Effect.Effect<never, Errors>;
        }

        // Handle 204 No Content
        if (response.status === 204) {
          return undefined as Output;
        }

        const responseBody = yield* response.json;
        return yield* Schema.decodeUnknownEffect(config.outputSchema)(
          responseBody,
        ).pipe(
          Effect.catchTag("SchemaError", (cause) =>
            Effect.fail(new NeonParseError({ body: responseBody, cause })),
          ),
        ) as Effect.Effect<Output, Errors>;
      });

    // Effect that, when yielded, captures services and returns a requirement-free fn.
    const eff = Effect.map(
      Effect.services(),
      (sm) => (input: Input) => fn(input).pipe(Effect.provide(sm)),
    );

    // Proxy: target is fn (so apply trap works), property access delegates to eff.
    return new Proxy(fn, {
      get(_target, prop, _receiver) {
        return Reflect.get(eff, prop, eff);
      },
      getPrototypeOf() {
        return Object.getPrototypeOf(eff);
      },
      getOwnPropertyDescriptor(_target, prop) {
        return Object.getOwnPropertyDescriptor(eff, prop);
      },
      has(_target, prop) {
        return prop in eff;
      },
    }) as OperationMethod<Input, Output, Errors, Context>;
  },

  /**
   * Creates a paginated operation that returns an Effect for a single page,
   * plus `.pages()` and `.items()` methods for streaming all pages/items.
   *
   * @example
   * ```ts
   * const listProjects = API.makePaginated(() => ({
   *   inputSchema: ListProjectsInput,
   *   outputSchema: ListProjectsOutput,
   *   pagination: { inputToken: "cursor", outputToken: "pagination.cursor", items: "projects" },
   * }));
   *
   * // Single page
   * const page1 = listProjects({});
   *
   * // Stream all pages
   * const allPages = listProjects.pages({});
   *
   * // Stream all items
   * const allProjects = listProjects.items({});
   * ```
   */
  makePaginated: <
    I extends Schema.Top,
    O extends Schema.Top,
    const E extends readonly ApiErrorClass[] = readonly [],
  >(
    configFn: () => PaginatedOperationConfig<I, O, E>,
  ) => {
    const config = configFn();
    const pagination = config.pagination ?? DefaultPaginationTrait;

    // Create the base operation using API.make
    const baseFn = API.make(() => ({
      inputSchema: config.inputSchema,
      outputSchema: config.outputSchema,
      errors: config.errors,
    }));

    type Input = Schema.Schema.Type<I>;
    type Output = Schema.Schema.Type<O>;
    type Context = Credentials | HttpClient.HttpClient;
    // Operation-specific errors + default errors + client errors
    type Errors = InstanceType<E[number]> | DefaultErrors | ClientErrors;

    // Stream all pages (full response objects)
    const pagesFn = (
      input: Omit<Input, "cursor">,
    ): Stream.Stream<Output, Errors, Context> => {
      type State = { cursor: string | undefined; done: boolean };

      const unfoldFn = (state: State) =>
        Effect.gen(function* () {
          if (state.done) {
            return undefined;
          }

          // Build the request with the cursor
          const requestPayload = {
            ...input,
            ...(state.cursor ? { [pagination.inputToken]: state.cursor } : {}),
          } as Input;

          // Make the API call
          const response = yield* baseFn(requestPayload);

          // Extract the next cursor
          const nextCursor = getPath(response, pagination.outputToken) as
            | string
            | null
            | undefined;

          // Return the full page and next state
          const nextState: State = {
            cursor: nextCursor ?? undefined,
            done: nextCursor === null || nextCursor === undefined,
          };

          return [response, nextState] as const;
        });

      return Stream.unfold(
        { cursor: undefined, done: false } as State,
        unfoldFn,
      );
    };

    // Stream individual items from the paginated field
    const itemsFn = (
      input: Omit<Input, "cursor">,
    ): Stream.Stream<
      Output extends PaginatedResponse<infer Item, string> ? Item : unknown,
      Errors,
      Context
    > => {
      return pagesFn(input).pipe(
        Stream.flatMap((page) => {
          const items = getPath(page, pagination.items) as
            | readonly unknown[]
            | undefined;
          return Stream.fromIterable(items ?? []);
        }),
      ) as Stream.Stream<
        Output extends PaginatedResponse<infer Item, string> ? Item : unknown,
        Errors,
        Context
      >;
    };

    // Create the result function with pages and items methods attached
    const result = baseFn as typeof baseFn & {
      pages: typeof pagesFn;
      items: typeof itemsFn;
    };

    result.pages = pagesFn;
    result.items = itemsFn;

    return result;
  },
};

// Re-export error types for convenience
export {
  BadRequest,
  Conflict,
  Forbidden,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
} from "./errors";
