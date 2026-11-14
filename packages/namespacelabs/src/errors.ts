export {
  API_ERRORS,
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  DEFAULT_ERRORS,
  Forbidden,
  GatewayTimeout,
  HTTP_STATUS_MAP,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";
import * as Category from "@distilled.cloud/core/category";
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * A failed response no declared error class matches. `code` is the Connect
 * error code (`unknown`, `data_loss`, ...) and `details` the Connect error
 * details, which carry the request id.
 */
export class UnknownNamespaceLabsError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownNamespaceLabsError>()(
    "UnknownNamespaceLabsError",
    {
      code: /*@__PURE__*/ Schema.optional(Schema.String),
      message: /*@__PURE__*/ Schema.optional(Schema.String),
      details: /*@__PURE__*/ Schema.optional(Schema.Unknown),
      body: Schema.Unknown,
    },
  ).pipe(Category.withServerError) {}

export class NamespaceLabsParseError
  extends /*@__PURE__*/ Schema.TaggedError<NamespaceLabsParseError>()("NamespaceLabsParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

export type ClientErrors = UnknownNamespaceLabsError | NamespaceLabsParseError;

export type DefaultErrors = CoreDefaultErrors | ClientErrors;
