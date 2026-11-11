/**
 * Mailchimp error types.
 *
 * Failures arrive as RFC 7807 problem documents
 * (`{ type, title, status, detail, instance }`) and map by status onto the
 * core classes re-exported here: `NotFound`, `BadRequest`, `Unauthorized`,
 * `Forbidden`, `TooManyRequests` and the 5xx family, the last two retryable.
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
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

const ProblemFields = {
  status: Schema.Number,
  /** Problem type URI, e.g. `https://mailchimp.com/developer/marketing/docs/errors/`. */
  type: /*@__PURE__*/ Schema.optional(Schema.String),
  title: /*@__PURE__*/ Schema.optional(Schema.String),
  message: /*@__PURE__*/ Schema.optional(Schema.String),
  instance: /*@__PURE__*/ Schema.optional(Schema.String),
  body: Schema.Unknown,
};

/**
 * A problem document on a status the core map does not cover (405, 414, …).
 * Not categorised as a server error: those retry, and these never succeed.
 */
export class MailchimpApiError
  extends /*@__PURE__*/ Schema.TaggedError<MailchimpApiError>()(
    "MailchimpApiError",
    ProblemFields,
  ) {}

/** A failure that is not a problem document at all. */
export class UnknownMailchimpError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownMailchimpError>()(
    "UnknownMailchimpError",
    ProblemFields,
  ).pipe(Category.withServerError) {}

/** A 2xx response that does not match the operation's output schema. */
export class MailchimpParseError
  extends /*@__PURE__*/ Schema.TaggedError<MailchimpParseError>()("MailchimpParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
