import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingMeterEventsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    event_name: Schema.String,
    expand: Schema.optional(Schema.Array(Schema.String)),
    identifier: Schema.optional(Schema.String),
    payload: Schema.Record(Schema.String, Schema.String),
    timestamp: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/meter_events",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingMeterEventsInput =
  typeof PostBillingMeterEventsInput.Type;

// Output Schema
export const PostBillingMeterEventsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    event_name: Schema.String,
    identifier: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.meter_event"]),
    payload: Schema.Record(Schema.String, Schema.String),
    timestamp: Schema.Number,
  });
export type PostBillingMeterEventsOutput =
  typeof PostBillingMeterEventsOutput.Type;

// The operation
/**
 * Create a billing meter event
 *
 * <p>Creates a billing meter event.</p>
 */
export const PostBillingMeterEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostBillingMeterEventsInput,
    outputSchema: PostBillingMeterEventsOutput,
  }),
);
