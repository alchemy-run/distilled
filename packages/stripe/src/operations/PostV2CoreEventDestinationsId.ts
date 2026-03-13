import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostV2CoreEventDestinationsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    description: Schema.optional(Schema.String),
    enabled_events: Schema.optional(Schema.Array(Schema.String)),
    include: Schema.optional(
      Schema.Array(Schema.Literals(["webhook_endpoint.url"])),
    ),
    metadata: Schema.optional(
      Schema.Record(Schema.String, Schema.NullOr(Schema.String)),
    ),
    name: Schema.optional(Schema.String),
    webhook_endpoint: Schema.optional(
      Schema.Struct({
        url: Schema.String,
      }),
    ),
  }).pipe(T.Http({ method: "POST", path: "/v2/core/event_destinations/{id}" }));
export type PostV2CoreEventDestinationsIdInput =
  typeof PostV2CoreEventDestinationsIdInput.Type;

// Output Schema
export const PostV2CoreEventDestinationsIdOutput =
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
export type PostV2CoreEventDestinationsIdOutput =
  typeof PostV2CoreEventDestinationsIdOutput.Type;

// The operation
/**
 * Update an Event Destination
 *
 * Update the details of an event destination.
 *
 * @param id - Identifier for the event destination to update.
 */
export const PostV2CoreEventDestinationsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV2CoreEventDestinationsIdInput,
    outputSchema: PostV2CoreEventDestinationsIdOutput,
  }));
