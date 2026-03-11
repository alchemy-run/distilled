import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteSubscriptionsSubscriptionExposedIdDiscountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription_exposed_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/subscriptions/{subscription_exposed_id}/discount",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteSubscriptionsSubscriptionExposedIdDiscountInput =
  typeof DeleteSubscriptionsSubscriptionExposedIdDiscountInput.Type;

// Output Schema
export const DeleteSubscriptionsSubscriptionExposedIdDiscountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    checkout_session: Schema.NullOr(Schema.String),
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    invoice: Schema.NullOr(Schema.String),
    invoice_item: Schema.NullOr(Schema.String),
    object: Schema.Literals(["discount"]),
    promotion_code: Schema.Unknown,
    source: Schema.Struct({
      coupon: Schema.Unknown,
      type: Schema.Literals(["coupon"]),
    }),
    start: Schema.Number,
    subscription: Schema.NullOr(Schema.String),
    subscription_item: Schema.NullOr(Schema.String),
  });
export type DeleteSubscriptionsSubscriptionExposedIdDiscountOutput =
  typeof DeleteSubscriptionsSubscriptionExposedIdDiscountOutput.Type;

// The operation
/**
 * Delete a subscription discount
 *
 * <p>Removes the currently applied discount on a subscription.</p>
 */
export const DeleteSubscriptionsSubscriptionExposedIdDiscount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSubscriptionsSubscriptionExposedIdDiscountInput,
    outputSchema: DeleteSubscriptionsSubscriptionExposedIdDiscountOutput,
  }));
