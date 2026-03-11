import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2BillingMeterEventAdjustmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cancel: Schema.Struct({
      identifier: Schema.String,
    }),
    event_name: Schema.String,
    type: Schema.Literals(["cancel"]),
  }).pipe(
    T.Http({ method: "POST", path: "/v2/billing/meter_event_adjustments" }),
  );
export type PostV2BillingMeterEventAdjustmentsInput =
  typeof PostV2BillingMeterEventAdjustmentsInput.Type;

// Output Schema
export const PostV2BillingMeterEventAdjustmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cancel: Schema.Struct({
      identifier: Schema.String,
    }),
    created: Schema.String,
    event_name: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.billing.meter_event_adjustment"]),
    status: Schema.Literals(["complete", "pending"]),
    type: Schema.Literals(["cancel"]),
  });
export type PostV2BillingMeterEventAdjustmentsOutput =
  typeof PostV2BillingMeterEventAdjustmentsOutput.Type;

// The operation
/**
 * Create a Meter Event Adjustment
 *
 * Creates a meter event adjustment to cancel a previously sent meter event.
 */
export const PostV2BillingMeterEventAdjustments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV2BillingMeterEventAdjustmentsInput,
    outputSchema: PostV2BillingMeterEventAdjustmentsOutput,
  }));
