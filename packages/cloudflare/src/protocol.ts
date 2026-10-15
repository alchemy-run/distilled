import * as API from "@distilled.cloud/core/api";
import { retryableKey } from "@distilled.cloud/core/category";
import { debugHttp } from "@distilled.cloud/core/debug";
import {
  ConfigError,
  Forbidden,
  GatewayTimeout,
  HTTP_STATUS_MAP,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@distilled.cloud/core/errors";
import {
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import { checkResponse } from "@distilled.cloud/core/response-validation";
import { parseRetryAfterForStatus, parseServerRetryHint } from "@distilled.cloud/core/retry-after";
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
 *               codes, throttling, HTTP status, unknown fallback)
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
import * as Layer from "effect/Layer";
import type * as AST from "effect/SchemaAST";
import {
  Credentials,
  formatHeaders,
  type OAuthRefreshError,
  type ResolvedCredentials,
} from "./credentials.ts";
import {
  type CloudflareError,
  CloudflareHttpError,
  CloudflareParseError,
  type CloudflareRateLimited,
  type DefaultErrors,
  InvalidRoute,
  UnknownCloudflareError,
} from "./errors.ts";
import {
  binaryResponseBodySymbol,
  envelopePayloadRootSymbol,
  envelopePayloadSymbol,
  hostSymbol,
  resultInfoSymbol,
} from "./traits.ts";

/**
 * Error channel shared by every generated Cloudflare operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * CloudflareOpError, CloudflareOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type CloudflareOpError =
  | DefaultErrors
  | ConfigError
  | OAuthRefreshError
  // Injected into every generated operation's `errors: [...]` list by the
  // codegen (`operationDecl.commonErrorClasses`), so they belong in the
  // declared union too -- otherwise each operation's type claims it can't
  // fail the two ways every operation can.
  | CloudflareError
  | CloudflareRateLimited
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Cloudflare operation. */
export type CloudflareOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Cloudflare failures are real typed errors that an operation re-surfaces via
// its `errors: [...]` list. Fail with the instance and erase the error type
// here; `API.make`'s signature reintroduces it for callers.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

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
 * Transcribed from the distilled cloudflare client.
 */
const GLOBAL_ERROR_CODE_MAP: Record<
  number,
  (message: string, headers?: Record<string, string | undefined>) => unknown
> = {
  // "Please wait and consider throttling your request speed" -- returned
  // inside envelopes with arbitrary HTTP status (often 200).
  971: (message, headers) =>
    new TooManyRequests({
      message,
      retryAfter: parseServerRetryHint(headers),
    }),
  // Authentication-related codes -- Cloudflare frequently returns these
  // inside a 400/403 envelope rather than 401.
  6003: (message) => new Unauthorized({ message }),
  9103: (message) => new Unauthorized({ message }),
  9106: (message) => new Unauthorized({ message }),
  9109: (message) => new Unauthorized({ message }),
  // "Authentication error" is tagged retryable: under high request
  // concurrency Cloudflare intermittently rejects valid, long-lived tokens
  // with this message (the same call against the same zone succeeds in
  // isolation -- verified in alchemy's provider suite, which previously
  // carried this as a custom retry predicate). A genuinely invalid token
  // produces the same message persistently, but the default retry policy is
  // bounded, so it still fails within seconds of backoff instead of looping;
  // the win is that valid tokens stop flaking under load.
  10000: (message) => {
    const error = new Unauthorized({ message });
    return /authentication error/i.test(message) ? tagRetryable(error) : error;
  },
  // Dual-use: "Method not allowed for token" is a real permission denial
  // (NOT retryable); "internal error" is a CF hiccup mistagged as 403, and
  // "Unable to authenticate request" is a transient auth/edge blip against
  // otherwise-valid credentials (real credential problems surface as code
  // 10000 instead) -- those two variants are tagged retryable.
  10001: (message) => {
    const error = new Forbidden({ message });
    return /internal error|unable to authenticate request/i.test(message)
      ? tagRetryable(error)
      : error;
  },
  // "Invalid request: invalid route" -- a path component (typically
  // accountId/zoneId) doesn't resolve to a real resource.
  7003: (message) => new InvalidRoute({ code: 7003, message }),
  // Dual-use code 1000: several unrelated conditions, each unambiguous from
  // the message.
  1000: (message) => {
    if (/\btimeout\b/i.test(message)) {
      return new GatewayTimeout({ message });
    }
    if (/internal (server )?error/i.test(message)) {
      return new InternalServerError({ message });
    }
    return new UnknownCloudflareError({ code: 1000, message });
  },
};

/**
 * Typed error for an HTTP status: the mapped class when one exists (with
 * retry categories for 5xx), InternalServerError for unmapped 5xx (e.g.
 * Cloudflare-specific 520-530), CloudflareHttpError otherwise.
 */
const httpStatusError = (
  status: number,
  body?: string,
  headers?: Record<string, string | undefined>,
): unknown => {
  const ErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
  const message = body ?? String(status);
  if (ErrorClass) {
    return new ErrorClass({
      message,
      retryAfter: parseRetryAfterForStatus(status, headers),
    } as any);
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
const hostFor = (input: unknown, inputAst: AST.AST): string | undefined => {
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
  if (/\{[^}]+\}/.test(host)) {
    // A required label left unset -- the same codegen/caller bug a missing
    // path label is, surfaced as a defect by the calling Effect.
    throw new Error(`operation input is missing a host label for ${template}`);
  }
  return host;
};

// The protocol layer is memoized per process by `API.make` (see
// `OperationConfig.protocol`), so the build must not capture credentials --
// `encode` resolves Credentials from the calling fiber's context on
// every request instead. Like the error channel above, the requirement is
// erased at this boundary (Protocol effects are typed with no requirements)
// and reintroduced for callers by the generated `CloudflareOpContext`
// annotations.
const requestFor = (
  creds: ResolvedCredentials,
  input: unknown,
  inputAst: AST.AST,
): HttpClientRequest.HttpClientRequest =>
  buildRequest({
    input,
    inputAst,
    baseUrl: hostFor(input, inputAst) ?? creds.apiBaseUrl,
    headers: formatHeaders(creds),
    mapMemberHeader: bearerPrefixAuthorization,
    unknownKeyToWire: camelToSnake,
  });

/**
 * The calling fiber's credentials, then `f` on them. The Credentials service
 * holds an effect -- resolving it per request picks up token refreshes. Its
 * ConfigError/OAuthRefreshError channel is erased at this boundary like the
 * rest of the protocol's requirements; CloudflareOpError reintroduces it for
 * callers.
 */
const withCredentials = <B>(
  context: Context.Context<any>,
  f: (creds: ResolvedCredentials) => Effect.Effect<B, any, any>,
): Effect.Effect<B, any, any> =>
  API.withValue(
    Context.get(context, Credentials) as Effect.Effect<ResolvedCredentials, any, any>,
    f,
  );

const encode = ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
  Effect.withFiber((fiber) =>
    withCredentials(fiber.context as Context.Context<any>, (creds) =>
      Effect.succeed(requestFor(creds, input, inputAst)),
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

/**
 * Whether an output member's AST expects a number -- used to convert
 * header-projected values (headers arrive as strings; e.g.
 * `content-length`).
 */
const wantsNumber = (ast: AST.AST): boolean =>
  ast._tag === "Number" ||
  (ast._tag === "Union" &&
    (ast as { types?: readonly AST.AST[] }).types?.some(wantsNumber) === true);

/** How one output member is read from a successful response. */
interface MemberPlan {
  readonly key: string;
  readonly kind: "payload" | "header" | "code" | "field" | "binary";
  /** Marked `T.ResultInfo()` (read by the paginated protocol only). */
  readonly resultInfo: boolean;
  readonly type: AST.AST;
  /** Lower-cased header name (`header`), else the body wire name. */
  readonly wire: string;
  /** The service key dictionary's wire name for the member. */
  readonly dictWire: string | undefined;
  /** `mapKeys(type, value, "decode", rootDict)` returns the value unchanged. */
  readonly verbatim: boolean;
  readonly number: boolean;
}

/** What decoding reads from an output schema, computed once per schema. */
interface OutputPlan {
  readonly binary: boolean;
  readonly root: boolean;
  readonly rootVerbatim: boolean;
  readonly rootDict: Record<string, string> | undefined;
  readonly members: ReadonlyArray<MemberPlan>;
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
      wire: kind === "header" ? nameOf(prop, headerSymbol).toLowerCase() : nameOf(prop, bodySymbol),
      dictWire: rootDict?.[key],
      verbatim: rootDict === undefined && mapsVerbatim(prop.type, "decode"),
      number: wantsNumber(prop.type),
    };
  });
  plan = {
    binary: members.some((m) => m.kind === "binary"),
    root: getAnn(outputAst, envelopePayloadRootSymbol) !== undefined,
    rootVerbatim: rootDict === undefined && mapsVerbatim(outputAst, "decode"),
    rootDict,
    members,
  };
  outputPlans.set(outputAst, plan);
  return plan;
};

/**
 * Build the protocol service. `resultInfo: true` (the paginated protocol)
 * additionally maps the envelope's top-level `result_info` onto the output
 * member marked with `T.ResultInfo()`, camelCased.
 */
const makeProtocol = (options: { readonly resultInfo: boolean }) => {
  const decodeResponse = (
    context: Context.Context<any>,
    response: HttpClientResponse.HttpClientResponse,
    outputAst: AST.AST,
    errorClasses: ReadonlyArray<unknown>,
  ): Effect.Effect<unknown> => {
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
        } else if (m.kind === "header") {
          const v = response.headers[m.wire];
          if (v !== undefined) {
            result[m.key] = m.number ? Number(v) : v;
          }
        } else if (m.kind === "code") {
          result[m.key] = response.status;
        }
      }
      return Effect.succeed(result);
    }

    // Read as text and parse tolerantly -- Cloudflare answers some errors
    // (HTML 5xx pages, bare plain-text 4xx) with non-JSON bodies.
    return Effect.matchEffect(response.text, {
      onFailure: Effect.die,
      onSuccess: (read): Effect.Effect<unknown> => {
        const text = read ?? "";
        if (debugHttp()) {
          console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
        }
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
          const errorMessage = nonJson ? text : (first?.message ?? `HTTP ${status}`);

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
            return Effect.fail(tagBlip(typed)) as Effect.Effect<never>;
          }

          // 2. Global/infrastructure error codes (any endpoint, any status).
          if (errorCode !== undefined && errorCode in GLOBAL_ERROR_CODE_MAP) {
            return fail(tagBlip(GLOBAL_ERROR_CODE_MAP[errorCode]!(errorMessage, headers)));
          }

          // 3. Throttling -- 429 or the global rate-limit message (Cloudflare
          // returns it inside envelopes with arbitrary HTTP status, often 200).
          if (status === 429 || GLOBAL_RATE_LIMIT_MESSAGE.test(errorMessage)) {
            return fail(
              new TooManyRequests({
                message: errorMessage,
                retryAfter: parseServerRetryHint(headers),
              }),
            );
          }

          // 4. HTTP-status classes (4xx) / retryable 5xx.
          if (status >= 400 && status < 500) {
            const StatusErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
            if (StatusErrorClass) {
              return fail(
                tagBlip(
                  new StatusErrorClass({
                    message: errorMessage,
                    retryAfter: parseRetryAfterForStatus(status, headers),
                  } as any),
                ),
              );
            }
          }
          if (status >= 500) {
            return fail(httpStatusError(status, errorMessage, headers));
          }

          // 5. Unknown envelope error.
          return fail(
            new UnknownCloudflareError({
              code: errorCode,
              message: errorMessage,
            }),
          );
        }

        // Strict mode (core/response-validation) checks the TS-shaped output
        // against the schema; lenient mode returns it as built.
        const body: unknown = nonJson ? text : json;
        const validate = (value: unknown): Effect.Effect<unknown> => {
          const cause = checkResponse(context, outputAst, value);
          return cause === undefined
            ? Effect.succeed(value)
            : fail(new CloudflareParseError({ body, cause }));
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

        for (const m of plan.members) {
          const key = m.key;
          if (options.resultInfo && m.resultInfo) {
            if (json.result_info !== undefined) {
              result[key] = camelizeKeys(json.result_info);
            }
          } else if (m.kind === "payload") {
            result[key] = m.verbatim ? payload : mapKeys(m.type, payload, "decode", rootDict);
          } else if (m.kind === "header") {
            const v = response.headers[m.wire];
            if (v !== undefined) result[key] = v;
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
              const v = (payload as Record<string, unknown>)[src];
              result[key] = m.verbatim ? v : mapKeys(m.type, v, "decode", rootDict);
            }
          }
        }
        return validate(result);
      },
    });
  };

  const call = (op: API.PreparedOperation, input: unknown): Effect.Effect<unknown> =>
    Effect.withFiber((fiber) => {
      const context = fiber.context as Context.Context<any>;
      return withCredentials(context, (creds) => {
        const request = requestFor(creds, input, op.inputAst);
        const client = Context.get(context, HttpClient.HttpClient);
        return Effect.flatMap(client.execute(request), (response) =>
          decodeResponse(context, response, op.outputAst, op.errors),
        );
      });
    }) as Effect.Effect<unknown>;

  return API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) => encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: ({ response, outputAst, errors }) =>
      Effect.withFiber((fiber) =>
        decodeResponse(fiber.context as Context.Context<any>, response, outputAst, errors),
      ),
    call,
  });
};

export const CloudflareProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ makeProtocol({ resultInfo: false }),
);

/**
 * Protocol for paginated operations: identical to {@link CloudflareProtocol}
 * except the envelope's top-level `result_info` is kept on the response (as
 * the member marked `T.ResultInfo()`, camelCased) so `.pages()` / `.items()`
 * can advance and callers can read totals.
 */
export const CloudflarePaginatedProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ makeProtocol({ resultInfo: true }),
);
