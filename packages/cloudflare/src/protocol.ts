import * as API from "@distilled.cloud/core/api";
import { retryableKey } from "@distilled.cloud/core/category";
import {
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
  InvalidInput,
} from "@distilled.cloud/core/errors";
import type {
  DeclaredError,
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Operation,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import {
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
  nameOf,
  responseHeaderMembers,
  withResponseHeaders,
  type ResponseHeaderMember,
} from "@distilled.cloud/core/protocol-http";
import { declaredStatusClass } from "@distilled.cloud/core/protocol-rest";
import {
  checkResponse,
  ResponseValidation,
  SchemaMismatch,
} from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus, parseServerRetryHint } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Send from "@distilled.cloud/core/send";
import * as Telemetry from "@distilled.cloud/core/telemetry";
import {
  bodySymbol,
  headerSymbol,
  keyDictionarySymbol,
  labelSymbol,
  responseCodeSymbol,
} from "@distilled.cloud/core/trait";
/**
 * CloudflareProtocol -- hand-written.
 *
 * Speaks Cloudflare's client-v4 JSON protocol. The generic request/response
 * machinery (trait-driven request building, recursive wire-name mapping,
 * typed-error matcher evaluation) lives in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Cloudflare's own:
 *
 *   request:  credentials -> auth headers + API base URL, the Bearer-prefix
 *             quirk for member-supplied Authorization headers, snake_case
 *             wire names for unknown input keys
 *
 *   response: { success, errors, messages, result, result_info }
 *             * success:false / non-2xx -> typed error, matched like the
 *               distilled cloudflare client (per-op matchers, global error
 *               codes, throttling, HTTP status, unknown fallback). A class
 *               of the service's errors (`CloudflareServiceErrors`) is
 *               built from the classes the operation lists, never by name
 *             * result (the payload) -> mapped onto the output schema:
 *                 EnvelopePayload()  -> receives the whole `result`
 *                 Header(name?)      -> read from a response header
 *                 ResponseCode()     -> the HTTP status code
 *                 (otherwise)        -> result.<field>
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type * as AST from "effect/SchemaAST";
import {
  Credentials,
  formatHeaders,
  type CredentialsError,
  type ResolvedCredentials,
} from "./credentials.ts";
import {
  CloudflareHttpError,
  CloudflareParseError,
  type CloudflareServiceError,
  InvalidRoute,
  UnknownCloudflareError,
} from "./errors.ts";
import { Jurisdiction } from "./jurisdiction.ts";
import {
  binaryResponseBodySymbol,
  envelopePayloadRootSymbol,
  envelopePayloadSymbol,
  hostSymbol,
  jurisdictionSymbol,
  resultInfoSymbol,
} from "./traits.ts";

/** Longest slice of a response body carried into an error message. */
const MAX_ERROR_BODY_LENGTH = 1000;

/**
 * The message for a failed JSON response. Cloudflare's usual `errors[0].message`
 * wins; otherwise keep whatever else the body says (a top-level `message`, the
 * `errors` entries, or the raw text of an unfamiliar shape) so the caller can
 * see why the request failed. `HTTP <status>` remains only when the body says
 * nothing.
 */
const envelopeErrorMessage = (
  json: Record<string, unknown>,
  rawErrors: ReadonlyArray<unknown>,
  text: string,
  status: number,
): string => {
  const first = rawErrors[0] as { message?: unknown } | undefined;
  if (typeof first?.message === "string") return first.message;
  if (typeof json.message === "string" && json.message.length > 0) return json.message;
  // `errors` entries that carry no message: keep their other fields.
  const detail =
    rawErrors.length > 0
      ? JSON.stringify(rawErrors)
      : Array.isArray(json.errors) || text.trim().length === 0
        ? ""
        : text;
  return detail.length > 0 ? detail.slice(0, MAX_ERROR_BODY_LENGTH) : `HTTP ${status}`;
};

/**
 * What every generated Cloudflare operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, CloudflareOpError, CloudflareOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type CloudflareOpError =
  | CloudflareServiceError
  | ErrorOf<typeof CloudflareProtocol | typeof CloudflarePaginatedProtocol>;

/** Context (requirements) shared by every generated Cloudflare operation. */
export type CloudflareOpContext = Credentials | HttpClient.HttpClient;

/**
 * An instance of `cls`, a class of the service's errors, built from the
 * operation's own list: `undefined` when the operation does not list the
 * class (every generated operation lists `CloudflareServiceErrors`).
 */
const declaredError = <Props>(
  errors: ReadonlyArray<DeclaredErrorClass>,
  cls: new (props: Props) => unknown,
  props: Props,
): DeclaredError | undefined => {
  const known: unknown = cls;
  const Declared = errors.find((declared) => declared === known);
  return Declared === undefined ? undefined : new Declared(props);
};

/**
 * Mark an error instance retryable regardless of its class categories --
 * used for dual-use Cloudflare codes whose transient variant is only
 * identifiable from the message.
 */
const tagRetryable = <E>(error: E): E => {
  (error as Record<string, unknown>)[retryableKey] = {};
  return error;
};

const GLOBAL_RATE_LIMIT_MESSAGE = /\b(rate ?limit(ed|ing)?|throttl(ed|ing) your request)\b/i;

/**
 * Cloudflare error codes that map to global/default errors regardless of
 * operation -- infrastructure-level errors that can occur on any endpoint.
 * Transcribed from the distilled cloudflare client. An entry answers
 * `undefined` when the operation does not list the class it maps to.
 */
const GLOBAL_ERROR_CODE_MAP: Record<
  number,
  (
    errors: ReadonlyArray<DeclaredErrorClass>,
    message: string,
    headers: Record<string, string | undefined>,
    status: number,
    body: unknown,
  ) => DeclaredError | InternalServerError | UnknownCloudflareError | undefined
> = {
  // "Please wait and consider throttling your request speed" -- returned
  // inside envelopes with arbitrary HTTP status (often 200).
  971: (errors, message, headers) =>
    declaredError(errors, TooManyRequests, {
      message,
      retryAfter: parseServerRetryHint(headers),
    }),
  // Authentication-related codes -- Cloudflare frequently returns these
  // inside a 400/403 envelope rather than 401.
  6003: (errors, message) => declaredError(errors, Unauthorized, { message }),
  9103: (errors, message) => declaredError(errors, Unauthorized, { message }),
  9106: (errors, message) => declaredError(errors, Unauthorized, { message }),
  9109: (errors, message) => declaredError(errors, Unauthorized, { message }),
  // "Authentication error" is tagged retryable: under high request
  // concurrency Cloudflare intermittently rejects valid, long-lived tokens
  // with this message (the same call against the same zone succeeds in
  // isolation -- verified in alchemy's provider suite, which previously
  // carried this as a custom retry predicate). A genuinely invalid token
  // produces the same message persistently, but the default retry policy is
  // bounded, so it still fails within seconds of backoff instead of looping;
  // the win is that valid tokens stop flaking under load.
  10000: (errors, message) => {
    const error = declaredError(errors, Unauthorized, { message });
    return error !== undefined && /authentication error/i.test(message)
      ? tagRetryable(error)
      : error;
  },
  // Dual-use: "Method not allowed for token" is a real permission denial
  // (NOT retryable); "internal error" is a CF hiccup mistagged as 403, and
  // "Unable to authenticate request" is a transient auth/edge blip against
  // otherwise-valid credentials (real credential problems surface as code
  // 10000 instead) -- those two variants are tagged retryable.
  10001: (errors, message) => {
    const error = declaredError(errors, Forbidden, { message });
    return error !== undefined && /internal error|unable to authenticate request/i.test(message)
      ? tagRetryable(error)
      : error;
  },
  // "Invalid request: invalid route" -- a path component (typically
  // accountId/zoneId) doesn't resolve to a real resource.
  7003: (errors, message) => declaredError(errors, InvalidRoute, { code: 7003, message }),
  // Dual-use code 1000: several unrelated conditions, each unambiguous from
  // the message.
  1000: (errors, message, _headers, status, body) => {
    if (/\btimeout\b/i.test(message)) {
      return declaredError(errors, GatewayTimeout, { message });
    }
    if (/internal (server )?error/i.test(message)) {
      return new InternalServerError({ message });
    }
    return new UnknownCloudflareError({ status, code: 1000, message, body });
  },
};

/**
 * Typed error for an HTTP status: core's class for it when the operation or
 * its service declares one (with retry categories for 5xx),
 * InternalServerError for any other 5xx (e.g. Cloudflare-specific 520-530),
 * CloudflareHttpError otherwise.
 */
const httpStatusError = (
  errors: ReadonlyArray<DeclaredErrorClass>,
  status: number,
  body?: string,
  headers?: Record<string, string | undefined>,
): DeclaredError | InternalServerError | CloudflareHttpError => {
  const ErrorClass = declaredStatusClass(status, errors);
  const message = body ?? String(status);
  if (ErrorClass) {
    return new ErrorClass({
      message,
      retryAfter: parseRetryAfterForStatus(status, headers),
    });
  }
  if (status >= 500) {
    return new InternalServerError({
      message,
      retryAfter: parseRetryAfterForStatus(status, headers),
    });
  }
  return new CloudflareHttpError({
    status,
    statusText: String(status),
    body: message,
    message,
  });
};

/** Callers write camelCase; Cloudflare's wire is snake_case. */
const camelToSnake = (key: string): string =>
  key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

/**
 * A member-supplied Authorization header (e.g. the asset-upload session JWT)
 * is a raw token -- Bearer-prefix it like distilled's request transform does.
 */
const bearerPrefixAuthorization = (name: string, value: string): string =>
  name === "authorization" && !/^Bearer\s/i.test(value) ? `Bearer ${value}` : value;

/**
 * The origin of an operation marked `T.Host(template)`, with its `{name}`
 * placeholders filled from the input's `Label(name)` members; undefined for
 * every other operation (they use the credentials' API base URL). A label
 * that only names the host is still consumed by `buildRequest`, so it never
 * leaks into the body.
 */
const hostTemplates = /*@__PURE__*/ new WeakMap<AST.AST, string | null>();
const hostFor = (input: unknown, inputAst: AST.AST): string | undefined | InvalidInput => {
  let template = hostTemplates.get(inputAst);
  if (template === undefined) {
    template = (getAnn(inputAst, hostSymbol) as string | undefined) ?? null;
    hostTemplates.set(inputAst, template);
  }
  if (template === null) return undefined;
  const values = (input ?? {}) as Record<string, unknown>;
  let host = template;
  for (const prop of getProps(inputAst)) {
    if (!hasPropAnn(prop, labelSymbol)) continue;
    const value = values[String(prop.name)];
    if (value === undefined) continue;
    host = host.replace(`{${nameOf(prop, labelSymbol)}}`, () => encodeURIComponent(String(value)));
  }
  const unset = /\{([^}]+)\}/.exec(host);
  if (unset) {
    // A required label left unset: nothing to address the host with.
    return new InvalidInput({
      member: unset[1]!,
      message: `the host label ${unset[1]} is required (host ${template})`,
    });
  }
  return host;
};

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request instead.
const requestFor = (
  context: Context.Context<any>,
  creds: ResolvedCredentials,
  input: unknown,
  inputAst: AST.AST,
): Effect.Effect<HttpClientRequest.HttpClientRequest, InvalidInput | SdkError> => {
  const headers = formatHeaders(creds);
  // The `Jurisdiction` layer, for operations marked `T.Jurisdiction()`. A
  // `jurisdiction` member set on the call is a header too, and wins.
  const jurisdiction = Context.getOrUndefined(context, Jurisdiction);
  if (jurisdiction !== undefined && takesJurisdiction(inputAst))
    headers[JURISDICTION_HEADER] = jurisdiction;
  const host = hostFor(input, inputAst);
  if (host instanceof InvalidInput) return Effect.fail(host);
  return buildRequest({
    input,
    inputAst,
    baseUrl: host ?? creds.apiBaseUrl,
    headers,
    mapMemberHeader: bearerPrefixAuthorization,
    unknownKeyToWire: camelToSnake,
  });
};

const JURISDICTION_HEADER = "cf-r2-jurisdiction";
/** Whether an operation's input is marked `T.Jurisdiction()`. */
const takesJurisdiction = (inputAst: AST.AST): boolean =>
  getAnn(inputAst, jurisdictionSymbol) !== undefined;

/**
 * The calling fiber's credentials, then `f` on them. The Credentials service
 * holds an effect -- resolving it per request picks up token refreshes. What
 * it fails with ({@link CredentialsError}) reaches every operation through
 * the protocol.
 */
const withCredentials = <B, E>(
  context: Context.Context<any>,
  f: (creds: ResolvedCredentials) => Effect.Effect<B, E>,
): Effect.Effect<B, CredentialsError | E, Credentials> =>
  API.withValue(Context.get(context, Credentials), f);

const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.withFiber((fiber) =>
    withCredentials(fiber.context as Context.Context<any>, (creds) =>
      requestFor(fiber.context as Context.Context<any>, creds, input, inputAst),
    ),
  );

/** Shallow-camelCase the keys of the envelope's `result_info` block. */
const camelizeKeys = (v: unknown): unknown => {
  if (v === null || typeof v !== "object" || Array.isArray(v)) return v;
  return Object.fromEntries(
    Object.entries(v).map(([k, val]) => [
      k.replace(/_+([a-z0-9])/gi, (_, c: string) => c.toUpperCase()),
      val,
    ]),
  );
};

/** How one output member is read from a successful response. */
interface MemberPlan {
  readonly key: string;
  readonly kind: "payload" | "header" | "code" | "field" | "binary";
  /** Marked `T.ResultInfo()` (read by the paginated protocol only). */
  readonly resultInfo: boolean;
  readonly type: AST.AST;
  /** The body wire name (header members are read by core's `withResponseHeaders`). */
  readonly wire: string;
  /** The service key dictionary's wire name for the member. */
  readonly dictWire: string | undefined;
  /** `mapKeys(type, value, "decode", rootDict)` returns the value unchanged. */
  readonly verbatim: boolean;
}

/** What decoding reads from an output schema, computed once per schema. */
interface OutputPlan {
  readonly binary: boolean;
  readonly root: boolean;
  readonly rootVerbatim: boolean;
  readonly rootDict: Record<string, string> | undefined;
  readonly members: ReadonlyArray<MemberPlan>;
  /** Members read from response headers (`T.Header`). */
  readonly headers: ReadonlyArray<ResponseHeaderMember>;
}

const outputPlans = /*@__PURE__*/ new WeakMap<AST.AST, OutputPlan>();
const outputPlanFor = (outputAst: AST.AST): OutputPlan => {
  let plan = outputPlans.get(outputAst);
  if (plan !== undefined) return plan;
  const rootDict = getAnn(outputAst, keyDictionarySymbol) as Record<string, string> | undefined;
  const members = getProps(outputAst).map((prop): MemberPlan => {
    const key = String(prop.name);
    const kind = hasPropAnn(prop, binaryResponseBodySymbol)
      ? "binary"
      : hasPropAnn(prop, envelopePayloadSymbol)
        ? "payload"
        : hasPropAnn(prop, headerSymbol)
          ? "header"
          : hasPropAnn(prop, responseCodeSymbol)
            ? "code"
            : "field";
    return {
      key,
      kind,
      resultInfo: hasPropAnn(prop, resultInfoSymbol),
      type: prop.type,
      wire: nameOf(prop, bodySymbol),
      dictWire: rootDict?.[key],
      verbatim: rootDict === undefined && mapsVerbatim(prop.type, "decode"),
    };
  });
  plan = {
    binary: members.some((m) => m.kind === "binary"),
    root: getAnn(outputAst, envelopePayloadRootSymbol) !== undefined,
    rootVerbatim: rootDict === undefined && mapsVerbatim(outputAst, "decode"),
    rootDict,
    members,
    headers: responseHeaderMembers(outputAst),
  };
  outputPlans.set(outputAst, plan);
  return plan;
};

/** What reading a response fails with: a declared error, or one of the protocol's. */
type DecodeError =
  | DeclaredError
  | InternalServerError
  | UnknownCloudflareError
  | CloudflareHttpError
  | CloudflareParseError
  | HttpClientError.HttpClientError;

/**
 * Build the protocol. `resultInfo: true` (the paginated protocol)
 * additionally maps the envelope's top-level `result_info` onto the output
 * member marked with `T.ResultInfo()`, camelCased.
 */
const makeProtocol = (options: { readonly resultInfo: boolean }) => {
  const decodeResponse = (
    context: Context.Context<any>,
    response: HttpClientResponse.HttpClientResponse,
    outputAst: AST.AST,
    errorClasses: ReadonlyArray<DeclaredErrorClass>,
  ): Effect.Effect<unknown, DecodeError> => {
    // Raw binary response: when an output member carries
    // `BinaryResponseBody()`, a successful response is decoded from the
    // response headers plus the body as a lazy byte stream -- the body is
    // never consumed as text. Error statuses (JSON envelopes) fall
    // through to the normal path below.
    const plan = outputPlanFor(outputAst);
    if (response.status < 400 && plan.binary) {
      const result: Record<string, unknown> = {};
      let streamed = false;
      for (const m of plan.members) {
        if (m.kind === "binary" && !streamed) {
          // Only the first binary member receives the stream.
          streamed = true;
          result[m.key] = response.stream;
        } else if (m.kind === "code") {
          result[m.key] = response.status;
        }
      }
      return Effect.succeed(
        withResponseHeaders(
          plan.headers,
          result,
          response.headers as Record<string, string | undefined>,
        ),
      );
    }

    // Read as text and parse tolerantly -- Cloudflare answers some errors
    // (HTML 5xx pages, bare plain-text 4xx) with non-JSON bodies.
    return Effect.matchEffect(response.text, {
      // A body read that fails (reset or abort mid-body) fails the call with
      // its `HttpClientError`.
      onFailure: (error) => Effect.fail(error),
      onSuccess: (read): Effect.Effect<unknown, DecodeError> => {
        const text = read ?? "";
        let json: Record<string, unknown> = {};
        let nonJson = false;
        if (text.trim().length > 0) {
          try {
            const parsed = JSON.parse(text);
            if (parsed !== null && typeof parsed === "object") {
              json = parsed as Record<string, unknown>;
            } else {
              nonJson = true;
            }
          } catch {
            nonJson = true;
          }
        }
        const status = response.status;
        const headers = response.headers as Record<string, string | undefined>;

        // Error envelope or non-2xx -> typed error, matched like the distilled
        // cloudflare client: per-operation matchers, then global error codes,
        // then throttling, then HTTP-status classes, then the unknown fallback.
        const failed = status >= 400 || (!nonJson && json.success === false);
        if (failed) {
          // The v4 envelope carries `errors: [...]`; K2's produce endpoint
          // answers with a single `error: { code, message, retryable }`.
          const rawErrors = nonJson
            ? []
            : Array.isArray(json.errors)
              ? json.errors
              : json.error !== null && typeof json.error === "object"
                ? [json.error]
                : [];
          const first = rawErrors[0] as { code?: number; message?: string } | undefined;
          // Cloudflare sometimes omits the code entirely (e.g. webhook errors);
          // treat missing code as 0 so `{ code: 0 }` matchers can match.
          const errorCode = first ? (typeof first.code === "number" ? first.code : 0) : undefined;
          const errorMessage = nonJson ? text : envelopeErrorMessage(json, rawErrors, text, status);

          // Transient auth blips must be tagged retryable on EVERY error path,
          // including per-operation typed errors -- an op-declared class with a
          // status/code matcher (e.g. a plain Forbidden) otherwise intercepts
          // the blip before the global map's tagging and the retry policy never
          // sees it. Message evidence (see GLOBAL_ERROR_CODE_MAP for the field
          // history): "Authentication error" (code 10000 family, valid tokens
          // flake under concurrency), "Unable to authenticate request" and the
          // code-10001 "internal error" variant (auth/edge hiccups).
          const isTransientAuthBlip =
            /authentication error|unable to authenticate request/i.test(errorMessage) ||
            (errorCode === 10001 && /internal error/i.test(errorMessage));
          const tagBlip = <E>(error: E): E => (isTransientAuthBlip ? tagRetryable(error) : error);

          // 1. Per-operation typed error (matcher metadata on the class).
          const typed = matchTypedError(
            errorClasses,
            status,
            [{ code: errorCode, message: errorMessage }],
            { body: nonJson ? text : json, headers },
          );
          if (typed !== undefined) {
            return Effect.fail(tagBlip(typed));
          }

          // 2. Global/infrastructure error codes (any endpoint, any status).
          if (errorCode !== undefined && errorCode in GLOBAL_ERROR_CODE_MAP) {
            const global = GLOBAL_ERROR_CODE_MAP[errorCode]!(
              errorClasses,
              errorMessage,
              headers,
              status,
              nonJson ? text : json,
            );
            if (global !== undefined) return Effect.fail(tagBlip(global));
          }

          // 3. Throttling -- 429 or the global rate-limit message (Cloudflare
          // returns it inside envelopes with arbitrary HTTP status, often 200).
          if (status === 429 || GLOBAL_RATE_LIMIT_MESSAGE.test(errorMessage)) {
            const throttled = declaredError(errorClasses, TooManyRequests, {
              message: errorMessage,
              retryAfter: parseServerRetryHint(headers),
            });
            if (throttled !== undefined) return Effect.fail(throttled);
          }

          // 4. HTTP-status classes (4xx) / retryable 5xx.
          if (status >= 400 && status < 500) {
            const StatusErrorClass = declaredStatusClass(status, errorClasses);
            if (StatusErrorClass) {
              return Effect.fail(
                tagBlip(
                  new StatusErrorClass({
                    message: errorMessage,
                    retryAfter: parseRetryAfterForStatus(status, headers),
                  }),
                ),
              );
            }
          }
          if (status >= 500) {
            return Effect.fail(httpStatusError(errorClasses, status, errorMessage, headers));
          }

          // 5. Unknown envelope error.
          return Effect.fail(
            new UnknownCloudflareError({
              status,
              code: errorCode,
              message: errorMessage,
              body: nonJson ? text : json,
            }),
          );
        }

        // Validating modes (core/response-validation) check the TS-shaped
        // output against the schema; lenient mode returns it as built.
        const body: unknown = nonJson ? text : json;
        const validate = (value: unknown): Effect.Effect<unknown, CloudflareParseError> => {
          const cause = checkResponse(context, outputAst, value);
          return cause === undefined
            ? Effect.succeed(value)
            : Effect.fail(new CloudflareParseError({ body, cause }));
        };

        if (nonJson) json = {};

        // Unwrap the envelope: the payload is `result` (fall back to the whole
        // body for the handful of endpoints that don't use the envelope). A
        // successful non-JSON body is the payload verbatim -- e.g. the
        // security.txt GET answers an unconfigured zone with a bare non-JSON
        // sentinel that callers detect by `typeof === "string"`.
        const payload = (nonJson ? text : "result" in json ? json.result : json) as
          | Record<string, unknown>
          | unknown;
        const rootDict = plan.rootDict;

        // Bare-payload response: the whole value IS the envelope's `result`
        // (array/scalar), returned directly rather than wrapped in a struct.
        if (plan.root) {
          return validate(
            plan.rootVerbatim ? payload : mapKeys(outputAst, payload, "decode", rootDict),
          );
        }

        // A non-JSON body for a struct output: lenient returns the text as
        // read; strict fails it against the struct schema.
        if (nonJson) return validate(text);

        const result: Record<string, unknown> = {};
        // Payload keys a member read; strict mode rejects the rest, which the
        // struct built here drops.
        const consumed = new Set<string>();
        let wholePayload = false;

        for (const m of plan.members) {
          const key = m.key;
          if (options.resultInfo && m.resultInfo) {
            if (json.result_info !== undefined) {
              result[key] = camelizeKeys(json.result_info);
            }
          } else if (m.kind === "payload") {
            wholePayload = true;
            result[key] = m.verbatim ? payload : mapKeys(m.type, payload, "decode", rootDict);
          } else if (m.kind === "header") {
            // Filled from the response headers below.
          } else if (m.kind === "code") {
            result[key] = response.status;
          } else {
            // The schema's own wire name first; fall back to the service key
            // dictionary (mined from the distilled SDK) -- the docs sometimes
            // document a field under a name the live wire doesn't use (e.g. R2
            // event notifications document `queueId` but the wire sends
            // `queue`), and the dictionary carries the real mapping.
            const wire = m.wire;
            const dictWire = m.dictWire;
            const src =
              payload && typeof payload === "object"
                ? wire in payload
                  ? wire
                  : dictWire !== undefined && dictWire in payload
                    ? dictWire
                    : undefined
                : undefined;
            if (src !== undefined) {
              consumed.add(src);
              const v = (payload as Record<string, unknown>)[src];
              result[key] = m.verbatim ? v : mapKeys(m.type, v, "decode", rootDict);
            }
          }
        }
        if (
          !wholePayload &&
          plan.members.length > 0 &&
          payload !== null &&
          typeof payload === "object" &&
          !Array.isArray(payload) &&
          Context.get(context, ResponseValidation) === "strict"
        ) {
          for (const [k, v] of Object.entries(payload)) {
            if (consumed.has(k) || v === undefined) continue;
            return Effect.fail(
              new CloudflareParseError({
                body,
                cause: new SchemaMismatch([k], "no value (the schema does not model this key)", v),
              }),
            );
          }
        }
        return validate(withResponseHeaders(plan.headers, result, headers));
      },
    });
  };

  const call = (op: Operation, input: unknown) =>
    Effect.withFiber((fiber) => {
      const context = fiber.context as Context.Context<any>;
      return withCredentials(context, (creds) => {
        const client = Context.get(context, HttpClient.HttpClient);
        return Effect.flatMap(requestFor(context, creds, input, op.inputAst), (request) =>
          Effect.flatMap(Send.send(context, client, request), (response) =>
            Telemetry.phase(
              context,
              "cloudflare.decode",
              decodeResponse(context, response, op.outputAst, op.errors),
            ),
          ),
        );
      });
    });

  const methods = {
    encode,
    decode: ({ response, outputAst, errors }: DecodeArgs) =>
      Effect.withFiber((fiber) =>
        decodeResponse(fiber.context as Context.Context<any>, response, outputAst, errors),
      ),
    call,
  } satisfies Protocol<unknown, unknown>;
  // Typed from the methods above: what they fail with, what they read.
  const protocol: ProtocolOf<typeof methods> = methods;
  return protocol;
};

export const CloudflareProtocol = /*@__PURE__*/ makeProtocol({ resultInfo: false });

/**
 * Protocol for paginated operations: identical to {@link CloudflareProtocol}
 * except the envelope's top-level `result_info` is kept on the response (as
 * the member marked `T.ResultInfo()`, camelCased) so `.pages()` / `.items()`
 * can advance and callers can read totals.
 */
export const CloudflarePaginatedProtocol = /*@__PURE__*/ makeProtocol({ resultInfo: true });
