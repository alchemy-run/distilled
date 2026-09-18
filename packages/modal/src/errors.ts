/**
 * Modal-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Modal-specific
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
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Unknown Modal error — returned when a failed response's HTTP status has no
 * mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownModalError extends Schema.TaggedError<UnknownModalError>()(
  "UnknownModalError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class ModalParseError extends Schema.TaggedError<ModalParseError>()(
  "ModalParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Modal operation may surface in addition to the per-operation
 * typed status errors.
 */
export type ClientErrors = UnknownModalError | ModalParseError;

/**
 * Default Modal operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
