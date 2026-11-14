/**
 * Google Workspace-specific error types.
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

import * as Category from "@distilled.cloud/core/category";
import { UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

/**
 * Unknown Google Workspace error -- a failure that no typed or HTTP status class
 * matched. `status` is the HTTP status, `code` the envelope's
 * `error.status` (e.g. "FAILED_PRECONDITION") and `details` its
 * `error.details[]`.
 */
export class UnknownGoogleWorkspaceError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownGoogleWorkspaceError>()(
    "UnknownGoogleWorkspaceError",
    {
      ...UnknownErrorFields,
      details: /*@__PURE__*/ Schema.optional(/*@__PURE__*/ Schema.Array(Schema.Unknown)),
    },
  ) {}

/** Schema parse error wrapper. */
export class GoogleWorkspaceParseError
  extends /*@__PURE__*/ Schema.TaggedError<GoogleWorkspaceParseError>()(
    "GoogleWorkspaceParseError",
    {
      body: Schema.Unknown,
      cause: Schema.Unknown,
    },
  ).pipe(Category.withParseError) {}

/**
 * Errors any Google Workspace operation may surface in addition to the per-operation
 * 4xx classes declared in each generated service module.
 */
export type ClientErrors = UnknownGoogleWorkspaceError | GoogleWorkspaceParseError;
