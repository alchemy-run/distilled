import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostV2CoreEventDestinationsIdEnableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "POST", path: "/v2/core/event_destinations/{id}/enable" }),
  );
export type PostV2CoreEventDestinationsIdEnableInput =
  typeof PostV2CoreEventDestinationsIdEnableInput.Type;

// Output Schema
export const PostV2CoreEventDestinationsIdEnableOutput =
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
export type PostV2CoreEventDestinationsIdEnableOutput =
  typeof PostV2CoreEventDestinationsIdEnableOutput.Type;

// The operation
/**
 * Enable an Event Destination
 *
 * Enable an event destination.
 *
 * @param id - Identifier for the event destination to enable.
 */
export const PostV2CoreEventDestinationsIdEnable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV2CoreEventDestinationsIdEnableInput,
    outputSchema: PostV2CoreEventDestinationsIdEnableOutput,
  }));
