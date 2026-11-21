/**
 * GCP-specific error types.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
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
 * Unknown GCP error -- a failure that no typed or HTTP status class
 * matched. `status` is the HTTP status, `code` the envelope's
 * `error.status` (e.g. "FAILED_PRECONDITION") and `details` its
 * `error.details[]`.
 */
export class UnknownGCPError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownGCPError>()("UnknownGCPError", {
    ...UnknownErrorFields,
    details: /*@__PURE__*/ Schema.optional(/*@__PURE__*/ Schema.Array(Schema.Unknown)),
  }) {}

/** Schema parse error wrapper. */
export class GCPParseError
  extends /*@__PURE__*/ Schema.TaggedError<GCPParseError>()("GCPParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Resolving credentials failed -- e.g. the workload identity token exchange
 * was rejected. Never carries the tokens themselves.
 */
export class GCPCredentialsError
  extends /*@__PURE__*/ Schema.TaggedError<GCPCredentialsError>()("GCPCredentialsError", {
    message: Schema.String,
    status: /*@__PURE__*/ Schema.optional(Schema.Number),
    cause: /*@__PURE__*/ Schema.optional(Schema.Unknown),
  }).pipe(Category.withAuthError) {}

/**
 * Errors any GCP operation may surface in addition to the per-operation
 * 4xx classes declared in each generated service module.
 */
export type ClientErrors = UnknownGCPError | GCPParseError | GCPCredentialsError;

/**
 * The errors declared on the GCP services: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Each of
 * core's status classes: the protocol builds the one for a failed
 * response's status when the operation's own classes do not match.
 */
export const GcpServiceErrors = API_ERRORS;
export type GcpServiceError = InstanceType<(typeof GcpServiceErrors)[number]>;
