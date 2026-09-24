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

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

const ProblemFields = {
  status: Schema.Number,
  /** Problem type URI, e.g. `https://mailchimp.com/developer/marketing/docs/errors/`. */
  type: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  body: Schema.Unknown,
};

/**
 * A problem document on a status the core map does not cover (405, 414, …).
 * Not categorised as a server error: those retry, and these never succeed.
 */
export class MailchimpApiError extends Schema.TaggedError<MailchimpApiError>()(
  "MailchimpApiError",
  ProblemFields,
) {}

/** A failure that is not a problem document at all. */
export class UnknownMailchimpError extends Schema.TaggedError<UnknownMailchimpError>()(
  "UnknownMailchimpError",
  ProblemFields,
).pipe(Category.withServerError) {}

/**
 * A Transactional API failure (`{ status: "error", code, name, message }`)
 * on a status the core map does not cover, e.g. a 402 `PaymentRequired`.
 * `name` is the vendor's discriminator (`Invalid_Key`, `Unknown_Template`).
 */
export class MailchimpTransactionalError extends Schema.TaggedError<MailchimpTransactionalError>()(
  "MailchimpTransactionalError",
  {
    status: Schema.Number,
    code: Schema.optional(Schema.Number),
    name: Schema.optional(Schema.String),
    message: Schema.String,
    body: Schema.Unknown,
  },
) {}

/**
 * Transactional 402: the account's plan or balance does not allow the call
 * (scheduling, dedicated IPs, …). Core has no 402 class, so this one is
 * matched by status for the operations that declare it; `code` is the
 * vendor's (`10`).
 */
export class PaymentRequired extends Schema.TaggedError<PaymentRequired>()(
  "PaymentRequired",
  {
    code: Schema.optional(Schema.Int),
    message: Schema.String,
  },
).pipe(Category.withQuotaError) {}
applyErrorMatchers(PaymentRequired, [{ status: 402 }]);
