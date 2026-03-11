import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingMetersIdReactivateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/meters/{id}/reactivate",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingMetersIdReactivateInput =
  typeof PostBillingMetersIdReactivateInput.Type;

// Output Schema
export const PostBillingMetersIdReactivateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    customer_mapping: Schema.Struct({
      event_payload_key: Schema.String,
      type: Schema.Literals(["by_id"]),
    }),
    default_aggregation: Schema.Struct({
      formula: Schema.Literals(["count", "last", "sum"]),
    }),
    display_name: Schema.String,
    event_name: Schema.String,
    event_time_window: Schema.NullOr(Schema.Literals(["day", "hour"])),
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.meter"]),
    status: Schema.Literals(["active", "inactive"]),
    status_transitions: Schema.Struct({
      deactivated_at: Schema.NullOr(Schema.Number),
    }),
    updated: Schema.Number,
    value_settings: Schema.Struct({
      event_payload_key: Schema.String,
    }),
  });
export type PostBillingMetersIdReactivateOutput =
  typeof PostBillingMetersIdReactivateOutput.Type;

// The operation
/**
 * Reactivate a billing meter
 *
 * <p>When a meter is reactivated, events for this meter can be accepted and you can attach the meter to a price.</p>
 */
export const PostBillingMetersIdReactivate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostBillingMetersIdReactivateInput,
    outputSchema: PostBillingMetersIdReactivateOutput,
  }));
