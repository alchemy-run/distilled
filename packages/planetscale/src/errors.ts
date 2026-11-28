/**
 * PlanetScale-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the PlanetScale
 * fallback errors. Note the generated service module additionally defines
 * its own per-status matcher classes (BadRequest/Forbidden/NotFound/...) for
 * the statuses each operation declares -- those share `_tag`s with the core
 * classes here, so `catchTag` works against either.
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

/**
 * PlanetScale API error code mapping (v0 surface parity).
 * Maps API error response codes to HTTP error classes.
 */
export { HTTP_STATUS_MAP as ERROR_CODE_MAP } from "@distilled.cloud/core/errors";

/** Unknown PlanetScale error -- returned when nothing else matches the failure. */
export class UnknownPlanetScaleError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownPlanetScaleError>()(
    "UnknownPlanetScaleError",
    UnknownErrorFields,
  ) {}

/** Schema parse error wrapper (kept for v0 surface parity). */
export class PlanetScaleParseError
  extends /*@__PURE__*/ Schema.TaggedError<PlanetScaleParseError>()("PlanetScaleParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the PlanetScale service: any operation can return
 * them, and every generated operation lists them as its `serviceErrors`. Today
 * that is each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const PlanetScaleServiceErrors = API_ERRORS;
export type PlanetScaleServiceError = InstanceType<(typeof PlanetScaleServiceErrors)[number]>;
