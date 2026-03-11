import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateNeonAuthWebhookConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project_id: Schema.String.pipe(T.PathParam()),
    branch_id: Schema.String.pipe(T.PathParam()),
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
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/projects/{project_id}/branches/{branch_id}/auth/webhooks",
    }),
  );
export type UpdateNeonAuthWebhookConfigInput =
  typeof UpdateNeonAuthWebhookConfigInput.Type;

// Output Schema
export const UpdateNeonAuthWebhookConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type UpdateNeonAuthWebhookConfigOutput =
  typeof UpdateNeonAuthWebhookConfigOutput.Type;

// The operation
/**
 * Update webhook configuration for Neon Auth
 *
 * Updates the webhook configuration for Neon Auth on a specific branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const updateNeonAuthWebhookConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateNeonAuthWebhookConfigInput,
    outputSchema: UpdateNeonAuthWebhookConfigOutput,
  }),
);
