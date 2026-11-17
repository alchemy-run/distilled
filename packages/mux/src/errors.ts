/**
 * Mux error types.
 *
 * Failures arrive as `{ "error": { "type": "not_found", "messages": [...] } }`
 * and map by status onto the core classes re-exported here: `NotFound`,
 * `BadRequest`, `Unauthorized`, `Forbidden`, `TooManyRequests` and the 5xx
 * family, the last two retryable. Operations that declare a status get a
 * generated class with the same `_tag` (and `PreconditionFailed` on
 * `listUsageExports`), so `catchTag` works against either.
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
 * A non-2xx, non-5xx status that neither the operation nor the core map
 * covers. `code` is Mux's `error.type` (`invalid_parameters`,
 * `precondition_failed`, ...) when the body carries one.
 */
export class UnknownMuxError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownMuxError>()(
    "UnknownMuxError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class MuxParseError
  extends /*@__PURE__*/ Schema.TaggedError<MuxParseError>()("MuxParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
