import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TestWebhookInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/webhooks/{id}/test",
  }),
);
export type TestWebhookInput = typeof TestWebhookInput.Type;

// Output Schema
export const TestWebhookOutput = Schema.Void;
export type TestWebhookOutput = typeof TestWebhookOutput.Type;

// The operation
/**
 * Test a webhook
 *
 * Sends a test event to the webhook
 *
 * @param organization - The name of the organization
 * @param database - The name of the database
 * @param id - The ID of the webhook
 */
export const testWebhook = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestWebhookInput,
  outputSchema: TestWebhookOutput,
}));
