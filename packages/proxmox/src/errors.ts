/**
 * Proxmox VE error types (hand-written).
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error and
 * parse-error wrappers.
 *
 * Every Proxmox failure answers `{ "data": null, "message": string }`, plus
 * `errors` (parameter name -> reason) when parameters were rejected. The
 * schema types no failure per operation, so the SDK dispatches on the status
 * and carries the parameter reasons in the message (see the protocol).
 * Failures Proxmox reports under a status that does not fit them, such as
 * HTTP 500 for a guest that does not exist, are typed by the patches in
 * `patches/`.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  InvalidInput,
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
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** A failed response whose HTTP status has no mapped error class. */
export class UnknownProxmoxError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownProxmoxError>()("UnknownProxmoxError", {
    message: Schema.String,
    status: Schema.Number,
    body: Schema.Unknown,
  }).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class ProxmoxParseError
  extends /*@__PURE__*/ Schema.TaggedError<ProxmoxParseError>()("ProxmoxParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/** Errors any Proxmox operation may surface in addition to the shared HTTP status errors. */
export type ClientErrors = UnknownProxmoxError | ProxmoxParseError;

/**
 * Default Proxmox operation errors. The schema declares no failures per
 * operation, so every operation carries every status the protocol maps.
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
