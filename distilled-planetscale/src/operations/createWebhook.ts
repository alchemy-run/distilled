import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateWebhookInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  url: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
  events: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/webhooks",
  }),
);
export type CreateWebhookInput = typeof CreateWebhookInput.Type;

// Output Schema
export const CreateWebhookOutput = Schema.Struct({
  id: Schema.String,
  url: Schema.String,
  secret: Schema.String,
  enabled: Schema.Boolean,
  last_sent_result: Schema.NullOr(Schema.String),
  last_sent_success: Schema.NullOr(Schema.Boolean),
  last_sent_at: Schema.NullOr(Schema.String),
  created_at: Schema.String,
  updated_at: Schema.String,
  events: Schema.Array(
    Schema.Literal(
      "branch.ready",
      "branch.anomaly",
      "branch.primary_promoted",
      "branch.schema_recommendation",
      "branch.sleeping",
      "branch.start_maintenance",
      "cluster.storage",
      "database.access_request",
      "deploy_request.closed",
      "deploy_request.errored",
      "deploy_request.in_progress",
      "deploy_request.opened",
      "deploy_request.pending_cutover",
      "deploy_request.queued",
      "deploy_request.reverted",
      "deploy_request.schema_applied",
      "keyspace.storage",
      "webhook.test",
    ),
  ),
});
export type CreateWebhookOutput = typeof CreateWebhookOutput.Type;

// The operation
/**
 * Create a webhook
 *
 * @param organization - The name of the organization
 * @param database - The name of the database
 * @param url - The URL the webhook will send events to
 * @param enabled - Whether the webhook should be enabled
 * @param events - The events this webhook should subscribe to
 */
export const createWebhook = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateWebhookInput,
  outputSchema: CreateWebhookOutput,
}));
