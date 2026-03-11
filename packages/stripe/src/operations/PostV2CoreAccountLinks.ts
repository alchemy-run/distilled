import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2CoreAccountLinksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String,
    use_case: Schema.Struct({
      account_onboarding: Schema.optional(
        Schema.Struct({
          collection_options: Schema.optional(
            Schema.Struct({
              fields: Schema.optional(
                Schema.Literals(["currently_due", "eventually_due"]),
              ),
              future_requirements: Schema.optional(
                Schema.Literals(["include", "omit"]),
              ),
            }),
          ),
          configurations: Schema.Array(
            Schema.Literals(["customer", "merchant", "recipient"]),
          ),
          refresh_url: Schema.String,
          return_url: Schema.optional(Schema.String),
        }),
      ),
      account_update: Schema.optional(
        Schema.Struct({
          collection_options: Schema.optional(
            Schema.Struct({
              fields: Schema.optional(
                Schema.Literals(["currently_due", "eventually_due"]),
              ),
              future_requirements: Schema.optional(
                Schema.Literals(["include", "omit"]),
              ),
            }),
          ),
          configurations: Schema.Array(
            Schema.Literals(["customer", "merchant", "recipient"]),
          ),
          refresh_url: Schema.String,
          return_url: Schema.optional(Schema.String),
        }),
      ),
      type: Schema.Literals(["account_onboarding", "account_update"]),
    }),
  }).pipe(T.Http({ method: "POST", path: "/v2/core/account_links" }));
export type PostV2CoreAccountLinksInput =
  typeof PostV2CoreAccountLinksInput.Type;

// Output Schema
export const PostV2CoreAccountLinksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String,
    created: Schema.String,
    expires_at: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.core.account_link"]),
    url: Schema.String,
    use_case: Schema.Struct({
      account_onboarding: Schema.optional(
        Schema.Struct({
          collection_options: Schema.optional(
            Schema.Struct({
              fields: Schema.optional(
                Schema.Literals(["currently_due", "eventually_due"]),
              ),
              future_requirements: Schema.optional(
                Schema.Literals(["include", "omit"]),
              ),
            }),
          ),
          configurations: Schema.Array(
            Schema.Literals(["customer", "merchant", "recipient"]),
          ),
          refresh_url: Schema.String,
          return_url: Schema.optional(Schema.String),
        }),
      ),
      account_update: Schema.optional(
        Schema.Struct({
          collection_options: Schema.optional(
            Schema.Struct({
              fields: Schema.optional(
                Schema.Literals(["currently_due", "eventually_due"]),
              ),
              future_requirements: Schema.optional(
                Schema.Literals(["include", "omit"]),
              ),
            }),
          ),
          configurations: Schema.Array(
            Schema.Literals(["customer", "merchant", "recipient"]),
          ),
          refresh_url: Schema.String,
          return_url: Schema.optional(Schema.String),
        }),
      ),
      type: Schema.Literals(["account_onboarding", "account_update"]),
    }),
  });
export type PostV2CoreAccountLinksOutput =
  typeof PostV2CoreAccountLinksOutput.Type;

// The operation
/**
 * Create an Account Link
 *
 * Creates an AccountLink object that includes a single-use URL that an account can use to access a Stripe-hosted flow for collecting or updating required information.
 */
export const PostV2CoreAccountLinks = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV2CoreAccountLinksInput,
    outputSchema: PostV2CoreAccountLinksOutput,
  }),
);
