import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV2CoreEventDestinationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    include: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(T.Http({ method: "GET", path: "/v2/core/event_destinations" }));
export type GetV2CoreEventDestinationsInput =
  typeof GetV2CoreEventDestinationsInput.Type;

// Output Schema
export const GetV2CoreEventDestinationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
            signing_secret: Schema.optional(Schema.String),
            url: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    next_page_url: Schema.NullOr(Schema.String),
    previous_page_url: Schema.NullOr(Schema.String),
  });
export type GetV2CoreEventDestinationsOutput =
  typeof GetV2CoreEventDestinationsOutput.Type;

// The operation
/**
 * List Event Destinations
 *
 * Lists all event destinations.
 *
 * @param include - Additional fields to include in the response. Currently supports `webhook_endpoint.url`.
 * @param limit - The page size.
 */
export const GetV2CoreEventDestinations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV2CoreEventDestinationsInput,
    outputSchema: GetV2CoreEventDestinationsOutput,
  }),
);
