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
 * import { API } from "@distilled.cloud/core/client";
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
 * A paginated operation that additionally has `.pages()` and `.items()` methods.
 */
export type PaginatedOperationMethod<I, A, E, R> = OperationMethod<
  I,
  A,
  E,
  R
> & {
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
  matchError: (
    status: number,
    body: unknown,
    errors?: readonly ApiErrorClass[],
  ) => Effect.Effect<never, unknown>;

  /** Parse error class for schema decode failures */
  ParseError: new (props: { body: unknown; cause: unknown }) => unknown;

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
export interface OperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> {
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
export interface PaginatedOperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> extends OperationConfig<I, O, E> {
  pagination?: PaginatedTrait;
}

// ============================================================================
// AST Helpers
// ============================================================================

/**
 * Check if a schema AST represents an array type.
 * Follows encoding chains and Suspend wrappers.
 */
function isArrayAST(ast: AST.AST): boolean {
  if (ast._tag === "Arrays") return true;
  if (ast._tag === "Suspend") return isArrayAST(ast.thunk());
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
function isFileOrBlob(value: unknown): value is File | Blob {
  return (
    (typeof File !== "undefined" && value instanceof File) ||
    (typeof Blob !== "undefined" && value instanceof Blob)
  );
}

/**
 * Build a FormData from a record of body properties.
 * Handles files/blobs, arrays of files, objects (as JSON blobs), and primitives.
 *
 * This is used for multipart operations (e.g., Cloudflare Workers script uploads)
 * where the body contains a mix of metadata objects and file uploads.
 */
function buildFormData(body: Record<string, unknown>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) continue;

    if (isFileOrBlob(value)) {
      // Single file/blob
      formData.append(key, value, value instanceof File ? value.name : key);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      isFileOrBlob(value[0])
    ) {
      // Array of files/blobs — append each individually
      for (const file of value) {
        if (isFileOrBlob(file)) {
          formData.append(
            file instanceof File ? file.name : key,
            file,
            file instanceof File ? file.name : undefined,
          );
        }
      }
    } else if (typeof value === "object" && value !== null) {
      // Object → append as JSON blob
      formData.append(
        key,
        new Blob([JSON.stringify(value)], { type: "application/json" }),
        key,
      );
    } else {
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
export const makeAPI = <Creds>(config: ClientConfig<Creds>) => {
  type _ClientErrors = HttpClientError.HttpClientError | HttpBody.HttpBodyError;

  return {
    make: <
      I extends Schema.Top,
      O extends Schema.Top,
      const E extends readonly ApiErrorClass[] = readonly [],
    >(
      configFn: () => OperationConfig<I, O, E>,
    ): any => {
      const opConfig = configFn();
      // Support both input/output and inputSchema/outputSchema aliases
      const inputSchema = (opConfig.inputSchema ?? opConfig.input)!;
      const outputSchema = (opConfig.outputSchema ?? opConfig.output)!;
      type Input = Schema.Schema.Type<I>;

      // Read HTTP trait from input schema annotations
      const httpTrait = Traits.getHttpTrait(inputSchema.ast);

      if (!httpTrait) {
        throw new Error("Input schema must have Http trait");
      }

      const method = httpTrait.method;

      const fn = (input: Input): Effect.Effect<any, any, any> =>
        Effect.gen(function* () {
          const creds = yield* config.credentials as any;
          const client = yield* HttpClient.HttpClient;

          const baseUrl = config.getBaseUrl(creds as Creds);
          const authHeaders = config.getAuthHeaders(creds as Creds);

          // Use schema-aware request builder for proper camelCase → wire_name mapping
          const parts = Traits.buildRequestParts(
            inputSchema.ast,
            httpTrait,
            input as Record<string, unknown>,
            inputSchema,
          );

          let request = HttpClientRequest.make(method)(
            baseUrl + parts.path,
          ).pipe(
            HttpClientRequest.setHeaders(authHeaders),
            HttpClientRequest.setHeaders(parts.headers),
            HttpClientRequest.setHeader("Accept", "application/json"),
          );

          // Set Content-Type based on body type (skip for FormData — browser sets boundary)
          if (!parts.isMultipart) {
            request = HttpClientRequest.setHeader(
              "Content-Type",
              "application/json",
            )(request);
          }

          if (Object.keys(parts.query).length > 0) {
            request = HttpClientRequest.setUrlParams(request, parts.query);
          }
          if (method !== "GET" && parts.body !== undefined) {
            if (parts.isMultipart) {
              // Build FormData from body properties for multipart operations
              const formData = buildFormData(
                parts.body as Record<string, unknown>,
              );
              request = HttpClientRequest.setBody(HttpBody.formData(formData))(
                request,
              );
            } else {
              request = yield* HttpClientRequest.bodyJson(parts.body)(request);
            }
          } else if (method === "GET" && parts.body !== undefined) {
            // For GET requests, remaining non-annotated fields go as query params
            const extraQuery: Record<string, string> = {};
            for (const [key, value] of Object.entries(
              parts.body as Record<string, unknown>,
            )) {
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
            const errorBody = yield* response.json.pipe(
              Effect.catchIf(
                () => true,
                () =>
                  response.text.pipe(
                    Effect.map(
                      (text) =>
                        ({ _nonJsonError: true, body: text }) as unknown,
                    ),
                    Effect.catchIf(
                      () => true,
                      () =>
                        Effect.succeed({
                          _nonJsonError: true,
                          body: `HTTP ${response.status}`,
                        } as unknown),
                    ),
                  ),
              ),
            );
            return yield* config.matchError(
              response.status,
              errorBody,
              opConfig.errors,
            );
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
          const rawBody = yield* response.json.pipe(
            Effect.catchIf(
              () => true,
              () => response.text.pipe(Effect.map((text) => text as unknown)),
            ),
          );
          let responseBody = config.transformResponse
            ? config.transformResponse(rawBody)
            : rawBody;

          // Handle Cloudflare-style paginated responses where result is
          // { items: [...] } but the schema expects an array
          if (
            isArrayAST(outputSchema.ast) &&
            !Array.isArray(responseBody) &&
            typeof responseBody === "object" &&
            responseBody !== null &&
            "items" in responseBody &&
            Array.isArray((responseBody as Record<string, unknown>).items)
          ) {
            responseBody = (responseBody as Record<string, unknown>).items;
          }

          return yield* Schema.decodeUnknownEffect(outputSchema)(
            responseBody,
          ).pipe(
            Effect.catchTag("SchemaError", (cause) =>
              Effect.fail(new config.ParseError({ body: rawBody, cause })),
            ),
          );
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
      paginateFn?: (
        baseFn: (input: any) => Effect.Effect<any, any, any>,
        input: any,
        pagination: PaginatedTrait,
      ) => Stream.Stream<any, any, any>,
    ): any => {
      const opConfig = configFn();
      const pagination = opConfig.pagination!;

      // Create the base operation
      const baseFn = makeAPI(config).make(() => ({
        inputSchema: opConfig.inputSchema ?? opConfig.input,
        outputSchema: opConfig.outputSchema ?? opConfig.output,
        errors: opConfig.errors,
      }));

      type Input = Schema.Schema.Type<I>;

      // Default pagination: token-based (works for Cloudflare/GCP style)
      const defaultPaginateFn = (
        op: (input: any) => Effect.Effect<any, any, any>,
        input: any,
        pag: PaginatedTrait,
      ): Stream.Stream<any, any, any> => {
        type State = { token: unknown; done: boolean };
        return Stream.unfold(
          { token: undefined, done: false } as State,
          (state: State) =>
            Effect.gen(function* () {
              if (state.done) return undefined;
              const requestPayload =
                state.token !== undefined
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
              ] as const;
            }),
        );
      };

      const paginate = paginateFn ?? defaultPaginateFn;

      // Stream all pages
      const pagesFn = (input: Omit<Input, string>) =>
        paginate(baseFn, input, pagination);

      // Stream individual items
      const itemsFn = (input: Omit<Input, string>) =>
        pagesFn(input).pipe(
          Stream.flatMap((page) => {
            if (!pagination.items) return Stream.make(page);
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
