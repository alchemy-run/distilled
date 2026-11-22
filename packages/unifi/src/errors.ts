/**
 * UniFi-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the UniFi fallback
 * errors. Network, Protect and InnerSpace publish only success responses and
 * failures map by status in `protocol.ts`: the shared core classes first, then
 * {@link UnknownUniFiError}. The cloud APIs declare some statuses per
 * operation; the generated service modules define those matcher classes
 * (`BadRequest`, `NotFound`, ...) themselves, with the same `_tag`s as the
 * core classes here, so `catchTag` works against either.
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

/** Unknown UniFi error -- returned when nothing else matches the failure. */
export class UnknownUniFiError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownUniFiError>()(
    "UnknownUniFiError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class UniFiParseError
  extends /*@__PURE__*/ Schema.TaggedError<UniFiParseError>()("UniFiParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the UniFi service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const UniFiServiceErrors = API_ERRORS;
export type UniFiServiceError = InstanceType<(typeof UniFiServiceErrors)[number]>;
