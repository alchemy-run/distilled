import { InternalServerError } from "@distilled.cloud/core/errors";
import type {
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
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
import { httpSymbol, type HttpTrait } from "@distilled.cloud/core/trait";
/**
 * MongodbAtlasProtocol -- hand-written.
 *
 * Atlas speaks bearer-authenticated JSON REST with one wrinkle the shared
 * `restProtocol` factory can't express: every operation must send a
 * date-versioned `Accept` header (`application/vnd.atlas.YYYY-MM-DD+json`) --
 * plain `application/json` draws a 406 from the live API. The version is
 * per-operation data, carried as an `accept` extension on the `Http` trait
 * (stamped from the spec's vendor media types by scripts/convert.ts), so
 * this protocol is a small bespoke build on the same core helpers:
 *
 *   request:  credentials -> `Authorization: Bearer <oauth token>` + base URL
 *             (default https://cloud.mongodb.com), resolved from the calling
 *             fiber on every request (picking up cached-token refreshes);
 *             `Accept` from the operation's `Http` trait
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx Atlas envelopes
 *             `{ error, errorCode, reason?, detail? }` map to the
 *             operation's typed error classes by status, then the
 *             service's (`MongodbAtlasServiceErrors`: core's class for the
 *             status, and PaymentRequired for 402, v0 parity), then
 *             {@link UnknownMongodbAtlasError} -- with `retryAfter` stamped
 *             from the standard hint headers on retryable statuses.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  MongodbAtlasParseError,
  type MongodbAtlasServiceError,
  UnknownMongodbAtlasError,
} from "./errors.ts";

/**
 * What every generated Atlas operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, MongodbAtlasOpError, MongodbAtlasOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type MongodbAtlasOpError = MongodbAtlasServiceError | ErrorOf<typeof MongodbAtlasProtocol>;

/** Context (requirements) shared by every generated Atlas operation. */
export type MongodbAtlasOpContext = Credentials | HttpClient.HttpClient;

/** The Atlas ApiError envelope: `{ error, errorCode, reason?, detail? }`. */
interface AtlasErrorEnvelope {
  readonly errorCode?: string;
  readonly reason?: string;
  readonly detail?: string;
}

const errorEnvelope = (body: unknown): AtlasErrorEnvelope => {
  if (body === null || typeof body !== "object") return {};
  const b = body as Record<string, unknown>;
  return {
    errorCode: typeof b.errorCode === "string" ? b.errorCode : undefined,
    reason: typeof b.reason === "string" ? b.reason : undefined,
    detail: typeof b.detail === "string" ? b.detail : undefined,
  };
};

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves the Credentials service
// from the calling fiber's context on every request (picking up the
// cached-token refresh in credentials.ts).
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const resolve = yield* Credentials;
    const creds = yield* resolve;
    // The versioned Accept media type stamped on the operation's Http trait
    // by scripts/convert.ts. `application/json` alone is a 406; the API
    // serves the newest resource version <= the requested date.
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    return yield* buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: {
        Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
        Accept: http?.accept ?? "application/json",
      },
    });
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
      const env = nonJson ? {} : errorEnvelope(json);
      // v0 parity: `detail` first, then `reason`.
      const message =
        env.detail ?? env.reason ?? (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);

      // 1. Typed error by matcher metadata on the class: the operation's
      //    classes, then the service's PaymentRequired for 402.
      const typed = matchTypedError(errorClasses, status, [{ message }], {
        body: nonJson ? text : json,
        headers,
      });
      if (typed !== undefined) return yield* Effect.fail(typed);

      // 2. Core's class for the status, which the service declares
      //    (retryAfter only stamps on retryable statuses --
      //    parseRetryAfterForStatus gates on that).
      const StatusErrorClass = declaredStatusClass(status, errorClasses);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 3. Any other 5xx -> retryable server error.
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 4. Unknown Atlas error (carries the envelope for cataloging).
      return yield* Effect.fail(
        new UnknownMongodbAtlasError({
          status,
          code: env.errorCode,
          message,
          errorCode: env.errorCode,
          reason: env.reason,
          detail: env.detail,
          body: nonJson ? text : json,
        }),
      );
    }

    // 2xx: the response body IS the payload (no envelope; the optional
    // `?envelope=true` wrapper is never requested by the SDK -- v0 parity).
    // Wire->TS key mapping is schema-driven; `RawResponseRoot` responses are
    // the body verbatim (mapKeys handles arrays/scalars structurally).
    // Strict mode (core/response-validation) checks the mapped body against
    // the output schema, and parse errors withhold a body that can hold a
    // secret (core `validateSuccess`).
    const body: unknown = nonJson ? text : json === undefined ? {} : json;
    return yield* validateSuccess(
      outputAst,
      { value: mapKeys(outputAst, body, "decode"), body: nonJson ? text : json, nonJson },
      (info) => new MongodbAtlasParseError(info),
    );
  });

const mongodbAtlasProtocolMethods = {
  encode,
  decode,
} satisfies Protocol<unknown, unknown>;

export const MongodbAtlasProtocol: ProtocolOf<typeof mongodbAtlasProtocolMethods> =
  mongodbAtlasProtocolMethods;
