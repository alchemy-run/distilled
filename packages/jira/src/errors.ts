/**
 * Jira-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Jira
 * fallback, parse and token errors.
 *
 * Jira error bodies are `{ errorMessages: string[], errors: { [field]: string } }`
 * (the spec's `ErrorCollection`); the API gateway answers `{ code, message }`.
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
 * Unknown Jira error -- returned when an error response matches neither an
 * operation's typed errors nor a shared HTTP status class.
 */
export class UnknownJiraError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownJiraError>()(
    "UnknownJiraError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class JiraParseError
  extends /*@__PURE__*/ Schema.TaggedError<JiraParseError>()("JiraParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The OAuth refresh-token exchange at `https://auth.atlassian.com/oauth/token`
 * failed: the request failed, the endpoint refused the token (Atlassian
 * answers `403 invalid_grant` for a spent or expired refresh token), it
 * answered with something that is not a token, or it did not answer in
 * time. `status` is the token endpoint's HTTP status, when it answered. It
 * is a failure of a request at run time, so it is not a `ConfigError`.
 */
export class TokenRequestFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenRequestFailed>()("TokenRequestFailed", {
    message: Schema.String,
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
  }).pipe(Category.withAuthError) {}

/**
 * The errors declared on the Jira service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const JiraServiceErrors = API_ERRORS;
export type JiraServiceError = InstanceType<(typeof JiraServiceErrors)[number]>;
