/**
 * Dokploy-specific error types.
 *
 * Re-exports the shared HTTP status errors from core and adds the Dokploy
 * fallback and parse errors.
 *
 * Dokploy failures are tRPC error bodies, `{ message, code, issues? }` with
 * a tRPC code such as `NOT_FOUND` or `BAD_REQUEST`. The spec declares 400,
 * 401, 403, 404 (on queries) and 500 on every operation; the generated
 * modules type the per-operation ones as `BadRequest`, `Forbidden` and
 * `NotFound`, which share their tags with the core classes here.
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
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  NotFound as CoreNotFound,
} from "@distilled.cloud/core/errors";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Dokploy error -- returned when an error response matches neither
 * an operation's typed errors nor a shared HTTP status class. `code` is the
 * tRPC error code from the body.
 */
export class UnknownDokployError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownDokployError>()(
    "UnknownDokployError",
    UnknownErrorFields,
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class DokployParseError
  extends /*@__PURE__*/ Schema.TaggedError<DokployParseError>()("DokployParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Dokploy operation may surface beyond the core HTTP defaults. */
export type ClientErrors = UnknownDokployError | DokployParseError;

/**
 * Default Dokploy operation errors: the shared HTTP status errors from core,
 * the statuses every Dokploy operation declares, and the Dokploy client
 * errors.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | ClientErrors;

/**
 * The errors declared on the Dokploy service: any operation can return them,
 * and every generated operation lists them as its `serviceErrors`. Today that
 * is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const DokployServiceErrors = API_ERRORS;
export type DokployServiceError = InstanceType<(typeof DokployServiceErrors)[number]>;
