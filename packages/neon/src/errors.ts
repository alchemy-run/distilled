/**
 * Neon-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Neon fallback
 * errors. Note the generated service module additionally defines its own
 * per-status matcher classes (BadRequest/NotFound/...) for the statuses each
 * operation declares -- those share `_tag`s with the core classes here, so
 * `catchTag` works against either.
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
import { UnknownErrorFields, type ConfigError } from "@distilled.cloud/core/errors";
import type { HttpStatusError, RestProtocolError } from "@distilled.cloud/core/protocol-rest";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown Neon error -- returned when nothing else matches the failure. */
export class UnknownNeonError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownNeonError>()(
    "UnknownNeonError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper (kept for v0 surface parity). */
export class NeonParseError
  extends /*@__PURE__*/ Schema.TaggedError<NeonParseError>()("NeonParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * Neon's service errors (group 2 of an operation's errors, see
 * core/protocol): what the server can answer on any operation. A status no
 * operation declares becomes its core class, and anything else
 * {@link UnknownNeonError}.
 */
export type NeonServiceError = HttpStatusError | UnknownNeonError;

/**
 * Neon's protocol errors (group 3): what the SDK's own code fails with. The
 * server did not send them. Core's REST errors (a bad path label, a request
 * that can't be built, the transport), a response that does not match its
 * schema, and credentials that can't be read.
 */
export type NeonProtocolError = RestProtocolError | NeonParseError | ConfigError;
