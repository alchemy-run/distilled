import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { NotFound } from "../errors";

// Input Schema
export const DeleteWebhookSubscriptionInput = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/v2/data/webhooks/subscriptions/{subscriptionId}",
  }),
);
export type DeleteWebhookSubscriptionInput =
  typeof DeleteWebhookSubscriptionInput.Type;

// Output Schema
export const DeleteWebhookSubscriptionOutput = Schema.Void;
export type DeleteWebhookSubscriptionOutput =
  typeof DeleteWebhookSubscriptionOutput.Type;

// The operation
/**
 * Delete webhook subscription
 *
 * Permanently delete a webhook subscription and stop all event deliveries.
 * This action cannot be undone.
 * ### Important Notes
 * - All webhook deliveries will cease immediately
 * - Subscription cannot be recovered after deletion
 * - Consider disabling instead of deleting for temporary pauses
 *
 * @param subscriptionId - Unique identifier for the webhook subscription.
 */
export const deleteWebhookSubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteWebhookSubscriptionInput,
    outputSchema: DeleteWebhookSubscriptionOutput,
    errors: [NotFound],
  }),
);
