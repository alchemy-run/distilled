/**
 * Auth0-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Auth0 fallback
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
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown Auth0 error -- returned when nothing else matches the failure. */
export class UnknownAuth0Error
  extends /*@__PURE__*/ Schema.TaggedError<UnknownAuth0Error>()(
    "UnknownAuth0Error",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper. */
export class Auth0ParseError
  extends /*@__PURE__*/ Schema.TaggedError<Auth0ParseError>()("Auth0ParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
