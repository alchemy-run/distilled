/**
 * STACKIT-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error
 * and parse-error wrappers. STACKIT failures carry `{ message, error? }`
 * (the `ErrorMessage` schema in most of the product specs); the protocol
 * reads `message` for the human half and `error` as the machine-readable
 * code on {@link UnknownStackitError}.
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
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Category from "@distilled.cloud/core/category";
import * as Schema from "effect/Schema";

/** Unknown STACKIT error — returned when nothing else matches the failure. */
export class UnknownStackitError extends Schema.TaggedError<UnknownStackitError>()(
  "UnknownStackitError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class StackitParseError extends Schema.TaggedError<StackitParseError>()(
  "StackitParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
