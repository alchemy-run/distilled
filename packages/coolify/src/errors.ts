/**
 * Coolify-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Coolify fallback
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

/** Unknown Coolify error -- returned when nothing else matches the failure. */
export class UnknownCoolifyError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownCoolifyError>()(
    "UnknownCoolifyError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class CoolifyParseError
  extends /*@__PURE__*/ Schema.TaggedError<CoolifyParseError>()("CoolifyParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Coolify service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const CoolifyServiceErrors = API_ERRORS;
export type CoolifyServiceError = InstanceType<(typeof CoolifyServiceErrors)[number]>;
