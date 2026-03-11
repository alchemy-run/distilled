import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingCreditGrantsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Struct({
      monetary: Schema.optional(
        Schema.Struct({
          currency: Schema.String,
          value: Schema.Number,
        }),
      ),
      type: Schema.Literals(["monetary"]),
    }),
    applicability_config: Schema.Struct({
      scope: Schema.Struct({
        price_type: Schema.optional(Schema.Literals(["metered"])),
        prices: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
        ),
      }),
    }),
    category: Schema.optional(Schema.Literals(["paid", "promotional"])),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    effective_at: Schema.optional(Schema.Number),
    expand: Schema.optional(Schema.Array(Schema.String)),
    expires_at: Schema.optional(Schema.Number),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.optional(Schema.String),
    priority: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/credit_grants",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingCreditGrantsInput =
  typeof PostBillingCreditGrantsInput.Type;

// Output Schema
export const PostBillingCreditGrantsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Struct({
      monetary: Schema.Unknown,
      type: Schema.Literals(["monetary"]),
    }),
    applicability_config: Schema.Struct({
      scope: Schema.Struct({
        price_type: Schema.optional(Schema.Literals(["metered"])),
        prices: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.NullOr(Schema.String),
            }),
          ),
        ),
      }),
    }),
    category: Schema.Literals(["paid", "promotional"]),
    created: Schema.Number,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    effective_at: Schema.NullOr(Schema.Number),
    expires_at: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.NullOr(Schema.String),
    object: Schema.Literals(["billing.credit_grant"]),
    priority: Schema.optional(Schema.NullOr(Schema.Number)),
    test_clock: Schema.Unknown,
    updated: Schema.Number,
    voided_at: Schema.NullOr(Schema.Number),
  });
export type PostBillingCreditGrantsOutput =
  typeof PostBillingCreditGrantsOutput.Type;

// The operation
/**
 * Create a credit grant
 *
 * <p>Creates a credit grant.</p>
 */
export const PostBillingCreditGrants = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostBillingCreditGrantsInput,
    outputSchema: PostBillingCreditGrantsOutput,
  }),
);
