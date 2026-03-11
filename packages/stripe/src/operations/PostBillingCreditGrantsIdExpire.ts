import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingCreditGrantsIdExpireInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/credit_grants/{id}/expire",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingCreditGrantsIdExpireInput =
  typeof PostBillingCreditGrantsIdExpireInput.Type;

// Output Schema
export const PostBillingCreditGrantsIdExpireOutput =
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
export type PostBillingCreditGrantsIdExpireOutput =
  typeof PostBillingCreditGrantsIdExpireOutput.Type;

// The operation
/**
 * Expire a credit grant
 *
 * <p>Expires a credit grant.</p>
 *
 * @param id - Unique identifier for the object.
 */
export const PostBillingCreditGrantsIdExpire =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostBillingCreditGrantsIdExpireInput,
    outputSchema: PostBillingCreditGrantsIdExpireOutput,
  }));
