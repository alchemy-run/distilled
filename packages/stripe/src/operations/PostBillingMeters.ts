import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingMetersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    customer_mapping: Schema.optional(
      Schema.Struct({
        event_payload_key: Schema.String,
        type: Schema.Literals(["by_id"]),
      }),
    ),
    default_aggregation: Schema.Struct({
      formula: Schema.Literals(["count", "last", "sum"]),
    }),
    display_name: Schema.String,
    event_name: Schema.String,
    event_time_window: Schema.optional(Schema.Literals(["day", "hour"])),
    expand: Schema.optional(Schema.Array(Schema.String)),
    value_settings: Schema.optional(
      Schema.Struct({
        event_payload_key: Schema.String,
      }),
    ),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/billing/meters",
    contentType: "form-urlencoded",
  }),
);
export type PostBillingMetersInput = typeof PostBillingMetersInput.Type;

// Output Schema
export const PostBillingMetersOutput =
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
export type PostBillingMetersOutput = typeof PostBillingMetersOutput.Type;

// The operation
/**
 * Create a billing meter
 *
 * <p>Creates a billing meter.</p>
 */
export const PostBillingMeters = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostBillingMetersInput,
  outputSchema: PostBillingMetersOutput,
}));
