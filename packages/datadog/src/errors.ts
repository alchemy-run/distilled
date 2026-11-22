/**
 * Datadog-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Datadog fallback
 * errors. Note the generated service modules additionally define their own
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

/** Unknown Datadog error -- returned when nothing else matches the failure. */
export class UnknownDatadogError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownDatadogError>()(
    "UnknownDatadogError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class DatadogParseError
  extends /*@__PURE__*/ Schema.TaggedError<DatadogParseError>()("DatadogParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Datadog service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const DatadogServiceErrors = API_ERRORS;
export type DatadogServiceError = InstanceType<(typeof DatadogServiceErrors)[number]>;
