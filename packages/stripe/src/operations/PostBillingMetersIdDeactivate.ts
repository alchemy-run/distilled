import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingMetersIdDeactivateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/meters/{id}/deactivate",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingMetersIdDeactivateInput =
  typeof PostBillingMetersIdDeactivateInput.Type;

// Output Schema
export const PostBillingMetersIdDeactivateOutput =
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
export type PostBillingMetersIdDeactivateOutput =
  typeof PostBillingMetersIdDeactivateOutput.Type;

// The operation
/**
 * Deactivate a billing meter
 *
 * <p>When a meter is deactivated, no more meter events will be accepted for this meter. You can’t attach a deactivated meter to a price.</p>
 */
export const PostBillingMetersIdDeactivate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostBillingMetersIdDeactivateInput,
    outputSchema: PostBillingMetersIdDeactivateOutput,
  }));
