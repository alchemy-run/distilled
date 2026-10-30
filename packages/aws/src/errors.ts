import type { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as S from "@distilled.cloud/core/schema-lite-typed";
import type { SourceError } from "effect/ConfigProvider";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Category from "./category.ts";
import type * as Credentials from "./credentials-service.ts";
// Imported from the leaf module, not `traits.ts`: that one imports every
// protocol, and each protocol imports this file, so the annotation would not
// yet exist when these classes are built. See error-message.ts.
import * as T from "./error-message.ts";
import type * as SigV4 from "./sigv4.ts";

/**
 * The canonical message member every error class carries.
 *
 * Tagged with `T.ErrorMessage` so the response parser can find the message
 * without guessing at spelling -- see the trait's docs and distilled #160.
 */
const ErrorMessage = /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage());

//==== Common AWS Errors ====
export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    // AWS explains WHICH action/resource was denied in the message -- keep it
    // so callers (and test logs) can see the actual authorization failure.
    message: ErrorMessage,
  }).pipe(Category.withAuthError) {}

export class ExpiredTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTokenException>()("ExpiredTokenException", {
    message: ErrorMessage,
  }).pipe(Category.withAuthError) {}

export class IncompleteSignature
  extends /*@__PURE__*/ S.TaggedError<IncompleteSignature>()("IncompleteSignature", {
    message: ErrorMessage,
  }).pipe(Category.withAuthError) {}

export class InternalFailure
  extends /*@__PURE__*/ S.TaggedError<InternalFailure>()("InternalFailure", {
    message: ErrorMessage,
  }).pipe(Category.withServerError) {}

export class MalformedHttpRequestException
  extends /*@__PURE__*/ S.TaggedError<MalformedHttpRequestException>()(
    "MalformedHttpRequestException",
    { message: ErrorMessage },
  ).pipe(Category.withBadRequestError) {}

export class NotAuthorized
  extends /*@__PURE__*/ S.TaggedError<NotAuthorized>()("NotAuthorized", {
    message: ErrorMessage,
  }).pipe(Category.withAuthError) {}

export class OptInRequired
  extends /*@__PURE__*/ S.TaggedError<OptInRequired>()("OptInRequired", {
    message: ErrorMessage,
  }).pipe(Category.withAuthError) {}

export class RequestAbortedException
  extends /*@__PURE__*/ S.TaggedError<RequestAbortedException>()("RequestAbortedException", {
    message: ErrorMessage,
  }).pipe(Category.withAbortedError) {}

export class RequestEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestEntityTooLargeException>()(
    "RequestEntityTooLargeException",
    { message: ErrorMessage },
  ).pipe(Category.withBadRequestError) {}

export class RequestExpired
  extends /*@__PURE__*/ S.TaggedError<RequestExpired>()("RequestExpired", {
    message: ErrorMessage,
  }).pipe(Category.withBadRequestError, Category.withTimeoutError) {}

export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()("RequestTimeoutException", {
    message: ErrorMessage,
  }).pipe(Category.withTimeoutError) {}

export class ServiceUnavailable
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailable>()("ServiceUnavailable", {
    message: ErrorMessage,
  }).pipe(Category.withServerError) {}

export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: ErrorMessage,
  }).pipe(Category.withThrottlingError) {}

export class UnrecognizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnrecognizedClientException>()(
    "UnrecognizedClientException",
    { message: ErrorMessage },
  ).pipe(Category.withAuthError) {}

export class UnknownOperationException
  extends /*@__PURE__*/ S.TaggedError<UnknownOperationException>()("UnknownOperationException", {
    message: ErrorMessage,
  }).pipe(Category.withBadRequestError) {}

export class ValidationError
  extends /*@__PURE__*/ S.TaggedError<ValidationError>()("ValidationError", {
    message: ErrorMessage,
  }).pipe(Category.withBadRequestError) {}

export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    /** The human-readable validation failure reason from the service. */
    message: ErrorMessage,
    /** Machine-readable reason code (e.g. "FIELD_VALIDATION_FAILED"). */
    reason: /*@__PURE__*/ S.optional(S.String),
    /** Per-field validation failures, when the service reports them. */
    fieldList: /*@__PURE__*/ S.optional(S.Any),
  }).pipe(Category.withBadRequestError) {}

export class OperationAborted
  extends /*@__PURE__*/ S.TaggedError<OperationAborted>()("OperationAborted", {
    message: ErrorMessage,
  }).pipe(Category.withAbortedError) {}

export class UnknownAwsError
  extends /*@__PURE__*/ S.TaggedError<UnknownAwsError>()("UnknownAwsError", {
    errorTag: S.String,
    errorData: S.Any,
    /** The AWS service SDK ID (e.g., "S3", "DynamoDB") */
    service: /*@__PURE__*/ S.optional(S.String),
    /** The operation name (e.g., "createBucket", "putObject") */
    operation: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}

/**
 * Check if an error is a transient network error that should be retried.
 * These are low-level fetch/socket errors that indicate temporary connectivity issues.
 */
export const isTransientNetworkError = (err: unknown): boolean => {
  if (typeof err !== "object" || err === null) return false;
  const e = err as { code?: string; name?: string; cause?: unknown };
  // Check for common transient error codes
  if (
    e.code === "UND_ERR_SOCKET" ||
    e.code === "ECONNRESET" ||
    e.code === "UND_ERR_CONNECT_TIMEOUT" ||
    e.code === "EPIPE" ||
    e.name === "FetchError"
  ) {
    return true;
  }
  // Also check the cause chain for nested errors (fetch wraps errors)
  if (e.cause) {
    return isTransientNetworkError(e.cause);
  }
  return false;
};

/**
 * Error thrown when a fetch request fails due to a transient network issue.
 * Marked as retryable so the default retry policy will automatically retry these.
 */
export class TransientFetchError
  extends /*@__PURE__*/ S.TaggedError<TransientFetchError>()("TransientFetchError", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    cause: S.Any,
  }).pipe(Category.withNetworkError) {}

export class InternalError
  extends /*@__PURE__*/ S.TaggedError<InternalError>()("InternalError", {
    message: ErrorMessage,
  }).pipe(Category.withServerError) {}

/**
 * The endpoint rules reject the call's parameters (e.g. a region that is not
 * a valid DNS name, a malformed ARN). A configuration error: retrying
 * cannot succeed.
 */
export class EndpointError
  extends /*@__PURE__*/ S.TaggedError<EndpointError>()("EndpointError", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(Category.withConfigurationError) {}

/** Error when no rule matches in the ruleset */
export class NoMatchingRuleError
  extends /*@__PURE__*/ S.TaggedError<NoMatchingRuleError>()("NoMatchingRuleError", {
    message: ErrorMessage,
  }) {}

export class ParseError
  extends /*@__PURE__*/ S.TaggedError<ParseError>()("ParseError", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}

export const COMMON_ERRORS = [
  AccessDeniedException,
  ExpiredTokenException,
  IncompleteSignature,
  InternalError,
  InternalFailure,
  MalformedHttpRequestException,
  NotAuthorized,
  OperationAborted,
  OptInRequired,
  RequestAbortedException,
  RequestEntityTooLargeException,
  RequestExpired,
  RequestTimeoutException,
  ServiceUnavailable,
  ThrottlingException,
  UnknownOperationException,
  UnrecognizedClientException,
  ValidationError,
  ValidationException,
] as const;

export type CommonAwsError =
  | AccessDeniedException
  | ExpiredTokenException
  | IncompleteSignature
  | InternalFailure
  | MalformedHttpRequestException
  | NotAuthorized
  | OptInRequired
  | RequestAbortedException
  | RequestEntityTooLargeException
  | RequestExpired
  | RequestTimeoutException
  | ServiceUnavailable
  | ThrottlingException
  | UnrecognizedClientException
  | UnknownOperationException
  | ValidationError
  | ValidationException
  | OperationAborted;

/**
 * All error types that can be returned by AWS operations.
 *
 * `HttpClientError` belongs here because `API.make` puts it in every
 * operation's error channel (the request can fail before any AWS response
 * exists -- DNS, TLS, connection reset). Leaving it out made each generated
 * operation's declared type narrower than what it can actually fail with.
 * `SourceError` is a provided `ConfigProvider` that cannot read its source,
 * from `Region.fromEnv()` / `Endpoint.fromEnv()`. `InvalidInput` is a path
 * or host label that would address another resource, refused before
 * anything is signed.
 */
export type CommonErrors =
  | UnknownAwsError
  | ParseError
  | InvalidInput
  | CommonAwsError
  | EndpointError
  | NoMatchingRuleError
  | SigV4.SigningError
  | Credentials.CredentialsError
  | SourceError
  | HttpClientError.HttpClientError;
