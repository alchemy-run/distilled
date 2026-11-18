/**
 * Twitch error types.
 *
 * Helix answers a failure with `{ "error": "<status text>", "status": <code>,
 * "message": "<why>" }`, and its reference documents failures per operation
 * only as status lists (`400`, `401`, `403`, `404`, `409`, `422`, `425`,
 * `429`, `5xx`). The SDK dispatches on the status with core's shared classes;
 * a status nothing maps (`425 Too Early`, for one) comes back as
 * {@link UnknownTwitchError} with the body.
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
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown Twitch error -- a failed response whose status has no mapped class. */
export class UnknownTwitchError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownTwitchError>()(
    "UnknownTwitchError",
    UnknownErrorFields,
  ) {}

/** A 2xx body that did not match the operation's output (validating modes only). */
export class TwitchParseError
  extends /*@__PURE__*/ Schema.TaggedError<TwitchParseError>()("TwitchParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Twitch operation may surface besides the shared HTTP status errors. */
export type ClientErrors = UnknownTwitchError | TwitchParseError;

/**
 * Default Twitch operation errors. Every operation carries the whole set: the
 * reference's status lists are documentation, and any of these statuses can
 * come back from any call.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | ClientErrors;
