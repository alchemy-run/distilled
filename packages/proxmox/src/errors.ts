/**
 * Proxmox VE error types (hand-written).
 *
 * Re-exports the common HTTP errors from core and adds the two failures
 * Proxmox reports in its own way, plus the unknown-error and parse-error
 * wrappers:
 *
 * - {@link ParameterValidationError}: HTTP 400 with an `errors` object that
 *   names each rejected parameter.
 * - {@link GuestNotFound}: Proxmox answers a request for a guest that does
 *   not exist with HTTP 500, not 404.
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
import {
  HTTP_STATUS_MAP,
  type BadRequest as CoreBadRequest,
  type Conflict as CoreConflict,
  type DefaultErrors as CoreDefaultErrors,
  type Forbidden as CoreForbidden,
  type Locked as CoreLocked,
  type NotFound as CoreNotFound,
  type UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import * as HttpClientError from "effect/http/HttpClientError";

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

/** HTTP 400 that names the rejected parameters: `errors` maps each one to its reason. */
export class ParameterValidationError
  extends /*@__PURE__*/ Schema.TaggedError<ParameterValidationError>()("ParameterValidationError", {
    message: Schema.String,
    errors: /*@__PURE__*/ Schema.Record(Schema.String, Schema.String),
  }).pipe(Category.withBadRequestError) {}

/** The guest's configuration file does not exist, although Proxmox answers HTTP 500. */
export class GuestNotFound
  extends /*@__PURE__*/ Schema.TaggedError<GuestNotFound>()("GuestNotFound", {
    message: Schema.String,
  }).pipe(Category.withNotFoundError) {}

/** Errors any Proxmox operation may surface in addition to the shared HTTP status errors. */
export type ClientErrors =
  | UnknownProxmoxError
  | ProxmoxParseError
  | ParameterValidationError
  | GuestNotFound;

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

/**
 * A log-safe failure summary: the tag, the transport reason and the HTTP
 * status when known. HTTP client errors keep the request (without its
 * Authorization header), and messages or bodies can echo submitted values,
 * so none of them are included.
 */
export function describeError(error: unknown): string {
  if (HttpClientError.isHttpClientError(error)) {
    const status = error.response?.status;
    return `${error._tag} (${error.reason._tag}${status === undefined ? "" : `, HTTP ${status}`})`;
  }
  if (typeof error !== "object" || error === null) return "Unknown failure";
  const tag = "_tag" in error && typeof error._tag === "string" ? error._tag : undefined;
  // Core's status classes carry no status. GatewayTimeout stands for both 408 and 504.
  const statuses =
    error instanceof UnknownProxmoxError
      ? [error.status]
      : Object.entries(HTTP_STATUS_MAP)
          .filter(([, type]) => error instanceof type)
          .map(([status]) => status);
  const name = tag ?? (error instanceof Error ? error.name : "Unknown failure");
  return statuses.length ? `${name} (HTTP ${statuses.join(" or ")})` : name;
}
