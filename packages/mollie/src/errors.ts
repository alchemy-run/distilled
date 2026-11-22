/**
 * Mollie-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Mollie
 * fallback and parse errors.
 *
 * Mollie error bodies are `{ status, title, detail, field?, _links }`, where
 * `title` is the HTTP reason phrase (`"Not Found"`), `detail` the message and
 * `field` the input member that caused it. The 410 (`Gone`) class that core
 * has no class for is generated per operation, from the statuses each
 * operation declares.
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
 * Unknown Mollie error -- returned when an error response matches
 * neither an operation's typed errors nor a shared HTTP status class.
 */
export class UnknownMollieError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownMollieError>()(
    "UnknownMollieError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class MollieParseError
  extends /*@__PURE__*/ Schema.TaggedError<MollieParseError>()("MollieParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
