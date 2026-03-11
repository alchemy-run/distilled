import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingMetersIdEventSummariesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    customer: Schema.String,
    end_time: Schema.Number,
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    start_time: Schema.Number,
    starting_after: Schema.optional(Schema.String),
    value_grouping_window: Schema.optional(Schema.Literals(["day", "hour"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/meters/{id}/event_summaries",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingMetersIdEventSummariesInput =
  typeof GetBillingMetersIdEventSummariesInput.Type;

// Output Schema
export const GetBillingMetersIdEventSummariesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        aggregated_value: Schema.Number,
        end_time: Schema.Number,
        id: Schema.String,
        livemode: Schema.Boolean,
        meter: Schema.String,
        object: Schema.Literals(["billing.meter_event_summary"]),
        start_time: Schema.Number,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetBillingMetersIdEventSummariesOutput =
  typeof GetBillingMetersIdEventSummariesOutput.Type;

// The operation
/**
 * List billing meter event summaries
 *
 * <p>Retrieve a list of billing meter event summaries.</p>
 *
 * @param customer - The customer for which to fetch event summaries.
 * @param end_time - The timestamp from when to stop aggregating meter events (exclusive). Must be aligned with minute boundaries.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - Unique identifier for the object.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param start_time - The timestamp from when to start aggregating meter events (inclusive). Must be aligned with minute boundaries.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param value_grouping_window - Specifies what granularity to use when generating event summaries. If not specified, a single event summary would be returned for the specified time range. For hourly granularity, start and end times must align with hour boundaries (e.g., 00:00, 01:00, ..., 23:00). For daily granularity, start and end times must align with UTC day boundaries (00:00 UTC).
 */
export const GetBillingMetersIdEventSummaries =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetBillingMetersIdEventSummariesInput,
    outputSchema: GetBillingMetersIdEventSummariesOutput,
  }));
