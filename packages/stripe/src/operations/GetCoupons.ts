import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCouponsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/coupons",
    contentType: "form-urlencoded",
  }),
);
export type GetCouponsInput = typeof GetCouponsInput.Type;

// Output Schema
export const GetCouponsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetCouponsOutput = typeof GetCouponsOutput.Type;

// The operation
/**
 * List all coupons
 *
 * <p>Returns a list of your coupons.</p>
 *
 * @param created - A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCoupons = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetCouponsInput,
  outputSchema: GetCouponsOutput,
}));
