/**
 * PlanetScale-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds PlanetScale-specific
 * error matching and API error types.
 */
export {
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/sdk-core/errors";
export type { DefaultErrors } from "@distilled.cloud/sdk-core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/sdk-core/category";

/**
 * PlanetScale API error code mapping.
 * Maps API error response codes to HTTP error classes.
 */
export { HTTP_STATUS_MAP as ERROR_CODE_MAP } from "@distilled.cloud/sdk-core/errors";

// Generic API Error - uncategorized fallback
export class PlanetScaleApiError extends Schema.TaggedErrorClass<PlanetScaleApiError>()(
  "PlanetScaleApiError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class PlanetScaleParseError extends Schema.TaggedErrorClass<PlanetScaleParseError>()(
  "PlanetScaleParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
