/**
 * Cloudflare-specific error types.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
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

// Schema parse error wrapper
export class CloudflareParseError extends Schema.TaggedErrorClass<CloudflareParseError>()(
  "CloudflareParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Unknown Cloudflare error - returned when an error code is not recognized.
 * Contains the raw error code for later cataloging.
 */
export class UnknownCloudflareError extends Schema.TaggedErrorClass<UnknownCloudflareError>()(
  "UnknownCloudflareError",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.String,
  },
) {}

/**
 * HTTP error - non-2xx response without a parseable Cloudflare error body.
 */
export class CloudflareHttpError extends Schema.TaggedErrorClass<CloudflareHttpError>()(
  "CloudflareHttpError",
  {
    status: Schema.Number,
    statusText: Schema.String,
    body: Schema.optional(Schema.String),
  },
) {}
