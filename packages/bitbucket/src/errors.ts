/**
 * Bitbucket-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Bitbucket
 * fallback and parse errors.
 *
 * Bitbucket error bodies are `{ type: "error", error: { message, detail?,
 * fields?, id?, data? } }`
 * (https://developer.atlassian.com/cloud/bitbucket/rest/intro/#standardized-error-responses).
 * The 410 (`Gone`) class that core has no class for is generated per
 * operation, from the statuses each operation declares.
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
 * Unknown Bitbucket error -- returned when an error response matches
 * neither an operation's typed errors nor a shared HTTP status class.
 */
export class UnknownBitbucketError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownBitbucketError>()(
    "UnknownBitbucketError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class BitbucketParseError
  extends /*@__PURE__*/ Schema.TaggedError<BitbucketParseError>()("BitbucketParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Bitbucket service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const BitbucketServiceErrors = API_ERRORS;
export type BitbucketServiceError = InstanceType<(typeof BitbucketServiceErrors)[number]>;
