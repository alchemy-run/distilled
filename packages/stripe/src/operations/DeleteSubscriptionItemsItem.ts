import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteSubscriptionItemsItemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    item: Schema.String.pipe(T.PathParam()),
    clear_usage: Schema.optional(Schema.Boolean),
    payment_behavior: Schema.optional(
      Schema.Literals([
        "allow_incomplete",
        "default_incomplete",
        "error_if_incomplete",
        "pending_if_incomplete",
      ]),
    ),
    proration_behavior: Schema.optional(
      Schema.Literals(["always_invoice", "create_prorations", "none"]),
    ),
    proration_date: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/subscription_items/{item}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteSubscriptionItemsItemInput =
  typeof DeleteSubscriptionItemsItemInput.Type;

// Output Schema
export const DeleteSubscriptionItemsItemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["subscription_item"]),
  });
export type DeleteSubscriptionItemsItemOutput =
  typeof DeleteSubscriptionItemsItemOutput.Type;

// The operation
/**
 * Delete a subscription item
 *
 * <p>Deletes an item from the subscription. Removing a subscription item from a subscription will not cancel the subscription.</p>
 */
export const DeleteSubscriptionItemsItem = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteSubscriptionItemsItemInput,
    outputSchema: DeleteSubscriptionItemsItemOutput,
  }),
);
