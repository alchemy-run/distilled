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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown STACKIT error -- returned when nothing else matches the failure. */
export class UnknownStackitError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownStackitError>()(
    "UnknownStackitError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class StackitParseError
  extends /*@__PURE__*/ Schema.TaggedError<StackitParseError>()("StackitParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the STACKIT services: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`.
 * Each of core's status classes: the protocol builds the one for a failed
 * response's status when the operation's own classes do not match.
 */
export const StackitServiceErrors = API_ERRORS;
export type StackitServiceError = InstanceType<(typeof StackitServiceErrors)[number]>;
