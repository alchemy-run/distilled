/**
 * Resend-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Resend fallback
 * errors. Note the generated service module additionally defines its own
 * per-status matcher classes (BadRequest/NotFound/...) for the statuses each
 * operation declares -- those share `_tag`s with the core classes here, so
 * `catchTag` works against either.
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
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

/** Unknown Resend error -- returned when nothing else matches the failure. */
export class UnknownResendError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownResendError>()("UnknownResendError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

// Errors Resend can answer on any operation, from its error reference
// (api-reference/errors) and the live runs of 2026-10-29. Each matches
// Resend's machine-readable `name` (core's matcher `code` is numeric, so the
// name is matched as `body: {"/name": ...}`), with the status and, where one
// name covers several cases, the message. generate.ts appends them to every
// operation's error list.

/** No `Authorization` header (401 `missing_api_key`). */
export class MissingApiKey
  extends /*@__PURE__*/ Schema.TaggedError<MissingApiKey>()("MissingApiKey", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(MissingApiKey, [{ status: 401, body: { "/name": "missing_api_key" } }]);

/**
 * The API key does not exist, was deleted or is malformed
 * (`validation_error`, "API key is invalid": 400, or 401 from the sending
 * endpoints).
 */
export class InvalidApiKey
  extends /*@__PURE__*/ Schema.TaggedError<InvalidApiKey>()("InvalidApiKey", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(InvalidApiKey, [
  {
    status: 400,
    body: { "/name": "validation_error" },
    message: { includes: "API key is invalid" },
  },
  {
    status: 401,
    body: { "/name": "validation_error" },
    message: { includes: "API key is invalid" },
  },
]);

/** A sending-only API key called an endpoint that needs full access (401 `restricted_api_key`). */
export class RestrictedApiKey
  extends /*@__PURE__*/ Schema.TaggedError<RestrictedApiKey>()("RestrictedApiKey", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(RestrictedApiKey, [{ status: 401, body: { "/name": "restricted_api_key" } }]);

/** The API key is not active (403 `restricted_api_key`). */
export class InactiveApiKey
  extends /*@__PURE__*/ Schema.TaggedError<InactiveApiKey>()("InactiveApiKey", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(InactiveApiKey, [{ status: 403, body: { "/name": "restricted_api_key" } }]);

/** The API key is suspended (403 `suspended_api_key`). */
export class SuspendedApiKey
  extends /*@__PURE__*/ Schema.TaggedError<SuspendedApiKey>()("SuspendedApiKey", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(SuspendedApiKey, [{ status: 403, body: { "/name": "suspended_api_key" } }]);

/**
 * An OAuth access token lacks a scope the endpoint needs (403
 * `invalid_permission`), or a permission value is not one Resend accepts
 * (422).
 */
export class InvalidPermission
  extends /*@__PURE__*/ Schema.TaggedError<InvalidPermission>()("InvalidPermission", {
    message: Schema.String,
  }).pipe(Category.withAuthError) {}
applyErrorMatchers(InvalidPermission, [{ body: { "/name": "invalid_permission" } }]);

/**
 * Resend rejected the request (`validation_error`); `message` says which
 * field. More specific errors cover the cases worth handling.
 */
export class ValidationError
  extends /*@__PURE__*/ Schema.TaggedError<ValidationError>()("ValidationError", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}
applyErrorMatchers(ValidationError, [{ body: { "/name": "validation_error" } }]);

/** The request body lacks a required field (422 `missing_required_field`). */
export class MissingRequiredField
  extends /*@__PURE__*/ Schema.TaggedError<MissingRequiredField>()("MissingRequiredField", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}
applyErrorMatchers(MissingRequiredField, [{ body: { "/name": "missing_required_field" } }]);

/** The request lacks a required parameter (422 `missing_required_parameter`). */
export class MissingRequiredParameter
  extends /*@__PURE__*/ Schema.TaggedError<MissingRequiredParameter>()("MissingRequiredParameter", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}
applyErrorMatchers(MissingRequiredParameter, [{ body: { "/name": "missing_required_parameter" } }]);

/** A parameter is malformed, such as an id that is not a UUID (`invalid_parameter`). */
export class InvalidParameter
  extends /*@__PURE__*/ Schema.TaggedError<InvalidParameter>()("InvalidParameter", {
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}
applyErrorMatchers(InvalidParameter, [{ body: { "/name": "invalid_parameter" } }]);

/** Another request is already updating this resource (409 `resource_locked`). Retried by default. */
export class ResourceLocked
  extends /*@__PURE__*/ Schema.TaggedError<ResourceLocked>()("ResourceLocked", {
    message: Schema.String,
  }).pipe(Category.withConflictError, Category.withRetryableError) {}
applyErrorMatchers(ResourceLocked, [{ status: 409, body: { "/name": "resource_locked" } }]);

/** The errors any operation can answer (above); part of every operation's error union. */
export type ResendCommonError =
  | MissingApiKey
  | InvalidApiKey
  | RestrictedApiKey
  | InactiveApiKey
  | SuspendedApiKey
  | InvalidPermission
  | ValidationError
  | MissingRequiredField
  | MissingRequiredParameter
  | InvalidParameter
  | ResourceLocked;

/** Schema parse error wrapper. */
export class ResendParseError
  extends /*@__PURE__*/ Schema.TaggedError<ResendParseError>()("ResendParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Resend webhook signature verification failed: a signature header is
 * missing or malformed, the timestamp is outside the tolerance window, or no
 * signature matches the raw request payload.
 */
export class ResendWebhookSignatureError
  extends /*@__PURE__*/ Schema.TaggedError<ResendWebhookSignatureError>()(
    "ResendWebhookSignatureError",
    {
      message: Schema.String,
      cause: /*@__PURE__*/ Schema.optional(Schema.Unknown),
    },
  ).pipe(Category.withAuthError) {}

/** Resend webhook payload JSON parsing failed after signature verification. */
export class ResendWebhookPayloadParseError
  extends /*@__PURE__*/ Schema.TaggedError<ResendWebhookPayloadParseError>()(
    "ResendWebhookPayloadParseError",
    {
      message: Schema.String,
      cause: /*@__PURE__*/ Schema.optional(Schema.Unknown),
    },
  ).pipe(Category.withParseError) {}
