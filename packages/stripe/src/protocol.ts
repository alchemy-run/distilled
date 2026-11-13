import * as API from "@distilled.cloud/core/api";
import {
  ConfigError,
  HTTP_STATUS_MAP,
  InternalServerError,
  type DefaultErrors as CoreDefaultErrors,
  BadRequest,
  Conflict,
  Forbidden,
  Locked,
  NotFound,
  UnprocessableEntity,
  type InvalidInput,
} from "@distilled.cloud/core/errors";
import {
  buildRequest,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import { checkSuccess, unwrapRedactedDeep } from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Telemetry from "@distilled.cloud/core/telemetry";
/**
 * StripeProtocol -- hand-written.
 *
 * Speaks Stripe's REST protocol. The generic trait helpers live in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Stripe's own (ported from the distilled v0 stripe client):
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + API base URL;
 *             per-call {@link StripeRequestOptions} (resolved from the
 *             calling fiber via {@link RequestOptions}) -> Idempotency-Key /
 *             Stripe-Account / Stripe-Context / Stripe-Version headers;
 *             core's `buildRequest` with `queryStyle: "brackets"` builds
 *             the rest: query members as `created[gte]=1` / `expand[0]=a`,
 *             bodies as `application/x-www-form-urlencoded` with the same
 *             brackets (`shipping[address][city]=SF`) when the operation's
 *             `T.Http` trait says `contentType: "form-urlencoded"` (every
 *             /v1 op), as JSON otherwise (the /v2 ops), and as multipart
 *             form-data for `contentType: "multipart"` (POST /v1/files)
 *
 *   response: 2xx JSON is the payload (no envelope) -> wire->TS key mapping ->
 *             Redacted wrapping of sensitive members; failures parse the
 *             `{ error: { type, code, message, ... } }` envelope and dispatch
 *             by per-op matcher classes first (`matchTypedError`, e.g.
 *             ProductHasPrices), then `error.type` (card_error -> CardError,
 *             idempotency_error -> IdempotencyError, invalid_request_error ->
 *             InvalidRequestError, api_error -> ApiError), then the
 *             Stripe-specific status map (402 -> PaymentError, 424 ->
 *             ExternalDependencyFailed), then core's HTTP status map (with
 *             retryAfter hints), then UnknownStripeError.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials, type Config } from "./credentials.ts";
import {
  ApiError,
  CardError,
  ExternalDependencyFailed,
  IdempotencyError,
  InvalidRequestError,
  PaymentError,
  STRIPE_HTTP_STATUS_MAP,
  StripeParseError,
  UnknownStripeError,
} from "./errors.ts";

// =============================================================================
// Per-call request options (v0's StripeRequestOptions, fiber-context style)
// =============================================================================

export type StripeConnectRequestOptions =
  | {
      readonly stripeAccount?: string | undefined;
      readonly stripeContext?: never;
    }
  | {
      readonly stripeAccount?: never;
      readonly stripeContext?: string | undefined;
    };

export type StripeRequestOptions = {
  readonly idempotencyKey?: string | undefined;
  readonly apiVersion?: string | undefined;
} & StripeConnectRequestOptions;

/**
 * Per-call request options service. distilled v0 passed these as a second
 * call argument; v1 operations take only their input, so options travel on
 * the calling fiber's context instead -- see {@link withRequestOptions}.
 */
export class RequestOptions
  extends /*@__PURE__*/ Context.Service<RequestOptions, StripeRequestOptions>()(
    "StripeRequestOptions",
  ) {}

/**
 * Provide {@link StripeRequestOptions} to every Stripe API call below it.
 *
 * @example
 * ```ts
 * yield* PostCharges({ amount: 2000, currency: "usd" }).pipe(
 *   Stripe.withRequestOptions({ idempotencyKey: "ch-create-1" }),
 * );
 * ```
 */
export const withRequestOptions = (options: StripeRequestOptions) =>
  Effect.provide(Layer.succeed(RequestOptions, options));

const stripeRequestHeaders = (
  options: StripeRequestOptions | undefined,
): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (options?.idempotencyKey !== undefined) {
    headers["Idempotency-Key"] = options.idempotencyKey;
  }
  if (options?.stripeAccount !== undefined) {
    headers["Stripe-Account"] = options.stripeAccount;
  }
  if (options?.stripeContext !== undefined) {
    headers["Stripe-Context"] = options.stripeContext;
  }
  if (options?.apiVersion !== undefined) {
    headers["Stripe-Version"] = options.apiVersion;
  }
  return headers;
};

// =============================================================================
// Operation error/context types
// =============================================================================

/**
 * Error channel shared by every generated Stripe operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * StripeOpError, StripeOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type StripeOpError =
  | CardError
  | IdempotencyError
  | InvalidRequestError
  | ApiError
  | PaymentError
  | ExternalDependencyFailed
  | UnknownStripeError
  | StripeParseError
  | BadRequest
  | Forbidden
  | NotFound
  | Conflict
  | UnprocessableEntity
  | Locked
  | CoreDefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Stripe operation. */
export type StripeOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Stripe failures are real typed errors that an operation re-surfaces via its
// `errors: [...]` list / StripeOpError annotation. Fail with the instance and
// erase the error type here; the generated annotations reintroduce it.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

// =============================================================================
// Request building
// =============================================================================

/**
 * Core's `buildRequest` with Stripe's wire rules: the API key as a Bearer
 * token, the per-call option headers, and bracket query style
 * (`created[gte]=1`, `expand[0]=a`) -- Stripe's v2 API refuses `key[]` and
 * repeated keys. Bodies follow the operation's `T.Http` content type:
 * form-urlencoded with the same brackets (every /v1 op), multipart for
 * POST /v1/files, JSON for the /v2 ops.
 */
const requestFor = (
  creds: Config,
  options: StripeRequestOptions | undefined,
  input: unknown,
  inputAst: AST.AST,
): Effect.Effect<HttpClientRequest.HttpClientRequest, InvalidInput | SdkError> =>
  buildRequest({
    input: unwrapRedactedDeep(input),
    inputAst,
    baseUrl: creds.apiBaseUrl,
    headers: {
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      ...stripeRequestHeaders(options),
      Accept: "application/json",
    },
    queryStyle: "brackets",
  });

/**
 * The calling fiber's credentials, then `f` on them. The protocol layer is
 * memoized per process by `API.make`, so credentials (and the per-call
 * RequestOptions) are resolved from the calling fiber's context on every
 * request. The requirement is erased at this boundary and reintroduced for
 * callers by the generated `StripeOpContext` annotations.
 */
const withCredentials = <B>(
  context: Context.Context<any>,
  f: (creds: Config) => Effect.Effect<B, any, any>,
): Effect.Effect<B, any, any> =>
  API.withValue(Context.get(context, Credentials) as Effect.Effect<Config, any, any>, f);

const encode = ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
  Effect.withFiber((fiber) => {
    const context = fiber.context as Context.Context<any>;
    return withCredentials(context, (creds) =>
      requestFor(creds, Context.getOrUndefined(context, RequestOptions), input, inputAst),
    );
  });

// =============================================================================
// Response decoding / error matching (ported from v0's matchError)
// =============================================================================

const str = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);

// Structural views of the status maps for numeric lookup (the const objects'
// per-status class types don't unify without widening the constructor).
const stripeStatusMap: Readonly<Record<number, (new (args: any) => unknown) | undefined>> =
  STRIPE_HTTP_STATUS_MAP;
const coreStatusMap: Readonly<Record<number, (new (args: any) => unknown) | undefined>> =
  HTTP_STATUS_MAP;

/** Stripe's `{ error: { type, message, ... } }` object, when present. */
const stripeErrorEnvelope = (errorBody: unknown): Record<string, unknown> | undefined => {
  const envelope =
    errorBody !== null && typeof errorBody === "object"
      ? (errorBody as Record<string, unknown>).error
      : undefined;
  return envelope !== null && typeof envelope === "object"
    ? (envelope as Record<string, unknown>)
    : undefined;
};

const stripeErrorMessage = (errorBody: unknown): string | undefined => {
  const message = stripeErrorEnvelope(errorBody)?.message;
  return typeof message === "string" ? message : undefined;
};

/**
 * Match a Stripe API error response to the appropriate error class.
 *
 * Stripe dispatches errors by:
 * 1. Per-operation matcher classes (`matchTypedError`) -- see decode
 * 2. The `error.type` field (card_error, idempotency_error,
 *    invalid_request_error, api_error)
 * 3. HTTP status code (402/424 Stripe-specific, then the core status map)
 */
const matchStripeError = (
  status: number,
  errorBody: unknown,
  headers: Record<string, string | undefined>,
): unknown => {
  const err = stripeErrorEnvelope(errorBody);
  // v0 parity: an unparseable envelope (no `error.type` string) is an
  // UnknownStripeError carrying the raw body.
  if (!err || typeof err.type !== "string") {
    // A 5xx without an envelope (a proxy page) is a server fault worth a
    // retry, as below.
    if (status >= 500) {
      return new InternalServerError({
        message: `HTTP ${status}`,
        retryAfter: parseRetryAfterForStatus(status, headers),
      });
    }
    return new UnknownStripeError({ status, body: errorBody });
  }

  const common = {
    message: str(err.message),
    code: str(err.code),
    doc_url: str(err.doc_url),
    request_log_url: str(err.request_log_url),
  };

  // Match by Stripe error type first for richer error info.
  switch (err.type) {
    case "card_error":
      return new CardError({
        ...common,
        decline_code: str(err.decline_code),
        charge: str(err.charge),
        param: str(err.param),
        advice_code: str(err.advice_code),
        network_advice_code: str(err.network_advice_code),
        network_decline_code: str(err.network_decline_code),
        payment_method_type: str(err.payment_method_type),
      });
    case "idempotency_error":
      return new IdempotencyError(common);
    case "invalid_request_error":
      return new InvalidRequestError({ ...common, param: str(err.param), status });
    case "api_error":
      return new ApiError({ ...common, param: str(err.param) });
  }

  // Fall back to Stripe-specific HTTP status codes (402, 424).
  const StripeErrorClass = stripeStatusMap[status];
  if (StripeErrorClass) {
    return new StripeErrorClass({
      message: common.message,
      code: common.code,
      ...(str(err.decline_code) !== undefined ? { decline_code: str(err.decline_code) } : {}),
      ...(str(err.charge) !== undefined ? { charge: str(err.charge) } : {}),
      ...(str(err.param) !== undefined ? { param: str(err.param) } : {}),
      ...(common.doc_url !== undefined ? { doc_url: common.doc_url } : {}),
      ...(common.request_log_url !== undefined ? { request_log_url: common.request_log_url } : {}),
    });
  }

  // Fall back to standard HTTP status errors (400, 401, 403, 404, ...).
  const CoreErrorClass = coreStatusMap[status];
  if (CoreErrorClass) {
    return new CoreErrorClass({
      message: common.message ?? "",
      retryAfter: parseRetryAfterForStatus(status, headers),
    } as any);
  }

  // Unmapped 5xx (e.g. proxy statuses) -> retryable server error (v1
  // convention; v0 fell through to UnknownStripeError here).
  if (status >= 500) {
    return new InternalServerError({
      message: common.message ?? `HTTP ${status}`,
      retryAfter: parseRetryAfterForStatus(status, headers),
    });
  }

  return new UnknownStripeError({
    status,
    type: str(err.type),
    code: common.code,
    message: common.message,
    param: str(err.param),
    body: errorBody,
  });
};

const decodeResponse = (
  context: Context.Context<any>,
  response: HttpClientResponse.HttpClientResponse,
  outputAst: AST.AST,
  errorClasses: ReadonlyArray<unknown>,
): Effect.Effect<unknown> =>
  Effect.matchEffect(response.text, {
    onFailure: fail,
    onSuccess: (read): Effect.Effect<unknown> => {
      // Read as text and parse tolerantly -- error pages can be non-JSON.
      const text = read ?? "";
      let json: unknown;
      let nonJson = false;
      if (text.trim().length > 0) {
        try {
          json = JSON.parse(text);
        } catch {
          nonJson = true;
        }
      }
      const status = response.status;
      const headers = response.headers as Record<string, string | undefined>;

      if (status >= 400) {
        const errorBody: unknown = nonJson ? text : json;
        const message =
          stripeErrorMessage(errorBody) ??
          (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);
        const typed = matchTypedError(errorClasses, status, [{ message }], {
          body: nonJson ? text : json,
          headers,
        });
        if (typed !== undefined) return fail(typed);
        // Its own frames would point into this decoder; the failure frame
        // names the operation at the caller's line instead.
        const saved = Telemetry.suppressStack();
        try {
          return fail(matchStripeError(status, errorBody, headers));
        } finally {
          Telemetry.restoreStack(saved);
        }
      }

      // 2xx: the response body IS the payload (no envelope). Wire->TS key
      // mapping is schema-driven; sensitive members come back Redacted.
      // Strict mode checks the mapped body against the output schema first,
      // and parse errors withhold a body that can hold a secret (core
      // `checkSuccess`).
      const body: unknown = nonJson ? text : (json ?? {});
      const checked = checkSuccess(context, outputAst, {
        value: mapsVerbatim(outputAst, "decode") ? body : mapKeys(outputAst, body, "decode"),
        body: nonJson ? text : json,
        nonJson,
      });
      return checked.ok ? Effect.succeed(checked.value) : fail(new StripeParseError(checked.error));
    },
  });

const call = (op: API.PreparedOperation, input: unknown): Effect.Effect<unknown> =>
  Effect.withFiber((fiber) => {
    const context = fiber.context as Context.Context<any>;
    return withCredentials(context, (creds) => {
      const client = Context.get(context, HttpClient.HttpClient);
      return Effect.flatMap(
        requestFor(creds, Context.getOrUndefined(context, RequestOptions), input, op.inputAst),
        (request) =>
          Effect.flatMap(Telemetry.execute(context, client, request), (response) =>
            decodeResponse(context, response, op.outputAst, op.errors),
          ),
      );
    });
  }) as Effect.Effect<unknown>;

export const StripeProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) => encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: ({ response, outputAst, errors }) =>
      Effect.withFiber((fiber) =>
        decodeResponse(fiber.context as Context.Context<any>, response, outputAst, errors),
      ),
    call,
  }),
);
