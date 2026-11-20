import { TooManyRequests } from "@distilled.cloud/core/errors";
import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorInfo,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfter } from "@distilled.cloud/core/retry-after";
/**
 * StarburstGalaxyProtocol -- hand-written.
 *
 * Galaxy speaks bearer-authenticated JSON REST with no success envelope, so
 * the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <access token>` + the
 *             account's base URL (`https://<account-domain>`), resolved
 *             from the calling fiber on every request (picking up the
 *             token refresh in credentials.ts)
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); a 429 is read by {@link rateLimited}; other
 *             non-2xx `{ message, ... }` bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status classes
 *             plus 412 -> {@link PreconditionFailed}, then
 *             {@link UnknownStarburstGalaxyError}.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  StarburstGalaxyParseError,
  UnknownStarburstGalaxyError,
  type StarburstGalaxyServiceError,
} from "./errors.ts";

/**
 * The errors declared on Galaxy's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link StarburstGalaxyParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownStarburstGalaxyError}), a
 * rate-limited 429 (`TooManyRequests`, see {@link rateLimited}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type StarburstGalaxyProtocolError =
  | RestProtocolError
  | StarburstGalaxyParseError
  | UnknownStarburstGalaxyError
  | TooManyRequests;

/**
 * What every generated Galaxy operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, StarburstGalaxyOpError,
 * StarburstGalaxyOpContext>` explicitly so the compiler never infers these
 * back out of the schema generics.
 */
export type StarburstGalaxyOpError =
  | StarburstGalaxyServiceError
  | StarburstGalaxyProtocolError
  | CredentialsError;

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

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const StarburstGalaxyProtocol: Protocol<
  StarburstGalaxyProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up a refreshed access token.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
  }),
  // A status becomes the class the service declares for it
  // (`StarburstGalaxyServiceErrors`: core's classes plus 412,
  // `FailedPrecondition`, which Galaxy documents on cluster creation, schema
  // discovery, data domain deletion and data quality operations).
  classifyError: rateLimited,
  // Galaxy's error body is `{ message, ... }` -- the factory's default
  // lenient `{ code?, message? }` envelope reads it.
  unknownError: (info) => new UnknownStarburstGalaxyError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new StarburstGalaxyParseError({ body, cause }),
});
