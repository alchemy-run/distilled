import * as Effect from "effect/Effect";
import { pipeArguments } from "effect/Pipeable";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as HttpBody from "effect/unstable/http/HttpBody";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import { SingleShotGen } from "effect/Utils";
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

// API Error Response Schema - Prisma Postgres wraps errors in { error: { code, message, hint? } }
const ApiErrorResponse = Schema.Struct({
  error: Schema.Struct({
    code: Schema.optional(Schema.String),
    message: Schema.String,
    hint: Schema.optional(Schema.String),
  }),
});

// Re-export traits for convenience (backwards compatibility)
export const ApiErrorCode = Traits.apiErrorCodeSymbol;

// Type for HTTP methods
export type HttpMethod = Traits.HttpMethod;

// Generic API Error - uncategorized fallback for unknown API error codes
export class PrismaPostgresApiError extends Schema.TaggedErrorClass<PrismaPostgresApiError>()(
  "PrismaPostgresApiError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    hint: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class PrismaPostgresParseError extends Schema.TaggedErrorClass<PrismaPostgresParseError>()(
  "PrismaPostgresParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Match an API error response to the appropriate error class based on HTTP status.
 * Prisma Postgres errors are nested: { error: { code, message, hint? } }
 * Returns the typed error or falls back to PrismaPostgresApiError.
 */
const matchApiError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<
  never,
  | InstanceType<(typeof HTTP_STATUS_MAP)[keyof typeof HTTP_STATUS_MAP]>
  | PrismaPostgresApiError
> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
    if (ErrorClass) {
      return Effect.fail(
        new ErrorClass({ message: parsed.error.message ?? "" }),
      );
    }
    return Effect.fail(
      new PrismaPostgresApiError({
        code: parsed.error.code,
        message: parsed.error.message,
        hint: parsed.error.hint,
        body: errorBody,
      }),
    );
  } catch {
    // If we can't parse the nested error format, try a flat format or fall back
    try {
      const flat = errorBody as { message?: string; code?: string };
      return Effect.fail(
        new PrismaPostgresApiError({
          code: flat?.code,
          message: flat?.message,
          body: errorBody,
        }),
      );
    } catch {
      return Effect.fail(new PrismaPostgresApiError({ body: errorBody }));
    }
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
  | PrismaPostgresApiError
  | PrismaPostgresParseError
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

    // Read HTTP trait from input schema annotations
    const httpTrait = Traits.getHttpTrait(config.inputSchema.ast);

    // Determine method, path template, and path params
    const method = httpTrait?.method;
    const pathTemplate = httpTrait?.path;
    const pathParams = httpTrait
      ? Traits.getPathParams(config.inputSchema.ast)
      : [];

    if (!method) {
      throw new Error("Input schema must have Http trait");
    }
    if (!pathTemplate) {
      throw new Error("Input schema must have Http trait with path");
    }

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
            Effect.fail(
              new PrismaPostgresParseError({ body: responseBody, cause }),
            ),
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

  /**
   * Creates a paginated operation that returns an Effect for a single page,
   * plus `.pages()` and `.items()` methods for streaming all pages/items.
   *
   * @example
   * ```ts
   * const getV1Projects = API.makePaginated(() => ({
   *   inputSchema: GetV1ProjectsInput,
   *   outputSchema: GetV1ProjectsOutput,
   *   pagination: { inputToken: "cursor", outputToken: "pagination.nextCursor", items: "data" },
   * }));
   *
   * // Single page
   * const page1 = getV1Projects({});
   *
   * // Stream all pages
   * const allPages = getV1Projects.pages({});
   *
   * // Stream all items
   * const allProjects = getV1Projects.items({});
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
