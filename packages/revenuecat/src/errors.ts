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

/** A failure no typed or status error matched; `code` is RevenueCat's error `type`. */
export class UnknownRevenueCatError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownRevenueCatError>()(
    "UnknownRevenueCatError",
    UnknownErrorFields,
  ) {}

export class RevenueCatParseError
  extends /*@__PURE__*/ Schema.TaggedError<RevenueCatParseError>()("RevenueCatParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the RevenueCat service: any operation can return
 * them, and every generated operation lists them as its `serviceErrors`. Today
 * that is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const RevenueCatServiceErrors = API_ERRORS;
export type RevenueCatServiceError = InstanceType<(typeof RevenueCatServiceErrors)[number]>;
