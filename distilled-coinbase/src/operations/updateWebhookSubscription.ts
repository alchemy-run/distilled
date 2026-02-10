import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateWebhookSubscriptionInput = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  description: Schema.optional(Schema.String),
  eventTypes: Schema.Array(Schema.String),
  isEnabled: Schema.Boolean,
  target: Schema.Struct({
    url: Schema.String,
    headers: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
  }),
  metadata: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
  labels: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
}).pipe(T.Http({ method: "PUT", path: "/v2/data/webhooks/subscriptions/{subscriptionId}" }));
export type UpdateWebhookSubscriptionInput = typeof UpdateWebhookSubscriptionInput.Type;

// Output Schema
export const UpdateWebhookSubscriptionOutput = Schema.Struct({
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
export type UpdateWebhookSubscriptionOutput = typeof UpdateWebhookSubscriptionOutput.Type;

// The operation
/**
 * Update webhook subscription
 *
 * Update an existing webhook subscription's configuration including
 * event types, target URL, filtering criteria, and enabled status.
 * All required fields must be provided, even if they are not being changed.
 * ### Common Updates
 * - Change target URL or headers
 * - Add/remove event type filters
 * - Update multi-label filtering criteria
 * - Enable/disable subscription
 *
 * @param subscriptionId - Unique identifier for the webhook subscription.
 */
export const updateWebhookSubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateWebhookSubscriptionInput,
  outputSchema: UpdateWebhookSubscriptionOutput,
}));
