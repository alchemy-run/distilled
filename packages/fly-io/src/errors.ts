/**
 * Fly.io-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds the Fly.io-specific
 * fallback/parse error types. Fly.io's error model is a pure HTTP-status
 * map: the API answers failures with `{ "error": "..." }` and the protocol
 * maps the status onto the shared core classes (BadRequest / Forbidden /
 * NotFound / Conflict / UnprocessableEntity / ...).
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
import * as Category from "@distilled.cloud/core/category";
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

/**
 * Unknown Fly.io error -- returned when a failure matches no status-mapped
 * error class. Carries the raw body for later cataloging.
 */
export class UnknownFlyIoError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownFlyIoError>()(
    "UnknownFlyIoError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class FlyIoParseError
  extends /*@__PURE__*/ Schema.TaggedError<FlyIoParseError>()("FlyIoParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Sprites is not enabled for the Fly organization that owns `FLY_API_TOKEN`.
 *
 * Returned by `POST /v1/organizations/{org}/tokens` as HTTP 401 with a
 * message matching `sprites not enabled`. This is the mint-time
 * entitlement signal; a call with `SPRITES_TOKEN` set mints nothing.
 */
export class SpritesNotEnabled
  extends /*@__PURE__*/ Schema.TaggedError<SpritesNotEnabled>()("SpritesNotEnabled", {
    code: /*@__PURE__*/ Schema.optional(Schema.Int),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(SpritesNotEnabled, [
  { status: 401, message: { matches: "[Ss]prites not enabled" } },
]);

/**
 * The Sprites bearer could not be minted from the Fly token: no Fly
 * organization could be found for the token, the organization it names can't
 * go in a URL, or the mint did not answer in time. It is a failure of
 * requests made at run time, so it is not a `ConfigError`.
 */
export class TokenRequestFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenRequestFailed>()("TokenRequestFailed", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}

/**
 * Errors any Fly.io operation may surface in addition to the status-mapped
 * per-operation errors.
 */
export type ClientErrors = UnknownFlyIoError | FlyIoParseError;

/**
 * Default Fly.io operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;

/**
 * The errors declared on the Fly.io services (Machines, MPG and Sprites):
 * any operation can return them, and every generated operation lists them
 * as its `serviceErrors`. Each of core's status classes: the protocols build
 * the one for a failed response's status when the operation's own classes
 * do not match.
 */
export const FlyIoServiceErrors = API_ERRORS;
export type FlyIoServiceError = InstanceType<(typeof FlyIoServiceErrors)[number]>;
