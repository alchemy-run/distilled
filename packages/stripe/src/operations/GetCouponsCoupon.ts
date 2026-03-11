import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCouponsCouponInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  coupon: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/coupons/{coupon}",
    contentType: "form-urlencoded",
  }),
);
export type GetCouponsCouponInput = typeof GetCouponsCouponInput.Type;

// Output Schema
export const GetCouponsCouponOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
);
export type GetCouponsCouponOutput = typeof GetCouponsCouponOutput.Type;

// The operation
/**
 * Retrieve a coupon
 *
 * <p>Retrieves the coupon with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetCouponsCoupon = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetCouponsCouponInput,
  outputSchema: GetCouponsCouponOutput,
}));
