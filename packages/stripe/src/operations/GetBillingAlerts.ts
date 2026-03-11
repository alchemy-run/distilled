import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingAlertsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  alert_type: Schema.optional(Schema.Literals(["usage_threshold"])),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  meter: Schema.optional(Schema.String),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/billing/alerts",
    contentType: "form-urlencoded",
  }),
);
export type GetBillingAlertsInput = typeof GetBillingAlertsInput.Type;

// Output Schema
export const GetBillingAlertsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
        alert_type: Schema.Literals(["usage_threshold"]),
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["billing.alert"]),
        status: Schema.NullOr(
          Schema.Literals(["active", "archived", "inactive"]),
        ),
        title: Schema.String,
        usage_threshold: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetBillingAlertsOutput = typeof GetBillingAlertsOutput.Type;

// The operation
/**
 * List billing alerts
 *
 * <p>Lists billing active and inactive alerts</p>
 *
 * @param alert_type - Filter results to only include this type of alert.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param meter - Filter results to only include alerts with the given meter.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetBillingAlerts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBillingAlertsInput,
  outputSchema: GetBillingAlertsOutput,
}));
