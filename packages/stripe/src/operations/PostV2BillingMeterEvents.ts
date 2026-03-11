import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2BillingMeterEventsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    event_name: Schema.String,
    identifier: Schema.optional(Schema.String),
    payload: Schema.Record(Schema.String, Schema.String),
    timestamp: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "POST", path: "/v2/billing/meter_events" }));
export type PostV2BillingMeterEventsInput =
  typeof PostV2BillingMeterEventsInput.Type;

// Output Schema
export const PostV2BillingMeterEventsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.String,
    event_name: Schema.String,
    identifier: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.billing.meter_event"]),
    payload: Schema.Record(Schema.String, Schema.String),
    timestamp: Schema.String,
  });
export type PostV2BillingMeterEventsOutput =
  typeof PostV2BillingMeterEventsOutput.Type;

// The operation
/**
 * Create a Meter Event with synchronous validation
 *
 * Creates a meter event. Events are validated synchronously, but are processed asynchronously. Supports up to 1,000 events per second in livemode. For higher rate-limits, please use meter event streams instead.
 */
export const PostV2BillingMeterEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV2BillingMeterEventsInput,
    outputSchema: PostV2BillingMeterEventsOutput,
  }),
);
