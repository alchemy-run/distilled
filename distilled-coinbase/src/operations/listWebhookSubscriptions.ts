import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest } from "../errors";

// Input Schema
export const ListWebhookSubscriptionsInput = Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/data/webhooks/subscriptions" }));
export type ListWebhookSubscriptionsInput =
  typeof ListWebhookSubscriptionsInput.Type;

// Output Schema
export const ListWebhookSubscriptionsOutput = Schema.Struct({
  subscriptions: Schema.Array(
    Schema.Struct({
      createdAt: Schema.String,
      description: Schema.optional(Schema.String),
      eventTypes: Schema.Array(Schema.String),
      isEnabled: Schema.Boolean,
      metadata: Schema.optional(
        Schema.Struct({
          secret: Schema.optional(Schema.String),
        }),
      ),
      secret: Schema.String,
      subscriptionId: Schema.String,
      target: Schema.Struct({
        url: Schema.String,
        headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListWebhookSubscriptionsOutput =
  typeof ListWebhookSubscriptionsOutput.Type;

// The operation
/**
 * List webhook subscriptions
 *
 * Retrieve a paginated list of webhook subscriptions for the authenticated project.
 * Returns subscriptions for all CDP product events (onchain, onramp/offramp, wallet, etc.)
 * in descending order by creation time.
 * ### Use Cases
 * - Monitor all active webhook subscriptions across CDP products
 * - Audit webhook configurations
 * - Manage subscription lifecycle
 *
 * @param pageSize - The number of subscriptions to return per page.
 * @param pageToken - The token for the next page of subscriptions, if any.
 */
export const listWebhookSubscriptions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListWebhookSubscriptionsInput,
    outputSchema: ListWebhookSubscriptionsOutput,
    errors: [InvalidRequest],
  }),
);
