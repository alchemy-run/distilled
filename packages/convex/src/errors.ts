/**
 * Convex-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds the Convex fallback and
 * parse errors. Convex error bodies have the shape `{ code, message }`, and
 * conflicts arrive as 400, so typed errors match on `code`.
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
import * as Category from "@distilled.cloud/core/category";
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  Locked as CoreLocked,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Convex error -- returned when an error response cannot be mapped to
 * a typed error or a shared HTTP status class.
 */
export class UnknownConvexError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownConvexError>()(
    "UnknownConvexError",
    UnknownErrorFields,
  ) {}

/** A 2xx body that failed response validation. */
export class ConvexParseError
  extends /*@__PURE__*/ Schema.TaggedError<ConvexParseError>()("ConvexParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Convex operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownConvexError | ConvexParseError;

/**
 * Default Convex operation errors: the shared HTTP status errors from core
 * plus the Convex client errors.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ClientErrors;
