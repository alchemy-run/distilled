/**
 * Mongodb-atlas-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds Mongodb-atlas-specific
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

// Unknown Mongodb-atlas error - returned when an error code is not recognized
export class UnknownMongodbAtlasError extends Schema.TaggedErrorClass<UnknownMongodbAtlasError>()(
  "UnknownMongodbAtlasError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class MongodbAtlasParseError extends Schema.TaggedErrorClass<MongodbAtlasParseError>()(
  "MongodbAtlasParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
