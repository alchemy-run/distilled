import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCouponsCouponInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    coupon: Schema.String.pipe(T.PathParam()),
    currency_options: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          amount_off: Schema.Number,
        }),
      ),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    name: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/coupons/{coupon}",
    contentType: "form-urlencoded",
  }),
);
export type PostCouponsCouponInput = typeof PostCouponsCouponInput.Type;

// Output Schema
export const PostCouponsCouponOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount_off: Schema.NullOr(Schema.Number),
    applies_to: Schema.optional(
      Schema.Struct({
        products: Schema.Array(Schema.String),
      }),
    ),
    created: Schema.Number,
    currency: Schema.NullOr(Schema.String),
    currency_options: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          amount_off: Schema.Number,
        }),
      ),
    ),
    duration: Schema.Literals(["forever", "once", "repeating"]),
    duration_in_months: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    max_redemptions: Schema.NullOr(Schema.Number),
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    name: Schema.NullOr(Schema.String),
    object: Schema.Literals(["coupon"]),
    percent_off: Schema.NullOr(Schema.Number),
    redeem_by: Schema.NullOr(Schema.Number),
    times_redeemed: Schema.Number,
    valid: Schema.Boolean,
  });
export type PostCouponsCouponOutput = typeof PostCouponsCouponOutput.Type;

// The operation
/**
 * Update a coupon
 *
 * <p>Updates the metadata of a coupon. Other coupon details (currency, duration, amount_off) are, by design, not editable.</p>
 */
export const PostCouponsCoupon = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostCouponsCouponInput,
  outputSchema: PostCouponsCouponOutput,
}));
