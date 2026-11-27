import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import type * as Stream from "effect/Stream";
import { rawResponseRootSymbol, resolveNode } from "./annotations.ts";
import * as API from "./api.ts";
import { HTTP_STATUS_MAP, InternalServerError } from "./errors.ts";
import { recordPageHeaders } from "./pagination.ts";
import { isEffectStream, unwrapRedactedDeep } from "./plain-values.ts";
import {
  binaryBodySymbol,
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  mapsVerbatim,
  matchTypedError,
  responseErrorFields,
  responseHeaderMembers,
  withResponseHeaders,
  type InvalidInput,
  type ResponseHeaderMember,
} from "./protocol-http.ts";
import type {
  DecodeArgs,
  EncodeArgs,
  Operation,
  DeclaredError,
  DeclaredErrorClass,
  Protocol,
} from "./protocol.ts";
import { checkResponse, withholdActual } from "./response-validation.ts";
import { parseRetryAfterForStatus } from "./retry-after.ts";
import * as Lite from "./schema-lite-impl.ts";
import { SdkError } from "./sdk-error.ts";
import * as Send from "./send.ts";
import { holdsSensitive, sensitiveValueSymbol, wrapSensitive } from "./sensitive.ts";
/**
 * Generic REST protocol factory for simple bearer/header-auth JSON APIs
 * (Neon, Fly.io, PlanetScale, Supabase, Turso, ...).
 *
 * `restProtocol(options)` builds a core protocol (core/protocol):
 *
 *   request:  credentials resolved from the CALLING fiber's context on every
 *             request, auth headers + base URL from the provider's
 *             options, request built by `buildRequest` from
 *             `core/protocol-http` (deep-unwrapping any `Redacted` input
 *             values first)
 *
 *   response: 2xx JSON -> optional `transformResponse` -> recursive wire->TS
 *             key mapping (`mapKeys`) -> in strict mode, a schema check
 *             failing with the provider's `parseError` (see
 *             `core/response-validation`) -> `Redacted` wrapping of members
 *             marked with {@link SensitiveValue}; non-2xx -> typed error:
 *             the provider's `classifyError`, then a class the operation
 *             or its service declares (by its matchers, `matchTypedError`,
 *             or by status for one of core's status classes), then an
 *             `InternalServerError` for any other 5xx, then the provider's
 *             `unknownError` fallback
 *             -- with `retryAfter` durations stamped from the standard hint
 *             headers on retryable statuses.
 *
 *   stream:   an `API.makeStreaming` operation with a `framing` config
 *             ({@link StreamFraming}) emits each frame of the body as it
 *             arrives, decoded as one element of the output's `items`; a
 *             plain call collects them.
 *
 * Anything provider-specific (envelope quirks, bespoke error codes) belongs
 * in the provider package -- via these options or a hand-written protocol.
 */
import { httpSymbol, makeAnnotation, type HttpTrait } from "./trait.ts";
import type { UnknownErrorProps } from "./unknown-error.ts";

// =============================================================================
// Traits
// =============================================================================

export { sensitiveValueSymbol };
/**
 * Marks a string member, map value or list element as sensitive (mirrors
 * `smithy.api#sensitive`). The REST protocol wraps decoded values in
 * `Redacted` on the way out (an untyped `S.Unknown` value whole) and
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

/**
 * Marks a response schema whose ENTIRE value is the response body (the
 * generator's `rootPipe` for synthesized bare-payload wrappers): the emitted
 * response type IS the payload type and the protocol returns the mapped body
 * directly.
 */
export { rawResponseRootSymbol };
export const RawResponseRoot = () => makeAnnotation(rawResponseRootSymbol, true);

export const binaryResponseSymbol = /*@__PURE__*/ Symbol.for(
  "@distilled.cloud/core/binary-response",
);

/**
 * Decode a successful raw binary response as a {@link BinaryStream} of the
 * body, never read as text or into one buffer. On a whole output, the
 * output is the stream. On the `RawResponse()` member of a structure
 * output, that member gets the stream and the structure's `Header` members
 * get their response headers (a download's `Content-Type`).
 */
export const BinaryResponse = () => makeAnnotation(binaryResponseSymbol, true);

/**
 * A binary download's body, read as it arrives. It fails with the
 * `HttpClientError` of a read that breaks off (a connection reset).
 * `Stream.mkUint8Array` collects it into one buffer.
 */
export type BinaryStream = Stream.Stream<Uint8Array, HttpClientError.HttpClientError>;

/**
 * A lite declaration whose type guard strict validation applies. Lite
 * `declare` keeps no guard, so the node carries it as `check`.
 */
const declared = <A>(check: (u: unknown) => boolean, annotations: Lite.Annotations) =>
  Lite.fromNode({
    _tag: "Declaration",
    typeParameters: [],
    check,
    annotations,
  }) as unknown as Schema.Schema<A>;

/** The schema of a {@link BinaryStream}, for a binary download's body member. */
export const BinaryStream = /*@__PURE__*/ declared<BinaryStream>(isEffectStream, {
  identifier: "BinaryStream",
});

/**
 * A binary upload's body from a stream: a `T.HttpBody()` member may take
 * one, and the protocol sends it as it is pulled, without buffering it.
 * A stream can be sent once, so a call with one is never retried. With no
 * modeled `Content-Length` member set, the body goes out chunked.
 */
export type UploadStream = Stream.Stream<Uint8Array, unknown>;

/** A raw request body (`T.HttpBody()` on a binary member): what `buildRequest` sends verbatim. */
export type RawBody = string | Uint8Array | ArrayBuffer | Blob | UploadStream;

/** The schema of a {@link RawBody}, for a binary upload's body member. */
export const RawBody = /*@__PURE__*/ declared<RawBody>(
  (u) =>
    typeof u === "string" ||
    u instanceof Uint8Array ||
    u instanceof ArrayBuffer ||
    u instanceof Blob ||
    isEffectStream(u),
  { identifier: "RawBody", [binaryBodySymbol]: true },
);

// =============================================================================
// Value helpers
// =============================================================================

export { unwrapRedactedDeep };

export { wrapSensitive };

/**
 * Whether any member, map value or list element reachable from `ast` is
 * marked {@link SensitiveValue}. Such an output is decoded through
 * {@link wrapSensitive}, and its parse errors withhold the response body (see
 * {@link checkSuccess}, which every REST-style protocol's success path uses).
 */
export const hasSensitiveMember: (ast: AST.AST) => boolean = holdsSensitive;

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

/**
 * The core {@link UnknownErrorProps} of a failure, for an SDK's
 * `unknownError`: `new UnknownNeonError(unknownErrorProps(info))`. A number
 * code becomes its string.
 */
export const unknownErrorProps = (info: RestErrorInfo): UnknownErrorProps => ({
  status: info.status,
  code: info.code === undefined ? undefined : String(info.code),
  message: info.message,
  body: info.body,
});

/**
 * A 2xx body that failed strict validation, or a non-JSON 2xx body for an
 * output with sensitive members, for the `parseError` option.
 */
export interface RestParseErrorInfo {
  /** `"[REDACTED]"` when the output has sensitive members. */
  readonly body: unknown;
  readonly cause: unknown;
}

export interface RestErrorEnvelope {
  readonly code?: string | number;
  readonly message?: string;
}

/**
 * What this module's own code fails with, whatever the options: the errors
 * every REST protocol declares. A label that would address another resource
 * (`InvalidInput`), a request it can't build or an operation it can't
 * stream (`SdkError`), the transport or a body read (`HttpClientError`), and
 * a 5xx response that neither the operation nor its service declares
 * (`InternalServerError`, which the retry policy retries).
 */
export type RestProtocolError =
  | InvalidInput
  | SdkError
  | HttpClientError.HttpClientError
  | InternalServerError;

/**
 * Options of {@link restProtocol}. The type parameters after `Credentials`
 * are what each option fails with or reads; `restProtocol` infers them from
 * the options, and they are the errors its protocol declares.
 */
export interface RestProtocolOptions<
  Credentials,
  CredentialsError,
  CredentialsRequirements,
  RouteError,
  ClassifiedError,
  UnknownError,
  ParseError,
> {
  /**
   * Resolve credentials ON THE CALLING FIBER -- evaluated per request, so
   * context-provided credentials and token refreshes are picked up. Either
   * an effect, or -- for the distilled credentials-service convention --
   * the `Credentials` service key whose value is that effect (read from the calling fiber's context; an
   * already-resolved `Effect.succeed` value costs no extra fiber step). What
   * it fails with (declared on the credentials) reaches every operation
   * through the protocol, and what it reads is the protocol's requirement.
   */
  readonly credentials:
    | Effect.Effect<Credentials, CredentialsError, CredentialsRequirements>
    | Context.Key<CredentialsRequirements, Effect.Effect<Credentials, CredentialsError>>;
  /**
   * API base URL from the resolved credentials. Receives the operation's
   * route so APIs with more than one endpoint (e.g. S2's account vs
   * per-basin hosts, chosen by path) can route per request; single-endpoint
   * providers ignore the argument. `server` is the operation's host name
   * (`T.Http({ server })`) for APIs that serve some operations from another
   * host; map it to a base URL from the credentials. To refuse a route (e.g.
   * a required scope missing from the credentials), return `Effect.fail` of
   * the error the call fails with. A THROWN error fails the call with
   * `SdkError`, as anything thrown under a call does (the defect boundary,
   * `./api.ts`).
   */
  readonly baseUrl: (
    credentials: Credentials,
    target: { readonly uri: string; readonly method: string; readonly server?: string | undefined },
  ) => string | Effect.Effect<never, RouteError>;
  /** Auth (and any fixed) headers from the resolved credentials. */
  readonly headers: (credentials: Credentials) => Record<string, string>;
  /**
   * Extract `{ code?, message? }` from a parsed non-2xx JSON body. Default:
   * lenient `{ code?, message? | error? }` (covers the common REST error
   * envelopes).
   */
  readonly errorEnvelope?: (body: unknown) => RestErrorEnvelope | undefined;
  /**
   * JSON pointer to the object that holds a failure's fields when the
   * provider nests them, e.g. `"/error"` for `{ error: { status, details } }`.
   * A typed error's declared fields are read there first, then at the top
   * level of the body.
   */
  readonly errorFieldsAt?: string;
  /**
   * The provider's own reading of a failure, consulted before the classes
   * the operation and its service declare: return the error to fail with, or
   * `undefined` to decode the failure as usual. For rules a status alone
   * can't express, e.g. a 403 that is a rate limit because of its headers.
   */
  readonly classifyError?: (info: RestErrorInfo) => ClassifiedError | undefined;
  /**
   * Fallback error for failures nothing else matched: the SDK's
   * `Unknown<Sdk>Error`, built from {@link unknownErrorProps}. Only non-5xx
   * statuses reach it (an undeclared 5xx is `InternalServerError`), so the
   * class carries no retryable category.
   */
  readonly unknownError: (info: RestErrorInfo) => UnknownError;
  /**
   * The SDK's `<Sdk>ParseError`, raised when a 2xx body does not match the
   * operation's output schema in strict mode (see
   * `core/response-validation`), and in every mode when a 2xx body for an
   * output with sensitive members is not JSON. `body` is the parsed JSON, or
   * the raw text when the body wasn't JSON, and `"[REDACTED]"` for an output
   * with sensitive members; `cause` is the schema error, or `"Invalid JSON
   * response"`.
   */
  readonly parseError: (info: RestParseErrorInfo) => ParseError;
  /** Transform the parsed 2xx JSON before decoding (e.g. stripNulls). */
  readonly transformResponse?: (body: unknown) => unknown;
  /** Passed through to `buildRequest` (member-header transforms). */
  readonly mapMemberHeader?: (name: string, value: string) => string;
  /** Passed through to `buildRequest` (wire names for unmodeled input keys). */
  readonly unknownKeyToWire?: (key: string) => string;
  /** Passed through to `buildRequest`: send `{}` when a bodied call has no body members. */
  readonly emptyJsonBody?: boolean;
}

/**
 * The body of a streamed 2xx response, for {@link StreamFraming.stream}.
 * `Failure` is what the call fails with.
 */
export interface FramedBody<Failure> {
  readonly body: Stream.Stream<Uint8Array, Failure>;
  /**
   * Decode one parsed frame as one element of the output's `items`, as a
   * 2xx body decodes (key mapping, strict validation, `Redacted`).
   */
  readonly item: (json: unknown, text: string) => Effect.Effect<unknown, Failure>;
  /** The SDK's parse error for a frame that is not JSON. */
  readonly invalid: (text: string) => Failure;
}

/** A plain call's framed body, read whole: the output JSON, or not JSON. */
export interface CollectedBody {
  readonly json: unknown;
  readonly nonJson: boolean;
}

/**
 * How a server-streaming operation's body is framed (`API.makeStreaming`,
 * output `{ items }`): its `framing` config, e.g. `ndjson` from
 * core/ndjson. An operation without one can't stream (`.stream()` fails
 * with `SdkError`, see `API.cannotStream`).
 */
export interface StreamFraming {
  /**
   * A plain call's whole body as `{ items }`, or `undefined` when the
   * response's `Content-Type` is not this framing (decoded as usual).
   */
  readonly collect: (text: string, contentType: string | undefined) => CollectedBody | undefined;
  /**
   * Each frame as it arrives, through `item`. `open` sends the request and
   * fails with the operation's typed error on a failed status.
   */
  readonly stream: <Failure, Requirements>(
    open: Effect.Effect<FramedBody<Failure>, Failure, Requirements>,
  ) => Stream.Stream<unknown, Failure, Requirements>;
}

const defaultErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  const message =
    typeof b.message === "string" ? b.message : typeof b.error === "string" ? b.error : undefined;
  return { code, message };
};

// =============================================================================
// 2xx bodies
// =============================================================================

/** A 2xx body a protocol read, for {@link checkSuccess}. */
export interface SuccessBody {
  /** The value to check and return: the body mapped onto the output's TS names. */
  readonly value: unknown;
  /** What a parse error reports as `body` for an output without sensitive members. */
  readonly body: unknown;
  /** Whether the body was not JSON. */
  readonly nonJson: boolean;
}

/** The outcome of {@link checkSuccess}: the value, or the parse error's fields. */
export type SuccessCheck =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly error: RestParseErrorInfo };

/**
 * Check a 2xx body against the operation's output schema and deliver its
 * sensitive values as `Redacted`. Every REST-style protocol ends its success
 * path here, so all of them treat a body that can hold a secret alike:
 *
 * - The checked value comes back through {@link wrapSensitive}.
 * - A mismatch (validating modes, see `core/response-validation`) reports
 *   `read.body` and the schema error.
 * - For an output with sensitive members ({@link hasSensitiveMember}), a
 *   non-JSON body fails in every mode with `"Invalid JSON response"`, and a
 *   mismatch reports `body: "[REDACTED]"` and the schema error without the
 *   value it found (`withholdActual`).
 *
 * Synchronous, for protocols that already hold the calling fiber's context;
 * {@link validateSuccess} is the `Effect` form.
 */
export const checkSuccess = (
  context: Context.Context<any>,
  outputAst: AST.AST,
  read: SuccessBody,
): SuccessCheck => {
  const sensitive = hasSensitiveMember(outputAst);
  if (read.nonJson && sensitive) {
    return { ok: false, error: { body: "[REDACTED]", cause: "Invalid JSON response" } };
  }
  const invalid = checkResponse(context, outputAst, read.value);
  if (invalid !== undefined) {
    return {
      ok: false,
      error: sensitive
        ? { body: "[REDACTED]", cause: withholdActual(invalid) }
        : { body: read.body, cause: invalid },
    };
  }
  return { ok: true, value: sensitive ? wrapSensitive(outputAst, read.value) : read.value };
};

/**
 * {@link checkSuccess} on the calling fiber, failing with `parseError` (the
 * SDK's `<Sdk>ParseError`) built from the withheld-or-not fields.
 */
export const validateSuccess = <E>(
  outputAst: AST.AST,
  read: SuccessBody,
  parseError: (info: RestParseErrorInfo) => E,
): Effect.Effect<unknown, E> =>
  Effect.withFiber((fiber) => {
    const checked = checkSuccess(fiber.context as Context.Context<any>, outputAst, read);
    return checked.ok ? Effect.succeed(checked.value) : Effect.fail(parseError(checked.error));
  });

/** Per-operation decode facts, read from the output schema once. */
interface DecodePlan {
  /** The whole output is the body's bytes. */
  readonly binary: boolean;
  /** The structure member that gets the body's bytes, next to its header members. */
  readonly binaryMember: string | undefined;
  readonly verbatim: boolean;
  /**
   * A member of a structure output that receives the whole body
   * (`T.RawResponse()` next to header members), e.g. a bare JSON array with
   * its next-page token in a response header.
   */
  readonly bodyMember: AST.PropertySignature | undefined;
  /** The output is a bare string, so an empty body decodes to `""`. */
  readonly text: boolean;
  /** Members read from response headers (`T.Header`). */
  readonly headers: ReadonlyArray<ResponseHeaderMember>;
}

const decodePlans = /*@__PURE__*/ new WeakMap<AST.AST, DecodePlan>();
const decodePlanFor = (outputAst: AST.AST): DecodePlan => {
  let plan = decodePlans.get(outputAst);
  if (plan === undefined) {
    const bodyMember = getProps(outputAst).find((prop) => hasPropAnn(prop, rawResponseSymbol));
    plan = {
      binary: getAnn(outputAst, binaryResponseSymbol) !== undefined,
      binaryMember:
        bodyMember !== undefined && hasPropAnn(bodyMember, binaryResponseSymbol)
          ? String(bodyMember.name)
          : undefined,
      verbatim: mapsVerbatim(outputAst, "decode"),
      text: resolveNode(outputAst)._tag === "String",
      headers: responseHeaderMembers(outputAst),
      bodyMember,
    };
    decodePlans.set(outputAst, plan);
  }
  return plan;
};

/**
 * Read a 2xx response of a binary output ({@link BinaryResponse}) as a
 * {@link BinaryStream}: the stream itself for a binary whole output, or the
 * structure with the stream in its body member and its header members
 * filled. `undefined` when the output is not binary. The call returns once
 * the headers arrive; a body read that fails later (reset or abort
 * mid-body) fails the stream with its `HttpClientError`. For hand-written
 * protocols too, so every SDK decodes a download the same way.
 */
export const readBinaryResponse = (
  response: HttpClientResponse.HttpClientResponse,
  outputAst: AST.AST,
): Effect.Effect<unknown> | undefined => {
  const plan = decodePlanFor(outputAst);
  const body: BinaryStream = response.stream;
  if (plan.binary) return Effect.succeed(body);
  const member = plan.binaryMember;
  if (member === undefined) return undefined;
  return Effect.succeed(
    withResponseHeaders(
      plan.headers,
      { [member]: body },
      response.headers as Record<string, string | undefined>,
    ),
  );
};

/**
 * The outcome of decoding a response body: the value, or the failure the
 * call fails with. Plain data, so decoding stays synchronous.
 */
type Decoded<Failure> =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly error: Failure };

/**
 * The class core has for `status`, when the operation or its service
 * declares it: a list of declared errors can hold core's status classes
 * (`Unauthorized`, `TooManyRequests`, ...), which are matched by status.
 * For a protocol that reads failed responses itself.
 */
export const declaredStatusClass = (
  status: number,
  declared: ReadonlyArray<DeclaredErrorClass>,
): DeclaredErrorClass | undefined => {
  const core: unknown = (HTTP_STATUS_MAP as Readonly<Record<number, unknown>>)[status];
  return core === undefined ? undefined : declared.find((cls) => cls === core);
};

/**
 * The methods of {@link restProtocol}, for either form of `credentials`.
 * For the protocols core builds on them (core/protocol-grpc).
 */
export const restProtocolMethods = <
  Credentials,
  CredentialsError = never,
  CredentialsRequirements = never,
  RouteError = never,
  ClassifiedError = never,
  UnknownError = never,
  ParseError = never,
>(
  options: RestProtocolOptions<
    Credentials,
    CredentialsError,
    CredentialsRequirements,
    RouteError,
    ClassifiedError,
    UnknownError,
    ParseError
  >,
): Protocol<
  CredentialsError | RouteError | ClassifiedError | UnknownError | ParseError | RestProtocolError,
  CredentialsRequirements
> => {
  /** What a request that can't be built fails with. */
  type RequestError = RouteError | InvalidInput | SdkError;
  /** Everything a call fails with. */
  type Failure =
    | DeclaredError
    | ClassifiedError
    | UnknownError
    | ParseError
    | CredentialsError
    | RequestError
    | InternalServerError
    | HttpClientError.HttpClientError;

  const errorEnvelope = options.errorEnvelope ?? defaultErrorEnvelope;
  // Told apart once, not per call.
  const credentials = options.credentials;
  const credentialsKey = Context.isKey(credentials) ? credentials : undefined;
  const credentialsEffect = Context.isKey(credentials) ? undefined : credentials;

  /** The calling fiber's credentials, then `f` on them. */
  const withCredentials = <B, E>(
    context: Context.Context<any>,
    f: (creds: Credentials) => Effect.Effect<B, E>,
  ): Effect.Effect<B, CredentialsError | E, CredentialsRequirements> =>
    API.withValue(credentialsEffect ?? Context.get(context, credentialsKey!), f);

  /**
   * The request; fails with the error a refusing `baseUrl` returned, or with
   * `InvalidInput` for a label that would address another resource.
   */
  const requestFor = (
    creds: Credentials,
    input: unknown,
    inputAst: AST.AST,
  ): Effect.Effect<HttpClientRequest.HttpClientRequest, RequestError> => {
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    const baseUrl = options.baseUrl(creds, {
      uri: http?.uri ?? "",
      method: http?.method ?? "",
      server: http?.server,
    });
    // A baseUrl that refuses the route (missing scope in the credentials)
    // returns the failure.
    if (typeof baseUrl !== "string") return baseUrl;
    return buildRequest({
      input,
      // Run by the builder, which refuses an input that contains itself.
      unwrap: unwrapRedactedDeep,
      inputAst,
      baseUrl,
      headers: options.headers(creds),
      mapMemberHeader: options.mapMemberHeader,
      unknownKeyToWire: options.unknownKeyToWire,
      emptyJsonBody: options.emptyJsonBody,
    });
  };

  /** Map a read response body to the call's outcome. */
  const decodeText = (
    context: Context.Context<any>,
    status: number,
    headers: Record<string, string | undefined>,
    text: string,
    outputAst: AST.AST,
    errorClasses: ReadonlyArray<DeclaredErrorClass>,
    framing: StreamFraming | undefined,
  ): Decoded<Failure> => {
    // Read as text and parse tolerantly -- error pages are often non-JSON.
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

      // 0. The provider's own reading of the failure.
      if (options.classifyError) {
        const classified = options.classifyError({
          status,
          code: env.code,
          message,
          body: nonJson ? text : json,
          headers,
        });
        if (classified !== undefined) return { ok: false, error: classified };
      }

      // The body and headers every error below carries.
      const response = { body: nonJson ? text : json, headers, fieldsAt: options.errorFieldsAt };

      // 1. A declared error whose matcher fits (the operation's classes,
      //    then its service's).
      const typed = matchTypedError(
        errorClasses,
        status,
        [
          {
            code: typeof env.code === "number" ? env.code : undefined,
            message,
          },
        ],
        response,
      );
      if (typed !== undefined) return { ok: false, error: typed };

      // 2. Core's class for the status, when declared (retryAfter only
      //    stamps on retryable statuses -- parseRetryAfterForStatus gates
      //    on that).
      const StatusErrorClass = declaredStatusClass(status, errorClasses);
      if (StatusErrorClass) {
        return {
          ok: false,
          error: new StatusErrorClass({
            message,
            ...responseErrorFields(undefined, response),
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        };
      }

      // 3. Any other 5xx (e.g. proxy-specific statuses) -> retryable server
      //    error rather than the unknown fallback.
      if (status >= 500) {
        return {
          ok: false,
          error: new InternalServerError({
            message,
            ...responseErrorFields(undefined, response),
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

    // A framed (streamed) body that a plain call collects: its frames are
    // the output's `items`.
    const collected = framing?.collect(text, headers["content-type"]);
    return collected === undefined
      ? decodeSuccess(context, headers, text, json, nonJson, outputAst)
      : decodeSuccess(context, headers, text, collected.json, collected.nonJson, outputAst);
  };

  /**
   * A 2xx body: the response body IS the payload (no envelope). Wire->TS
   * key mapping is schema-driven; `RawResponseRoot` responses are the body
   * verbatim (mapKeys handles arrays/scalars structurally either way).
   * Strict mode (core/response-validation) checks the mapped body against
   * the output schema -- a non-JSON body reaches it as a string and fails
   * there unless the operation's output is itself a string. For an output
   * with sensitive members, a non-JSON body fails in every mode and parse
   * errors withhold the body.
   */
  const decodeSuccess = (
    context: Context.Context<any>,
    headers: Record<string, string | undefined>,
    text: string,
    json: unknown,
    nonJson: boolean,
    outputAst: AST.AST,
  ): Decoded<ParseError> => {
    const plan = decodePlanFor(outputAst);
    let body: unknown = nonJson ? text : json === undefined ? (plan.text ? "" : {}) : json;
    if (options.transformResponse) body = options.transformResponse(body);
    const mapped =
      plan.bodyMember !== undefined
        ? { [plan.bodyMember.name]: mapKeys(plan.bodyMember.type, body, "decode") }
        : plan.verbatim
          ? body
          : mapKeys(outputAst, body, "decode");
    const checked = checkSuccess(context, outputAst, {
      value: withResponseHeaders(plan.headers, mapped, headers),
      body: nonJson ? text : json,
      nonJson,
    });
    return checked.ok ? checked : { ok: false, error: options.parseError(checked.error) };
  };

  const decodeResponse = (
    context: Context.Context<any>,
    response: HttpClientResponse.HttpClientResponse,
    outputAst: AST.AST,
    errorClasses: ReadonlyArray<DeclaredErrorClass>,
    framing: StreamFraming | undefined,
  ): Effect.Effect<unknown, Failure> =>
    // A body read that fails (reset or abort mid-body) fails the call with
    // its `HttpClientError`, a protocol error.
    (response.status >= 200 && response.status < 300
      ? readBinaryResponse(response, outputAst)
      : undefined) ??
    Effect.flatMap(response.text, (text) => {
      recordPageHeaders(context, response.headers);
      const decoded = decodeText(
        context,
        response.status,
        response.headers as Record<string, string | undefined>,
        text ?? "",
        outputAst,
        errorClasses,
        framing,
      );
      return decoded.ok ? Effect.succeed(decoded.value) : Effect.fail(decoded.error);
    });

  /**
   * Send `op`'s request on the calling fiber, then `receive` its response:
   * decode it ({@link decodeCall}), or open it as a stream
   * ({@link openFramed}).
   */
  const send = <A>(
    op: Operation,
    input: unknown,
    receive: (
      context: Context.Context<any>,
      response: HttpClientResponse.HttpClientResponse,
    ) => Effect.Effect<A, Failure>,
  ): Effect.Effect<A, Failure, CredentialsRequirements> =>
    Effect.withFiber((fiber) => {
      const context = fiber.context as Context.Context<any>;
      return withCredentials(context, (creds) => {
        const client = Context.get(context, HttpClient.HttpClient);
        return Effect.flatMap(requestFor(creds, input, op.inputAst), (request) =>
          Effect.flatMap(Send.send(context, client, request), (response) =>
            receive(context, response),
          ),
        );
      });
    });

  /** A plain call's response, decoded. */
  const decodeCall =
    (op: Operation) =>
    (context: Context.Context<any>, response: HttpClientResponse.HttpClientResponse) =>
      decodeResponse(
        context,
        response,
        op.outputAst,
        op.errors,
        op.config.framing as StreamFraming | undefined,
      );

  /**
   * A streaming call's response: its body and a frame decoder. A failed
   * status fails with the operation's typed error, as a plain call does.
   */
  const openFramed =
    (op: Operation) =>
    (
      context: Context.Context<any>,
      response: HttpClientResponse.HttpClientResponse,
    ): Effect.Effect<FramedBody<Failure>, Failure> =>
      response.status >= 400
        ? Effect.flatMap(
            decodeResponse(context, response, op.outputAst, op.errors, undefined),
            // A failed status always decodes to a failure.
            () =>
              Effect.fail(
                new SdkError({ message: `HTTP ${response.status} decoded as a success` }),
              ),
          )
        : Effect.succeed({
            body: response.stream,
            item: (json, text) => {
              const headers = response.headers as Record<string, string | undefined>;
              // A frame schema of its own (an operation that streams only when
              // its input asks), else one element of the output's `items`.
              const itemAst = op.config.items?.ast;
              if (itemAst !== undefined) {
                const decoded = decodeSuccess(context, headers, text, json, false, itemAst);
                return decoded.ok ? Effect.succeed(decoded.value) : Effect.fail(decoded.error);
              }
              const decoded = decodeSuccess(
                context,
                headers,
                text,
                { items: [json] },
                false,
                op.outputAst,
              );
              return decoded.ok
                ? Effect.succeed(
                    (decoded.value as { readonly items: ReadonlyArray<unknown> }).items[0],
                  )
                : Effect.fail(decoded.error);
            },
            invalid: (text) =>
              options.parseError({
                body: hasSensitiveMember(op.outputAst) ? "[REDACTED]" : text,
                cause: "Invalid JSON frame",
              }),
          });

  return {
    // The credentials are resolved on the calling fiber (see
    // RestProtocolOptions.credentials).
    encode: ({ input, inputAst }: EncodeArgs) =>
      Effect.withFiber((fiber) =>
        withCredentials(fiber.context as Context.Context<any>, (creds) =>
          requestFor(creds, input, inputAst),
        ),
      ),
    decode: ({ response, outputAst, errors, config }: DecodeArgs) =>
      Effect.withFiber((fiber) =>
        decodeResponse(
          fiber.context as Context.Context<any>,
          response,
          outputAst,
          errors,
          config.framing as StreamFraming | undefined,
        ),
      ),
    call: (op, input) => send(op, input, decodeCall(op)),
    stream: (op, input) => {
      const framing = op.config.framing as StreamFraming | undefined;
      return framing === undefined
        ? API.cannotStream(op)
        : framing.stream(send(op, input, openFramed(op)));
    },
  };
};

/**
 * {@link restProtocol}'s options for one form of `credentials`. The service
 * key and the effect are separate signatures: a key is also an effect (of
 * the service), so one signature for both could not tell which it is given.
 */
type TypedRestOptions<
  CredentialsSource,
  Credentials,
  RouteError,
  ClassifiedError,
  UnknownError,
  ParseError,
> = Omit<
  RestProtocolOptions<
    Credentials,
    never,
    never,
    RouteError,
    ClassifiedError,
    UnknownError,
    ParseError
  >,
  "credentials"
> & {
  /** See {@link RestProtocolOptions.credentials}. */
  readonly credentials: CredentialsSource;
};

/**
 * The protocol for a simple REST JSON API (core/protocol). Assign the
 * result to a module-level const in the provider's `protocol.ts`:
 *
 *   export const NeonProtocol = restProtocol({ ... });
 *
 * A failed response becomes, in this order: what `classifyError` returns, a
 * class the operation or its service declares (by its matchers, or by status
 * for one of core's status classes), `InternalServerError` for any other
 * 5xx, and `unknownError` for the rest. The protocol declares what the
 * options and {@link RestProtocolError} fail with: the result's type lists
 * them, so no SDK writes that list by hand.
 */
export function restProtocol<
  Credentials,
  CredentialsError = never,
  CredentialsRequirements = never,
  RouteError = never,
  ClassifiedError = never,
  UnknownError = never,
  ParseError = never,
>(
  options: TypedRestOptions<
    Context.Key<CredentialsRequirements, Effect.Effect<Credentials, CredentialsError>>,
    Credentials,
    RouteError,
    ClassifiedError,
    UnknownError,
    ParseError
  >,
): Protocol<
  CredentialsError | RouteError | ClassifiedError | UnknownError | ParseError | RestProtocolError,
  CredentialsRequirements
>;
export function restProtocol<
  Credentials,
  CredentialsError = never,
  CredentialsRequirements = never,
  RouteError = never,
  ClassifiedError = never,
  UnknownError = never,
  ParseError = never,
>(
  options: TypedRestOptions<
    Effect.Effect<Credentials, CredentialsError, CredentialsRequirements>,
    Credentials,
    RouteError,
    ClassifiedError,
    UnknownError,
    ParseError
  >,
): Protocol<
  CredentialsError | RouteError | ClassifiedError | UnknownError | ParseError | RestProtocolError,
  CredentialsRequirements
>;
export function restProtocol<
  Credentials,
  CredentialsError,
  CredentialsRequirements,
  RouteError,
  ClassifiedError,
  UnknownError,
  ParseError,
>(
  options: RestProtocolOptions<
    Credentials,
    CredentialsError,
    CredentialsRequirements,
    RouteError,
    ClassifiedError,
    UnknownError,
    ParseError
  >,
): Protocol<
  CredentialsError | RouteError | ClassifiedError | UnknownError | ParseError | RestProtocolError,
  CredentialsRequirements
> {
  return restProtocolMethods(options);
}
