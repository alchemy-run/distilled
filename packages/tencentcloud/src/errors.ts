/**
 * Tencent Cloud error types.
 *
 * A failed API 3.0 call answers HTTP 200 with an error envelope:
 *
 * ```json
 * { "Response": { "Error": { "Code": "AuthFailure.SignatureFailure", "Message": "..." },
 *                 "RequestId": "ed93f3cb-..." } }
 * ```
 *
 * `Code` is `<CommonCode>` or `<CommonCode>.<Detail>`. Each common code
 * Tencent documents for every product
 * (https://www.tencentcloud.com/document/api/213/33281, "Common Error
 * Codes") has a class here, matched on the code's first segment:
 * `ResourceNotFound.InstanceNotExist` is a {@link ResourceNotFound} whose
 * `code` keeps the full value. `ServiceUnavailable` is core's
 * `ServiceUnavailable`. A code outside the table is an
 * {@link UnknownTencentCloudError} carrying the code.
 *
 * A response with no envelope (a proxy error page, an HTTP error status)
 * maps through core's HTTP status classes.
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
} from "@distilled.cloud/core/errors";
import * as Category from "@distilled.cloud/core/category";
import type { CryptoError } from "@distilled.cloud/core/crypto";
import {
  ServiceUnavailable,
  type BadRequest as CoreBadRequest,
  type Conflict as CoreConflict,
  type DefaultErrors as CoreDefaultErrors,
  type Forbidden as CoreForbidden,
  type Locked as CoreLocked,
  type NotFound as CoreNotFound,
  type UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Fields of every error built from a response envelope. */
const envelope = {
  /** The full `Response.Error.Code`, e.g. `InvalidParameterValue.Range`. */
  code: Schema.String,
  message: Schema.String,
  requestId: /*@__PURE__*/ Schema.optional(Schema.String),
};

/** `ActionOffline` -- the API has been deprecated. */
export class ActionOffline
  extends /*@__PURE__*/ Schema.TaggedError<ActionOffline>()("ActionOffline", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `AuthFailure.*` -- the signature, key, token or MFA check failed. */
export class AuthFailure
  extends /*@__PURE__*/ Schema.TaggedError<AuthFailure>()("AuthFailure", envelope).pipe(
    Category.withAuthError,
  ) {}

/** `DryRunOperation` -- the request would have succeeded, but `DryRun` was set. */
export class DryRunOperation
  extends /*@__PURE__*/ Schema.TaggedError<DryRunOperation>()("DryRunOperation", envelope) {}

/** `FailedOperation.*` -- the operation failed. */
export class FailedOperation
  extends /*@__PURE__*/ Schema.TaggedError<FailedOperation>()("FailedOperation", envelope) {}

/** `InternalError.*` -- an internal error on Tencent's side. Retryable. */
export class InternalError
  extends /*@__PURE__*/ Schema.TaggedError<InternalError>()("InternalError", envelope).pipe(
    Category.withServerError,
    /*@__PURE__*/ Category.withRetryable(),
  ) {}

/** `InvalidAction` -- the API does not exist. */
export class InvalidAction
  extends /*@__PURE__*/ Schema.TaggedError<InvalidAction>()("InvalidAction", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `InvalidParameter.*` -- a parameter is incorrect. */
export class InvalidParameter
  extends /*@__PURE__*/ Schema.TaggedError<InvalidParameter>()("InvalidParameter", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `InvalidParameterValue.*` -- a parameter value is invalid. */
export class InvalidParameterValue
  extends /*@__PURE__*/ Schema.TaggedError<InvalidParameterValue>()(
    "InvalidParameterValue",
    envelope,
  ).pipe(Category.withBadRequestError) {}

/** `InvalidRequest` -- the multipart request body is malformed. */
export class InvalidRequest
  extends /*@__PURE__*/ Schema.TaggedError<InvalidRequest>()("InvalidRequest", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `IpInBlacklist` -- the caller's IP is on the account's IP blacklist. */
export class IpInBlacklist
  extends /*@__PURE__*/ Schema.TaggedError<IpInBlacklist>()("IpInBlacklist", envelope).pipe(
    Category.withAuthError,
  ) {}

/** `IpNotInWhitelist` -- the caller's IP is not on the account's IP whitelist. */
export class IpNotInWhitelist
  extends /*@__PURE__*/ Schema.TaggedError<IpNotInWhitelist>()("IpNotInWhitelist", envelope).pipe(
    Category.withAuthError,
  ) {}

/** `LimitExceeded.*` -- a quota limit was exceeded. */
export class LimitExceeded
  extends /*@__PURE__*/ Schema.TaggedError<LimitExceeded>()("LimitExceeded", envelope).pipe(
    Category.withQuotaError,
  ) {}

/** `MissingParameter.*` -- a required parameter is missing. */
export class MissingParameter
  extends /*@__PURE__*/ Schema.TaggedError<MissingParameter>()("MissingParameter", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `NoSuchProduct` -- the product does not exist. */
export class NoSuchProduct
  extends /*@__PURE__*/ Schema.TaggedError<NoSuchProduct>()("NoSuchProduct", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `NoSuchVersion` -- the API version does not exist. */
export class NoSuchVersion
  extends /*@__PURE__*/ Schema.TaggedError<NoSuchVersion>()("NoSuchVersion", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `RequestLimitExceeded.*` -- the request rate limit was exceeded. Retryable. */
export class RequestLimitExceeded
  extends /*@__PURE__*/ Schema.TaggedError<RequestLimitExceeded>()(
    "RequestLimitExceeded",
    envelope,
  ).pipe(
    Category.withThrottlingError,
    /*@__PURE__*/ Category.withRetryable({ throttling: true }),
  ) {}

/** `RequestSizeLimitExceeded` -- the request is too large. */
export class RequestSizeLimitExceeded
  extends /*@__PURE__*/ Schema.TaggedError<RequestSizeLimitExceeded>()(
    "RequestSizeLimitExceeded",
    envelope,
  ).pipe(Category.withBadRequestError) {}

/** `ResourceInUse.*` -- the resource is in use. */
export class ResourceInUse
  extends /*@__PURE__*/ Schema.TaggedError<ResourceInUse>()("ResourceInUse", envelope).pipe(
    Category.withConflictError,
  ) {}

/** `ResourceInsufficient.*` -- not enough of a resource is available. */
export class ResourceInsufficient
  extends /*@__PURE__*/ Schema.TaggedError<ResourceInsufficient>()(
    "ResourceInsufficient",
    envelope,
  ).pipe(Category.withQuotaError) {}

/** `ResourceNotFound.*` -- the resource does not exist. */
export class ResourceNotFound
  extends /*@__PURE__*/ Schema.TaggedError<ResourceNotFound>()("ResourceNotFound", envelope).pipe(
    Category.withNotFoundError,
  ) {}

/** `ResourceUnavailable.*` -- the resource is unavailable. */
export class ResourceUnavailable
  extends /*@__PURE__*/ Schema.TaggedError<ResourceUnavailable>()(
    "ResourceUnavailable",
    envelope,
  ).pipe(Category.withConflictError) {}

/** `ResponseSizeLimitExceeded` -- the response would be too large. */
export class ResponseSizeLimitExceeded
  extends /*@__PURE__*/ Schema.TaggedError<ResponseSizeLimitExceeded>()(
    "ResponseSizeLimitExceeded",
    envelope,
  ).pipe(Category.withBadRequestError) {}

/** `UnauthorizedOperation.*` -- the caller is not authorized (CAM). */
export class UnauthorizedOperation
  extends /*@__PURE__*/ Schema.TaggedError<UnauthorizedOperation>()(
    "UnauthorizedOperation",
    envelope,
  ).pipe(Category.withAuthError) {}

/** `UnknownParameter.*` -- the request has a parameter the API does not know. */
export class UnknownParameter
  extends /*@__PURE__*/ Schema.TaggedError<UnknownParameter>()("UnknownParameter", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/** `UnsupportedOperation.*` -- the operation is not supported. */
export class UnsupportedOperation
  extends /*@__PURE__*/ Schema.TaggedError<UnsupportedOperation>()(
    "UnsupportedOperation",
    envelope,
  ).pipe(Category.withBadRequestError) {}

/** `UnsupportedProtocol` -- the HTTP method is not GET or POST. */
export class UnsupportedProtocol
  extends /*@__PURE__*/ Schema.TaggedError<UnsupportedProtocol>()(
    "UnsupportedProtocol",
    envelope,
  ).pipe(Category.withBadRequestError) {}

/** `UnsupportedRegion` -- the API does not support the requested region. */
export class UnsupportedRegion
  extends /*@__PURE__*/ Schema.TaggedError<UnsupportedRegion>()("UnsupportedRegion", envelope).pipe(
    Category.withBadRequestError,
  ) {}

/**
 * A failure no class above covers: an error code outside the common table
 * (a product's own code, e.g. `InvalidInstanceId.NotFound`), or an HTTP
 * failure without an envelope. `code` is the envelope's code when there is
 * one; `body` is the response body.
 */
export class UnknownTencentCloudError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownTencentCloudError>()("UnknownTencentCloudError", {
    code: /*@__PURE__*/ Schema.optional(Schema.String),
    message: Schema.String,
    requestId: /*@__PURE__*/ Schema.optional(Schema.String),
    status: Schema.Number,
    body: Schema.Unknown,
  }) {}

/** A 2xx body that failed response validation, or that was not JSON. */
export class TencentCloudParseError
  extends /*@__PURE__*/ Schema.TaggedError<TencentCloudParseError>()("TencentCloudParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** An envelope error class: constructed from the code, message and request id. */
type EnvelopeErrorClass = new (fields: {
  readonly code: string;
  readonly message: string;
  readonly requestId?: string;
}) => unknown;

/** The documented common codes, keyed by the code's first segment. */
export const COMMON_ERRORS: Readonly<Record<string, EnvelopeErrorClass>> = {
  ActionOffline,
  AuthFailure,
  DryRunOperation,
  FailedOperation,
  InternalError,
  InvalidAction,
  InvalidParameter,
  InvalidParameterValue,
  InvalidRequest,
  IpInBlacklist,
  IpNotInWhitelist,
  LimitExceeded,
  MissingParameter,
  NoSuchProduct,
  NoSuchVersion,
  RequestLimitExceeded,
  RequestSizeLimitExceeded,
  ResourceInUse,
  ResourceInsufficient,
  ResourceNotFound,
  ResourceUnavailable,
  ResponseSizeLimitExceeded,
  UnauthorizedOperation,
  UnknownParameter,
  UnsupportedOperation,
  UnsupportedProtocol,
  UnsupportedRegion,
};

/**
 * The error for an envelope's `Code`: its common class, core's
 * `ServiceUnavailable`, or {@link UnknownTencentCloudError}.
 */
export const envelopeError = (
  error: { readonly code: string; readonly message: string; readonly requestId?: string },
  status: number,
  body: unknown,
): unknown => {
  const root = error.code.split(".", 1)[0]!;
  if (root === "ServiceUnavailable") return new ServiceUnavailable({ message: error.message });
  const ErrorClass = Object.hasOwn(COMMON_ERRORS, root) ? COMMON_ERRORS[root] : undefined;
  return ErrorClass !== undefined
    ? new ErrorClass(error)
    : new UnknownTencentCloudError({ ...error, status, body });
};

/** Errors built from a response envelope's common code. */
export type CommonErrors =
  | ActionOffline
  | AuthFailure
  | DryRunOperation
  | FailedOperation
  | InternalError
  | InvalidAction
  | InvalidParameter
  | InvalidParameterValue
  | InvalidRequest
  | IpInBlacklist
  | IpNotInWhitelist
  | LimitExceeded
  | MissingParameter
  | NoSuchProduct
  | NoSuchVersion
  | RequestLimitExceeded
  | RequestSizeLimitExceeded
  | ResourceInUse
  | ResourceInsufficient
  | ResourceNotFound
  | ResourceUnavailable
  | ResponseSizeLimitExceeded
  | UnauthorizedOperation
  | UnknownParameter
  | UnsupportedOperation
  | UnsupportedProtocol
  | UnsupportedRegion;

/**
 * Every error a Tencent Cloud operation can fail with, besides transport,
 * config and input errors: the envelope classes, and core's HTTP status
 * classes for a failure without an envelope.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | CommonErrors
  | UnknownTencentCloudError
  | TencentCloudParseError
  | CryptoError;
