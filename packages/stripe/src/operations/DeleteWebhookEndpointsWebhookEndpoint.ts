import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteWebhookEndpointsWebhookEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    webhook_endpoint: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/webhook_endpoints/{webhook_endpoint}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteWebhookEndpointsWebhookEndpointInput =
  typeof DeleteWebhookEndpointsWebhookEndpointInput.Type;

// Output Schema
export const DeleteWebhookEndpointsWebhookEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["webhook_endpoint"]),
  });
export type DeleteWebhookEndpointsWebhookEndpointOutput =
  typeof DeleteWebhookEndpointsWebhookEndpointOutput.Type;

// The operation
/**
 * Delete a webhook endpoint
 *
 * <p>You can also delete webhook endpoints via the <a href="https://dashboard.stripe.com/account/webhooks">webhook endpoint management</a> page of the Stripe dashboard.</p>
 */
export const DeleteWebhookEndpointsWebhookEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteWebhookEndpointsWebhookEndpointInput,
    outputSchema: DeleteWebhookEndpointsWebhookEndpointOutput,
  }));
