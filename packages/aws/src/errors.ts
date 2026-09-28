import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as Credentials from "./credentials.browser.ts";
import { TaggedError as AwsError } from "@distilled.cloud/core/error-class";
import type * as SigV4 from "./sigv4.ts";

/** Fields every error class carries: the service's message. */
interface MessageFields {
  readonly message?: string;
}

//==== Common AWS Errors ====
export class AccessDeniedException extends AwsError("AccessDeniedException", [
  "AuthError",
])<MessageFields> {}

export class ExpiredTokenException extends AwsError("ExpiredTokenException", [
  "AuthError",
])<MessageFields> {}

export class IncompleteSignature extends AwsError("IncompleteSignature", [
  "AuthError",
])<MessageFields> {}

export class InternalFailure extends AwsError("InternalFailure", [
  "ServerError",
])<MessageFields> {}

export class MalformedHttpRequestException extends AwsError(
  "MalformedHttpRequestException",
  ["BadRequestError"],
)<MessageFields> {}

export class NotAuthorized extends AwsError("NotAuthorized", [
  "AuthError",
])<MessageFields> {}

export class OptInRequired extends AwsError("OptInRequired", [
  "AuthError",
])<MessageFields> {}

export class RequestAbortedException extends AwsError(
  "RequestAbortedException",
  ["AbortedError"],
)<MessageFields> {}

export class RequestEntityTooLargeException extends AwsError(
  "RequestEntityTooLargeException",
  ["BadRequestError"],
)<MessageFields> {}

export class RequestExpired extends AwsError("RequestExpired", [
  "BadRequestError",
  "TimeoutError",
])<MessageFields> {}

export class RequestTimeoutException extends AwsError(
  "RequestTimeoutException",
  ["TimeoutError"],
)<MessageFields> {}

export class ServiceUnavailable extends AwsError("ServiceUnavailable", [
  "ServerError",
])<MessageFields> {}

export class ThrottlingException extends AwsError("ThrottlingException", [
  "ThrottlingError",
])<MessageFields> {}

export class UnrecognizedClientException extends AwsError(
  "UnrecognizedClientException",
  ["AuthError"],
)<MessageFields> {}

export class UnknownOperationException extends AwsError(
  "UnknownOperationException",
  ["BadRequestError"],
)<MessageFields> {}

export class ValidationError extends AwsError("ValidationError", [
  "BadRequestError",
])<MessageFields> {}

export class ValidationException extends AwsError("ValidationException", [
  "BadRequestError",
])<{
  /** The human-readable validation failure reason from the service. */
  readonly message?: string;
  /** Machine-readable reason code (e.g. "FIELD_VALIDATION_FAILED"). */
  readonly reason?: string;
  /** Per-field validation failures, when the service reports them. */
  readonly fieldList?: any;
}> {}

export class OperationAborted extends AwsError("OperationAborted", [
  "AbortedError",
])<MessageFields> {}

export class UnknownAwsError extends AwsError("UnknownAwsError")<{
  readonly errorTag: string;
  readonly errorData: any;
  /** The AWS service SDK ID (e.g., "S3", "DynamoDB") */
  readonly service?: string;
  /** The operation name (e.g., "createBucket", "putObject") */
  readonly operation?: string;
  readonly message: string;
}> {}

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
export class TransientFetchError extends AwsError("TransientFetchError", [
  "NetworkError",
])<{ readonly message: string; readonly cause: any }> {}

export class InternalError extends AwsError("InternalError", [
  "ServerError",
])<MessageFields> {}

/** Error when endpoint resolution fails due to a rule error */
export class EndpointError extends AwsError("EndpointError", ["ServerError"])<{
  readonly message: string;
}> {}

/** Error when no rule matches in the ruleset */
export class NoMatchingRuleError extends AwsError(
  "NoMatchingRuleError",
)<MessageFields> {}

export class ParseError extends AwsError("ParseError")<{
  readonly message: string;
}> {}

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
 * `HttpClientError` belongs here because every operation can fail before
 * any AWS response exists (DNS, TLS, connection reset).
 */
export type CommonErrors =
  | UnknownAwsError
  | CommonAwsError
  | EndpointError
  | NoMatchingRuleError
  | SigV4.SigningError
  | Credentials.CredentialsError
  | HttpClientError.HttpClientError;
