/**
 * Neon-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds Neon-specific
 * error matching and API error types.
 */
export {
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
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

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// Generic API Error - uncategorized fallback
export class NeonApiError extends Schema.TaggedErrorClass<NeonApiError>()(
  "NeonApiError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class NeonParseError extends Schema.TaggedErrorClass<NeonParseError>()(
  "NeonParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
