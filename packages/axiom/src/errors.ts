/**
 * Axiom-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Axiom fallback
 * errors. Note the generated service modules additionally define their own
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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/** Unknown Axiom error -- returned when nothing else matches the failure. */
export class UnknownAxiomError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownAxiomError>()(
    "UnknownAxiomError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper (kept for v0 surface parity). */
export class AxiomParseError
  extends /*@__PURE__*/ Schema.TaggedError<AxiomParseError>()("AxiomParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Axiom service: any operation can return them, and
 * every generated operation lists them as its `serviceErrors`. Today that is
 * each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const AxiomServiceErrors = API_ERRORS;
export type AxiomServiceError = InstanceType<(typeof AxiomServiceErrors)[number]>;
