/**
 * Starburst Galaxy error types.
 *
 * Re-exports the common HTTP errors from core and adds the one status Galaxy
 * documents that core's shared map has no entry for (412), plus the
 * unknown-error and parse-error wrappers.
 *
 * Galaxy failures carry `{ message, ... }` bodies. Operations that declare a
 * status get the generated per-status class for it, which keeps `message`
 * and the whole `body` (where `BadRequest`'s `fields` and
 * `FailedPrecondition`'s `detail` are read). Every other failure is
 * dispatched on its status by `StarburstGalaxyProtocol` to the classes
 * here, which carry `message`. Both share their `_tag`s, so `catchTag`
 * works against either.
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

/**
 * HTTP 412 -- `FailedPrecondition`: the request cannot run in the
 * resource's current state (for example deleting a data domain that still
 * holds data products, or creating a cluster the account cannot host yet).
 * Retrying unchanged keeps failing until that state changes, so it is not
 * retryable. Like the generated per-operation `PreconditionFailed` (core
 * derives categories from the status, and 412 has none), it carries no
 * category, so handling by `_tag` or by category does not depend on
 * whether an operation declares 412.
 */
export class PreconditionFailed
  extends /*@__PURE__*/ Schema.TaggedError<PreconditionFailed>()("PreconditionFailed", {
    message: Schema.String,
  }) {}

/**
 * Unknown Starburst Galaxy error -- returned when a failed response's HTTP
 * status has no mapped error class. Carries that `status`, Galaxy's
 * `message` and the whole `body`.
 */
export class UnknownStarburstGalaxyError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownStarburstGalaxyError>()(
    "UnknownStarburstGalaxyError",
    UnknownErrorFields,
  ) {}

/** A 2xx body that does not match the output schema (strict response validation). */
export class StarburstGalaxyParseError
  extends /*@__PURE__*/ Schema.TaggedError<StarburstGalaxyParseError>()(
    "StarburstGalaxyParseError",
    {
      body: Schema.Unknown,
      cause: Schema.Unknown,
    },
  ).pipe(Category.withParseError) {}
