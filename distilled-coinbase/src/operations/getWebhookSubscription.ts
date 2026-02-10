import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetWebhookSubscriptionInput = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v2/data/webhooks/subscriptions/{subscriptionId}" }));
export type GetWebhookSubscriptionInput = typeof GetWebhookSubscriptionInput.Type;

// Output Schema
export const GetWebhookSubscriptionOutput = Schema.Struct({
  createdAt: Schema.String,
  description: Schema.optional(Schema.String),
  eventTypes: Schema.Array(Schema.String),
  isEnabled: Schema.Boolean,
  metadata: Schema.optional(Schema.Struct({
    secret: Schema.optional(Schema.String),
  })),
  secret: Schema.String,
  subscriptionId: Schema.String,
  target: Schema.Struct({
    url: Schema.String,
    headers: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
  }),
  labels: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
});
export type GetWebhookSubscriptionOutput = typeof GetWebhookSubscriptionOutput.Type;

// The operation
/**
 * Get webhook subscription details
 *
 * Retrieve detailed information about a specific webhook subscription including
 * configuration, status, creation timestamp, and webhook signature secret.
 * ### Response Includes
 * - Subscription configuration and filters
 * - Target URL and custom headers
 * - Webhook signature secret for verification
 * - Creation timestamp and status
 *
 * @param subscriptionId - Unique identifier for the webhook subscription.
 */
export const getWebhookSubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetWebhookSubscriptionInput,
  outputSchema: GetWebhookSubscriptionOutput,
}));
