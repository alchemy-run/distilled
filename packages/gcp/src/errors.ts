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
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown GCP error - returned when an error status is not recognized. */
export class UnknownGCPError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownGCPError>()("UnknownGCPError", {
    code: /*@__PURE__*/ Schema.optional(Schema.Number),
    message: /*@__PURE__*/ Schema.optional(Schema.String),
    status: /*@__PURE__*/ Schema.optional(Schema.String),
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

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
