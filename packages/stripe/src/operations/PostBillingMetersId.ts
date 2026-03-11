import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingMetersIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    display_name: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing/meters/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingMetersIdInput = typeof PostBillingMetersIdInput.Type;

// Output Schema
export const PostBillingMetersIdOutput =
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
export type PostBillingMetersIdOutput = typeof PostBillingMetersIdOutput.Type;

// The operation
/**
 * Update a billing meter
 *
 * <p>Updates a billing meter.</p>
 */
export const PostBillingMetersId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostBillingMetersIdInput,
  outputSchema: PostBillingMetersIdOutput,
}));
