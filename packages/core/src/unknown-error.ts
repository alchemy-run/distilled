/**
 * The fields every SDK's `Unknown<Sdk>Error` carries: what the response said
 * about a failure that no typed error matched. An SDK spreads
 * {@link UnknownErrorFields} into its own class and adds the fields its
 * provider sends (Stripe's `type` and `param`, AWS's `service` and
 * `operation`, ...):
 *
 * ```ts
 * export class UnknownNeonError
 *   extends Schema.TaggedError<UnknownNeonError>()("UnknownNeonError", UnknownErrorFields) {}
 * ```
 *
 * The class carries no error category: which statuses reach it, and whether
 * they are worth a retry, is the protocol's call.
 *
 * Defined on its own, in core's `base` bundle group, so AWS uses it without
 * loading the REST modules.
 */
import * as Schema from "./schema-lite-typed.ts";

export const UnknownErrorFields = {
  /** HTTP status of the response that carried the failure. */
  status: Schema.Number,
  /** The provider's machine-readable error code, when the response has one. */
  code: /*@__PURE__*/ Schema.optional(Schema.String),
  /** The provider's error message, when the response has one. */
  message: /*@__PURE__*/ Schema.optional(Schema.String),
  /** Parsed JSON body, or the raw text when the body wasn't JSON. */
  body: Schema.Unknown,
};

/** The values of {@link UnknownErrorFields}. */
export interface UnknownErrorProps {
  readonly status: number;
  readonly code?: string | undefined;
  readonly message?: string | undefined;
  readonly body: unknown;
}
