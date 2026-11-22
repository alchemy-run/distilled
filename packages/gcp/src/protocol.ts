import { ConfigError, InternalServerError } from "@distilled.cloud/core/errors";
import type {
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import {
  encodeLabel,
  getAnn,
  getProps,
  hasPropAnn,
  matchTypedError,
  nameOf,
  responseErrorFields,
} from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import {
  bodySymbol,
  headerSymbol,
  httpBodySymbol,
  httpSymbol,
  labelSymbol,
  querySymbol,
} from "@distilled.cloud/core/trait";
/**
 * GcpProtocol -- hand-written.
 *
 * Speaks Google's JSON REST protocol as the distilled gcp client did. The
 * generic trait helpers live in `@distilled.cloud/core/protocol-http`; this
 * module supplies what is GCP's own:
 *
 *   request:  credentials -> `Authorization: Bearer <access token>`; the
 *             per-service base URL (rootUrl + servicePath) read from the
 *             extended `T.Http({ ... baseUrl })` trait; `{+param}`
 *             path tokens (Google discovery paths like `v1/{+name}` carry
 *             multi-segment resource names) keep their `/` and encode
 *             each segment, with core's `encodeLabel` checks;
 *             query params (arrays as repeated `k=v`); a single
 *             `HttpBody()` member as the whole JSON request body.
 *
 *   response: 2xx JSON body returned as-is (GCP wire names are already the
 *             TS-facing names). Failures carry the standard GCP error
 *             envelope `{ error: { code, message, status, details } }` --
 *             dispatch is per-op matcher classes (`matchTypedError`, which
 *             reads their declared `status` and `details` under `error`)
 *             then core's class for the HTTP status, which the service
 *             declares (`GcpServiceErrors`); every error carries the body
 *             and headers. Unmatched statuses -> `UnknownGCPError`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials-service.ts";
import * as Endpoint from "./endpoint.ts";
import { type GcpServiceError, GCPParseError, UnknownGCPError } from "./errors.ts";
import * as Region from "./region.ts";
import type { GcpHttpTrait } from "./traits.ts";

/**
 * What every generated GCP operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, <Op>Error, GcpOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type GcpOpError = GcpServiceError | ErrorOf<typeof GcpProtocol>;

/** Context (requirements) shared by every generated GCP operation. */
export type GcpOpContext = Credentials | HttpClient.HttpClient;

/** Serialize one query member: arrays as repeated `k=v`, scalars stringified. */
const appendQuery = (query: URLSearchParams, name: string, value: unknown): void => {
  if (Array.isArray(value)) {
    for (const v of value) appendQuery(query, name, v);
  } else if (value !== undefined && value !== null) {
    query.append(name, String(value));
  }
};

/**
 * Shape of GCP's standard error envelope as documented at
 * <https://cloud.google.com/apis/design/errors>:
 *
 * ```json
 * { "error": { "code": 400, "message": "...", "status": "FAILED_PRECONDITION",
 *   "details": [{ "@type": "type.googleapis.com/google.rpc.QuotaFailure", ... }] } }
 * ```
 */
const extractGCPErrorEnvelope = (
  errorBody: unknown,
): {
  code: number | undefined;
  message: string | undefined;
  status: string | undefined;
  details: ReadonlyArray<unknown> | undefined;
} => {
  const none = {
    code: undefined,
    message: undefined,
    status: undefined,
    details: undefined,
  };
  if (typeof errorBody !== "object" || errorBody === null || !("error" in errorBody)) {
    return none;
  }
  const err = (errorBody as { error?: unknown }).error;
  if (typeof err !== "object" || err === null) return none;
  const e = err as {
    code?: unknown;
    message?: unknown;
    status?: unknown;
    details?: unknown;
  };
  return {
    code: typeof e.code === "number" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
    status: typeof e.status === "string" ? e.status : undefined,
    details: Array.isArray(e.details) ? e.details : undefined,
  };
};

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    // The Credentials service holds an effect -- resolving it here (per
    // request) picks up externally-rotated tokens.
    const resolveCredentials = yield* Credentials;
    const creds: Config = yield* resolveCredentials;

    const http = getAnn(inputAst, httpSymbol) as GcpHttpTrait | undefined;
    if (!http) {
      return yield* Effect.fail(
        new SdkError({ message: "operation input is missing the Http() trait" }),
      );
    }
    // Sensitive members accept `string | Redacted<string>`; the wire wants the string.
    const inputObj = unwrapRedactedDeep(input ?? {}) as Record<string, unknown>;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    };
    // Bill quota to this project; user credentials need it for many APIs.
    if (creds.quotaProject) headers["X-Goog-User-Project"] = creds.quotaProject;
    const query = new URLSearchParams();
    let uri = http.uri;
    let rawBody: unknown;
    const bodyBag: Record<string, unknown> = {};
    let hasBodyBag = false;

    for (const prop of getProps(inputAst)) {
      const value = inputObj[String(prop.name)];
      if (value === undefined) continue;

      if (hasPropAnn(prop, labelSymbol)) {
        const token = nameOf(prop, labelSymbol);
        // `{+name}` is a multi-segment resource name (`projects/p/secrets/s`):
        // like core's greedy `{name+}`, each segment is encoded and the `/`
        // kept (google/api/http.proto). Plain `{name}` is fully encoded.
        const greedy = uri.includes(`{+${token}}`);
        const label = encodeLabel(String(prop.name), value, greedy);
        if (typeof label !== "string") return yield* Effect.fail(label);
        uri = uri.replace(greedy ? `{+${token}}` : `{${token}}`, () => label);
      } else if (hasPropAnn(prop, querySymbol)) {
        appendQuery(query, nameOf(prop, querySymbol), value);
      } else if (hasPropAnn(prop, headerSymbol)) {
        headers[nameOf(prop, headerSymbol).toLowerCase()] = String(value);
      } else if (hasPropAnn(prop, httpBodySymbol)) {
        // The generated `body` member IS the whole JSON request body.
        rawBody = value;
      } else {
        // Plain members (patch-introduced) become JSON body fields.
        bodyBag[nameOf(prop, bodySymbol)] = value;
        hasBodyBag = true;
      }
    }

    const qs = query.toString();
    // Optional overrides, read from the calling fiber like Credentials but
    // never listed in an operation's requirements.
    const endpointOverride = yield* Effect.serviceOption(Endpoint.Endpoint);
    const override = Option.isSome(endpointOverride) ? yield* endpointOverride.value : undefined;
    if (override !== undefined && !URL.canParse(override)) {
      return yield* new ConfigError({
        message: `GCP endpoint override must be an absolute URL (e.g. http://localhost:8085), got ${JSON.stringify(override)}`,
      });
    }
    const mode = Option.getOrElse(
      yield* Effect.serviceOption(Region.RegionalEndpoints),
      () => "required" as const,
    );
    const baseUrl =
      override !== undefined
        ? Endpoint.withEndpoint(http.baseUrl, override)
        : Region.endpointFor(http.baseUrl, uri, mode);
    const url = `${baseUrl}${uri}${qs ? `?${qs}` : ""}`;

    let request = HttpClientRequest.make(http.method)(url).pipe(
      HttpClientRequest.setHeaders(headers),
    );
    const body = rawBody !== undefined ? rawBody : hasBodyBag ? bodyBag : undefined;
    if (body !== undefined && http.method !== "GET" && http.method !== "HEAD") {
      request = request.pipe(HttpClientRequest.bodyJsonUnsafe(body));
    }
    return request;
  });

const decode = ({ response, outputAst, errors }: DecodeArgs) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly -- some error responses (proxies,
    // HTML error pages) carry non-JSON bodies. A body read that fails (reset
    // or abort mid-body) fails the call with its `HttpClientError`.
    const text = (yield* response.text) ?? "";
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

    if (status >= 400) {
      const headers = response.headers as Record<string, string | undefined>;
      const envelope = extractGCPErrorEnvelope(json);
      const message = envelope.message ?? (nonJson && text ? text : String(status));

      // 1. Per-operation typed error (matcher metadata on the class). A
      //    message-or-status matcher (e.g. IAM ServiceAccountQuotaExceeded)
      //    has to win over the generic HTTP_STATUS_MAP class, or quota
      //    lands as UnknownGCPError / TooManyRequests with no catchable tag.
      // The envelope's fields sit under `error`; core reads a typed error's
      // declared `status` and `details` there.
      const failure = { body: nonJson ? text : json, headers, fieldsAt: "/error" };
      const typed = matchTypedError(errors, status, [{ code: envelope.code, message }], failure);
      if (typed !== undefined) return yield* Effect.fail(typed);

      // 2. Status dispatch: core's class for the status, which the service
      //    declares. The constructed instance shares its `_tag` with the
      //    per-service typed error classes and carries the body (the
      //    envelope's `status` and `details` are under `body.error`).
      const ErrorClass = declaredStatusClass(status, errors);
      if (ErrorClass) {
        return yield* Effect.fail(
          new ErrorClass({
            message,
            ...responseErrorFields(undefined, failure),
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 3. Any other 5xx -> retryable server error, as in core's REST
      //    protocol.
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message,
            ...responseErrorFields(undefined, failure),
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      return yield* Effect.fail(
        new UnknownGCPError({
          status,
          code: envelope.status,
          message,
          details: envelope.details,
          body: json ?? text,
        }),
      );
    }

    // Success: the JSON body is the payload verbatim (GCP wire names are
    // already the TS-facing names). Empty bodies (204 / empty 200) decode
    // to an empty object so `<Op>Response {}` outputs stay well-typed.
    // Strict mode (core/response-validation) checks it against the output
    // schema, and sensitive members come back Redacted (core
    // `validateSuccess`).
    return yield* validateSuccess(
      outputAst,
      {
        value: nonJson ? text : json === undefined ? {} : json,
        body: nonJson ? text : json,
        nonJson,
      },
      (info) => new GCPParseError(info),
    );
  });

const gcpProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

export const GcpProtocol: ProtocolOf<typeof gcpProtocolMethods> = gcpProtocolMethods;
