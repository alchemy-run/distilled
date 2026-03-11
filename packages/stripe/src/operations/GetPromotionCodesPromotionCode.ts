import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPromotionCodesPromotionCodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    promotion_code: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/promotion_codes/{promotion_code}",
      contentType: "form-urlencoded",
    }),
  );
export type GetPromotionCodesPromotionCodeInput =
  typeof GetPromotionCodesPromotionCodeInput.Type;

// Output Schema
export const GetPromotionCodesPromotionCodeOutput =
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
export type GetPromotionCodesPromotionCodeOutput =
  typeof GetPromotionCodesPromotionCodeOutput.Type;

// The operation
/**
 * Retrieve a promotion code
 *
 * <p>Retrieves the promotion code with the given ID. In order to retrieve a promotion code by the customer-facing <code>code</code> use <a href="/docs/api/promotion_codes/list">list</a> with the desired <code>code</code>.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetPromotionCodesPromotionCode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetPromotionCodesPromotionCodeInput,
    outputSchema: GetPromotionCodesPromotionCodeOutput,
  }));
