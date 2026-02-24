import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetWebhookInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/webhooks/{id}",
  }),
);
export type GetWebhookInput = typeof GetWebhookInput.Type;

// Output Schema
export const GetWebhookOutput = Schema.Struct({
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
    Schema.Literals([
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
    ]),
  ),
});
export type GetWebhookOutput = typeof GetWebhookOutput.Type;

// The operation
/**
 * Get a webhook
 *
 * @param organization - The name of the organization
 * @param database - The name of the database
 * @param id - The ID of the webhook
 */
export const getWebhook = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetWebhookInput,
  outputSchema: GetWebhookOutput,
  errors: [Forbidden, NotFound] as const,
}));
