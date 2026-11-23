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
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

const ProblemFields = {
  ...UnknownErrorFields,
  /** Problem type URI, e.g. `https://mailchimp.com/developer/marketing/docs/errors/`. */
  type: /*@__PURE__*/ Schema.optional(Schema.String),
  title: /*@__PURE__*/ Schema.optional(Schema.String),
  instance: /*@__PURE__*/ Schema.optional(Schema.String),
};

/**
 * A problem document on a status the core map does not cover (405, 414, ...).
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
  ) {}

/** A 2xx response that does not match the operation's output schema. */
export class MailchimpParseError
  extends /*@__PURE__*/ Schema.TaggedError<MailchimpParseError>()("MailchimpParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * A Transactional API failure (`{ status: "error", code, name, message }`)
 * on a status that neither the operation nor the core map covers. `name` is
 * the vendor's discriminator (`Invalid_Key`, `Unknown_Template`).
 */
export class MailchimpTransactionalError
  extends /*@__PURE__*/ Schema.TaggedError<MailchimpTransactionalError>()(
    "MailchimpTransactionalError",
    {
      status: Schema.Number,
      code: /*@__PURE__*/ Schema.optional(Schema.Number),
      name: /*@__PURE__*/ Schema.optional(Schema.String),
      message: Schema.String,
      body: Schema.Unknown,
    },
  ) {}

/**
 * The errors declared on the Mailchimp service, for the Marketing and the
 * Transactional API alike: any operation can return them, and every
 * generated operation lists them as its `serviceErrors`. Today that is each
 * of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const MailchimpServiceErrors = API_ERRORS;
export type MailchimpServiceError = InstanceType<(typeof MailchimpServiceErrors)[number]>;
