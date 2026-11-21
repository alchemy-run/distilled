/**
 * boxd-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the boxd-specific
 * unknown-error wrapper.
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
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown boxd error -- returned when a failed response's HTTP status has no
 * mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownBoxdError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownBoxdError>()(
    "UnknownBoxdError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class BoxdParseError
  extends /*@__PURE__*/ Schema.TaggedError<BoxdParseError>()("BoxdParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Errors any boxd operation may surface in addition to the per-operation
 * typed status errors.
 */
export type ClientErrors = UnknownBoxdError | BoxdParseError;

/**
 * Default boxd operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
