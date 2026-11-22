/**
 * Sproutboat-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Sproutboat
 * fallback and parse errors.
 *
 * Sproutboat error bodies are `{ error, reason?, path?, need?,
 * retry_after_s? }`: `error` is a message for people, `reason` a stable,
 * machine-readable cause (`route-taken`, `source-missing`, ...). The typed
 * classes for single reasons are generated per operation from
 * `patches/`.
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
 * Unknown Sproutboat error -- returned when an error response matches
 * neither an operation's typed errors nor a shared HTTP status class.
 */
export class UnknownSproutboatError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownSproutboatError>()(
    "UnknownSproutboatError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class SproutboatParseError
  extends /*@__PURE__*/ Schema.TaggedError<SproutboatParseError>()("SproutboatParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
