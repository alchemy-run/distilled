/**
 * Steel-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Steel
 * fallback and parse errors.
 *
 * Steel error bodies are `{ error, message, code?, param?, retryable?,
 * retryAfterSeconds? }`, where `code` is the stable machine-readable reason
 * (`budget_exceeded`, `profile_not_ready`). The session-commands endpoints
 * nest it instead: `{ error: { code, message } }`. The protocol reads both,
 * and reports `code` as the code of an `UnknownSteelError`.
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
 * Unknown Steel error -- returned when an error response matches neither an
 * operation's typed errors nor a shared HTTP status class.
 */
export class UnknownSteelError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownSteelError>()(
    "UnknownSteelError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class SteelParseError
  extends /*@__PURE__*/ Schema.TaggedError<SteelParseError>()("SteelParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
