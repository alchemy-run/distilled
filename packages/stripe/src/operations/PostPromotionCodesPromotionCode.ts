import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPromotionCodesPromotionCodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    promotion_code: Schema.String.pipe(T.PathParam()),
    active: Schema.optional(Schema.Boolean),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
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
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/promotion_codes/{promotion_code}",
      contentType: "form-urlencoded",
    }),
  );
export type PostPromotionCodesPromotionCodeInput =
  typeof PostPromotionCodesPromotionCodeInput.Type;

// Output Schema
export const PostPromotionCodesPromotionCodeOutput =
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
export type PostPromotionCodesPromotionCodeOutput =
  typeof PostPromotionCodesPromotionCodeOutput.Type;

// The operation
/**
 * Update a promotion code
 *
 * <p>Updates the specified promotion code by setting the values of the parameters passed. Most fields are, by design, not editable.</p>
 */
export const PostPromotionCodesPromotionCode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostPromotionCodesPromotionCodeInput,
    outputSchema: PostPromotionCodesPromotionCodeOutput,
  }));
