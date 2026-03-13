import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostV2CoreEventDestinationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amazon_eventbridge: Schema.optional(
      Schema.Struct({
        aws_account_id: Schema.String,
        aws_region: Schema.String,
      }),
    ),
    description: Schema.optional(Schema.String),
    enabled_events: Schema.Array(Schema.String),
    event_payload: Schema.Literals(["snapshot", "thin"]),
    events_from: Schema.optional(
      Schema.Array(Schema.Literals(["other_accounts", "self"])),
    ),
    include: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "webhook_endpoint.signing_secret",
          "webhook_endpoint.url",
        ]),
      ),
    ),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.String,
    snapshot_api_version: Schema.optional(Schema.String),
    type: Schema.Literals(["amazon_eventbridge", "webhook_endpoint"]),
    webhook_endpoint: Schema.optional(
      Schema.Struct({
        url: Schema.String,
      }),
    ),
  }).pipe(T.Http({ method: "POST", path: "/v2/core/event_destinations" }));
export type PostV2CoreEventDestinationsInput =
  typeof PostV2CoreEventDestinationsInput.Type;

// Output Schema
export const PostV2CoreEventDestinationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amazon_eventbridge: Schema.optional(
      Schema.Struct({
        aws_account_id: Schema.String,
        aws_event_source_arn: Schema.String,
        aws_event_source_status: Schema.Literals([
          "active",
          "deleted",
          "pending",
          "unknown",
        ]),
      }),
    ),
    created: Schema.String,
    description: Schema.String,
    enabled_events: Schema.Array(Schema.String),
    event_payload: Schema.Literals(["snapshot", "thin"]),
    events_from: Schema.optional(
      Schema.Array(Schema.Literals(["other_accounts", "self"])),
    ),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.String,
    object: Schema.Literals(["v2.core.event_destination"]),
    snapshot_api_version: Schema.optional(Schema.String),
    status: Schema.Literals(["disabled", "enabled"]),
    status_details: Schema.optional(
      Schema.Struct({
        disabled: Schema.optional(
          Schema.Struct({
            reason: Schema.Literals(["no_aws_event_source_exists", "user"]),
          }),
        ),
      }),
    ),
    type: Schema.Literals(["amazon_eventbridge", "webhook_endpoint"]),
    updated: Schema.String,
    webhook_endpoint: Schema.optional(
      Schema.Struct({
        signing_secret: Schema.optional(SensitiveString),
        url: Schema.optional(Schema.String),
      }),
    ),
  });
export type PostV2CoreEventDestinationsOutput =
  typeof PostV2CoreEventDestinationsOutput.Type;

// The operation
/**
 * Create an Event Destination
 *
 * Create a new event destination.
 */
export const PostV2CoreEventDestinations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV2CoreEventDestinationsInput,
    outputSchema: PostV2CoreEventDestinationsOutput,
  }),
);
