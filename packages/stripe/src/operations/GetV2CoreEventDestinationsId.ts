import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const GetV2CoreEventDestinationsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    include: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/v2/core/event_destinations/{id}" }));
export type GetV2CoreEventDestinationsIdInput =
  typeof GetV2CoreEventDestinationsIdInput.Type;

// Output Schema
export const GetV2CoreEventDestinationsIdOutput =
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
export type GetV2CoreEventDestinationsIdOutput =
  typeof GetV2CoreEventDestinationsIdOutput.Type;

// The operation
/**
 * Retrieve an Event Destination
 *
 * Retrieves the details of an event destination.
 *
 * @param id - Identifier for the event destination to retrieve.
 * @param include - Additional fields to include in the response.
 */
export const GetV2CoreEventDestinationsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV2CoreEventDestinationsIdInput,
    outputSchema: GetV2CoreEventDestinationsIdOutput,
  }));
