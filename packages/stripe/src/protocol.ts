import * as API from "@distilled.cloud/core/api";
import { debugHttp } from "@distilled.cloud/core/debug";
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
  getAnn,
  getProps,
  hasPropAnn,
  invalidLabel,
  makeRequest,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import {
  hasSensitiveMember,
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import { checkResponse, withholdActual } from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
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
 *             GET inputs flatten body-bound members into the query string
 *             with Stripe bracket notation (`created[gte]`, `expand[]`);
 *             non-GET bodies encode as `application/x-www-form-urlencoded`
 *             with Stripe deepObject bracket expansion (`shipping[address]
 *             [city]=SF`, `expand[0]=data`) when the operation's `T.Http`
 *             trait says `contentType: "form-urlencoded"` (every /v1 op),
 *             as JSON otherwise (the /v2 ops), and as multipart form-data
 *             for `contentType: "multipart"` (POST /v1/files)
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
import * as HttpBody from "effect/http/HttpBody";
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
import {
  bodySymbol,
  headerSymbol,
  httpSymbol,
  labelSymbol,
  querySymbol,
  type HttpTrait,
} from "./traits.ts";

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
  | InvalidInput;

/** Context (requirements) shared by every generated Stripe operation. */
export type StripeOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Stripe failures are real typed errors that an operation re-surfaces via its
// `errors: [...]` list / StripeOpError annotation. Fail with the instance and
// erase the error type here; the generated annotations reintroduce it.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

// =============================================================================
// Stripe query / form encoding (ported from distilled v0)
// =============================================================================

const BODYLESS = /*@__PURE__*/ new Set(["GET", "HEAD"]);

const appendQueryValue = (query: URLSearchParams, key: string, value: unknown): void => {
  if (value === undefined || value === null) return;
  query.append(key, typeof value === "boolean" ? (value ? "true" : "false") : String(value));
};

/**
 * Stripe GET-query bracket expansion (v0's `appendStripeQuery`): arrays as
 * repeated `key[]` entries, nested objects as `key[nested]`, recursively.
 */
const appendStripeQuery = (query: URLSearchParams, key: string, value: unknown): void => {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    for (const item of value) appendQueryValue(query, `${key}[]`, item);
    return;
  }
  if (typeof value === "object" && !(value instanceof Date)) {
    for (const [nestedKey, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      appendStripeQuery(query, `${key}[${nestedKey}]`, nestedValue);
    }
    return;
  }
  appendQueryValue(query, key, value);
};

/**
 * Recursively flatten a nested object into Stripe-style bracket notation
 * for application/x-www-form-urlencoded encoding (v0's `flattenToFormPairs`).
 *
 * Examples:
 *   { amount: 2000 } -> "amount=2000"
 *   { shipping: { address: { city: "SF" } } } -> "shipping[address][city]=SF"
 *   { expand: ["data"] } -> "expand[0]=data"
 *   { metadata: { key: "val" } } -> "metadata[key]=val"
 */
const flattenToFormPairs = (
  obj: Record<string, unknown>,
  prefix: string = "",
): Array<[string, string]> => {
  const pairs: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (
          item !== null &&
          item !== undefined &&
          typeof item === "object" &&
          !Array.isArray(item)
        ) {
          pairs.push(...flattenToFormPairs(item as Record<string, unknown>, `${fullKey}[${i}]`));
        } else if (item !== undefined && item !== null) {
          pairs.push([`${fullKey}[${i}]`, String(item)]);
        }
      }
    } else if (typeof value === "object") {
      pairs.push(...flattenToFormPairs(value as Record<string, unknown>, fullKey));
    } else if (typeof value === "boolean") {
      pairs.push([fullKey, value ? "true" : "false"]);
    } else {
      pairs.push([fullKey, String(value)]);
    }
  }

  return pairs;
};

/** Build the urlencoded body from a nested object (Stripe deepObject style). */
const buildFormUrlEncoded = (body: Record<string, unknown>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of flattenToFormPairs(body)) {
    params.append(key, value);
  }
  return params.toString();
};

// =============================================================================
// Request building
// =============================================================================

/** One input member, with its binding read from the schema once. */
interface MemberPlan {
  readonly key: string;
  readonly bind: "label" | "header" | "query" | "body";
  /** Label token, lower-cased header name, query name or body wire name. */
  readonly name: string;
  readonly type: AST.AST;
  /** `mapKeys(type, value, "encode")` returns the value unchanged. */
  readonly verbatim: boolean;
}

interface RequestPlan {
  readonly http: HttpTrait;
  readonly members: ReadonlyArray<MemberPlan>;
  readonly known: ReadonlySet<string>;
}

const requestPlans = /*@__PURE__*/ new WeakMap<AST.AST, RequestPlan>();
const requestPlanFor = (inputAst: AST.AST): RequestPlan => {
  let plan = requestPlans.get(inputAst);
  if (plan !== undefined) return plan;
  const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
  if (!http) {
    throw new Error("operation input is missing the Http() trait");
  }
  const members = getProps(inputAst).map((prop): MemberPlan => {
    const key = String(prop.name);
    if (hasPropAnn(prop, labelSymbol)) {
      return {
        key,
        bind: "label",
        name: nameOf(prop, labelSymbol),
        type: prop.type,
        verbatim: true,
      };
    }
    if (hasPropAnn(prop, headerSymbol)) {
      const name = nameOf(prop, headerSymbol).toLowerCase();
      return { key, bind: "header", name, type: prop.type, verbatim: true };
    }
    if (hasPropAnn(prop, querySymbol)) {
      return {
        key,
        bind: "query",
        name: nameOf(prop, querySymbol),
        type: prop.type,
        verbatim: true,
      };
    }
    return {
      key,
      bind: "body",
      name: nameOf(prop, bodySymbol),
      type: prop.type,
      verbatim: mapsVerbatim(prop.type, "encode"),
    };
  });
  plan = { http, members, known: new Set(members.map((m) => m.key)) };
  requestPlans.set(inputAst, plan);
  return plan;
};

const requestFor = (
  creds: Config,
  options: StripeRequestOptions | undefined,
  input: unknown,
  inputAst: AST.AST,
): Effect.Effect<HttpClientRequest.HttpClientRequest, InvalidInput> => {
  const { http, members, known } = requestPlanFor(inputAst);

  const baseHeaders: Record<string, string> = {
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    ...stripeRequestHeaders(options),
    Accept: "application/json",
  };

  // Multipart (POST /v1/files): core's buildRequest speaks multipart
  // form-data (file parts + JSON-encoded object parts) -- same behavior as
  // v0's buildFormData.
  if (http.contentType === "multipart") {
    return buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: baseHeaders,
    });
  }

  const inputObj = (unwrapRedactedDeep(input) ?? {}) as Record<string, unknown>;
  const headers = baseHeaders;
  const body: Record<string, unknown> = {};
  let bodyKeys = 0;
  let query: URLSearchParams | undefined;
  let uri = http.uri;

  for (let i = 0; i < members.length; i++) {
    const m = members[i]!;
    const value = inputObj[m.key];
    if (value === undefined) continue;
    switch (m.bind) {
      case "label": {
        const invalid = invalidLabel(m.key, value);
        if (invalid) return Effect.fail(invalid);
        uri = uri.replace(`{${m.name}}`, encodeURIComponent(String(value)));
        break;
      }
      case "header":
        headers[m.name] = String(value);
        break;
      case "query":
        // Stripe bracket expansion, not dotted params (`created[gte]=1`).
        appendStripeQuery((query ??= new URLSearchParams()), m.name, value);
        break;
      default:
        body[m.name] = m.verbatim ? value : mapKeys(m.type, value, "encode");
        bodyKeys++;
    }
  }

  // Input keys the schema doesn't know pass through as body fields -- the
  // generated schemas can lag the real API, and silently dropping them
  // would break working callers.
  for (const key in inputObj) {
    if (known.has(key) || !Object.hasOwn(inputObj, key)) continue;
    const value = inputObj[key];
    if (value === undefined) continue;
    body[key] = value;
    bodyKeys++;
  }

  // v0's normalizeStripeGetQuery: GET inputs carry no body -- flatten the
  // body-bound members into the query string with bracket notation.
  const bodyless = BODYLESS.has(http.method);
  if (bodyless && bodyKeys > 0) {
    for (const [key, value] of Object.entries(body)) {
      appendStripeQuery((query ??= new URLSearchParams()), key, value);
    }
  }

  const qs = query === undefined ? "" : query.toString();
  const url = qs ? `${creds.apiBaseUrl}${uri}?${qs}` : `${creds.apiBaseUrl}${uri}`;
  if (debugHttp()) {
    console.error(
      `[distilled] ${http.method} ${url}` +
        (bodyKeys && !bodyless ? ` body=${JSON.stringify(body).slice(0, 400)}` : ""),
    );
  }

  const request = makeRequest(http.method, url, headers);
  if (bodyless || bodyKeys === 0) return Effect.succeed(request);
  return Effect.succeed(
    HttpClientRequest.setBody(
      request,
      http.contentType === "form-urlencoded"
        ? HttpBody.text(buildFormUrlEncoded(body), "application/x-www-form-urlencoded")
        : // The /v2/* operations are plain JSON.
          HttpBody.jsonUnsafe(body),
    ),
  );
};

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
    return new UnknownStripeError({ body: errorBody });
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
      return new InvalidRequestError({ ...common, param: str(err.param) });
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
      if (debugHttp()) {
        console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
      }
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
      // Strict mode checks the mapped body against the output schema first.
      // For an output with sensitive members, a non-JSON body fails in every
      // mode and parse errors withhold the body.
      const sensitive = hasSensitiveMember(outputAst);
      if (nonJson && sensitive) {
        return fail(new StripeParseError({ body: "[REDACTED]", cause: "Invalid JSON response" }));
      }
      const body: unknown = nonJson ? text : (json ?? {});
      const mapped = mapsVerbatim(outputAst, "decode") ? body : mapKeys(outputAst, body, "decode");
      const cause = checkResponse(context, outputAst, mapped);
      if (cause !== undefined) {
        return fail(
          new StripeParseError({
            body: sensitive ? "[REDACTED]" : nonJson ? text : json,
            cause: sensitive ? withholdActual(cause) : cause,
          }),
        );
      }
      return Effect.succeed(sensitive ? wrapSensitive(outputAst, mapped) : mapped);
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
