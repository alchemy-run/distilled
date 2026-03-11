import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPromotionCodesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.optional(Schema.Boolean),
    code: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    expires_at: Schema.optional(Schema.Number),
    max_redemptions: Schema.optional(Schema.Number),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    promotion: Schema.Struct({
      coupon: Schema.optional(Schema.String),
      type: Schema.Literals(["coupon"]),
    }),
    restrictions: Schema.optional(
      Schema.Struct({
        currency_options: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              minimum_amount: Schema.optional(Schema.Number),
            }),
          ),
        ),
        first_time_transaction: Schema.optional(Schema.Boolean),
        minimum_amount: Schema.optional(Schema.Number),
        minimum_amount_currency: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/promotion_codes",
      contentType: "form-urlencoded",
    }),
  );
export type PostPromotionCodesInput = typeof PostPromotionCodesInput.Type;

// Output Schema
export const PostPromotionCodesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    code: Schema.String,
    created: Schema.Number,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    expires_at: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    max_redemptions: Schema.NullOr(Schema.Number),
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["promotion_code"]),
    promotion: Schema.Struct({
      coupon: Schema.Unknown,
      type: Schema.Literals(["coupon"]),
    }),
    restrictions: Schema.Struct({
      currency_options: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            minimum_amount: Schema.Number,
          }),
        ),
      ),
      first_time_transaction: Schema.Boolean,
      minimum_amount: Schema.NullOr(Schema.Number),
      minimum_amount_currency: Schema.NullOr(Schema.String),
    }),
    times_redeemed: Schema.Number,
  });
export type PostPromotionCodesOutput = typeof PostPromotionCodesOutput.Type;

// The operation
/**
 * Create a promotion code
 *
 * <p>A promotion code points to an underlying promotion. You can optionally restrict the code to a specific customer, redemption limit, and expiration date.</p>
 */
export const PostPromotionCodes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostPromotionCodesInput,
  outputSchema: PostPromotionCodesOutput,
}));
