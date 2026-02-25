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
  AccountLimitExceeded,
  AlreadyExists,
  BadGateway,
  DocumentVerificationFailed,
  ERROR_CODE_MAP,
  FaucetLimitExceeded,
  Forbidden,
  GuestPermissionDenied,
  GuestRegionForbidden,
  GuestTransactionCount,
  GuestTransactionLimit,
  IdempotencyError,
  InternalServerError,
  InvalidRequest,
  InvalidSignature,
  InvalidSqlQuery,
  MalformedTransaction,
  MfaAlreadyEnrolled,
  MfaFlowExpired,
  MfaInvalidCode,
  MfaNotEnrolled,
  MfaRequired,
  NetworkNotTradable,
  NotFound,
  PaymentMethodRequired,
  PhoneNumberVerificationExpired,
  PolicyInUse,
  PolicyViolation,
  RateLimitExceeded,
  RecipientAllowlistPending,
  RecipientAllowlistViolation,
  RequestCanceled,
  ServiceUnavailable,
  TimedOut,
  TransferAmountOutOfBounds,
  TransferQuoteExpired,
  TransferRecipientAddressInvalid,
  TravelRulesRecipientViolation,
  Unauthorized,
} from "./errors";
import {
  type PaginatedTrait,
  DefaultPaginationTrait,
  getPath,
} from "./pagination";
import * as Traits from "./traits";

// ============================================================================
// JWT Signing
// ============================================================================

/**
 * Normalize a PEM string that may contain literal `\n` escape sequences
 * (common when read from .env files) into real newlines.
 */
const normalizePem = (pem: string): string => pem.replace(/\\n/g, "\n").trim();

/**
 * Encode a DER length using ASN.1 BER definite-length encoding.
 */
const derLength = (len: number): Uint8Array => {
  if (len < 0x80) return new Uint8Array([len]);
  if (len < 0x100) return new Uint8Array([0x81, len]);
  return new Uint8Array([0x82, (len >> 8) & 0xff, len & 0xff]);
};

/**
 * Wrap a payload in an ASN.1 tag + length + value.
 */
const derWrap = (tag: number, payload: Uint8Array): Uint8Array => {
  const len = derLength(payload.length);
  const result = new Uint8Array(1 + len.length + payload.length);
  result[0] = tag;
  result.set(len, 1);
  result.set(payload, 1 + len.length);
  return result;
};

/**
 * AlgorithmIdentifier for EC P-256 (id-ecPublicKey + prime256v1):
 *   SEQUENCE {
 *     OID 1.2.840.10045.2.1 (id-ecPublicKey)
 *     OID 1.2.840.10045.3.1.7 (prime256v1)
 *   }
 */
const EC_P256_ALGORITHM_ID = new Uint8Array([
  0x30,
  0x13,
  0x06,
  0x07,
  0x2a,
  0x86,
  0x48,
  0xce,
  0x3d,
  0x02,
  0x01, // id-ecPublicKey
  0x06,
  0x08,
  0x2a,
  0x86,
  0x48,
  0xce,
  0x3d,
  0x03,
  0x01,
  0x07, // prime256v1
]);

/**
 * Convert a SEC1 EC private key PEM (`BEGIN EC PRIVATE KEY`) to
 * PKCS#8 PEM (`BEGIN PRIVATE KEY`) by wrapping the DER body in
 * the PKCS#8 PrivateKeyInfo envelope for P-256.
 *
 * PKCS#8 PrivateKeyInfo structure:
 *   SEQUENCE {
 *     INTEGER 0              -- version
 *     AlgorithmIdentifier    -- EC P-256
 *     OCTET STRING { ... }   -- SEC1 private key DER
 *   }
 *
 * If the key is already in PKCS#8 format, it is returned as-is.
 */
const ensurePkcs8 = (pem: string): string => {
  const normalized = normalizePem(pem);

  // Already PKCS#8 — nothing to do
  if (normalized.includes("-----BEGIN PRIVATE KEY-----")) {
    return normalized;
  }

  // Extract base64 body from SEC1 PEM
  const b64 = normalized
    .replace(/-----BEGIN EC PRIVATE KEY-----/, "")
    .replace(/-----END EC PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");

  const sec1Der = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

  // Build PKCS#8 PrivateKeyInfo DER
  const version = new Uint8Array([0x02, 0x01, 0x00]); // INTEGER 0
  const octetString = derWrap(0x04, sec1Der); // OCTET STRING { SEC1 }

  // Inner content = version + algorithmId + octetString
  const innerLen =
    version.length + EC_P256_ALGORITHM_ID.length + octetString.length;
  const inner = new Uint8Array(innerLen);
  inner.set(version, 0);
  inner.set(EC_P256_ALGORITHM_ID, version.length);
  inner.set(octetString, version.length + EC_P256_ALGORITHM_ID.length);

  const pkcs8Der = derWrap(0x30, inner); // SEQUENCE { ... }

  // Encode to base64 and wrap as PKCS#8 PEM
  const pkcs8B64 = btoa(String.fromCharCode(...pkcs8Der));
  const lines = pkcs8B64.match(/.{1,64}/g) ?? [];
  return `-----BEGIN PRIVATE KEY-----\n${lines.join("\n")}\n-----END PRIVATE KEY-----`;
};

/**
 * Import an ES256 private key that may be in SEC1 or PKCS#8 PEM format.
 */
const importPrivateKey = async (pem: string): Promise<CryptoKey> => {
  const { importPKCS8 } = await import("jose");
  const pkcs8Pem = ensurePkcs8(pem);
  return importPKCS8(pkcs8Pem, "ES256");
};

/**
 * Generate a JWT token for Coinbase CDP API authentication.
 * Uses ES256 (ECDSA with P-256 curve and SHA-256).
 */
const generateJwt = (
  apiKeyId: string,
  apiKeySecret: string,
  uri: string,
): Effect.Effect<string, Error> =>
  Effect.tryPromise({
    try: async () => {
      const { SignJWT } = await import("jose");

      const privateKey = await importPrivateKey(apiKeySecret);

      const now = Math.floor(Date.now() / 1000);
      const nonce = crypto.randomUUID();

      const jwt = await new SignJWT({
        sub: apiKeyId,
        iss: "cdp",
        aud: ["cdp_service"],
        uris: [uri],
      })
        .setProtectedHeader({
          alg: "ES256",
          kid: apiKeyId,
          nonce,
          typ: "JWT",
        })
        .setIssuedAt(now)
        .setNotBefore(now)
        .setExpirationTime(now + 120) // 2 minutes
        .sign(privateKey);

      return jwt;
    },
    catch: (error) =>
      new Error(
        `Failed to generate JWT: ${error instanceof Error ? error.message : String(error)}`,
      ),
  });

/**
 * Generate a wallet auth JWT for sensitive wallet operations (X-Wallet-Auth header).
 */
const generateWalletJwt = (
  walletSecret: string,
): Effect.Effect<string, Error> =>
  Effect.tryPromise({
    try: async () => {
      const { SignJWT } = await import("jose");

      const privateKey = await importPrivateKey(walletSecret);

      const now = Math.floor(Date.now() / 1000);

      const jwt = await new SignJWT({})
        .setProtectedHeader({
          alg: "ES256",
          typ: "JWT",
        })
        .setIssuedAt(now)
        .setNotBefore(now)
        .setExpirationTime(now + 120)
        .sign(privateKey);

      return jwt;
    },
    catch: (error) =>
      new Error(
        `Failed to generate wallet JWT: ${error instanceof Error ? error.message : String(error)}`,
      ),
  });

// ============================================================================
// API Error Response Schema
// ============================================================================

// Coinbase error response: { errorType: string, errorMessage: string, ... }
const ApiErrorResponse = Schema.Struct({
  errorType: Schema.String,
  errorMessage: Schema.optional(Schema.String),
});

// Re-export traits for convenience
export const ApiErrorCode = Traits.apiErrorCodeSymbol;

// Type for HTTP methods
export type HttpMethod = Traits.HttpMethod;

// Generic API Error - uncategorized fallback for unknown API error codes
export class CoinbaseApiError extends Schema.TaggedErrorClass<CoinbaseApiError>()(
  "CoinbaseApiError",
  {
    errorType: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class CoinbaseParseError extends Schema.TaggedErrorClass<CoinbaseParseError>()(
  "CoinbaseParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Status code to error class fallback map.
 * Used when the response body is not JSON or the errorType is unknown.
 */
const STATUS_CODE_MAP: Record<
  number,
  (typeof ERROR_CODE_MAP)[keyof typeof ERROR_CODE_MAP]
> = {
  400: InvalidRequest,
  401: Unauthorized,
  403: Forbidden,
  404: NotFound,
  409: AlreadyExists,
  429: RateLimitExceeded,
  500: InternalServerError,
  502: BadGateway,
  503: ServiceUnavailable,
};

/**
 * Match an API error response to the appropriate error class.
 * Uses errorType from JSON body first, then falls back to HTTP status code.
 */
const matchApiError = (
  errorBody: unknown,
  status?: number,
): Effect.Effect<
  never,
  | InstanceType<(typeof ERROR_CODE_MAP)[keyof typeof ERROR_CODE_MAP]>
  | CoinbaseApiError
> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass =
      ERROR_CODE_MAP[parsed.errorType as keyof typeof ERROR_CODE_MAP];
    if (ErrorClass) {
      return Effect.fail(
        new ErrorClass({ message: parsed.errorMessage ?? "" }),
      );
    }
    // Fall back to status code if errorType is unknown
    if (status !== undefined) {
      const StatusErrorClass = STATUS_CODE_MAP[status];
      if (StatusErrorClass) {
        return Effect.fail(
          new StatusErrorClass({
            message: parsed.errorMessage ?? `HTTP ${status}`,
          }),
        );
      }
    }
    return Effect.fail(
      new CoinbaseApiError({
        errorType: parsed.errorType,
        message: parsed.errorMessage,
        body: errorBody,
      }),
    );
  } catch {
    // Body wasn't parseable as ApiErrorResponse - fall back to status code
    if (status !== undefined) {
      const StatusErrorClass = STATUS_CODE_MAP[status];
      if (StatusErrorClass) {
        const message =
          typeof errorBody === "string" ? errorBody : `HTTP ${status}`;
        return Effect.fail(new StatusErrorClass({ message }));
      }
    }
    return Effect.fail(new CoinbaseApiError({ body: errorBody }));
  }
};

// ============================================================================
// Error Types
// ============================================================================

/**
 * Base API error type - any error class that can appear in an operation's `errors` tuple.
 * Includes all known Coinbase API error types from the ErrorType enum.
 */
export type ApiErrorClass =
  | typeof Unauthorized
  | typeof Forbidden
  | typeof NotFound
  | typeof AlreadyExists
  | typeof InvalidRequest
  | typeof InvalidSignature
  | typeof MalformedTransaction
  | typeof InvalidSqlQuery
  | typeof IdempotencyError
  | typeof PaymentMethodRequired
  | typeof RateLimitExceeded
  | typeof FaucetLimitExceeded
  | typeof AccountLimitExceeded
  | typeof InternalServerError
  | typeof BadGateway
  | typeof ServiceUnavailable
  | typeof TimedOut
  | typeof RequestCanceled
  | typeof PolicyViolation
  | typeof PolicyInUse
  | typeof NetworkNotTradable
  | typeof GuestPermissionDenied
  | typeof GuestRegionForbidden
  | typeof GuestTransactionLimit
  | typeof GuestTransactionCount
  | typeof PhoneNumberVerificationExpired
  | typeof DocumentVerificationFailed
  | typeof RecipientAllowlistViolation
  | typeof RecipientAllowlistPending
  | typeof TravelRulesRecipientViolation
  | typeof TransferAmountOutOfBounds
  | typeof TransferRecipientAddressInvalid
  | typeof TransferQuoteExpired
  | typeof MfaAlreadyEnrolled
  | typeof MfaInvalidCode
  | typeof MfaFlowExpired
  | typeof MfaRequired
  | typeof MfaNotEnrolled;

/**
 * Default errors that apply to ALL operations.
 */
export const DEFAULT_ERRORS = [
  Unauthorized,
  RateLimitExceeded,
  InternalServerError,
  BadGateway,
  ServiceUnavailable,
] as const;

export type DefaultErrors = InstanceType<(typeof DEFAULT_ERRORS)[number]>;

/**
 * Client-level errors that can occur for any operation.
 */
export type ClientErrors =
  | CoinbaseApiError
  | CoinbaseParseError
  | HttpClientError.HttpClientError
  | HttpBody.HttpBodyError;

// ============================================================================
// Operation Configuration
// ============================================================================

interface OperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> {
  inputSchema: I;
  outputSchema: O;
  errors?: E;
  /** Whether this operation requires wallet auth (X-Wallet-Auth header) */
  walletAuth?: boolean;
}

interface PaginatedOperationConfig<
  I extends Schema.Top,
  O extends Schema.Top,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> extends OperationConfig<I, O, E> {
  pagination?: PaginatedTrait;
}

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
    type Errors = InstanceType<E[number]> | DefaultErrors | ClientErrors;

    // Read HTTP trait from input schema annotations
    const httpTrait = Traits.getHttpTrait(config.inputSchema.ast);

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
      if (method === "GET" || method === "DELETE") return undefined;
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
        const { apiKeyId, apiKeySecret, walletSecret, apiBaseUrl } =
          yield* Credentials;
        const client = yield* HttpClient.HttpClient;

        const requestUrl = apiBaseUrl + buildPathFn(input);

        // Build the URI claim for the JWT: "{METHOD} {host}{path}" (no scheme)
        const parsedUrl = new URL(requestUrl);
        const jwtUri = `${method} ${parsedUrl.host}${parsedUrl.pathname}`;

        // Generate JWT for API auth
        const jwt = yield* generateJwt(apiKeyId, apiKeySecret, jwtUri).pipe(
          Effect.catch((e) =>
            Effect.fail(
              new CoinbaseApiError({
                errorType: "jwt_signing_failed",
                message: e.message,
                body: null,
              }),
            ),
          ),
        );

        const queryParams = getQueryParams(input);
        const requestBody = getBodyParams(input);
        let request = HttpClientRequest.make(method)(requestUrl).pipe(
          HttpClientRequest.setHeader("Authorization", `Bearer ${jwt}`),
          HttpClientRequest.setHeader("Content-Type", "application/json"),
        );

        // Add wallet auth header if needed
        if (config.walletAuth && walletSecret) {
          const walletJwt = yield* generateWalletJwt(walletSecret).pipe(
            Effect.catch((e) =>
              Effect.fail(
                new CoinbaseApiError({
                  errorType: "wallet_jwt_signing_failed",
                  message: e.message,
                  body: null,
                }),
              ),
            ),
          );
          request = HttpClientRequest.setHeader(
            request,
            "X-Wallet-Auth",
            walletJwt,
          );
        }

        if (queryParams) {
          request = HttpClientRequest.setUrlParams(request, queryParams);
        }
        if (requestBody) {
          request = yield* HttpClientRequest.bodyJson(requestBody)(request);
        }

        return yield* client.execute(request).pipe(
          Effect.flatMap((response) =>
            Effect.gen(function* () {
              if (response.status >= 400) {
                // Try to parse as JSON; fall back to plain text body
                const errorBody = yield* response.json.pipe(
                  Effect.catch(() =>
                    response.text.pipe(
                      Effect.map((text) => ({
                        errorType: "unknown",
                        errorMessage: text,
                      })),
                    ),
                  ),
                );
                return yield* matchApiError(
                  errorBody,
                  response.status,
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
                    new CoinbaseParseError({ body: responseBody, cause }),
                  ),
                ),
              ) as Effect.Effect<Output, Errors>;
            }),
          ),
          Effect.scoped,
        );
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
   * Uses cursor-based pagination (pageToken/nextPageToken).
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

    const baseFn = API.make(() => ({
      inputSchema: config.inputSchema,
      outputSchema: config.outputSchema,
      errors: config.errors,
      walletAuth: config.walletAuth,
    }));

    type Input = Schema.Schema.Type<I>;
    type Output = Schema.Schema.Type<O>;
    type Context = Credentials | HttpClient.HttpClient;
    type Errors = InstanceType<E[number]> | DefaultErrors | ClientErrors;

    // Stream all pages (full response objects)
    const pagesFn = (
      input: Omit<Input, "pageToken">,
    ): Stream.Stream<Output, Errors, Context> => {
      type State = { pageToken: string | undefined; done: boolean };

      const unfoldFn = (state: State) =>
        Effect.gen(function* () {
          if (state.done) {
            return undefined;
          }

          const requestPayload = {
            ...input,
            ...(state.pageToken
              ? { [pagination.inputToken]: state.pageToken }
              : {}),
          } as Input;

          const response = yield* baseFn(requestPayload);

          const nextPageToken = getPath(response, pagination.outputToken) as
            | string
            | undefined;

          const nextState: State = {
            pageToken: nextPageToken,
            done: !nextPageToken || nextPageToken === "",
          };

          return [response, nextState] as const;
        });

      return Stream.unfold(
        { pageToken: undefined, done: false } as State,
        unfoldFn,
      );
    };

    // Stream individual items from the paginated field
    const itemsFn = (
      input: Omit<Input, "pageToken">,
    ): Stream.Stream<unknown, Errors, Context> => {
      return pagesFn(input).pipe(
        Stream.flatMap((page) => {
          const items = getPath(page, pagination.items) as
            | readonly unknown[]
            | undefined;
          return Stream.fromIterable(items ?? []);
        }),
      );
    };

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
  AccountLimitExceeded,
  AlreadyExists,
  BadGateway,
  DocumentVerificationFailed,
  FaucetLimitExceeded,
  Forbidden,
  GuestPermissionDenied,
  GuestRegionForbidden,
  GuestTransactionCount,
  GuestTransactionLimit,
  IdempotencyError,
  InternalServerError,
  InvalidRequest,
  InvalidSignature,
  InvalidSqlQuery,
  MalformedTransaction,
  MfaAlreadyEnrolled,
  MfaFlowExpired,
  MfaInvalidCode,
  MfaNotEnrolled,
  MfaRequired,
  NetworkNotTradable,
  NotFound,
  PaymentMethodRequired,
  PhoneNumberVerificationExpired,
  PolicyInUse,
  PolicyViolation,
  RateLimitExceeded,
  RecipientAllowlistPending,
  RecipientAllowlistViolation,
  RequestCanceled,
  ServiceUnavailable,
  TimedOut,
  TransferAmountOutOfBounds,
  TransferQuoteExpired,
  TransferRecipientAddressInvalid,
  TravelRulesRecipientViolation,
  Unauthorized,
} from "./errors";
