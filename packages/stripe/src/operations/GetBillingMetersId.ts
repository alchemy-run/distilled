import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingMetersIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/meters/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingMetersIdInput = typeof GetBillingMetersIdInput.Type;

// Output Schema
export const GetBillingMetersIdOutput =
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
export type GetBillingMetersIdOutput = typeof GetBillingMetersIdOutput.Type;

// The operation
/**
 * Retrieve a billing meter
 *
 * <p>Retrieves a billing meter given an ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetBillingMetersId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBillingMetersIdInput,
  outputSchema: GetBillingMetersIdOutput,
}));
