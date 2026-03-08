/**
 * AWS-specific error types.
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
 * Unknown AWS error - fallback for unrecognized error codes.
 */
export class UnknownAwsError extends Schema.TaggedErrorClass<UnknownAwsError>()(
  "UnknownAwsError",
  {
    errorTag: Schema.String,
    errorData: Schema.optional(Schema.Unknown),
    service: Schema.optional(Schema.String),
    operation: Schema.optional(Schema.String),
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * Parse error - failed to parse AWS response.
 */
export class ParseError extends Schema.TaggedErrorClass<ParseError>()(
  "ParseError",
  {
    message: Schema.String,
    body: Schema.optional(Schema.Unknown),
  },
).pipe(Category.withParseError) {}

/**
 * Endpoint resolution error.
 */
export class EndpointError extends Schema.TaggedErrorClass<EndpointError>()(
  "EndpointError",
  {
    message: Schema.String,
  },
).pipe(Category.withConfigurationError) {}

/**
 * Common AWS errors that apply to all operations.
 */
export const COMMON_ERRORS: Schema.Top[] = [];
