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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
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

/**
 * The errors declared on the Steel service: any operation can return them, and
 * every generated operation lists them as its `serviceErrors`. Today that is
 * each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const SteelServiceErrors = API_ERRORS;
export type SteelServiceError = InstanceType<(typeof SteelServiceErrors)[number]>;
