/**
 * Browserbase-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Browserbase
 * fallback and parse errors.
 *
 * Browserbase error bodies are `{ statusCode, error, message }`, where
 * `error` is the HTTP reason phrase (`"Not Found"`) and `message` the detail.
 * Some endpoints add a machine-readable `code`; the protocol reports it as the
 * code of an `UnknownBrowserbaseError`. The 402 (`PaymentRequired`) and 410
 * (`Gone`) classes that core has no class for are generated per operation,
 * from the statuses each operation declares.
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
 * Unknown Browserbase error -- returned when an error response matches
 * neither an operation's typed errors nor a shared HTTP status class.
 */
export class UnknownBrowserbaseError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownBrowserbaseError>()(
    "UnknownBrowserbaseError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class BrowserbaseParseError
  extends /*@__PURE__*/ Schema.TaggedError<BrowserbaseParseError>()("BrowserbaseParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
