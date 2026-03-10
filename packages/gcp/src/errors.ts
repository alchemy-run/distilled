/**
 * GCP-specific error types.
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
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// Generic GCP API Error
export class GCPApiError extends Schema.TaggedErrorClass<GCPApiError>()(
  "GCPApiError",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class GCPParseError extends Schema.TaggedErrorClass<GCPParseError>()(
  "GCPParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
