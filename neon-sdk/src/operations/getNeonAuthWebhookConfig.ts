import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetNeonAuthWebhookConfigInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/auth/webhooks",
  }),
);
export type GetNeonAuthWebhookConfigInput =
  typeof GetNeonAuthWebhookConfigInput.Type;

// Output Schema
export const GetNeonAuthWebhookConfigOutput = Schema.Struct({
  enabled: Schema.Boolean,
  webhook_url: Schema.optional(Schema.String),
  enabled_events: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "user.before_create",
        "user.created",
        "send.otp",
        "send.magic_link",
      ]),
    ),
  ),
  timeout_seconds: Schema.optional(Schema.Number),
});
export type GetNeonAuthWebhookConfigOutput =
  typeof GetNeonAuthWebhookConfigOutput.Type;

// The operation
/**
 * Get webhook configuration for Neon Auth
 *
 * Returns the webhook configuration for Neon Auth.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const getNeonAuthWebhookConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetNeonAuthWebhookConfigInput,
    outputSchema: GetNeonAuthWebhookConfigOutput,
  }),
);
