/**
 * Xata-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Xata fallback
 * errors. Note the generated service module additionally defines its own
 * per-status matcher classes (BadRequest/NotFound/...) for the statuses each
 * operation declares -- those share `_tag`s with the core classes here, so
 * `catchTag` works against either.
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

/** Unknown Xata error -- returned when nothing else matches the failure. */
export class UnknownXataError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownXataError>()(
    "UnknownXataError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class XataParseError
  extends /*@__PURE__*/ Schema.TaggedError<XataParseError>()("XataParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Xata service: any operation can return them, and
 * every generated operation lists them as its `serviceErrors`. Today that is
 * each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const XataServiceErrors = API_ERRORS;
export type XataServiceError = InstanceType<(typeof XataServiceErrors)[number]>;
