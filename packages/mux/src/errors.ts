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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
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

/**
 * The errors declared on the Mux service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const MuxServiceErrors = API_ERRORS;
export type MuxServiceError = InstanceType<(typeof MuxServiceErrors)[number]>;
