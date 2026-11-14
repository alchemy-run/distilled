/**
 * npm registry error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the npm
 * fallback and parse errors.
 *
 * Registry error bodies are `{ error }` or `{ message }` (`{ error, code }`
 * from search). The generated service modules add per-operation classes for
 * the statuses each operation documents (`Forbidden`, `NotFound`,
 * `Conflict`, ...); they share their `_tag` with the core classes here.
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
 * Unknown npm registry error -- returned when an error response matches
 * neither an operation's typed errors nor a shared HTTP status class.
 */
export class UnknownNpmError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownNpmError>()(
    "UnknownNpmError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class NpmParseError
  extends /*@__PURE__*/ Schema.TaggedError<NpmParseError>()("NpmParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any npm registry operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownNpmError | NpmParseError;

/**
 * Default npm registry operation errors: the shared HTTP status errors from
 * core plus the npm client errors.
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
