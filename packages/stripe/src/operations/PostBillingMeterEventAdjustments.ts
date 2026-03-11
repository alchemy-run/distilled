import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingMeterEventAdjustmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cancel: Schema.optional(
      Schema.Struct({
        identifier: Schema.optional(Schema.String),
      }),
    ),
    event_name: Schema.String,
    expand: Schema.optional(Schema.Array(Schema.String)),
    type: Schema.Literals(["cancel"]),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/meter_event_adjustments",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingMeterEventAdjustmentsInput =
  typeof PostBillingMeterEventAdjustmentsInput.Type;

// Output Schema
export const PostBillingMeterEventAdjustmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cancel: Schema.Unknown,
    event_name: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.meter_event_adjustment"]),
    status: Schema.Literals(["complete", "pending"]),
    type: Schema.Literals(["cancel"]),
  });
export type PostBillingMeterEventAdjustmentsOutput =
  typeof PostBillingMeterEventAdjustmentsOutput.Type;

// The operation
/**
 * Create a billing meter event adjustment
 *
 * <p>Creates a billing meter event adjustment.</p>
 */
export const PostBillingMeterEventAdjustments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostBillingMeterEventAdjustmentsInput,
    outputSchema: PostBillingMeterEventAdjustmentsOutput,
  }));
