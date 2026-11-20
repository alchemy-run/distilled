import { InternalServerError } from "@distilled.cloud/core/errors";
import type { DecodeArgs, EncodeArgs, Protocol } from "@distilled.cloud/core/protocol";
import {
  getAnn,
  getProps,
  hasPropAnn,
  matchTypedError,
  nameOf,
  responseErrorFields,
} from "@distilled.cloud/core/protocol-http";
import { declaredStatusClass } from "@distilled.cloud/core/protocol-rest";
import { validateResponse } from "@distilled.cloud/core/response-validation";
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
 * GoogleWorkspaceProtocol -- hand-written.
 *
 * Speaks Google's JSON REST protocol as the distilled google-workspace client did. The
 * generic trait helpers live in `@distilled.cloud/core/protocol-http`; this
 * module supplies Google's discovery REST protocol:
 *
 *   request:  credentials -> `Authorization: Bearer <access token>`; the
 *             per-service base URL (rootUrl + servicePath) read from the
 *             extended `T.Http({ ... baseUrl })` trait; RFC 6570
 *             reserved-expansion for `{+param}` path tokens (Google
 *             discovery paths like `v1/{+name}` carry multi-segment
 *             resource names whose `/` must NOT be percent-encoded);
 *             query params (arrays as repeated `k=v`); a single
 *             `HttpBody()` member as the whole JSON request body.
 *
 *   response: 2xx JSON body returned as-is (Google wire names are already the
 *             TS-facing names). Failures carry the standard Google error
 *             envelope `{ error: { code, message, status, details } }` --
 *             dispatch is per-op matcher classes (`matchTypedError`, which
 *             reads their declared `status` and `details` under `error`)
 *             then core's class for the HTTP status, which the service
 *             declares (`GoogleWorkspaceServiceErrors`); every error
 *             carries the body and headers. Unmatched statuses ->
 *             `UnknownGoogleWorkspaceError`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config, type CredentialsError } from "./credentials.ts";
import {
  GoogleWorkspaceParseError,
  UnknownGoogleWorkspaceError,
  type GoogleWorkspaceServiceError,
} from "./errors.ts";
import type { GoogleWorkspaceHttpTrait } from "./traits.ts";

/**
 * The errors declared on Google Workspace's protocol: what the code that
 * builds requests and reads responses fails with. A response that does not
 * match its schema ({@link GoogleWorkspaceParseError}), a failed response
 * that neither the operation nor the service declares
 * ({@link UnknownGoogleWorkspaceError}, and `InternalServerError` for a
 * 5xx), an operation without its `Http` trait (`SdkError`), and a body read
 * (`HttpClientError`).
 */
export type GoogleWorkspaceProtocolError =
  | GoogleWorkspaceParseError
  | UnknownGoogleWorkspaceError
  | InternalServerError
  | SdkError
  | HttpClientError.HttpClientError;

/**
 * What every generated Google Workspace operation fails with besides its
 * own errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, <Op>Error, GoogleWorkspaceOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type GoogleWorkspaceOpError =
  | GoogleWorkspaceServiceError
  | GoogleWorkspaceProtocolError
  | CredentialsError;

/** Context (requirements) shared by every generated Google Workspace operation. */
export type GoogleWorkspaceOpContext = Credentials | HttpClient.HttpClient;

/**
 * RFC 6570 §3.2.3 reserved-expansion: encode everything outside the RFC
 * 3986 unreserved (`A-Za-z0-9-._~`) and reserved (`:/?#[]@!$&'()*+,;=`)
 * sets. Used for `{+param}` path tokens (ported from the distilled core).
 */
const RFC3986_NEEDS_ENCODING = /[^A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]/g;
const encodeReserved = (v: string): string => v.replace(RFC3986_NEEDS_ENCODING, encodeURIComponent);

/** Serialize one query member: arrays as repeated `k=v`, scalars stringified. */
const appendQuery = (query: URLSearchParams, name: string, value: unknown): void => {
  if (Array.isArray(value)) {
    for (const v of value) appendQuery(query, name, v);
  } else if (value !== undefined && value !== null) {
    query.append(name, String(value));
  }
};

/**
 * Shape of Google's standard error envelope as documented at
 * <https://cloud.google.com/apis/design/errors>:
 *
 * ```json
 * { "error": { "code": 400, "message": "...", "status": "FAILED_PRECONDITION",
 *   "details": [{ "@type": "type.googleapis.com/google.rpc.QuotaFailure", ... }] } }
 * ```
 */
const extractGoogleErrorEnvelope = (
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

    const http = getAnn(inputAst, httpSymbol) as GoogleWorkspaceHttpTrait | undefined;
    if (!http) {
      return yield* Effect.fail(
        new SdkError({ message: "operation input is missing the Http() trait" }),
      );
    }
    const inputObj = (input ?? {}) as Record<string, unknown>;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    };
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
        // Discovery paths use RFC 6570 reserved expansion (`{+name}`) for
        // multi-segment resource names; plain `{name}` is fully encoded.
        uri = uri.includes(`{+${token}}`)
          ? uri.replace(`{+${token}}`, encodeReserved(String(value)))
          : uri.replace(`{${token}}`, encodeURIComponent(String(value)));
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
    const url = `${http.baseUrl}${uri}${qs ? `?${qs}` : ""}`;

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
    // HTML error pages) carry non-JSON bodies.
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
      const envelope = extractGoogleErrorEnvelope(json);
      const message = envelope.message ?? (nonJson && text ? text : String(status));

      // 1. Per-operation typed error (matcher metadata on the class). The
      //    envelope's fields sit under `error`; core reads a typed error's
      //    declared `status` and `details` there.
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

      // 3. Any other 5xx -> retryable server error, as in core's REST protocol.
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
        new UnknownGoogleWorkspaceError({
          status,
          code: envelope.status,
          message,
          details: envelope.details,
          body: json ?? text,
        }),
      );
    }

    // Success: the JSON body is the payload verbatim (Google wire names are
    // already the TS-facing names). Empty bodies (204 / empty 200) decode
    // to an empty object so `<Op>Response {}` outputs stay well-typed.
    // Strict mode (core/response-validation) checks it against the output
    // schema.
    return yield* validateResponse(
      outputAst,
      nonJson ? text : json === undefined ? {} : json,
      (cause) => new GoogleWorkspaceParseError({ body: nonJson ? text : json, cause }),
    );
  });

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const GoogleWorkspaceProtocol: Protocol<
  GoogleWorkspaceProtocolError | CredentialsError,
  Credentials
> = {
  encode,
  decode,
};
