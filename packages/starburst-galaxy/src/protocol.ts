import type * as API from "@distilled.cloud/core/api";
import {
  type API_ERRORS,
  type ConfigError,
  HTTP_STATUS_MAP,
  type InvalidInput,
  TooManyRequests,
} from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorInfo,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfter } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * StarburstGalaxyProtocol -- hand-written.
 *
 * Galaxy speaks bearer-authenticated JSON REST with no success envelope, so
 * the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <access token>` + the
 *             account's base URL (`https://<account-domain>`), resolved
 *             from the calling fiber on every request (picking up the
 *             token refresh in credentials.ts)
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); a 429 is read by {@link rateLimited}; other
 *             non-2xx `{ message, … }` bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status classes
 *             plus 412 -> {@link PreconditionFailed}, then
 *             {@link UnknownStarburstGalaxyError}.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  PreconditionFailed,
  StarburstGalaxyParseError,
  UnknownStarburstGalaxyError,
} from "./errors.ts";

/**
 * Error channel shared by every generated Galaxy operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * StarburstGalaxyOpError, StarburstGalaxyOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type StarburstGalaxyOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | PreconditionFailed
  | UnknownStarburstGalaxyError
  | StarburstGalaxyParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Galaxy operation. */
export type StarburstGalaxyOpContext = Credentials | HttpClient.HttpClient;

/** The wait Galaxy's rate limiter states in its plain-text 429 body. */
const TRY_AGAIN_IN = /try again in (\d+) seconds?/i;

/**
 * Galaxy's rate limiter answers `429 Too Many Requests` with
 * `Retry-After: 0` and the real wait in its text body ("Rate limit
 * exceeded. Please try again in 10 seconds."). Core honors a zero hint as
 * "retry now", which fails again at once, so the body's wait wins; a
 * positive `Retry-After` is used when the body names none, and otherwise the
 * retry policy's own backoff applies. Core has no hook for a body-stated
 * wait, so this is Galaxy's `classifyError`.
 */
export const rateLimited = (info: RestErrorInfo): TooManyRequests | undefined => {
  if (info.status !== 429) return undefined;
  const stated = TRY_AGAIN_IN.exec(info.message)?.[1];
  const wait =
    stated === undefined ? parseRetryAfter(info.headers) : Duration.seconds(Number(stated));
  return new TooManyRequests({
    message: info.message,
    retryAfter: wait !== undefined && Duration.toMillis(wait) > 0 ? wait : undefined,
  });
};

export const StarburstGalaxyProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<Config>({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up a refreshed access token.
    credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    }),
    // Core's classes plus 412 (`FailedPrecondition`), which Galaxy documents
    // on cluster creation, schema discovery, data domain deletion and data
    // quality operations.
    statusMap: { ...HTTP_STATUS_MAP, 412: PreconditionFailed },
    classifyError: rateLimited,
    // Galaxy's error body is `{ message, … }` -- the factory's default
    // lenient `{ code?, message? }` envelope reads it.
    unknownError: (info) => new UnknownStarburstGalaxyError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new StarburstGalaxyParseError({ body, cause }),
  });
