import { InternalServerError, type InvalidInput } from "@distilled.cloud/core/errors";
import type {
  DeclaredError,
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  Protocol,
} from "@distilled.cloud/core/protocol";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import { httpSymbol, type HttpTrait } from "@distilled.cloud/core/trait";
/**
 * SupabaseProtocol -- hand-written.
 *
 * Speaks the Supabase Management API's plain-JSON REST protocol. This is
 * `core/protocol-rest`'s bearer-REST behavior with two Supabase error quirks
 * the factory's hooks can't express (both ported from the distilled v0
 * client, which tests rely on):
 *
 *   1. message substring "active free projects" -> FreeProjectLimitReached
 *      (quota error), checked BEFORE any status mapping so callers can react
 *      to the free-tier active-project ceiling as a typed error;
 *   2. status 406 is remapped to 404/NotFound before per-op matcher and
 *      status-map evaluation (snippets return 406 for not-found).
 *
 * Everything else mirrors `makeRestProtocol`:
 *
 *   request:  credentials resolved from the calling fiber per request ->
 *             `Authorization: Bearer <accessToken>` + API base URL (default
 *             `https://api.supabase.com`), `Redacted` input values deep-
 *             unwrapped, request built by `buildRequest`
 *
 *   response: no envelope -- 2xx bodies decode directly against the output
 *             schema (wire->TS via `mapKeys`, sensitive members wrapped in
 *             `Redacted`); non-2xx -> typed error: per-op matcher classes,
 *             core's class for the status (retryAfter honored),
 *             InternalServerError for any other 5xx, UnknownSupabaseError
 *             fallback. FreeProjectLimitReached and core's status classes
 *             are the service's errors (`SupabaseServiceErrors`): the
 *             protocol builds one only from the classes the operation lists.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientRequestModule from "effect/http/HttpClientRequest";
import { Credentials, formatHeaders, type CredentialsError } from "./credentials.ts";
import {
  FreeProjectLimitReached,
  SupabaseParseError,
  type SupabaseServiceError,
  UnknownSupabaseError,
} from "./errors.ts";

/**
 * The errors declared on Supabase's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link SupabaseParseError}), a failed response that neither
 * the operation nor the service declares ({@link UnknownSupabaseError}, and
 * `InternalServerError` for a 5xx), a bad path label (`InvalidInput`), a
 * request that can't be built (`SdkError`), and a body read
 * (`HttpClientError`).
 */
export type SupabaseProtocolError =
  | SupabaseParseError
  | UnknownSupabaseError
  | InternalServerError
  | InvalidInput
  | SdkError
  | HttpClientError.HttpClientError;

/**
 * What every generated Supabase operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SupabaseOpError, SupabaseOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SupabaseOpError = SupabaseServiceError | SupabaseProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Supabase operation. */
export type SupabaseOpContext = Credentials | HttpClient.HttpClient;

/**
 * An instance of `cls`, a class of the service's errors, built from the
 * operation's own list: `undefined` when the operation does not list the
 * class (every generated operation lists `SupabaseServiceErrors`).
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
 * Re-encode a JSON request body as `application/x-www-form-urlencoded`.
 * `buildRequest` understands `multipart` but leaves other non-JSON
 * encodings to the provider protocol -- Supabase's OAuth token exchange
 * (`POST /v1/oauth/token`) takes a urlencoded form (v0 parity: the same
 * op carried `contentType: "form-urlencoded"` there too).
 */
const toUrlEncodedBody = (
  request: HttpClientRequest.HttpClientRequest,
): HttpClientRequest.HttpClientRequest => {
  const body = request.body as {
    readonly _tag: string;
    readonly body?: unknown;
    readonly contentType?: string;
  };
  if (body._tag !== "Uint8Array" || !/json/i.test(body.contentType ?? "")) {
    return request;
  }
  const parsed = JSON.parse(new TextDecoder().decode(body.body as Uint8Array)) as Record<
    string,
    unknown
  >;
  const entries: Array<[string, string]> = [];
  for (const [k, v] of Object.entries(parsed)) {
    if (v === undefined || v === null) continue;
    entries.push([k, typeof v === "object" ? JSON.stringify(v) : String(v)]);
  }
  return HttpClientRequestModule.bodyUrlParams(request, entries);
};

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials;
    const request = yield* buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: formatHeaders(creds),
    });
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    return (http as { contentType?: string } | undefined)?.contentType === "form-urlencoded"
      ? toUrlEncodedBody(request)
      : request;
  });

const decode = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly -- error pages are often non-JSON.
    // A body read that fails (reset or abort mid-body) fails the call with
    // its `HttpClientError`.
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
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const body = nonJson ? text : json;
      const message =
        !nonJson &&
        json !== null &&
        typeof json === "object" &&
        typeof (json as Record<string, unknown>).message === "string"
          ? ((json as Record<string, unknown>).message as string)
          : nonJson && text.trim()
            ? text.trim()
            : `HTTP ${status}`;

      // 1. Supabase has no error code on the wire; the only signal for the
      //    free-tier active-project limit is a literal substring of the
      //    message. Detect it before any status mapping so tests and
      //    callers can react to it as a typed error.
      if (message.includes("active free projects")) {
        const limit = declaredError(errorClasses, FreeProjectLimitReached, { message });
        if (limit !== undefined) return yield* Effect.fail(limit);
      }

      // Supabase returns 406 for some "not found" conditions (e.g.
      // snippets) -- remap before matcher/status evaluation.
      const effectiveStatus = status === 406 ? 404 : status;

      // 2. Per-operation typed error (matcher metadata on the class).
      const typed = matchTypedError(errorClasses, effectiveStatus, [{ message }], {
        body: nonJson ? text : json,
        headers,
      });
      if (typed !== undefined) return yield* Effect.fail(typed);

      // 3. Core's class for the status, which the service declares
      //    (retryAfter only stamps on retryable statuses).
      const StatusErrorClass = declaredStatusClass(effectiveStatus, errorClasses);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(effectiveStatus, headers),
          }),
        );
      }

      // 4. Any other 5xx -> retryable server error.
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 5. Unknown Supabase error.
      return yield* Effect.fail(new UnknownSupabaseError({ status, message, body }));
    }

    // 2xx: the response body IS the payload (no envelope). Wire->TS key
    // mapping is schema-driven; `RawResponseRoot` responses are the body
    // verbatim (mapKeys handles arrays/scalars structurally either way).
    // Strict mode (core/response-validation) checks the mapped body against
    // the output schema, and parse errors withhold a body that can hold a
    // secret (core `validateSuccess`).
    const body: unknown = nonJson ? text : json === undefined ? {} : json;
    return yield* validateSuccess(
      outputAst,
      { value: mapKeys(outputAst, body, "decode"), body: nonJson ? text : json, nonJson },
      (info) => new SupabaseParseError(info),
    );
  });

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const SupabaseProtocol: Protocol<SupabaseProtocolError | CredentialsError, Credentials> = {
  encode,
  decode,
};
