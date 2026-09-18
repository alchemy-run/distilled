/**
 * ACME-specific error types.
 *
 * ACME reports failures as RFC 7807 problem documents whose `type` is a
 * `urn:ietf:params:acme:error:*` URN (RFC 8555 §6.7). Every URN the SDK
 * knows is a typed class in the generated service (patched onto the
 * operations that raise it, matched on the URN by the protocol). This
 * module holds the shared HTTP defaults and the package's own client
 * errors.
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
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  NotFound as CoreNotFound,
} from "@distilled.cloud/core/errors";
import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Unknown ACME error — a problem document whose `type` matches no typed
 * class on the operation. Carries structured problem fields and a redacted
 * body. Add newly observed URNs to the authored model.
 */
export class UnknownAcmeError extends Schema.TaggedError<UnknownAcmeError>()(
  "UnknownAcmeError",
  {
    /** The problem `type` URN, when the body was a problem document. */
    type: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Number),
    detail: Schema.optional(Schema.String),
    subproblems: Schema.optional(Schema.Array(Schema.Unknown)),
    body: Schema.Unknown,
  },
) {}

/** Schema parse error wrapper. */
export class AcmeParseError extends Schema.TaggedError<AcmeParseError>()(
  "AcmeParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/** The account key could not be parsed or used to sign (client-side). */
export class JoseError extends Schema.TaggedError<JoseError>()("JoseError", {
  message: Schema.String,
  cause: Schema.optional(Schema.Unknown),
}).pipe(Category.withBadRequestError) {}

/**
 * The directory has no URL for the requested resource (a CA without
 * `newAuthz`/`keyChange`, or a stale directory URL).
 */
export class DirectoryMissingResource extends Schema.TaggedError<DirectoryMissingResource>()(
  "DirectoryMissingResource",
  {
    resource: Schema.String,
    directoryUrl: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/** Errors any ACME operation may surface beyond the core HTTP defaults. */
export type ClientErrors =
  | UnknownAcmeError
  | AcmeParseError
  | JoseError
  | DirectoryMissingResource;

/**
 * Default ACME operation errors: the shared HTTP status errors from core plus
 * the client errors above.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | ClientErrors;
