import * as crypto from "node:crypto";
import { InternalServerError } from "@distilled.cloud/core/errors";
import type {
  DeclaredError,
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import { buildRequest, mapKeys } from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * CoinbaseProtocol -- hand-written.
 *
 * Speaks the Coinbase CDP JSON protocol. The generic request/response
 * machinery (trait-driven request building, recursive wire-name mapping)
 * lives in `@distilled.cloud/core/protocol-http`; this module supplies what
 * is Coinbase's own:
 *
 * ## Authentication
 *
 * The Coinbase CDP API uses per-request JWT bearer tokens. The JWT is signed
 * with your CDP API Key Secret (ES256 or Ed25519; parsed and checked once,
 * when the credentials layer is built, see ./credentials.ts) and includes:
 *
 * - `sub`: Your CDP API Key ID
 * - `iss`: "cdp"
 * - `aud`: ["cdp_service"]
 * - `exp`: Current time + 120 seconds
 * - `uri`: "METHOD host/path"
 *
 * Some sensitive wallet operations additionally document an `X-Wallet-Auth`
 * header signed with your Wallet Secret (`Config.walletSecret`); like the
 * distilled v0 client, this module does not generate that header.
 *
 * ## Error Handling
 *
 * Coinbase CDP errors have the shape:
 * ```json
 * {
 *   "errorType": "invalid_request",
 *   "errorMessage": "Invalid request.",
 *   "correlationId": "41deb8d59a9dc9a7-IAD",
 *   "errorLink": "https://docs.cdp.coinbase.com/api-reference/v2/errors#invalid-request"
 * }
 * ```
 *
 * Errors are handled globally (no per-operation error lists), dispatched
 * first by `errorType`, then by HTTP status code. The classes are the
 * service's (`CoinbaseServiceErrors`): the protocol builds one only from
 * the classes the operation lists.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Option from "effect/Option";
import * as Schema from "effect/Schema";
import { Credentials } from "./credentials.ts";
import {
  COINBASE_HTTP_STATUS_MAP,
  CoinbaseParseError,
  type CoinbaseServiceError,
  ERROR_TYPE_MAP,
  STANDARD_ERROR_TYPE_MAP,
  UnknownCoinbaseError,
} from "./errors.ts";
import { sign, type SigningKey } from "./signing.ts";

/**
 * What every generated Coinbase operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, CoinbaseOpError, CoinbaseOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type CoinbaseOpError = CoinbaseServiceError | ErrorOf<typeof CoinbaseProtocol>;

/** Context (requirements) shared by every generated Coinbase operation. */
export type CoinbaseOpContext = Credentials | HttpClient.HttpClient;

/**
 * `cls`, a class of the service's errors, as the operation lists it:
 * `undefined` when `cls` is `undefined` or the operation does not list it
 * (every generated operation lists `CoinbaseServiceErrors`).
 */
const declaredClass = (
  errors: ReadonlyArray<DeclaredErrorClass>,
  cls: unknown,
): DeclaredErrorClass | undefined => errors.find((declared) => declared === cls);

// A numeric view of Coinbase's own status map.
const coinbaseStatusMap: Readonly<Record<number, unknown>> = COINBASE_HTTP_STATUS_MAP;

// ============================================================================
// JWT generation for Coinbase CDP API authentication
// ============================================================================

/**
 * Base64url-encode a buffer.
 */
const base64url = (buf: Buffer | Uint8Array): string =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/**
 * Generate a random hex nonce.
 */
const randomNonce = (): string => crypto.randomBytes(16).toString("hex");

/**
 * Generate a JWT bearer token for Coinbase CDP API authentication.
 *
 * The JWT includes:
 * - header: { alg, kid, typ: "JWT", nonce }
 * - payload: { sub, iss: "cdp", aud, nbf, exp, uri }
 */
const generateJwt = (
  apiKeyId: string,
  signingKey: SigningKey,
  method: string,
  uri: string,
): Effect.Effect<string, SdkError> => {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: signingKey.jwsAlg,
    kid: apiKeyId,
    typ: "JWT",
    nonce: randomNonce(),
  };
  const payload = {
    sub: apiKeyId,
    iss: "cdp",
    aud: ["cdp_service"],
    nbf: now,
    exp: now + 120,
    uri: `${method} ${uri}`,
  };

  // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `header` is four strings: the algorithm, the key id of the credentials, "JWT" and a hex nonce
  const headerB64 = base64url(Buffer.from(JSON.stringify(header)));
  // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `payload` holds only strings and numbers: the key id, constants, the clock and the request's method and URL
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  // The credentials were checked when their layer was built, with a trial
  // signature, so a failure here is not the configuration's.
  return Effect.try({
    try: () => `${signingInput}.${base64url(sign(signingKey, signingInput))}`,
    catch: (cause) =>
      new SdkError({
        message: `Could not sign the ${signingKey.jwsAlg} JWT: ${cause instanceof Error ? cause.message : String(cause)}`,
      }),
  });
};

// ============================================================================
// Error response parsing
// ============================================================================

/**
 * Coinbase CDP API Error Response Schema.
 *
 * All Coinbase CDP errors have the same envelope:
 * { errorType, errorMessage, correlationId?, errorLink? }
 */
const CoinbaseErrorResponse = /*@__PURE__*/ Schema.Struct({
  errorType: Schema.String,
  errorMessage: Schema.String,
  correlationId: /*@__PURE__*/ Schema.optional(Schema.String),
  errorLink: /*@__PURE__*/ Schema.optional(Schema.String),
});

/**
 * Match a Coinbase CDP API error response to the appropriate typed error
 * class. Ported from the distilled v0 client's `matchError`.
 *
 * Dispatches errors by:
 * 1. The `errorType` field for Coinbase-specific errors (e.g., "already_exists", "policy_violation")
 * 2. The `errorType` field for standard errors mapped to core classes (e.g., "not_found" -> NotFound)
 * 3. Standard HTTP status codes mapped from core (400, 401, 403, 404, etc.)
 * 4. Coinbase-specific HTTP status codes (402)
 * 5. Falls back to UnknownCoinbaseError for unrecognized errors
 *
 * Steps 1 to 4 build a class of the service's errors, taken from `errors`
 * (the classes the operation lists).
 */
const matchError = (
  errors: ReadonlyArray<DeclaredErrorClass>,
  status: number,
  errorBody: unknown,
  headers?: Record<string, string | undefined>,
): Effect.Effect<never, DeclaredError | InternalServerError | UnknownCoinbaseError> => {
  // A body that is not Coinbase's error shape (a proxy page, an empty body)
  // still maps by HTTP status below.
  const parsed = Option.getOrUndefined(
    Schema.decodeUnknownOption(CoinbaseErrorResponse)(errorBody),
  );
  // Without the envelope, the start of the raw body is the best message.
  const message =
    parsed?.errorMessage ??
    // oxlint-disable-next-line distilled/no-unguarded-throwing-builtin -- `errorBody` is what `JSON.parse` returned in `decode` (or the body text, or `undefined`), which always serializes
    (typeof errorBody === "string" ? errorBody : (JSON.stringify(errorBody) ?? "")).slice(0, 200);
  const errorProps = {
    errorType: parsed?.errorType,
    errorMessage: parsed?.errorMessage,
    correlationId: parsed?.correlationId,
    errorLink: parsed?.errorLink,
  };

  if (parsed) {
    // 1. Match by Coinbase-specific error type first
    const TypedErrorClass = declaredClass(errors, ERROR_TYPE_MAP[parsed.errorType]);
    if (TypedErrorClass) {
      return Effect.fail(new TypedErrorClass(errorProps));
    }

    // 2. Match standard error types to core HTTP error classes
    // Maps error types like "not_found", "forbidden", "unauthorized",
    // "invalid_request", "rate_limit_exceeded", "internal_server_error",
    // "bad_gateway", "service_unavailable" to core HTTP error classes.
    const StandardErrorClass = declaredClass(errors, STANDARD_ERROR_TYPE_MAP[parsed.errorType]);
    if (StandardErrorClass) {
      return Effect.fail(
        new StandardErrorClass({
          message: parsed.errorMessage ?? "",
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }
  }

  // 3. Fall back to HTTP status code mapping from core
  const CoreErrorClass = declaredStatusClass(status, errors);
  if (CoreErrorClass) {
    return Effect.fail(
      new CoreErrorClass({
        message,
        retryAfter: parseRetryAfterForStatus(status, headers),
      }),
    );
  }

  // 4. Coinbase-specific HTTP status codes (402)
  const CoinbaseErrorClass = declaredClass(errors, coinbaseStatusMap[status]);
  if (CoinbaseErrorClass) {
    return Effect.fail(new CoinbaseErrorClass(errorProps));
  }

  // 5. Unmapped 5xx -> retryable server error, as in core's REST protocol.
  if (status >= 500) {
    return Effect.fail(
      new InternalServerError({
        message: message || `HTTP ${status}`,
        retryAfter: parseRetryAfterForStatus(status, headers),
      }),
    );
  }

  // 6. Fall back to unknown error
  return Effect.fail(
    new UnknownCoinbaseError({
      status,
      code: parsed?.errorType,
      message: parsed?.errorMessage,
      ...errorProps,
      body: errorBody,
    }),
  );
};

// ============================================================================
// Protocol
// ============================================================================

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request instead.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    // The Credentials service holds an effect -- resolving it here (per
    // request) picks up rotations.
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials;

    // Sensitive input members accept string | Redacted<string>; the wire
    // wants the raw string.
    const request = yield* buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
    });

    // JWT `uri` claim: "METHOD host/path" -- label-substituted path, no query
    // string (matches the v0 client: baseUrl.host + baseUrl.pathname +
    // parts.path). The base URL was checked with the credentials.
    if (!URL.canParse(request.url)) {
      return yield* new SdkError({ message: `Could not read the request URL ${request.url}` });
    }
    const url = new URL(request.url);
    const jwt = yield* generateJwt(
      creds.apiKeyId,
      creds.signingKey,
      request.method,
      `${url.host}${url.pathname}`,
    );
    return request.pipe(HttpClientRequest.setHeader("Authorization", `Bearer ${jwt}`));
  });

const decode = ({ response, outputAst, errors }: DecodeArgs) =>
  Effect.gen(function* () {
    const text = (yield* response.text) ?? "";
    let json: unknown;
    let nonJson = false;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    // Only a 2xx status succeeds. x402 verify/settle return a 2xx with
    // `isValid: false` / `success: false` as a result; their 400 rejection
    // bodies carry the same keys and are errors.
    if (status < 200 || status >= 300) {
      return yield* matchError(errors, status, json, headers);
    }

    // No envelope: the response body IS the payload, mapped onto the output
    // schema (wire names -> TS names), with members marked T.SensitiveValue
    // delivered as Redacted. Strict mode (core/response-validation) checks
    // the mapped body against the output schema first, and parse errors
    // withhold a body that can hold a secret (core `validateSuccess`).
    return yield* validateSuccess(
      outputAst,
      {
        value: mapKeys(outputAst, json === undefined ? {} : json, "decode"),
        body: json ?? text,
        nonJson,
      },
      (info) => new CoinbaseParseError(info),
    );
  });

const coinbaseProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

/**
 * Coinbase CDP protocol.
 *
 * Uses JWT bearer token authentication signed per request with your CDP API
 * Key Secret.
 */
export const CoinbaseProtocol: ProtocolOf<typeof coinbaseProtocolMethods> = coinbaseProtocolMethods;
