import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const GetWebhookEndpointsWebhookEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    webhook_endpoint: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/webhook_endpoints/{webhook_endpoint}",
      contentType: "form-urlencoded",
    }),
  );
export type GetWebhookEndpointsWebhookEndpointInput =
  typeof GetWebhookEndpointsWebhookEndpointInput.Type;

// Output Schema
export const GetWebhookEndpointsWebhookEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    api_version: Schema.NullOr(Schema.String),
    application: Schema.NullOr(Schema.String),
    created: Schema.Number,
    description: Schema.NullOr(Schema.String),
    enabled_events: Schema.Array(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["webhook_endpoint"]),
    secret: Schema.optional(SensitiveString),
    status: Schema.String,
    url: Schema.String,
  });
export type GetWebhookEndpointsWebhookEndpointOutput =
  typeof GetWebhookEndpointsWebhookEndpointOutput.Type;

// The operation
/**
 * Retrieve a webhook endpoint
 *
 * <p>Retrieves the webhook endpoint with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetWebhookEndpointsWebhookEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetWebhookEndpointsWebhookEndpointInput,
    outputSchema: GetWebhookEndpointsWebhookEndpointOutput,
  }));
