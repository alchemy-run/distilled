/**
 * Supabase-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds Supabase-specific
 * error matching and API error types.
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

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// Unknown Supabase error - returned when an error code is not recognized
export class UnknownSupabaseError extends Schema.TaggedErrorClass<UnknownSupabaseError>()(
  "UnknownSupabaseError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class SupabaseParseError extends Schema.TaggedErrorClass<SupabaseParseError>()(
  "SupabaseParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
