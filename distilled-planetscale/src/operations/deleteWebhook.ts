import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeleteWebhookInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/webhooks/{id}",
  }),
);
export type DeleteWebhookInput = typeof DeleteWebhookInput.Type;

// Output Schema
export const DeleteWebhookOutput = Schema.Void;
export type DeleteWebhookOutput = typeof DeleteWebhookOutput.Type;

// The operation
/**
 * Delete a webhook
 *
 * @param organization - The name of the organization
 * @param database - The name of the database
 * @param id - The ID of the webhook
 */
export const deleteWebhook = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteWebhookInput,
  outputSchema: DeleteWebhookOutput,
  errors: [Forbidden, NotFound] as const,
}));
