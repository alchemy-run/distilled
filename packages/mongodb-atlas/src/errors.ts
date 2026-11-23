/**
 * MongoDB Atlas-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Atlas-specific
 * classes (ported from distilled v0). Note the generated service module
 * additionally defines its own per-status matcher classes
 * (BadRequest/PaymentRequired/...) for the statuses each operation declares --
 * those share `_tag`s with the classes here, so `catchTag` works against
 * either.
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
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

/**
 * Payment Required -- billing/quota limit (402). Core has no class for the
 * status, so the package adds one, matched by its status like an
 * operation's own errors.
 */
export class PaymentRequired
  extends /*@__PURE__*/ applyErrorMatchers(
    /*@__PURE__*/ Schema.TaggedError<PaymentRequired>()("PaymentRequired", {
      message: Schema.String,
    }).pipe(Category.withBadRequestError),
    [{ status: 402 }],
  ) {}

/**
 * Unknown MongoDB Atlas error -- returned when nothing else matches the
 * failure. Carries the Atlas error envelope fields
 * (`{ error, errorCode, reason?, detail? }`) for later cataloging.
 */
export class UnknownMongodbAtlasError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownMongodbAtlasError>()("UnknownMongodbAtlasError", {
    ...UnknownErrorFields,
    errorCode: /*@__PURE__*/ Schema.optional(Schema.String),
    reason: /*@__PURE__*/ Schema.optional(Schema.String),
    detail: /*@__PURE__*/ Schema.optional(Schema.String),
  }) {}

/** A 2xx body that does not match the output schema (strict response validation). */
export class MongodbAtlasParseError
  extends /*@__PURE__*/ Schema.TaggedError<MongodbAtlasParseError>()("MongodbAtlasParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Atlas service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Each of
 * core's status classes (the protocol builds the one for a failed
 * response's status when the operation's own classes do not match), and
 * {@link PaymentRequired} for 402.
 */
export const MongodbAtlasServiceErrors = [...API_ERRORS, PaymentRequired] as const;
export type MongodbAtlasServiceError = InstanceType<(typeof MongodbAtlasServiceErrors)[number]>;
