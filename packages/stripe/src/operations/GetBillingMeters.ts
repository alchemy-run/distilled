import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingMetersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literals(["active", "inactive"])),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/billing/meters",
    contentType: "form-urlencoded",
  }),
);
export type GetBillingMetersInput = typeof GetBillingMetersInput.Type;

// Output Schema
export const GetBillingMetersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetBillingMetersOutput = typeof GetBillingMetersOutput.Type;

// The operation
/**
 * List billing meters
 *
 * <p>Retrieve a list of billing meters.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Filter results to only include meters with the given status.
 */
export const GetBillingMeters = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBillingMetersInput,
  outputSchema: GetBillingMetersOutput,
}));
