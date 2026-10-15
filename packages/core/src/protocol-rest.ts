/**
 * Generic REST protocol factory for simple bearer/header-auth JSON APIs
 * (Neon, Fly.io, PlanetScale, Supabase, Turso, ...).
 *
 * `makeRestProtocol(options)` builds a core {@link API.Protocol} layer:
 *
 *   request:  credentials resolved from the CALLING fiber's context on every
 *             request (the layer itself is memoized per process -- see
 *             `core/api`), auth headers + base URL from the provider's
 *             options, request built by `buildRequest` from
 *             `core/protocol-http` (deep-unwrapping any `Redacted` input
 *             values first)
 *
 *   response: 2xx JSON -> optional `transformResponse` -> recursive wire->TS
 *             key mapping (`mapKeys`) -> in strict mode, a schema check
 *             failing with the provider's `parseError` (see
 *             `core/response-validation`) -> `Redacted` wrapping of members
 *             marked with {@link SensitiveValue}; non-2xx -> typed error:
 *             per-op matcher classes (`matchTypedError`), then the status
 *             map (default `HTTP_STATUS_MAP`), then an `InternalServerError`
 *             for unmapped 5xx, then the provider's `unknownError` fallback
 *             -- with `retryAfter` durations stamped from the standard hint
 *             headers on retryable statuses.
 *
 * Anything provider-specific (envelope quirks, bespoke error codes) belongs
 * in the provider package -- via these options or a hand-written protocol.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import * as API from "./api.ts";
import { debugHttp } from "./debug.ts";
import { HTTP_STATUS_MAP, InternalServerError } from "./errors.ts";
import {
  buildRequest,
  getAnn,
  getPropAnn,
  getProps,
  isOpaqueValue,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
  resolveNode,
} from "./protocol-http.ts";
import { checkResponse } from "./response-validation.ts";
import { parseRetryAfterForStatus } from "./retry-after.ts";
import { httpSymbol, makeAnnotation, type HttpTrait } from "./trait.ts";

// =============================================================================
// Traits
// =============================================================================

export const sensitiveValueSymbol = /*@__PURE__*/ Symbol.for(
  "@distilled.cloud/core/sensitive-value",
);
/**
 * Marks a string member as sensitive (mirrors `smithy.api#sensitive`).
 * The REST protocol wraps decoded values in `Redacted` on the way out and
 * accepts `string | Redacted<string>` on the way in (unwrapped before
 * serialization). Takes an ignored argument so generators can inline the
 * smithy trait value (`T.SensitiveValue({})`).
 */
export const SensitiveValue = (_value?: unknown) => makeAnnotation(sensitiveValueSymbol, true);

export const rawResponseSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/raw-response");
/**
 * Marks the sole output member that carries a bare (array/scalar) response
 * body (mirrors `com.distilled.openapi#rawResponse`).
 */
export const RawResponse = (_value?: unknown) => makeAnnotation(rawResponseSymbol, true);

export const rawResponseRootSymbol = /*@__PURE__*/ Symbol.for(
  "@distilled.cloud/core/raw-response-root",
);
/**
 * Marks a response schema whose ENTIRE value is the response body (the
 * generator's `rootPipe` for synthesized bare-payload wrappers): the emitted
 * response type IS the payload type and the protocol returns the mapped body
 * directly.
 */
export const RawResponseRoot = () => makeAnnotation(rawResponseRootSymbol, true);

export const binaryResponseSymbol = /*@__PURE__*/ Symbol.for(
  "@distilled.cloud/core/binary-response",
);

/** Decode a successful raw binary response as bytes, without text conversion. */
export const BinaryResponse = () => makeAnnotation(binaryResponseSymbol, true);

// =============================================================================
// Value helpers
// =============================================================================

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  !isOpaqueValue(v) &&
  (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);

/**
 * Deep-unwrap `Redacted` values in an input (plain objects/arrays only --
 * class instances, files, and binary payloads pass through untouched).
 * Sensitive input members accept `string | Redacted<string>`; the wire wants
 * the raw string.
 */
export const unwrapRedactedDeep = (value: unknown): unknown => {
  if (Redacted.isRedacted(value)) return Redacted.value(value);
  if (Array.isArray(value)) return value.map(unwrapRedactedDeep);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = unwrapRedactedDeep(v);
    }
    return out;
  }
  return value;
};

/**
 * Walk a decoded (TS-named) value alongside its schema AST, wrapping members
 * marked {@link SensitiveValue} in `Redacted`. Keys the schema doesn't model
 * pass through verbatim.
 */
export const wrapSensitive = (ast: AST.AST, value: unknown): unknown => {
  if (value === null || typeof value !== "object" || isOpaqueValue(value)) {
    return value;
  }
  const node = resolveNode(ast);
  if (node._tag === "Union") {
    // Redact every possible sensitive member, including in partial responses.
    return node.types.reduce<unknown>((redacted, arm) => wrapSensitive(arm, redacted), value);
  }
  if (node._tag === "Arrays") {
    if (!Array.isArray(value)) return value;
    const elem = (node as any).rest?.[0] as AST.AST | undefined;
    return elem ? value.map((v) => wrapSensitive(elem, v)) : value;
  }
  if (node._tag === "Objects" && !Array.isArray(value)) {
    const props = getProps(node);
    if (props.length === 0) return value;
    const byName = new Map(props.map((p) => [String(p.name), p]));
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      const prop = byName.get(k);
      if (!prop) {
        out[k] = v;
      } else if (getPropAnn(prop, sensitiveValueSymbol) !== undefined && typeof v === "string") {
        out[k] = Redacted.make(v);
      } else {
        out[k] = wrapSensitive(prop.type, v);
      }
    }
    return out;
  }
  return value;
};

// =============================================================================
// Protocol factory
// =============================================================================

/** What the wire said about a failure, for the `unknownError` fallback. */
export interface RestErrorInfo {
  readonly status: number;
  /** Error code from the envelope (services vary between string and number). */
  readonly code?: string | number;
  readonly message: string;
  /** Parsed JSON body, or the raw text when the body wasn't JSON. */
  readonly body: unknown;
  readonly headers: Record<string, string | undefined>;
}

/** A 2xx body that failed strict validation, for the `parseError` option. */
export interface RestParseErrorInfo {
  readonly body: unknown;
  readonly cause: unknown;
}

export interface RestErrorEnvelope {
  readonly code?: string | number;
  readonly message?: string;
}

export interface RestProtocolOptions<C> {
  /**
   * Resolve credentials ON THE CALLING FIBER -- evaluated per request, never
   * at layer build time, so context-provided credentials and token refreshes
   * are picked up. Either an effect, or -- for the distilled
   * credentials-service convention -- the `Credentials` service key whose
   * value is that effect (read from the calling fiber's context; an
   * already-resolved `Effect.succeed` value costs no extra fiber step). Its
   * error/requirement channels are
   * erased at the protocol boundary (Protocol effects carry none) and
   * reintroduced for callers by the generated `<Sdk>OpError` /
   * `<Sdk>OpContext` annotations.
   */
  readonly credentials: Effect.Effect<C, any, any> | Context.Key<any, Effect.Effect<C, any, any>>;
  /**
   * API base URL from the resolved credentials. Receives the operation's
   * route so APIs with more than one endpoint (e.g. S2's account vs
   * per-basin hosts, chosen by path) can route per request; single-endpoint
   * providers ignore the argument. A THROWN error (e.g. a required scope
   * missing from the credentials) is caught and surfaced on the calling
   * effect's error channel rather than dying as a defect.
   */
  readonly baseUrl: (
    credentials: C,
    target: { readonly uri: string; readonly method: string },
  ) => string;
  /** Auth (and any fixed) headers from the resolved credentials. */
  readonly headers: (credentials: C) => Record<string, string>;
  /**
   * Extract `{ code?, message? }` from a parsed non-2xx JSON body. Default:
   * lenient `{ code?, message? | error? }` (covers the common REST error
   * envelopes).
   */
  readonly errorEnvelope?: (body: unknown) => RestErrorEnvelope | undefined;
  /**
   * HTTP status -> error class constructed as `new Cls({ message, retryAfter
   * })`. Default: core `HTTP_STATUS_MAP`. Consulted after per-op typed error
   * matching; unmapped 5xx fall back to `InternalServerError`, everything
   * else to {@link unknownError}.
   */
  readonly statusMap?: Readonly<Record<number, new (args: any) => any>>;
  /** Fallback error for failures nothing else matched. */
  readonly unknownError: (info: RestErrorInfo) => unknown;
  /**
   * The SDK's `<Sdk>ParseError`, raised when a 2xx body does not match the
   * operation's output schema in strict mode (see
   * `core/response-validation`). `body` is the parsed JSON, or the raw text
   * when the body wasn't JSON; `cause` is the schema error.
   */
  readonly parseError: (info: RestParseErrorInfo) => unknown;
  /** Transform the parsed 2xx JSON before decoding (e.g. stripNulls). */
  readonly transformResponse?: (body: unknown) => unknown;
  /** Passed through to `buildRequest` (member-header transforms). */
  readonly mapMemberHeader?: (name: string, value: string) => string;
  /** Passed through to `buildRequest` (wire names for unmodeled input keys). */
  readonly unknownKeyToWire?: (key: string) => string;
}

const defaultErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  const message =
    typeof b.message === "string" ? b.message : typeof b.error === "string" ? b.error : undefined;
  return { code, message };
};

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel),
// but REST failures are real typed errors that operations re-surface via
// their `errors: [...]` lists. Fail with the instance and erase the type
// here; the generated operation annotations reintroduce it for callers.
const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

/** Whether {@link wrapSensitive} can change any value of `root`. Cached per schema. */
export const hasSensitive = (root: AST.AST): boolean => {
  let result = sensitiveCache.get(root);
  if (result !== undefined) return result;
  result = false;
  const seen = new Set<AST.AST>();
  const stack: AST.AST[] = [root];
  walk: while (stack.length > 0) {
    const ast = stack.pop()!;
    if (seen.has(ast)) continue;
    seen.add(ast);
    const node = resolveNode(ast);
    if (node._tag === "Union") {
      for (const t of (node as AST.Union).types) stack.push(t);
    } else if (node._tag === "Arrays") {
      const elem = (node as any).rest?.[0] as AST.AST | undefined;
      if (elem) stack.push(elem);
    } else if (node._tag === "Objects") {
      for (const p of getProps(node)) {
        if (getPropAnn(p, sensitiveValueSymbol) !== undefined) {
          result = true;
          break walk;
        }
        stack.push(p.type);
      }
    }
  }
  sensitiveCache.set(root, result);
  return result;
};
const sensitiveCache = /*@__PURE__*/ new WeakMap<AST.AST, boolean>();

/** Per-operation decode facts, read from the output schema once. */
interface DecodePlan {
  readonly binary: boolean;
  readonly verbatim: boolean;
  readonly sensitive: boolean;
}

const decodePlans = /*@__PURE__*/ new WeakMap<AST.AST, DecodePlan>();
const decodePlanFor = (outputAst: AST.AST): DecodePlan => {
  let plan = decodePlans.get(outputAst);
  if (plan === undefined) {
    plan = {
      binary: getAnn(outputAst, binaryResponseSymbol) !== undefined,
      verbatim: mapsVerbatim(outputAst, "decode"),
      sensitive: hasSensitive(outputAst),
    };
    decodePlans.set(outputAst, plan);
  }
  return plan;
};

/**
 * The outcome of decoding a response body: the value, or the failure the
 * call fails with. Plain data, so decoding stays synchronous.
 */
type Decoded =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly error: unknown };

/**
 * Build a `Layer<Protocol>` for a simple REST JSON API. Assign the result to
 * a module-level const in the provider's `protocol.ts` -- `API.make` memoizes
 * protocol layers by value identity.
 */
export const makeRestProtocol = <C>(options: RestProtocolOptions<C>): Layer.Layer<API.Protocol> => {
  const errorEnvelope = options.errorEnvelope ?? defaultErrorEnvelope;
  const statusMap: Readonly<Record<number, (new (args: any) => any) | undefined>> =
    options.statusMap ?? HTTP_STATUS_MAP;
  const credentialsKey = Context.isKey(options.credentials)
    ? (options.credentials as Context.Key<any, Effect.Effect<C, any, any>>)
    : undefined;
  const credentialsEffect = options.credentials as Effect.Effect<C>;

  /** The calling fiber's credentials, then `f` on them. */
  const withCredentials = <B>(
    context: Context.Context<any>,
    f: (creds: C) => Effect.Effect<B, any, any>,
  ): Effect.Effect<B, any, any> =>
    API.withValue(
      credentialsKey === undefined ? credentialsEffect : Context.get(context, credentialsKey),
      f,
    );

  /** The request, or the error a refusing `baseUrl` threw. */
  const requestFor = (
    creds: C,
    input: unknown,
    inputAst: AST.AST,
  ): HttpClientRequest.HttpClientRequest | { readonly refused: unknown } => {
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    let baseUrl: string;
    try {
      baseUrl = options.baseUrl(creds, {
        uri: http?.uri ?? "",
        method: http?.method ?? "",
      });
    } catch (e) {
      // A baseUrl that refuses the route (missing scope in the
      // credentials) fails the call with that error, typed for callers by
      // the operation's declared error channel.
      return { refused: e };
    }
    return buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl,
      headers: options.headers(creds),
      mapMemberHeader: options.mapMemberHeader,
      unknownKeyToWire: options.unknownKeyToWire,
    });
  };

  /** Map a read response body to the call's outcome. */
  const decodeText = (
    context: Context.Context<any>,
    status: number,
    headers: Record<string, string | undefined>,
    text: string,
    outputAst: AST.AST,
    errorClasses: ReadonlyArray<unknown>,
  ): Decoded => {
    // Read as text and parse tolerantly -- error pages are often non-JSON.
    if (debugHttp()) {
      console.error(`[distilled] <- ${status}`);
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

    if (status >= 400) {
      const env = (nonJson ? undefined : errorEnvelope(json)) ?? {};
      const message = env.message ?? (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);

      // 1. Per-operation typed error (matcher metadata on the class).
      const typed = matchTypedError(
        errorClasses,
        status,
        [
          {
            code: typeof env.code === "number" ? env.code : undefined,
            message,
          },
        ],
        { body: nonJson ? text : json, headers },
      );
      if (typed !== undefined) return { ok: false, error: typed };

      // 2. Status-mapped class (retryAfter only stamps on retryable
      //    statuses -- parseRetryAfterForStatus gates on that).
      const StatusErrorClass = statusMap[status];
      if (StatusErrorClass) {
        return {
          ok: false,
          error: new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        };
      }

      // 3. Unmapped 5xx (e.g. proxy-specific statuses) -> retryable server
      //    error rather than the unknown fallback.
      if (status >= 500) {
        return {
          ok: false,
          error: new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        };
      }

      // 4. Provider fallback.
      return {
        ok: false,
        error: options.unknownError({
          status,
          code: env.code,
          message,
          body: nonJson ? text : json,
          headers,
        }),
      };
    }

    // 2xx: the response body IS the payload (no envelope). Wire->TS key
    // mapping is schema-driven; `RawResponseRoot` responses are the body
    // verbatim (mapKeys handles arrays/scalars structurally either way).
    // Strict mode (core/response-validation) checks the mapped body against
    // the output schema -- a non-JSON body reaches it as a string and fails
    // there unless the operation's output is itself a string.
    const plan = decodePlanFor(outputAst);
    let body: unknown = nonJson ? text : (json ?? {});
    if (options.transformResponse) body = options.transformResponse(body);
    const mapped = plan.verbatim ? body : mapKeys(outputAst, body, "decode");
    const invalid = checkResponse(context, outputAst, mapped);
    if (invalid !== undefined) {
      return {
        ok: false,
        error: options.parseError({ body: nonJson ? text : json, cause: invalid }),
      };
    }
    return { ok: true, value: plan.sensitive ? wrapSensitive(outputAst, mapped) : mapped };
  };

  const decodeResponse = (
    context: Context.Context<any>,
    response: HttpClientResponse.HttpClientResponse,
    outputAst: AST.AST,
    errorClasses: ReadonlyArray<unknown>,
  ): Effect.Effect<unknown> =>
    response.status >= 200 && response.status < 300 && decodePlanFor(outputAst).binary
      ? Effect.map(Effect.orDie(response.arrayBuffer), (bytes) => new Uint8Array(bytes))
      : Effect.matchEffect(response.text, {
          onFailure: Effect.die,
          onSuccess: (text) => {
            const decoded = decodeText(
              context,
              response.status,
              response.headers as Record<string, string | undefined>,
              text ?? "",
              outputAst,
              errorClasses,
            );
            return decoded.ok ? Effect.succeed(decoded.value) : fail(decoded.error);
          },
        });

  const call = (op: API.PreparedOperation, input: unknown): Effect.Effect<unknown> =>
    Effect.withFiber((fiber) => {
      const context = fiber.context as Context.Context<any>;
      return withCredentials(context, (creds) => {
        const request = requestFor(creds, input, op.inputAst);
        if ("refused" in request) return fail(request.refused);
        const client = Context.get(context, HttpClient.HttpClient);
        return Effect.flatMap(client.execute(request), (response) =>
          decodeResponse(context, response, op.outputAst, op.errors),
        );
      });
    }) as Effect.Effect<unknown>;

  return Layer.succeed(
    API.Protocol,
    API.Protocol.of({
      // Erase encode's credentials requirement (resolved on the calling
      // fiber; see RestProtocolOptions.credentials).
      encode: ({ input, inputAst }) =>
        Effect.withFiber((fiber) =>
          withCredentials(fiber.context as Context.Context<any>, (creds) => {
            const request = requestFor(creds, input, inputAst);
            return "refused" in request ? fail(request.refused) : Effect.succeed(request);
          }),
        ) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
      decode: ({ response, outputAst, errors }) =>
        Effect.withFiber((fiber) =>
          decodeResponse(fiber.context as Context.Context<any>, response, outputAst, errors),
        ),
      call,
    }),
  );
};
